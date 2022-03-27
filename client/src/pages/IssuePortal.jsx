import { useAdminData } from "./AdminDashboard";
import { useEffect, useState } from "react";
import getIssues from "../lib/getIssues";
import IssueCard from "../components/Cards/IssueCard";
import uniqueKey from "../utils/uniqueKey";
import InputField from "../components/Inputs/InputField";
import getIssueTypes from "../lib/getIssueTypes";
import getIssueTypesForProject from "../lib/getIssueTypesForProject";
import PushIssueToJira from "../components/Modals/PushIssueToJira";

export default function IssuePortal() {
  const [data] = useAdminData();
  const [issues, setIssues] = useState([]);
  const [filters, setFilters] = useState({ project: "", title: "" });
  const [pushIssueData, setPushIssueData] = useState({});
  const [showPushJiraModal, setShowPushJiraModal] = useState(false);

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

  const openPushIssueToJiraModal = async (
    { description, title, client, project, id },
    issue
  ) => {
    try {
      const issueTypes = await getIssueTypes();
      const projectIssueTypes = getIssueTypesForProject(
        issueTypes,
        client?.projectId
      );

      setPushIssueData({
        summary: title,
        description,
        issueTypes: projectIssueTypes,
        project,
        projectId: client?.projectId,
        issueId: id,
      });

      setShowPushJiraModal(true);
    } catch (error) {
      console.log(error);
    }
  };

  const showReportStatus = async () => {
    console.log("click");
  };

  const displayFilteredIssues = () => {
    let displayData = issues;

    if (filters.title)
      displayData = issues.filter(({ title }) =>
        title?.toLowerCase().includes(filters?.title.toLowerCase())
      );

    if (filters.project)
      displayData = issues.filter(({ project }) =>
        project?.toLowerCase().includes(filters?.project.toLowerCase())
      );

    let issuesPushedToJira = [],
      issuesNotPushedToJira = [];

    displayData.forEach((issue) => {
      if (Boolean(issue.jiraDetails)) issuesPushedToJira.push(issue);
      else issuesNotPushedToJira.push(issue);
    });

    issuesNotPushedToJira = issuesNotPushedToJira.map((issue) => (
      <div key={uniqueKey()} onClick={() => openPushIssueToJiraModal(issue)}>
        <IssueCard
          title={issue?.title}
          description={issue?.description}
          project={issue?.project}
        />
      </div>
    ));

    issuesPushedToJira = issuesPushedToJira.map((issue) => (
      <div key={uniqueKey()} onClick={() => showReportStatus()}>
        <IssueCard
          title={issue?.title}
          description={issue?.description}
          project={issue?.project}
        />
      </div>
    ));

    return (
      <div>
        <div className="mb-10">
          <p className="mb-2">Unreported Issues</p>
          <div className="grid gap-5 sm:grid-cols-2 md:gap-10 md:grid-cols-3 lg:grid-cols-5 ">
            {issuesNotPushedToJira}
          </div>
        </div>
        <div>
          <p className="mb-2">Reported Issues</p>
          <div className="grid gap-5 sm:grid-cols-2 md:gap-10 md:grid-cols-3 lg:grid-cols-5 ">
            {issuesPushedToJira}
          </div>
        </div>
      </div>
    );
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
      <section>
        <div className="">{displayFilteredIssues()}</div>
        <div>
          <PushIssueToJira
            show={showPushJiraModal}
            closeModal={() => setShowPushJiraModal(false)}
            {...pushIssueData}
          />
        </div>
      </section>
    </div>
  );
}
