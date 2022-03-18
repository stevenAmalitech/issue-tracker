import TableBodyRow from "./TableBodyRow";
import TableHeadRow from "./TableHeadRow";

export default function Table(props) {
  return (
    <div class="flex flex-col overflow-x-hidden">
      <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block py-2 min-w-full sm:px-6 lg:px-8">
          <div class="overflow-hidden shadow-md sm:rounded-lg">
            <table class="min-w-full">
              <thead class="bg-gray-50">
                <TableHeadRow
                  rowData={["name", "color", "category", "price"]}
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
