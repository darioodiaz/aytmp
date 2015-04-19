var elapsedTimeTimer;
var elapsedTime = 0;
var socket;
var notification;
var player;
var actualVideoId;
if (window.Notification.permission != "granted") {
	window.Notification.requestPermission();
}