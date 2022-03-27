export default function getIssueTypesForProject(issueTypes, projectId) {
  const filteredTypes = issueTypes.filter((issueType) => {
    if (issueType.projectId === projectId + "") return true;
  });

  if (filteredTypes.length !== 0) return filteredTypes;

  return issueTypes.filter((issueType) => {
    if (!issueType?.projectId) return true;
  });
}
