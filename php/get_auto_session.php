<?php
ini_set("error_reporting",0);
session_start();

//recupero i dati in sessione
$id_auto=$_SESSION['id_auto'];
$marca=$_SESSION['marca'];
$modello=$_SESSION['modello'];
$targa=$_SESSION['targa'];
$alimentazione=$_SESSION['alimentazione'];
$imgmarca=$_SESSION['imgmarca'];
$numerolocale=$_SESSION['numerolocale'];
$fuelcard=$_SESSION['fuelcard'];  

$dati_auto="$marca $modello, targa: $targa, numero locale: $numerolocale";

$lista = array(
    "id_auto" => $id_auto,
    "dati_auto" => $dati_auto,
    "alimentazione" => $alimentazione,
    "imgmarca" => $imgmarca,
	"numerolocale" => $numerolocale,
	"fuelcard" => $fuelcard
);


//ritorno i dati
echo json_encode($lista);


			
		   ?>
