import TableBodyRow from "./TableBodyRow";
import TableHeadRow from "./TableHeadRow";

export default function Table(props) {
  const { headers } = props;
  return (
    <div className="flex flex-col overflow-x-hidden">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block py-2 min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden shadow-md sm:rounded-lg">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <TableHeadRow
                  rowData={headers}
                />
              </thead>
              <tbody>
                <TableBodyRow
                  rowData={[
                    "Apple MacBook Pro 17",
                    "Silver",
                    "Laptop",
                    "$2999",
                  ]}
                />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
