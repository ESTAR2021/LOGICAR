<?php
//mi connetto al db
include 'require_conn.php';
session_start();

//recupero i dati
$id = $_GET['id'];
$asl = $_SESSION['asl'];

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $sql = "DELETE FROM sedi WHERE id=:id";
    $statement = $conn->prepare($sql);
    $statement->bindParam(':id',$id, PDO::PARAM_INT);
    if (!$statement->execute()) {
        returnError($error[2], JSON_RESP);
    }

    $matricola_utente = $_SESSION['matricola'];
    $sql_quote = $conn->quote($sql);
    $sql = ' INSERT INTO `log_azioni`( `query`, `matricola_utente`, `id_scheda`) VALUES("' . $sql_quote . '" ,"' . $matricola_utente . '","' . $id . '")';
    $conn->exec($sql);
    echo 1;
} catch (PDOException $e) {
    returnError($e->getMessage(), JSON_RESP);
}

$conn = null;

?>