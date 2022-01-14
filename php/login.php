<?php
ini_set("error_reporting",0);
session_start();

$login=$_POST['matricola'];
$psw=$_POST['psw'];

//mi connetto al db
include 'require_conn.php';
$rows=array();
//leggo i valori

try {
	$conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
	$statement = $conn->prepare("select * FROM autisti WHERE matricola LIKE '$login' AND password LIKE '$psw'");
	$statement->execute();
	$i=0;
	while($row=$statement->fetch()){
		$rows[$i]=array();
		$rows[$i]=$row;
		$trovato="si";
		$_SESSION['matricola']=$rows[$i]['matricola'];
		$i++;
	}


//eseguo il redirect
	if ($trovato=="si"){
		header('Location: ../scheletro.html');

	}

}
catch (Exception $e){
	return $e->getMessage(); //return exception
}
?>
