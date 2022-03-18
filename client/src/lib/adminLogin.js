export default function loginWithJira(email) {
  const url = "/api/jira-login?email=" + email;
  window.location.href = url;
}
