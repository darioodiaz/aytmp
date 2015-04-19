var PlayList = require("./playList");

var myModule = {};

myModule.setServer = setServer,
myModule.getSockets = getSockets;
myModule.onNewVideo = onNewVideo;
myModule.onMute = onMute;
myModule.onNextVideo = onNextVideo;
myModule.onVideoDuration = onVideoDuration;
myModule.onRequestPlayVideo = onRequestPlayVideo;
myModule.onRequestRemoveVideo = onRequestRemoveVideo;
myModule.onRequestVolume = onRequestVolume;
myModule.onRequestPlaylist = onRequestPlaylist;

function setServer (ioServer) {
	this.server = ioServer;
};
function getSockets () {
	return this.server.sockets;
};
function onVideoDuration(duration) {
	PlayList.setTotalVideoDuration(duration);
	var totalVideoTime = PlayList.getTotalVideoTime();
    myModule.getSockets().emit("setVideoDuration", totalVideoTime);
};
function onRequestVolume(volume) {
	PlayList.volumeServer = volume;
	myModule.getSockets().emit("setVolume", volume);
};
function onRequestPlaylist() {
	this.emit("playlistUpdate", PlayList.playlist);
	if (PlayList.actualVideo) {
		this.emit("notification", { title: "Now Playing:", body: PlayList.actualVideo.name, icon: PlayList.actualVideo.icon });
		this.emit("setActualVideoId", PlayList.actualVideoIndex);
		this.emit("setVideoDuration", PlayList.getTotalVideoTime() );
		this.emit("setElapsedTime", PlayList.elapsedTime);
	}
	this.emit("setVolume", PlayList.volumeServer);
};
function onNextVideo() {
	var nextVideo = PlayList.nextVideo();
	if (!nextVideo) {
		myModule.getSockets().emit("notification", { title: "Playlist empty", body: "La playlist esta vacia." });
	} else {
		myModule.getSockets().emit("playlistUpdate", PlayList.playlist);
		myModule.getSockets().emit("playVideo", nextVideo);		
	}
};
function onMute(mute) {
	myModule.getSockets().emit("doMute", mute);
};
function onNewVideo(video) {
	myModule.getSockets().emit("playlistUpdate", PlayList.addVideo(video) );
	if (PlayList.actualVideo) {
		myModule.getSockets().emit("setActualVideoId", PlayList.actualVideoIndex);
	}
};
function onRequestRemoveVideo(id) {
	myModule.getSockets().emit("playlistUpdate", PlayList.removeVideo(id) );
	myModule.getSockets().emit("setActualVideoId", PlayList.actualVideoIndex);
};
function onRequestPlayVideo(id) {
	var video = PlayList.playVideo(id);
	if (video) {
		myModule.getSockets().emit("playVideo", video);
	}
};
module.exports = myModule;