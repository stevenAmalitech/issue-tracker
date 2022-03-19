import store from "store2";
import type {
  Request as Req,
  Response as Res,
  NextFunction as Next,
} from "express";
import { clientModel } from "../models/client.model";
import { adminModel } from "../models/admin.model";

export function authenticateUser(req: Req, res: Res, next: Next) {
  const user = store(req.session.id);
  if (!user) throw { status: 401 };
  if (typeof user !== "object") throw { status: 401 };

  (async () => {
    let found;
    if (user.role === "client") found = await clientModel.findByPk(user.id);
    if (user.role === "admin") found = await adminModel.findByPk(user.id);

    req.user = { ...user, ...found?.toJSON() };
    next();
  })();
}
