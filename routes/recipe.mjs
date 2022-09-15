import { Router } from "express";
import {
	addRecipe,
	editRecipe,
	getAllRecipes,
	getAllRecipesByUsername,
	getRecipe,
	getSavedRecipes,
	saveRecipe,
	unSaveRecipe,
} from "../controllers/recipe.mjs";
import auth from "../middleware/auth.mjs";

const router = Router();

router.get("/", getAllRecipes);
router.put("/save/:id", auth, saveRecipe);
router.put("/unsave/:id", auth, unSaveRecipe);
router.get("/saved", auth, getSavedRecipes);
router.get("/:id", getRecipe);
router.post("/add", auth, addRecipe);
router.put("/edit/:id", auth, editRecipe);
router.get("/:username/recipes", getAllRecipesByUsername);

export default router;
