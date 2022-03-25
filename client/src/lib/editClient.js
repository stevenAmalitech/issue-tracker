import http from "../utils/http";

export default async function editClient({
  name,
  email,
  organization,
  projectId,
  password,
  id,
}) {
  try {
    const url = "/api/auth/client/" + id;

    const { data } = await http({
      method: "post",
      url,
      data: { name, email, organization, projectId, password },
    });

    return data;
  } catch (error) {
    console.error(error.response);
  }
}
