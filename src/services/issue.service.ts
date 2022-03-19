import { PostIssue } from "../typings/issues.types";
import { issueModel, Screenshot } from "../models/issue.model";
import { ClientAttributes } from "../models/client.model";

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
