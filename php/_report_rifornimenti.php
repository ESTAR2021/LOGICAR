<?php
ini_set("error_reporting", 0);
//mi connetto al db
include 'require_conn.php';
$rows = array();

$datainizio=$_GET['dataInizio'];
$datafine=$_GET['dataFine'];

session_start();
//$asl = $_SESSION['asl'];    //recupero l'asl dalla sessione
$azienda_ute = $_SESSION['asl'];	//recupero l'asl dalla sessione
$zone = $_SESSION['zoneselezionate'];
$WHEREZONA=TRUE;

if(isset($_SESSION['zoneselezionate']) && !empty($_SESSION['zoneselezionate'])) $WHEREZONA='v_parco.cdzona IN ('.$zone.')';

try 
{
	$conn = new PDO("mysql:host=$servername;dbname=$dbname", $username,$password);
	//---
	$sql = "select v_parco.id,
	numero_auto_locale,
	marca,
	modello,
	targa,
	tipo,
	alimentazione,
	cilindrata,
	potenza,
	indirizzo,
	denominazione,
	provincia,
	cdusl,
	desczona,
	tab_unita_prelievo.des as unita_prelievo,
	prenotabile,	
	carburante,
	giorno,
	fornitore,
	stazione,
	km,
	litri,
	importo,
	rifornimento.data_inserimento,
	cognome,
	nome
	from v_parco 
	join rifornimento on rifornimento.id_auto=v_parco.id
	left join autisti on autisti.matricola=rifornimento.utente
	left jOIN tab_unita_prelievo ON v_parco.unita_prelievo = tab_unita_prelievo.cod
	where rifornimento.giorno BETWEEN str_to_date('$datainizio','%d/%m/%Y') AND str_to_date('$datafine','%d/%m/%Y') AND rifornimento.data_cancellazione is null AND v_parco.id_azienda = '$azienda_ute' AND $WHEREZONA";
	//---
	$statement = $conn->prepare($sql);
  $statement->execute();
	$result=$statement->setFetchMode(PDO::FETCH_ASSOC);
	$rows = $statement->fetchAll();
  $vettore2 = array("data" => $rows);
	//-----------------------------------------------
	$sql_quote= $conn->quote($sql);
	$sql ='INSERT INTO log_traccia (query) VALUES("'.$sql_quote.'")';
	$conn->exec($sql);
	//-----------------------------------------------
	echo json_encode($vettore2);
}
	catch (Exception $e)
{
  return $e->getMessage(); //return exception
}

