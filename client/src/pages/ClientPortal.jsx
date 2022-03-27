import Button from "../components/Button";
import AddClient from "../components/Modals/AddClient";
import EditClient from "../components/Modals/EditClient";
import Table from "../components/Table/Table";
import { useState, useEffect } from "react";
import { useAdminData } from "./AdminDashboard";
import ClientTableRow from "../components/TableRows/ClientTableRow";
import getClients from "../lib/getClients";

export default function ClientPortal(props) {
  const [data] = useAdminData();
  const [showAddClientModal, setShowAddClientModal] = useState(false);
  const [showEditClientModal, setShowEditClientModal] = useState(false);
  const [clientDetails, setClientDetails] = useState({});
  const [clients, setClients] = useState({});
  const [tableRows, setTableRows] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await getClients();
      setClients(response);
    })();
  }, []);

  useEffect(() => {
    if (!data.projects || !clients.length) return;

    setTableRows(
      ClientTableRow(data.projects, clients, (id) => handleRowClick(id))
    );
  }, [data, clients]);

  const handleRowClick = (clientDetails) => {
    setClientDetails(clientDetails);
    setShowEditClientModal(true);
  };

  return (
    <div className="px-5">
      <section className="flex justify-start items-center py-5 gap-5">
        <div className="max-w-fit">
          <Button
            text="Add Client"
            onClick={() => setShowAddClientModal(true)}
          ></Button>
        </div>
      </section>
      <section>
        <Table
          header={[
            "id",
            "name",
            "email",
            "organization",
            "assigned project",
            "Edit",
          ]}
          rows={tableRows}
        />
      </section>

      <section>
        <AddClient
          show={showAddClientModal}
          closeModal={() => setShowAddClientModal(false)}
          projects={data.projects}
        />
        <EditClient
          show={showEditClientModal}
          closeModal={() => setShowEditClientModal(false)}
          projects={data.projects}
          {...clientDetails}
        />
      </section>
    </div>
  );
}
