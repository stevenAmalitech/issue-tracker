import { MakeJiraApiCall } from "../typings/jira.types";
import axios from "axios";
import { jiraTokenModel } from "../models/jiraToken.model";

export function constructUrl(cloudId: string, resourceName: string) {
  return `https://api.atlassian.com/ex/jira/${cloudId}/rest/api/3/${resourceName}`;
}

export async function makeJiraApiCall(params: MakeJiraApiCall) {
  try {
    const { accessToken, url, method } = params;

    const { data } = await axios({
      method,
      url,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      },
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function sessionDetails(sessionId: string) {
  try {
    if (process.env.NODE_ENV === "development")
      return {
        accessToken: process.env.ACCESS_CODE as string,
        cloudId: process.env.CLOUD_ID as string,
      };

    const sessionDetails = await jiraTokenModel.findOne({
      where: { sessionId },
    });
    if (sessionDetails === null) throw "session not found";

    return sessionDetails;
  } catch (error) {
    throw error;
  }
}
