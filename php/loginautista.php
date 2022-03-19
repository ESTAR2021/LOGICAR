<?php
ini_set("error_reporting", 0);
//mi connetto al db
include 'require_conn.php';
//---
$cf = '';
$psw = '';
//---
$conn = null;
session_destroy();
session_start();
$_SESSION = Array();
if (isset($_POST['cf']))
    $cf = $_POST['cf'];
if (isset($_POST['psw']))
    $psw = $_POST['psw'];
//---
$i = 0;

$psw_md5=md5($psw);
//---
try 
{
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    /*
	$statement = $conn->prepare("select *, az.provincia AS PROV
                                 FROM autisti AS au JOIN aziende AS az ON au.asl = az.id 
                                 WHERE cf LIKE '$cf' 
                                 AND password LIKE '$psw_md5' and attivo=1 and vhr=0");
	*/
	//---
	$statement = $conn->prepare("SELECT primo_accesso,
			 nome,matricola,cognome,email,cf,au.asl AS ASL,autista,badge,amministrativo,
		portineria,vhr,sede_lavoro, az.provincia AS PROV, sedi.cod_comune, comune.ex_cdusl, comune.cdzona, attivo, tipo_utente
		FROM autisti AS au JOIN aziende AS az ON au.asl = az.id 
		JOIN sedi on au.sede_lavoro=sedi.id
		JOIN tab_comune_usl AS comune on comune.cdcmn=sedi.cod_comune
		WHERE cf LIKE '$cf' 
		AND password LIKE '$psw_md5' and attivo=1 and vhr=0");
	//---
    $statement->execute();
	//---
    while ($row = $statement->fetch())
	{
        $i++;
        $_SESSION['primo_accesso'] = $row['primo_accesso'];
        if(!$row['primo_accesso']) 
		{
			//---
			$asl = $row['ASL'];
			//---
			$_SESSION['nome'] = $row['nome'];
			$utente = $row['matricola'];
			$_SESSION['cognome'] = $row['cognome'];
			$_SESSION['email'] = $row['email'];
			$_SESSION['cf'] = $row['cf'];
			$_SESSION['matricola'] = $row['matricola'];
			$_SESSION['asl'] = $row['ASL'];
			$_SESSION['provinciaASL'] = $row['PROV'];
			$_SESSION['autista'] = $row['autista'];
			$_SESSION['badge'] = $row['badge'];
			$_SESSION['amministrativo'] = $row['amministrativo'];
			$_SESSION['portineria'] = $row['portineria'];
			$_SESSION['vhr'] = $row['vhr'];
			$_SESSION['sede_lavoro'] = $row['sede_lavoro'];
			$_SESSION['tipo_utente'] = $row['tipo_utente'];
			//---
			//zone della usl selezionate dall'utente loggato
			/*
			$_SESSION['zoneselezionate'] = ''; 
			$_SESSION['zoneselezionate_descrizione'] = '';
			$_SESSION['zoneselezionate_options'] = '';
		*/
			//---
			$sql ='INSERT INTO `log_accessi_autoparco`(`matricola`) VALUES("'.$row['matricola'].'")';
			$conn->exec($sql);
        }

    }
	//---
    $statement = $conn->prepare("SELECT count(*) as n
								 FROM avvisi
								 WHERE utente='$utente' and stato=0 ");
    $statement->execute();
	//---
    if ($row = $statement->fetch()) 
	{
        if ($row['n'] > 0) 
		{
            $i = 2;
        }
    }
	//---
	if($_SESSION['email']=='#N/D')
	{
		$i=2;
	}
	//---
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
} 
catch (PDOException $e) 
{
    return $e->getMessage(); //return exception
}
//---
if(isset($_SESSION['primo_accesso']) and $_SESSION['primo_accesso']==1)
{
    echo 3;
}
else
{
	if($_SESSION['portineria']==1)
	{
		echo 4;
	}
	else
	{
		echo $i;
	}
}
//---
session_write_close();
