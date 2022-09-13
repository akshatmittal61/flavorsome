const allowHeaderRoutes = ["/", "/about", "/search"];
const allowFooterRoutes = ["/", "/about", "/search", "/recipe/:id"];

const allowHeader = (route) => {
	if (allowHeaderRoutes.includes(route)) return true;
};
const allowFooter = (route) => {
	if (allowFooterRoutes.includes(route)) return true;
	if (route.slice(0, 8) === "/recipe/") return true;
};

export { allowHeader, allowFooter };
