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
  body?: any;
}

export interface JiraPostIssue {
  projectId: string;
  issueId: number;
  issueTypeId: string;
  summary: string;
  description: string;
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

export interface JiraIssueDetails {
  id: string;
  key: string;
  self: string;
}

export interface CreateIssue {
  update?: {};
  fields: {
    summary: string;
    parent?: {
      key: string; //PROJECT KEY
    };
    issuetype: {
      id: string;
    };
    components?: [
      {
        id: string;
      }
    ];
    customfield_20000?: string;
    customfield_40000?: {
      type: string;
      version: 1;
      content: [
        {
          type: string;
          content: [
            {
              text: string;
              type: string;
            }
          ];
        }
      ];
    };
    customfield_70000?: [string];
    project: {
      id: string;
    };
    description: {
      type: "doc";
      version: number;
      content: [
        {
          type: "paragraph";
          content: [
            {
              text: string;
              type: "text";
            }
          ];
        }
      ];
    };
    reporter: {
      id: string;
    };
    fixVersions: [
      {
        id: string;
      }
    ];
    customfield_10000: string;
    priority: {
      id: string;
    };
    labels: [string];
    timetracking: {
      remainingEstimate: string;
      originalEstimate: string;
    };
    customfield_30000: [string];
    customfield_80000: {
      value: string;
    };
    security: {
      id: string;
    };
    environment: {
      type: string;
      version: 1;
      content: [
        {
          type: string;
          content: [
            {
              text: string;
              type: string;
            }
          ];
        }
      ];
    };
    versions: [
      {
        id: string;
      }
    ];
    duedate: string;
    customfield_60000: string;
    customfield_50000: {
      type: string;
      version: 1;
      content: [
        {
          type: string;
          content: [
            {
              text: string;
              type: string;
            }
          ];
        }
      ];
    };
    assignee: {
      id: string;
    };
  };
}
