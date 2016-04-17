<!DOCTYPE html>
<html>
<head>
	<title>Radio - BiteofanApple</title>
	<meta http-equiv="content-type" content="text/html; charset=UTF-8">
	<link rel="stylesheet" type="text/css" href="/bin/CSS/stylesheet.css">
	<link rel="stylesheet" type="text/css" href="/bin/CSS/mobile.css">
  <link rel="icon" type="image/png" href="//www.gravatar.com/avatar/11b074a636e00292c98e3e60f7e16595?size=30">

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
			<span class="menuBarItem" style="margin-left: 40px;"><a href="/archive/">Archive</a></span>
			<span class="menuBarItem"><a href="/about/">About</a></span>
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
				<span class="" style="font-size:2em;"><a href="/">BiteofanApple</a></span>
			</div>
			<!-- Links -->
			<div style="margin-top:2%;">
				<span class="mobileMenuBarItem" style=""><a href="/archive/">Archive</a></span>
				<span class="mobileMenuBarItem"><a href="/about/">About</a></span>
				<span class="mobileMenuBarItem"><a href="https://github.com/Sonictherocketman">Code</a></span>
			  <span class="mobileMenuBarItem"><a href="http://sonicrocketman.snippets.xyz">Microblog</a></span>
			</div>
		</div>
	</div>
	<div id="post-list">
		<article>
			<div class="post">
				<div class="article-title">
					<h1><a href="/radio/">Radio</a></h1>
				</div>
				<div class="article-content">
					<?php
function onAirTest()
{
   return strstr(get_headers("http://brianschrader.com:8000/radio")[0], "200 OK");
}
function getStatus() {
    if (onAirTest() == true) {
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
		<div style="text-align:center;">
			<div class="article-content">
				<span style="font-size:small;">
					<a rel="license" href="http://creativecommons.org/licenses/by/4.0/">
						<img alt="Creative Commons License" style="border-width:0" src="/images/misc/cc-license.png" />
					</a>
			</div>
		</div>
	</div>
</div>
</body>
</html>
