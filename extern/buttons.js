$(document).ready(Constructor);

function Constructor()
{
    addToTimeline();
    playTimeline();
    subButton();
}

function AddToTimeline()
{
        $("#AddToTimeline").click(function()
        {
            console.log('Started: AddToTimeline');
            $("#canvas").hide();
            $("form").show();
        });
}

function SubButton()
{
    $("#SubButton").click(function()
    {
        console.log('Started: SubButton');
        $("#canvas").show();
        $("form").hide();
    });
}

function PlayTimeline()
{
    console.log('Started: PlayTimeline');
}