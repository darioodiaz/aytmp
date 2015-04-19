function googleApiClientReady (argument) {
  gapi.client.setApiKey('AIzaSyDCoD6SiNjG6z6pyviFw7t-uhxSRQmZufs');
  gapi.client.load("youtube", "v3", onYTLoaded);
};
function onYTLoaded (argument) {
  $("#frm_search").on("submit", onSubmit);
  $('#btn_search')
    .attr('disabled', false)
  console.info("Youtube API loaded.");

  function onSubmit(e) {
    e.preventDefault();
    yt_search();
  };

};
function yt_search() {
  var q = $('#query').val();
  var request = gapi.client.youtube.search.list({
    q: q,
    part: 'snippet',
    maxResults: 15,
    type: "video"
  });
  request.execute(function(response) {
    var results = response.result.items;
    $('#yt_results').empty();
    results.forEach(function(item) {
      $('#yt_results').append('<p><img src="' + item.snippet.thumbnails.default.url + '"></img><button class="btn btn-link">' + item.snippet.title + '</button>&nbsp;&nbsp;<button class="btn btn-xs btn-default videoResult" title="' + item.snippet.title +'" id="' + item.id.videoId +'"><i class="glyphicon glyphicon-plus"></i></button> </p>');
    });
    $(".videoResult").on("click", onVideoResultClick);
  });
};
function onVideoResultClick (e) {
  e.preventDefault();
  var video = { 
    id: $(e.currentTarget).attr("id"), 
    name: $(e.currentTarget).attr("title"),
    icon: $(e.currentTarget).parent().find("img").attr("src")
  };
  socket.emit("addVideo", video);
};