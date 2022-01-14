<?php
ini_set("error_reporting",0);

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
        $sql = "INSERT INTO `attesa_auto`(`prenotazione`,attesa) VALUES ('$pianificazione',1)";
		$conn->exec($sql);
		if($conn){
			echo 1;}
		else{echo 0;}
			
    }
catch(PDOException $e)
    {
    echo $sql . "<br>" . $e->getMessage();
    }

$conn = null;

?>