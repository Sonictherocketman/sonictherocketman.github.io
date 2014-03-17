<?php
	//Outputs the RSS file for the site.
	$dir = "archive/"
	$data = array();
	echo "<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\n\t<rss version=\"2.0\">\n<channel>";
	while($dirs = glob($dir . '/*', GLOB_ONLYDIR)) {
		$dir."/metadata.json";	
		$json = json_decode(file_get_contents($dir));
		echo "<item>\n
		<title>".$json['title']."</title>\n
		<link>".$json['link']."</link>\n
		<description>".substr($json['content'], 0, 30)."...<\description>\n
		</item>";
   	}
   	echo "</rss>";
}
?>