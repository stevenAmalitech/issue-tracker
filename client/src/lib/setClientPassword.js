import http from "../utils/http";

export default async function setClientPassword({
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

    if (data.firstName) return data;
  } catch (error) {
    console.error(error);
  }
}
