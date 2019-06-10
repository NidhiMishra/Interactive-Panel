<?php
	require_once('db.php');

	$id = $_POST['id'];
	
	$sql = "SELECT * FROM staff WHERE id=$id";
    $result = $conn->query($sql);

    echo json_encode($result->fetch_assoc());
?>