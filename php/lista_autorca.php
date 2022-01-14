<?php

ini_set("error_reporting",0);

//leggo la sessione utente
session_start();
$azienda_ute = $_SESSION['asl'];	//recupero l'asl dalla sessione
$zone = $_SESSION['zoneselezionate'];
$WHEREZONA=TRUE;
if(isset($_SESSION['zoneselezionate']) && !empty($_SESSION['zoneselezionate'])) $WHEREZONA='tab_comune_usl.cdzona IN ('.$zone.')';

//mi connetto al db
include 'require_conn.php';
$rows=array();
//leggo i valori

		   try { 
		   $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
           $statement = $conn->prepare("select *, parco.id AS idauto, auto.id AS idautomod,
		   concat(sedi.indirizzo,'(',denominazione,')') as sede 
		   from parco 
			  INNER JOIN auto
			  INNER JOIN marca 
			  INNER JOIN modello ON marca.id=auto.id_marca 
									AND modello.id=auto.id_modello 
									AND parco.id_auto=auto.id 
			  LEFT JOIN sedi ON parco.sede=sedi.id 
			  LEFT JOIN comuni_italiani ON sedi.cod_comune=comuni_italiani.codice
			  LEFT JOIN tab_comune_usl ON sedi.cod_comune=tab_comune_usl.cdcmn			  
		   WHERE parco.id_azienda LIKE '$azienda_ute' AND $WHEREZONA 
		   ORDER BY parco.id DESC");		   
		   $statement->execute();
		   $i=0;    
		   while($row=$statement->fetch()){
		   $rows[$i]=array();
		   $rows[$i]=$row;  
		   
		   $id_auto=$rows[$i]['idautomod'];
		   $id_parco=$rows[$i]['idauto'];

//vado sulla tabella delle rca a recuperare l'eventuale ultima polizza e l'ultima classe di merito
		   $statementcount = $conn->prepare("select rca.*, rca_classe.*, rca.ID AS idrca, rca_pagamenti.id AS idpag FROM rca INNER JOIN rca_classe INNER JOIN rca_pagamenti ON rca.ID=rca_classe.id_rca AND rca.ID=rca_pagamenti.id_rca WHERE rca.id_auto='$id_parco' ORDER BY rca.ID DESC, rca_classe.id DESC LIMIT 1");
		     $statementcount->execute();
		  
		    while($rowcount=$statementcount->fetch()){

//se trova risultati, setto il bit a 1
			$quanti=1;
			$compagnia=$rowcount['compagnia'];
			$agenzia=$rowcount['agenzia'];
			$massimale=$rowcount['massimale'];
			$scadenza=$rowcount['scadenza'];
			$importo=$rowcount['importo'];
			$furto=$rowcount['furto'];
			$incendio=$rowcount['incendio'];
			$numero_polizza=$rowcount['numero_polizza'];
			$idrca=$rowcount['idrca'];
			$note=$rowcount['note'];
			$classe=$rowcount['classe'];
			$idpag=$rowcount['idpag'];
	
						
					   }
//aggiungo i valori all'array
		   $rows[$i]['quanti'] = $quanti;
		   $rows[$i]['compagnia'] = $compagnia;
		   $rows[$i]['agenzia'] = $agenzia;
		   $rows[$i]['massimale'] = $massimale;
		   $rows[$i]['scadenza'] = $scadenza;
		   $rows[$i]['importo'] = $importo;
		   $rows[$i]['furto'] = $furto;
		   $rows[$i]['incendio'] = $incendio;
		   $rows[$i]['numero_polizza'] = $numero_polizza;
		   $rows[$i]['classe'] = $classe;
		   $rows[$i]['idrca'] = $idrca;
		   $rows[$i]['note'] = $note;
		   $rows[$i]['idpag'] = $idpag;

$i++;

//setto il bit risultati trovati a 0
$quanti=0;
		   		   }
					   
				   
//passo la dimensione dell'array al js "tabella.js"
		 $rows['dimensione']=$i;

		 

//ritorno l'array
echo json_encode($rows);
		}
			catch (Exception $e){
               return $e->getMessage(); //return exception
        }   
		   ?>
