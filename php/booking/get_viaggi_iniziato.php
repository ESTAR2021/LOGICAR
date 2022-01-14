<?php

session_start();
ini_set("error_reporting",0);
include '../require_conn.php';

	
if(isset ($_SESSION['autista'])){
	$autista_sessione=$_SESSION['autista'];

$rows=array();


//leggo i valori

		   try { 
		   $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
           $statement = $conn->prepare("select pren_prenotazioni.id as prenotazione_id from pren_prenotazioni, viaggi_pianificati where pren_prenotazioni.id=viaggi_pianificati.idprenotazione and pren_prenotazioni.utente='$autista_sessione' and giorno_partenza=curdate() and stato=3 ORDER BY viaggi_pianificati.id DESC");
		   $statement->execute();
		   $i=0;    
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
}

?>