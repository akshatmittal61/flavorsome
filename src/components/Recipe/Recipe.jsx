import React from "react";
import Button from "../Button/Button";
import "./recipe.css";
import { Link, useNavigate } from "react-router-dom";

const RecipeCard = ({ image, title, date, about, _id }) => {
	const navigate = useNavigate();
	return (
		<div className="recipe-card">
			<div className="recipe-card-image">
				<img
					src={image}
					alt={title}
					onClick={() => navigate(`/recipe/${_id}`)}
				/>
			</div>
			<div className="recipe-card-content">
				<span className="recipe-card-content__date">{date}</span>
				<Link
					to={`/recipe/${_id}`}
					className="recipe-card-content__title"
				>
					{title}
				</Link>
				<p className="recipe-card-content__about">
					{about?.length > 250 ? about.slice(0, 250) + "..." : about}
				</p>
				<Button text="Read More" link={`/recipe/${_id}`} />
			</div>
		</div>
	);
};

export { RecipeCard };
