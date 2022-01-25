var timeTaken = 20; //using this for testing

const amountofSongs = $("#amount-of-songs");
const username = $("#username");
const highScoresList = $("#scores");
const highScores = JSON.parse(localStorage.getItem("highscore")) || [];

const saveScoreBtn = $("#save");
const finalScore = $("#final-score");

function displayFinalTime() {
  finalScore.text(timeTaken);
}

finalScore.innerText = highScores;

var score = {
  name: "",
  amountofSongs: amountofSongs,
  finalScore: timeTaken,
};

saveScoreBtn.on("click", function saveHighScore(e) {
  e.preventDefault();
  score.name = username.val();
  localStorage.setItem("score", JSON.stringify(score));
  settingUl();
});

function settingUl() {
  const li = $("<li>");
  localStorage.setItem("highscore", JSON.stringify(score));
  li.text(score.name + score.amountofSongs + score.finalScore);
  li.addClass("high-score");
  li.append(highScoresList);
}

function displayScores(object) {
  if (object) {
    (settingUl).html(highScoresList);
  }
}
displayScores(highScores);

displayFinalTime(); //add this to the on click for when the game is finished
console.log(highScores);
