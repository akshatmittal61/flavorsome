import React, { useContext, useEffect, useState } from "react";
import RecipeFlex from "../../components/Recipe/RecipeFlex";
import GlobalContext from "../../context/GlobalContext";
import Masonry, { MasonryBox } from "../../layout/Masonry/Masonry";
import "./saved.css";

const Saved = () => {
	const [savedRecipes, setSavedRecipes] = useState([]);
	const { getSavedRecipes } = useContext(GlobalContext);
	useEffect(() => {
		const fetchSavedRecipes = async () => {
			const res = await getSavedRecipes();
			setSavedRecipes(() => res);
		};
		fetchSavedRecipes();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<main className="saved">
			<div className="saved-head">
				<h1>Saved Recipes</h1>
			</div>
			<div className="saved-body">
				<Masonry lg={2} md={2} sm={1}>
					{savedRecipes.map((recipe, id) => (
						<MasonryBox key={id}>
							<RecipeFlex {...recipe} />
						</MasonryBox>
					))}
				</Masonry>
			</div>
		</main>
	);
};

export default Saved;
