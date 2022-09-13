const allowHeaderRoutes = ["/", "/about", "/search"];
const allowFooterRoutes = ["/", "/about", "/search", "/recipe/:id", "/profile"];

const allowHeader = (route) => {
	if (allowHeaderRoutes.includes(route)) return true;
};
const allowFooter = (route) => {
	if (allowFooterRoutes.includes(route)) return true;
	if (route.slice(0, 8) === "/recipe/") return true;
};

const randomize = (low, high) => Math.floor(Math.random() * +high + +low);

export { allowHeader, allowFooter, randomize };
