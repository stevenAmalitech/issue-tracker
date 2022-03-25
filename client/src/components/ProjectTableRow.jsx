import uniqueKey from "../utils/uniqueKey";

export default function ProjectTableRow(projects, clients) {
  return projects
    .map(({ key, name, id }) => {
      const assignedClients = clients
        .filter((client) => {
          return client.projectId + "" === id;
        })
        .map((client) => (
          <span className="block capitalize " key={uniqueKey()}>
            {client.name}
          </span>
        ));

      return { key, name, clients: assignedClients };
    })
    .filter((projects) => Boolean(projects.clients.length))
    .reduce((acc, curr) => {
      const row = [];
      for (const property in curr) row.push(curr[property]);
      acc.push(row);
      return acc;
    }, []);
}
