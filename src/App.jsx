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

const Wrapper = () => {
	AOS.init();
	const { breakpoint } = useContext(GlobalContext);
	const location = useLocation();
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [location.pathname]);

	return (
		<>
			{breakpoint("mobile") && <Navigation />}
			{allowHeader(location.pathname) && <Header />}
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/about" element={<About />} />
				<Route path="/recipe/:id" element={<Recipe />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/contact" element={<Contact />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
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
