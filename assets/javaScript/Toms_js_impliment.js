
var chosenSong = {
    songname: "bazinga",
    lyrics: "party rock is in the house tonight ikfgbsdv everybody is going to lose their minds"
}

function getWords(text){
    let x = text.replace(/[^A-Za-z0-9]+/g, " ");
    let newArr = x.trim().split(" ");
    console.log(newArr);
    return newArr;
}
var lyricsArr = getWords(chosenSong.lyrics);


function getRandomInt(max) {
    return Math.floor(Math.random() * max)
};

var loop = 0;

 function changeLyrics(){
    if (loop < lyricsArr.length){
    
    if (lyricsArr[loop].length > 4){


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
      }
      else {
      lyricsArr[loop] = data.typeOf[0]
      console.log(lyricsArr);
loop++
changeLyrics()
}
  })
  .catch(function(){
      console.log(lyricsArr[loop] + " --- " +"word not found, skipping");
      loop++
      changeLyrics()
  })

}
else {
    loop++;
    changeLyrics();
}}

else {
    console.log(lyricsArr, "<---")
    var finished = lyricsArr.join(" ");
    console.log(finished)
    }

}

changeLyrics();

