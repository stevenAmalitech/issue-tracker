import uniqueKey from "../../utils/uniqueKey";

export default function TableHeadRow({ rowData }) {
  return (
    <tr>
      {rowData.map((data) => (
        <TH data={data} key={uniqueKey()} />
      ))}
    </tr>
  );
}

const TH = ({ data }) => (
  <th
    scope="col"
    className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase "
  >
    {data}
  </th>
);
