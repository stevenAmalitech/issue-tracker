function EditButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-lg text-sm text-center"
    >
      Edit
    </button>
  );
}

export default function ClientTableRow(projects, clients, onClick) {
  return clients
    .map(({ id, name, email, organization, projectId }) => {
      const assignedProject = projects.find(
        (project) => project.id === projectId + ""
      );

      return {
        id,
        name: <span className="capitalize">{name} </span>,
        email,
        organization: <span className="capitalize">{organization} </span>,
        project: assignedProject.name,
        button: (
          <EditButton
            id={id}
            onClick={() =>
              onClick({ id, name, email, organization, projectId })
            }
          />
        ),
      };
    })
    .reduce((acc, cur) => {
      const row = [];
      for (const property in cur) row.push(cur[property]);
      acc.push(row);
      return acc;
    }, []);
}
