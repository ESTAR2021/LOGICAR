<?php
ini_set("error_reporting",0);
//recupero i dati
$giorno1=$_POST['giorno1'];
$orario1=$_POST['orario1'];
$giorno2=$_POST['giorno2'];
$orario2=$_POST['orario2'];
$comune=$_POST['comune'];
$indirizzo=$_POST['indirizzo'];
//---
$comune=str_replace("'","\'",$comune);
$indirizzo=str_replace("'","\'",$indirizzo);  //modificato 24.10.2017
//---
session_start();

if(isset($_SESSION['matricola'])){
	$autista=$_SESSION['matricola'];
}else{
	echo 0;
	exit();
}

if(isset($_SESSION['asl'])){
	$asl=$_SESSION['asl'];
}else{
	echo 0;
	exit();
}
//includo la funzione per riformattare la data
include '../functions/functions.php';

//formatto le date per il db
$giorno1db=reformatDate($giorno1);
$giorno2db=reformatDate($giorno2);

//formatto le ore per il db
$orario1db=reformatHour($orario1);
$orario2db=reformatHour($orario2);


//mi connetto al db
include '../require_conn.php';

//scrivo i valori
if(isset ($_SESSION['pianificazione'])){
	$idPian=$_SESSION['pianificazione'];
}
try { 
			
		   $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
           $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		   if(isset ($_SESSION['pianificazione'])){
		   $statement = $conn->prepare("SELECT count(*) as n FROM  pren_prenotazioni WHERE utente='$autista' and giorno_partenza='$giorno1db'
			and ora_partenza='$orario1db' and comune_destinazione='$comune' and indirizzo_destinazione='$indirizzo' and giorno_ritorno='$giorno2db' and ora_ritorno='$orario2db' and azienda='$asl' and id='$idPian'");
			$statement->execute();
			if($row=$statement->fetch()){
			   $count=$row['n'];  
		   }}else{$count=0;}
			if($count==0){
			   $sql = "INSERT INTO pren_prenotazioni (utente, giorno_partenza,ora_partenza,comune_destinazione,indirizzo_destinazione,giorno_ritorno,ora_ritorno,azienda) values(
			   '$autista','$giorno1db','$orario1db','$comune','$indirizzo','$giorno2db','$orario2db','$asl')";
				$conn->exec($sql);
				$id = $conn->lastInsertId();
				$_SESSION['pianificazione']=$id;
				if($conn){
					echo 1;
				}else{
					echo 0;
				}
				}else{echo 1;}

    }
catch(PDOException $e)
    {
    echo $sql . "<br>" . $e->getMessage();
    }

$conn = null;
session_write_close();
?>