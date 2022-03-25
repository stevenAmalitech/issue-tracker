export interface PostClient {
  email: string;
  password: string;
  name: string;
  organization: string;
  projectId: number;
}

export interface UpdateClient {
  email?: string;
  password?: string;
  name?: string;
  organization?: string;
  projectId?: number;
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
