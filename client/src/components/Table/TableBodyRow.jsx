export default function TableBodyRow({ rowData }) {
  return (
    <tr class="bg-white border-b  ">
      {rowData.map((data) => (
        <TD data={data} />
      ))}
    </tr>
  );
}

const TD = ({ data }) => (
  <td class="py-4 px-6 text-sm text-gray-900 whitespace-nowrap ">{data}</td>
);
