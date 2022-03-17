import express from "express";
import * as auth from "../controllers/auth.controller";

const router = express.Router();

router.get("/jira-login", auth.getJiraAuthUrl);
router.get("/jira-auth-code", auth.getJiraAccessToken);

router.post("/client-login", auth.postClientLogin)

export { router as openRoutes };
