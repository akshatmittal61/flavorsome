import React from "react";
import { Link } from "react-router-dom";
import navLinks from "../../utils/navigation";
import socials from "../../utils/socials";
import "./footer.css";

const Footer = () => {
	let k = navLinks.length / 2;
	return (
		<footer className="footer">
			<section className="footer-top">
				<span className="footer-top-first"></span>
				<div className="footer-top-mid">Meal Time</div>
				<span className="footer-top-last"></span>
			</section>
			<section className="footer-mid">
				<div className="footer-mid-left">
					{navLinks.map(
						(navLink, id) =>
							id < k && (
								<Link key={id} to={navLink.route}>
									{navLink.title}
								</Link>
							)
					)}
				</div>
				<div className="footer-mid-mid">
					<div className="footer-mid-mid-socials">
						{socials.map((social) => (
							<a
								href={social.link}
								target="_blank"
								rel="noreferrer"
								title={social.linkText}
							>
								{social.icon}
							</a>
						))}
					</div>
					<span className="footer-mid-mid-dash"></span>
				</div>
				<div className="footer-mid-right">
					{navLinks.map(
						(navLink, id) =>
							id >= k && (
								<Link key={id} to={navLink.route}>
									{navLink.title}
								</Link>
							)
					)}
				</div>
			</section>
			<section className="footer-bottom">
				<span>
					Made with ❤ by{" "}
					<a
						href="https://akshatmittal61.vercel.app/"
						target="_blank"
						rel="noreferrer"
					>
						Akshat Mittal
					</a>
					.
				</span>
			</section>
		</footer>
	);
};

export default Footer;
