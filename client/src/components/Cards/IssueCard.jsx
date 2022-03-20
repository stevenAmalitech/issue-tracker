export default function IssueCard(props) {
  const { title, description, project } = props;

  return (
    <div className="w-full max-w-xs p-5 bg-white rounded-lg border border-gray-200 mx-auto">
      <p className=" capitalize font-extrabold">{title}</p>
      <p className="text-xs font-light text-gray-700 mb-2"> {project} </p>
      <p className="text-gray-700">{description}</p>
    </div>
  );
}
