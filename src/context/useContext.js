import axios from "axios";
import { useState } from "react";

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
		axiosInstance,
	};
};
