$(document).ready(Constructor);

function Constructor()
{
    AddToTimeline();
    PlayTimeline();
    SubButton();
    
    
}

function AddToTimeline()
{
        $("#AddToTimeline").click(function()
        {
            console.log('Started: AddToTimeline');
            $("#canvas").hide();
            $("#timeline").hide();
            $("#timelineEntrys").hide();
            $("form").show();
        });
}

function SubButton()
{
    $("#SubButton").click(function()
    {
        console.log('Started: SubButton');
        var track = player.track;
        var full_t_uri = track.uri;
        // The track uri is given in the form:"spotify:track:2r97a73n56d0m.."
        // We need to split it up and select the important part
        var t_uri_array = full_t_uri.split(":");
        var t_uri = t_uri_array[2];
        var textcomment = $("textarea").val();
        var userid = Get_User_ID();
        var base_url = "http://student.cmi.hro.nl/0851729/prj3/ultify/ultify.php?u=";
        var get_url = base_url+userid;
        $.post(
        get_url,
        {track:t_uri,comment:textcomment,submit:"submit"},
        // TODO: When we have a function to refresh timeline,
        // change this function
        function(data)
        {
            console.log(data);
        },
        "xml");
        $("#canvas").show();
        $("#timeline").show();
        $("#timelineEntrys").show();
        $("form").hide();
    });
}

function PlayTimeline()
{
    $("#PlayTimeline").click(function()
        {
             console.log('Started: PlayTimeline');
             Constructor_Playlist()
        });
}

