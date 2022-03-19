import { NextFunction as Next, Request as Req, Response as Res } from "express";
import { issuesSchema } from "../joi";
import { PostIssue } from "../typings/issues.types";
import * as issueService from "../services/issue.service";

export async function postIssue(req: Req, res: Res, next: Next) {
  try {
    const issueDetails = <PostIssue>(
      await issuesSchema.postIssue({ ...req.body })
    );

    const issue = await issueService.createIssue(
      { ...issueDetails, screenshot: req.file },
      // @ts-expect-error
      req.user
    );

    res.send(issue);
  } catch (error) {
    next(error);
  }
}
