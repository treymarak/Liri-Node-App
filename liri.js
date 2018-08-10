require("dotenv").config();

var keys = require("./keys.js");
var geoCoder = require("geocoder");
var weather = require("weather-js");
var Spotify = require("node-spotify-api");
var request = require("request");
var fs = require("fs");


var action = process.argv[2];
var movieName = process.argv[3];
var nodeArgs = process.argv[3];

var search = "";

for (var i = 3; i < process.argv.length; i++) {

  search = search + " " + process.argv[i];

}

console.log(search);

switch (action) {
    case "weather":
    getWeather();
      break;
    
    case "spotify":
    spotifyThisSong();
      break;
    
    case "movie":
      movie();
      break;
    
    case "random":
      getRandom();
      break;
    }


    function getWeather(){ 
    //switch address for search

    geoCoder.geocode(search, function(err, data){


     var addressComponents = data.results[0].address_components;
     var zipCode = "";
     var city = "";

     for (var i = 0; i < addressComponents.length; i++) {


       if (addressComponents[i].types[0] === "postal_code") {


         zipCode = addressComponents[i].short_name;

       }

       if (addressComponents[i].types[0] === "locality") {

         city = addressComponents[i].types[0];

       }
      
     }

     
     var getSearch = "";

     if (zipCode !== "") {

     }

     else {
       getSearch = city;
     }


     weather.find({ search: search, degreeType: "F" }, function(err, result){


      if (err) {
        console.log("");
        console.log("");
        console.log("");
        console.log("Sorry we don't have enough data on that location! Try somewhere else.");
        console.log("");
        console.log("");
        console.log("");
  
        return;
      }
  
      console.log(JSON.stringify(result[0], null, 2));
  
      
      console.log("");
      console.log("");
      console.log("");
      console.log("Weather Forecast: ");
      console.log("-------------------------------------------------------------------");
      console.log("Current Temperature: " + result[0].current.temperature + " F");
      console.log("Sky: " + result[0].current.skytext);
      console.log("Tomorrow's Forecast: Low of " + result[0].forecast[1].low + "F, High of " + result[0].forecast[1].high + "F");
      console.log("");
      console.log("");
      console.log("");

     });
    });
   
  }

  

   

   function spotifyThisSong (){

    var spotify = new Spotify(keys.spotify);


    if (search === undefined) {

       search = "The Sign - Ace The Base"

    }


    spotify.search({ type: "track", query: search }, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
     
      console.log("Artist: " + data.tracks.items[0].artists[0].name + "\nSong name: " + data.tracks.items[0].name +
      "\nAlbum Name: " + data.tracks.items[0].album.name + "\nPreview Link: " + data.tracks.items[0].preview_url);
    });

   }


   function movie() {
            
    
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&r=json&tomatoes=true&apikey=trilogy";

   
    console.log(queryUrl);

    
    request(queryUrl, function(error, response, body) {

       
        if (!error && response.statusCode === 200) {
            var movieObject = JSON.parse(body);

            
            var movieResults = 
            "------------------------------ begin ------------------------------" + "\r\n" +
            "Title: " + movieObject.Title+"\r\n"+
            "Year: " + movieObject.Year+"\r\n"+
            "Imdb Rating: " + movieObject.imdbRating+"\r\n"+
            "Rotten Tomatoes Rating: " + movieObject.tomatoRating+"\r\n"+
            "Country: " + movieObject.Country+"\r\n"+
            "Language: " + movieObject.Language+"\r\n"+
            "Plot: " + movieObject.Plot+"\r\n"+
            "Actors: " + movieObject.Actors+"\r\n"+
            "------------------------------ end ------------------------------" + "\r\n";
            console.log(movieResults);
           
        } 

        else {
			console.log("Error :"+ error);
			return;
		}
    });
};



function getRandom(){
  
  fs.readFile("random.txt", "utf8", function(error, data) {
      if (error) {
          return console.log(error);
      }
      else {
      console.log(data);

     
      var randomData = data.split(",");
     
      commands(randomData[0], randomData[1]);
      }
      console.log("test" + randomData[0] + randomData[1]);
  });
};


    
    



