import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
	{
		fname: {
			type: String,
			required: true,
		},
		lname: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		username: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		avatar: {
			type: String,
			default:
				"https://raw.githubusercontent.com/akshatmittal61/planner/master/src/images/user.svg",
		},
		phone: {
			type: String,
			required: false,
		},
		bio: {
			type: String,
			required: false,
		},
		saved: {
			type: [mongoose.Schema.Types.ObjectId],
			ref: "Recipe",
		},
	},
	{ timestamps: true }
);

const User = mongoose.model("user", UserSchema);
export default User;
