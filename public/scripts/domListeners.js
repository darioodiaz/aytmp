$(document).on("ready", onDomReady);

function onDomReady() {
	$("#btn_add").on("click", onBtnAddClick);
	$("#next").on("click", onNextClick);
	$("#prev").on("click", onPrevClick);
	$("#volume").on("change", onVolumeChange);
	$("#mute-unmute").on("click", onMuteUnmuteClick);
};
function onMuteUnmuteClick(e) {
	var isMute = $("#mute-unmute")
					.find(".glyphicon")
					.hasClass("glyphicon-volume-up");
	socket.emit("mute", !isMute);
};
function onVolumeChange (e) {
	socket.emit("requestVolume", $("#volume").val() );
};
function getTotalVideoTime (duration) {
	var sec_num = parseInt(duration, 10);
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) { hours   = "0" + hours; }
    if (minutes < 10) { minutes = "0" + minutes; }
    if (seconds < 10) { seconds = "0" + seconds; }
    var totalTimeVideo = hours + ':' + minutes + ':' + seconds;
    return totalTimeVideo;
};
function onPrevClick() {
	//prevVideo();
};
function onNextClick() {

	//nextVideo();
};
function onBtnAddClick(e) {
	addVideo();
};
function attachEvents() {
	$(".playlistItem").on("click", onPlaylistItemClick);
	$(".removePlaylistItem").on("click", onRemovePlaylistItemClick);
};
function onPlaylistItemClick(e) {
	var id = $(e.currentTarget).find("a").attr("id");
	socket.emit("requestPlayVideo", id);
};
function onRemovePlaylistItemClick(e) {
	var id = $(e.currentTarget).attr("id");
	socket.emit("requestRemoveVideo", id);
};
function showNotification(title, body, icon) {
	notification = new Notification(title, { body: body, icon: icon });
	setTimeout(closeNotification, 3500);
};
function closeNotification() {
	notification.close();
};