import React from "react";
import Back from "../../components/Button/Back";
import Button from "../../components/Button/Button";
import { svg404 } from "../../utils/images";
import "./not-found.css";

const NotFound = () => {
	return (
		<main
			className="not-found"
			style={{
				backgroundImage: `url($)`,
			}}
		>
			<section className="not-found-container">
				<div className="not-found-image">
					<img src={svg404} alt="404" />
				</div>
				<div className="not-found-head">
					<h1>Whoops!</h1>
					<article>Couldn't find that on menu</article>
					<div className="not-found-btns">
						<Button text="Go Back to Home" color="pink" link="/" />
						<Button
							text="Give Us a feedback"
							color="pink"
							variant="outline"
							link="/contact"
						/>
					</div>
				</div>
			</section>
			<Back />
		</main>
	);
};

export default NotFound;
