var IP = "http://localhost"

socket = io.connect(IP + ":3000");
socket.on("playlistUpdate", onPlaylistUpdate);
socket.on("playVideo", onPlayVideo);
socket.on("doMute", onDoMute);
socket.on("setVolume", onVolume);
socket.on("setActualVideoId", onSetActualVideoId);
socket.on("notification", onNotification);
socket.on("setVideoDuration", onSetVideoDuration);
socket.on("setElapsedTime", onSetElapsedTime);
socket.emit("requestPlaylist");

function onSetElapsedTime (seconds) {
	$("#currentTime").text(getTotalVideoTime(seconds));
	elapsedTime = seconds;
	if (elapsedTimeTimer) {
		clearInterval(elapsedTimeTimer);
	}
	elapsedTimeTimer = setInterval(updateElapsedTime, 1000);
};
function updateElapsedTime () {	
	elapsedTime++;
	$("#currentTime").text(getTotalVideoTime(elapsedTime));
};
function onPlaylistUpdate(playlist) {
	var currentPlaylist = $("#currentPlaylist");
	currentPlaylist.empty();
	playlist.forEach(function(video, id) {
		currentPlaylist.append("<p><button class='btn btn-link playlistItem'><i class='glyphicon'> </i><a id='" + id +"' href='#'> " + video.name + "</a>&nbsp;&nbsp;</button><button class='removePlaylistItem' id='" + video.id + "' ><i class='glyphicon glyphicon-remove'></i></button></p>");
	});
	attachEvents();
};
function onSetVideoDuration(totalTime) {
	$("#totalTime").text(totalTime);
};
function onSetActualVideoId(videoId) {
	actualVideoId = videoId;
	var videoText = $("button a[id='" + actualVideoId + "']")
		.parent()
		.find(".glyphicon")
		.addClass("glyphicon-play")
		.parent()
		.find("a")
		.text();
	$("#currentVideoTitle").text(videoText);

};
function onVolume(volume) {
	$("#volume").val(volume);
	$("#serverVolume").text(volume + "%");
	try {
		player.setVolume(parseInt(volume));
	} catch(e) {}
};
function onDoMute(doMute) {
	try {
		if (doMute) {
			player.mute();
		} else {
			player.unMute();
		}
	} catch(e) {}	
	if (!doMute) {
		$("#mute-unmute")
			.find(".glyphicon")
			.removeClass("glyphicon-volume-up")
			.addClass("glyphicon-volume-off");
	} else {
		$("#mute-unmute")
			.find(".glyphicon")
			.removeClass("glyphicon-volume-off")
			.addClass("glyphicon-volume-up");
	}
};
function onPlayVideo(video) {
	playVideo(video.id, video.name, video.pos, video.icon);
	$("#currentVideoTitle").text(video.name);
};
function onNotification(notification) {
	showNotification(notification.title, notification.body, notification.icon);
};