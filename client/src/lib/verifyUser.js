import http from "../utils/http";

export default async function verifyUser() {
  try {
    const url = "/api/auth/user";

    const { data } = await http({
      method: "get",
      url,
    });

    return data;
  } catch (error) {
    throw error;
  }
}
