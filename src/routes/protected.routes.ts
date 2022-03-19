import express from "express";
import * as auth from "../controllers/auth.controller";
import { authenticateUser } from "../middleware/authenticateUser";

const router = express.Router();

router.use(authenticateUser);
router.post("/client", auth.postClient);

export { router as protectedRoutes };
