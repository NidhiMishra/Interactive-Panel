<?php

	$data = $_POST['language'];
	$filename= "G:\IMI-PROJECTS\i2p_Nadine_Robot\development\language.txt";

	if (file_exists($filename)){
		if($data != 'Language') {
			$newFile= fopen($filename, 'w');
	    	fwrite($newFile, $data);
	    	fclose($newFile);
		}
	} else {
		if($data != 'Language') {
	    	$newFile= fopen($filename, 'w');
	    	fwrite($newFile, $data);
	    	fclose($newFile);
	    	chmod($filename, 0777);
	    }
	}
?>