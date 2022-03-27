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

export interface GetIssue {
  expand: string;
  id: string;
  self: string;
  key: string;
  fields: {
    watcher: {
      self: string;
      isWatching: false;
      watchCount: 1;
      watchers: [
        {
          self: string;
          accountId: string;
          displayName: string;
          active: false;
        }
      ];
    };
    attachment: [
      {
        id: 10000;
        self: string;
        filename: string;
        author: {
          self: string;
          key: string;
          accountId: string;
          accountType: string;
          name: string;
          avatarUrls: {};
          displayName: string;
          active: false;
        };
        created: string;
        size: 23123;
        mimeType: string;
        content: string;
        thumbnail: string;
      }
    ];
    "sub-tasks": [
      {
        id: string;
        type: {
          id: string;
          name: string;
          inward: string;
          outward: string;
        };
        outwardIssue: {
          id: string;
          key: string;
          self: string;
          fields: {
            status: {
              iconUrl: string;
              name: string;
            };
          };
        };
      }
    ];
    description: {
      type: string;
      version: 1;
      content: [
        {
          type: string;
          content: [
            {
              type: string;
              text: string;
            }
          ];
        }
      ];
    };
    project: {
      self: string;
      id: string;
      key: string;
      name: string;
      avatarUrls: {};
      projectCategory: {
        self: string;
        id: string;
        name: string;
        description: string;
      };
      simplified: false;
      style: string;
      insight: {
        totalIssueCount: 100;
        lastIssueUpdateTime: string;
      };
    };
    comment: [
      {
        self: string;
        id: string;
        author: {
          self: string;
          accountId: string;
          displayName: string;
          active: false;
        };
        body: {
          type: string;
          version: 1;
          content: [
            {
              type: string;
              content: [
                {
                  type: string;
                  text: string;
                }
              ];
            }
          ];
        };
        updateAuthor: {
          self: string;
          accountId: string;
          displayName: string;
          active: false;
        };
        created: string;
        updated: string;
        visibility: {
          type: string;
          value: string;
        };
      }
    ];
    issuelinks: [
      {
        id: string;
        type: {
          id: string;
          name: string;
          inward: string;
          outward: string;
        };
        outwardIssue: {
          id: string;
          key: string;
          self: string;
          fields: {
            status: {
              iconUrl: string;
              name: string;
            };
          };
        };
      },
      {
        id: string;
        type: {
          id: string;
          name: string;
          inward: string;
          outward: string;
        };
        inwardIssue: {
          id: string;
          key: string;
          self: string;
          fields: {
            status: {
              iconUrl: string;
              name: string;
            };
          };
        };
      }
    ];
    worklog: [
      {
        self: string;
        author: {
          self: string;
          accountId: string;
          displayName: string;
          active: false;
        };
        updateAuthor: {
          self: string;
          accountId: string;
          displayName: string;
          active: false;
        };
        comment: {
          type: string;
          version: 1;
          content: [
            {
              type: string;
              content: [
                {
                  type: string;
                  text: string;
                }
              ];
            }
          ];
        };
        updated: string;
        visibility: {
          type: string;
          value: string;
          identifier: string;
        };
        started: string;
        timeSpent: string;
        timeSpentSeconds: 12000;
        id: string;
        issueId: string;
      }
    ];
    updated: 1;
    timetracking: {
      originalEstimate: string;
      remainingEstimate: string;
      timeSpent: string;
      originalEstimateSeconds: 600;
      remainingEstimateSeconds: 200;
      timeSpentSeconds: 400;
    };
  };
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
