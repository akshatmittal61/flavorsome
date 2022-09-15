import React, { useContext, useEffect, useState } from "react";
import RecipeFlex from "../../components/Recipe/RecipeFlex";
import GlobalContext from "../../context/GlobalContext";
import Masonry, { MasonryBox } from "../../layout/Masonry/Masonry";
import { emptyCart } from "../../utils/images";
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
				{savedRecipes.length > 0 ? (
					<Masonry lg={2} md={2} sm={1}>
						{savedRecipes.map((recipe, id) => (
							<MasonryBox key={id}>
								<RecipeFlex {...recipe} />
							</MasonryBox>
						))}
					</Masonry>
				) : (
					<div className="saved-null">
						<img
							src={emptyCart}
							alt="No Saved Items"
							style={{
								margin: "2.5% auto",
							}}
						/>
						<h2
							style={{
								margin: "2rem 0",
							}}
						>
							No Saved Recipes Yet
						</h2>
					</div>
				)}
			</div>
		</main>
	);
};

export default Saved;
