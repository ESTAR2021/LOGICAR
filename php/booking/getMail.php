<?php
ini_set("error_reporting",0);
//mi connetto al db
include '../require_conn.php';
session_start();
if(isset($_SESSION['matricola'])){
	$utente=$_SESSION['matricola'];
}else{
	echo 0;
	exit();
}

$rows=array();
//leggo i valori
try {
	$conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
	$statement = $conn->prepare("SELECT email FROM autisti
								 WHERE matricola='$utente'  ");
						
	$statement->execute();
	if($row=$statement->fetch()){

		echo $row['email'];
	}
}
catch (Exception $e){
	return $e->getMessage(); //return exception
}
?>
