export interface PostClient {
  email: string;
  password: string;
  name: string;
  organization: string;
}

export interface PostClientLogin {
  email: string;
  password: string;
  adminId: number;
}

export interface PostClientPassword {
  email: string;
  newPassword: string;
}
