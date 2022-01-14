<?php
ini_set("error_reporting", 0);

session_start();
$asl = $_SESSION["asl"];

//mi connetto al db
include '../require_conn.php';

//includo le funzioni di base
include '../functions/functions.php';

//setto bit errore a 0
$errore = 0;

//recupero i dati in POST

$giorno1 = $_POST['giorno1'];
$orario1 = $_POST['orario1'];
$giorno2 = $_POST['giorno2'];
$orario2 = $_POST['orario2'];

$oggi = date('d/m/Y');
$adesso = date('H:i:s');


//dati per unit test
/*
$giorno1 = '13/03/2020';
$orario1 = '16:00:00';
$giorno2 = '16/03/2020';
$orario2 = '16:13:00';
$asl = '10';
*/



//utilizzo la funzione di riformattazione data di "functions.php"
$giorno1r = reformatDateEN($giorno1);
$giorno2r = reformatDateEN($giorno2);

$oggir = reformatDateEN($oggi);


//inizializzo il risultato senza errori
$errore = 0;

//---
if (strtotime($giorno1r) < strtotime($oggir))
{
//	echo "la data di partenza è antecenddente alla data attuale";
	$errore = 1;
}
//---
if (strtotime($giorno1r) == strtotime($oggir))
{
	//se la data di partenza coincide con il giorno attuale
	if (strtotime($orario1) < strtotime($adesso))
	{
		//e se l'ora di partenza è antecedente a quella attuale
		//$errore = 2;
		$errore = 1;
	}
}
//---
if (strtotime($giorno2r) < strtotime($giorno1r))
{
	//se la data di ritorno è precedente alla data di partenza
	//$errore = 3;
	$errore = 1;
}
//---
if (strtotime($giorno1r) == strtotime($giorno2r))
{
	//se la data di partenza coincide con la data di ritorno
	if (strtotime($orario2) < strtotime($orario1))
	{
		//e se l'ora di ritorno  è antecedente a quella di partenza
		//$errore = 4;
		$errore = 1;
	}
}
//---
//Se asl == 10 e data rientro maggiore di 2 giorni allora $errore = 1;

$diff_giorno = floor((strtotime($giorno2r) - strtotime($giorno1r)) / 86400);

if(($asl==10)&&($diff_giorno>1))
{
	//echo "asl == 10 e data rientro maggiore di 2 giorni";
	$errore = 1;
}	

//ritorno l'array
//echo "errore:";
echo json_encode($errore);


/*

//calcolo la differenza tra i giorni
$diff_giorno = floor((strtotime($giorno2r) - strtotime($giorno1r)) / 86400);

//inizializzo il risultato senza errori
$errore = 0;

if (strtotime($giorno1r) == strtotime($oggir))
{
	//se la data di partenza coincide con il giorno attuale
	if (strtotime($orario1) < strtotime($adesso))
	{
		//se l'ora partenza è antecedente a quella attuale
		$errore = 1;
	}
}
else
{
	if ($diff_giorno == 0) 
	{
		//se il giorno coincide calcolo la differenza tra orari
		$orario1 = strtotime($orario1);
		$orario2 = strtotime($orario2);
		
		$differenza_orari = $orario2 - $orario1;
		 
		if ($differenza_orari < 1) 
		{
			//se la differenza è negativa allora devo trasmettere errore
			//setto bit errore    
			$errore = 1;
		}
		else 
		{
			//altrimenti gli orari vanno bene
			$errore = 0;
		}
	}
	elseif ($diff_giorno < 0) 
	{
		//se invece la differenza tra i giorni è negativa setto subito il bit dell'errore
		$errore = 1;
	}
	elseif (strtotime($giorno1r) < strtotime($oggir))
	{
		//data iniziale antecedente alla data odierna setto bit errore a 1
		$errore = 1;
	}
	else 
	{
		//altrimenti tutto va bene
		$errore = 0;
	}
}

//ritorno l'array
echo json_encode($errore);
*/
