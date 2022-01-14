<?php

session_start();
ini_set("error_reporting",0);

if(isset ($_SESSION['vhr'])){
	 echo $_SESSION['vhr'];
}

?>