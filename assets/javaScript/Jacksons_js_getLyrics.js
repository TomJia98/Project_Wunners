var songsAmount = $("#amount-of-songs");
// Slider input
var startBtn = $("#start");
// Begin Game button
startBtn.on("click", function (event) {
  event.preventDefault();
  $.ajax({
    type: "GET",
    data: {
      apikey: "6003769222f556251b2bfdaa8af4d1fa",
      format: "jsonp",
      callback: "jsonp_callback",
    },
    url:
      "https://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page_size=" +
      songsAmount.val() +
      "&country=au&f_has_lyrics=1",
    // url for top songs
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
    // returns array with song names of all songs called (for autofill for user guess)

    // function randomTrack() {
    //   var randTrack = (Math.random() * topTracks.length).toFixed(0) - 1;
    //   return topTracks[randTrack];
    // }

    // --This function was generating a random song every time it was called so the lyrics were different to the chosen song. Best to have set var (below) setting a random number oce and using that in the chosenSong object.

    var randomNumber = (Math.random() * topTracks.length).toFixed(0) - 1;

    console.log(topTracks);
    // returns array of all songs as objects containing various details

    var chosenSong = {
      songname: topTracks[randomNumber].track.track_name,
      trackid: topTracks[randomNumber].track.track_id,
      lyrics: "",
    };
    // object used for storing random song chosen from list of all top songs; getting lyrics, using track_id (unique to each song); and storing lyrics (assigned as empty currently)

    console.log(chosenSong);

    $.ajax({
      type: "GET",
      data: {
        apikey: "6003769222f556251b2bfdaa8af4d1fa",
        format: "jsonp",
        callback: "jsonp_callback",
      },
      url:
        "https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=" +
        chosenSong.trackid,
      // url for getting lyrics
      dataType: "jsonp",
      jsonpCallback: "jsonp_callback",
      contentType: "application/json",
    }).then(function (data) {
      chosenSong.lyrics = data.message.body.lyrics.lyrics_body;
      // re assigning lyrics key in chosenSong object as said song's lyrics

      console.log(chosenSong.lyrics);
    });
  });
});
