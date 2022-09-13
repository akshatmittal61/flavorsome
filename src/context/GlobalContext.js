import { createContext } from "react";

const GlobalContext = createContext({
	theme: "",
	setTheme: () => {},
	toggleTheme: () => {},
	breakpoint: () => {},
	isLoading: "",
	setIsLoading: () => {},
	snack: {},
	setSnack: () => {},
	openSnackBar: false,
	setOpenSnackBar: () => {},
	isAuthenticated: "",
	setIsAuthenticated: () => {},
	user: undefined,
	setUser: () => {},
	axiosInstance: undefined,
});

export default GlobalContext;
