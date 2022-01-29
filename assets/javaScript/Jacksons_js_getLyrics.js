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
const giveUp = $("#give-up");
const amountofSongs = $("#amount-of-songs");
const username = $("#username");
const highScoresList = $("#scores");

const saveScoreBtn = $("#save");
const tryAgainBtn = $("#try-again");
const finalScore = $("#final-score");
//getting all the elements from the HTML

let highScores = JSON.parse(localStorage.getItem("highscore")) || [];

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
//setting up the variables that will be changed while running



//start of functions
function init() {
    //Places the game time as the final score
    finalScore.text(timeTaken);

    //Grabs the last high score
    const latestScore = highScores[highScores.length - 1];
    if (latestScore !== undefined) {
      finalScore.innerText = latestScore.finalScore + 1;
    }

    //Creates an li for every score that is stored within localstorage
    for (var i = 0; i < highScores.length; i++) {
      settingUl(highScores[i]);
    };}


function startTimer(){// adds the timer, which stops if roundFinished is set to True
    var timeInterval = setInterval(function () {
      
      if (roundFinished) {//stops the timer if the game is over, mainly to avoid errors
        clearInterval(timeInterval);
      }
      timer.text(timeTaken + " seconds");
        timeTaken++        
      }, 1000)};

function getWords(text){
        let x = text.replace(/[^A-Za-z0-9'(),]+/g, " ");
        let newArr = x.trim().split(" ");
        return newArr; //splits up the lyrics into an array
      }

      
function getRandomInt(max) {
  return Math.floor(Math.random() * max)
};//random number generator


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


function fillSongs() {
  answer.autocomplete({
    source: allSongs,
  });
};// autofills from the allsongs array

//end of functions



//start of events
startBtn.on("click", function (event) {
    inputs2ndPage.attr("style", "display:none;");
    firstPage.attr("style", "display:none;");
    secondPage.attr("style", "display:;");
    //hiding the needed elements to make the next page load

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
    }
      fillSongs()
      //saves all the available songs and adds them to the autofiller
    
    var randomNumber = (Math.random() * topTracks.length).toFixed(0) - 1;
    //creates a random number between 0 and the length of tracks chosen

      chosenSong.songname = topTracks[randomNumber].track.track_name
      chosenSong.trackid = topTracks[randomNumber].track.track_id
      correctSong = chosenSong.songname;
      console.log(correctSong);
    //sets the properties in the object chosenSong to the ones selected by the randomizer

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
})
 .then(function (data) {

    chosenSong.lyrics = data.message.body.lyrics.lyrics_body;
      //set the lyrics to the object chosenSong
      
    chosenSong.lyrics =  chosenSong.lyrics.slice(0, -74);
    //remove the last section from the lyrics, which is not needed

    var lyricsArr = getWords(chosenSong.lyrics);

function changeLyrics(){//self made for loop with different outcomes based on the fetch response
      if(isFirstRun){// this cannot be a regular for loop because of the asyncryonous property of the fetch method
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
   // ___________________________________________________________________________
 
   init();

$("#submit-answer").on("click", function clickSubmit(){
    if (answer.val()== correctSong){
        console.log("correct song chosen");
        roundFinished = true;
        finalScore.text(timeTaken + 1);
        secondPage.attr("style", "display:none");
        thirdPage.attr("style", "display:;");
        //upon a correct guess, stop the timer and load the highscore page
    
    } else {
        timeTaken = timeTaken + 10;
        $("#incorrect-guess").attr("style", "display:;");
        setTimeout(() => {  $("#incorrect-guess").attr("style", "display:none;");
      }, 1000);
    }// if the answer is incorrect, add 10 seconds to the timer and tell the user they where incorrect
  })
// ___________________________________________________________________________

  
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
// ___________________________________________________________________________


  songsAmount.on("input", function(){//changes the value on the first page to show the user the sliders value
     $("#current-songs-value").text(songsAmount.val());
  });
// ___________________________________________________________________________

giveUp.on("click", function(){
  location.reload();
})
  
tryAgainBtn.on("click", function resetPage() {//the click event for the try again button on page 3
  location.reload();
});//reloads the page to reset all the variables back to their beginning state
// ___________________________________________________________________________


clearHighscores.on("click", function(){//the click event for the clear highscores button on page 3
    localStorage.clear();
    location.reload();
    firstPage.attr("style", "display:none;")
    thirdPage.attr("style", "display:;")
    //clear the local storage, reset the page( easier than resetting all the individual variables ) 
});
// ___________________________________________________________________________


checkHighscores.on("click", function(){// the click event for the check highscores button on page 1
    firstPage.attr("style", "display:none;");
    thirdPage.attr("style", "display:;");
    username.attr("style", "display: none;");
    saveScoreBtn.attr("style", "display:none;")
    clearHighscores.attr("style", "display:;")
    finalScore.attr("style", "display:none");
    // hide all the non needed elements and show the highscores
});
// ___________________________________________________________________________
// end of events


//code written by Jackson Wray, Tom Jia & Tahlia La Galia, compiled by Tom Jia