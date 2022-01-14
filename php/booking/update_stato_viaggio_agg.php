<?php

//recupero i dati
ini_set("error_reporting",0);
if(isset($_POST['identificativo']) ){
$identificativo=$_POST['identificativo'];
	


include '../functions/functions.php';

//mi connetto al db
include '../require_conn.php';

//scrivo i valori
$subject = 'EMAIL AVVISO LOGICAR';

$A = array();
$CC = array();
$CCN = array();
$avviso = '';
$email = '';
try {
			$conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
			$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			 $conn->beginTransaction();
			 $statement = $conn->prepare("SELECT passeggeri, viaggio, prenotazione_andata, prenotazione_ritorno FROM pren_prenotazioni p, viaggi_condivisi where p.id='$identificativo' and viaggi_condivisi.prenotazione=p.id");
			 $statement->execute();
			  while($row=$statement->fetch()){	
			  $passeggeri=$row['passeggeri'];
			  $viaggio=$row['viaggio'];
			  $prenotazione_andata=$row['prenotazione_andata'];
			  $prenotazione_ritorno=$row['prenotazione_ritorno'];
			  }			  
			
			if($viaggio!=0){
			$sql = "UPDATE `viaggi_pianificati` SET passeggeri_andata=passeggeri_andata-$passeggeri,passeggeri_ritorno=passeggeri_ritorno-$passeggeri  where idprenotazione='$viaggio'";
							$conn->exec($sql);
			
				$statement = $conn->prepare("SELECT  CONCAT (nome,' ', cognome, ' ha annullato la partecipazione al viaggio del ', DATE_FORMAT(p1.giorno_partenza,'%d/%m/%Y'), ' presso: ',p1.comune_destinazione ) FROM autisti,  pren_prenotazioni p1,   pren_prenotazioni p2 where p1.id='$viaggio' and autisti.matricola=p2.utente  and p2.id='$identificativo'");
						
				$statement->execute();
				if($row=$statement->fetch()){

						$avviso= $row[0];
				}else{
					 $conn->rollback(); exit();
				}
					$statement = $conn->prepare("SELECT  utente, email FROM pren_prenotazioni,autisti where autisti.matricola=pren_prenotazioni.utente and pren_prenotazioni.id='$viaggio'");
						
					$statement->execute();
					if($row=$statement->fetch()){

						$email= $row['email'];
						$utente= $row['utente'];
				}else{
				 $conn->rollback(); exit();
				}
					

					
		
			} else{
				
				
				if($prenotazione_andata!=0){
					$sql = "UPDATE `viaggi_pianificati` SET passeggeri_andata=passeggeri_andata-$passeggeri where idprenotazione='$prenotazione_andata'";
					$conn->exec($sql);
					

							$statement = $conn->prepare("SELECT  CONCAT (nome,' ', cognome, ' ha annullato la partecipazione al viaggio di ANDATA del ', DATE_FORMAT(p1.giorno_partenza,'%d/%m/%Y'), ' presso: ',p1.comune_destinazione ) FROM autisti,  pren_prenotazioni p1,   pren_prenotazioni p2 where p1.id='$prenotazione_andata' and autisti.matricola=p2.utente  and p2.id='$identificativo'");		
							$statement->execute();
							if($row=$statement->fetch()){

									$avviso= $row[0];
							}else{
								 $conn->rollback(); exit();
							}
								$statement = $conn->prepare("SELECT  utente, email FROM pren_prenotazioni,autisti where autisti.matricola=pren_prenotazioni.utente and pren_prenotazioni.id='$prenotazione_andata'");
									
								$statement->execute();
								if($row=$statement->fetch()){

									$email= $row['email'];
									$utente= $row['utente'];
							}else{
							 $conn->rollback(); exit();
							}
								


					
					
					}
					if($prenotazione_ritorno!=0){
							$sql = "UPDATE `viaggi_pianificati` SET passeggeri_ritorno=passeggeri_ritorno-$passeggeri where idprenotazione='$prenotazione_ritorno'";
							$conn->exec($sql);
							
							
						$statement = $conn->prepare("SELECT  CONCAT (nome,' ', cognome, ' ha annullato la partecipazione al viaggio di RITORNO del ', DATE_FORMAT(p1.giorno_partenza,'%d/%m/%Y'), ' presso: ',p1.comune_destinazione ) FROM autisti,  pren_prenotazioni p1,   pren_prenotazioni p2 where p1.id='$prenotazione_ritorno' and autisti.matricola=p2.utente  and p2.id='$identificativo'");		
						$statement->execute();
						if($row=$statement->fetch()){

								$avviso= $row[0];
						}else{
							 $conn->rollback (); exit();
						}
							$statement = $conn->prepare("SELECT  utente, email FROM pren_prenotazioni,autisti where autisti.matricola=pren_prenotazioni.utente and pren_prenotazioni.id='$prenotazione_ritorno'");
								
							$statement->execute();
							if($row=$statement->fetch()){

								$email= $row['email'];
								$utente= $row['utente'];
						}else{
						 $conn->rollback (); exit();
						}			
							
			
			
					}
			
			}
				$sql = "INSERT INTO `avvisi`( `utente`, `avviso`, `stato`) VALUES ( '$utente', '$avviso',0)";
				$conn->exec($sql);
				$sql = "DELETE FROM viaggi_condivisi where prenotazione='$identificativo'";
				$conn->exec($sql);
				 session_start();
				$matricola_utente=$_SESSION['matricola'];
				$sql_quote= $conn->quote($sql);
				$sql =' INSERT INTO `log_azioni`( `query`, `matricola_utente`, `id_scheda`) VALUES("'.$sql_quote.'" ,"'.$matricola_utente.'","'.$identificativo.'")';
				$conn->exec($sql);
				
				$conn->commit();
				
				if($email!='' and $email!='#N/D' and $email!='NULL'){
					$altBody = '';
					$body = $avviso;			
					$A[0]=$email;
					
					include('../../../phpmailinclude.php');
				}
    }
catch(PDOException $e)
    {
		 $conn->rollback ();
    echo $sql . "<br>" . $e->getMessage();
    }

$conn = null;
}else{
	echo 0;
}

?>