import { PostIssue } from "../typings/issues.types";
import { issueModel, Screenshot } from "../models/issue.model";
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
      attributes: ["id", "title", "description", "screenshot"],
      include: {
        model: clientModel,
        // as: "client",
        // where: { id: 1 },
        attributes: ["projectId", "id"],
        required: false
      },
    });

    return issues;
  } catch (error) {
    throw error;
  }
}
