import { useState } from "react";
import Modal from "./Modal";
import Button from "../Button";
import InputField from "../Inputs/InputField";
import saveNewClient from "../../lib/saveNewClient";

export default function AddClient(props) {
  const { show, closeModal, saveClient } = props;
  const [clientDetails, setClientDetails] = useState({
    name: "",
    email: "",
    organization: "",
    password: "",
  });

  const handleInputChange = ({ target }) => {
    const { name, value } = target;

    setClientDetails({ ...clientDetails, [name]: value });
  };

  const handleButtonClick = () => {
    // TODO: Validation
    saveNewClient(clientDetails).then(() => {
      closeModal();
    });
  };

  return (
    <Modal hide={!show} closeModal={closeModal}>
      <section
        onClick={(e) => e.stopPropagation()}
        className=" bg-white relative z-40 shadow-lg p-10 rounded-lg m-5 max-w-md"
      >
        <h2 className="mb-8 text-3xl font-bold">Add Client</h2>

        <div className="max-w-md ">
          <div className="mb-6">
            <InputField
              label="Name"
              name="name"
              value={clientDetails.name}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div className="mb-6">
            <InputField
              label="Email"
              name="email"
              type="email"
              value={clientDetails.email}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div className="mb-6">
            <InputField
              label="Organization"
              name="organization"
              value={clientDetails.organization}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div className="mb-6">
            <InputField
              label="Password"
              // type="password"
              name="password"
              value={clientDetails.password}
              onChange={(e) => handleInputChange(e)}
            />
          </div>

          <Button text="Add client" onClick={() => handleButtonClick()} />
        </div>
      </section>
    </Modal>
  );
}
