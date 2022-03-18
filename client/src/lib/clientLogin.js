import axios from "axios";

export default async function ({ email, password }) {
  const url = "/api/client-login";

  try {
    const { data } = await axios({
      method: "post",
      url,
      data: { email, password },
    });

    if (data.setPassword) return "redirect";
    else return "login";
  } catch (error) {
    console.error(error);
  }
}
