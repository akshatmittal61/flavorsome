import React from "react";

const MaterialIcons = ({ children, className = "", ...rest }) => {
	return (
		<span className={`material-symbols-outlined ${className}`} {...rest}>
			{children}
		</span>
	);
};

export default MaterialIcons;
