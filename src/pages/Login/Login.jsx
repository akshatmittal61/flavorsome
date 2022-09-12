import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import { loginBg } from "../../utils/images";
import "./login.css";
import "../../components/Button/button.css";
import Back from "../../components/Button/Back";

const Login = () => {
	const [loginUser, setLoginUser] = useState({
		username: "",
		password: "",
	});
	const handleChange = (e) => {
		const { name, value } = e.target;
		setLoginUser((p) => ({
			...p,
			[name]: value,
		}));
	};
	const handleSubmit = (e) => {
		e?.preventDefault();
		console.log(loginUser);
		setLoginUser({
			username: "",
			password: "",
		});
	};
	return (
		<main className="login">
			<aside
				className="login-side"
				style={{
					backgroundImage: `url(${loginBg})`,
				}}
				data-aos="fade-in"
			></aside>
			<Back />
			<section className="login-page">
				<div className="login-container">
					<h1>Welcome!</h1>
					<form onSubmit={handleSubmit}>
						<Input
							type="text"
							name="username"
							value={loginUser.username}
							onChange={handleChange}
							placeholder="Username"
							icon="person"
						/>
						<Input
							type="password"
							name="password"
							value={loginUser.password}
							onChange={handleChange}
							placeholder="Password"
							icon="lock"
						/>
						<Button text="Login" type="submit" />
					</form>
					<div className="login-signup">
						<div>
							<span>Don't have an account? </span>
							<Link to="/register">Sign Up</Link>
						</div>
					</div>
				</div>
			</section>
		</main>
	);
};

export default Login;
