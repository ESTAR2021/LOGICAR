<?php


ini_set("error_reporting",0);
include 'require_conn.php';
session_start();
//recupero i dati in sessione
$asl=$_SESSION['asl'];
$tipo=$_POST['tipo'];
$comune=$_POST['comune'];

//leggo i valori
try {
	$sql = "SELECT s.id, s.indirizzo 
			FROM sedi AS s 
			WHERE s.tipo LIKE '$tipo' 
			AND s.asl = '$asl' 
			AND s.cod_comune LIKE '$comune'";
	$conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
	$statement = $conn->prepare($sql);
	$statement->execute();
	$rows=array();
	while($row=$statement->fetch()){
		//ritorno i dati per popolare la select. Per ogni opzione viene impostato il valore numerico ID
		$rows[$row["id"]] = $row['indirizzo'];			//risolvere ambiguita in caso di più righe con indirizzi diversi per la stessa sede
	}
	echo json_encode($rows);
}
catch (Exception $e){
	return $e->getMessage(); //return exception
}
?>
