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
