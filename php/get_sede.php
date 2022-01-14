<?php
session_start();
//mi connetto al db
include 'require_conn.php';
//recupero i dati in sessione
if (session_id()==""){
    echo "error";
}
else {
    $asl = $_SESSION['asl'];
    $id_sede = $_POST['id_sede'];
    try {
        $sql = "SELECT s.id, s.tipo AS tiposede, c.codice AS comune, c.provincia, s.indirizzo 
				FROM sedi as s JOIN comuni_italiani AS c ON s.cod_comune = c.codice 
				WHERE s.asl = '$asl' AND s.id = '$id_sede'";
        $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        $statement = $conn->prepare($sql);
        $statement->execute();
        $row = $statement->fetch();
        echo json_encode($row);
    } catch (Exception $e) {
        return $e->getMessage(); //return exception
    }
}
?>
