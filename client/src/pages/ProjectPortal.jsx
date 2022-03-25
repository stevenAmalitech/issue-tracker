import { useEffect, useState } from "react";
import getClients from "../lib/getClients";
import joinClientsToProject from "../components/TableRows/ProjectTableRow";
import { useAdminData } from "./AdminDashboard";
import Button from "../components/Button";
import Table from "../components/Table/Table";

export default function ProjectPortal() {
  const [data] = useAdminData();
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

    const re = joinClientsToProject(data.projects, clients);

    setTableRows(re);
  }, [data, clients]);

  return (
    <div className="px-5">
      <section className="flex justify-start items-center py-5 gap-5">
        <div className="max-w-fit hidden">
          <Button
            text="Add Client"
            onClick={() => setShowAddClientModal(true)}
          ></Button>
        </div>
      </section>
      <section>
        <Table header={["key", "name", "clients"]} rows={tableRows} />
      </section>
    </div>
  );
}
