var sp = getSpotifyApi(1);
var models = sp.require('sp://import/scripts/api/models');
var m = sp.require('sp://import/scripts/api/models');
var player = models.player;
var v = sp.require("sp://import/scripts/api/views");
var xmlData; // Global var to hold Data
var trackInfo = []; //Global var to keep track info until it's displayed

$(document).ready(Constructor);

function Constructor(){

        console.log('Started: loading app.');
	ShowTrackData();
        getPlaylistXML(Get_User_ID());
        createTimeline();

        console.log('Finished: loading app.');
}

function CreatePlaylist(){
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

function ReloadPage(){
	console.log('Started: ReloadPage');
	window.location.reload();
	console.log('Reloaded');
}

function ShowTrackData(){
	console.log('Started: ShowTrackData');
	var playerTrackInfo = player.track;

    if (playerTrackInfo == null) {
        $('h2').replaceWith("<span class='error'>Er speeld niets!</span>");
    } else {
		var track = playerTrackInfo.data;
		$('h2').replaceWith("<h2> Track: "+ track.name + "<BR /> Album: " + track.album.name + " <BR />Artiest: " + track.album.artist.name + ". <BR /> URI/Locatie: " + track.uri + "</h2>");
	}
}

function Squares(){
	console.log('Started: Squares');
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

function PlayTrack(uri){
	console.log('Started: PlaySail');
	//var uri = 'spotify:track:4VUGq8KUTVv5YnMqU6nkDa';
	sp.trackPlayer.playTrackFromUri(uri, {
		onSuccess: function() { console.log("success SONG");} ,
		onFailure: function () { console.log("failure SONG");},
		onComplete: function () { console.log("complete SONG"); }
    });
	
}

function Get_User_ID(){
	
	console.log('Started: Get_User_ID');
	var ID = models.session.anonymousUserID;
        return ID;
}

function Constructor_Playlist(){
	
	console.log('Started: playlist constructor.');
	RemoveTracks();
	AddTracks();
	console.log('Finished: playlist constructor.');
}

function GetPlaylist(){
	
	console.log('Started: GetPlaylist');
	var Playlist = new m.Playlist.fromURI('http://open.spotify.com/user/1117535795/playlist/59nkn5pKC1SMtRr5mG2JPm');
	return Playlist
}

function RemoveTracks(){
	console.log('Started: RemoveTracks');
	var Playlist = GetPlaylist();
	var Tracks = Playlist.tracks;
	var TracksAmount = Tracks.length;

	for (i=0;i<TracksAmount;i++){
		var TrackURI = Tracks[i].data.uri;
		Playlist.remove(TrackURI);
	}	
}

function GetNewTracks(){
	
	console.log('Started: GetNewTracks');
	var NewTracks = new Array();
        $(xmlData).find("track_uri").each(function(){
            NewTracks.push($(this).text());
        });
	return NewTracks;
}

function AddTracks(){
	
	console.log('Started: AddTracks');
	
	var NewTracks = GetNewTracks();
	var Playlist = GetPlaylist();
	var i = 0;
	
	while (i<TracksAmount()){
		var TrackURI = NewTracks[i];
		Playlist.add('spotify:track:' + TrackURI);
		i++;
	}
}

function getPlaylistXML(user_id,refresh){
    console.log("Started: processPlaylistXML");
    var base_url="http://student.cmi.hro.nl/0851729/prj3/ultify/ultify.php";

    if (refresh == 1 || xmlData == undefined)
    {
        $.get
        (
            base_url,
            {u:user_id},
            processPlaylistXML,
            "xml"
        );
    } 
    else 
    {
        processPlaylistXML(xmlData);
    }
}

function processPlaylistXML(xml){
    xmlData = xml;
    createTimeline();
}

function createTimeline()
{
    console.log('Started: createTimeline');
    var timeline = document.getElementById("timeline");
    var ctx = timeline.getContext("2d");
    
    ctx.beginPath();
    ctx.moveTo(0,100);
    ctx.lineTo(800,100);
    ctx.stroke();
    TrackData();
}
    
function createEntries()
{
    var entrys = TracksAmount();
    var entryMax = 5;
    var timeline = document.getElementById("timeline");
    var ctx = timeline.getContext("2d");
    var i = 0;

    console.log("Started: createEntries");
    while (i < 5)
    {
            
            var spacing = (800 / entryMax) * i;
            var Entryspacing = (800 / entryMax) - 250;

            ctx.beginPath();
            ctx.moveTo(spacing,10);
            ctx.lineTo(spacing,100);
            ctx.stroke();

            $("#timelineEntrys").append
            (
                '<div id="' + i + '"class="timelineEntry"><p>'
                +  trackInfo[i][0] + 
                '</p><p>'
                +  trackInfo[i][1] +
                '</p></div>'
            );

            $("#timelineEntrys").add('.timelineEntry')
                                .css('margin-right', Entryspacing);
            
            i++;
    }

    DivEvent();
}

function TrackData(){

    if (trackInfo.length>0){
        trackInfo = [];
    }
    var TrackData = new Array();

    $(xmlData).find("track").each(function(){
        var track_uri = $(this).find("track_uri").text();

        m.Track.fromURI("spotify:track:"+track_uri,function(track){
            CheckData(track.name,track.album.artist.name,track.uri);
        });
    })
}

function CheckData(track,artist,uri){

    var temp = [track,artist,uri];
    trackInfo.push(temp);

    if (trackInfo.length == TracksAmount()){
        createEntries();
    } 
}

function TracksAmount(){
    console.log("Started: TracksAmount");
    var i = 0
    $(xmlData).find("track").each(function(){
        i++;
    })
    return i;
}

function DivEvent(){
    $(".timelineEntry").on('click',function(){
            PlayTrack(trackInfo[this.id][2]);
            });
}

function HelpMe(){

    console.log("Started: HelpMe");

    var item = document.getElementById("foo");
    if(item.style.visibility == 'visible') {
        item.style.visibility = 'hidden';
    } else {
        item.style.visibility = 'visible';
    }

}

function PlayPlaylist(){

console.log("Started: PlayPlaylist");

var uri = 'http://open.spotify.com/user/1117535795/playlist/59nkn5pKC1SMtRr5mG2JPm';

models.player.play(uri);

}
