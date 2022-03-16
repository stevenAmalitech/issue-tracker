export interface AccessTokenParams {
  code: string;
  state: string;
  sessionId: string;
}
export interface AccessTokenResponse {
  access_token: string;
  expires_in: number;
  scope: string;
}

export interface CloudIdObject {
  id: string;
  url: string;
  name: string;
  scopes: [string];
  avatarUrl: string;
}
