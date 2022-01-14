<?php
ini_set("error_reporting",0);
//mi connetto al db
include '../require_conn.php';
session_start();
if(isset($_SESSION['pianificazione'])){
	$pianificazione=$_SESSION['pianificazione'];
}else{
	
	exit();
}

$rows=array();
//leggo i valori

		   try { 
		   $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
           $statement = $conn->prepare("select *, DATE_FORMAT(giorno_partenza,'%d/%m/%Y') as partenza, DATE_FORMAT(giorno_ritorno,'%d/%m/%Y') as ritorno from pren_prenotazioni JOIN pren_auto JOIN viaggi_pianificati JOIN viaggi_condivisi JOIN marca JOIN autisti JOIN auto JOIN parco LEFT JOIN modello ON auto.id_modello=modello.id where pren_prenotazioni.id=viaggi_condivisi.viaggio and autisti.matricola=pren_prenotazioni.utente and pren_auto.prenotazione=viaggi_condivisi.viaggio and parco.id=pren_auto.auto and parco.id_auto=auto.id and marca.ID=auto.id_marca and  viaggi_condivisi.viaggio= viaggi_pianificati.idprenotazione and viaggi_condivisi.prenotazione='$pianificazione'");


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
		 $rows['tipo']=1;
		 if($i==0){
			  $rows['tipo']=0;
			   $statement = $conn->prepare("select *, DATE_FORMAT(giorno_partenza,'%d/%m/%Y') as partenza, DATE_FORMAT(giorno_ritorno,'%d/%m/%Y') as ritorno from pren_prenotazioni JOIN pren_auto JOIN viaggi_pianificati JOIN viaggi_condivisi JOIN marca JOIN autisti JOIN auto JOIN parco LEFT JOIN modello ON auto.id_modello=modello.id where pren_prenotazioni.id=viaggi_condivisi.prenotazione_andata and autisti.matricola=pren_prenotazioni.utente and pren_auto.prenotazione=viaggi_condivisi.prenotazione_andata and parco.id=pren_auto.auto and parco.id_auto=auto.id and marca.ID=auto.id_marca and  viaggi_condivisi.prenotazione_andata= viaggi_pianificati.idprenotazione and viaggi_condivisi.prenotazione='$pianificazione'");

		   $statement->execute();
		   $i=0;    
		   while($row=$statement->fetch()){
			   $rows['andata']=array();
			   $rows['andata']=$row;  
			   $i++;
		   }
		   		   $statement = $conn->prepare("select *, DATE_FORMAT(giorno_partenza,'%d/%m/%Y') as partenza, DATE_FORMAT(giorno_ritorno,'%d/%m/%Y') as ritorno from pren_prenotazioni JOIN pren_auto JOIN viaggi_pianificati JOIN viaggi_condivisi JOIN marca JOIN autisti JOIN auto JOIN parco LEFT JOIN modello ON auto.id_modello=modello.id where pren_prenotazioni.id=viaggi_condivisi.prenotazione_ritorno and autisti.matricola=pren_prenotazioni.utente and pren_auto.prenotazione=viaggi_condivisi.prenotazione_ritorno and parco.id=pren_auto.auto and parco.id_auto=auto.id and marca.ID=auto.id_marca and  viaggi_condivisi.prenotazione_ritorno= viaggi_pianificati.idprenotazione and viaggi_condivisi.prenotazione='$pianificazione'");

		   $statement->execute();
		   $i=0;    
		   while($row=$statement->fetch()){
			   $rows['ritorno']=array();
			   $rows['ritorno']=$row;  
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
		 }

//ritorno l'array
echo json_encode($rows);
		}
			catch (Exception $e){
               return $e->getMessage(); //return exception
        }   
		   ?>
