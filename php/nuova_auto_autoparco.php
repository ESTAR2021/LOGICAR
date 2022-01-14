<?php
ini_set("error_reporting",0);
//mi connetto al db
include 'require_conn.php';
session_start();

//recupero i dati in sessione
$azienda=$_SESSION['asl'];
$utente=$_SESSION['matricola'];

//recupero i dati POST
$id_auto=$_POST['id_auto'];
$targa=$_POST['targa'];
$telaio=$_POST['telaio'];
$colore=$_POST['colore'];
$annoimm=$_POST['annoimm'];
$meseimm=$_POST['meseimm'];
//$azienda="AZIENDA USL TOSCANA CENTRO";//$_POST['azienda'];
$peso=$_POST['peso'];
$assi=$_POST['assi'];
$sede=$_POST['sede'];
$compatibilita=$_POST['compatibilita'];
$destinazione=$_POST['destinazione'];
$kmlitro=$_POST['kmlitro'];
$posti=$_POST['posti'];
$note=$_POST['note'];
$telepass_viacard=$_POST['telepass_viacard'];
$telepass_viacard_numero=$_POST['telepass_viacard_numero'];
$fuel_card=$_POST['fuel_card'];
$numerolocale=$_POST['numerolocale'];
$uso=$_POST['uso'];
$prenotabile=$_POST['prenotabile'];
$unita_prelievo=$_POST['unita_prelievo'];
$esente_bollo=$_POST['esentebollo'];

$oggi=Date("Y-m-d");
$orario=Date("H:i");
    


//scrivo i valori
try {
    $PDO = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    /*settiamo il gestore degli errori*/
    $PDO->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
    /*iniziamo una transaction*/
    $PDO->beginTransaction();
    $sql="INSERT INTO parco(id_auto,utente,id_azienda,targa,telaio,colore,anno_imm,mese_imm,peso,assi,sede,compatibilita,destinazione,kmlitro,posti,note,titoloAcquisto,telepass_viacard,telepass_viacard_numero,fuel_card,numero_auto_locale,uso,prenotabile,unita_prelievo,esente_bollo)
    VALUES('$id_auto','$utente','$azienda','$targa','$telaio','$colore','$annoimm','$meseimm','$peso','$assi','$sede','$compatibilita','$destinazione','$kmlitro','$posti','$note','$titoloAcquisto','$telepass_viacard','$telepass_viacard_numero','$fuel_card','$numerolocale','$uso','$prenotabile','$unita_prelievo','$esente_bollo')";
    $PDO->exec($sql);
    $id_autoparco = $PDO->lastInsertId();
    
    $matricola_utente=$_SESSION['matricola'];
    $sql_quote= $PDO->quote($sql);
    $sql =' INSERT INTO `log_azioni`( `query`, `matricola_utente`, `id_scheda`) VALUES("'.$sql_quote.'" ,"'.$matricola_utente.'","'.$id_autoparco.'")';
    $PDO->exec($sql);
    $sql="INSERT INTO parcheggio(id_auto,giorno,ora,sede) values('$id_autoparco','$oggi','$orario','$sede')";
    $PDO->exec($sql);
    $id_parcheggio = $PDO->lastInsertId();
    $sql_quote= $PDO->quote($sql);
    $sql =' INSERT INTO `log_azioni`( `query`, `matricola_utente`, `id_scheda`) VALUES("'.$sql_quote.'" ,"'.$matricola_utente.'","'.$id_parcheggio.'")';
    $PDO->exec($sql);

    /*eseguiamo le query comprese nella transaction*/
    $PDO->commit();

    echo "Auto correttamente inserita";

}
catch(PDOException $e)
{
    /*ritorna tutto come prima della transazione*/
    $PDO->rollBack();
    echo $e . "<br>" . $e->getMessage();
}

$PDO = null;

?>