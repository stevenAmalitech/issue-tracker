import http from "../utils/http";

export default async function saveNewClient({
  email,
  name,
  organization,
  password,
  projectId,
}) {
  const url = "/api/auth/client";

  try {
    const { data } = await http({
      method: "post",
      url,
      data: { email, name, organization, password, projectId },
    });

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
