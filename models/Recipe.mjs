import mongoose from "mongoose";

const RecipeSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		title: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			default:
				"https://st2.depositphotos.com/3740491/8238/v/950/depositphotos_82387026-stock-illustration-outline-seamless-pattern-with-hand.jpg",
		},
		date: {
			type: Date,
			required: false,
		},
		about: {
			type: String,
			required: true,
		},
		ingredients: {
			type: [String],
			required: true,
		},
		content: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const Recipe = mongoose.model("recipe", RecipeSchema);
export default Recipe;
