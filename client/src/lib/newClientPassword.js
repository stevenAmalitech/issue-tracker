import http from "../utils/http";

export default async function newClientPassword({
  email,
  newPassword,
  repeatedPassword,
}) {
  const url = "/api/client-set-password";

  try {
    const { data } = await http({
      method: "post",
      url,
      data: { email, newPassword, repeatedPassword },
    });

    if (data) return data;
    return null;
  } catch (error) {
    console.error(error);
  }
}
