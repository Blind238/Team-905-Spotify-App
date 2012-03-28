var sp = getSpotifyApi(1);
var models = sp.require('sp://import/scripts/api/models');
var m = sp.require('sp://import/scripts/api/models');
var player = models.player;
var v = sp.require("sp://import/scripts/api/views");
var xmlData;

$(document).ready(Constructor);

function Constructor(){

        console.log('Started: loading app.');
	PlayerRefresh();
	CurrentSongData();
	ShowTrackData();
	Squares();
	Get_User_ID();
	console.log('Finished: loading app.');
        
        $("h2").ajaxError(function(event,request,settings,error){
            console.log("AJAX error:");
            console.log("event:" + event);
            console.log("request:" + request);
            console.log("settings:"+ settings);
            if (error != null)
            {
                console.log("error:" + error);
            }
            console.log("AJAX error end.");
        });
}

function PlayerRefresh(){
	player.observe(models.EVENT.CHANGE, function (e){
			// Only update the page if the track changed
			ReloadPage();
			console.log('Started: PlayerRefresh');
    });
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

function Test(){
	console.log('Started: Test');
}

function CurrentSongData(){
	console.log('Started: CurrentSongData');
	var PlayerTrackInfo = player.track;
	var Track = PlayerTrackInfo.data;
}

function CurrentPlaylist(){
	console.log('Started: CurrentPlaylist');
	nummers[i] = array[i].data.uri;
	console.log("nummers: " +nummers);
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

function PlaySail(uri){
	console.log('Started: PlaySail');
	var uri = 'spotify:track:4VUGq8KUTVv5YnMqU6nkDa';
	sp.trackPlayer.playTrackFromUri(uri, {
		onSuccess: function() { console.log("success SONG");} ,
		onFailure: function () { console.log("failure SONG");},
		onComplete: function () { console.log("complete SONG"); }
    });
	
}

function Get_User_ID(){
	
	console.log('Started: Get_User_ID');
	var ID = models.session.anonymousUserID;
	console.log(ID);
        return ID;
        console.log('Finished: Get_User_ID');
}

function Constructor_Playlist(){
	
	console.log('Started playlist constructor.');
	GetPlaylist();
	GetTracksPlaylist();
	AddPlaylist();
	RemoveTracks();
	AddTracks();
	console.log('Finished playlist constructor.');
}

function GetPlaylist(){
	
	console.log('Started: GetPlaylist');
	var Playlist = new m.Playlist.fromURI('http://open.spotify.com/user/1117535795/playlist/59nkn5pKC1SMtRr5mG2JPm');
	console.log('Got playlist: ' + Playlist.name);
	return Playlist
}

function AddPlaylist(){
	console.log('Started: AddPlaylist');
	var Playlist = new m.Playlist.fromURI('http://open.spotify.com/user/1117535795/playlist/59nkn5pKC1SMtRr5mG2JPm');
	Playlist.subscribed = true;
	console.log('Playlist added to account');
}

function GetTracksPlaylist(){
	
	console.log('Started: GetTracksPlaylist');
	var Playlist = GetPlaylist();
	var Tracks = Playlist.tracks;
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
	
	var NewTracks = ["4VUGq8KUTVv5YnMqU6nkDa","4d5QDE01i4iYVpPOfG6ho5","59OoFabb4932QQUqcY7awO"];
	return NewTracks;
	
}

function AddTracks(){
	
	console.log('Started: AddTracks');
	
	var NewTracks = GetNewTracks();
	var Playlist = GetPlaylist();
	var TracksAmount = NewTracks.length;
	var i = 0;
	
	while (i<TracksAmount){
		var TrackURI = NewTracks[i];
		Playlist.add('spotify:track:' + TrackURI);
		i++;
	}
	
	console.log('Tracks added');
	
}

function getPlaylistXML(user_id,refresh){
    // user_id is unique user and app identifier.
    // refresh is passed if a the data needs to retrieved again
    //  (after an INSERT or UPDATE)
    console.log("Started: processPlaylistXML");
    var base_url="http://student.cmi.hro.nl/0851729/prj3/ultify/ultify.php";
    console.log("url: "+base_url);
    console.log("refresh: "+refresh);
    if (refresh == 1 || xmlData == undefined)
    {
        console.log("retreiving xml because:");
        if (refresh==1)
        {
            console.log("refresh == 1.");
        }
        else if(xmlData== undefined)
        {
            console.log("xmlData == undefined.");
        }
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
        console.log("not refreshing");
    }
}

function processPlaylistXML(xml){
    var i=0
    $(xml).find("comment").each(function(){
        $("#timeline").append($(this).text()+i);
        i++;
    });
}

function Timeline(xml)
{
    console.log('Started: Timeline');
    console.log(xml);
    var timeline = document.getElementById("timeline");
    var ctx = timeline.getContext("2d");
    
    //Creates the basic timeline
    ctx.beginPath();
    ctx.moveTo(0,100);
    ctx.lineTo(800,100);
    ctx.stroke();
    
    //Gets the number of entrys out of the database
    var maxEntrys = 8;
    var entrys = TracksAmount();
    //Creates the various timeline entrys
    //for(i = 0; i < entrys; i++)
    var i=0;
    $(xml).find("track").each(function()
    {
        console.log("Timeline: each function started");
        var spacing = (800 / entrys) * i;
        
        ctx.beginPath();
        ctx.moveTo(spacing,10);
        ctx.lineTo(spacing,100);
        ctx.stroke();
        var Entryspacing = (800 / entrys) - 40;
        var trackData = TrackData($(this).find("track_uri").text());
        var trackName = trackData[0];
        var trackArtist = trackData [1];
        
        $("#timelineEntrys").append('<div class="timelineEntrys">'+
            trackName +
            $(trackArtist).each(function(){
                $.valueOf(this.data.name);
                console.log("TrackArtist: " +this.data.name);
                //return name;
            }) + '</div>');
        $("#timelineEntrys").add('.timelineEntrys')
                            .css('margin-right', Entryspacing);
        i++;
        console.log("Timeline: each function stopped");
        console.log("Timeline: each i :" + i);

    });
}


function HelpMe(){
	
	
	
}