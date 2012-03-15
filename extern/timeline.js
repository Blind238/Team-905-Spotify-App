$(document).ready(Constructor);

function Constructor()
{
    Timeline();
}

function Timeline()
{
    console.log('Started: Timeline');
    
    var timeline = document.getElementById("timeline");
    var ctx = timeline.getContext("2d");
    
    //Creates the basic timeline
    ctx.beginPath();
    ctx.moveTo(30,100);
    ctx.lineTo(900,100);
    ctx.stroke();
    
    //Gets the number of entrys out of the database
    var entrys = 4;
    
    //Creates the various timeline entrys
    for(i = 0; i < entrys; i++)
    {
        var spacing = i * 50;
        
        ctx.beginPath();
        ctx.moveTo(spacing,10);
        ctx.lineTo(spacing,100);
        ctx.stroke();
    }
}