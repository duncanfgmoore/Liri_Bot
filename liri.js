require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");
var request = require("request");
var fs = require ("fs");

var spotify = new Spotify(keys.spotify);
var twitter = new Twitter(keys.twitter);

var choices = process.argv.splice(3).join("+");



/* Section for my-tweets */
function seeTweets() {
    var params = { screen_name: 'Coding Guy 26' };
    twitter.get("statuses/user_timeline", params, function (error, tweets, response) {

        for (var i = 0; i < tweets.length; i++) {

            console.log(tweets[i].created_at);
            console.log(tweets[i].text)
            console.log("========================")
        }
    })
}

/* Section for spotify-this-song */
function seeSongs() {

   

    
    //var songName = process.argv[3];

    spotify.search({ type: 'track', query: choices }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        
        } else {
            
        console.log("Artist: " + data.tracks.items[0].artists[0].name);
        console.log("Title: " + data.tracks.items[0].name);
        console.log("Preview URL: " + data.tracks.items[0].preview_url);
        console.log("Album: " + data.tracks.items[0].album.name);

        
            fs.appendFile("log.txt", "\n" + "\n" + "Artist: " + data.tracks.items[0].artists[0].name, function(err){
                if(err) {
                    return console.log(err);
                }
            })

            fs.appendFile("log.txt","\n" + "Title: " + data.tracks.items[0].name, function(err){
                if(err) {
                    return console.log(err);
                }
            })

            fs.appendFile("log.txt", "\n" + "Preview URL: " + data.tracks.items[0].preview_url, function(err){
                if(err) {
                    return console.log(err);
                }
            })

            fs.appendFile("log.txt", "\n" + "Album: " + data.tracks.items[0].album.name, function(err){
                if(err) {
                    return console.log(err);
                }
            })


        }
    });

}

/* Section for movie-this */
function movies() {
    if (!choices) {
        choices = "Mr.Nobody";
    }


    //var movieName = process.argv[3];
    var queryUrl = "http://www.omdbapi.com/?t=" + choices + "&y=&plot=short&apikey=trilogy"

   

    request(queryUrl, function (error, response, body) {

        if (!error && response.statusCode === 200) {


            console.log("Title: " + JSON.parse(body).Title);

            console.log("Release Year: " + JSON.parse(body).Year);

            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);

            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);

            console.log("Produced In: " + JSON.parse(body).Country);

            console.log("Language: " + JSON.parse(body).Language);

            console.log("Plot: " + JSON.parse(body).Plot);

            console.log("List of Actors: " + JSON.parse(body).Actors);


            fs.appendFile("log.txt", "\n" + "\n" + "Title: " + JSON.parse(body).Title, function(err){
                if(err) {
                    return console.log(err);
                }
            })

            fs.appendFile("log.txt","\n" + "Release Year: " + JSON.parse(body).Year, function(err){
                if(err) {
                    return console.log(err);
                }
            })

            fs.appendFile("log.txt", "\n" + "IMDB Rating: " + JSON.parse(body).imdbRating, function(err){
                if(err) {
                    return console.log(err);
                }
            })

            fs.appendFile("log.txt", "\n" + "Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value, function(err){
                if(err) {
                    return console.log(err);
                }
            })

        } 
        
        

    });

}


/* Section for do-what-it-says */
function doWhatItSays() {

}

switch (process.argv[2]) {
    case "my-tweets":
        seeTweets();
        break;
    case "spotify-this-song":
        seeSongs();
        break;
    case "movie-this":
        movies();
        break;
    case "do-what-it-says":
        doWhatItSays();
        break;
}