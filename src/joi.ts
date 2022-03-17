import Joi from "joi";

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
};
