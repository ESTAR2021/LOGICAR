<?php
ini_set("error_reporting",0);
session_start();
//Dati POST
$tipo=$_POST['tipo'];           //val testuale
$asl=$_POST['asl'];             //val numerico
$com=$_POST['comune'];          //val numerico
$ind=$_POST['indirizzo'];       //val testuale

//mi connetto al db
include 'require_conn.php';

//scrivo i valori
try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    //Procede all'inserimento sul db
    $statement = $conn->prepare("
                                            INSERT INTO sedi(tipo,asl,cod_comune,indirizzo) 
                                            VALUES(:tipo,:asl,:com,:ind)");
    $statement->bindValue(':tipo',$tipo,PDO::PARAM_STR);
    $statement->bindValue(':asl',$asl,PDO::PARAM_INT);
    $statement->bindValue(':com',$com,PDO::PARAM_INT);
    $statement->bindValue(':ind',$ind,PDO::PARAM_STR);

    if(!$statement->execute()){
        returnError(print_r($statement->errorInfo()),JSON_RESP);
    }
    $matricola_utente=$_SESSION['matricola'];
    $lastInsertId=$conn->lastInsertId();
    $sql_quote= $conn->quote("INSERT INTO sedi(tipo,asl,cod_comune,indirizzo) values('$tipo','$asl','$com','$ind')");
    $sql =' INSERT INTO `log_azioni`( `query`, `matricola_utente`, `id_scheda`) VALUES("'.$sql_quote.'" ,"'.$matricola_utente.'","'.$lastInsertId.'")';
    $conn->exec($sql);
    echo 1;
}
catch(PDOException $e)
{
    returnError("Errore nella connessione al db: ".$e->getMessage(),JSON_RESP);
}
$conn = null;
?>