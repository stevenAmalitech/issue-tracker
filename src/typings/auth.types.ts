export interface PostClient {
  email: string;
  password: string;
  adminId: number;
  firstName: string;
  lastName: string;
}

export interface PostClientLogin {
  email: string;
  password: string;
  adminId: number;
}

export interface PostClientPassword {
  email: string;
  password: string;
  originalPassword: string;
}
