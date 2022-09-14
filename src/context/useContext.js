import axios from "axios";
import { useState } from "react";
import { omit } from "../utils";
import { default as defaultRecipes } from "../utils/recipes";

export const useContextData = () => {
	// Axios Instance Configurations
	const axiosInstance = axios.create({
		baseURL: process.env.REACT_APP_BACKEND_URL,
		headers: {
			"x-auth-token": localStorage.getItem("token"),
			"Content-Type": "application/json",
		},
	});

	// Loading State
	const [isLoading, setIsLoading] = useState(false);

	// Snack Bar component
	const [snack, setSnack] = useState({
		text: "Snackbar Message",
		bgColor: "var(--indigo)",
		color: "var(--white)",
	});
	const [openSnackBar, setOpenSnackBar] = useState(false);

	// Global Authentication State
	const isLocalAuthenticated = localStorage.getItem("isAuthenticated");
	const [isAuthenticated, setIsAuthenticated] = useState(
		JSON.parse(isLocalAuthenticated) || false
	);

	// Global User State
	const [user, setUser] = useState(
		JSON.parse(localStorage.getItem("user")) || null
	);
	const updateUser = (newUser) => {
		localStorage.removeItem("user");
		setUser(null);
		localStorage.setItem(
			"user",
			JSON.stringify(omit({ ...user, ...newUser }, "password"))
		);
		setUser((p) => ({ ...p, ...newUser }));
	};
	const verifyUser = async () => {
		try {
			setIsLoading(true);
			const res = await axiosInstance.get("/api/auth");
			setUser(res.data.user);
			localStorage.setItem("user", JSON.stringify(res.data.user));
			setIsLoading(false);
		} catch (error) {
			setSnack({
				text: error.response?.data?.message,
				bgColor: "var(--red)",
				color: "var(--white)",
			});
			setOpenSnackBar(true);
			setTimeout(() => {
				setOpenSnackBar(false);
			}, 5000);
			setIsLoading(false);
			localStorage.removeItem("token");
			localStorage.removeItem("user");
			localStorage.setItem("isAuthenticated", false);
			setUser(null);
			setIsAuthenticated(false);
		}
	};

	// Get User Profile
	const getUserProfile = async (username) => {
		try {
			const res = await axiosInstance.get(
				`/api/auth/profile/${username}`
			);
			return res.data.user;
		} catch (error) {
			setSnack({
				text: error.response?.data?.message,
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

	// Recipes state
	const [recipes, setRecipes] = useState(defaultRecipes);
	const getAllRecipes = async () => {
		try {
			setIsLoading(true);
			const res = await axiosInstance.get("/api/recipe");
			setRecipes(() => [...defaultRecipes, ...res.data.allRecipes]);
			setIsLoading(false);
		} catch (error) {
			setSnack({
				text: error.response?.data?.message,
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
	const getSingleRecipe = async (id) => {
		try {
			const res = await axiosInstance.get(`/api/recipe/${id}`);
			return res.data;
		} catch (error) {
			setSnack({
				text: error.response?.data?.message,
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
	const addNewRecipe = async (newRecipe) => {
		try {
			setIsLoading(true);
			const res = await axiosInstance.post("/api/recipe/add", {
				...newRecipe,
			});
			if (res.status === 200) {
				setSnack({
					text: res.data.message,
					bgColor: "var(--green)",
					color: "var(--white)",
				});
				setRecipes((prevRecipes) => [
					...prevRecipes,
					res.data.newRecipe,
				]);
				setOpenSnackBar(true);
				setTimeout(() => {
					setOpenSnackBar(false);
				}, 5000);
				setIsLoading(false);
			}
		} catch (error) {
			setSnack({
				text: error.response?.data?.message,
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
	const updateOneRecipe = async (id, updatedRecipe) => {
		try {
			setIsLoading(true);
			const resp = await axiosInstance.put(`/api/recipe/edit/${id}`, {
				...updatedRecipe,
			});
			setRecipes((prevRecipes) => {
				let newRecipes = prevRecipes.map((singleRecipe) =>
					singleRecipe._id !== id
						? singleRecipe
						: resp.data.updatedRecipe
				);
				return newRecipes;
			});
			setSnack({
				text: resp.data.message,
				bgColor: "var(--green)",
				color: "var(--white)",
			});
			setOpenSnackBar(true);
			setTimeout(() => {
				setOpenSnackBar(false);
			}, 5000);
			setIsLoading(false);
		} catch (error) {
			setSnack({
				text: error.response?.data?.message,
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
	const getAllRecipesByUsername = async (username) => {
		try {
			setIsLoading(true);
			const res = await axiosInstance.get(
				`/api/recipe/${username}/recipes`
			);
			setIsLoading(false);
			return res.data.allRecipes;
		} catch (error) {
			setSnack({
				text: error.response?.data?.message,
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

	// Theme: light || dark
	const [theme, setTheme] = useState(
		localStorage.getItem("theme") || "light"
	);
	const toggleTheme = () => {
		document.body.classList = theme === "light" ? "dark" : "light";
		localStorage.setItem("theme", theme === "light" ? "dark" : "light");
		setTheme((p) => (p === "light" ? "dark" : "light"));
	};

	// Media Breakpoints
	const mediaQuerySm = window.matchMedia("(max-width: 672px)");
	const mediaQueryMd = window.matchMedia("(max-width: 880px)");
	const mediaQueryLg = window.matchMedia("(min-width: 880px)");
	const breakpoint = (device) => {
		if (device === "mobile") return mediaQuerySm.matches;
		else if (device === "tab") return mediaQueryMd.matches;
		else return mediaQueryLg.matches;
	};
	mediaQuerySm.addListener(breakpoint);
	mediaQueryMd.addListener(breakpoint);
	mediaQueryLg.addListener(breakpoint);

	return {
		theme,
		setTheme,
		toggleTheme,
		breakpoint,
		isLoading,
		setIsLoading,
		snack,
		setSnack,
		openSnackBar,
		setOpenSnackBar,
		isAuthenticated,
		setIsAuthenticated,
		user,
		setUser,
		updateUser,
		verifyUser,
		axiosInstance,
		recipes,
		setRecipes,
		getAllRecipes,
		getSingleRecipe,
		addNewRecipe,
		updateOneRecipe,
		getUserProfile,
		getAllRecipesByUsername,
	};
};
