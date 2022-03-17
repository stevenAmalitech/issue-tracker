import { adminModel } from "../models/admin.model";
import { clientModel } from "../models/client.model";
import { PostClient, PostClientLogin } from "../typings/auth.types";
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
    const { adminId, email, password } = params;

    await clientModel.create({
      password,
      email,
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

    if (!(adminId && adminId === client.adminId)) throw "unknown";

    const isPasswordValid = await verifyPassword(password, client.password);
    if (!isPasswordValid) throw "password invalid";

    if (!client.lastName) return "input password";

    const { firstName, lastName, id } = client;

    return [{ email, firstName, lastName }, id];
  } catch (error) {
    throw error;
  }
}
