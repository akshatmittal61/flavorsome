import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import MaterialIcons from "../../components/MaterialIcons";
import { registerBg } from "../../utils/images";
import "./register.css";

const Register = () => {
	const navigate = useNavigate();
	const [registerUser, setRegisterUser] = useState({
		fname: "",
		lname: "",
		email: "",
		username: "",
		password: "",
		confirmPassword: "",
		avatar: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setRegisterUser((p) => ({
			...p,
			[name]: value,
		}));
	};
	const handleSubmit = (e) => {
		e?.preventDefault();
		console.log(registerUser);
		setRegisterUser({
			fname: "",
			lname: "",
			email: "",
			username: "",
			password: "",
			confirmPassword: "",
			avatar: "",
		});
	};
	return (
		<main className="register">
			<aside
				className="register-side"
				style={{
					backgroundImage: `url(${registerBg})`,
				}}
			></aside>
			<button className="icon register-back" onClick={() => navigate(-1)}>
				<MaterialIcons>arrow_back</MaterialIcons>
			</button>
			<section className="register-page">
				<div className="register-container">
					<h1>Welcome!</h1>
					<form onSubmit={handleSubmit}>
						<Input
							type="text"
							name="username"
							value={registerUser.username}
							onChange={handleChange}
							placeholder="Username"
							icon="person"
						/>
						<Input
							type="password"
							name="password"
							value={registerUser.password}
							onChange={handleChange}
							placeholder="Password"
							icon="lock"
						/>
						<Button text="Sign Up" type="submit" />
					</form>
					<div className="register-signup">
						<span>
							Don't have an account?{" "}
							<Link to="/register">Sign Up</Link>
						</span>
					</div>
				</div>
			</section>
		</main>
	);
};

export default Register;
