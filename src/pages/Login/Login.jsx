import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import { loginBg } from "../../utils/images";
import "./login.css";
import "../../components/Button/button.css";
import Back from "../../components/Button/Back";
import GlobalContext from "../../context/GlobalContext";

const Login = () => {
	const [loginUser, setLoginUser] = useState({
		username: "",
		password: "",
	});
	const {
		axiosInstance,
		setIsLoading,
		setSnack,
		setOpenSnackBar,
		isAuthenticated,
		setIsAuthenticated,
		updateUser,
	} = useContext(GlobalContext);
	const navigate = useNavigate();
	const handleChange = (e) => {
		const { name, value } = e.target;
		setLoginUser((p) => ({
			...p,
			[name]: value,
		}));
	};
	const handleSubmit = async (e) => {
		e?.preventDefault();
		try {
			setIsLoading(true);
			const res = await axiosInstance.post("/api/auth/login", {
				...loginUser,
			});
			if (res.status === 200) {
				setSnack({
					text: res.data.message,
					bgColor: "var(--green)",
					color: "var(--white)",
				});
				setOpenSnackBar(true);
				setTimeout(() => {
					setOpenSnackBar(false);
				}, 5000);
				setTimeout(() => {
					setIsAuthenticated(true);
				}, 1000);
				localStorage.setItem("token", res.data.token);
				localStorage.setItem("isAuthenticated", true);
				updateUser({ ...res.data.user });
				setIsLoading(false);
			}
		} catch (error) {
			setSnack({
				text: error?.response?.data?.message,
				bgColor: "var(--red)",
				color: "var(--white)",
			});
			setOpenSnackBar(true);
			setTimeout(() => {
				setOpenSnackBar(false);
			}, 5000);
			setIsLoading(false);
		}
	};
	useEffect(() => {
		if (isAuthenticated) navigate(-1);
	}, [isAuthenticated, navigate]);
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
