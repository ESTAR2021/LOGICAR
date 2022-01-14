<?php

//recupero i dati
$matricola=$_POST['matricola'];
ini_set("error_reporting",0);

//mi connetto al db
include 'require_conn.php';

//scrivo i valori

try {
		    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $sql = "UPDATE autisti SET attivo=0 WHERE matricola='$matricola'";
            $conn->exec($sql);
            session_start();
            $matricola_utente=$_SESSION['matricola'];
            $sql_quote= $conn->quote($sql);
            $sql ='INSERT INTO `log_azioni`( `query`, `matricola_utente`, `id_scheda`) VALUES("'.$sql_quote.'" ,"'.$matricola_utente.'","'.$matricola.'")';
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