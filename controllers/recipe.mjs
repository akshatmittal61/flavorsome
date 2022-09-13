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

export { getAllRecipes };
