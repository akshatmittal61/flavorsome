import React, { useEffect } from "react";
import { ArrowLeftCircle, Bookmark } from "react-feather";
import ReactMarkdown from "react-markdown";
import { useNavigate, useParams, Link } from "react-router-dom";
import recipes from "../../utils/recipes";
import "./recipe.css";

const Recipe = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	let recipe = recipes.find((o) => o.id === id);
	const body = document.querySelector("body");
	useEffect(() => {
		body.style.backgroundColor = "rgba(0, 0, 0, 0.34)";
		body.style.backgroundImage = `url(${recipe.image})`;
		return () => {
			body.style.backgroundColor = "var(--bgcolor)";
			body.style.backgroundImage = `none`;
		};
	}, [body.style, recipe.image]);
	return (
		<main className="main">
			<div className="main-cover">
				<button
					className="main-cover-back"
					onClick={() => navigate(-1)}
				>
					<ArrowLeftCircle /> Go Back
				</button>
				<button className="main-cover-save">
					<Bookmark />
				</button>
			</div>
			<div className="main-container" data-aos="fade-up">
				<section className="recipe">
					<div className="recipe-body">
						<div className="recipe-title">
							<h1>{recipe.title}</h1>
						</div>
						<div className="recipe-user">
							<div className="recipe-user__image">
								<Link to={`/users/${recipe.user.username}`}>
									<img
										src={recipe.user.avatar}
										alt={
											recipe.user.fname +
											" " +
											recipe.user.lname
										}
									/>
								</Link>
							</div>
							<div className="recipe-user__details">
								<Link to={`/users/${recipe.user.username}`}>
									{recipe.user.fname +
										" " +
										recipe.user.lname}
								</Link>
								<span>{recipe.date}</span>
							</div>
						</div>
						<span className="recipe-about">{recipe.about}</span>
						<span className="recipe-ingredients">
							<h3>Ingredients</h3>
							<ul>
								{recipe.ingredients.map((ingredient, id) => (
									<li key={id}>{ingredient}</li>
								))}
							</ul>
						</span>
						<div className="recipe-content">
							<ReactMarkdown>{recipe.content}</ReactMarkdown>
						</div>
					</div>
				</section>
			</div>
		</main>
	);
};

export default Recipe;
