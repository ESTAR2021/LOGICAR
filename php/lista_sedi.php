<?php
ini_set("error_reporting",0);
//mi connetto al db
include 'require_conn.php';
$rows=array();
//leggo i valori
session_start();
$asl = $_SESSION['asl'];	//recupero l'asl dalla sessione
$zone = $_SESSION['zoneselezionate'];
$WHEREZONA=TRUE;
if(isset($_SESSION['zoneselezionate']) && !empty($_SESSION['zoneselezionate'])) $WHEREZONA='tab_comune_usl.cdzona IN ('.$zone.')';

try {
    /**
     * La query si occupa di reperire tutte le sedi relative all'azienda in sessione.
	 * Inoltre si esegue una left join con la tabella parco auto per verificare l'associazione
	 * della sede ad una delle auto presenti nel parco.
	 * L'attributo 'associata' sarà il risultato di un count su un attributo della tabella parco
	 * e se null non verrà conteggiato
	 * count(p.sede)
     */
	$sql="SELECT s.id, s.tipo, a.azienda, c.provincia, c.denominazione, c.codice, s.indirizzo, 
		         (CASE WHEN (SELECT count(*) FROM parco WHERE parco.sede = s.id)>0 THEN 1
		         	 WHEN (SELECT count(*) FROM autisti WHERE autisti.sede_lavoro = s.id) > 0 THEN 1 
		         	 ELSE 0
		         END) AS associata
		 FROM sedi AS s  JOIN aziende AS a ON (s.asl=a.id)
		 				 JOIN comuni_italiani AS c ON (s.cod_comune=c.codice)
						 LEFT JOIN tab_comune_usl ON s.cod_comune=tab_comune_usl.cdcmn
		 WHERE s.asl='$asl' AND s.attiva = '1' AND $WHEREZONA 
		 GROUP BY s.id, s.tipo, a.azienda, c.provincia, c.denominazione, c.codice, s.indirizzo
		 ORDER BY c.provincia,s.indirizzo";
//		 ORDER BY a.azienda,s.tipo"; //modificato per vedere, nel registro chiavi l'elenco delle sedi ordinato


	$conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
	$statement = $conn->prepare($sql);
	if(!$statement->execute()){
		returnError(print_r($statement->errorInfo()),JSON_RESP);
	}
	$i=0;
	while($row=$statement->fetch()){
		$rows[$i]=array();
		$rows[$i]=$row;
		$i++;
	}
	$rows['dimensione']=$i; //passo la dimensione dell'array al js "tabella.js"
	$rows['asl']=$asl;		//passo anche il numero dell'azienda
	//ritorno l'array
	echo json_encode($rows);
}
catch (Exception $e){
	returnError("Errore nella connessione al db: ".$e->getMessage(),JSON_RESP);
}
?>
