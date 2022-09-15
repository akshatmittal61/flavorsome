import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import GlobalContext from "../../context/GlobalContext";
import { aboutImg } from "../../utils/images";
import "./about.css";

const About = () => {
	const { breakpoint } = useContext(GlobalContext);
	return (
		<main className="about">
			<section className="about-image">
				<img src={aboutImg} alt="FlavorSome" />
			</section>
			<section className="about-content">
				<span>About Us</span>
				<h1>FlavorSome</h1>
				<p>
					FlavorSome allows you to view various delicious recipes
					shared by the users and gives you the privilege to share
					your recipe too!
				</p>
				<p>
					Grab this opportunity now and show the world how amazing
					your recipes are!
				</p>
				<p>
					Search for what you want to cook and Hurray! Impress others
					with mouth-watering viands.
				</p>
				<p>
					<Link to="/register">Create your account</Link> and log in{" "}
					<Link to="/login">here</Link> to get started !
				</p>
				<Button
					text="Contact Us"
					color="light-blue"
					link="/contact"
					size="large"
				/>
				<Button
					text="Write your own recipe"
					color="blue"
					variant={breakpoint("tab") ? "filled" : "outline"}
					link="/write"
				/>
			</section>
		</main>
	);
};

export default About;
