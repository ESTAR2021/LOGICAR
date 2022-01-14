<?php

//recupero i dati
$matricola=$_POST['matricola'];
$dataviaggio=$_POST['dataviaggio'];
$auto=$_POST['auto'];
$destinazione=$_POST['destinazione'];

//mi connetto al db
include 'require_conn.php';

//scrivo i valori

try {
		   $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
           $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
           $sql = "INSERT INTO `viaggi`(`autista`, `auto`, `destinazione`, `datetime_partenza`) 
					VALUES ('$matricola','$auto','$destinazione','$dataviaggio')";
			$conn->exec($sql);
			echo 1;
     }
catch(PDOException $e)
    {
    echo 0;
    }

$conn = null;


?>