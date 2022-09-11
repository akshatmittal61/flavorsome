import { useState } from "react";

export const useContextData = () => {
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
	};
};
