<?php

//recupero i dati
$idauto=$_POST['idauto'];
$pianificazione=$_POST['pianificazione'];

//$idauto=27;
//$pianificazione=323;



//mi connetto al db
include '../require_conn.php';

//scrivo i valori

try {
	
		$conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $sql = "UPDATE pren_auto SET auto='$idauto' WHERE prenotazione = '$pianificazione' ";
        $conn->exec($sql);
		
	  echo 1;
    }
catch(PDOException $e)
    {
    echo $sql . "<br>" . $e->getMessage();
    }

$conn = null;

?>