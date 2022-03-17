import Joi, { object } from "joi";

export const authSchema = {
  getJiraAuthUrl: (object: any) =>
    Joi.object({
      email: Joi.string().email().required(),
    }).validateAsync(object),

  postClient: (object: any) =>
    Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      adminId: Joi.number().required(),
    }).validateAsync(object),

  postClientLogin: (object: any) =>
    Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      adminId: Joi.number(),
    }).validateAsync(object),
};
