import { omit } from "../helpers/index.mjs";
import Recipe from "../models/Recipe.mjs";
import User from "../models/User.mjs";
import { getUser } from "./auth.mjs";

const getAllRecipes = async (req, res) => {
	try {
		let allRecipes = await Recipe.find({});
		if (!allRecipes)
			return res.status(404).json({ message: "No Recipes found" });
		let recipesToSend = [];
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

const getAllRecipesByUsername = async (req, res) => {
	const { username } = req.params;
	try {
		const foundUser = await User.findOne({ username });
		if (!foundUser)
			return res.status(400).json({ message: "No User found" });
		const allRecipes = await Recipe.find({ user: foundUser._id });
		let recipesToSend = [];
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

const saveRecipe = async (req, res) => {
	const { id } = req.params;
	try {
		const foundRecipe = await Recipe.findById(id);
		if (!foundRecipe)
			return res.status(400).json({ message: "Could not find recipe" });
		const foundUser = await User.findById(req.user.id);
		console.log(foundUser);
		// let userToSet = { ...omit(foundUser, "") };
		let newSavedRecpies = [...foundUser.saved, id];
		let updatedUser = await User.findByIdAndUpdate(
			req.user.id,
			{
				$set: { saved: newSavedRecpies },
			},
			{ new: true }
		).select("-password");
		return res
			.status(200)
			.json({ message: "Saved Recipe successfully", user: updatedUser });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Server Error" });
	}
};

const getSavedRecipes = async (req, res) => {
	try {
		const foundUser = await User.findById(req.user.id);
		if (!foundUser)
			return res.status(401).json({ message: "User not found" });
		let savedRecipes = foundUser.saved;
		console.log(savedRecipes);
		let recipesToSend = [];
		for (const recipeId of savedRecipes) {
			const fetchedRecipe = await Recipe.findById(recipeId.toString());
			if (!fetchedRecipe)
				return res.status(400).json({ message: "Invalid recipe id" });
			recipesToSend = [...recipesToSend, fetchedRecipe];
		}
		return res
			.status(200)
			.json({ message: "Fetched Saved Recipes", recipes: recipesToSend });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Server Error" });
	}
};

export {
	getAllRecipes,
	getRecipe,
	addRecipe,
	editRecipe,
	getAllRecipesByUsername,
	saveRecipe,
	getSavedRecipes,
};
