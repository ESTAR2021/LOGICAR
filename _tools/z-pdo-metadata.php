<?php
session_start();
//---
if (!isset($_SESSION['amministrativo'])) {	exit; }
if ($_SESSION['amministrativo'] <> '1') {	exit; }
//----

include '../php/require_conn.php';

$conn = array(
	'host' => 'mysql',
	'server' => $servername,
	'database' => $dbname,
	'username' => $username,
	'password' => $password
);

function getTables($connection)
{
	//---
	$host = $connection['host'];
	$server = $connection['server'];
	$database = $connection['database'];
	$username = $connection['username'];
	$password = $connection['password'];	
	//connessione al db
	$pdo = new PDO($host.':host='.$server.';dbname='.$database,$username,$password);
	//esegue la query per estrarre le tabelle
	$statement = $pdo->query('SHOW TABLES;');
	$result = $statement->fetchAll(PDO::FETCH_ASSOC);
	//---
	//print_r($result);
	$k = 'Tables_in_'.$database;
	$n = count($result);
	$tabelle = array();
	for($i=0;$i<$n;$i++)
	{
		//echo $result[$i][$k];
		$tabelle[$i] = $result[$i][$k]; 
	}
	return $tabelle;
	//chiude la connessione
	$pdo->connection = null;
}

function printTables($connection)
{
	//---
	$host = $connection['host'];
	$server = $connection['server'];
	$database = $connection['database'];
	$username = $connection['username'];
	$password = $connection['password'];	
	//connessione al db
	$pdo = new PDO($host.':host='.$server.';dbname='.$database,$username,$password);
	//esegue la query per estrarre le tabelle
	$statement = $pdo->query('SHOW TABLES;');
	$result = $statement->fetchAll(PDO::FETCH_ASSOC);
	//---
	$k = 'Tables_in_'.$database;
	$n = count($result);
	echo '<h1>Tabelle database: '.$database.'</h1>';
	echo '<table border="1">';
	echo '<tr><td><strong>Nome Tabella</strong></td></tr>';
	for($i=0;$i<$n;$i++)
	{
		echo '<tr><td>'.$result[$i][$k].'</td></tr>';
	}
	echo '</table>';
	echo '<br><br>';
	//chiude la connessione
	$pdo->connection = null;
}

function printColumns($connection,$tablename)
{
	//---
	$host = $connection['host'];
	$server = $connection['server'];
	$database = $connection['database'];
	$username = $connection['username'];
	$password = $connection['password'];	
	//connessione al db
	$pdo = new PDO($host.':host='.$server.';dbname='.$database,$username,$password);
	//esegue la query per estrarre le tabelle
	$statement = $pdo->query('SHOW COLUMNS FROM '.$database.'.'.$tablename);
	$result = $statement->fetchAll(PDO::FETCH_ASSOC);
	//print_r($result);
	//---
	$n = count($result);
	$campi = array();
	echo '<p><strong>Tabella: '.$tablename.'</strong></p>';
	echo '<table border="1">';
	echo '<tr>';
	echo '<td><strong>Field</strong></td>';
	echo '<td><strong>Type</strong></td>';
	echo '<td><strong>Null</strong></td>';
	echo '<td><strong>Key</strong></td>';
	echo '<td><strong>Default</strong></td>';
	echo '<td><strong>Extra</strong></td>';
	echo '</tr>';
	for($i=0;$i<$n;$i++)
	{
		//echo $result[$i][$k];
		//$campi[$i] = $result[$i]['Field']; 
		echo '<tr>';
		echo '<td>'.$result[$i]['Field'].'</td>';
		echo '<td>'.$result[$i]['Type'].'</td>';
		echo '<td>'.$result[$i]['Null'].'</td>';
		echo '<td>'.$result[$i]['Key'].'</td>';
		echo '<td>'.$result[$i]['Default'].'</td>';
		echo '<td>'.$result[$i]['Extra'].'</td>';
		echo '</tr>';
	}
	echo '</table>';
	echo '<br><br>';
	//chiude la connessione
	$pdo->connection = null;
}

//---------------------------------


printTables($conn);

$tabelle = getTables($conn);
$n = count($tabelle);
for($i=0;$i<$n;$i++)
{
	printColumns($conn,$tabelle[$i]);	
}
