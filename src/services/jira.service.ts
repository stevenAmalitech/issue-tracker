import Keygrip from "keygrip";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { jiraTokenModel } from "../models/jiraToken.model";
import {
  AccessTokenParams,
  AccessTokenResponse,
  CloudIdObject,
  IssueTypeDetails,
  JiraPostIssue,
  SearchProjects,
} from "../typings/jira.types";
import {
  constructUrl,
  makeJiraApiCall,
  getJiraCodes,
  formatIssueTypes,
  createIssueBody,
} from "../utils/jiraHelpers";

const keys = new Keygrip([process.env.KEY_1!, process.env.KEY_2!]);

export function jiraAuthUrl(sessionId: string) {
  const authorizationUrl = process.env.JIRA_API_AUTH_URL;

  if (!authorizationUrl) throw "no api url";

  try {
    return authorizationUrl.replace(
      "${YOUR_USER_BOUND_VALUE}",
      keys.sign(sessionId)
    );
  } catch (error) {
    throw error;
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

    await jiraTokenModel.create({
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

export async function searchProjects(sessionId: string) {
  try {
    const { accessToken, cloudId } = await getJiraCodes(sessionId);
    const url = constructUrl(cloudId, "project/search");

    const response = <SearchProjects>(
      await makeJiraApiCall({ accessToken, url, method: "get" })
    );

    return response.values;
  } catch (error) {
    throw error;
  }
}

export async function issueTypes(sessionId: string) {
  try {
    const { accessToken, cloudId } = await getJiraCodes(sessionId);
    const url = constructUrl(cloudId, "issuetype");

    const response = <[IssueTypeDetails]>(
      await makeJiraApiCall({ accessToken, url, method: "get" })
    );

    return formatIssueTypes(response);
  } catch (error) {
    throw error;
  }
}

export async function createIssues(
  sessionId: string,
  issueDetails: JiraPostIssue
) {
  try {
    const { accessToken, cloudId } = await getJiraCodes(sessionId);
    const url = constructUrl(cloudId, "issue");

    const body = createIssueBody(issueDetails);

    const response = await makeJiraApiCall({
      accessToken,
      url,
      method: "post",
      body,
    });

    return response;
  } catch (error) {
    console.log(error);
    return "error";
  }
}
