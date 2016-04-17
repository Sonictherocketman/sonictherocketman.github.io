title: Radio
status: draft

<?php
function onAirTest($ipaddress, $port)
{
   if ($ret = @fsockopen($ipaddress, $port, $errno, $errstr, 1))
   {
      fclose($ret);
      return true;
   }

   else
   {
      return false;
   }
}
function getStatus() {
    if (onAirTest()) {
        return "LIVE";
    } else {
        return "Off Air";
    }
}
>




<center>
Status: <?php echo(getStatus()); >

<audio controls autoplay
    src="http://brianschrader.com:8000/radio"></audio>
</center>
