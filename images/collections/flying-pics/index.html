<?php
$json_str = file_get_contents("metadata.json");
$json = json_decode($json_str, true);
$articles = $json['articles'];
?>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
<title><?php echo($json['title']) ?> - BiteofanApple</title>
<?php include($_SERVER['DOCUMENT_ROOT'] . "/bin/header-template.html"); ?>
</head>
<body>
<div id="content">
	<div id="title-bar">
		<?php include($_SERVER['DOCUMENT_ROOT'] . "/bin/title-bar-template.html"); ?>
	</div>
	<div id="post-list">
		<div class="post">
			<div class=article-title>
				<h1><?php echo($json['title']) ?></h1>
			</div>
			<div class="article-content">
				<table style="margin-right:auto; margin-left:auto;">
				<?php for($i = $articles-1; $i >= 0; $i--) { 
				$path = "http://brianschrader.com" . $json['path'.$i];
				if ($json['hi-res-path'.$i] != null) {
					$hiresPath = "http://brianschrader.com" . $json['hi-res-path'.$i];
				}
				else {
					$hiresPath = $path;
				}
				$description = $json['about'.$i];
				?>
					<tr>
						<td>&nbsp;&nbsp;</td>
						<td> 
							<?php 
							echo("<a href=".$hiresPath.">
								<img src=".$path."></a>");
							?>
							<center>
								<small><i>
									<?php
										echo($description);
									?>
								</i></small>
							</center>
						</td>
					</tr>
				<?php } ?>
				</table>
			</div>
		</div>
		<?php include ($_SERVER['DOCUMENT_ROOT'] . "/bin/footer.html");?>
	</div>
</div>
</body>
</html>