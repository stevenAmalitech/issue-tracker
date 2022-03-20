import http from "../utils/http";

export default async function getIssues() {
  try {
    const url = "/api/auth/issues";

    const { data } = await http.get(url);
    return data;
  } catch (error) {
    throw error;
  }
}
