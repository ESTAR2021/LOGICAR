<?php

ini_set("error_reporting",0);

//leggo la sessione utente
session_start();
$azienda_ute = $_SESSION['asl'];	//recupero l'asl dalla sessione
$id_auto = $_POST['myidauto'];	//recupero l'asl dalla sessione

//mi connetto al db
include 'require_conn.php';
$rows=array();
//leggo i valori
$i=0;
		   try { 
		   $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);

//vado sulla tabella delle rca a recuperare l'eventuale ultima polizza e l'ultima classe di merito
		   $statementcount = $conn->prepare("select rca.*, DATE_FORMAT(rca.giorno_copertura, '%d/%m/%Y') as giorno_format, rca_classe.*, rca.ID AS idrca, rca_pagamenti.id AS idpag FROM rca INNER JOIN rca_classe INNER JOIN rca_pagamenti ON rca.ID=rca_classe.id_rca AND rca.ID=rca_pagamenti.id_rca WHERE rca.id_auto='$id_auto' and rca.data_cancellazione is null ORDER BY rca.ID DESC, rca_classe.id DESC");
		     $statementcount->execute();
		  
		    while($rowcount=$statementcount->fetch()){

//se trova risultati, setto il bit a 1
			$quanti=1;
			$giorno=$rowcount['giorno_format'];
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
	
						

		   $rows[$i]['compagnia'] = $compagnia;
		   $rows[$i]['giorno'] = $giorno;
		   $rows[$i]['agenzia'] = $agenzia;
		   $rows[$i]['massimale'] = $massimale;
		   $rows[$i]['scadenza'] = $scadenza;
		   $rows[$i]['importo'] = $importo;
		if($furto){
			$rows[$i]['furto'] = 'Si';
		}else{
			$rows[$i]['furto'] = 'No';
		}
		if(£incendio){
			$rows[$i]['incendio'] = 'Si';
		}else{
			$rows[$i]['incendio'] = 'No';
		}


		   $rows[$i]['numero_polizza'] = $numero_polizza;
		   $rows[$i]['classe'] = $classe;
		   $rows[$i]['idrca'] = $idrca;
		   $rows[$i]['note'] = $note;


$i++;
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
