<?php

//recupero i dati
ini_set("error_reporting",0);

if(isset($_POST['idauto'])){
	$idauto=$_POST['idauto'];
}


session_start();
$utente=$_SESSION['matricola'];

if(isset($_SESSION['pianificazione']) and $_POST['idauto']){
	$pianificazione=$_SESSION['pianificazione'];
	$asl=$_SESSION['asl'];
}else{
	echo 0;
	exit();
}


//	$pianificazione=146;
//$id_auto=27;


include '../functions/functions.php';

//mi connetto al db
include '../require_conn.php';

//scrivo i valori

try {
		$conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		$conn->beginTransaction();
		// -------------------------------
		$statement = $conn->prepare("select * FROM pren_prenotazioni WHERE id='$pianificazione'");
		$statement->execute();
		$row = $statement->fetch();
		$data_pianificazione_partenza=$row['giorno_partenza'].'  '.$row['ora_partenza'];
		$data_pianificazione_ritorno=$row['giorno_ritorno'].'  '.$row['ora_ritorno'];
/*		
		echo ("<br>" .$pianificazione);
		echo ("<br>" .$data_pianificazione_partenza);
		echo ("<br>" .$data_pianificazione_ritorno);
*/		
		
		$go_partenza = "CONCAT(giorno_partenza,' ',ora_partenza)";
		$go_ritorno = "CONCAT(giorno_ritorno,' ',ora_ritorno)";
		
		if ($asl==10){
		// nel caso di Estar in cui ho la conferma automatica	
		$sql = "SELECT COUNT(*) AS conteggio FROM v_prenotazioni WHERE (id_auto='$idauto') AND (stato!=5 AND stato!=2) AND (( str_to_date('$data_pianificazione_partenza','%Y-%m-%d %H:%i:%s') BETWEEN $go_partenza AND $go_ritorno) OR ( str_to_date('$data_pianificazione_ritorno','%Y-%m-%d %H:%i:%s') BETWEEN $go_partenza AND $go_ritorno) OR ($go_partenza BETWEEN  str_to_date('$data_pianificazione_partenza','%Y-%m-%d %H:%i:%s') AND  str_to_date('$data_pianificazione_ritorno','%Y-%m-%d %H:%i:%s')) OR ($go_ritorno BETWEEN  str_to_date('$data_pianificazione_partenza','%Y-%m-%d %H:%i:%s') AND  str_to_date('$data_pianificazione_ritorno','%Y-%m-%d %H:%i:%s')))";
		}
		else{
		// in tutti gli altri casi in cui non ho la conferma automatica	
		$sql = "SELECT COUNT(*) AS conteggio FROM v_prenotazioni WHERE (id_auto='$idauto') AND (stato!=5 AND stato!=2 AND stato!=0) AND (( str_to_date('$data_pianificazione_partenza','%Y-%m-%d %H:%i:%s') BETWEEN $go_partenza AND $go_ritorno) OR ( str_to_date('$data_pianificazione_ritorno','%Y-%m-%d %H:%i:%s') BETWEEN $go_partenza AND $go_ritorno) OR ($go_partenza BETWEEN  str_to_date('$data_pianificazione_partenza','%Y-%m-%d %H:%i:%s') AND  str_to_date('$data_pianificazione_ritorno','%Y-%m-%d %H:%i:%s')) OR ($go_ritorno BETWEEN  str_to_date('$data_pianificazione_partenza','%Y-%m-%d %H:%i:%s') AND  str_to_date('$data_pianificazione_ritorno','%Y-%m-%d %H:%i:%s')))";
		}
/*		
		echo '<br>';
		echo '<br>';
		echo $sql;
		echo '<br>';
		echo '<br>';
*/		
		$statement = $conn->prepare($sql);
		$statement->execute();
		$row = $statement->fetch();
		$conteggio=$row['conteggio'];
//		echo ("<br>" .$conteggio);
		//echo "conteggio=".$conteggio;
		/*echo '<hr>';
		
		echo '<br>';
		echo '<br>';
		
      	$appoggio='conteggio= '.$conteggio.' id_auto='.$idauto.'id_pianificazione='.$pianificazione.' sgl='.$sql;
		$sql =' INSERT INTO `log_azioni`( `query`, `matricola_utente`) VALUES("'.$appoggio.'" ,"'.$utente.'")';
		$conn->exec($sql);
		*/
		if ($conteggio==0)
		{ 	
		// se il risultato è 0 significa che le prenotazioni dell'auto selezionata non intersecano la pianificazione quindi si può procedere con la prenotazione, altrimenti no
		// -------------------------------
		
		$sql = "DELETE FROM pren_auto WHERE prenotazione='$pianificazione'";
		$conn->exec($sql);
        $sql = "INSERT INTO pren_auto(prenotazione, auto, titolare) VALUES ('$pianificazione','$idauto',1)";
		$conn->exec($sql);
			
			if($conn){
				$sql2 = "INSERT INTO viaggi_pianificati(idprenotazione, stato,passeggeri,passeggeri_andata, passeggeri_ritorno)
 							VALUES ('$pianificazione',(SELECT count(*) FROM aziende WHERE id='$asl' and nasce_validato='1'), (SELECT passeggeri FROM pren_prenotazioni where id='$pianificazione'),(SELECT passeggeri FROM pren_prenotazioni where id='$pianificazione'),(SELECT passeggeri FROM pren_prenotazioni where id='$pianificazione'))";
				$conn->exec($sql2);
				$conn->commit();
				if($conn){          //todo BUG: dovrebbe essere l'exec dentro l'if, perchè restituisce il numero di righe elaborate
					echo 1;}
					else{echo 0;}
			}else{
				echo 0;
			}
			$statement = $conn->prepare("SELECT utente, email, CONCAT('Le confermiamo la prenotazione del mezzo aziendale per il giorno ',DATE_FORMAT(giorno_partenza,'%d/%m/%Y'),' dalle ore ',ora_partenza,' al giorno ',DATE_FORMAT(giorno_ritorno,'%d/%m/%Y'),' alle ore ',ora_ritorno,' con destinazione ',comune_destinazione, ' ', indirizzo_destinazione,'. Con partenza dalla sede: ', indirizzo_partenza, '.  Cordiali Saluti' ) as messaggio FROM autisti, pren_prenotazioni WHERE autisti.matricola=pren_prenotazioni.utente and pren_prenotazioni.id='$pianificazione'");
									
			$statement->execute();
			if($row=$statement->fetch()){
				$email= $row['email'];
				if($email!='#N/D' and $email!=''){
					$avviso= $row['messaggio'];
					$matricola_utente= $row['utente'];
					$altBody = '';
					$body = $avviso;			
					$A[0]=$email;				
					include('../../../phpmailinclude.php');
				}
			}
		}//if ($conteggio==0)
		else { echo 3; } //le prenotazioni dell'auto selezionata intersecano la pianificazione			
	}//try				  
catch(PDOException $e)
    {
    $conn->rollBack();
	echo $sql . "<br>" . $e->getMessage();
    }

$conn = null;
session_write_close();

?>