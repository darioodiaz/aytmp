$(document).on("ready", onDomReady);

function onDomReady() {
	$("#btn_send").click(onSendClick);
};

function onSendClick() {
	var dailykey = $("#dailyKey").val();
	if (key) {
		$.post("challenge", { key: dailykey });
	}
};