import http from "../utils/http";

export default async function saveNewClient({
  email,
  name,
  organization,
  password,
}) {
  const url = "/api/auth/client";

  try {
    const { data } = await http({
      method: "post",
      url,
      data: { email, name, organization, password },
    });

    console.log(data)

    return data;

  } catch (error) {
    throw error
    console.error(error);
  }
}
