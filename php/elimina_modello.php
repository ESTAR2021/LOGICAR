<?php

//recupero i dati
$id=$_REQUEST['id'];


//mi connetto al db
include 'require_conn.php';

//scrivo i valori

try {
		   $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
           $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
           $sql = "DELETE FROM modello WHERE ID='$id'";
    $conn->exec($sql);
	//genero la finestra modale bootstrap
    echo "<div class=\"modal-content\"><div class=\"modal-header\">Cancella modello</div><div class=\"modal-body\" id=\"modal-body\"><img src=\"img/crash.png\"> Modello correttamente cancellato</div><div class=\"modal-footer\" id=\"modal-footer\"><button type=\"button\" onclick=\"javascript:window.location.reload()\" class=\"btn btn-default\" data-dismiss=\"modal\">Chiudi</button></div></div>";
    }
catch(PDOException $e)
    {
    echo $sql . "<br>" . $e->getMessage();
    }

$conn = null;

?>