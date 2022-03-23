import http from "../utils/http";

export default async function pushIssueToJira({
  issueTypeId,
  projectId,
  summary,
  description,
}) {
  try {
    const url = "/api/auth/push-issue-jira";

    const { data } = await http({
      method: "post",
      url,
      data: {
        issueId: issueTypeId,
        projectId: projectId + "",
        summary,
        description,
      },
    });
  } catch (error) {
    throw error;
  }
}
