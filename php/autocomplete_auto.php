<?php

//mi connetto al db
include 'require_conn.php';


//leggo i valori

	try {
		$conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
		$statement = $conn->prepare("select *, auto.id AS idauto from auto INNER JOIN marca INNER JOIN modello ON marca.id=auto.id_marca AND modello.id=auto.id_modello ORDER BY auto.id DESC");
		$statement->execute();
		$row = $statement->fetch();

		echo json_encode($row);
	}catch (Exception $e){
		return $e->getMessage(); //return exception
	}
	?>
