import Button from "../components/Button";
import AddClient from "../components/Modals/AddClient";
import Table from "../components/Table/Table";
import { useState } from "react";

export default function ClientPortal(props) {
  const [showAddClientModal, setShowAddClientModal] = useState(false);

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
        {/* <Table /> */}
        <AddClient
          show={showAddClientModal}
          closeModal={() => setShowAddClientModal(false)}
        />
      </section>
    </div>
  );
}
