<?php
ini_set("error_reporting", 0);
//mi connetto al db
include '../require_conn.php';
session_start();
if (isset($_REQUEST['riserva'])) {
    $riserva = $_REQUEST['riserva'];
} else {
    echo 0;
	exit();
}

$rows = array();
//leggo i valori

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $statement = $conn->prepare("select *, DATE_FORMAT ( p1.giorno_partenza,'%d/%m/%Y')as giorno_partenza_format from pren_prenotazioni p1 , viaggi_pianificati v, pren_auto pa , autisti where v.idprenotazione=p1.id 
	and v.stato=1 and pa.prenotazione=p1.id and pa.auto in(select id_parco from 
	auto_riservate where auto_riservate.id=$riserva and (STR_TO_DATE(concat(p1.giorno_partenza,' ',p1.ora_partenza),'%Y-%m-%d %H:%i:%s')
	BETWEEN inizio AND fine or STR_TO_DATE(concat(p1.giorno_ritorno,' ',p1.ora_ritorno),'%Y-%m-%d %H:%i:%s') BETWEEN inizio AND fine)) 
	and autisti.matricola=p1.utente
	ORDER BY `v`.`idprenotazione` ASC
		");
	
    $statement->execute();
    $i = 0;
    while ($row = $statement->fetch()) {
		$rows[$i] = array();
        $rows[$i] = $row;
        $pianificazione = $row['prenotazione'];

		 $statement2 = $conn->prepare(" select *, DATE_FORMAT(p1.giorno_partenza , '%d/%m/%Y') as giornoformatted, parco.id AS idauto from  marca INNER JOIN auto INNER JOIN parco LEFT JOIN modello
					ON modello.id=auto.id_modello  INNER JOIN pren_prenotazioni p1 ON auto.id=parco.id_auto and
					marca.id=auto.id_marca  and parco.id_azienda=p1.azienda and parco.sede=p1.sede_partenza  and p1.id='$pianificazione' 
					and posti>=passeggeri
					and
					parco.id not in(select pa.auto from pren_auto pa, pren_prenotazioni pp where pa.prenotazione=pp.id
					and pp.giorno_partenza = p1.giorno_partenza and pa.del=0) and
					parco.id not in (select id_parco from auto_riservate where 
					STR_TO_DATE(concat(p1.giorno_partenza,' ',p1.ora_partenza),'%Y-%m-%d %H:%i:%s')
					BETWEEN inizio AND fine or STR_TO_DATE(concat(p1.giorno_ritorno,' ',p1.ora_ritorno),'%Y-%m-%d %H:%i:%s') BETWEEN inizio AND fine) 
					ORDER BY parco.id DESC LIMIT 1;
					
					");

		$statement2->execute();
		if ($row2 = $statement2->fetch()) {
			$nuova_auto=$row2['idauto'];	
			$giornoformatted=$row2['giornoformatted'];	
			$sql="UPDATE pren_auto set auto='$nuova_auto' where prenotazione='$pianificazione'";
		
			$statement3 = $conn->prepare($sql);
			$statement3->execute();
			$matricola_utente=$_SESSION['matricola'];
			$sql_quote= $conn->quote($sql);
			$sql =' INSERT INTO `log_azioni`( `query`, `matricola_utente`, `id_scheda`) VALUES("'.$sql_quote.'" ,"'.$matricola_utente.'","'.$pianificazione.'")';
			$conn->exec($sql);
			$sql = "INSERT INTO `avvisi`( `utente`, `avviso`, `stato`) VALUES ((SELECT utente FROM pren_prenotazioni WHERE id='$pianificazione'),'PER IL GIORNO $giornoformatted TI &egrave; STATA ASSOCIATA UNA MACCHINA DIVERSA CAUSA INDISPONIBILITA DELLA PRECENDENTE' ,0)";
			$conn->exec($sql);
			$sql_quote= $conn->quote($sql);
			$sql =' INSERT INTO `log_azioni`( `query`, `matricola_utente`, `id_scheda`) VALUES("'.$sql_quote.'" ,"'.$matricola_utente.'","'.$pianificazione.'")';
			$conn->exec($sql);
		}else{
			 $statement3 = $conn->prepare("select *, p1.id as idprenCancellare, DATE_FORMAT(p1.giorno_partenza , '%d/%m/%Y') as giornoformatted, pa.auto as idauto from pren_prenotazioni p1 , pren_prenotazioni p2, viaggi_pianificati v, pren_auto pa , autisti where 
					v.idprenotazione=p1.id 
					and v.stato=1 and pa.prenotazione=p1.id and pa.auto and p1.giorno_partenza=p2.giorno_partenza and
					p1.giorno_ritorno = p2.giorno_ritorno and p2.id='$pianificazione' and p1.id!=p2.id
					and autisti.matricola=p1.utente
					ORDER BY `v`.`idprenotazione` DESC LIMIT 1;
					");
	
		$statement3->execute();
		if ($row2 = $statement3->fetch()) {
			$idauto=$row2['idauto'];	
			$idprenCancellare=$row2['idprenCancellare'];	
			$giornoformatted=$row2['giornoformatted'];	
			$sql="UPDATE pren_auto set auto='$idauto' where prenotazione='$pianificazione'";
			$statement4 = $conn->prepare($sql);
			$statement4->execute();
			$matricola_utente=$_SESSION['matricola'];
			$sql_quote= $conn->quote($sql);
			$sql =' INSERT INTO `log_azioni`( `query`, `matricola_utente`, `id_scheda`) VALUES("'.$sql_quote.'" ,"'.$matricola_utente.'","'.$pianificazione.'")';
			$conn->exec($sql);
		
			$sql="UPDATE pren_auto set del=1 where prenotazione='$idprenCancellare'";
			$statement4 = $conn->prepare($sql);
			$statement4->execute();
			$sql_quote= $conn->quote($sql);
			$sql =' INSERT INTO `log_azioni`( `query`, `matricola_utente`, `id_scheda`) VALUES("'.$sql_quote.'" ,"'.$matricola_utente.'","'.$pianificazione.'")';
			$conn->exec($sql);
			$sql = "INSERT INTO `avvisi`( `utente`, `avviso`, `stato`) VALUES ((SELECT utente FROM pren_prenotazioni WHERE id='$idprenCancellare'),'LA MACCHINA PRENOTATA PER IL GIORNO $giornoformatted  NON è PIU DISPOBIBILE' ,0)";
			$conn->exec($sql);
			$sql_quote= $conn->quote($sql);
			$sql =' INSERT INTO `log_azioni`( `query`, `matricola_utente`, `id_scheda`) VALUES("'.$sql_quote.'" ,"'.$matricola_utente.'","'.$idprenCancellare.'")';
			$conn->exec($sql);
			$sql = "INSERT INTO `avvisi`( `utente`, `avviso`, `stato`) VALUES ((SELECT utente FROM pren_prenotazioni WHERE id='$pianificazione'),'PER IL GIORNO $giornoformatted TI &egrave; STATA ASSOCIATA UNA MACCHINA DIVERSA CAUSA INDISPONIBILITA DELLA PRECENDENTE' ,0)";
			$conn->exec($sql);
			$sql_quote= $conn->quote($sql);
			$sql =' INSERT INTO `log_azioni`( `query`, `matricola_utente`, `id_scheda`) VALUES("'.$sql_quote.'" ,"'.$matricola_utente.'","'.$pianificazione.'")';
			$conn->exec($sql);
			
		}else{
			$sql="UPDATE viaggi_pianificati set stato=3 where idprenotazione='$pianificazione'";
			$statement4 = $conn->prepare($sql);
			$statement4->execute();
			$sql_quote= $conn->quote($sql);
			$sql =' INSERT INTO `log_azioni`( `query`, `matricola_utente`, `id_scheda`) VALUES("'.$sql_quote.'" ,"'.$matricola_utente.'","'.$pianificazione.'")';
			$conn->exec($sql);
			$sql = "INSERT INTO `avvisi`( `utente`, `avviso`, `stato`) VALUES ((SELECT utente FROM pren_prenotazioni WHERE id='$pianificazione'),'LA MACCHINA PRENOTATA PER IL GIORNO $giornoformatted NON &egrave; PIU DISPOBIBILE' ,0)";
			$conn->exec($sql);
			$sql_quote= $conn->quote($sql);
			$sql =' INSERT INTO `log_azioni`( `query`, `matricola_utente`, `id_scheda`) VALUES("'.$sql_quote.'" ,"'.$matricola_utente.'","'.$pianificazione.'")';
			$conn->exec($sql);
			$sql="UPDATE pren_auto set del=1 where prenotazione='$pianificazione'";
			$conn->exec($sql);
			$sql_quote= $conn->quote($sql);
			$sql =' INSERT INTO `log_azioni`( `query`, `matricola_utente`, `id_scheda`) VALUES("'.$sql_quote.'" ,"'.$matricola_utente.'","'.$pianificazione.'")';
			$conn->exec($sql);
		}
		}
     
        $i++;
    }

//passo la dimensione dell'array al js "tabella.js"
    $rows['dimensione'] = $i;

//ritorno l'array
     echo "<div class=\"modal-content\"><div class=\"modal-header\">Aggiorna prenotazione</div><div class=\"modal-body\" id=\"modal-body\"><img src=\"img/stop.png\"> Prenotazioni correttamente aggionate</div><div class=\"modal-footer\" id=\"modal-footer\"><button type=\"button\" onclick=\"javascript:window.location.reload()\" class=\"btn btn-default\" data-dismiss=\"modal\">Chiudi</button></div></div>";
 
} catch (Exception $e) {
    return $e->getMessage(); //return exception
}
?>
