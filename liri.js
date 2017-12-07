//GLOBAL VARIABLES
//--------------------------------------------------------//
var requestType = process.argv[2];
var thing = process.argv[3];
var thingTitle = process.argv.slice(3);
var randomType = ['my-tweets', 'spotify-this-song', 'movie-this'];

// var twitterKeys = require('./keys.js');

var Twitter = require('twitter');
var spotify = require('node-spotify-api');
var request = require('request');

var spotify = new spotify({
		id: 'bf069d052e724512a043c4ab3da94b27',
		secret: '495d0b3e02f94ef39295f7b0f6894fb9',
	});

//REQUESTS
//--------------------------------------------------------//
if (requestType == 'my-tweets') {
	findTweets();
}

if (requestType == 'spotify-this-song') {
	spotifyThis();
}

if (requestType == 'movie-this') {
	movieThis();
}

if (requestType == 'do-what-it-says') {
	var pickOne = Math.floor(Math.random() * (2 - 0 +1));
	var randomRequest = randomType[pickOne];
	
	if (randomRequest == 'my-tweets') {
		findTweets();
	} else if (randomRequest == 'spotify-this-song') {
		spotifyThis();
	} else if (randomRequest == 'movie-this') {
		movieThis();
	}
}

//FUNCTION
//--------------------------------------------------------//
function findTweets() {
	var client = new Twitter({
		consumer_key: '3fFY2k8QOLT22OEK8MjnNL3qe',
  		consumer_secret: 'tq5zIUiXidazeWvRKMe9cJaNOCxOVDJEFvbyVSfibrtxUnCOWk',
  		access_token_key: '938192892488814592-yQD0iKcvWlaD0tXy6LJHSlVuAWwJXAa',
  		access_token_secret: '0I47sDdgB4ZhZW0Z4ZzNrl7gEvU1VDzs3Syr6j05eC62C',
	});	

	var params = {screen_name: thing};

	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (!error) {

	  	for (var i = 0; i < tweets.length; i++) {	  	
	  		console.log("Tweet" + [i+1] + ": " + tweets[i].text + "\n");
	  	}
	  }
	});
};

function spotifyThis() {

	if (thingTitle.length == 0) {
		thingTitle = "I want it that way";
	}

	spotify.search({ type: 'track', query: thingTitle }, function(err, data) {
  		if (err) {
    		return console.log('Error occurred: ' + err);
  		}
		console.log("Artist: " + JSON.stringify(data.tracks.items[0].album.artists[0].name, null, 2));
		console.log("Song: " + JSON.stringify(data.tracks.items[0].name, null, 2));
		console.log("Preview: " + JSON.stringify(data.tracks.items[0].preview_url, null, 2));
		console.log("Album: " + JSON.stringify(data.tracks.items[0].album.name, null, 2)); 
	});
};

function movieThis() {


	if (thingTitle.length == 0) {
		thingTitle = "The Lion King";
	}

	var queryUrl = "http://www.omdbapi.com/?t=" + thingTitle + "&y=&plot=short&apikey=trilogy";

	request(queryUrl, function(error, response, body) {
	  if (!error && response.statusCode === 200) {
	    console.log("Title: " + JSON.parse(body).Title);
	    console.log("Release Year: " + JSON.parse(body).Year);
		console.log("IMDB Rating: " + JSON.parse(body).Ratings[0].Value);
		console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
		console.log("Production Country: " + JSON.parse(body).Country);
		console.log("Language: " + JSON.parse(body).Language);
		console.log("Plot: " + JSON.parse(body).Plot);
		console.log("Cast: " + JSON.parse(body).Actors);
	  }
	});
};

