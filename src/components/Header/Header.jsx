import React, { useContext } from "react";
import { Link } from "react-router-dom";
import GlobalContext from "../../context/GlobalContext";
import navLinks from "../../utils/navigation";
import socials from "../../utils/socials";
import Button from "../Button/Button";
import "./header.css";

const Header = () => {
	const { isAuthenticated } = useContext(GlobalContext);
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
				<h1>FlavorSome</h1>
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
				{isAuthenticated ? (
					<Button
						text="Logout"
						icon="logout"
						color="black"
						size="small"
						variant="outline"
						link="/logout"
					/>
				) : (
					<Button
						text="Login"
						icon="login"
						color="black"
						size="small"
						variant="outline"
						link="/login"
					/>
				)}
			</div>
		</header>
	);
};

export default Header;
