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
    ctx.moveTo(0,100);
    ctx.lineTo(800,100);
    ctx.stroke();
    
    //Gets the number of entrys out of the database
    var entrys = 10;
    
    //Creates the various timeline entrys
    for(i = 0; i < entrys; i++)
    {
        var spacing = (800 / entrys) * i;
        
        ctx.beginPath();
        ctx.moveTo(spacing,10);
        ctx.lineTo(spacing,100);
        ctx.stroke();
        
        var Entryspacing = (800 / entrys) - 40;
        
        $("#timelineEntrys").append('<div class="timelineEntrys">test</div>');
        $("#timelineEntrys").add('.timelineEntrys')
                            .css('margin-right', Entryspacing);
    }
}