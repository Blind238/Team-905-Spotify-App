var sp = getSpotifyApi(1);
var models = sp.require('sp://import/scripts/api/models');
var m = sp.require('sp://import/scripts/api/models');
var player = models.player;
var v = sp.require("sp://import/scripts/api/views");

$(document).ready(Constructor)

function Constructor(){

    console.log('Started');
	Test();
	CurrentSongData();
	ShowTrackData();
	Squares();
}

function Get_User_ID(){
	
	var ID = models.session.anonymousUserID;
	console.log(ID);
        // Get ID, give it forward :)
	return ID;
	//1eff2170818fec623bd7b270d3ee071def69026f
	
}

function parseAgendaXML(xml)
{
    //For testing purposes only, remove when done
    console.log("parseAgendaXML called");
    $(xml).find("afspraak").each(function(){
        var result = $(this).find("dag").text();
        $("h2").append(result);
    });
}

function CreatePlaylist(){
	
	//spotify:user:1117535795:playlist:59nkn5pKC1SMtRr5mG2JPm
	var playlist = new m.Playlist.fromURI('http://open.spotify.com/user/1117535795/playlist/59nkn5pKC1SMtRr5mG2JPm');
	playlist.subscribed = true;
	console.log(playlist.name);
	var PlayList = playlist.tracks;
	console.log(PlayList.length)
	var Lengte = PlayList.length;
	
	for( i=0; i < Lengte;i++){
		console.log(PlayList[i].data.name);
	}
}

function Test(){
	
	console.log('test log');
	
}

function CurrentSongData(){
	
	var playerTrackInfo = player.track;
	var track = playerTrackInfo.data;
	console.log(track);
	
}

function CurrentPlaylist(){
	
	nummers[i] = array[i].data.uri;
	console.log("nummers: " +nummers);
	
}

function ReloadPage(){
	
	window.location.reload();
	console.log('Reloaded');
	
}

function ShowTrackData(){
	
	var playerTrackInfo = player.track;

    if (playerTrackInfo == null) {
        $('h2').replaceWith("<span class='error'>Er speeld niets!</span>");
    } else {
		var track = playerTrackInfo.data;
		$('h2').replaceWith("<h2> Track: "+ track.name + "<BR /> Album: " + track.album.name + " <BR />Artiest: " + track.album.artist.name + ". <BR /> URI/Locatie: " + track.uri + "</h2>");
	}
	
}

function Squares(){
	
	var canvas = document.getElementById("canvas");
	
	if (canvas.getContext) {
		var ctx = canvas.getContext("2d");

		//define the colour of the square
		ctx.strokeStyle = "green";
		ctx.fillStyle = "green";

		// Draw the outline of a square
		ctx.strokeRect(50,50,100,100);

		// Draw a square using the fillRect() method and fill it with the colour specified by the fillStyle attribute
		ctx.fillRect(200,50,100,100);

		// Draw a square using the rect() method
		ctx.rect(350,50,100,100);
		ctx.stroke();
		console.log('Squared!');
		
	}
	
}

function PlaySail(uri){
	
	//var uri = '5P4s9QfWPAuGk75xan87cX';
	sp.trackPlayer.playTrackFromUri(uri, {
		onSuccess: function() { console.log("success SONG");} ,
		onFailure: function () { console.log("failure SONG");},
		onComplete: function () { console.log("complete SONG"); }
    });
	//spotify:track:5P4s9QfWPAuGk75xan87cX
	
}