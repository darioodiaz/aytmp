/*
TODO list:

- replace interval to process.nextTick()
- improve code performance and structuring

*/

var myModule = {
	playlist: [],
	actualVideoIndex: 0,
	actualVideoId: "",
	volumeServer: 25,
	duration: 0,
	totalTimeVideo: 0,
	elapsedTime: 0
};

myModule.getTotalVideoTime = getTotalVideoTime;
myModule.setTotalVideoDuration = setTotalVideoDuration;
myModule.nextVideo = nextVideo;
myModule.removeVideo = removeVideo;
myModule.addVideo = addVideo;
myModule.isPlayListEmpty = isPlayListEmpty;
myModule.playVideo = playVideo;

function playVideo (index) {
	var _video = this.playlist[index];
	_video.pos = index;
	this.actualVideoIndex = index;
	this.actualVideoId = _video.id;
	this.actualVideo = _video;
	console.log("Now playing: ", _video.name);
	return _video;
};
function nextVideo () {
	this.actualVideoIndex++;
	if (this.actualVideoIndex >= this.playlist.length) {
		this.actualVideo = null;		
	} else {
		this.actualVideo = this.playlist[this.actualVideoIndex];
		this.actualVideo.pos = this.actualVideoIndex;
	}
	if (this.elapsedTimeTimer) {
		clearInterval(this.elapsedTimeTimer);
		this.elapsedTime = 0;
		this.elapsedTimeTimer = null;
	}
	return this.actualVideo;
};
function addVideo (video) {
	this.playlist.push(video);
	console.log("New video added: ", video.name);
	return this.playlist;
};
function removeVideo (videoId) {
	var videoPos = -1;
	this.playlist.forEach(function(video, index) {
		if (video.id == videoId) {
			videoPos = index;
			return;
		}
	});
	var video = this.playlist.splice(videoPos, 1)[0];	
	console.log("Video removed: ", video.name);
	return this.playlist;
};
function setTotalVideoDuration (duration) {
	this.duration = duration;	
	if (this.elapsedTimeTimer) {
		this.elapsedTime = 0;
		clearInterval(this.elapsedTimeTimer);
	}
	this.elapsedTimeTimer = setInterval(elapsedTimeIntervalFn, 1000);
};
function elapsedTimeIntervalFn () {
	myModule.elapsedTime++;
};
function getTotalVideoTime () {
	var sec_num = parseInt(this.duration, 10);
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) { hours   = "0" + hours; }
    if (minutes < 10) { minutes = "0" + minutes; }
    if (seconds < 10) { seconds = "0" + seconds; }
    this.totalTimeVideo = hours + ':' + minutes + ':' + seconds;
    return this.totalTimeVideo;
};
function isPlayListEmpty() {
	return this.playlist.length == 0;
};

module.exports = myModule;