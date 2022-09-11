import React from "react";
import socials from "../../utils/socials";

const Header = () => {
	return (
		<header className="header">
			<div className="header-left">
				{socials.map((social) => (
					<a href={social.link} target="_blank" rel="noreferrer">
						{social.icon}
					</a>
				))}
			</div>
			<div className="header-mid"></div>
			<div className="header-right"></div>
		</header>
	);
};

export default Header;
