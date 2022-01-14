<?php
ini_set("error_reporting",0);
include 'require_conn.php';
session_start();
//recupero i dati in sessione
$azienda_ute = $_SESSION['asl'];	//recupero l'asl dalla sessione
$zone = $_SESSION['zoneselezionate'];
$WHEREZONA=TRUE;
if(isset($_SESSION['zoneselezionate']) && !empty($_SESSION['zoneselezionate'])) $WHEREZONA='cdzona IN ('.$zone.')';

//leggo i valori
try {
	$conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $statement = $conn->prepare("select cod,des from tab_unita_prelievo where ex_cdusl in (select ex_cdusl from tab_usl_zone where cd_azienda=$azienda_ute and $WHEREZONA)");
		   
	$statement->execute();
	$rows=array();
	while($row=$statement->fetch()){
		//ritorno i dati per popolare la select. Per ogni opzione viene impostato il valore numerico ID
		$rows[$row["cod"]] = $row['des'];			
	}
	echo json_encode($rows);
}
catch (Exception $e){
	return $e->getMessage(); //return exception
}
?>
