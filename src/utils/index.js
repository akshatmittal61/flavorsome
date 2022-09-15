export const allowHeaderRoutes = ["/", "/about", "/search", "/write", "/saved"];
export const allowFooterRoutes = [
	"/",
	"/about",
	"/search",
	"/profile",
	"/write",
	"/saved",
];

export const allowHeader = (route) => {
	if (allowHeaderRoutes.includes(route)) return true;
	if (route.slice(0, 6) === "/edit/") return true;
};
export const allowFooter = (route) => {
	if (allowFooterRoutes.includes(route)) return true;
	if (route.slice(0, 8) === "/recipe/") return true;
	if (route.slice(0, 6) === "/edit/") return true;
};

export const randomize = (low, high) =>
	Math.floor(Math.random() * +high + +low);

export const colors = [
	"bgcolor",
	"red",
	"pink",
	"purple",
	"dark-purple",
	"indigo",
	"blue",
	"light-blue",
	"cyan",
	"green",
	"light-green",
	"orange",
	"brown",
	"grey",
	"blue-grey",
];

export const omit = (obj, key) => {
	const { [key]: omitted, ...rest } = obj;
	return rest;
};
