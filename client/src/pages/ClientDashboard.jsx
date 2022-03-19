import { useState, useRef } from "react";
import InputField from "../components/Inputs/InputField";
import Button from "../components/Button";
import TextareaField from "../components/Inputs/TextareaField";
import reportIssue from "../lib/reportIssue";

const fileLabelClasses = "block mb-2 text-sm font-medium text-gray-900";
const fileInputClasses =
  "block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none focus:border-transparent";

export default function ClientDashboard() {
  const ref = useRef();
  const [issue, setIssue] = useState({
    title: "",
    description: "",
    screenshot: null,
  });

  const handleInputChange = ({ target }) => {
    const { name, value } = target;
    setIssue({ ...issue, [name]: value });
  };

  const handleSubmit = (e) => {
    // TODO: VALIDATION
    e.preventDefault();
    reportIssue({
      ...issue,
      screenshot: ref.current.files[0],
    }).then(() => {
      setIssue({ title: "", description: "", screenshot: null });
     e.target.reset()
    });
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <form
        encType="multipart/form-data"
        className="shadow-lg p-10 rounded-lg m-5 max-w-md w-full"
        onSubmit={handleSubmit}
      >
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
            <TextareaField
              label="Description"
              name="description"
              value={issue.description}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div className="mb-9">
            <div>
              <label className={fileLabelClasses} htmlFor="screenshot">
                Upload Screenshot
              </label>
              <input
                className={fileInputClasses}
                id="screenshot"
                name="screenshot"
                type="file"
                accept="image/png, image/jpeg, image/jpg, image/webp"
                ref={ref}
              />
            </div>
          </div>

          <Button text="Report issue" />
        </div>
      </form>
    </div>
  );
}
