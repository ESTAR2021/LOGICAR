<?php


ini_set("error_reporting",0);
//mi connetto al db
include 'require_conn.php';
session_start();
//recupero i dati in sessione
$asl=$_SESSION['asl'];
$tipo=$_POST['tipo'];


//leggo i valori
try {
	$sql = "SELECT c.provincia, c.codice, c.denominazione 
            FROM sedi AS s JOIN comuni_italiani AS c ON s.cod_comune = c.codice 
            WHERE s.tipo LIKE '$tipo' AND s.asl = '$asl'
            GROUP BY c.provincia, c.codice, c.denominazione";

    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
	//Si considera sia la colonna provincia che la colonna metropolitana (in corrispondenza della quale la provincia è null)
	$statement = $conn->prepare($sql);
	$statement->execute();
    $hierarchy=array();
	while($row=$statement->fetch()){
        $hierarchy [utf8_encode($row["provincia"])][$row["codice"]]=utf8_encode($row["denominazione"]);
	}
    //Codifico in JSON l'output
    echo json_encode($hierarchy);
}
catch (Exception $e){
	return $e->getMessage(); //return exception
}
?>