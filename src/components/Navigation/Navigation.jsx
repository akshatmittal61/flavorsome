import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import navLinks from "../../utils/navigation";
import MaterialIcons from "../MaterialIcons";
import "./navigation.css";

const Navigation = () => {
	const [openNav, setOpenNav] = useState(false);
	const location = useLocation();
	useEffect(() => {
		document.addEventListener("keydown", (e) => {
			if (e.key === "Escape") setOpenNav(false);
		});
		return () => {
			document.removeEventListener("keydown", (e) => {
				if (e.key === "Escape") setOpenNav(false);
			});
		};
	}, [setOpenNav]);
	useEffect(() => {
		setOpenNav(false);
	}, [location.pathname]);

	return (
		<div className={`nav ${openNav && "nav-open"}`}>
			<button className="nav-label" onClick={() => setOpenNav(!openNav)}>
				<span className="nav-label__line"></span>
			</button>
			<nav
				className="nav-container"
				data-aos="fade-left"
				style={{
					transform: openNav ? "none" : "translateX(100%)",
				}}
			>
				<ul className="nav-ul">
					{navLinks.map((navLink, index) => (
						<li className="nav-li" key={index}>
							<Link to={navLink.route}>
								<MaterialIcons className="nav-li__icon">
									{navLink.icon}
								</MaterialIcons>
								<span className="nav-li__title">
									{navLink.title}
								</span>
							</Link>
						</li>
					))}
				</ul>
			</nav>
			<div className="nav-cover" onClick={() => setOpenNav(false)}></div>
		</div>
	);
};

export default Navigation;
