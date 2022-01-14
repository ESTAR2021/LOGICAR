<?php

//recupero i dati
$idauto=$_POST['idauto'];
$cilindrata=$_POST['cilindrata'];
$potenza=$_POST['potenza'];
$alimentazione=$_POST['alimentazione'];
$anno=$_POST['anno'];
$note=$_POST['note'];


//mi connetto al db
include 'require_conn.php';

//scrivo i valori

try {
		   $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
           $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
           $sql = "UPDATE auto SET cilindrata='$cilindrata',alimentazione='$alimentazione',potenza='$potenza',note='$note' WHERE id='$idauto' ";
            $conn->exec($sql);
            session_start();
            $matricola_utente=$_SESSION['matricola'];
            $sql_quote= $conn->quote($sql);
            $sql =' INSERT INTO `log_azioni`( `query`, `matricola_utente`, `id_scheda`) VALUES("'.$sql_quote.'" ,"'.$matricola_utente.'","'.$idauto.'")';
            $conn->exec($sql);

    }
catch(PDOException $e)
    {
    echo $sql . "<br>" . $e->getMessage();
    }

$conn = null;

?>