<?php
	header('Content-type: application/xml');
	$xml = "<?xml version=\"1.0\" ?>\n
			<!DOCTYPE rss>\n";
        //Outputs the RSS file for the site.
        $src = $_SERVER['DOCUMENT_ROOT'] . "/archive/metadata.json";
    	$json = json_decode(file_get_contents($src), true);
    	$num = $json["articles"];
    	if ($num != null and $num > 0) {
	        $xml .= "<rss version=\"2.0\" xmlns:atom=\"http://www.w3.org/2005/Atom\" >\n
	        		<channel>\n
	        		<atom:link href=\"http://brianschrader.com/rss.php\" rel=\"self\" type=\"application/rss+xml\" />";
			$xml .= "<title>BiteofanApple by Brian Schrader</title> \n
				  	 <link>http://brianschrader.com</link>\n
				  	 <description>A blog by Brian Schrader.</description>\n
				     <language>en-us</language>\n";
			for($i = $num-1; $i >= 0; $i--) {
			  //$articleJson = file_get_contents($json['link'.$i]."metadata.json");
			  //$artJs = json_decode($articleJson);
			  //$content = substr(strip_tags($articleJson['content']), 0, 20);
			  $xml .= "\t<item>\n
			 	<title>".$json['title'.$i]."</title>\n
			    <link>".$json['link'.$i]."</link>\n
			  	"./*<pubDate>".$json['published'.$i]."</pubDate>*/ ""."\n
			  	<description>"./*$content."..."*/ ""."</description>\n
			  	<guid>".$json['link'.$i].$json['published']."</guid>\n
			  	</item>\n";
			 }
        $xml .= "</channel>\n";
		}
		$xml .= "</rss>"; 
		echo $xml
 ?>