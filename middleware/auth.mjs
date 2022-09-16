import jwt from "jsonwebtoken";
import { jwtSecret } from "../config/index.mjs";

const auth = (req, res, next) => {
	const token = req.header("x-auth-token");
	if (!token)
		return res
			.status(401)
			.json({ message: "No Token. Authorization denied" }); // If no token is found, return Status 401 Not Authorized
	try {
		const decoded = jwt.verify(token, jwtSecret);
		req.user = decoded.user;
		next();
	} catch (err) {
		console.error(err);
		res.status(401).json({ message: "Token is not valid" }); // If token is not valid, return Status 401 Not Authorized
	}
};

export default auth;
