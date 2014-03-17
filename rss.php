  <?php
        //Outputs the RSS file for the site.
        $src = $_SERVER['DOCUMENT_ROOT'] . "/archive/metadata.json";
    	$json = json_decode(file_get_contents($src), true);
    	$num = $json["articles"];
    	if ($num != null and $num > 0) {
	        echo "<rss xmlns:blogChannel=\"http://brianschrader.com\" version=\"2.0\">\n<channel>\n";
			for($i = 0; $i < $num; $i++) {
			  //$articleJson = file_get_contents($json['link'.$i]."metadata.json");
			  //$artJs = json_decode($articleJson);
			  //$content = substr(strip_tags($articleJson['content']), 0, 20);
			  echo "\t<item>\n
			  <title>".$json['title'.$i]."</title>\n
			  <link>".$json['link'.$i]."</link>\n
			  <pubdate>".$json['published'.$i]."</pubdate>\n
			  <description>".$content."...</description>\n
			  <author>"./*$json['author'.$i]*/ ""."</author>\n
			  </item>\n";
			 }
        echo "</channel>\n</rss>";
		}
 ?>