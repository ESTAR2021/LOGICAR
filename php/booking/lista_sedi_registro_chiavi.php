<?php
ini_set("error_reporting",0);
//mi connetto al db
include '../require_conn.php';
session_start();
if(isset($_SESSION['asl'])){
	$asl=$_SESSION['asl'];
	$provASL=$_SESSION['provinciaASL'];
	$sede_lavoro=$_SESSION['sede_lavoro'];

}else{
	//echo 0;
	//exit();
}

$rows=array();
//leggo i valori inserendo prima la sede di lavoro e poi le altre sedi

try {

	$conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);

	$statement = $conn->prepare("SELECT *, sedi.id as sede_id
								 FROM sedi, `comuni_italiani`
								 WHERE asl='$asl'
								 AND cod_comune=codice
								 and sedi.id in (select distinct sede from parco where prenotabile=1 and data_cancellazione is null)
								and sedi.id=$sede_lavoro");

	$statement->execute();
	$i=0;
	while($row=$statement->fetch()){
		$rows[$i]=array();
		$rows[$i]=$row;
		$i++;
	}

	$statement = $conn->prepare("SELECT *, sedi.id as sede_id
								 FROM sedi, `comuni_italiani`
								 WHERE asl='$asl' AND sedi.id!='$sede_lavoro'
								 AND cod_comune=codice
								 and sedi.id in (select distinct sede from parco where prenotabile=1 and data_cancellazione is null)
								 order by provincia,indirizzo");
	$statement->execute();
	while($row=$statement->fetch()){
		$rows[$i]=array();
		$rows[$i]=$row;
		$i++;
	}


//passo la dimensione dell'array al js "tabella.js"
	$rows['dimensione']=$i;

//ritorno l'array
	echo json_encode($rows);
}
catch (Exception $e){
	return $e->getMessage(); //return exception
}
?>
