import AOS from "aos";
import React, { useContext } from "react";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Navigation from "./components/Navigation/Navigation";
import GlobalContext from "./context/GlobalContext";
import { useContextData } from "./context/useContext";
import "./style.css";

const Wrapper = () => {
	AOS.init();
	const { breakpoint } = useContext(GlobalContext);
	return (
		<>
			{breakpoint("mobile") && <Navigation />}
			<Header />
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
