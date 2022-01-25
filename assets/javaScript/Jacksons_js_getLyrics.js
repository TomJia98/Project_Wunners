var songsAmount = $("#amount-of-songs");
var startBtn = $("#start");
startBtn.on("click", function (event) {
  event.preventDefault();
  $.ajax({
    type: "GET",
    data: {
      apikey: "6003769222f556251b2bfdaa8af4d1fa",
      // q_artist: artistSearch,
      format: "jsonp",
      callback: "jsonp_callback",
    },
    url:
      "https://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page_size=" +
      songsAmount.val() +
      "&country=au&f_has_lyrics=1",
    dataType: "jsonp",
    jsonpCallback: "jsonp_callback",
    contentType: "application/json",
  }).then(function (data) {
    console.log(data);
    var allSongs = [];
    var topTracks = data.message.body.track_list;
    for (var i = 0; i < topTracks.length; i++) {
      allSongs[i] = topTracks[i].track.track_name;
    }
    console.log(allSongs);
    // function randomTrack() {
    //   var randTrack = (Math.random() * topTracks.length).toFixed(0) - 1;
    //   return topTracks[randTrack];
    // }

    // --This function was generating a random song every time it was called so the lyrics were different to the chosen song. Best to

    var randomNumber = (Math.random() * topTracks.length).toFixed(0) - 1;

    console.log(topTracks);
    var chosenSong = {
      songname: topTracks[randomNumber].track.track_name,
      trackid: topTracks[randomNumber].track.track_id,
      lyrics: "",
    };
    console.log(chosenSong);

    $.ajax({
      type: "GET",
      data: {
        apikey: "6003769222f556251b2bfdaa8af4d1fa",
        // q_artist: artistSearch,
        format: "jsonp",
        callback: "jsonp_callback",
      },
      url:
        "https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=" +
        chosenSong.trackid,
      dataType: "jsonp",
      jsonpCallback: "jsonp_callback",
      contentType: "application/json",
    }).then(function (data) {
      chosenSong.lyrics = data.message.body.lyrics.lyrics_body;
      console.log(chosenSong.lyrics);
    });
  });
});
