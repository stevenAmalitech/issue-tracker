interface SessionData {
  role?: "client" | "admin";
  id?: number;
  setPassword?: boolean;
  email?: string;
}
const store = new Map();

export const sessionStore = {
  set(sessionId: string, data: SessionData) {
    store.set(sessionId, data);
  },

  get(sessionId: string) {
    const data: SessionData = store.get(sessionId);
    return data;
  },
};
