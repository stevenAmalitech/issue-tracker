import http from "../utils/http";

export default async function getClients() {
  try {
    const url = "/api/auth/clients";

    const { data } = await http.get(url);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
