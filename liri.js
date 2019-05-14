//getting the keys for the.env file and keep secret//
require("dotenv").config();


    //creating the variable for the keys.js file contents / and all of the packages have been loaded//
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
    //for the OMBD API and Bands in Town APIs//
var axios = require("axios");
    //for formatting the dates for events//
var moment = require("moment");
var keys = require("./keys.js");
var fs = require("fs");


    //Global - - - - user commands entered for Liri//
var command = process.argv[2];
    //just in case there are multiple words in the user search parameter//
var userInput = process.argv.slice[3].join(" ");
    // console.log("userInput: " + userInput);


    switch (command) {
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
                console.log("----------------------------------------------------------------");
              }
      
            }
          );
        }
      };

    