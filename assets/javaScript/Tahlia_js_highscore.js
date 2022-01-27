var timeTaken = 20; //using this for testing

const amountofSongs = $("#amount-of-songs");
const username = $(".username");
const highScoresList = $("#scores");
let highScores = JSON.parse(localStorage.getItem("highscore")) || [];

const saveScoreBtn = $("#save");
const tryAgainBtn = $("#try-again");
const finalScore = $("#final-score");

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
    settingLi(highScores[i]);
  }
}

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

  //If hiscore > 5 clear local storage and ul
  if (highScores.length > 4) {
    localStorage.clear();
    highScoresList.empty();
    highScores = [];
  }

  //Adds li with new score
  settingLi(newScore);
});

function settingUl() {
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
displayScores(highScores);

tryAgainBtn.on("click", function resetPage() {
  location.reload();
});

init();
