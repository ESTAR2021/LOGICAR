<?php


//recupero i dati
ini_set("error_reporting",0);
//ini_set("error_reporting",E_ALL);
//if(isset($_POST['identificativo']) ){
$identificativo=$_POST['identificativo'];
	

include '../functions/functions.php';

//mi connetto al db
include '../require_conn.php';

//ricavo alcune variabili di sessione

 session_start();
 $matricola_utente=$_SESSION['matricola'];
 $cognome_utente=$_SESSION['cognome'];
 $nome_utente=$_SESSION['nome'];
 $email_utente=$_SESSION['email'];

/*
 $identificativo='171';
 $matricola_utente='554';
 $cognome_utente='falanga';
 $nome_utente='massimo';
 $email_utente='massimiliano.falanga@estar.toscana.it';
*/
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

        // decremento di 1 i passeggeri di andata e quelli di ritorno
				$sql = "UPDATE `viaggi_pianificati` SET passeggeri_andata=passeggeri_andata-1,passeggeri_ritorno=passeggeri_ritorno-1  where id='$identificativo'";
				
				$conn->exec($sql);
				


				// creo il messaggio di avviso da inviare al titolare della prenotazione			
				$statement = $conn->prepare("SELECT  CONCAT ('$nome_utente',' ', '$cognome_utente', ' ha annullato la partecipazione al viaggio del ', DATE_FORMAT(giorno_partenza,'%d/%m/%Y'), ' presso: ',comune_destinazione ) as avviso, matricola as utente, email FROM vista_viaggi where id_viaggio_pianificato='$identificativo'");
			
				$statement->execute();
				if($row=$statement->fetch()){

						$avviso= $row['avviso'];
						$email= $row['email'];
						$utente= $row['utente'];
						
				}else{
					 $conn->rollback(); exit();
				}
									
		
				$sql = "INSERT INTO `avvisi`( `utente`, `avviso`, `stato`) VALUES ( '$utente', '$avviso',0)";
				$conn->exec($sql);
				$sql = "DELETE FROM viaggi_aggregati where id_viaggio_pianificato='$identificativo' and id_utente='$matricola_utente'";
				$conn->exec($sql);
//				 session_start();
//				$matricola_utente=$_SESSION['matricola'];
				$sql_quote= $conn->quote($sql);
				$sql =' INSERT INTO `log_azioni`( `query`, `matricola_utente`, `id_scheda`) VALUES("'.$sql_quote.'" ,"'.$matricola_utente.'","'.$identificativo.'")';
				$conn->exec($sql);
				
				$conn->commit();

			
				if($email!='' and $email!='#N/D' and $email!='NULL'){
					$altBody = '';
					$body = $avviso;			
					$A[0]=$email;
					$CC[0]=$email_utente;
					include('../../../phpmailinclude.php');

				}
    }
catch(PDOException $e)
    {
		 $conn->rollback ();
    echo $sql . "<br>" . $e->getMessage();
    }

$conn = null;

