import { NextFunction as Next, Request as Req, Response as Res } from "express";
import store from "store2";
import { authSchema } from "../joi";
import { jiraAccessToken, jiraAuthUrl } from "../services/jira.service";
import { createClient, createOrFindAdmin } from "../services/user.service";
import { PostClient } from "../typings/auth.types";

export async function getJiraAuthUrl(req: Req, res: Res, next: Next) {
  const sessionId = req.session.id;
  const { email } = req.query;

  if (!email) return next({ staus: 400 });

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

    res.send(email);
  } catch (error) {
    console.error(error);
    return next({ status: 400 });
  }
}

export async function postClient(req: Req, res: Res, next: Next) {
  try {
    const clientData = <PostClient>await authSchema.postClient({
      ...req.body,
      ...req.params,
    });

    const df = await createClient(clientData);
    res.send(df);
  } catch (error) {
    console.error(error);
    return next({ status: 400 });
  }
}
