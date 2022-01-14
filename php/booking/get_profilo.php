<?php

session_start();
ini_set("error_reporting",0);

if(isset ($_SESSION['amministrativo'])){
	if($_SESSION['amministrativo']==1) echo 1;
	if($_SESSION['amministrativo']==0 and $_SESSION['portineria']==0) echo 0;
	if($_SESSION['amministrativo']==0 and $_SESSION['portineria']==1) echo 2;
}

?>