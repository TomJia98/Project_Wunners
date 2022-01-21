var word = "train"
fetch("https://wordsapiv1.p.rapidapi.com/words/"+word+"/typeOf", {      
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
      console.log(data);
  })
