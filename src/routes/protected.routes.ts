import express from "express";
import * as auth from "../controllers/auth.controller";

const router = express.Router();

router.post("/client/:adminId", auth.postClient);

export { router as protectedRoutes };
