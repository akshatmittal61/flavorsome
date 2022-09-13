import { Router } from "express";
import { getAllRecipes } from "../controllers/recipe.mjs";

const router = Router();

router.get("/", getAllRecipes);

export default router;
