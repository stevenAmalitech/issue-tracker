import express from "express";
import { join } from "path";

const app = express();

app.use(express.json());

app.use(express.static(join(__dirname, "../client/dist")));

app.get("/", (req, res) => {
  res.send("ok");
});

app.get("/*", (req, res) => {
  res.sendFile(join(__dirname, "../client/dist/index.html"));
});

export default app;
