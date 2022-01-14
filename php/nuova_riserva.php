<?php

//recupero i dati
$id_auto=$_POST['id_auto'];

$dataora_da=$_POST['dataora_da'];
$dataora_a=$_POST['dataora_a'];



//mi connetto al db
include 'require_conn.php';

//scrivo i valori

try {
		    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
           	$sql = "INSERT INTO `auto_riservate`( `id_parco`, `inizio`, `fine`, `riservata`)
            values('$id_auto',STR_TO_DATE('$dataora_da', '%d/%m/%Y %H:%i'),STR_TO_DATE('$dataora_a', '%d/%m/%Y %H:%i'),'1')";
            $conn->exec($sql);
            session_start();
            $lastInsertId=$conn->lastInsertId();
            $matricola_utente=$_SESSION['matricola'];
            $sql_quote= $conn->quote($sql);
            $sql =' INSERT INTO `log_azioni`( `query`, `matricola_utente`, `id_scheda`) VALUES("'.$sql_quote.'" ,"'.$matricola_utente.'","'.$lastInsertId.'")';
            $conn->exec($sql);
    echo "Riserva auto inserita";
    }
catch(PDOException $e)
    {
    echo $sql . "<br>" . $e->getMessage();
    }

$conn = null;

?>