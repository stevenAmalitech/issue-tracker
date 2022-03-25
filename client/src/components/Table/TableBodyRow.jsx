import uniqueKey from "../../utils/uniqueKey";

export default function TableBodyRow({ rowData }) {
  return (
    <tr className="bg-white border-b">
      {rowData.map((data) => (
        <TD key={uniqueKey()} data={data} />
      ))}
    </tr>
  );
}

const TD = ({ data }) => (
  <td className="py-4 px-6 text-sm text-gray-900 whitespace-nowrap ">{data}</td>
);
