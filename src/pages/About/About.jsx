import React from "react";
import Button from "../../components/Button/Button";
import favicon from "../../utils/images";
import "./about.css";

const About = () => {
	return (
		<main className="about">
			<section className="about-image">
				<img src={favicon} alt="FlavorSome" data-aos="zoom-in" />
			</section>
			<section className="about-content">
				<span>About Us</span>
				<h1>FlavorSome</h1>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
					do eiusmod tempor incididunt ut labore et dolore magna
					aliqua. Ut enim ad minim veniam, quis nostrud exercitation
					Duis aute irure dolor in reprehenderit in voluptate velit
					deserunt mollit anim id est laborum.
				</p>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
					do eiusmod tempor incididunt ut labore et dolore magna
					ullamco laboris nisi ut aliquip ex ea commodo consequat.
					Duis aute irure dolor in reprehenderit in voluptate velit
					occaecat cupidatat non proident, sunt in culpa qui officia
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
					variant="outline"
					link="/write"
				/>
			</section>
		</main>
	);
};

export default About;
