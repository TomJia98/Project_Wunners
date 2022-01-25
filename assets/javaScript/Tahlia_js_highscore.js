var timeTaken = 20; //using this for testing

const amountofSongs = $("#amount-of-songs");
const username = $("#username");
const highScoresList = $("#scores");
const highScores = JSON.parse(localStorage.getItem("highscore")) || [];

const saveScoreBtn = $("#save");
const finalScore = $("#final-score");

function init() {
  for (var i = 0; i < highScores.length; i++) {
    //creates an li for every score that is stored within localstorage
    settingLi(highScores[i]);
  }
}

function displayFinalTime() {
  finalScore.text(timeTaken);
}

finalScore.innerText = highScores;

saveScoreBtn.on("click", function saveHighScore(e) {
  // when user clicks on save
  // create new score
  // add new score to highScores
  // save highScores to localstorage
  // add li with new score

  var newScore = {
    name: username.val(),
    // amountofSongs: amountofSongs,
    amountofSongsValue: amountofSongs.val(),
    finalScore: timeTaken,
  };

  highScores.push(newScore);

  localStorage.setItem("highscore", JSON.stringify(highScores));

  // if hiscore > 5 clear local storage and ul
  if (highScores > 5) {
    localStorage.clear();
    highScoresList.empty();
  }

  settingLi(newScore);
});

function settingLi(inputScore) {
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

  console.log(highScoresList);
}

displayFinalTime(); //add this to the on click for when the game is finished
init();
