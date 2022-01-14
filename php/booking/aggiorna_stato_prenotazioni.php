<?php
/**
 * Created by PhpStorm.
 * User: paolo
 * Date: 12/09/2016
 * Time: 15:21
 */

ini_set("error_reporting",0);
//mi connetto al db
include '../require_conn.php';
session_start();
if(isset($_SESSION['asl'])){
    $asl=$_SESSION['asl'];
}else{
    echo 0;
    exit();
}

$rows=array();
//leggo i valori

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $statement = $conn->prepare("
    UPDATE viaggi_pianificati INNER JOIN pren_prenotazioni ON viaggi_pianificati.idprenotazione = pren.prenotazioni.id
    SET stato=5
    WHERE giorno_partenza>=curdate()
    AND stato=0");

    $statement->execute();
    if($row=$statement->fetch()){
        echo true;
    }

}
catch (Exception $e){
    return $e->getMessage(); //return exception
}
?>
