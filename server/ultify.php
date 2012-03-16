<?php
header("Content-Type: text/xml");
// This file retrieves information from the database and outputs an XML file
//Accepted input values (GET) are uniqueuserid(u)
//Accepted input values (POST) are uniqueuserid(u), track(tr), comment(c), time(t)
//Mandatory: uniqueuserid, else script will not output anything.

//include database configuration
include("config.php");
$db = mysqli_connect($db_host, $db_user, $db_password, $db_database);

if (isset($_GET['u']))
{
    $userid = $_GET['u'];
    if (strlen($userid)==40)
    {
        //workaround for error on school server
        //it seems the school server sees <? as shorthand for <?php 
        //.... tsk tsk
        echo '<?xml version="1.0" encoding ="utf-8" ?>';
        ?>
        <playlist>
            <?php
            //query all info from user_id 
            $q_pl = "SELECT * from ultify WHERE user_id='$userid'";
            $r_pl = mysqli_query($db, $q_pl) or die (' FUCKERDEFUCK');
            //while there is an entry, show tracks per user
            echo "<user_id>".$_GET['u']."</user_id>";
            while ($tr = mysqli_fetch_assoc($r_pl))
            {?>
                <track>
                    <track_uri><?php echo $tr['track_uri']; ?></track_uri>
                    <comment><?php echo $tr['comment']; ?></comment>
                    <timestamp><?php echo $tr['time']; ?></timestamp>
                </track>
                <?php
                //end track loop
            }?>
        </playlist>
<?php
    }
}?>