import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import GlobalContext from "../context/GlobalContext";

const PrivateRoute = ({ children }) => {
	const { isAuthenticated } = useContext(GlobalContext);
	// If a user is logged in, return the requested component for the route, else navigate to '/login'
	if (isAuthenticated) return children;
	else return <Navigate to="/login" />;
};

export default PrivateRoute;
