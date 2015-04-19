function addVideo() {
	var videoUrl = $("#newVideo").val();
	if(videoUrl.toLowerCase().indexOf("youtube") == -1) {
		alert("La URL debe pertener a youtube.");
		return;
	}
	var videoSplit = videoUrl.split("?v=");
	$.ajax({
        url: "http://gdata.youtube.com/feeds/api/videos/" + videoSplit[1] + "?v=2&alt=json",
        dataType: "jsonp",
        success: onSuccess
    });
	function onSuccess(data) {
		var title = data.entry.title.$t;
		var video = { id: videoSplit[1], name: title };
		socket.emit("addVideo", video);
		$("#newVideo").val("");
	};
};

function nextVideo() {
	socket.emit("nextVideo");
};
function playVideo(videoId, title, pos, icon) {
	try {
		player.loadVideoById(videoId);
	} catch (e) {
		console.warn("Error on loadVideoById, are you central or client?");
	}
	showNotification("Now Playing:", title, icon);
	actualVideoId = pos;
	elapsedTime = 0;
	onSetElapsedTime(elapsedTime);
	$("button .glyphicon").removeClass("glyphicon-play");
	$("button a[id='" + actualVideoId + "']").parent().find(".glyphicon").addClass("glyphicon-play");
};
function onPlayerError(event) {
	alert("Error: ", event);
};
function onPlayerReady(event) {
	event.target.playVideo();
};
function onPlayerStateChange(e) {
	if (e.data == 0) {
		nextVideo();
	} else if (e.data == 1) {
		socket.emit("videoDuration", player.getDuration());
	}
};
function mute() {
	player.mute();
};
function unMute() {
	player.unMute();
};