<?php
session_start();

//recupero i dati in POST
$id_sede=$_POST['id_sede'];
$tipo=$_POST['tipo'];
$asl = $_SESSION["asl"];
$com=$_POST['comune'];
$ind=$_POST['indirizzo'];

//mi connetto al db
include 'require_conn.php';
//scrivo i valori sul db
try {
    $sql = "
            UPDATE sedi 
            SET tipo=:tipo, 
            cod_comune = :com, 
            indirizzo = :ind 
            WHERE id = :id_sede 
            AND asl=:asl";

    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $statement = $conn->prepare($sql);
    $statement->bindValue(':tipo',$tipo,PDO::PARAM_STR);
    $statement->bindValue(':com',$com,PDO::PARAM_INT);
    $statement->bindValue(':ind',$ind,PDO::PARAM_STR);
    $statement->bindValue(':id_sede',$id_sede,PDO::PARAM_INT);
    $statement->bindValue(':asl',$asl,PDO::PARAM_INT);

    if(!$statement->execute()){
        returnError(print_r($statement->errorInfo()),JSON_RESP);
    }
    if(!$rowsAffected = $statement->rowCount()){
        returnError("L'aggionamento non è andato buon fine",JSON_RESP);
    }
    $matricola_utente=$_SESSION['matricola'];
    $sql_quote= $conn->quote($sql);
    $sql =' INSERT INTO `log_azioni`( `query`, `matricola_utente`, `id_scheda`) VALUES("'.$sql_quote.'" ,"'.$matricola_utente.'","'.$id_sede.'")';
    $conn->exec($sql);
    echo 1;
}
catch(PDOException $e)
{
    returnError("Errore nella connessione al db: ".$e->getMessage(),JSON_RESP);
}
$conn = null;
?>