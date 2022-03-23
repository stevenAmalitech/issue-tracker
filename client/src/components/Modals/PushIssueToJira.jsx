import { useState, useEffect } from "react";
import Button from "../Button";
import InputField from "../Inputs/InputField";
import SelectField from "../Inputs/SelectField";
import TextareaField from "../Inputs/TextareaField";
import Modal from "./Modal";
import pushIssueToJira from "../../lib/pushIssueToJira";

export default function PushIssueToJira(props) {
  const {
    show,
    closeModal,
    description,
    issueTypes,
    project,
    summary,
    projectId,
  } = props;
  const [issueDetails, setIssueDetails] = useState({
    projectId: "",
    issueTypeId: "",
    summary: "",
    description: "",
  });

  useEffect(() => {
    if (!summary || !description) return;

    setIssueDetails({ issueTypeId: "", summary, description, projectId });
  }, [summary, description, projectId]);

  const handleInputChange = ({ target }) => {
    const { name, value } = target;
    setIssueDetails({ ...issueDetails, [name]: value });
  };

  const selectOptions = issueTypes?.map(({ id, name, description }) => ({
    text: name,
    value: id,
    title: description,
  }));

  const handleButtonClick = () => {
    // TODO: Validation
    pushIssueToJira(issueDetails).then(() => {
      closeModal();
    });
  };

  return (
    <Modal hide={!show} closeModal={closeModal}>
      <section
        onClick={(e) => e.stopPropagation()}
        className=" bg-white relative z-40 shadow-lg p-10 rounded-lg m-5 max-w-md"
      >
        <h2 className="mb-1 text-3xl font-bold">Push Issue to Jira</h2>
        <p className="mb-8 text-sm">{project}</p>

        <div className="max-w-md ">
          <div className="mb-6">
            <SelectField
              label="Issue Type"
              name="issueTypeId"
              onChange={(e) => handleInputChange(e)}
              value={issueDetails.issueTypeId}
              options={selectOptions}
            />
          </div>

          <div className="mb-6">
            <InputField
              label="Summary"
              name="summary"
              value={issueDetails.summary}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div className="mb-6">
            <TextareaField
              label="Description"
              name="description"
              value={issueDetails.description}
              onChange={(e) => handleInputChange(e)}
            />
          </div>

          <Button text="Push to Jira" onClick={() => handleButtonClick()} />
        </div>
      </section>
    </Modal>
  );
}
