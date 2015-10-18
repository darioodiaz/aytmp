var KEY_OF_THE_DAY = "none";

function appRoute (req, res, next) {
	if (req.cookies.cpass == "ok") {
		if (!req.cookies.fp) {
			//req.cookies("fp", );
		}
		res.sendFile("app.html", { root: "public" });
	} else {
		res.redirect("/forbbiden");
	}
};
function centralRoute (req, res, next) {
	if (req.cookies.cpass == "ok") {
		res.sendFile("mediaCenter.html", {root: "public"});
	} else {
		res.redirect("/forbbiden");
	}
};
function challengeRoute(req, res, next) {
	if(req.body.key == KEY_OF_THE_DAY) {
		res.cookie("cpass", "ok");
		res.redirect("/app");
	} else {
		res.redirect("/forbbiden");
	}
	/*if (next) {
		next();
	}*/
};
function forbbidenRoute (req, res, next) {
	res.sendFile("forbbiden.html", {root: "public"});
};

function exportModuleFunction (expressInstance) {
	expressInstance.use('/app', appRoute);
	expressInstance.use('/central', centralRoute);
	expressInstance.use('/forbbiden', forbbidenRoute);

	expressInstance.post("/challenge", challengeRoute);
};
module.exports = exportModuleFunction;