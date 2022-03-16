import { NextFunction as Next, Request as Req, Response as Res } from "express";
import { jiraAccessToken, jiraAuthUrl } from "../services/jira.service";

export async function getJiraAuthUrl(req: Req, res: Res, next: Next) {
  const url = jiraAuthUrl(req.session.id);

  if (url) res.redirect(url);
  else next({});
}

export async function getJiraAccessToken(req: Req, res: Res, next: Next) {
  const { code, state } = req.query;
  const sessionId = req.session.id;

  if (!code || typeof code !== "string" || !state || typeof state !== "string")
    return next({ status: 400 });

  try {
    const df = await jiraAccessToken({ code, state, sessionId });

    res.send(df);
  } catch (error) {
    return next({ status: 400 });
  }
}
