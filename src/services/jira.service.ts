import Keygrip from "keygrip";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { sessionModel } from "../models/session.model";
import {
  AccessTokenParams,
  AccessTokenResponse,
  CloudIdObject,
} from "../typings/jira.types";

const keys = new Keygrip([process.env.KEY_1!, process.env.KEY_2!]);

export function jiraAuthUrl(sessionId: string) {
  const authorizationUrl = process.env.JIRA_API_AUTH_URL;

  if (!authorizationUrl) return null;

  try {
    return authorizationUrl.replace(
      "${YOUR_USER_BOUND_VALUE}",
      keys.sign(sessionId)
    );
  } catch {
    return null;
  }
}

export async function jiraAccessToken(params: AccessTokenParams) {
  const { code, state, sessionId } = params;

  const matched = keys.verify(sessionId, state);
  if (!matched) throw { status: 400 };

  try {
    const axiosConfig = <AxiosRequestConfig>{
      method: "post",
      url: "https://auth.atlassian.com/oauth/token",
      headers: { "Content-Type": "application/json" },
      data: {
        grant_type: "authorization_code",
        client_id: process.env.JIRA_CLIENT_ID,
        client_secret: process.env.JIRA_SECRET,
        code,
        redirect_uri: process.env.JIRA_REDIRECT_URI,
      },
    };

    const response = <AxiosResponse<AccessTokenResponse>>(
      await axios(axiosConfig)
    );
    const { data } = response;

    const cloudId = await getCloudId(data.access_token);

    await sessionModel.create({
      accessToken: data.access_token,
      expiresIn: data.expires_in,
      scope: data.scope,
      sessionId,
      cloudId,
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getCloudId(accessToken: string) {
  try {
    const axiosConfig = <AxiosRequestConfig>{
      method: "get",
      url: " https://api.atlassian.com/oauth/token/accessible-resources",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: " application/json",
      },
    };

    const response = <AxiosResponse<[CloudIdObject]>>await axios(axiosConfig);

    return response.data[0].id;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
