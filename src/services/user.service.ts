import { adminModel } from "../models/admin.model";
import { clientModel } from "../models/client.model";
import { PostClient } from "../typings/auth.types";

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
    console.log(error.type);
    throw error;
  }
}
