export default function ClientTableRow(projects, clients) {
  return clients
    .map(({ id, name, email, organization, projectId }) => {
      const assignedProject = projects.find(
        (project) => project.id === projectId + ""
      );

      return { id, name, email, organization, project: assignedProject.name };
    })
    .reduce((acc, cur) => {
      const row = [];
      for (const property in cur) row.push(cur[property]);
      acc.push(row);
      return acc;
    }, []);
}
