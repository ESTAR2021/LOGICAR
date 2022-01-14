<?php
ini_set("error_reporting", 0);
//mi connetto al db
include '../require_conn.php';
session_start();
if (isset($_SESSION['pianificazione'])) {
    $pianificazione = $_SESSION['pianificazione'];
	$asl=$_SESSION['asl'];
} else {
	echo 0;
    exit();
}

$rows = array();
//leggo i valori
//echo ("<br>" .$pianificazione);
try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $statement = $conn->prepare("select *, parco.id AS idauto, 
			STR_TO_DATE(concat(p1.giorno_partenza,' ',p1.ora_partenza),'%Y-%m-%d %H:%i:%s') as partenza,
			STR_TO_DATE(concat(p1.giorno_ritorno,' ',p1.ora_ritorno),'%Y-%m-%d %H:%i:%s')	as ritorno
			from  marca
			INNER JOIN auto 
			INNER JOIN parco 
			LEFT JOIN modello ON modello.id=auto.id_modello 
			INNER JOIN pren_prenotazioni p1 ON auto.id=parco.id_auto and
			marca.id=auto.id_marca and parco.id_azienda=p1.azienda and parco.sede=p1.sede_partenza 
			and p1.id='$pianificazione'  and posti>=passeggeri and parco.prenotabile=1 and parco.data_cancellazione is null
			ORDER BY parco.id ASC
		");
    $statement->execute();
    $i = 0;
    while ($row = $statement->fetch()) {
        $id_auto=$row['idauto'];
        $sede_partenza=$row['sede_partenza'];
        $partenza=$row['partenza'];
        $ritorno=$row['ritorno'];
		$n=0;
		if ($asl==10){ // SOLO IN CASO DI ESTAR IN CUI LE AUTO DI PRENOTAZIONI NON CONFERMATE NON POSSONO ESSERE VISTE
		$statement2 = $conn->prepare("select COUNT(*) AS n from pren_auto pa, pren_prenotazioni pp, viaggi_pianificati
								where
								pa.prenotazione=pp.id and viaggi_pianificati.idprenotazione=pp.id
								and (stato!=2 and stato!=5)
								and pa.auto='$id_auto' and
								pp.sede_partenza='$sede_partenza' and 
								(STR_TO_DATE('$partenza','%Y-%m-%d %H:%i:%s') - INTERVAL 1 HOUR <
									STR_TO_DATE(concat(pp.giorno_ritorno,' ',pp.ora_ritorno),'%Y-%m-%d %H:%i:%s') 
											AND
								STR_TO_DATE('$ritorno','%Y-%m-%d %H:%i:%s') + INTERVAL 1 HOUR >
									STR_TO_DATE(concat(pp.giorno_partenza,' ',pp.ora_partenza),'%Y-%m-%d %H:%i:%s') 
								)");
			$statement2->execute();
			if ($row2 = $statement2->fetch()) {
				$n=$row2['n'];
				
			}
		}	
			$statement3 = $conn->prepare("select COUNT(*) AS n from auto_riservate
								where
								id_parco='$id_auto' and
								(STR_TO_DATE('$partenza','%Y-%m-%d %H:%i:%s') - INTERVAL 1 HOUR <
									 fine
								AND
								STR_TO_DATE('$ritorno','%Y-%m-%d %H:%i:%s') + INTERVAL 1 HOUR >
									inizio
								)");
	
			$statement3->execute();
			if ($row3 = $statement3->fetch()) {
				$n+=$row3['n'];
		
			}
			if($n==0){
			
				$rows[$i] = array();
				$rows[$i] = $row;
				$i++;
			
			}
			
	}

	


    $rows['dimensione'] = $i;

//ritorno l'array
   echo json_encode($rows);
} catch (Exception $e) {
    return $e->getMessage(); //return exception
}
?>
