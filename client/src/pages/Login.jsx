import InputField from "../components/Inputs/InputField";
import Button from "../components/Button";
import { useState } from "react";
import adminLogin from "../lib/adminLogin";
import clientLogin from "../lib/clientLogin";
import { useNavigate } from "react-router-dom";

export default function LoginPage(props) {
  const {} = props;
  const [client, setClient] = useState({ email: "", password: "" });
  const [adminEmail, setAdminEmail] = useState("");
  const navigate = useNavigate();

  const handleClientInputChange = ({ target }) => {
    const { name, value } = target;
    setClient({ ...client, [name]: value });
  };

  const handleAdminInputChange = ({ target }) => {
    const { value } = target;
    setAdminEmail(value);
  };

  const handleClientLoginButtonClick = (e) => {
    // TODO: VALIDATION
    clientLogin(client).then((result) => {
      if (result === "redirect")
        navigate(`/set-password?email=` + client.email);
      if (result === "login") navigate("");
    });
  };

  const handleAdminLoginButtonClick = (e) => {
    adminLogin(adminEmail);
  };

  return (
    <div className=" min-h-screen flex flex-col p-3 items-center gap-14 lg:flex-row lg:justify-center lg:gap-36">
      <section className="max-w-md w-full flex-1 shadow-lg p-10 rounded-lg m-5">
        <h2 className="mb-6 text-3xl font-bold">Client Login</h2>
        <div className="mb-6">
          <InputField
            label="Email"
            name="email"
            type="email"
            value={client.email}
            onChange={(e) => handleClientInputChange(e)}
          />
        </div>
        <div className="mb-9">
          <InputField
            label="Password"
            type="password"
            name="password"
            value={client.password}
            onChange={(e) => handleClientInputChange(e)}
          />
        </div>
        <div>
          <Button
            text="Login"
            onClick={(e) => handleClientLoginButtonClick(e)}
          ></Button>
        </div>
      </section>

      <section className="max-w-md w-full flex-1  p-10 rounded-lg m-5 max-w-md">
        <h2 className="mb-6 text-3xl font-bold">Admin Login</h2>
        <div className="mb-6">
          <InputField
            label="Email"
            value={adminEmail}
            type="email"
            onChange={(e) => handleAdminInputChange(e)}
            name="adminEmail"
          />
        </div>
        <Button
          text="login with jira"
          onClick={(e) => handleAdminLoginButtonClick(e)}
        />
      </section>
    </div>
  );
}
