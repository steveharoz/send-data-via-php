<?php

$study = rtrim($_GET['study']);
$subjectID = rtrim($_GET['subjectID']);
$date = rtrim($_GET['date']);
$accuracy = rtrim($_GET['accuracy']);
$data = file_get_contents('php://input');

// sterilize  directory
if (strpos($study, '..') !== false) {
    die("Bad location");
}

// set and optionally make directory
$dir = "../data/";
if (!file_exists($dir)) {
    echo "making directory: " . $dir. "\n";
	mkdir($dir);
}
$dir = $dir . $study;
if (!file_exists($dir)) {
    echo "making directory: " . $dir. "\n";
	mkdir($dir);
}

// save the data
$fh = fopen($dir . "/" . $subjectID . " acc_" . $accuracy . " date_" . $date . ".json", 'w') or die("Error opening file!");
fwrite($fh, $data);
fclose($fh);

// The javascript checks for this string
echo "Yay Success!";
?>
