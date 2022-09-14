import { omit } from "../helpers/index.mjs";
import Recipe from "../models/Recipe.mjs";
import { getUser } from "./auth.mjs";

const getAllRecipes = async (req, res) => {
	try {
		let allRecipes = await Recipe.find({});
		let recipesToSend = [];
		if (!allRecipes)
			return res.status(404).json({ message: "No Recipes found" });
		for (const recipe of allRecipes) {
			const res = await getUser(recipe.user);
			recipesToSend.push({ ...omit(recipe, "user"), user: res });
		}
		return res.status(200).json({ allRecipes: recipesToSend });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Server Error" });
	}
};

const getRecipe = async (req, res) => {
	const id = req.params.id;
	try {
		const foundRecipe = await Recipe.findById(id);
		if (!foundRecipe)
			return res.status(404).json({ message: "Recipe not found" });
		const recipeUserObj = await getUser(foundRecipe.user);
		return res
			.status(200)
			.json({ ...omit(foundRecipe, "user"), user: recipeUserObj });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Server Error" });
	}
};

const addRecipe = async (req, res) => {
	let { title, image, about, ingredients, content } = req.body;
	if (!title || !about || !ingredients || !content)
		return res.status(400).json({ message: "Invalid Data" });
	try {
		let date = Date().slice(4, 15);
		const newRecipe = new Recipe({
			user: req.user.id,
			title,
			image,
			date,
			about,
			ingredients,
			content,
		});
		const recipe = await newRecipe.save();
		return res
			.status(200)
			.json({ newRecipe: recipe, message: "Added Recipe successfully" });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Server Error" });
	}
};

const editRecipe = async (req, res) => {
	const id = req.params.id;
	try {
		const { ...updatedFields } = req.body;
		let foundRecipe = await Recipe.findById(id);
		if (!foundRecipe)
			return res.status(404).json({ message: "Recipe not found" });
		if (foundRecipe.user.toString() !== req.user.id)
			return res.status(401).json({ message: "User not authorized" });
		let updatedRecipe = await Recipe.findByIdAndUpdate(
			id,
			{ $set: updatedFields },
			{ new: true }
		);
		return res.status(200).json({
			updatedRecipe: updatedRecipe,
			message: "Updated Recipe successfully",
		});
	} catch (error) {
		console.error(error);
		if (error.kind === "ObjectId")
			return res.status(404).json({ message: "Recipe not found" });
		return res.status(500).json({ message: "Server Error" });
	}
};

export { getAllRecipes, getRecipe, addRecipe, editRecipe };
