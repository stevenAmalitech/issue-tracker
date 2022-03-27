export default function IssueCard(props) {
  const { title, description, project } = props;

  return (
    <div className="cursor-pointer w-full max-w-xs p-5 bg-white rounded-lg border border-gray-200 hover:border-none hover:shadow-lg mx-auto">
      <p className="font-extrabold">{title}</p>
      <p className="text-xs font-light text-gray-700 mb-2"> {project} </p>
      <p className="text-gray-700">{description}</p>
    </div>
  );
}
