
var chosenSong = {
    songname: "bazinga",
    lyrics: "party rock is in the house tonight ikfgbsdv everybody is going to lose their minds"
}//placeholder song object

function getWords(text){
    let x = text.replace(/[^A-Za-z0-9]+/g, " ");
    let newArr = x.trim().split(" ");
    console.log(newArr);
    return newArr;
}
// seperates out the lyrics string into an array
var lyricsArr = getWords(chosenSong.lyrics);

function getRandomInt(max) {
    return Math.floor(Math.random() * max)
};

var minimumWord = 4;//sets the minimum word size to be changed
var loop = 0;

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
.then(function (response) {
    return response.json();
  })
  .then(function (data) {
      if(data.typeOf.length ==0){
        console.log(lyricsArr[loop] + " --- " + "no similar words, skipping");  
        loop++;
          changeLyrics();
          //if it successfully finds the word in the database, but it has no synonyms, skip and return something to the console
      }
      else {
      lyricsArr[loop] = data.typeOf[getRandomInt(data.typeOf.length)]
loop++
changeLyrics()
// if the word is found, and it has synonyms, select one from random and set that new word as the original word in the Lyricsarray
}
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
    console.log(lyricsArr, "<---")
    var finished = lyricsArr.join(" ");
    console.log(finished)
    $("#finished-lyrics").text(finished)
    }}

changeLyrics();

$(function () {
    $('#answer').autocomplete({
      source: allSongs,
    });
  });// autofills from the allsongs array