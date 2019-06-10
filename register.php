<?php

	$data = $_POST['personType'];
	if($data == "staff") {
		$filename= "G:\IMI-PROJECTS\i2p_Nadine_Robot\development\Register_staff.txt";
	} else {
		$filename= "G:\IMI-PROJECTS\i2p_Nadine_Robot\development\Register_visitor.txt";
	}

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