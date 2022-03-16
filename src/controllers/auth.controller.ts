import { NextFunction as Next, Request as Req, Response as Res } from "express";
import store from "store2";
import { jiraAccessToken, jiraAuthUrl } from "../services/jira.service";
import { createOrFindAdmin } from "../services/user.service";

export async function getJiraAuthUrl(req: Req, res: Res, next: Next) {
  const sessionId = req.session.id;
  const email = req.query.email;

  store(sessionId, email);

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
    await jiraAccessToken({ code, state, sessionId });

    const email = store.remove(sessionId);
    const id = await createOrFindAdmin(email);
    
    store(sessionId, { role: "admin", id });

    res.send("done");
  } catch (error) {
    return next({ status: 400 });
  }
}
