<?php

//mi connetto al db
ini_set("error_reporting",0);
include '../../cartelletest/dbconnrepository.php';
$db = mysql_connect($host, $user, $password)or die ("Impossibile connettersi al server $host");
mysql_select_db($database, $db)or die ("Impossibile connettersi al database $database"); 
$ric_codi=$_POST['ric_codi'];
$viaggio=$_POST['viaggio'];
$queryStato="SELECT stato FROM `ric_richieste_esami` WHERE id='$ric_codi'";

$sql=mysql_query($queryStato, $db);
if($res=mysql_fetch_assoc($sql)){
	$stato=$res['stato'];

	/**
		0 - Richiesto;
		1 - Rifiutato;
		2 - Approvato;
		3 - Cancellato;
		4 - Caricato;
		5 - Scaricato;
	**/

	switch($stato){
		case 0:
		case 1: // Richiesto non approvato
				echo 'Richiesta ancora non approvata dalla direzione medica';
				break;
		case 2:
		case 6:
		case 5: // Approvato non caricato
			
				$query="UPDATE `ric_richieste_esami` SET stato=4 WHERE id='$ric_codi'";
				if(mysql_query($query, $db)){
				include 'require_conn.php';

				   try { 
				   $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
				   $statement = $conn->prepare("INSERT INTO `viaggi_etichette`(`viaggio`, `etichetta`) VALUES ('$viaggio','$ric_codi')");
				   $statement->execute();

				}
					catch (Exception $e){
					   return $e->getMessage(); //return exception
				}   
					
					
				echo 'Richiesta correttamente Caricata';
				}
				break;
		case 3: echo 'Richiesta cancellata dal Reparto';
				break;
		case 4: echo 'Richiesta già caricata';
				break;
		default:
				echo "Si è verificato un errore";
				
	}
}else{
	
	echo "Richiesta non trovata";
}



		   ?>


