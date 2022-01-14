<?php
ini_set("error_reporting", 0);
//mi connetto al db
include 'require_conn.php';
$rows = array();
session_start();
$asl = $_SESSION['asl'];    //recupero l'asl dalla sessione

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $statement = $conn->prepare("select *, auto.id AS idauto from auto INNER JOIN marca INNER JOIN modello ON marca.id=auto.id_marca AND modello.id=auto.id_modello ORDER BY auto.id DESC");
    $statement->execute();
    $i = 0;
    while ($row = $statement->fetch()) {
        $rows[$i] = array();
        $rows[$i] = $row;

        $id_auto = $rows[$i]['idauto'];


//vado sulla tabella dell'autoparco a recuperare il numero di modelli presenti nel parco aziendale		 
        $statementcount = $conn->prepare("select count(parco.id) AS numeroauto FROM parco WHERE id_auto='$id_auto' AND id_azienda like '$asl'");
        $statementcount->execute();

        while ($rowcount = $statementcount->fetch()) {
            $quanti = $rowcount['numeroauto'];
        }
        //aggiungo il valore all'array
        $rows[$i]['quanti'] = $quanti;
        $i++;
    }


//passo la dimensione dell'array al js "tabella.js"
    $rows['dimensione'] = $i;

//ritorno l'array
    echo json_encode($rows);
} catch (Exception $e) {
    return $e->getMessage(); //return exception
}
?>
