import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import recipes from "../../utils/recipes";
import "./home.css";
import Masonry, { MasonryBox } from "../../layout/Masonry/Masonry";
import { RecipeCard } from "../../components/Recipe/Recipe";

const Home = () => {
	const [heroRecipe, setHeroRecipe] = useState(recipes[0]);
	useEffect(() => {
		let i = 0;
		setInterval(() => {
			setHeroRecipe(() => recipes[i % recipes.length]);
			++i;
		}, 10000);
	}, []);
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
						<Link to={`/recipe/${heroRecipe.id}`}>
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
			<Masonry lg={3} md={2} sm={1}>
				{recipes.map((recipe) => (
					<MasonryBox>
						<RecipeCard {...recipe} />
					</MasonryBox>
				))}
			</Masonry>
		</main>
	);
};

export default Home;
