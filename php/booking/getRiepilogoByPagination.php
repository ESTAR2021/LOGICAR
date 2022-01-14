<?php
ini_set("error_reporting",0);
//mi connetto al db
include '../require_conn.php';
session_start();

if(isset($_SESSION['matricola'])){
	$autista=$_SESSION['matricola'];
}else{
	echo 0;
	exit();
}
if(isset($_POST['pagina'])){
	$pagina=$_POST['pagina'];
}else{
	//$pagina=1;
	//exit();
}
$pagina=$pagina-1;
$rows=array();
//leggo i valori

		   try { 
		   $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
		   
           $statement = $conn->prepare("select distinct *, pren_prenotazioni.id as pian, DATE_FORMAT(giorno_partenza,'%d/%m/%Y') as partenza, DATE_FORMAT(giorno_ritorno,'%d/%m/%Y') as ritorno from pren_prenotazioni JOIN pren_auto JOIN viaggi_pianificati JOIN marca JOIN auto JOIN parco LEFT JOIN modello ON modello.id=auto.id_modello where parco.id_auto= auto.id and pren_prenotazioni.utente='$autista' and str_to_date(giorno_partenza,'%Y-%m-%d')>=CURDATE() and  pren_auto.prenotazione=pren_prenotazioni.id and parco.id=pren_auto.auto and marca.ID=auto.id_marca and viaggi_pianificati.idprenotazione=pren_prenotazioni.id ORDER BY str_to_date(giorno_partenza,'%Y-%m-%d') LIMIT $pagina,1");
		   
			$statement->execute();
		   $i=0;    
		   while($row=$statement->fetch()){
			   $rows[$i]=array();
			   $rows[$i]=$row;  
			   $pian= $rows[$i]['pian'];
			   $i++;
		   }
		  
		   $statement = $conn->prepare("select * from pren_tappeintermedie where prenotazione='$pian'");
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
