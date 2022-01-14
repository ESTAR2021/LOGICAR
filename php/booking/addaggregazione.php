<?php
ini_set("error_reporting",0);
//recupero i dati
$idscelto=$_POST['idscelto'];
/*$orario1=$_POST['orario1'];
$giorno2=$_POST['giorno2'];
$orario2=$_POST['orario2'];
$comune=$_POST['comune'];
$indirizzo=$_POST['indirizzo'];*/
//---

//---
session_start();

if(isset($_SESSION['matricola']) && isset($_SESSION['email']) && isset($_SESSION['nome']) && isset($_SESSION['cognome'])){
	$id_aggregato=$_SESSION['matricola'];
	$email_aggregato=$_SESSION['email'];
	$nome_aggregato=$_SESSION['nome'];
	$cognome_aggregato=$_SESSION['cognome'];
}else{
	echo 0;
	exit();
}

/*
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
*/

//mi connetto al db
include '../require_conn.php';

//scrivo i valori
/*if(isset ($_SESSION['pianificazione'])){
	$idPian=$_SESSION['pianificazione'];
}*/
try { 
			
		   $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
           $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

		   $statement = $conn->prepare("SELECT  CONCAT ('$nome_aggregato',' ','$cognome_aggregato', ' ti sei aggregato al viaggio di ',nome,' ',cognome,' del ', DATE_FORMAT(giorno_partenza,'%d/%m/%Y'), ' presso: ',comune_destinazione ),email FROM vista_viaggi where id_viaggio_pianificato='$idscelto'");		
		   $statement->execute();
		   if($row=$statement->fetch()){
 			$avviso= $row[0];
			$email= $row[1];
		   };

//	$avviso= 'prova';		
			   $sql = "INSERT INTO viaggi_aggregati (id_utente, id_viaggio_pianificato) values(
			   '$id_aggregato','$idscelto')";
				$conn->exec($sql);
//				$id = $conn->lastInsertId();
//				$_SESSION['pianificazione']=$id;
//				$sql2= "UPDATE viaggi_pianificati set passeggeri=passeggeri+1 where id='$idscelto'";
				$sql2 = "UPDATE `viaggi_pianificati` SET `passeggeri_andata`=`passeggeri_andata`+1,`passeggeri_ritorno`=`passeggeri_ritorno`+1 WHERE id='$idscelto'";
				$conn->exec($sql2);				
				if($conn){
					$altBody = '';
					$subject = 'Avviso utente aggregato';
					$body = $avviso;			
					$A[0]=$email_aggregato;
					$CC[0]=$email;						
					include('../../../phpmailinclude.php');
					echo 1;
				}else{
					$conn->rollback ();
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