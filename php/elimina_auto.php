<?php
 session_start();
 $utente=$_SESSION['matricola'];
 
//recupero i dati
$id=$_REQUEST['id'];


//mi connetto al db
include 'require_conn.php';

//scrivo i valori

try {
		   $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
           $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
//           $sql = "DELETE FROM auto WHERE id='$id'";
	$sql="UPDATE `auto` SET `utente_cancellazione`='$utente',`data_cancellazione`=now() WHERE id='$id'";
    $conn->exec($sql);
	//genero la finestra modale bootstrap
    session_start();
    $matricola_utente=$_SESSION['matricola'];
    $sql_quote= $conn->quote($sql);
    $sql =' INSERT INTO `log_azioni`( `query`, `matricola_utente`, `id_scheda`) VALUES("'.$sql_quote.'" ,"'.$matricola_utente.'","'.$id.'")';
    $conn->exec($sql);
    echo "<div class=\"modal-content\"><div class=\"modal-header\">Cancella auto</div><div class=\"modal-body\" id=\"modal-body\"><img src=\"img/deflat_tire.png\"> Auto correttamente cancellata</div><div class=\"modal-footer\" id=\"modal-footer\"><button type=\"button\" onclick=\"javascript:window.location.reload()\" class=\"btn btn-default\" data-dismiss=\"modal\">Chiudi</button></div></div>";
    }
catch(PDOException $e)
    {
    echo $sql . "<br>" . $e->getMessage();
    }

$conn = null;

?>