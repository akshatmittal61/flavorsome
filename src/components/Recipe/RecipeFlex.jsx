import React from "react";
import { Link } from "react-router-dom";
import { colors, randomize } from "../../utils";

const RecipeFlex = ({ image, title, date, about, user, _id }) => {
	return (
		<div
			className="recipe-flex"
			style={{
				backgroundImage: `url(${image})`,
				borderColor: `var(--${colors[randomize(1, colors.length)]})`,
			}}
		>
			<div className="recipe-flex-container">
				<Link to={`/recipe/${_id}`} className="recipe-flex__title">
					<h2>{title}</h2>
				</Link>
				<p className="recipe-flex__about">{about}</p>
				<div className="recipe-flex-user">
					<div className="recipe-flex-user__image">
						<Link to={`/users/${user?.username}`}>
							<img
								src={user?.avatar}
								alt={user?.fname + " " + user?.lname}
							/>
						</Link>
					</div>
					<div className="recipe-flex-user__details">
						<Link to={`/users/${user?.username}`}>
							{user?.fname + " " + user?.lname}
						</Link>
						<span>{date}</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default RecipeFlex;
