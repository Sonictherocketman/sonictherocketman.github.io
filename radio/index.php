<!DOCTYPE html>
<html>
<head>
	<title>Radio - BiteofanApple</title>
	<meta http-equiv="content-type" content="text/html; charset=UTF-8">

 	<link rel="stylesheet" type="text/css" href="http://brianschrader.com/bin/CSS/stylesheet.css">
	<link rel="stylesheet" type="text/css" href="http://brianschrader.com/bin/CSS/mobile.css">
	<meta property="og:title" content="Radio" />
	<meta property="og:type" content="article" />
	<meta property="og:url" content="http://brianschrader.com/archive/radio/" />
  <link rel="alternate" type="application/rss+xml" title="RSS Feed" href="/rss.xml"/>
</head>
<body>
<div id="content">
	<div id="title-bar">
		<!-- Desktop Nav -->
		<span>
			<!-- Name and Author -->
			<span class="menuBarItem" style="margin-left: 10px; font-size:2em;"><a href="/">BiteofanApple</a></span>
			<!-- Links -->
			<span class="menuBarItem" style="margin-left: 30px;"><a href="/archive/">Archive</a></span>
			<span class="menuBarItem"><a href="http://brianschrader.com/about/">About</a></span>
			<span class="menuBarItem"><a href="https://github.com/Sonictherocketman">Code</a></span>
			<span class="menuBarItem"><a href="http://sonicrocketman.snippets.xyz">Microblog</a></span>
			  <span class="menuBarItem"><a href="http://photos.brianschrader.com">Photos</a></span>
			<br>
			<span class="menuBarItem" style=" position:absolute; margin-top:-80px; margin-left:10px; font-size:10pt; font-style:italic;">by <a href="/about/">Brian Schrader</a></span>
		</span>
		<!-- Mobile Nav -->
		<div class="mobile-nav">
			<!-- Name and Author -->
			<div style="text-align:center; margin-top:-20pt;">
				<span class="" style="font-size:2em;"><a href="http://brianschrader.com/">BiteofanApple</a></span>
			</div>
			<!-- Links -->
			<div style="margin-top:2%;">
				<span class="mobileMenuBarItem" style=""><a href="http://brianschrader.com/archive/">Archive</a></span>
				<span class="mobileMenuBarItem"><a href="http://brianschrader.com/about/">About</a></span>
			  <span class="mobileMenuBarItem"><a href="http://sonicrocketman.snippets.xyz">Microblog</a></span>
			</div>
		</div>
	</div>
	<div id="post-list">
		<article>
			<div class="post">
				<div class="article-title">
					<h1>Radio</h1>
				</div>
				<div class="article-content">
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
        return "Live";
    } else {
        return "Off Air";
    }
} ?>
<p><center>
Status: <?php echo(getStatus()); ?></p>
<p><audio controls autoplay
    src="http://brianschrader.com:8000/radio"></audio>
</center></p>
				</div>
			</div>
		</article>
	</div>
</div>
</body>
</html>
