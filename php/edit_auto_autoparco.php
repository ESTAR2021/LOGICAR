<?php

//recupero i dati
$idauto=$_POST['id_modello'];
$targa=$_POST['targa'];
$telaio=$_POST['telaio'];
$id_azienda=$_POST['azienda'];
$sede=$_POST['sede'];
/*$comune=$_POST['comune'];
$provincia=$_POST['provincia'];
$indirizzo=$_POST['indirizzo'];*/
$compatibilita=$_POST['compatibilita'];
$assi=$_POST['assi'];
$posti=$_POST['posti'];
$colore=$_POST['colore'];
$destinazione=$_POST['destinazione'];
$peso=$_POST['peso'];
$kmlitro=$_POST['kmlitro'];
$anno_imm=$_POST['anno_imm'];
$mese_imm=$_POST['mese_imm'];
$inputnote=$_POST['inputnote'];
$titoloAcquisto=$_POST['titoloAcquisto'];
$TelePassViacard=$_POST['TelePassViacard'];
$numerolocale=$_POST['numerolocale'];
$TelePass=$_POST['TelePass'];
$FuelCard=$_POST['FuelCard'];
$uso=$_POST['uso'];
$prenotabile=$_POST['prenotabile'];
$unita_prelievo=$_POST['unita_prelievo'];
$esentebollo=$_POST['esentebollo'];

$oggi=Date("Y-m-d");
$orario=Date("H:i");

//mi connetto al db
include 'require_conn.php';

//scrivo i valori

try {
    $PDO = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    /*settiamo il gestore degli errori*/
    $PDO->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
    /*iniziamo una transaction*/
    $PDO->beginTransaction();
    $sql="UPDATE parco SET targa='$targa',telaio='$telaio',colore='$colore',id_azienda='$id_azienda',anno_imm='$anno_imm',mese_imm='$mese_imm', compatibilita='$compatibilita',assi='$assi',sede='$sede', posti='$posti',kmlitro='$kmlitro',peso='$peso', note='$inputnote', titoloAcquisto='$titoloAcquisto', telepass_viacard='$TelePassViacard',numero_auto_locale='$numerolocale', telepass_viacard_numero='$TelePass', fuel_card='$FuelCard', uso='$uso', prenotabile='$prenotabile', unita_prelievo='$unita_prelievo', esente_bollo='$esentebollo' WHERE id='$idauto'";
    $PDO->exec($sql);
    session_start();
    $matricola_utente=$_SESSION['matricola'];
    $sql_quote= $PDO->quote($sql);
    $sql ='INSERT INTO `log_azioni`( `query`, `matricola_utente`, `id_scheda`) VALUES("'.$sql_quote.'" ,"'.$matricola_utente.'","'.$idauto.'")';
    $PDO->exec($sql);
    $sql="UPDATE parcheggio SET giorno='$giorno',ora='$orario',sede='$sede' WHERE id_auto='$idauto'";
    $PDO->exec($sql); //,provincia='$provincia',comune='$comune', indirizzo='$indirizzo'
    /*eseguiamo le query comprese nella transaction*/
    $sql_quote= $PDO->quote($sql);
    $sql ='INSERT INTO `log_azioni`( `query`, `matricola_utente`, `id_scheda`) VALUES("'.$sql_quote.'" ,"'.$matricola_utente.'","'.$idauto.'")';
    $PDO->exec($sql);
    $PDO->commit();
    echo "Auto correttamente modificata";
}
catch(PDOException $e) {
    /*ritorna tutto come prima della transazione*/
    $PDO->rollBack();
    echo $e . "<br>" . $e->getMessage();
}
$PDO = null;
?>