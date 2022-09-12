import AOS from "aos";
import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Navigation from "./components/Navigation/Navigation";
import GlobalContext from "./context/GlobalContext";
import { useContextData } from "./context/useContext";
import Contact from "./pages/Contact/Contact";
import "./style.css";

const Wrapper = () => {
	AOS.init();
	const { breakpoint } = useContext(GlobalContext);
	return (
		<>
			{breakpoint("mobile") && <Navigation />}
			<Header />
			<Routes>
				<Route path="/contact" element={<Contact />} />
			</Routes>
			<Footer />
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
