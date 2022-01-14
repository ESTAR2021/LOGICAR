<?php
ini_set("error_reporting",0);
//mi connetto al db
include '../require_conn.php';
session_start();
if(isset($_SESSION['pianificazione'])){
	$pianificazione=$_SESSION['pianificazione'];
	$matricola=$_SESSION['matricola'];
}else{
	
	exit();
}

$rows=array();
//leggo i valori

		   try { 
		   $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
           $statement = $conn->prepare("select *, DATE_FORMAT(giorno_partenza,'%d/%m/%Y') as partenza, 
		   DATE_FORMAT(giorno_ritorno,'%d/%m/%Y') as ritorno from pren_prenotazioni JOIN pren_auto JOIN 
		   viaggi_pianificati JOIN marca JOIN auto JOIN parco LEFT JOIN modello  ON auto.id_modello=modello.id  JOIN autisti ON autisti.matricola='$matricola'
		   where pren_prenotazioni.id='$pianificazione' and pren_auto.prenotazione='$pianificazione' 
		   and parco.id=pren_auto.auto and parco.id_auto=auto.id and marca.ID=auto.id_marca and pren_prenotazioni.utente=$matricola and 
		   viaggi_pianificati.idprenotazione='$pianificazione'");

		   $statement->execute();
		   $i=0;    
		   while($row=$statement->fetch()){
			   $rows[$i]=array();
			   $rows[$i]=$row;  
			   $i++;
		   }
		   $statement = $conn->prepare("select * from pren_tappeintermedie where prenotazione='$pianificazione'");
		   $statement->execute();
		   while($row=$statement->fetch()){
			   $rows[$i]=array();
			   $rows[$i]=$row;  
			   $i++;
		   }
		 $rows['dimensione']=$i;



//ritorno l'array
echo json_encode($rows);
		}
			catch (Exception $e){
               return $e->getMessage(); //return exception
        }   
		   ?>
