<?php
session_start();
$utente=$_SESSION['matricola'];

//recupero i dati
$marca=$_POST['marca'];
$modello=$_POST['modello'];
$cilindrata=$_POST['cilindrata'];
$potenza=$_POST['potenza'];
$alimentazione=$_POST['alimentazione'];
$note=$_POST['note'];


//mi connetto al db
include 'require_conn.php';

//scrivo i valori

try {
	$conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $sql = "INSERT INTO auto (id_marca,utente,id_modello,cilindrata,alimentazione,potenza,note) values('$marca','$utente','$modello','$cilindrata','$alimentazione','$potenza','$note')";
    $conn->exec($sql);
//    session_start();
    $matricola_utente=$_SESSION['matricola'];
    $lastInsertId=$conn->lastInsertId();
    $sql_quote= $conn->quote($sql);
    $sql =' INSERT INTO `log_azioni`( `query`, `matricola_utente`, `id_scheda`) VALUES("'.$sql_quote.'" ,"'.$matricola_utente.'","'.$lastInsertId.'")';
    $conn->exec($sql);
    echo "Auto correttamente inserita";
    }
catch(PDOException $e)
    {
    echo $sql . "<br>" . $e->getMessage();
    }

$conn = null;

?>