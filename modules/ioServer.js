var io = require("socket.io");
var socketFunctions = require("./sockets");
var IO_PORT = 3000;

var server = io(IO_PORT);
socketFunctions.setServer(server);
server.on("connection", onNewConnection);

function onNewConnection (socket) {
	socketFunctions.init(socket);
	console.log("New connection from: ", socket.handshake.address);
};