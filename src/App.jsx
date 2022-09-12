import React, { useContext } from "react";
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
import { allowHeaderFooter } from "./utils";

const Wrapper = () => {
	AOS.init();
	const { breakpoint } = useContext(GlobalContext);
	const location = useLocation();
	return (
		<>
			{breakpoint("mobile") && <Navigation />}
			{allowHeaderFooter.includes(location.pathname) && <Header />}
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/contact" element={<Contact />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
			{allowHeaderFooter.includes(location.pathname) && <Footer />}
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
