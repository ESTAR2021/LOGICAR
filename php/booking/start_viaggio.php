<?php

//recupero i dati
ini_set("error_reporting",0);
if(isset($_POST['identificativo']) and isset($_POST['stato'])){
	$identificativo=$_POST['identificativo'];
	$stato=$_POST['stato'];

include '../functions/functions.php';

//mi connetto al db
include '../require_conn.php';

//scrivo i valori
	
try {
			$conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
			$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			$sql = "UPDATE `viaggi_pianificati` SET `stato`=$stato WHERE idprenotazione=$identificativo";
			$conn->exec($sql);
			if($conn){
				echo 1;
				
				session_start();
				$_SESSION['viaggio_iniziato']=$identificativo;
				session_write_close();
			}
			else{echo 0;}
	

    }
catch(PDOException $e)
    {
    echo $sql . "<br>" . $e->getMessage();
    }

$conn = null;
}else{
	echo 0;
}
?>