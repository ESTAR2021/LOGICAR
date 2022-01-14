<?php
ini_set("error_reporting",0);
//mi connetto al db

session_destroy();
session_start();
$_SESSION=Array();
session_write_close();		
		   ?>
