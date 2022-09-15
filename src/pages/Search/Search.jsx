import React, { useContext, useState } from "react";
import Input from "../../components/Input/Input";
import { searchEmpty, searchImg } from "../../utils/images";
import _ from "lodash";
import "./search.css";
import GlobalContext from "../../context/GlobalContext";
import Masonry, { MasonryBox } from "../../layout/Masonry/Masonry";
import RecipeFlex from "../../components/Recipe/RecipeFlex";

const Search = () => {
	const [searchStr, setSearchStr] = useState("");
	const { recipes } = useContext(GlobalContext);

	const matchesTitle = (title, str) => {
		title = _.kebabCase(title);
		str = _.kebabCase(str);
		return title.includes(str);
	};

	const matchesIngr = (ingredients, str) => {
		for (let i = 0; i < ingredients.length; ++i) {
			let ing = _.kebabCase(ingredients[i]);
			if (ing.includes(_.kebabCase(str))) return true;
		}
		return false;
	};

	const handleChange = (e) => {
		setSearchStr(() => e.target.value);
		setSearchResults(() => []);
		recipes.forEach((recipe) => {
			if (
				matchesTitle(recipe.title, searchStr) ||
				matchesIngr(recipe.ingredients, searchStr)
			)
				setSearchResults((p) => [...p, recipe]);
		});
	};
	const [searchResults, setSearchResults] = useState([]);
	const handleSubmit = (e) => {
		e?.preventDefault();
		setSearchResults(() => []);
		recipes.forEach((recipe) => {
			if (recipe.title.includes(searchStr))
				setSearchResults((p) => [...p, recipe]);
		});
	};
	return (
		<main className="search">
			<section className="search-head">
				<h1>Search for more Recipes</h1>
			</section>
			<section className="search-input">
				<form onSubmit={handleSubmit}>
					<Input
						placeholder="Type Here..."
						value={searchStr}
						onChange={handleChange}
						type="text"
						icon="search"
					/>
					<button type="submit" className="dispn">
						submit
					</button>
				</form>
			</section>
			<section className="search-body">
				{searchStr === "" ? (
					<>
						<img
							src={searchImg}
							alt="Search"
							style={{
								margin: "2.5% auto",
							}}
						/>
						<span
							style={{
								fontSize: "1.5rem",
								lineHeight: "2rem",
							}}
						>
							Waiting to Search!
						</span>
					</>
				) : searchResults.length > 0 ? (
					<Masonry lg={2} md={2} sm={1}>
						{searchResults.map((res, id) => (
							<MasonryBox key={id}>
								<RecipeFlex {...res} />
							</MasonryBox>
						))}
					</Masonry>
				) : (
					<>
						<img
							src={searchEmpty}
							alt="Not Found"
							style={{
								margin: "2.5% auto",
							}}
						/>
						<h2
							style={{
								margin: "2rem 0",
							}}
						>
							Could not find any results matching "{searchStr}"
						</h2>
					</>
				)}
			</section>
		</main>
	);
};

export default Search;
