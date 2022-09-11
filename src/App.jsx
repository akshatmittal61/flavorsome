import AOS from "aos";
import React, { useContext } from "react";
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
