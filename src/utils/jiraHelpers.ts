import {
  CreateIssue,
  IssueTypeDetails,
  JiraPostIssue,
  MakeJiraApiCall,
} from "../typings/jira.types";
import axios from "axios";
import { jiraTokenModel } from "../models/jiraToken.model";

export function constructUrl(cloudId: string, resourceName: string) {
  return `https://api.atlassian.com/ex/jira/${cloudId}/rest/api/3/${resourceName}`;
}

export async function makeJiraApiCall(params: MakeJiraApiCall) {
  try {
    const { accessToken, url, method, body } = params;

    const { data } = await axios({
      method,
      url,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      },
      data: body,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function getJiraCodes(sessionId: string) {
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

    return sessionDetails.toJSON();
  } catch (error) {
    throw error;
  }
}

export function formatIssueTypes(issueTypes: [IssueTypeDetails]) {
  if (!issueTypes.length) return null;

  return issueTypes.map(({ id, name, scope, description }) => {
    const projectId = scope?.project?.id;

    return { id, name, projectId, description };
  });
}

export function createIssueBody({
  issueTypeId,
  summary,
  description,
  projectId,
}: JiraPostIssue) {
  return <CreateIssue>{
    fields: {
      summary,
      issuetype: {
        id: issueTypeId,
      },
      project: {
        id: projectId,
      },
      description: {
        type: "doc",
        version: 1,
        content: [
          { type: "paragraph", content: [{ type: "text", text: description }] },
        ],
      },
    },
  };
}
