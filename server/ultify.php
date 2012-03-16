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
    $user_id = $_GET['u'];
    if (strlen($user_id)==40)
    {
        if (isset($_POST['submit']))
        {
            $ptrack_uri = $_POST['track'];
            $pcomment = $_POST['comment'];
            if (isset($_POST['time']))
            {
                $ptime = $_POST['time'];

                $qinserttrack = "INSERT into ultify(user_id,track_uri,comment,time) 
                                    VALUES('".$user_id."','".$ptrack_uri."','".$pcomment."','".$ptime."')";

            $i_tr = mysqli_query($db,$qinserttrack) or die ('INSERT WITH TIME FAILED');
            }
            else 
            {
            $qinserttrack = "INSERT into ultify(user_id,track_uri,comment) 
                                    VALUES('".$user_id."','".$ptrack_uri."','".$pcomment."')";

            $i_tr = mysqli_query($db,$qinserttrack) or die ('INSERT WITHOUT TIME FAILED');
            }
        }
        //workaround for error on school server
        //it seems the school server sees <? as shorthand for <?php 
        //.... tsk tsk
        echo '<?xml version="1.0" encoding ="utf-8" ?>';
        ?>
        <playlist>
            <?php
            //query all info from user_id 
            $q_pl = "SELECT * from ultify WHERE user_id='$user_id'";
            $r_pl = mysqli_query($db, $q_pl) or die ('QUERY PLAYLIST FAILED');
            //while there is an entry, show tracks per user
            echo "<user_id>".$user_id."</user_id>";
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