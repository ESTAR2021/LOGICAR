<?php
session_start();

//---
if (!isset($_SESSION['amministrativo'])) {	exit; }
if ($_SESSION['amministrativo'] <> '1') {	exit; }
//----

if (empty($_SESSION)) 
{
     echo "nessuna variabile di sessione presente";
}
else
{
	//---
	//print_r($_SESSION);
	//---
	echo '<table border="1">';
	foreach($_SESSION as  $x => $x_value)
	{
		echo '<tr>';
		echo '<td>' . $x . '</td>';
		echo '<td>' . $x_value . '</td>';
		echo '</tr>';
	}
	echo '</table>';
	//---
}
