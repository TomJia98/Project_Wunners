var songsAmount = $("#amount-of-songs");
var startBtn = $("#start");
const timer = $("#time");
const answer = $("#answer");
const finishedLyrics = $("#finished-lyrics");
var correctSong = ""

var timeTaken = 1;
var roundFinished = false;// change this value if the song is correctly guessed
var minimumWord = 4;//sets the minimum word size to be changed
var loop = 0;//the basis for the "custom" for loop


// timer.innerHTML = "hikhjjkhn <br> degfswgsr"// an option

startBtn.on("click", function (event) {
  
  $("#first-page").attr("class", "display:none;")
  $("#second-page").attr("class", "display:;")
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

      $(function () {
        answer.autocomplete({
          source: allSongs,
        });
      });// autofills from the allsongs array

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

    correctSong = chosenSong.songname;
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
    chosenSong.lyrics =  chosenSong.lyrics.slice(0, -70)
      console.log(chosenSong.lyrics + "_____________________________________")
      

function getWords(text){
  let x = text.replace(/[^A-Za-z0-9]+/g, " ");
  let newArr = x.trim().split(" ");
  return newArr;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max)
};

function startTimer(){// adds the timer
  var timeInterval = setInterval(function () {
    
    if (roundFinished) {
      clearInterval(timeInterval);
    }
    timer.text(timeTaken);
      timeTaken++        
    }, 1000);

};



var lyricsArr = getWords(chosenSong.lyrics);
function changeLyrics(){//self made for loop with different outcomes based on the fetch response

  if (loop < lyricsArr.length){
  if (lyricsArr[loop].length > minimumWord){
  var word =  lyricsArr[loop];
fetch("https://wordsapiv1.p.rapidapi.com/words/"+ word +"/typeOf", {      
"method": "GET",
"headers": {
  "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
  "x-rapidapi-key": "89589060b5mshffab6adbe6bfb7ap1a6f99jsnddb2235d4e56"
}
})
.then(function (resp) {
  return resp.json();
})
.then(function (data1) {
    if(data1.typeOf.length ==0){
      console.log(lyricsArr[loop] + " --- " + "no similar words, skipping");  
      loop++;
        changeLyrics();
        //if it successfully finds the word in the database, but it has no synonyms, skip and return something to the console
    }
    else {
      // if (lyricsArr[loop].charAt(0).toUpperCase() != lyricsArr[loop].charAt(0)){
      console.log(lyricsArr[loop])
    lyricsArr[loop] = data1.typeOf[getRandomInt(data1.typeOf.length)]
    console.log("is now " + lyricsArr[loop]);}
    // console.log(lyricsArr)
loop++
changeLyrics()
// if the word is found, and it has synonyms, select one from random and set that new word as the original word in the Lyricsarray

})
.catch(function(){
    console.log(lyricsArr[loop] + " --- " +"word not found, skipping");
    loop++
    changeLyrics()
    //if the word is not in the database, skip and log to console
})
}
else {
  loop++;
  changeLyrics();
  //if the selected word is shorter than the set minimum size, do nothing and skip
}}
else {
  // console.log(lyricsArr)
  // debugger
  var WIP = "";
  for (var i = 0; i < lyricsArr.length -1;i++){
    var x = lyricsArr[i+1].charAt(0);
    if ( x.toUpperCase() == x && lyricsArr[i+1].length != 1 ){
      var liEl = $("<li>");
      liEl.text(WIP);
      finishedLyrics.append(liEl);
      WIP = ""
    } else {
      if( WIP == ""){
        WIP = lyricsArr[i] + " " + lyricsArr[i+1] + " ";
      }else{
      WIP += lyricsArr[i+1] + " ";
      console.log(WIP);
      }
    }

  
  }

  //find a way to insert a line break before each capital letter
  // var finished = lyricsArr.join(" ");
  // console.log(finished);
  // finishedLyrics.text(finished)

  startTimer();//once the lyrics are loaded, start the timer
  }}

      console.log(chosenSong.lyrics);
      changeLyrics()
    });
  });
});



  

$("#submit-answer").on("click", function clickSubmit(){
  if (answer.val()== correctSong){
      console.log("correct song chosen");
      roundFinished = true;
      //add the function to load the highscore page here
  
  } else {
      timeTaken = timeTaken + 10;
  }
  })
