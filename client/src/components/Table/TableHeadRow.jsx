export default function TableHeadRow({ rowData }) {
  return (
    <tr>
      {rowData.map((data) => (
        <TH data={data} />
      ))}
    </tr>
  );
}

const TH = ({ data }) => (
  <th
    scope="col"
    class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase "
  >
    {data}
  </th>
);
