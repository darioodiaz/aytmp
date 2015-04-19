var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";

var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function onYouTubeIframeAPIReady() {
	player = new YT.Player('player', {
		width: $("#playerContainer").width(),
		height: $("#playerContainer").height(),
		events: {
			'onStateChange': onPlayerStateChange
		}
	});
};