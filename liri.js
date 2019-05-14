        //set variables with the .env pack//
require("dotenv").config();

        //Spotify API and keys//
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var keys = require("./keys");

        //for the OMBD API and Bands in Town APIs//
var axios = require("axios");

        //for formatting the dates for events//
var moment = require("moment");

        //Needed to read and wrtite text files//
var fs = require("fs");


        //Global - - - - user commands entered for Liri//
var userCommand= process.argv[2];
var userInput = process.argv.slice[3].join(" ");
    //console.log(userCommand);
    //console.log(userInput);


    switch (userCommand) {
        case "spotify-this-song":
        getSpotify(userInput);
        break;

        case "concert-this":
        getBandsInTown(userInput);
        break;

        case "movie-this":
        getMovie(UserInput);
        break;

        case "do-what-it-says":
        getRandom(userInput);
        break;

        default: 
        console.log("Put in a command: 'spotify-this-song', 'concert-this', 'movie-this', 'do-what-it-says");
    }


    //-------------------Spotify search begins here-----------------------------//
    function getSpotify(songName) {
        if (!songName) {
          songName = "The Sign"; //default Song
        }
      
        spotify.search({ type: "track", query: songName }, function (err, data) {
          if (err) {
            console.log("Error occurred: " + err);
            return;
          }
      
          var songs = data.tracks.items;
          //console.log(songs)
          for (var i = 0; i <songs.length; i++) {
            console.log(i);
            console.log("Artist:" + songs[i].artists[0].name);
            console.log("Song's name: " + songs[i].name);
            console.log("Song's preview: " + songs[i].preview_url);
            console.log("Album: " + songs[i].album.name);
            console.log("=============================================================================");
          }
        }
        );
      }
    
      //---------------------Bands In Town Events begin here---------------------//
      function getBandsInTown(artist) {
        if (!artist) {
          console.log("You must enter Artist or Band name.");
        } else {
          var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
          //console.log(queryUrl);
      
          axios.get(queryUrl).then(
            function (response) {
      
              /*if (!venue) {
                console.log("Your artist not on tour.")
              }*/
      
              var venue = response.data
              //console.log(venue);
      
              for (var i = 0; i < venue.length; i++) {
                var date = moment(venue[i].datetime)
      
                console.log("====================Event Info==================================");
                console.log(i);
                console.log("Venue : " + venue[i].venue.name);
                console.log("Venue Location : " + venue[i].venue.city + "," + venue[i].venue.country);
                console.log("Date of the Event : " + date.format("dddd, MMMM Do YYYY, h:mm:ss a"));
                console.log("================================================================");
              }
      
            }
          );
        }
      };

      //--------------------------------Movies begin here--------------------------//

      function getMovie(movie) {
        if (!movie) {
          movie = "Mr. Nobody"; 
          console.log("Mr. Nobody");
        };
      
        var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
        //console.log(queryUrl);
      
        axios.get(queryUrl).then(
          function output(response) {
            if (!response.data.Title) {
              console.log("Check your spelling");
      
            } else {
              // console.log(response);
              console.log("===================================================================")
              console.log("Title of the movie: " + response.data.Title);
              console.log("Release Year: " + response.data.Year);
              console.log("IMDB Rating: " + response.data.imdbRating);
              console.log(response.data.Ratings[1].Source + " Rating: " + response.data.Ratings[1].Value);
              console.log("Origin Country: " + response.data.Country);
              console.log("Language: " + response.data.Language);
              console.log("Plot: " + response.data.Plot);
              console.log("Actors: " + response.data.Actors);
              console.log("===================================================================");
            }
          }
        );
      }

      //-------------------------------Do What It Says here----------------------------//
      function getRandom() {

        fs.readFile("random.txt", "utf8", function (error, data) {
      
          // It will log the error to the console.
          if (error) {
            return console.log(error);
          }
          // Data here
          //console.log(data);
          var dataArr = data.split(",");
          //console.log(dataArr);
          //console.log(dataArr[0])
          var newCommand = dataArr[0];
          var newInput = dataArr[1];
      
          if (newCommand === "movie-this") {
            movieThis(newInput);
          }
          if (newCommand === "concert-this") {
            concertThis(newInput)
          }
          if (newCommand === "spotify-this-song") {
            spotifyThis(newInput)
          }
        });
      }