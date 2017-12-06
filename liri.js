var requestType = process.argv[2]


if (requestType == 'my-tweets') {

	var Twitter = require('twitter');

	var client = new Twitter({
	  consumer_key: '3fFY2k8QOLT22OEK8MjnNL3qe',
	  consumer_secret: 'tq5zIUiXidazeWvRKMe9cJaNOCxOVDJEFvbyVSfibrtxUnCOW',
	  access_token_key: '938192892488814592-yQD0iKcvWlaD0tXy6LJHSlVuAWwJXAa',
	  access_token_secret: '0I47sDdgB4ZhZW0Z4ZzNrl7gEvU1VDzs3Syr6j05eC62C'
	});

	console.log(client);

	// client.get(path, params, callback);

	// client.get('search/tweets', {q: 'node.js'}, function(error, tweets, response) {
	//    console.log(tweets);
	// });
}

if (requestType == 'spotify-this-song') {

	var spotify = require('node-spotify-api');

	var spotify = new spotify({
	  id: 'bf069d052e724512a043c4ab3da94b27',
	  secret: '495d0b3e02f94ef39295f7b0f6894fb9',
	});


	spotify.search({ type: 'track', query: 'lorde' }, function(err, data) {
  		if (err) {
    		return console.log('Error occurred: ' + err);
  		}
		console.log(JSON.stringify(data, null, 2)); 
	});
}

if (requestType == 'movie-this') {

	var request = require('request');

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
		console.log("IMDB Rating: " + JSON.parse(body).Ratings[0]);
		console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1]]);
		console.log("Production Country: " + JSON.parse(body).Country);
		console.log("Language: " + JSON.parse(body).Language);
		console.log("Plot: " + JSON.parse(body).Plot);
		console.log("Cast: " + JSON.parse(body).Actors);
	  }
	});
}



