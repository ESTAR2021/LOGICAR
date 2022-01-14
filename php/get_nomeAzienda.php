<?php

ini_set("error_reporting",0);
//mi connetto al db
include 'require_conn.php';
session_start();

//recupero i dati in sessione
if (!isset($_SESSION['asl'])){
	echo "error";}
else{
	$asl=$_SESSION['asl'];


try {
	$conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
	$statement = $conn->prepare("SELECT id,azienda FROM aziende WHERE id='$asl'");
	$statement->execute();

	$row=$statement->fetch();
	echo json_encode($row);
}
catch (Exception $e){
	return $e->getMessage(); //return exception
}}
?>
