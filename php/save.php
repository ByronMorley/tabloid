<?php

function clearFile($fName)
{

	$myfile = fopen($fName, "w") or die("Unable to open file!");
	fclose($myfile);
}

function logToFile($txt)
{

	$myfile = fopen("download.php", "w") or die("Unable to open file!");
	$txt = $txt . "\n";
	fwrite($myfile, $txt);
	fclose($myfile);
}

if (isset($_POST["content"])) {
	logToFile($_POST["content"]);
}
