<?php

//mi connetto al db
include 'require_conn.php';
$tipo_sel=$_POST['tipo_sel'];

//inizializzo la select con la prima option non cliccabile
echo "  <option value=\"\">Scegli Azienda</option>";
//leggo i valori
try {
	$conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
	$statement = $conn->prepare("SELECT DISTINCT a.id, a.azienda FROM sedi as s JOIN aziende as a ON (s.asl = a.id) WHERE s.tipo LIKE '$tipo_sel'");
	$statement->execute();

	while($row=$statement->fetch()){
		//ritorno i dati per popolare la select
		echo "<option value=" . $row['id'] . ">". $row['azienda'] . "</option>";
	}

}
catch (Exception $e){
	return $e->getMessage(); //return exception
}
?>
