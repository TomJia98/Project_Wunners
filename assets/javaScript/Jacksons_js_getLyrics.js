var songsAmount = $("#amount-of-songs");
var startBtn = $("#start");
const timer = $("#time");
const answer = $("#answer");
const finishedLyrics = $("#finished-lyrics");
const firstPage = $("#first-page");
const secondPage = $("#second-page");
const inputs2ndPage = $("#inputs-page-two");
const thirdPage = $("#highscore")
const checkHighscores = $("#check-scores");
const clearHighscores =$("#clear-all");

const amountofSongs = $("#amount-of-songs");
const username = $("#username");
const highScoresList = $("#scores");
let highScores = JSON.parse(localStorage.getItem("highscore")) || [];

const saveScoreBtn = $("#save");
const tryAgainBtn = $("#try-again");
const finalScore = $("#final-score");

var correctSong = ""
let isFirstRun = true;// sets the inital run
var timeTaken = 1;
var roundFinished = false;// change this value if the song is correctly guessed
var minimumWord = 4;//sets the minimum word size to be changed
var loop = 0;//the basis for the "custom" for loop
var allSongs = [];
var chosenSong = {
  songname: "",
  trackid: "",
  lyrics: "",
}



function init() {
  //Places the game time as the final score
  finalScore.text(timeTaken);

  //Grabs the last high score
  const latestScore = highScores[highScores.length - 1];
  if (latestScore !== undefined) {
    finalScore.innerText = latestScore.finalScore;
  }

  //Creates an li for every score that is stored within localstorage
  for (var i = 0; i < highScores.length; i++) {
    settingUl(highScores[i]);
  }
}


function startTimer(){// adds the timer, which stops if roundFinished is set to True
  var timeInterval = setInterval(function () {
    
    if (roundFinished) {
      clearInterval(timeInterval);
    }
    timer.text(timeTaken);
      timeTaken++        
    }, 1000);

};


function settingUl(inputScore) {//appends the scores currently in LocalStorage to the page
  const li = $("<li>");
  li.text(
    "Name: " +
      inputScore.name +
      " " +
      "Amount of songs: " +
      inputScore.amountofSongsValue +
      " " +
      "Time taken: " +
      inputScore.finalScore
  );
  li.addClass("high-score");
  highScoresList.append(li);
}



startBtn.on("click", function (event) {

  inputs2ndPage.attr("style", "display:none;");
  firstPage.attr("style", "display:none;");
  secondPage.attr("style", "display:;");
  //hiding the needed elements to make the next page load


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
    dataType: "jsonp",
    jsonpCallback: "jsonp_callback",
    contentType: "application/json",
//makes the first API call to MXM


  }).then(function (data) {
    var topTracks = data.message.body.track_list;
    for (var i = 0; i < topTracks.length; i++) {
      allSongs[i] = topTracks[i].track.track_name;
      
      $(function () {
        answer.autocomplete({
          source: allSongs,
        });
      });// autofills from the allsongs array


    }
 
    var randomNumber = (Math.random() * topTracks.length).toFixed(0) - 1;

    
      chosenSong.songname = topTracks[randomNumber].track.track_name
      chosenSong.trackid = topTracks[randomNumber].track.track_id
    

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
    chosenSong.lyrics =  chosenSong.lyrics.slice(0, -74)
    //remove the last section from the lyrics, which is always the same and not needed
      

function getWords(text){
  let x = text.replace(/[^A-Za-z0-9'(),]+/g, " ");
  let newArr = x.trim().split(" ");
  return newArr; //splits up the 
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max)
};

var lyricsArr = getWords(chosenSong.lyrics);

function changeLyrics(){//self made for loop with different outcomes based on the fetch response
if(isFirstRun){
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
      if (lyricsArr[loop].charAt(0).toUpperCase() != lyricsArr[loop].charAt(0)){
      console.log(lyricsArr[loop])
    lyricsArr[loop] = data1.typeOf[getRandomInt(data1.typeOf.length)]
    console.log("is now " + lyricsArr[loop]);
    loop++
    changeLyrics()}
    
    else{
    // console.log(lyricsArr)
loop++
changeLyrics()}}
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
  // // console.log(lyricsArr)
  var WIP = "";
  for (var i = 0; i < lyricsArr.length -1;i++){
    var x = lyricsArr[i+1].charAt(0);
    if ( x.toUpperCase() == x && lyricsArr[i+1].length != 1 || x == undefined){
      var liEl = $("<li>");
      liEl.text(WIP);
      finishedLyrics.append(liEl);
      WIP = ""
    } else {
      if( WIP == ""){
        WIP = lyricsArr[i] + " " + lyricsArr[i+1] + " ";
      }else{
      WIP += lyricsArr[i+1] + " ";
      }// loops through the lyricsArr and checks for something starting with a capital, which means there should be a line break. 
    }// then takes all the array elements before that capital and appends them as a string to the HTML
  }

  startTimer();//once the lyrics are loaded, start the timer
  $("#loading").attr("style", "display:none;")
  inputs2ndPage.attr("style", "display:;")
  $("#taco-image").attr("style", "display:none;")
  isFirstRun = false;}//only allows the lyrics to be run once (unless isFirstRun is redefined by a clear)

  }};

      changeLyrics()

    })})});
 



$("#submit-answer").on("click", function clickSubmit(){
  if (answer.val()== correctSong){
      console.log("correct song chosen");
      roundFinished = true;
      secondPage.attr("style", "display:none");
      thirdPage.attr("style", "display:;")
      init();

      //add the function to load the highscore page here
  
  } else {
      timeTaken = timeTaken + 10;
  }
  })

  
saveScoreBtn.on("click", function saveHighScore(e) {
  //When user clicks on save, create new score
  var newScore = {
    name: username.val(),
    amountofSongsValue: amountofSongs.val(),
    finalScore: timeTaken,
  };

  //Adds new score to highScores
  highScores.push(newScore);

  //Saves highScores to localstorage
  localStorage.setItem("highscore", JSON.stringify(highScores));

  //Hides the username input
  username.attr("style", "display: none;");

  saveScoreBtn.attr("style", "display:none;")
  clearHighscores.attr("style", "display:;")
  //hides the save button and shows the clear all button

  settingUl(newScore);
  //Adds li with new score
});


  songsAmount.on("input", function(){
    $("#current-songs-value").text(songsAmount.val());
  })

  
tryAgainBtn.on("click", function resetPage() {
  location.reload();
});

clearHighscores.on("click", function(){
localStorage.clear();
location.reload();
firstPage.attr("style", "display:none;")
thirdPage.attr("style", "display:;")
});

checkHighscores.on("click", function(){
  firstPage.attr("style", "display:none;");
  thirdPage.attr("style", "display:;");
  username.attr("style", "display: none;");
  saveScoreBtn.attr("style", "display:none;")
  clearHighscores.attr("style", "display:;")




})