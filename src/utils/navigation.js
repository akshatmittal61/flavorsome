import { Edit, Home, Info, Phone, Search, User } from "react-feather";

const navLinks = [
	{
		title: "Home",
		route: "/",
		icon: <Home />,
	},
	{
		title: "About",
		route: "/about",
		icon: <Info />,
	},
	{
		title: "Search",
		route: "/search",
		icon: <Search />,
	},
	{
		title: "Write",
		route: "/write",
		icon: <Edit />,
	},
	{
		title: "Profile",
		route: "/profile",
		icon: <User />,
	},
	{
		title: "Contact Us",
		route: "/contact",
		icon: <Phone />,
	},
];

export default navLinks;
