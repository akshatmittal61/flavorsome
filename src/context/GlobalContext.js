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
	updateUser: () => {},
	verifyUser: () => {},
	axiosInstance: undefined,
	recipes: [],
	setRecipes: () => {},
	getAllRecipes: () => {},
	getSingleRecipe: () => {},
	addNewRecipe: () => {},
	updateOneRecipe: () => {},
	getUserProfile: () => {},
	getAllRecipesByUsername: () => {},
	saveRecipe: () => {},
	unSaveRecipe: () => {},
	getSavedRecipes: () => {},
});

export default GlobalContext;
