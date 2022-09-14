import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import GlobalContext from "../context/GlobalContext";

const PrivateRoute = ({ children }) => {
	const { isAuthenticated } = useContext(GlobalContext);
	if (isAuthenticated) return children;
	else return <Navigate to="/login" />;
};

export default PrivateRoute;
