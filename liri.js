// dotenv gets the spotify id and secret from keys.js
require("dotenv").config();

// fs brings in the readFile function to read random.txt
var fs = require("fs");

// request is used to make API calls to BandsInTown and OMDI
var request = require("request");

// moment is used to format concert dates
var moment = require("moment");

// keys.js contains links to the spotify id and secret
var keys = require("./keys.js");

// Spotify is used to make API calls to spotify
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

// action is used to store concert-this, spotify-this-song, movie-this, or do-what-it-says
var action = process.argv[2].toLowerCase();

// media is used to store the band, song, or movie
var media = "";

// dataArray is used to parse the data from random.txt
var dataArray = [];

// If the action requires reading the random.txt file then 
// (1) The data is read and parsed into the action and media variables
// (2) The checkAction function is called
// Else the checkAction function is called
if (action == "do-what-it-says") {
    fs.readFile("./random.txt", "utf8", function(error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
          return console.log(error);
        }
        else {
            dataArray = data.split(",");
            action = dataArray[0];
            media = dataArray[1];
            checkAction();
        }
    })
}
else {
    checkAction();
}

// checkAction checks for band, song, or movie
// It sets media if it has not already been set
// It calls the appropriate function to process the action
function checkAction(){

    switch (action){

        case "concert-this":
            if (process.argv[3]) {
                media = process.argv[3];
            }
            else if (media == ""){
                media = "Bruno Mars";
            }
            console.log("media: " + media);
            doBandStuff();
            break;

        case "spotify-this-song":
            if (process.argv[3]) {
                media = process.argv[3];
            }
            else if (media == ""){
                media = "The Sign";
            }
            doSongStuff();
            break;

        case "movie-this":
            if (process.argv[3]) {
                media = process.argv[3];
            }
            else if (media == "") {
                media = "Mr. Nobody";
            }
            doMovieStuff();
            break;

        // If the action does not match one of the cases, the user is alerted that the input is invalid
        default:
            console.log("Not a valid unput");
    }
}

// Do band stuff
function doBandStuff(){

    // This puts the correct delimiter in to replace spaces for multi word bands
    var parsedBand = parseMedia("%20");
 
    // This creates the url query
    var queryUrl = "https://rest.bandsintown.com/artists/" + parsedBand + "/events?app_id=codingbootcamp&date=upcoming";

    // This runs a request to the BandsInTown API with the band specified
    request(queryUrl, function(error, response, body) {

        // If the request is successful (i.e. if the response status code is 200)
        // Else an error is logged
        if (!error && response.statusCode === 200) {

            // This parses the body and logs the venue, location, and date for each concert
            var location = "";
            var date = "";
            var formatedDate = "";
            var bodyLength = JSON.parse(body).length;

            for (var i = 0; i < bodyLength; i++){
                console.log("Venue: " + JSON.parse(body)[i].venue.name);
                location = JSON.parse(body)[i].venue.city + ", " + JSON.parse(body)[i].venue.region;
                console.log("Location: " + location);
                date = JSON.parse(body)[i].datetime.slice(0,10);
                formatedDate = moment(date).format("MM/DD/YYYY");
                console.log("Date: " + formatedDate);
                console.log();
            }
        }
        else {
            console.log("error: " + response.statusCode);
        }
    })
}


// Do song stuff
function doSongStuff(){

    // This runs a request to the Spotify API with the song specified
    spotify.search({ type: 'track', query: media, limit: 2}, function(err, data) {

        // If the request is unsuccessful, an error is logged
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        // Else this parses the data and logs the artist, song, preview link, and album
        else {
            console.log(data.tracks.items[0].album.artists[0].name);
            console.log(data.tracks.items[0].name);
            console.log(data.tracks.items[0].preview_url);
            console.log(data.tracks.items[0].album.name);
        }
    })
}


// Do movie stuff
function doMovieStuff(){

     // This puts the correct delimiter in to replace spaces for multi word bands
    var parsedMovie = parseMedia("+");

    // This creates the url query
    var queryUrl = "http://www.omdbapi.com/?t=" + parsedMovie + "&y=&plot=short&apikey=trilogy";

    // This runa a request to the OMDB API with the movie specified
    request(queryUrl, function(error, response, body) {

        // If the request is successful (i.e. if the response status code is 200)
        // Else an error is logged
        if (!error && response.statusCode === 200) {

            // Ths parses the body and logs the title, year, IMDB rating, rotten tomatoes rating, 
            // country, language, plot, and actors
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Year: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).Ratings[0].Value);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
            console.log("Country: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
        }
        else {
            console.log("error " + response.statusCode);
        }
    })
}

// parseMedia puts the correct delimiter in the media string for bands and movies
function parseMedia(del) {
    var mediaArray = media.split(" ");
    var parsedMedia = "";

    for (var i = 0; i < mediaArray.length-1; i++){
    parsedMedia = parsedMedia + mediaArray[i] + del;
    }
    parsedMedia = parsedMedia + mediaArray[mediaArray.length-1];
    return parsedMedia;
}