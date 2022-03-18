export interface PostClient {
  email: string;
  password: string;
  adminId: number;
  // TODO: ADD FIRSTNAME AND LASTNAME
}

export interface PostClientLogin {
  email: string;
  password: string;
  adminId: number;
}

export interface PostClientPassword{
  email:string
  password:string
  originalPassword:string
}
