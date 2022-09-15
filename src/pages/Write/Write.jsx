import React, { useContext, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Button from "../../components/Button/Button";
import Input, { TextArea } from "../../components/Input/Input";
import GlobalContext from "../../context/GlobalContext";
import "./write.css";

const Write = () => {
	const [newRecipe, setNewRecipe] = useState({
		title: "",
		image: "",
		about: "",
		ingredients: "",
		content: "",
	});
	const { addNewRecipe, breakpoint } = useContext(GlobalContext);
	const handleChange = (e) => {
		const { name, value } = e.target;
		setNewRecipe((p) => ({
			...p,
			[name]: value,
		}));
	};
	const handleReset = (e) => {
		e?.preventDefault();
		setNewRecipe({
			title: "",
			image: "",
			about: "",
			ingredients: "",
			content: "",
		});
	};
	const handleSubmit = (e) => {
		e?.preventDefault();
		let recipesToSend = { ...newRecipe };
		recipesToSend.ingredients = newRecipe.ingredients.split(",");
		addNewRecipe(recipesToSend);
	};
	return (
		<main className="write">
			<section className="write-head">
				<h1>Write your own Recipe !</h1>
				{!breakpoint("mobile") && (
					<Button
						text="Publish Recipe"
						icon="save"
						onClick={handleSubmit}
					/>
				)}
			</section>
			<form onSubmit={handleSubmit} onReset={handleReset}>
				<Input
					type="text"
					placeholder="Title text"
					icon="title"
					name="title"
					value={newRecipe.title}
					onChange={handleChange}
					required
				/>
				<Input
					type="text"
					placeholder="Short Description"
					icon="info"
					name="about"
					value={newRecipe.about}
					onChange={handleChange}
					required
				/>
				<Input
					type="url"
					placeholder="Cover Image URL"
					icon="image"
					name="image"
					value={newRecipe.image}
					onChange={handleChange}
					required
				/>
				<Input
					type="text"
					placeholder="Ingredients (seperate by comma)"
					icon="soup_kitchen"
					name="ingredients"
					value={newRecipe.ingredients}
					onChange={handleChange}
					required
				/>
				<div className="form-flex">
					<TextArea
						type="text"
						placeholder="Recipe Content (markdown supported)"
						icon="restaurant_menu"
						name="content"
						value={newRecipe.content}
						onChange={handleChange}
						required
					/>
					<div className="form-md">
						<ReactMarkdown remarkPlugins={[remarkGfm]}>
							{newRecipe.content}
						</ReactMarkdown>
					</div>
				</div>
				<div className="form-group">
					<Button text="Cancel" type="reset" variant="outline" />
					<Button text="Publish Recipe" type="submit" />
				</div>
			</form>
		</main>
	);
};

export default Write;
