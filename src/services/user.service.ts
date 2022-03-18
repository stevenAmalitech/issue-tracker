import { adminModel } from "../models/admin.model";
import { clientModel } from "../models/client.model";
import {
  PostClient,
  PostClientLogin,
  PostClientPassword,
} from "../typings/auth.types";
import { verifyPassword } from "../utils/hashPasswords";

export async function createOrFindAdmin(email: string) {
  try {
    const [user, created] = await adminModel.findOrCreate({ where: { email } });
    return user.id;
  } catch (error) {
    throw error;
  }
}

export async function createClient(params: PostClient) {
  try {
    const { adminId, email, password, firstName, lastName } = params;

    await clientModel.create({
      password,
      email,
      adminId,
      lastLogin: null,
      firstName,
      lastName,
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
    const { firstName, lastName, id } = client;

    return [{ email, firstName, lastName }, id];
  } catch (error) {
    throw error;
  }
}

export async function setClientPassword(params: PostClientPassword) {
  try {
    const { email, newPassword } = params;

    const client = await clientModel.findOne({ where: { email } });
    if (!client) throw "client not found";

    await client.update({ password: newPassword, lastLogin: new Date() });

    const { firstName, lastName, id } = client;
    return [{ email, firstName, lastName }, id];
  } catch (error) {
    throw error;
  }
}
