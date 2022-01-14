<?php

//recupero i dati
$viaggio=$_REQUEST['viaggio'];


//mi connetto al db
include 'require_conn.php';

//scrivo i valori

try {
		   $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
           $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
           $sql = "DELETE FROM viaggi WHERE id='$viaggio'";
    $conn->exec($sql);

	//genero la finestra modale bootstrap
    echo 1;
    }
catch(PDOException $e)
    {
echo 0;
    }

$conn = null;

?>