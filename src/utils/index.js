export const allowHeaderRoutes = ["/", "/about", "/search", "/write"];
export const allowFooterRoutes = [
	"/",
	"/about",
	"/search",
	"/recipe/:id",
	"/profile",
	"/write",
];

export const allowHeader = (route) => {
	if (allowHeaderRoutes.includes(route)) return true;
};
export const allowFooter = (route) => {
	if (allowFooterRoutes.includes(route)) return true;
	if (route.slice(0, 8) === "/recipe/") return true;
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
