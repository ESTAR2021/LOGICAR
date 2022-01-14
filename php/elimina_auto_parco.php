<?php
 session_start();
 $utente=$_SESSION['matricola'];

//recupero i dati
//$id=$_REQUEST['id'];

$id=$_POST['id_parco'];
$giorno_dismissione=$_POST['giorno_dismissione'];
$motivo_dismissione=$_POST['motivo_dismissione'];
$note_dismissione=$_POST['note_dismissione'];


//mi connetto al db
include 'require_conn.php';

//scrivo i valori

try {
		   $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
           $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
 //         $sql = "DELETE FROM parco WHERE id='$id'";
		   $sql = "UPDATE `parco` SET `utente_cancellazione`='$utente',`data_cancellazione`=now(),`motivo_dismissione`='$motivo_dismissione',`data_dismissione`=STR_TO_DATE('$giorno_dismissione', '%d/%m/%Y'),`note_dismissione`='$note_dismissione' WHERE id='$id'";
//		   $_SESSION['sql_elimina'] =$sql;
            $conn->exec($sql);
    //session_start();
    $matricola_utente=$_SESSION['matricola'];
    $sql_quote= $conn->quote($sql);
    $sql =' INSERT INTO `log_azioni`( `query`, `matricola_utente`, `id_scheda`) VALUES("'.$sql_quote.'" ,"'.$matricola_utente.'","'.$id.'")';
    $conn->exec($sql);
              $sql2 = "DELETE FROM manutenzione WHERE id_auto='$id'";
            $conn->exec($sql2);
    $sql_quote= $conn->quote($sql2);

    $sql =' INSERT INTO `log_azioni`( `query`, `matricola_utente`, `id_scheda`) VALUES("'.$sql_quote.'" ,"'.$matricola_utente.'","'.$id.'")';
    $conn->exec($sql);
	//genero la finestra modale bootstrap
    //echo "<div class=\"modal-content\"><div class=\"modal-header\">Cancella auto</div><div class=\"modal-body\" id=\"modal-body_cancparco\"><img src=\"img/gestione/autoparco.png\"> Auto correttamente eliminata</div><div class=\"modal-footer\" id=\"modal-footer_cancparco\"><button type=\"button\" onclick=\"javascript:window.location.reload()\" class=\"btn btn-default\" data-dismiss=\"modal\">Chiudi</button></div></div>";
		//genero la finestra modale bootstrap
    echo "<div class=\"modal-content\"><div class=\"modal-header\">Cancella auto</div><div class=\"modal-body\" id=\"modal-body_cancparco\"><img src=\"img/deflat_tire.png\"> Auto correttamente eliminata</div><div class=\"modal-footer\" id=\"modal-footer_cancparco\"><button type=\"button\" onclick=\"javascript:window.location.reload()\" class=\"btn btn-default\" data-dismiss=\"modal\">Chiudi</button></div></div>";
    }
catch(PDOException $e)
    {
	echo $sql . "<br>" . $e->getMessage();
    }

$conn = null;

?>