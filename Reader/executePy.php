<?php 

$pyscript = 'C:\XAMPP\htdocs\Reader\test.py';
$python = 'C:\Python27\python.exe';

$cmd = "$python $pyscript";
$command = escapeshellcmd($cmd);
$output = shell_exec($command);
echo $output;
?>
