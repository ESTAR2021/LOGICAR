<?php
//mi connetto al db
include 'require_conn.php';
ini_set("error_reporting", 0);
session_start();

//recupero i dati in sessione
$azienda_ute = $_SESSION['asl'];
$zone = $_SESSION['zoneselezionate'];

$WHEREZONA=TRUE;
$rows = array();
//leggo i valori
if(isset($_SESSION['zoneselezionate']) && !empty($_SESSION['zoneselezionate'])) $WHEREZONA='tab_comune_usl.cdzona IN ('.$zone.')';
try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $statement = $conn->prepare("
	 SELECT parco.id_auto,parco.targa,marca.marca,modello.modello,parco.numero_auto_locale,auto.alimentazione,auto.cilindrata,parco.id_azienda,parco.compatibilita,parco.colore,parco.sede,parco.telaio,parco.anno_imm,parco.mese_imm,parco.posti,parco.peso,parco.kmlitro,parco.destinazione,parco.assi,parco.titoloAcquisto,sedi.tipo,sedi.cod_comune,parco.telepass_viacard,parco.telepass_viacard_numero,parco.fuel_card,parco.numero_auto_locale,parco.uso,parco.prenotabile,parco.unita_prelievo,parco.note,parco.esente_bollo,
	 parco.id AS idauto, 
	 auto.id AS idautomod, 
	 comuni_italiani.provincia AS prov_comune,
	 concat(sedi.indirizzo,'(',denominazione,')') as ind_sede
     FROM parco INNER JOIN auto 
     INNER JOIN marca 
     INNER JOIN modello ON marca.id=auto.id_marca 
                        AND modello.id=auto.id_modello 
                        AND parco.id_auto=auto.id
     LEFT JOIN sedi ON parco.sede = sedi.id
     LEFT JOIN comuni_italiani ON sedi.cod_comune = comuni_italiani.codice
	 LEFT JOIN tab_comune_usl ON sedi.cod_comune=tab_comune_usl.cdcmn
     WHERE parco.id_azienda LIKE '$azienda_ute' AND $WHEREZONA AND parco.data_cancellazione is null
     ORDER BY parco.id DESC");

    if (!$statement->execute()) {
        returnError(print_r($statement->errorInfo()), JSON_RESP);
    }
    $i = 0;
    while ($row = $statement->fetch()) {
        $rows[$i] = array();
        $rows[$i] = $row;

        $id_auto = $rows[$i]['idautomod'];
        $id_parco = $rows[$i]['idauto'];
        //vado sulla tabella delle manutenzioni a recuperare l'eventuale id_auto
        $statementcount = $conn->prepare("
          SELECT COUNT(manutenzione.id) AS numeroauto 
          FROM manutenzione 
          WHERE id_auto='$id_parco'");
        if (!$statementcount->execute()) {
            returnError(print_r($statementcount->errorInfo()), JSON_RESP);
        }

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
    returnError("Errore nella connessione al db: " . $e->getMessage(), JSON_RESP);
}
?>
