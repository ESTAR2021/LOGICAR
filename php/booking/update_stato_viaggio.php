<?php

//---
session_start();
ini_set("error_reporting",0);
include '../functions/functions.php';
include '../require_conn.php';
//---

if(!(isset($_POST['identificativo']) and isset($_POST['stato'])))
{
	echo 0;
	exit;
}

$identificativo = $_POST['identificativo'];
$stato = $_POST['stato'];
$matricola_utente = $_SESSION['matricola'];
$subject = 'EMAIL AVVISO LOGICAR';

//---
$A = array();
$CC = array();
$CCN = array();
$avviso = '';
$email = '';

try 
{
	$conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
	$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$conn->beginTransaction();
	$sql = "UPDATE viaggi_pianificati SET stato='$stato' WHERE idprenotazione='$identificativo'";
	//echo $sql."<br>";
	if($conn->exec($sql))
	{
		//--------------------------------------------------
		if ($stato == 5)
		{
			//--- stato cancellato
			//--- aggiorna tabella pren_auto
			$sql = "UPDATE pren_auto SET del='1' WHERE prenotazione='$identificativo'";
			$conn->exec($sql);
			//--- estrae le email da contattare per il cambio di stato
			$statement = $conn->prepare("SELECT p1.utente as utente, autisti.email as email, DATE_FORMAT(p1.giorno_partenza,'%d/%m/%Y') as giorno FROM autisti, `attesa_auto`, pren_prenotazioni p1,pren_prenotazioni p2 where autisti.matricola=p1.utente and attesa_auto.prenotazione = p1.id and attesa=1 and p2.giorno_partenza=p1.giorno_partenza and p2.id='$identificativo' and p1.sede_partenza=p2.sede_partenza");
			$statement->execute();
			while($row=$statement->fetch())
			{
				$id_utente=$row['utente'];
				$email=$row['email'];
				$giorno=$row['giorno'];
				$email=$row['email'];
				$avviso="Si &egrave; liberata un veicolo per il $giorno";
				$avviso = addslashes($avviso);
				$sql = "INSERT INTO `avvisi`( `utente`, `avviso`, `stato`) VALUES ('$id_utente','$avviso' ,0)";
				$conn->exec($sql);
				if($email!='' and $email!='#N/D' and $email!='NULL')
				{
					$altBody = '';
					$body = $avviso;			
					$A[0]=$email;
					include('../../../phpmailinclude.php');
				}
			} 
			//--- estrae email per l'avviso da inviare agli altri partecipanti al viaggio
			$statement = $conn->prepare("SELECT  CONCAT (nome,' ', cognome, ' ha annullato il viaggio del ', DATE_FORMAT(p1.giorno_partenza,'%d/%m/%Y'), ' presso: ',p1.comune_destinazione, '. Per usufruire ugualmente del mezzo come autista, si rende necessario prenotarlo nuovamente.' ) FROM autisti,  pren_prenotazioni p1 where p1.id='$identificativo' and autisti.matricola=p1.utente ");		
			$statement->execute();
			if($row = $statement->fetch())
			{
				$avviso = $row[0];
			}
			/*
			else
			{
				 //$conn->rollback (); 
				 //exit();
			}
			*/
			//print_r($avviso);
			//---
			$statement = $conn->prepare("SELECT  p2.utente, email, prenotazione_ritorno, prenotazione_andata, viaggio FROM autisti, viaggi_condivisi, pren_prenotazioni p1, pren_prenotazioni p2 where p1.id='$identificativo' and autisti.matricola=p2.utente and viaggi_condivisi.prenotazione=p2.id and (viaggi_condivisi.viaggio=p1.id or prenotazione_andata=p1.id or prenotazione_ritorno=p1.id)");
			$statement->execute();
			while($row = $statement->fetch())
			{
				$email= $row['email'];
				$prenotazione_ritorno= $row['prenotazione_ritorno'];
				$prenotazione_andata= $row['prenotazione_andata'];
				$viaggio= $row['viaggio'];
				switch ($identificativo)
				{
					case $viaggio : $avviso_mail= $avviso .' per la tratta A/R'; break;
					case $prenotazione_andata : $avviso_mail= $avviso .' per la tratta di Andata'; break;
					case $prenotazione_ritorno: $avviso_mail=  $avviso .' per la tratta di Ritorno'; break;
				}
				$utente= $row['utente'];
				$avviso = addslashes($avviso);
				$sql = "INSERT INTO `avvisi`( `utente`, `avviso`, `stato`) VALUES ('$utente','$avviso_mail' ,0)";
				$conn->exec($sql);
				$altBody = '';
				$body = $avviso_mail;			
				$A[0]=$email;
				include('../../../phpmailinclude.php');
			}
			//---
			//echo "then 5"."<br>";
		}
		//--------------------------------------------------
		elseif (($stato == 1) or ($stato == 2))
		{
			//echo "else 1 o 2"."<br>";
			//approvato o rifiutato
			$stato_desc='';
			switch($stato){
				case 1: $stato_desc='approvato'; break;
				case 2: $stato_desc='rifiutato'; break;
			}	
			$statement = $conn->prepare("SELECT  CONCAT ('Il viaggio del ', DATE_FORMAT(p1.giorno_partenza,'%d/%m/%Y'), ' presso: ',p1.comune_destinazione, '  &egrave; stato $stato_desc' ), email, matricola FROM autisti,  pren_prenotazioni p1 where p1.id='$identificativo' and autisti.matricola=p1.utente  ");		
			$statement->execute();
			if($row=$statement->fetch())
			{
				$avviso= $row[0];
				$email= $row['email'];
				$utente= $row['matricola'];
				$avviso = addslashes($avviso);
				$sql = "INSERT INTO `avvisi`( `utente`, `avviso`, `stato`) VALUES ('$utente','$avviso' ,0)";
				$conn->exec($sql);
				$altBody = '';
				$body = $avviso;			
				$A[0]=$email;
				include('../../../phpmailinclude.php'); 
			}
			/*
			else
			{
				$conn->rollback (); 
				echo 0;
				exit();
			}
			*/
		}
		//--------------------------------------------------
		else
		{
			//echo "else default 0"."<br>";
			echo "1";
		}
		//--------------------------------------------------
		//echo "OK"."<br>";
		$conn->commit();
		echo "1";
	}
	else
	{
		//$conn->rollback (); 
		//echo "KO"."<br>";
		echo "1";
	}
}
catch(PDOException $e)
{
	$conn->rollback();
	//echo $sql . "<br>" . $e->getMessage();
	echo "0";
}
//---
$conn = null;




/*
//recupero i dati
session_start();
include '../functions/functions.php';
//mi connetto al db
include '../require_conn.php';

ini_set("error_reporting",0);

if(isset($_POST['identificativo']) and isset($_POST['stato']))
{
	$identificativo=$_POST['identificativo'];
	$stato=$_POST['stato'];
	$matricola_utente=$_SESSION['matricola'];
	$subject = 'EMAIL AVVISO LOGICAR';

	$A = array();
	$CC = array();
	$CCN = array();
	$avviso = '';
	$email = '';
	try 
	{
		$conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
		$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		$conn->beginTransaction();
		$sql = "UPDATE `viaggi_pianificati` SET `stato`='$stato' WHERE idprenotazione='$identificativo'";
		$conn->exec($sql);

		if($conn)
		{
			if($stato==5)
			{ // cancellato
				//**avvisi
				$sql = "UPDATE `pren_auto` SET `del`='1' WHERE prenotazione='$identificativo'";
				$conn->exec($sql);
				 $statement = $conn->prepare("SELECT p1.utente as utente, autisti.email as email, DATE_FORMAT(p1.giorno_partenza,'%d/%m/%Y') as giorno FROM autisti, `attesa_auto`, pren_prenotazioni p1,pren_prenotazioni p2 where autisti.matricola=p1.utente and attesa_auto.prenotazione = p1.id and attesa=1 and p2.giorno_partenza=p1.giorno_partenza and p2.id='$identificativo' and p1.sede_partenza=p2.sede_partenza");
				 $statement->execute();

				 while($row=$statement->fetch())
				 {
					$id_utente=$row['utente'];
					$email=$row['email'];
					$giorno=$row['giorno'];
					$email=$row['email'];
					$avviso="Si &egrave; liberata un veicolo per il $giorno";
					$avviso = addslashes($avviso);
					$sql = "INSERT INTO `avvisi`( `utente`, `avviso`, `stato`) VALUES ('$id_utente','$avviso' ,0)";
					$conn->exec($sql);
					if($email!='' and $email!='#N/D' and $email!='NULL'){
							$altBody = '';
							$body = $avviso;			
							$A[0]=$email;
							
							include('../../../phpmailinclude.php');
					} 
				}

				// creo l'avviso da inviare agli altri partecipanti al viaggio
				$statement = $conn->prepare("SELECT  CONCAT (nome,' ', cognome, ' ha annullato il viaggio del ', DATE_FORMAT(p1.giorno_partenza,'%d/%m/%Y'), ' presso: ',p1.comune_destinazione, '. Per usufruire ugualmente del mezzo come autista, si rende necessario prenotarlo nuovamente.' ) FROM autisti,  pren_prenotazioni p1 where p1.id='$identificativo' and autisti.matricola=p1.utente ");		
				$statement->execute();
				if($row=$statement->fetch())
				{
					$avviso= $row[0];
				}
				else
				{
					 //$conn->rollback (); 
					 //exit();
					 echo 0;
				}
			
				$statement = $conn->prepare("SELECT  p2.utente, email, prenotazione_ritorno, prenotazione_andata, viaggio FROM autisti, viaggi_condivisi, pren_prenotazioni p1, pren_prenotazioni p2 where p1.id='$identificativo' and autisti.matricola=p2.utente and viaggi_condivisi.prenotazione=p2.id and (viaggi_condivisi.viaggio=p1.id or prenotazione_andata=p1.id or prenotazione_ritorno=p1.id)");
				$statement->execute();
				while($row=$statement->fetch())
				{
					$email= $row['email'];
					$prenotazione_ritorno= $row['prenotazione_ritorno'];
					$prenotazione_andata= $row['prenotazione_andata'];
					$viaggio= $row['viaggio'];
					switch ($identificativo)
					{
						case $viaggio : $avviso_mail= $avviso .' per la tratta A/R'; break;
						case $prenotazione_andata : $avviso_mail= $avviso .' per la tratta di Andata'; break;
						case $prenotazione_ritorno: $avviso_mail=  $avviso .' per la tratta di Ritorno'; break;
					}
					$utente= $row['utente'];
					$avviso = addslashes($avviso);
					$sql = "INSERT INTO `avvisi`( `utente`, `avviso`, `stato`) VALUES ('$utente','$avviso_mail' ,0)";
					$conn->exec($sql);
					$altBody = '';
					$body = $avviso_mail;			
					$A[0]=$email;
					include('../../../phpmailinclude.php');
				}					
			}
			else
			{
				if($stato==1 or $stato==2)
				{ //approvato o rifiutato
					$stato_desc='';
					switch($stato){
						case 1: $stato_desc='approvato'; break;
						case 2: $stato_desc='rifiutato'; break;
					}	
					$statement = $conn->prepare("SELECT  CONCAT ('Il viaggio del ', DATE_FORMAT(p1.giorno_partenza,'%d/%m/%Y'), ' presso: ',p1.comune_destinazione, '  &egrave; stato $stato_desc' ), email, matricola FROM autisti,  pren_prenotazioni p1 where p1.id='$identificativo' and autisti.matricola=p1.utente  ");		
					$statement->execute();
					if($row=$statement->fetch())
					{
						$avviso= $row[0];
						$email= $row['email'];
						$utente= $row['matricola'];
						$avviso = addslashes($avviso);
						$sql = "INSERT INTO `avvisi`( `utente`, `avviso`, `stato`) VALUES ('$utente','$avviso' ,0)";
						$conn->exec($sql);
						$altBody = '';
						$body = $avviso;			
						$A[0]=$email;
						include('../../../phpmailinclude.php'); 
					}
					else
					{
						//$conn->rollback (); 
						echo 0;
						//exit();
					}
				}
				else
				{
					echo 1;
				}
			}
			echo 1;
			$conn->commit();
		}
		else
		{
			echo 0;
		}
	}
	catch(PDOException $e)
	{
		$conn->rollback();
		echo $sql . "<br>" . $e->getMessage();
	}

$conn = null;
}
else
{
	echo 0;
}
*/