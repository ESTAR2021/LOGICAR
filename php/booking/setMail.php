<?php
ini_set("error_reporting",0);
//mi connetto al db
include '../require_conn.php';
session_start();
if(isset($_SESSION['matricola']) && isset($_POST['aggiorna_mail'])  ){
	$utente=$_SESSION['matricola'];
	$aggiorna_mail=$_POST['aggiorna_mail'];
}else{
	echo -1;
	exit();
}

$rows=array();
//leggo i valori
try {
	$conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
	$statement = $conn->prepare("UPDATE autisti SET email='$aggiorna_mail'
								 WHERE matricola='$utente'  ");
						
	$statement->execute();
	$count = $statement->rowCount();

	if($count =='0'){
		$statement = $conn->prepare("SELECT email FROM autisti
								 WHERE matricola='$utente' and email='$aggiorna_mail' ");
						
		$statement->execute();
		if($row=$statement->fetch()){

		echo $row['email'];
	}else{
	echo -1;}
	}
	else{
		echo $aggiorna_mail;
	}
	
}
catch (PDOException $e){
	echo -1;
	return $e->getMessage(); //return exception
}
?>
