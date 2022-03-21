import { NextFunction as Next, Request as Req, Response as Res } from "express";
import { jiraSchema } from "../joi";
import * as jiraService from "../services/jira.service";

export async function getProjects(req: Req, res: Res, next: Next) {
  try {
    const projects = await jiraService.searchProjects(req.session?.id);
    res.send(projects);
  } catch (error) {
    next(error);
  }
}

export async function getIssueTypes(req: Req, res: Res, next: Next) {
  try {
    const issueTypes = await jiraService.issueTypes(req.session.id);
    res.send(issueTypes);
  } catch (error) {
    next(error);
  }
}

export async function postIssue(req: Req, res: Res, next: Next) {
  try {
    const issueDetails = await jiraSchema.postIssue(req.body);
    const issueId = await jiraService.createIssues(
      req.session.id,
      issueDetails
    );

    res.send(issueId);
  } catch (error) {
    next(error);
  }
}
