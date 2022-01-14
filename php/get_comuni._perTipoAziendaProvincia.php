<?php

//mi connetto al db
include 'require_conn.php';
$provincia=$_POST['provincia_sel'];

//leggo i valori

	try {
		$conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
		$statement = $conn->prepare("select id,denominazione from comuni_italiani WHERE provincia=:prov OR metropolitana=:prov");
		$statement->bindValue(':prov',$provincia,PDO::PARAM_STR);
		$statement->execute();


	while($row=$statement->fetch()){
	//ritorno i dati per popolare la select. Per ogni opzione viene impostato il valore numerico ID
	echo "<option value=" . $row['id'] . ">". $row['denominazione'] . "</option>";
		   }

	}
	catch (Exception $e){
		return $e->getMessage(); //return exception
	}
	?>
