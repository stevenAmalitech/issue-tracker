import http from "../utils/http";

export default async function reportIssue({ title, description, screenshot }) {
  try {
    const url = "/api/auth/issue";

    let formData = new FormData();

    formData.append("description", description);
    formData.append("screenshot", screenshot);
    formData.append("title", title);

    const { data } = await http({
      method: "post",
      url,
      data: formData,
      headers: { "content-type": "multipart/form-data" },
    });

    return data;
  } catch (error) {
    throw error;
  }
}
