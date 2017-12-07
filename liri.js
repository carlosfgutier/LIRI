var requestType = process.argv[2];
var thing = process.argv[3];
var randomType = ['my-tweets', 'spotify-this-song', 'movie-this']

var twitterKeys = require('./keys.js');
var spotifyKeys = require('./keys.js')

var Twitter = require('twitter');
var spotify = require('node-spotify-api');
var request = require('request');

if (requestType == 'my-tweets') {

	var client = new Twitter({
	  consumer_key: 'twitterKeys.consumer_key',
	  consumer_secret: 'twitterKeys.consumer_secret',
	  access_token_key: 'twitterKeys.access_token_key',
	  access_token_secret: 'twitterKeys.access_token_secret',
	});	

	var params = {screen_name: 'cccarfer'};

	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	 console.log(error)
	  if (!error) {
	    console.log(tweets);
	  }
	});
}

if (requestType == 'spotify-this-song') {

	var spotify = new spotify({
	  id: 'bf069d052e724512a043c4ab3da94b27',
	  secret: '495d0b3e02f94ef39295f7b0f6894fb9',
	});

	spotify.search({ type: 'track', query: thing }, function(err, data) {
  		if (err) {
    		return console.log('Error occurred: ' + err);
  		}

  		debugger;
		console.log("Artist: " + JSON.stringify(data.tracks.items[0].album.artists[0].name, null, 2));
		console.log("Song: " + JSON.stringify(data.tracks.items[0].name, null, 2));
		console.log("Preview: " + JSON.stringify(data.tracks.items[0].preview_url, null, 2));
		console.log("Album: " + JSON.stringify(data.tracks.items[0].album.name, null, 2)); 
	});
}

if (requestType == 'movie-this') {

	var nodeArgs = process.argv;
	var movieName = "";

	for (var i = 3; i < nodeArgs.length; i++) {
	  if (i > 3 && i < nodeArgs.length) {
	    movieName = movieName + "+" + nodeArgs[i];
	  } 
	  else {
	    movieName += nodeArgs[i];
	  }
	}

	var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

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
}

if (requestType == 'do-what-it-says') {

	var pickOne = Math.floor(Math.random() * requestType.length);
}



