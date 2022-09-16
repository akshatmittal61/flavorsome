import { omit, remove } from "../helpers/index.mjs";
import Recipe from "../models/Recipe.mjs";
import User from "../models/User.mjs";
import { getUser } from "./auth.mjs";

const getAllRecipes = async (req, res) => {
	try {
		let allRecipes = await Recipe.find({});
		if (!allRecipes)
			return res.status(404).json({ message: "No Recipes found" }); // If the database is empty, return Status 404 Not Found
		let recipesToSend = [];
		for (const recipe of allRecipes) {
			const res = await getUser(recipe.user);
			recipesToSend.push({ ...omit(recipe, "user"), user: res }); // Convert all the userid to the use profile
		}
		return res.status(200).json({ allRecipes: recipesToSend }); // Return Status 200 OK
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Server Error" }); // On a server error return Status 500 Internal Server Error
	}
};

const getRecipe = async (req, res) => {
	const id = req.params.id;
	try {
		const foundRecipe = await Recipe.findById(id);
		if (!foundRecipe)
			return res.status(404).json({ message: "Recipe not found" }); // If no recipe is found by given id, return Status 404 Not Found
		const recipeUserObj = await getUser(foundRecipe.user);
		return res
			.status(200)
			.json({ ...omit(foundRecipe, "user"), user: recipeUserObj }); // Return Status 200 OK
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Server Error" }); // On a server error return Status 500 Internal Server Error
	}
};

const addRecipe = async (req, res) => {
	let { title, image, about, ingredients, content } = req.body;
	if (!title || !about || !ingredients || !content)
		return res.status(400).json({ message: "Invalid Data" }); // If any of the required details are absent, return Status 400 Bad Request
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
			.json({ newRecipe: recipe, message: "Added Recipe successfully" }); // Return Status 200 OK
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Server Error" }); // On a server error return Status 500 Internal Server Error
	}
};

const editRecipe = async (req, res) => {
	const id = req.params.id;
	try {
		const { ...updatedFields } = req.body;
		let foundRecipe = await Recipe.findById(id);
		if (!foundRecipe)
			return res.status(404).json({ message: "Recipe not found" }); // If the recipe is not found, return Status 404 Not Found
		if (foundRecipe.user.toString() !== req.user.id)
			return res.status(401).json({ message: "User not authorized" }); // If the logged-in user is not the author of the recipe, return Status 401 Not Authorized
		let updatedRecipe = await Recipe.findByIdAndUpdate(
			id,
			{ $set: updatedFields },
			{ new: true }
		);
		return res.status(200).json({
			updatedRecipe: updatedRecipe,
			message: "Updated Recipe successfully",
		}); // return Status 200 OK
	} catch (error) {
		console.error(error);
		if (error.kind === "ObjectId")
			return res.status(404).json({ message: "Recipe not found" });
		return res.status(500).json({ message: "Server Error" }); // On a server error return Status 500 Internal Server Error
	}
};

const getAllRecipesByUsername = async (req, res) => {
	const { username } = req.params;
	try {
		const foundUser = await User.findOne({ username });
		if (!foundUser)
			return res.status(404).json({ message: "No User found" }); // If the user is not found, return Status 404 Not Found
		const allRecipes = await Recipe.find({ user: foundUser._id });
		if (allRecipes.length === 0)
			return res.status(404).json({ message: "No Recipes Found" }); // If the logged in user has written no recipes, return Status 404 Not Found
		let recipesToSend = [];
		for (const recipe of allRecipes) {
			const res = await getUser(recipe.user);
			recipesToSend.push({ ...omit(recipe, "user"), user: res });
		}
		return res.status(200).json({ allRecipes: recipesToSend }); // Return Status 200 OK
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Server Error" }); // On a server error return Status 500 Internal Server Error
	}
};

const saveRecipe = async (req, res) => {
	const { id } = req.params;
	try {
		const foundRecipe = await Recipe.findById(id);
		if (!foundRecipe)
			return res.status(404).json({ message: "Could not find recipe" }); // If no recipe is found by given id, return Status 404 Not Found
		const foundUser = await User.findById(req.user.id);
		if (foundUser.saved.includes(id))
			return res.status(409).json({ message: "Recipe already saved" }); // If the recipe is already saved, return Status 409 Conflict
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
			.json({ message: "Saved Recipe successfully", user: updatedUser }); // return Status 200 OK
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Server Error" }); // On a server error return Status 500 Internal Server Error
	}
};

const unSaveRecipe = async (req, res) => {
	const { id } = req.params;
	try {
		const foundRecipe = await Recipe.findById(id);
		if (!foundRecipe)
			return res.status(404).json({ message: "Could not find recipe" }); // if no recipe is found, return Status 404 Not Found
		const foundUser = await User.findById(req.user.id);
		if (!foundUser.saved.includes(id))
			return res
				.status(409)
				.json({ message: "Recipe is not saved by User" }); // If the recipe is not saved, return Status 409 Conflict
		let newSavedRecpies = remove(foundUser.saved, id);
		let updatedUser = await User.findByIdAndUpdate(
			req.user.id,
			{
				$set: { saved: newSavedRecpies },
			},
			{ new: true }
		).select("-password");
		return res.status(200).json({
			message: "Unsaved Recipe successfully",
			user: updatedUser,
		}); // return Status 200 OK
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Server Error" }); // On a server error return Status 500 Internal Server Error
	}
};

const getSavedRecipes = async (req, res) => {
	try {
		const foundUser = await User.findById(req.user.id);
		if (!foundUser)
			return res.status(404).json({ message: "User not found" }); // If the user is not found return Status 404 Not Found
		let savedRecipes = foundUser.saved;
		let allRecipes = [];
		for (const recipeId of savedRecipes) {
			const fetchedRecipe = await Recipe.findById(recipeId.toString());
			if (!fetchedRecipe)
				return res.status(400).json({ message: "Invalid recipe id" }); // If the recipe is not found, return Status 401 Bad Request
			allRecipes = [...allRecipes, fetchedRecipe];
		}
		let recipesToSend = [];
		for (const recipe of allRecipes) {
			const res = await getUser(recipe.user);
			recipesToSend.push({ ...omit(recipe, "user"), user: res });
		}
		return res
			.status(200)
			.json({ message: "Fetched Saved Recipes", recipes: recipesToSend }); // return Status 200 OK
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Server Error" }); // On a server error return Status 500 Internal Server Error
	}
};

export {
	getAllRecipes,
	getRecipe,
	addRecipe,
	editRecipe,
	getAllRecipesByUsername,
	saveRecipe,
	unSaveRecipe,
	getSavedRecipes,
};
