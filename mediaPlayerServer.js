var ioServer = require("./modules/ioServer");
var commonRoutes = require("./routes/commonRoutes");

var express = require('express');
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var session = require("express-session");

var app = express();
app.EXPRESS_PORT = 80;

function initServer() {
	/*app.use(session({
		secret: "awp", 
		cookie: { secure: true },
		resave: true,
		saveUninitialized: true
	}));*/
	app.use(cookieParser());
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());
	app.use(express.static("public"));

	commonRoutes(app);

	app.listen(app.EXPRESS_PORT);
	console.log('Express ready on: ' + app.EXPRESS_PORT);
};

initServer();