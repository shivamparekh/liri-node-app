// Request node packages

var twitter = require('twitter');

var spotify = require('spotify');

var request = require('request');

// Importing Twitter API keys

var twitterKeys = require('./keys.js');

// fs library

var fs = require('fs');

// liri starts
// process.argv[2] is the command
// process.argv[3] is the user search term

var command = process.argv[2];

var action = process.argv[3];

liri (process.argv[2], process.argv[3]);

function liri(command, action){

	switch(command){

		case 'my-tweets': 
		useTwitter(action); 
		break;

		case 'spotify-this-song': 
		useSpotify(action); 
		break;

		case 'movie-this': 
		useOMDB(action); 
		break;

		case 'do-what-it-says': 
		doWhatISay(); 
		break;
	}
}

// Twitter

function useTwitter(){

	var twitterUser = new twitter({

	  consumer_key: twitterKeys.twitterKeys.consumer_key,
	  consumer_secret: twitterKeys.twitterKeys.consumer_secret,
	  access_token_key: twitterKeys.twitterKeys.access_token_key,
	  access_token_secret: twitterKeys.twitterKeys.access_token_secret

	});

 

	twitterUser.get('statuses/user_timeline', {screen_name: 'shevum', count: 20}, function(error, tweets, response){
	
		if (error) return console.log(error);

  		for (var i = 0; i < tweets.length; i++) {

  			console.log('\n------------------------------\n')

			console.log('Username: ' + tweets[i].user.screen_name);

	      	console.log('Tweet: ' + tweets[i].text);

	      	console.log('Date: ' + tweets[i].created_at);

	  	}

	});
}

// Spotify

function useSpotify(song){
	 
	spotify.search({type: 'track', query: song}, function(err, data) {

		console.log('\n----------Spotify Search:----------\n')

		console.log('Artist: ' + data.tracks.items[0].artists[0].name);

		console.log('Song: ' + data.tracks.items[0].name);

		console.log('Preview Link' + data.tracks.items[0].preview_url);

		console.log('Album: ' + data.tracks.items[0].album.name);

		console.log('\n-------------------------------\n');

	});
};

// OMDB


