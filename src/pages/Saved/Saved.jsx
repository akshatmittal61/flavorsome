import React, { useState } from "react";
import RecipeFlex from "../../components/Recipe/RecipeFlex";
import Masonry, { MasonryBox } from "../../layout/Masonry/Masonry";
import "./saved.css";

const Saved = () => {
	const [savedRecipes, setSavedRecipes] = useState([]);

	return (
		<main className="saved">
			<div className="saved-head">
				<h1>Saved Recipes</h1>
			</div>
			<div className="saved-body">
				<Masonry>
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
