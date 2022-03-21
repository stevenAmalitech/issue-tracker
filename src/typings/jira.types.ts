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

export interface MakeJiraApiCall {
  accessToken: string;
  url: string;
  method: "get" | "post";
}

export interface Project {
  expand: string;
  self: string;
  id: string;
  key: string;
  name: string;
  avatarUrls: object;
  projectTypeKey: string;
  simplified: boolean;
  style: string;
  isPrivate: boolean;
  properties: object;
}

export interface SearchProjects {
  self: string;
  maxResults: number;
  startAt: number;
  total: number;
  isLast: boolean;
  values: [Project];
}

export interface IssueTypeDetails {
  self: string;
  id: string;
  description: string;
  iconUrl: string;
  name: string;
  subtask: true;
  avatarId: number;
  entityId: string;
  hierarchyLevel: number;
  scope: {
    type: string; //PROJECT INTERFACE
    project: {
      self: string;
      id: string;
      key: string;
      name: string;
      projectTypeKey: string;
      simplified: boolean;
      avatarUrls: {};
      projectCategory: {};
    };
  };
}
