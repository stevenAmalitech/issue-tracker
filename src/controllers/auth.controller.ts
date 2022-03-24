import { NextFunction as Next, Request as Req, Response as Res } from "express";
import { authSchema } from "../joi";
import { jiraAccessToken, jiraAuthUrl } from "../services/jira.service";
import * as userService from "../services/user.service";
import {
  PostClient,
  PostClientLogin,
  PostClientPassword,
} from "../typings/auth.types";
import { sessionStore } from "../utils/sessionStore";

export async function getJiraAuthUrl(req: Req, res: Res, next: Next) {
  const sessionId = req.session.id;
  const { email } = req.query;

  if (!email) return next({ staus: 404 });

  const url = jiraAuthUrl(sessionId);
  sessionStore.set(sessionId, { email: email as string });

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

    const email = sessionStore.get(sessionId)?.email;
    if (!email) return next({ status: 400 });

    const id = await userService.createOrFindAdmin(email);

    sessionStore.set(sessionId, { role: "admin", id });

    // modify session
    // @ts-expect-error
    req.session.user = { id, role: "admin" };
    req.session.save();

    res.redirect("/admin");
  } catch (error) {
    return next(error);
  }
}

export async function postClient(req: Req, res: Res, next: Next) {
  try {
    const clientCredentials = <PostClient>await authSchema.postClient({
      ...req.body,
    });
    // @ts-expect-error
    const df = await userService.createClient(clientCredentials, req.user.id);
    res.send(df);
  } catch (error: any) {
    if (error.isJoi) return res.status(422).send(error.message);
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
      sessionStore.set(req.session.id, { setPassword: true });
      return res.send({ setPassword: true });
    }

    const [client, id] = result;
    sessionStore.set(req.session.id, { role: "client", id: id as number });

    // modify session
    // @ts-expect-error
    req.session.user = { id, role: "client" };
    req.session.save();

    res.send(client);
  } catch (error: any) {
    if (error.isJoi) return res.status(422).send(error.message);
    return next(error);
  }
}

export async function postClientPassword(req: Req, res: Res, next: Next) {
  try {
    const setPassword = sessionStore.get(req.session.id)?.setPassword;
    if (!setPassword) return res.status(400).send();

    const clientData = <PostClientPassword>(
      await authSchema.postClientPassword(req.body)
    );

    const [client, id] = await userService.setClientPassword(clientData);

    sessionStore.set(req.session.id, { role: "client", id: id as number });

    // modify session
    // @ts-expect-error
    req.session.user = { id, role: "client" };
    req.session.save();

    res.send(client);
  } catch (error: any) {
    if (error.isJoi) return res.send(error.message).status(422);
    return next(error);
  }
}

export async function tempLogin(req: Req, res: Res, next: Next) {
  if (process.env.NODE_ENV === "production") return res.redirect("/");

  sessionStore.set(req.session.id, {
    role: req.query.role as "admin" | "client",
    // @ts-ignore
    id: req.query.id as number,
  });

  // modify session
  // @ts-expect-error
  req.session.user = { role: req.query.role, id: req.query.id };
  req.session.save();

  res.send({ role: req.query.role, id: req.query.id });
}

export async function getUser(req: Req, res: Res, next: Next) {
  res.send(sessionStore.get(req.session.id));
}
