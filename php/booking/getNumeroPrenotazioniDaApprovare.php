<?php
ini_set("error_reporting",0);
//mi connetto al db
include '../require_conn.php';
session_start();
if(isset($_SESSION['asl'])){
	$asl=$_SESSION['asl'];
}else{
	echo 0;
	exit();
}

$rows=array();
//leggo i valori

		   try { 
		   $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
           $statement = $conn->prepare("select count(*) AS n from pren_prenotazioni, viaggi_pianificati where pren_prenotazioni.id=viaggi_pianificati.idprenotazione and pren_prenotazioni.azienda='$asl' and giorno_partenza>=curdate() and stato=0");
		
		   $statement->execute();
		   if($row=$statement->fetch()){
			 echo ceil($row['n']/5);
		   }

		}
			catch (Exception $e){
               return $e->getMessage(); //return exception
        }   
		   ?>
