import Recipe from "../models/Recipe.mjs";

const getAllRecipes = async (req, res) => {
	try {
		const allRecipes = await Recipe.find({});
		return res.status(200).json({ allRecipes: allRecipes });
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
		return res.status(200).json(foundRecipe);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Server Error" });
	}
};

export { getAllRecipes, getRecipe };
