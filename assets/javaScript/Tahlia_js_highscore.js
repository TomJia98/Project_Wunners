var timeTaken = 20;

const amountofSongs = $("#amount-of-songs");
const username = $("#username");
const highScoresList = $("#scores");
const highScores = JSON.parse(localStorage.getItem("highscore")) || [];

const saveScoreBtn = $("#save");
const finalScore = $("#final-score");

const MAX_HIGH_SCORES = 5;

function displayFinalTime() {
  finalScore.text(timeTaken);
}

finalScore.innerText = highScores;

var score = {
  name: "",
  amountofSongs: amountofSongs,
  finalScore: timeTaken,
};

var array = $.map(score, function (value, index) {
  return [value];
});

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

displayFinalTime();
console.log(highScores);
