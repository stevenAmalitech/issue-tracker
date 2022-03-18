import { NextFunction as Next, Request as Req, Response as Res } from "express";
import store from "store2";
import { authSchema } from "../joi";
import { jiraAccessToken, jiraAuthUrl } from "../services/jira.service";
import * as userService from "../services/user.service";
import {
  PostClient,
  PostClientLogin,
  PostClientPassword,
} from "../typings/auth.types";

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
    const id = await userService.createOrFindAdmin(email);

    store(sessionId, { role: "admin", id });

    res.send(email);
  } catch (error) {
    return next(error);
  }
}

export async function postClient(req: Req, res: Res, next: Next) {
  try {
    const clientCredentials = <PostClient>await authSchema.postClient({
      ...req.body,
      ...req.params,
    });

    const df = await userService.createClient(clientCredentials);
    res.send(df);
  } catch (error: any) {
    if (error.isJoi) return res.send(error.message).status(422);
    return next(error);
  }
}

export async function postClientLogin(req: Req, res: Res, next: Next) {
  try {
    const clientCredentials = <PostClientLogin>(
      await authSchema.postClientLogin(req.body)
    );

    const result = await userService.loginClient(clientCredentials);

    if (result === "input password") {
      store(req.session.id, "set-password");
      return res.send({ setPassword: true });
    }

    const [client, id] = result;
    store(req.session.id, { role: "client", id });

    res.send(client);
  } catch (error: any) {
    if (error.isJoi) return res.status(422).send(error.message);
    return next(error);
  }
}

export async function postClientPassword(req: Req, res: Res, next: Next) {
  try {
    const sessionValue = store.remove(req.session.id);
    if (sessionValue !== "set-password") return res.status(400).send();

    const clientData = <PostClientPassword>(
      await authSchema.postClientPassword(req.body)
    );

    const [client, id] = await userService.setClientPassword(clientData);
    store(req.session.id, { role: "client", id });

    res.send(client);
  } catch (error: any) {
    if (error.isJoi) return res.send(error.message).status(422);
    return next(error);
  }
}
