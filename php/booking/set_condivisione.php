<?php

//recupero i dati
ini_set("error_reporting",0);
session_start();
if(isset($_SESSION['pianificazione'])){
	$pianificazione=$_SESSION['pianificazione'];
}else{
	echo 0;
	exit();
}
if(isset($_POST['idauto'])){
	$idauto=$_POST['idauto'];
}







include '../functions/functions.php';

//mi connetto al db
include '../require_conn.php';

//scrivo i valori

try {
		   $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
           $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		   $conn->beginTransaction();
		
		   
			$sql = "DELETE FROM `pren_auto`WHERE `prenotazione`='$pianificazione'";
			$conn->exec($sql);
			$sql = "INSERT INTO `pren_auto`(`prenotazione`, `auto`, `titolare`) VALUES ('$pianificazione','$idauto',0)";
			$conn->exec($sql);
			
			if($conn){
	
			if(isset($_POST['viaggio'])){
				$viaggio=$_POST['viaggio'];
				$sql2 = "UPDATE `viaggi_pianificati` SET passeggeri_andata=passeggeri_andata+(select passeggeri from pren_prenotazioni where id='$pianificazione'),passeggeri_ritorno=passeggeri_ritorno+(select passeggeri from pren_prenotazioni where id='$pianificazione')  where idprenotazione='$viaggio'";
			$conn->exec($sql2);
			}
			if(isset($_POST['viaggio_andata'])){
				$viaggio_andata=$_POST['viaggio_andata'];
				$sql2 = "UPDATE `viaggi_pianificati` SET passeggeri_andata=passeggeri_andata+(select passeggeri from pren_prenotazioni where id='$pianificazione') where idprenotazione='$viaggio_andata'";
			$conn->exec($sql2);
			}

			if(isset($_POST['viaggio_ritorno'])){
				$viaggio_ritorno=$_POST['viaggio_ritorno'];
				$sql2 = "UPDATE `viaggi_pianificati` SET passeggeri_ritorno=passeggeri_ritorno+(select passeggeri from pren_prenotazioni where id='$pianificazione') where idprenotazione='$viaggio_ritorno'";
			$conn->exec($sql2);
			}
						
		
					$sql3 = "INSERT INTO `viaggi_condivisi`(`viaggio`, `prenotazione`, prenotazione_andata, prenotazione_ritorno) VALUES
					('$viaggio','$pianificazione','$viaggio_andata','$viaggio_ritorno')";
						
					$conn->exec($sql3);
		
					if(isset($_POST['viaggio'])){
						
							$statement = $conn->prepare("SELECT  CONCAT (nome,' ', cognome, ' partecipa al tuo viaggio del ', DATE_FORMAT(p2.giorno_partenza,'%d/%m/%Y'), ' presso: ',p2.comune_destinazione ) FROM autisti, viaggi_condivisi, pren_prenotazioni p1, pren_prenotazioni p2 where p1.id='$pianificazione' and autisti.matricola=p1.utente and viaggi_condivisi.prenotazione=p1.id and viaggi_condivisi.viaggio=p2.id");		
							$statement->execute();
							if($row=$statement->fetch()){

									$avviso= $row[0];
							}else{
								 $conn->rollback(); exit();
							}
								$statement = $conn->prepare("SELECT utente, email FROM autisti, pren_prenotazioni WHERE autisti.matricola=pren_prenotazioni.utente and pren_prenotazioni.id='$viaggio'");
									
								$statement->execute();
								if($row=$statement->fetch()){

									$email= $row['email'];
									$utente= $row['utente'];
							}else{
							 $conn->rollback(); exit();
							}
						
						
						
					}
				  
					if(isset($_POST['viaggio_ritorno'])){
							$statement = $conn->prepare("SELECT  CONCAT (nome,' ', cognome, ' partecipa al tuo viaggio del ', DATE_FORMAT(p2.giorno_partenza,'%d/%m/%Y'), ' presso: ',p2.comune_destinazione,' nel solo tragitto di RITORNO' ) FROM autisti, viaggi_condivisi, pren_prenotazioni p1, pren_prenotazioni p2 where p1.id='$pianificazione' and autisti.matricola=p1.utente and viaggi_condivisi.prenotazione=p1.id and viaggi_condivisi.prenotazione_ritorno=p2.id");		
							$statement->execute();
							if($row=$statement->fetch()){

									$avviso= $row[0];
							}else{
								 $conn->rollback(); exit();
							}
								$statement = $conn->prepare("SELECT utente, email FROM autisti, pren_prenotazioni WHERE autisti.matricola=pren_prenotazioni.utente and pren_prenotazioni.id='$viaggio_ritorno'");
									
								$statement->execute();
								if($row=$statement->fetch()){

									$email= $row['email'];
									$utente= $row['utente'];
							}else{
							 $conn->rollback(); exit();
							}
							
							
						
					}
					if(isset($_POST['viaggio_andata'])){
						
							$statement = $conn->prepare("SELECT  CONCAT (nome,' ', cognome, ' partecipa al tuo viaggio del ', DATE_FORMAT(p2.giorno_partenza,'%d/%m/%Y'), ' presso: ',p2.comune_destinazione,'  nel solo tragitto di ANDATA' ) FROM autisti, viaggi_condivisi, pren_prenotazioni p1, pren_prenotazioni p2 where p1.id='$pianificazione' and autisti.matricola=p1.utente and viaggi_condivisi.prenotazione=p1.id and viaggi_condivisi.prenotazione_andata=p2.id");		
							$statement->execute();
							if($row=$statement->fetch()){

									$avviso= $row[0];
							}else{
								 $conn->rollback(); exit();
							}
								$statement = $conn->prepare("SELECT utente, email FROM autisti, pren_prenotazioni WHERE autisti.matricola=pren_prenotazioni.utente and pren_prenotazioni.id='$viaggio_andata'");
									
								$statement->execute();
								if($row=$statement->fetch()){

									$email= $row['email'];
									$utente= $row['utente'];
							}else{
							 $conn->rollback(); exit();
							}
							
					}
						
				   $sql = "INSERT INTO `avvisi`( `utente`, `avviso`, `stato`) VALUES ('$utente','$avviso',0)";
				   $conn->exec($sql);
				   
				    $altBody = '';
					$body = $avviso;			
					$A[0]=$email;				
					include('../../../phpmailinclude.php');
					
					
					echo 1;
					$conn->commit();}
					else{echo 0;}
    }
catch(PDOException $e)
    {
	 $conn->rollback ();
    echo $sql . "<br>" . $e->getMessage();
    }

$conn = null;
session_write_close();
?>