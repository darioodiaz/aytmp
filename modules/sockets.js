var helpFn = require("./socketHelperFunctions");

var myModule = {
	init: init,
	setServer: setServer
};

function init (socket) {
	socket.on("addVideo", helpFn.onNewVideo);
	socket.on("mute", helpFn.onMute);
	socket.on("nextVideo", helpFn.onNextVideo);
	socket.on("videoDuration", helpFn.onVideoDuration);
	socket.on("requestPlayVideo", helpFn.onRequestPlayVideo);
	socket.on("requestRemoveVideo", helpFn.onRequestRemoveVideo);
	socket.on("requestVolume", helpFn.onRequestVolume);	
	socket.on("requestPlaylist", helpFn.onRequestPlaylist);
};
function setServer(server) {
	helpFn.setServer(server);
};

module.exports = myModule;