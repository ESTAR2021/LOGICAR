<?php
ini_set("error_reporting", 0);
session_start();
//leggo la sessione utente
$azienda_ute = $_SESSION["asl"];

//mi connetto al db
include 'require_conn.php';
$rows = array();
$tipologie["0"] = "Revisione Ordinaria";
$tipologie["1"] = "Revisione GPL";
$tipologie["2"] = "Revisione Metano";
$tipologie["3"] = "Tagliando";
$colori["0"] = "red";
$colori["1"] = "yellow";
$colori["2"] = "green";
$colori["3"] = "#27a0c9";
//leggo i valori

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    //Realizzo una query per recuperare/creare le scadenze dello scadenzario:
    //la data di scadenza può essere già presente in db oppure viene popolata al momento
    //mediante una query custom
    $statement = $conn->prepare("
(SELECT parco.id as id_parco,'revisione' as tipo_var, targa,
CASE WHEN revisione.tipologia IS NULL THEN 0 ELSE revisione.tipologia END AS tipologia,
CASE WHEN revisione.scadenza IS NULL THEN date(now()) ELSE revisione.scadenza END AS scadenza,
marca,modello,anno_imm
FROM parco INNER JOIN auto ON parco.id_auto=auto.id
INNER JOIN marca ON marca.id=auto.id_marca
INNER JOIN modello ON modello.id=auto.id_modello
LEFT JOIN revisione ON parco.id=revisione.id_auto
WHERE parco.id_azienda LIKE '$azienda_ute'
AND parco.id NOT IN (SELECT id_evento from calendario_non_visibile where tipo_evento='revisione' and id_azienda='$azienda_ute')
AND year(now()) - anno_imm >= 4
ORDER BY scadenza DESC)
                                        
UNION
                                        
(SELECT  parco.id as id_parco, 'tagliando' as tipo_var, targa,
CASE WHEN tagliando.tipologia IS NULL THEN 3 ELSE tagliando.tipologia END AS tipologia,
CASE WHEN tagliando.scadenza IS NULL THEN date(now()) ELSE tagliando.scadenza END AS scadenza,
marca,modello,anno_imm
FROM parco INNER JOIN auto ON parco.id_auto=auto.id
INNER JOIN marca ON marca.id=auto.id_marca
INNER JOIN modello ON modello.id=auto.id_modello
LEFT JOIN tagliando ON parco.id=tagliando.id_auto
WHERE parco.id_azienda LIKE '$azienda_ute'
AND year(now()) - anno_imm > 1
AND parco.id NOT IN (SELECT id_evento from calendario_non_visibile where tipo_evento='tagliando' and id_azienda='$azienda_ute')
ORDER BY scadenza DESC)");
/*SELECT targa,tipologia,
                                                CASE WHEN revisione.scadenza IS NULL THEN now() ELSE scadenza END AS scadenza_rev,
                                                CASE WHEN tagliando.scadenza IS NULL THEN now() ELSE scadenza END AS scadenza_tag,
                                                 marca,modello,anno_imm
                                          FROM parco INNER JOIN auto ON parco.id_auto=auto.id
												     INNER JOIN marca ON marca.id=auto.id_marca
												     LEFT JOIN revisione ON parco.id=revisione.id_auto
												     INNER JOIN modello ON modello.id=auto.id_modello
												     LEFT JOIN tagliando ON parco.id=tagliando.id_auto
									    WHERE parco.id_azienda LIKE '$azienda_ute'
									    ORDER BY parco.id DESC*/
     $statement->execute();
    $i = 0;
    while ($row = $statement->fetch()) {
        $rows[$i]["title"] = $tipologie[$row["tipologia"]]." \n ".$row["marca"].' '.$row["modello"]." (".$row["anno_imm"].") \n Targa: ".$row["targa"];
        $rows[$i]["start"] = $row["scadenza"];
        //todo distinzione del colore per tipologia di scadenza
        $rows[$i]["color"] = $colori[$row["tipologia"]];
        $rows[$i]["id"] = $row["id_parco"].'-'. $row["tipo_var"];
        $rows[$i]["tipo"] = $row["tipo_var"];
        $i++;
    }


    $statement = $conn->prepare("select *,bollo.id as id_bollo, DATE_FORMAT(scadenza_bollo,'%Y-%m') as scadenza_format, parco.id AS idauto, auto.id AS idautomod from bollo JOIN parco INNER JOIN
 auto INNER JOIN marca INNER JOIN modello
 			ON marca.id=auto.id_marca AND modello.id=auto.id_modello AND parco.id_auto=auto.id WHERE
 			 bollo.id NOT IN (SELECT id_evento from calendario_non_visibile where tipo_evento='bollo' and id_azienda='$azienda_ute') AND
 			bollo.id_auto=parco.id AND parco.id_azienda LIKE '$azienda_ute' ");

    $statement->execute();

    while ($row = $statement->fetch()) {
        $rows[$i]["title"] = "Bollo \n ".$row["marca"].' '.$row["modello"]." (".$row["anno_imm"].") \n Targa: ".$row["targa"];
        $rows[$i]["start"] = $row["scadenza_format"];
        $rows[$i]["id"] = $row["id_bollo"].'-'."bollo";
        $rows[$i]["tipo"] = "bollo";
        //todo distinzione del colore per tipologia di scadenza
        $rows[$i]["color"] ='blue';
        $i++;
    }
    $statement = $conn->prepare("select * from calendario where id_azienda LIKE '$azienda_ute' ");

    $statement->execute();

    while ($row = $statement->fetch()) {
        $rows[$i]["title"] = $row["descrizione"];
        $rows[$i]["start"] = $row["start"];
        $rows[$i]["end"] = $row["end"];
        $rows[$i]["id"] = $row["id"].'-'."nota";
        $rows[$i]["tipo"] = "nota";
             $i++;
    }
//ritorno l'array

    echo json_encode($rows);
} catch (Exception $e) {
    return $e->getMessage(); //return exception
}
?>
