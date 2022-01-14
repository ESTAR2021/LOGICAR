<?php

//recupero i dati
$marca=$_POST['marca'];


//mi connetto al db
include 'require_conn.php';

//scrivo i valori

try {
		   $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
           $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
           $sql = "INSERT INTO marca(marca) values('$marca')";
    $conn->exec($sql);
    session_start();
    $matricola_utente=$_SESSION['matricola'];
    $lastInsertId=$conn->lastInsertId();
    $sql_quote= $conn->quote($sql);
    $sql =' INSERT INTO `log_azioni`( `query`, `matricola_utente`, `id_scheda`) VALUES("'.$sql_quote.'" ,"'.$matricola_utente.'","'.$lastInsertId.'")';
    $conn->exec($sql);

     }
catch(PDOException $e)
    {
    echo $sql . "<br>" . $e->getMessage();
    }

$conn = null;

?>