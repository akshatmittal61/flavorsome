import { Router } from "express";
import {
	editProfile,
	getProfile,
	login,
	register,
	verifyUser,
} from "../controllers/auth.mjs";
import auth from "../middleware/auth.mjs";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/", auth, verifyUser);
router.put("/edit", auth, editProfile);
router.get("/profile/:username", getProfile);

export default router;
