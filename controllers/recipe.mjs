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

const addRecipe = async (req, res) => {
	let { title, image, about, ingredients, content } = req.body;
	if (!title || !about || !ingredients || !content)
		return res.status(400).json({ message: "Invalid Data" });
	console.log(req);
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
		console.log(error);
		return res.status(500).json({ message: "Server Error" });
	}
};

export { getAllRecipes, getRecipe, addRecipe };
