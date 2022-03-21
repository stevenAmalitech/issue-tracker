import { NextFunction as Next, Request as Req, Response as Res } from "express";
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
