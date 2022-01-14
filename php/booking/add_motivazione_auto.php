<?php
ini_set("error_reporting",0);

if(isset($_POST['motivazione'])){
	$motivazione=$_POST['motivazione'];
}


session_start();

if(isset($_SESSION['pianificazione'])){
	$pianificazione=$_SESSION['pianificazione'];
}else{
	echo 0;
	exit();
}


include '../functions/functions.php';

//mi connetto al db
include '../require_conn.php';

//scrivo i valori

try {
	$conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
	$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$sql = "UPDATE pren_prenotazioni set motivazione_non_condivisione='$motivazione' where id=$pianificazione";
	$conn->exec($sql);
	if($conn){
		echo 1;
	}else{
		echo 0;
	}

}
catch(PDOException $e)
{
	echo $sql . "<br>" . $e->getMessage();
}

$conn = null;
session_write_close();
?>