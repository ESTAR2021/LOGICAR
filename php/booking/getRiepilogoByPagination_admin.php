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
//Tracciatura della pagina
if(isset($_POST['pagina'])){
	$pagina=$_POST['pagina'];
}else{
	$pagina=1;
	//exit();
}
//$pagina=(intval($pagina)-1)*5;
$pagina=(intval($pagina)-1)*5;
$rows=array();
//leggo i valori
try {
	$conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
	$statement = $conn->prepare("SELECT *, DATE_FORMAT(giorno_partenza,'%d/%m/%Y') AS partenza, DATE_FORMAT(giorno_ritorno,'%d/%m/%Y') AS ritorno 
								FROM pren_prenotazioni JOIN pren_auto JOIN viaggi_pianificati JOIN autisti JOIN marca JOIN auto JOIN parco LEFT JOIN modello ON modello.id=auto.id_modello
								WHERE pren_prenotazioni.azienda='$asl' 
								AND autisti.matricola=pren_prenotazioni.utente 
								AND pren_auto.prenotazione=pren_prenotazioni.id 
								AND parco.id=pren_auto.auto 
								AND parco.id_auto=auto.id 
								AND marca.ID=auto.id_marca
								AND viaggi_pianificati.idprenotazione=pren_prenotazioni.id
								AND giorno_partenza>=curdate()								
								order by STR_TO_DATE(concat(giorno_partenza,' ',ora_partenza),'%Y-%m-%d %H:%i:%s') DESC
								LIMIT $pagina,5");
								
								
	
	//filter esclusi dalla query: AND giorno_partenza>=curdate(),AND viaggi_pianificati.stato=0

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
