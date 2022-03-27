import { PostIssue } from "../typings/issues.types";
import { IssueAttributes, issueModel, Screenshot } from "../models/issue.model";
import { ClientAttributes, clientModel } from "../models/client.model";

export async function createIssue(params: PostIssue, client: ClientAttributes) {
  try {
    const { description, title, screenshot } = params;

    await issueModel.create({
      description,
      title,
      screenshot: screenshot as Screenshot,
      adminId: client.adminId,
      clientId: client.id,
    });

    return { description, title, screenshot };
  } catch (error) {
    throw error;
  }
}

export async function allIssues(adminId: number) {
  try {
    const issues = await issueModel.findAll({
      where: { adminId },
      attributes: ["id", "title", "description", "screenshot", "jiraDetails"],
      include: {
        model: clientModel,
        attributes: ["projectId", "id"],
        required: false,
      },
    });

    return issues;
  } catch (error) {
    throw error;
  }
}

export async function updateIssue(id: number, object: IssueAttributes) {
  try {
    await issueModel.update(object, { where: { id } });
  } catch (error) {
    throw error
  }
}
