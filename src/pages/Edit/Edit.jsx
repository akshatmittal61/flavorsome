import React, { useContext, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router-dom";
import remarkGfm from "remark-gfm";
import Button from "../../components/Button/Button";
import Input, { TextArea } from "../../components/Input/Input";
import GlobalContext from "../../context/GlobalContext";
import { accessDenied } from "../../utils/images";
import "../Write/write.css";

const Edit = () => {
	const { user, getSingleRecipe, updateOneRecipe } =
		useContext(GlobalContext);
	const [recipeToEdit, setRecipeToEdit] = useState({
		title: "",
		image: "",
		about: "",
		ingredients: "",
		content: "",
		user: {
			...user,
		},
	});
	const { id } = useParams();
	const [originalRecipe, setOriginalRecipe] = useState({});
	const handleChange = (e) => {
		const { name, value } = e.target;
		setRecipeToEdit((p) => ({
			...p,
			[name]: value,
		}));
	};
	const handleSubmit = (e) => {
		e?.preventDefault();
		let recipesToSend = { ...recipeToEdit };
		recipesToSend.ingredients = recipeToEdit.ingredients.split(",");
		let editedRecipe = { username: user.username };
		for (let i in recipeToEdit) {
			if (recipeToEdit[i] !== originalRecipe[i])
				editedRecipe = { ...editedRecipe, [i]: recipeToEdit[i] };
		}
		updateOneRecipe(originalRecipe?._id, editedRecipe);
	};

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const fetchRecipe = async () => {
		const fetchedRecipe = await getSingleRecipe(id);
		let ing = fetchedRecipe?.ingredients?.join(",");
		setRecipeToEdit({
			...fetchedRecipe,
			ingredients: ing,
		});
		setOriginalRecipe({
			...fetchedRecipe,
			ingredients: ing,
		});
	};
	useEffect(() => {
		fetchRecipe();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<main className="write">
			{recipeToEdit.user.username === user.username ? (
				<>
					<section className="write-head">
						<h1>{recipeToEdit.title}</h1>
						<Button
							text="Update Recipe"
							icon="save"
							onClick={handleSubmit}
						/>
					</section>
					<form onSubmit={handleSubmit}>
						<Input
							type="text"
							placeholder="Title text"
							icon="title"
							name="title"
							value={recipeToEdit.title}
							onChange={handleChange}
							required
						/>
						<Input
							type="text"
							placeholder="Short Description"
							icon="info"
							name="about"
							value={recipeToEdit.about}
							onChange={handleChange}
							required
						/>
						<Input
							type="url"
							placeholder="Cover Image URL"
							icon="image"
							name="image"
							value={recipeToEdit.image}
							onChange={handleChange}
							required
						/>
						<Input
							type="text"
							placeholder="Ingredients (seperate by comma)"
							icon="soup_kitchen"
							name="ingredients"
							value={recipeToEdit.ingredients}
							onChange={handleChange}
							required
						/>
						<div className="form-flex">
							<TextArea
								type="text"
								placeholder="Recipe Content (markdown supported)"
								icon="restaurant_menu"
								name="content"
								value={recipeToEdit.content}
								onChange={handleChange}
								required
							/>
							<div className="form-md">
								<ReactMarkdown remarkPlugins={[remarkGfm]}>
									{recipeToEdit.content}
								</ReactMarkdown>
							</div>
						</div>
						<div className="form-group">
							<Button
								text="Cancel"
								type="reset"
								variant="outline"
							/>
							<Button text="Update Recipe" type="submit" />
						</div>
					</form>
				</>
			) : (
				<>
					<section className="write-null">
						<div className="write-null-image">
							<img src={accessDenied} alt="No User Found" />
						</div>
						<h2>Access Denied</h2>
						<h4>
							You can't edit the recipe "{recipeToEdit.title}"
						</h4>
					</section>
				</>
			)}
		</main>
	);
};

export default Edit;
