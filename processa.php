<?php
/**
 * Created by PhpStorm.
 * User: Sara
 * Date: 04/07/2017
 * Time: 16:25
 */
ini_set("error_reporting", 0);
//mi connetto al db
include 'php/require_conn.php';
$conn = null;
session_destroy();
session_start();
$cf_sessione=$_POST['cf'];
//--- verifica token whr
$uid = $_POST['uid'];
$time = $_POST['time'];
$hash = $_POST['hash'];
$token = json_decode(file_get_contents("token.json"))->token;
$sha1 = sha1($uid.$time.$token);
if ($hash != $sha1)
{
  die();
}
//---
$conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

/*
$statement = $conn->prepare("select *, az.provincia AS PROV
                                 FROM autisti AS au JOIN aziende AS az ON au.asl = az.id
                                 WHERE cf LIKE '$cf_sessione'
                                 AND attivo=1");
*/
//---
$statement = $conn->prepare("SELECT primo_accesso,
			 nome,matricola,cognome,email,cf,au.asl AS ASL,autista,badge,amministrativo,
		portineria,vhr,sede_lavoro, az.provincia AS PROV, sedi.cod_comune, comune.ex_cdusl, comune.cdzona, attivo, tipo_utente
		FROM autisti AS au JOIN aziende AS az ON au.asl = az.id 
		JOIN sedi on au.sede_lavoro=sedi.id
		JOIN tab_comune_usl AS comune on comune.cdcmn=sedi.cod_comune
    WHERE cf LIKE '$cf_sessione'
    AND attivo=1");
$statement->execute();

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
if ($row = $statement->fetch()) {
    $i++;
    $_SESSION['primo_accesso'] = '0';
    if(!$row['primo_accesso']) {
        $_SESSION['nome'] = $row['nome'];
        $_SESSION['cognome'] = $row['cognome'];
        $_SESSION['cf'] = $row['cf'];
        $_SESSION['matricola'] = $row['matricola'];
        $_SESSION['asl'] = $row['ASL'];
        $_SESSION['provinciaASL'] = $row['PROV'];
        $_SESSION['email'] = $row['email'];
        $_SESSION['autista'] = $row['autista'];
        $_SESSION['badge'] = $row['badge'];
        $_SESSION['amministrativo'] = $row['amministrativo'];
        $_SESSION['sede_lavoro'] = $row['sede_lavoro'];
				$_SESSION['portineria'] = $row['portineria'];
				$_SESSION['tipo_utente'] = $row['tipo_utente'];
				//---
				
				 $_SESSION['vhr'] = $row['vhr'];
        $utente = $row['matricola'];

 //       $sql ='INSERT INTO `log_accessi_autoparco`(`matricola`) VALUES("'.$row['matricola'].'")';
 //		  $sql ='INSERT INTO `log_accessi_autoparco`(`matricola`,`CF`) VALUES("'.$row['matricola'].','$cf_sessione'")'; 
 $sql ="INSERT INTO `log_accessi_autoparco`(`matricola`,`CF`) VALUES('$utente','$cf_sessione')"; 
 $conn->exec($sql);
	//---
	$asl =  $_SESSION['asl'];
	if ($_SESSION['tipo_utente'] <= 0)
	{
		//per tipo=utente = 0 si ha un nomale autista
		$sql = "SELECT
							autisti.matricola,
							tab_usl_zone.EX_CDUSL,
							tab_usl_zone.CDZONA,
							tab_usl_zone.DESCZONA
						FROM
							autisti
							LEFT JOIN v_sedi ON autisti.sede_lavoro = v_sedi.id
							LEFT JOIN tab_usl_zone ON v_sedi.ex_cdusl = tab_usl_zone.EX_CDUSL
						WHERE
							autisti.matricola = " . $_SESSION['matricola'] . " AND tab_usl_zone.CDUSL = " .$_SESSION['asl'];
	}	
	else
	{
		//per tipo_utente = 1 si ha utente amministratore su tutte le zone
		$sql = "SELECT CDZONA,DESCZONA FROM tab_usl_zone WHERE CDUSL = '$asl'";
	}
	$statement = $conn->prepare($sql);		
	$statement->execute();
	if ($statement->rowCount() <= 0)
	{
		$_SESSION['zoneselezionate'] = ''; 
		$_SESSION['zoneselezionate_descrizione'] = '';
		$_SESSION['zoneselezionate_options'] = '';
	}
	else
	{
		$zs = ''; //zone selezionate per query
		$zsd = ''; // zone selezionate con descrizione
		$zso = ''; // zone selezionate per checkbox
		while ($row = $statement->fetch())
		{
			//---
			$zs = $zs."'".trim($row['CDZONA'])."',";
			//---
			$zsd = $zsd."<div>".trim($row['CDZONA'])." - ".$row['DESCZONA']." </div>";
			//---
			$zso = $zso.'<input id="'.trim($row['CDZONA']).'" class="zone" type="checkbox" name="'.trim($row['CDZONA']).'" checked="checked" />'.trim($row['CDZONA']).' - '.$row['DESCZONA'].'<br>';
			//---
		}
		//---
		$zs = rtrim($zs,","); //toglie la virgola a destra
		$_SESSION['zoneselezionate'] = $zs; 
		$_SESSION['zoneselezionate_descrizione'] = $zsd;
		$_SESSION['zoneselezionate_options'] = $zso;
	}
	//---
//---
		
       
    }
    $statement = $conn->prepare("SELECT count(*) as n
								 FROM avvisi
								 WHERE utente='$utente' and stato=0 ");
    $statement->execute();
    if ($row = $statement->fetch()) {
        if ($row['n'] > 0 or $_SESSION['email']=='#N/D') {
            header('Location: ./booking/avvisi_mail.html');
            exit;
        }else{
			if($_SESSION['portineria']==1){ header('Location: ./booking/registro_chiavi.html');}else{
            header('Location: ./booking/home.html');}
        }
    }else{

        header('Location: ./booking/home.html');
    }
}else{
	echo "utente NON presente contattare logicar@estar.toscana.it fornendo i seguenti dati: 
	Nome,
	Cognome,
	Codice Fiscale,
	ASL di appartenenza o ESTAR,
	Numero di Matricola, 
	Indirizzo Mail,
	Sede di Lavoro ";
}
}catch (PDOException $e) {
    return $e->getMessage(); //return exception
    }

session_write_close();
?>
