import { adminModel } from "../models/admin.model";
import { clientModel } from "../models/client.model";
import {
  PostClient,
  PostClientLogin,
  PostClientPassword,
} from "../typings/auth.types";
import { hashPassword, verifyPassword } from "../utils/hashPasswords";

export async function createOrFindAdmin(email: string) {
  try {
    const [user, created] = await adminModel.findOrCreate({ where: { email } });
    return user.id;
  } catch (error) {
    throw error;
  }
}

export async function createClient(params: PostClient, adminId: number) {
  try {
    const { name, email, password, organization } = params;

    await clientModel.create({
      password: await hashPassword(password),
      email,
      name,
      lastLogin: null,
      organization,
      adminId,
    });

    return "ok";
  } catch (error: any) {
    throw error;
  }
}

export async function loginClient(params: PostClientLogin) {
  try {
    const { email, password, adminId } = params;

    const client = await clientModel.findOne({ where: { email } });
    if (!client) throw "client not found";

    if (adminId) if (adminId !== client.adminId) throw "unknown";

    const isPasswordValid = await verifyPassword(password, client.password);
    if (!isPasswordValid) throw "password invalid";

    if (client.lastLogin === null) return "input password";

    client.update({ lastLogin: new Date() });
    const { name, organization, id } = client;

    return [{ email, name, organization, id }, id];
  } catch (error) {
    throw error;
  }
}

export async function setClientPassword(params: PostClientPassword) {
  try {
    const { email, newPassword } = params;

    const client = await clientModel.findOne({ where: { email } });
    if (!client) throw "client not found";

    const password = await hashPassword(newPassword);

    await client.update({ password, lastLogin: new Date() });

    const { name, organization, id } = client;
    return [{ email, name, organization, id }, id];
  } catch (error) {
    throw error;
  }
}
