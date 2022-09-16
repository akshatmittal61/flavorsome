import React, { useContext, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Navigation from "./components/Navigation/Navigation";
import GlobalContext from "./context/GlobalContext";
import { useContextData } from "./context/useContext";
import Contact from "./pages/Contact/Contact";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import AOS from "aos";
import "aos/dist/aos.css";
import "./style.css";
import NotFound from "./pages/NotFound/NotFound";
import { allowFooter, allowHeader } from "./utils";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Recipe from "./pages/Recipe/Recipe";
import Search from "./pages/Search/Search";
import Profile from "./pages/Profile/Profile";
import Write from "./pages/Write/Write";
import UserProfile from "./pages/UserProfile/UserProfile";
import SnackBar from "./components/SnackBar/SnackBar";
import PrivateRoute from "./components/PrivateRoute";
import Logout from "./pages/Logout";
import Edit from "./pages/Edit/Edit";
import Saved from "./pages/Saved/Saved";

const Wrapper = () => {
	AOS.init();
	const {
		breakpoint,
		getAllRecipes,
		snack,
		openSnackBar,
		setOpenSnackBar,
		verifyUser,
	} = useContext(GlobalContext);
	const location = useLocation();
	useEffect(() => {
		window.scrollTo(0, 0);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [location.pathname]);
	useEffect(() => {
		if (JSON.parse(localStorage.getItem("isAuthenticated"))) verifyUser();
		getAllRecipes();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			{breakpoint("mobile") && <Navigation />}
			{allowHeader(location.pathname) && <Header />}
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/about" element={<About />} />
				<Route
					path="/write"
					element={
						<PrivateRoute>
							<Write />
						</PrivateRoute>
					}
				/>
				<Route path="/users/:username" element={<UserProfile />} />
				<Route
					path="/edit/:id"
					element={
						<PrivateRoute>
							<Edit />
						</PrivateRoute>
					}
				/>
				<Route
					path="/profile"
					element={
						<PrivateRoute>
							<Profile />
						</PrivateRoute>
					}
				/>
				<Route
					path="/saved"
					element={
						<PrivateRoute>
							<Saved />
						</PrivateRoute>
					}
				/>
				<Route path="/search" element={<Search />} />
				<Route path="/recipe/:id" element={<Recipe />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/contact" element={<Contact />} />
				<Route path="/logout" element={<Logout />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
			{openSnackBar && (
				<SnackBar
					text={snack.text}
					bgColor={snack.bgColor}
					color={snack.color}
					close={() => setOpenSnackBar(false)}
				/>
			)}
			{allowFooter(location.pathname) && <Footer />}
		</>
	);
};

const App = () => {
	const context = useContextData();
	return (
		<GlobalContext.Provider value={context}>
			<Wrapper />
		</GlobalContext.Provider>
	);
};

export default App;
