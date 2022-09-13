import { Router } from "express";
import { register } from "../controllers/auth.mjs";

const router = Router();

router.post("/register", register);

export default router;
