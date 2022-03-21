import Button from "../components/Button";
import { useAdminData } from "./AdminDashboard";
import { useEffect, useState } from "react";
import getIssues from "../lib/getIssues";
import IssueCard from "../components/Cards/IssueCard";
import uniqueKey from "../utils/uniqueKey";
import InputField from "../components/Inputs/InputField";

export default function IssuePortal() {
  const [data] = useAdminData();
  const [issues, setIssues] = useState([]);
  const [filters, setFilters] = useState({ project: "", title: "" });

  useEffect(() => {
    (async () => {
      const response = await getIssues();
      setIssues(response);
    })();
  }, []);

  useEffect(() => {
    if (!data.projects) return;

    const temp = issues.map((issue) => {
      const projectId = issue?.client?.projectId;

      const project = data.projects.find(
        (project) => +project.id === projectId
      );
      return { ...issue, project: project?.name };
    });

    setIssues(temp);
  }, [data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const filteredIssues = () => {
    let displayData = issues;

    if (filters.title)
      displayData = issues.filter(({ title }) =>
        title?.toLowerCase().includes(filters?.title.toLowerCase())
      );

    if (filters.project)
      displayData = issues.filter(({ project }) =>
        project?.toLowerCase().includes(filters?.project.toLowerCase())
      );

    return displayData.map(({ title, description, project }) => (
      <IssueCard
        key={uniqueKey()}
        title={title}
        description={description}
        project={project}
      />
    ));
  };

  return (
    <div className="px-5">
      <section className="flex justify-start items-center py-5 gap-5">
        <div className="max-w-xs">
          <InputField
            label="Filter by projects"
            name="project"
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div className="max-w-xs">
          <InputField
            label="Filter by issue title"
            name="title"
            onChange={(e) => handleInputChange(e)}
          />
        </div>
      </section>
      <section className="grid gap-5 sm:grid-cols-2 md:gap-10 md:grid-cols-3 lg:grid-cols-5 ">
        {filteredIssues()}
      </section>
    </div>
  );
}
