import User from "../models/User.mjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../config/index.mjs";
import { omit } from "../helpers/index.mjs";

const register = async (req, res) => {
	const { fname, lname, email, username, password, avatar } = req.body;
	if (!fname || !lname || !email || !password || !username)
		return res.status(400).json({ message: "Invalid Data" }); // If any of the required details are absent, return Status 400 Bad Request
	try {
		let user = await User.findOne({ email });
		if (user)
			return res.status(400).json({ message: "Email already in use" }); // If the given email is already in use, return Status 400 Bad request
		user = await User.findOne({ username });
		if (user)
			return res
				.status(400)
				.json({ message: "This username has been taken" }); // If the given username is already in use, return Status 400 Bad request
		if (password.length < 6)
			return res.status(400).json({
				message: "Password should be a minimum of 6 characters",
			}); // If the password length is less than 6 characters, return Status 400 Bad request
		user = new User({ fname, lname, email, password, username, avatar });
		user.password = await bcrypt.hash(password, 10);
		await user.save();
		const payload = {
			user: {
				id: user.id,
			},
		}; // Create payload for JWT encryption
		jwt.sign(payload, jwtSecret, { expiresIn: 360000 }, (err, token) => {
			if (err) throw err;
			return res.status(200).json({
				token: token,
				message: "User registered. Login to continue",
			});
		}); // The login token expires in 100 hours (i.e. approx 4 days), return Status 200 OK
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server Error" }); // On a server error return Status 500 Internal Server Error
	}
};

const login = async (req, res) => {
	const { username, password } = req.body;
	if (!username || !password)
		return res
			.status(400)
			.json({ message: "Username and Password are required" }); // If any of the required details are absent, return Status 400 Bad Request
	try {
		let user = await User.findOne({ username });
		if (!user) {
			return res.status(404).json({ message: "User not found" }); // If username is not found, return Status 400 Bad Request
		}
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch)
			return res.status(400).json({ message: "Invalid credentials" }); // If password does not matches, return Status 400 Bad Request
		const payload = {
			user: {
				id: user.id,
			},
		};
		jwt.sign(payload, jwtSecret, { expiresIn: 36000000 }, (err, token) => {
			if (err) throw err;
			res.status(200).json({
				token,
				user: omit(user, "password"),
				message: "Login successful",
			});
		}); // The login token expires in 100 hours (i.e. approx 4 days), return Status 200 OK
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server Error" }); // On a server error return Status 500 Internal Server Error
	}
};

const verifyUser = async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select("-password");
		return res.json({ user: user, message: "User Verified" });
		// If the token decrypted user matches the given state in req, return Status 200 OK else the middlewre returns 'Token is not valid' and expires the token.
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Server Error" }); // On a server error return Status 500 Internal Server Error // On a server error return Status 500 Internal Server Error
	}
};

const editProfile = async (req, res) => {
	const id = req.user.id;
	try {
		const userById = await User.findById(id);
		if (!userById)
			return res.status(400).json({ message: "User not found" }); // If no user is found by given id, return Status 400 Bad request.
		const { username, ...updatedFields } = req.body;
		const userByUsername = await User.findOne({ username: username });
		if (!userByUsername)
			return res.status(404).json({ message: "User not found" }); // If no user is found by given username, return Status 400 Bad request.
		if (userByUsername.id.toString() !== req.user.id)
			return res.status(401).json({ message: "User not authorized" }); // If the user id does not matches logged in user id, return Status 401 Unauthorized
		if (username !== userById.username)
			return res.status(400).json({ message: "Can't update username" }); // If the usernames do nat match, return Status 400 Bad request.
		if (updatedFields.password)
			updatedFields.password = await bcrypt.hash(
				updatedFields.password,
				10
			); // If the user has updated password, use the hash function to has it with 10 salt rounds.
		let updatedProfile = await User.findByIdAndUpdate(
			id,
			{ $set: updatedFields },
			{ new: true }
		);
		return res.status(200).json({
			user: omit(updatedProfile, "password"),
			message: "Updated Profile successfully",
		}); // return Status 200 OK
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Server Error" }); // On a server error return Status 500 Internal Server Error
	}
};

const getUser = async (id) => {
	let Id = id.toString();
	try {
		const foundUser = await User.findById(Id).select("-password");
		return foundUser; // Return user by user id.
	} catch (error) {
		console.error(error);
		return undefined;
	}
};

const getProfile = async (req, res) => {
	const userName = req.params.username;
	try {
		const foundUser = await User.findOne({ username: userName }).select(
			"-password"
		); // Fetch user profile by username
		if (!foundUser)
			return res.status(404).json({ message: "No User Found" }); // If no profile could be found by username, return Status 400 Bad Request
		return res.status(200).json({ message: "User found", user: foundUser }); // Return Status 200 OK
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Server Error" }); // On a server error return Status 500 Internal Server Error
	}
};

export { register, login, verifyUser, editProfile, getUser, getProfile };
