import Joi, { object } from "joi";

export const authSchema = {
  getJiraAuthUrl: (object: any) =>
    Joi.object({
      email: Joi.string().email().required(),
    }).validateAsync(object),

  postClient: (object: any) =>
    Joi.object({
      email: Joi.string().email().required(),
      name: Joi.string().lowercase().required(),
      organization: Joi.string().lowercase().required(),
      password: Joi.string().required(),
    }).validateAsync(object),

  postClientLogin: (object: any) =>
    Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      adminId: Joi.number(),
    }).validateAsync(object),

  postClientPassword: (object: any) =>
    Joi.object({
      email: Joi.string().email().required(),
      newPassword: Joi.string().required(),
      repeatedPassword: Joi.string().equal(Joi.ref("newPassword")),
    }).validateAsync(object),
};
