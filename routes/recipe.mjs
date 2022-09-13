import { Router } from "express";
import { getAllRecipes, getRecipe } from "../controllers/recipe.mjs";

const router = Router();

router.get("/", getAllRecipes);
router.get("/:id", getRecipe);

export default router;
