<?php

//mi connetto al db
include 'require_conn.php';
$tipo_sel=$_POST['tipo_sel'];
$azienda_sel=$_POST['azienda_sel'];
$provincia_sel=$_POST['provincia_sel'];

//leggo i valori

try {
	$conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
	$statement = $conn->prepare("SELECT DISTINCT s.comune FROM sedi as s WHERE s.tipo LIKE '$tipo_sel' AND s.asl = $azienda_sel AND s.provincia LIKE '$provincia_sel'");
	$statement->execute();

	while($row=$statement->fetch()){
		//ritorno i dati per popolare la select. Per ogni opzione viene impostato il valore numerico ID
		echo "<option value=" . $row['comune'] . ">". $row['comune'] . "</option>";
	}

}
catch (Exception $e){
	return $e->getMessage(); //return exception
}
?>
