<?php
session_start();
$id_auto=$_POST['id_auto'];
$marca=$_POST['marca'];
$modello=$_POST['modello'];
$targa=$_POST['targa'];
$alimentazione=$_POST['alimentazione'];
$imgmarca=$_POST['imgmarca'];

$_SESSION['id_auto']=$id_auto;
$_SESSION['marca']=$marca;
$_SESSION['modello']=$modello;
$_SESSION['targa']=$targa;
$_SESSION['alimentazione']=$alimentazione;
$_SESSION['imgmarca']=$imgmarca;
?>