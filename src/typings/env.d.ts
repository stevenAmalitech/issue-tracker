declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
      PORT: string;
      DB_TYPE: string;
      DB_HOST: string;
      DB_PORT: string;
      DB_USERNAME: string;
      DB_PASSWORD: string;
      DB_NAME: string;
      DATABASE_URL: string;
      JIRA_API_AUTH_URL: string;
      JIRA_CLIENT_ID: string;
      JIRA_SECRET: string;
      JIRA_REDIRECT_URI: string;
      KEY_1: string;
      KEY_2: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
