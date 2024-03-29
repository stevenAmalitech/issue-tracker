import http from "../utils/http";

export default async function getProjects() {
  try {
    const url = "/api/auth/projects";

    const { data } = await http.get(url);
    return data
  } catch (error) {
    console.error(error)
    throw error
  }
}
