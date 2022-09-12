import React from "react";
import { Link } from "react-router-dom";
import navLinks from "../../utils/navigation";
import socials from "../../utils/socials";
import Button from "../Button/Button";
import "./header.css";

const Header = () => {
	return (
		<header className="header">
			<div className="header-left">
				{socials.map((social, id) => (
					<a
						href={social.link}
						key={id}
						target="_blank"
						rel="noreferrer"
					>
						{social.icon}
					</a>
				))}
			</div>
			<div className="header-mid">
				<nav>
					<ul>
						{navLinks.map((nav, id) => {
							return (
								id < navLinks.length / 2 && (
									<li key={id}>
										<Link to={nav.route}>{nav.title}</Link>
									</li>
								)
							);
						})}
					</ul>
				</nav>
				<h1>Meal Time</h1>
				<nav>
					<ul>
						{navLinks.map((nav, id) => {
							return (
								id >= navLinks.length / 2 && (
									<li key={id}>
										<Link to={nav.route}>{nav.title}</Link>
									</li>
								)
							);
						})}
					</ul>
				</nav>
			</div>
			<div className="header-right">
				<Button
					text="Login"
					icon="account_circle"
					color="black"
					size="small"
					variant="outline"
					link="/login"
				/>
			</div>
		</header>
	);
};

export default Header;
