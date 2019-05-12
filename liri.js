//getting the keys for the.env file and keep secret//
require("dotenv").config();

    //creating the variable for the keys.js file contents / and all of the packages have been loaded//
var Spotify = require("node-spotify-api");
    //for the OMBD API and Bands in Town APIs//
var axios = require("axios");
    //for formatting the times and dates for events//
var moment = require("moment");
    //for file system for random//
var fs = require("fs");

    //user commands entered for Liri//
var command = process.argv[2];
    //console.log("command: " + command);
    //just in case there are multiple words in the user search parameter//
var userInput = process.argv.slice[3].join(" ");
console.log("userInput: " + input);

function goLiri(command, userInput) {
    switch (command) {
        case "spotify-this-song":
        getSpotify(userInput);
        break;

        case "concert-this":
        getBandsInTown(userInput);
        break;

        case "movie-this":
        getOMBD(UserInput);
        break;

        caase "do-what-it-says":
        getRandom(userInput);
        break;
    }
};






