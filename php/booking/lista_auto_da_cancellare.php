<?php
ini_set("error_reporting", 0);
//mi connetto al db
include '../require_conn.php';
session_start();
if (isset($_POST['riserva'])) {
    $riserva = $_POST['riserva'];
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
		
		 $statement2 = $conn->prepare("select *, parco.id AS idauto from  marca INNER JOIN auto INNER JOIN parco LEFT JOIN modello
					ON modello.id=auto.id_modello  INNER JOIN pren_prenotazioni p1 ON auto.id=parco.id_auto and
					marca.id=auto.id_marca and parco.id_azienda=p1.azienda and parco.sede=p1.sede_partenza  and p1.id='$pianificazione'  and
					parco.id not in(select pa.auto from pren_auto pa, pren_prenotazioni pp where pa.prenotazione=pp.id
					and pp.giorno_partenza = p1.giorno_partenza and pa.del=0) and
					parco.id not in (select id_parco from auto_riservate where 
					STR_TO_DATE(concat(p1.giorno_partenza,' ',p1.ora_partenza),'%Y-%m-%d %H:%i:%s')
					BETWEEN inizio AND fine or STR_TO_DATE(concat(p1.giorno_ritorno,' ',p1.ora_ritorno),'%Y-%m-%d %H:%i:%s') BETWEEN inizio AND fine) 
					ORDER BY parco.id DESC LIMIT 1;
					
					");

		$statement2->execute();
		if ($row2 = $statement2->fetch()) {
			$rows[$i]['operazioni']='ASSOCIA AUTO LIBERA';	
		}else{
			 $statement3 = $conn->prepare("select * from pren_prenotazioni p1 , pren_prenotazioni p2, viaggi_pianificati v, pren_auto pa , autisti where 
					v.idprenotazione=p1.id 
					and v.stato=1 and pa.prenotazione=p1.id and pa.auto and p1.giorno_partenza=p2.giorno_partenza and
					p1.giorno_ritorno = p2.giorno_ritorno and p2.id='$pianificazione' and p1.id!=p2.id
					and autisti.matricola=p1.utente
					ORDER BY `v`.`idprenotazione` DESC LIMIT 1;
					
					");
	
		$statement3->execute();
		if ($row2 = $statement3->fetch()) {
			$rows[$i]['operazioni']='ASSOCIA AUTO DI: '.$row2['nome'].' '.$row2['cognome'].' presa per '.$row2['motivo_viaggio'];	
		}else{
			$rows[$i]['operazioni']='CANCELLA PRENOTAZIONE';
		}
		}
     
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
