<?php
ini_set("error_reporting",0);
session_start();

//recupero i dati in sessione
$id_auto=$_SESSION['id_auto'];
$marca=$_SESSION['marca'];
$modello=$_SESSION['modello'];
$targa=$_SESSION['targa'];
$alimentazione=$_SESSION['alimentazione'];
$numerolocale=12;//$_SESSION['numerolocale'];


$dati_auto="$marca $modello, targa: $targa";

$lista = array(
    "id_auto" => $id_auto,
    "dati_auto" => $dati_auto,
    "alimentazione" => $alimentazione,
	"numerolocale" => 12, 
//	"numerolocale" => $numerolocale, 
);


//ritorno i dati
echo json_encode($lista);


			
		   ?>
