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
if(isset($_POST['pagina'])){
	$pagina=$_POST['pagina'];
}else{
	$pagina=1;
	//exit();
}


$pagina=$pagina-1;
$pagina=$pagina*5;

$rows=array();
//leggo i valori

		   try { 
		   $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);

           $statement = $conn->prepare("select *, DATE_FORMAT(giorno_partenza,'%d/%m/%Y') as partenza, DATE_FORMAT(giorno_ritorno,'%d/%m/%Y') as ritorno from pren_prenotazioni JOIN pren_auto JOIN autisti JOIN viaggi_pianificati JOIN marca JOIN auto JOIN parco LEFT JOIN modello ON modello.id=auto.id_modello where pren_prenotazioni.azienda='$asl' and autisti.matricola=pren_prenotazioni.utente and pren_auto.prenotazione=pren_prenotazioni.id and parco.id=pren_auto.auto and parco.id_auto= auto.id and marca.ID=auto.id_marca and giorno_partenza>=curdate() and viaggi_pianificati.idprenotazione=pren_prenotazioni.id and viaggi_pianificati.stato=0 ORDER BY pren_prenotazioni.id DESC LIMIT $pagina,5");
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
		   ?>
