
var inquirer = require("inquirer");
var fs = require("fs");

// ==============================================================================
inquirer.prompt([
{
	type: "list",
	name: "choice",
	message: "Please choose from one of these",
	choices: ["Twitter", "Spotify", "Movies", "Random"]//this can be anything
}
]).then(function(user){
	console.log(user.choice);
	if(user.choice == "Twitter"){
		myTweets();
	} else if (user.choice == "Spotify") {
		doSpotify();
	} else if (user.choice == "Movies"){
		movieThis();
	}
})


// =============================================================================

function myTweets(){
	console.log("hi");
	var Key = require("./keys.js");
	var twitter = require("twitter");
	var params = {screen_name: "Nick"}
	var client = new Twitter(Key.twitterKeys)
	client.get('statuses/user_timeline', params, function(error, tweets, response){
	if(error){
		console.log(error);
	}	
		// console.log(tweets);
	tweets.forEach(function(tweet){
		console.log(tweet.created_at+": "+tweet.text+"\n");
	})

	});

}


// ==========================================



function doSpotify() {
	var SpotifyWebApi = require("spotify-web-api-node");
	var spotify = new SpotifyWebApi();
	inquirer.prompt([
{
	type: "text",
	name: "song",
	message: "What song would you like to search for?"
}
]).then(function(user){
	console.log("Song", user.song);
	spotify.searchTracks(user.song, {limit: 5}).then(function(data){
		
	var results = data.body.tracks.items;
	console.log("Data", results);
	});
	
});
}


// ==========================================

function movieThis(){
	var request = require("request");
	inquirer.prompt([
	{
		name: "movie",
		message: "Please enter a movie",
		type: "input",

	}]).then(function(user){
		console.log(user.choice);
	});
}

// ==========================================

inquirer.prompt([
{
	name: "movie",
	message: "Please enter a movie",
	type: "input"
}]).then(function(user){
	var queryURL = "http://www.omdbapi.com/?t=" + user.movie + "&y+&plot=short&r=json&tomatoes=true";
	request(queryURL, function(error,data,body){
		var body = JSON.parse(body);
		console.log("Title:", body.Title);
		console.log("Released:", body.Released);
		console.log("Plot:", body.Plot);
		console.log("Country:",body.Country);
		console.log("Actors:",body.Actors);
		console.log("Tomato URL:",body.tomatoURL);
	})
})
