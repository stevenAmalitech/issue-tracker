import http from "../utils/http";

export default async function getIssueTypes() {
  try {
    const url = "/api/auth/issue-types";

    const { data } = await http.get(url);
    return data;
  } catch (error) {
    throw error;
  }
}
