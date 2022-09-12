import React from "react";
import { useNavigate } from "react-router-dom";
import MaterialIcons from "../MaterialIcons";
import "./button.css";

const Back = () => {
	const navigate = useNavigate();
	return (
		<button className="icon btn-back" onClick={() => navigate(-1)}>
			<MaterialIcons>arrow_back</MaterialIcons>
		</button>
	);
};

export default Back;
