import { useState } from "react";
import InputField from "../components/Inputs/InputField";
import Button from "../components/Button";
import TextareaField from "../components/Inputs/TextareaField";
import FileUploadField from "../components/Inputs/FileUploadField";

export default function ClientDashboard() {
  const [issue, setIssue] = useState({
    title: "",
    description: "",
    // screenshot: "",
  });

  const handleInputChange = ({ target }) => {
    const { name, value } = target;
    setIssue({ ...issue, [name]: value });
  };

  const handleButtonClick = () => {
    // TODO: VALIDATION
    // setClientPassword(clientCredentials);
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <section className="shadow-lg p-10 rounded-lg m-5 max-w-md w-full">
        <h2 className="mb-1  text-3xl font-bold">Report Issues</h2>
        <p className="text-sm mb-8 text-gray-600 leading-normal">
          Please use this form to report your issues
        </p>

        <div className="max-w-md ">
          <div className="mb-6">
            <InputField
              label="Title"
              name="title"
              value={issue.title}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div className="mb-6">
            <TextareaField label="Description" name="description" />
          </div>
          <div className="mb-9">
            <FileUploadField label="Upload screenshot" />
          </div>

          <Button text="Report issue" onClick={() => handleButtonClick()} />
        </div>
      </section>
    </div>
  );
}
