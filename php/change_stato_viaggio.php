<?php

//recupero i dati
$stato=$_POST['stato'];
$viaggio=$_POST['viaggio'];


//mi connetto al db
include 'require_conn.php';

//scrivo i valori

try {
		   $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
           $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
           $sql = "UPDATE `viaggi` SET stato='$stato' WHERE id=$viaggio";
			$conn->exec($sql);
     }
catch(PDOException $e)
    {
    echo $sql . "<br>" . $e->getMessage();
    }

$conn = null;
echo 1;

?>