import Button from "../components/Button";
import InputField from "../components/Inputs/InputField";
import { useState } from "react";
import newClientPassword from "../lib/newClientPassword";
import { useNavigate } from "react-router-dom";

export default function SetPassword() {
  const navigate = useNavigate();
  const [clientCredentials, setClientCredentials] = useState({
    newPassword: "",
    repeatedPassword: "",
    email: "",
  });

  const handleInputChange = ({ target }) => {
    const { name, value } = target;
    setClientCredentials({ ...clientCredentials, [name]: value });
  };

  const handleButtonClick = () => {
    // TODO: VALIDATION
    newClientPassword(clientCredentials).then((client) => {
      navigate("/client");
    });
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <section className="shadow-lg p-10 rounded-lg m-5 max-w-md">
        <h2 className="mb-1  text-3xl font-bold">Set new password</h2>
        <p className="text-sm mb-8 text-gray-600 leading-normal">
          You need to set a new password before you can continue
        </p>

        <div className="max-w-md ">
          <div className="mb-6">
            <InputField
              label="Email"
              name="email"
              type="email"
              value={clientCredentials.email}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div className="mb-6">
            <InputField
              label="New password"
              type="password"
              name="newPassword"
              value={clientCredentials.newPassword}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div className="mb-9">
            <InputField
              label="Repeat password"
              type="password"
              name="repeatedPassword"
              value={clientCredentials.repeatedPassword}
              onChange={(e) => handleInputChange(e)}
            />
          </div>

          <Button text="Change password" onClick={() => handleButtonClick()} />
        </div>
      </section>
    </div>
  );
}
