<?php
ini_set("error_reporting",0);
//mi connetto al db
include '../require_conn.php';
session_start();
if(isset($_SESSION['matricola'])){
	$utente=$_SESSION['matricola'];
}else{
	echo 0;
	exit();
}
//Tracciatura della pagina
if(isset($_POST['pagina'])){
	$pagina=$_POST['pagina'];
}else{
	$pagina=1;
	//exit();
}
$pagina=(intval($pagina)-1)*10;
$rows=array();
//leggo i valori
try {
	$conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
	$statement = $conn->prepare("SELECT * FROM avvisi WHERE utente='$utente' and stato=0 ORDER BY id DESC 
								LIMIT $pagina,10");
								
			
	
	//filter esclusi dalla query: AND giorno_partenza>=curdate(),AND viaggi_pianificati.stato=0

	$statement->execute();
	$i=0;
	while($row=$statement->fetch()){
		$rows[$i]=array();
		$rows[$i]=$row;
		$i++;
	}

	$rows['dimensione']=$i;

//ritorno l'array
	echo json_encode($rows);
}
catch (Exception $e){
	return $e->getMessage(); //return exception
}
?>
