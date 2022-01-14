<?php

session_start();
ini_set("error_reporting",0);
$i=0;    
//mi connetto al db
include '../require_conn.php';
if(isset ($_POST['viaggio'])){
	$viaggio=$_POST['viaggio'];
}

$rows=array();


//leggo i valori

		   try { 
		   $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
           $statement = $conn->prepare("select *,  pren_prenotazioni.id as pian, DATE_FORMAT(giorno_partenza,'%d/%m/%Y') as partenza, DATE_FORMAT(giorno_ritorno,'%d/%m/%Y') as ritorno from pren_prenotazioni, pren_auto, marca, auto, modello, autisti, parco where  autisti.matricola=pren_prenotazioni.utente and pren_auto.prenotazione=pren_prenotazioni.id and parco.id_auto=auto.id and parco.id=pren_auto.auto and marca.ID=auto.id_marca and auto.id_modello=modello.id and pren_prenotazioni.id='$viaggio' and prenotazione=pren_prenotazioni.id ORDER BY pren_prenotazioni.id DESC");
		   $statement->execute();
		 
		      while($row=$statement->fetch()){
			   $rows[$i]=array();
			   $rows[$i]=$row;  
		
			   $i++;
		   }
	
		   $statement = $conn->prepare("select * from pren_tappeintermedie where prenotazione='$viaggio'");
		   $statement->execute();
		   while($row=$statement->fetch()){
			   $rows[$i]=array();
			   $rows[$i]=$row;  
			   $i++;
		   }
		 $rows['dimensione']=$i;
		
	
		

//ritorno l'array

		}
			catch (Exception $e){
               return $e->getMessage(); //return exception
        }

echo json_encode($rows);
?>