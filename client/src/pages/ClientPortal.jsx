import Button from "../components/Button";
import AddClient from "../components/Modals/AddClient";
import Table from "../components/Table/Table";
import { useState, useEffect } from "react";
import { useAdminData } from "./AdminDashboard";
import ClientTableRow from "../components/TableRows/ClientTableRow";
import getClients from "../lib/getClients";

export default function ClientPortal(props) {
  const [data] = useAdminData();
  const [showAddClientModal, setShowAddClientModal] = useState(false);
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

    setTableRows(ClientTableRow(data.projects, clients));
  }, [data, clients]);

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
          header={["id", "name", "email", "organization", "assigned project"]}
          rows={tableRows}
        />
      </section>

      <section>
        <AddClient
          show={showAddClientModal}
          closeModal={() => setShowAddClientModal(false)}
          projects={data.projects}
        />
      </section>
    </div>
  );
}
