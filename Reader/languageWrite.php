<?php

	$data = $_POST['language'];
	$filename= "G:\IMI-PROJECTS\i2p_Nadine_Robot\development\language.txt";

	if (file_exists($filename)){
	    $newFile= fopen($filename, 'w');
	    fwrite($newFile, $data);
	    fclose($newFile);
	} else {
	    $newFile= fopen($filename, 'w');
	    fwrite($newFile, $data);
	    fclose($newFile);

	    chmod($filename, 0777);
	}
?>