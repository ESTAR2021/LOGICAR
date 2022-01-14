<?php
ini_set("error_reporting",0);
session_start();
$_SESSION['viaggio_iniziato']=$identificativo;
session_write_close();
?>