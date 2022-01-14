<?php

//recupero i dati
$start=$_POST['start'];
$end=$_POST['end'];
$descrizione=$_POST['descrizione'];
session_start();
$azienda_ute = $_SESSION['asl'];
include 'require_conn.php';

//scrivo i valori

try {
		   $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
           $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
           $sql = "INSERT INTO calendario (descrizione, start, end,id_azienda) values
                ('$descrizione', STR_TO_DATE('$start', '%Y-%m-%D'),STR_TO_DATE('$end', '%Y-%m-%D'),'$azienda_ute')";
    $conn->exec($sql);
echo $sql;
    }
catch(PDOException $e)
    {
    echo $sql . "<br>" . $e->getMessage();
    }

$conn = null;

?>