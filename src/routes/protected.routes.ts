import express from "express";
import * as authController from "../controllers/auth.controller";
import * as issuesController from "../controllers/issues.controller";
import { authenticateUser } from "../middleware/authenticateUser";
import { uploadImage } from "../middleware/uploadImage";

const router = express.Router();

router.use(authenticateUser);

router.get("/user", authController.getUser);

// admin routes
router.post("/client", authController.postClient);

// client routes
router.post(
  "/issue",
  uploadImage.single("screenshot"),
  issuesController.postIssue
);

export { router as protectedRoutes };
