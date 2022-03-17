import express from "express";
import { join } from "path";
import { session } from "./middleware/session";
import { openRoutes } from "./routes/open.routes";
import { protectedRoutes } from "./routes/protected.routes";

const app = express();

app.use(express.static(join(__dirname, "../client/dist")));

app.use(session);
app.use(express.json());
app.use("/api", openRoutes);
app.use("/api/auth/", protectedRoutes);

app.get("/*", (req, res) => {
  res.sendFile(join(__dirname, "../client/dist/index.html"));
});

export default app;
