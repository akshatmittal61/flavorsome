import React, { useState } from "react";
import Button from "../../components/Button/Button";
import Input, { TextArea } from "../../components/Input/Input";
import { contactBg } from "../../utils/images";
import socials from "../../utils/socials";
import "./contact.css";

const Contact = () => {
	const [userMessage, setUserMessage] = useState({
		name: "",
		email: "",
		message: "",
	});
	const handleChange = (e) => {
		const { name, value } = e.target;
		setUserMessage((p) => ({
			...p,
			[name]: value,
		}));
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(userMessage);
		setUserMessage({
			name: "",
			email: "",
			message: "",
		});
	};
	return (
		<main className="contact">
			<section className="contact-container">
				<div
					className="contact-left"
					style={{
						backgroundImage: `url(${contactBg})`,
					}}
				></div>
				<div className="contact-right">
					<h1>Contact Us</h1>
					<h2>Get In Touch</h2>
					<form onSubmit={handleSubmit}>
						<Input
							type="text"
							name="name"
							icon="person"
							value={userMessage.name}
							placeholder="Your Name Here"
							onChange={handleChange}
						/>
						<Input
							type="email"
							name="email"
							icon="mail"
							value={userMessage.email}
							placeholder="Your E-Mail Here"
							onChange={handleChange}
						/>
						<TextArea
							type="text"
							name="message"
							icon="chat"
							rows={5}
							value={userMessage.message}
							placeholder="Type Your Message Here"
							onChange={handleChange}
						/>
						<Button
							text="Send Message"
							color="indigo"
							variant="outline"
							size="small"
						/>
					</form>
					<h2>Follow Us</h2>
					<div className="contact-right-socials">
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
				</div>
			</section>
		</main>
	);
};

export default Contact;
