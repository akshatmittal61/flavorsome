import React from "react";
import { Link } from "react-router-dom";
import recipes from "../../utils/recipes";
import _ from "lodash";
import "./home.css";

const Home = () => {
	const heroRecipe = recipes[0];
	return (
		<main className="home">
			<section className="home-hero">
				<div
					className="home-hero-container"
					style={{
						backgroundImage: `url(${heroRecipe.image})`,
					}}
				>
					<div className="home-hero-details">
						<Link to={`/recipe/${_.kebabCase(heroRecipe.title)}`}>
							<h1>{heroRecipe.title}</h1>
						</Link>
						<p>
							{heroRecipe.about.length > 250
								? heroRecipe.about.slice(0, 250) + "..."
								: heroRecipe.about}
						</p>
						<div className="home-hero-user">
							<div className="home-hero-user__image">
								<Link to={`/users/${heroRecipe.user.username}`}>
									<img
										src={heroRecipe.user.avatar}
										alt={
											heroRecipe.user.fname +
											" " +
											heroRecipe.user.lname
										}
									/>
								</Link>
							</div>
							<div className="home-hero-user__details">
								<Link to={`/users/${heroRecipe.user.username}`}>
									{heroRecipe.user.fname +
										" " +
										heroRecipe.user.lname}
								</Link>
								<span>{heroRecipe.date}</span>
							</div>
						</div>
					</div>
				</div>
			</section>
		</main>
	);
};

export default Home;
