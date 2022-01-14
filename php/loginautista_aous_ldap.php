<?php
ini_set("error_reporting", 0);
//mi connetto al db
include 'require_conn.php';

//===============================================
// funzione che converte il timestamp LDAP in un timestamp Unix
function ldapTimeStamp2UnixTimeStamp($fileTime)
{
	// divide by 10.000.000 to get seconds
	$winSecs = (int)($fileTime / 10000000);
	// 1.1.1600 -> 1.1.1970 difference in seconds	
	$unixTimestamp = ($winSecs - 11644473600); 
	return date('Y-m-d H:i:s', $unixTimestamp);
}

function ldapLogin($ldadLogin='',$ldapPassword='')
{
	// da usare nella ladp bind1
	$ldaprdn = 'CN=ldap_browser,OU=Domain Controllers,DC=ced,DC=aos';
	$ldappass = 'zimbrone'; // associated password
	// server1
	$server1 = "ldaps://ldap.ao-siena.toscana.it";
	//===== prima fase di connessione
	$connesso1 = 0;
	// tentativo di connessione al ldap server1
	$ldapconn = ldap_connect($server1) or die("Could not connect to LDAP server.");
	//---
	if ($ldapconn) 
	{
		// binding to ldap server
		ldap_set_option($ldapconn, LDAP_OPT_PROTOCOL_VERSION, 3);
		$ldapbind = ldap_bind($ldapconn, $ldaprdn, $ldappass);
		// verify binding
		if ($ldapbind) 
		{
			//echo "LDAP bind server1 $server1 successful...";
			$connesso1 = 1;
		}
		else 
		{
			//echo "LDAP bind server1 failed...";
			// close connection to ldap server1
			ldap_close($ldapconn);
			$connesso1 = 0;
		}
	}
	//echo $connesso1;
	if ($connesso1) 
	{
		//echo "<br>";
		//echo "<br>";
		$ds = $ldapconn; 	 		
		$dn = "DC=ced,DC=aos";
		$filter = "userPrincipalName=$ldadLogin@ced.aos";
		$justthese =array("DN","pwdLastSet","userAccountControl","wWWHomePage");
		$sr=ldap_search($ds, $dn, $filter, $justthese);
		$info = ldap_get_entries($ds, $sr);
		$dn_new = $info[0]["dn"];	
		ldap_close($ldapconn);
	}
	//===== seconda fase di connessione
	// using ldap bind2
	$ldaprdn = $dn_new; // ldap rdn or dn
	// password inserita dall'utente
	$ldappass = $ldapPassword; // associated password
	$connesso2 = 0;
	// tentativo di connetersi a ldap server1
	$ldapconn = ldap_connect($server1) or die("Could not connect to LDAP server.");
	if ($ldapconn) 
	{
		// binding to ldap server
		ldap_set_option($ldapconn, LDAP_OPT_PROTOCOL_VERSION, 3);
		$ldapbind = ldap_bind($ldapconn, $ldaprdn, $ldappass);
		// verify binding
		if ($ldapbind) 
		{
			//echo "LDAP bind server1 $server1 successful...";
			$connesso2 = 1;
		}
		else 
		{
			//echo "LDAP bind server1 failed...";
			// close connection to ldap server1
			ldap_close($ldapconn);
			$connesso2 = 0;
		}
	}
	//---
	if ($connesso2) 
	{

		$ds = $ldapconn; 	 		
		$dn = "DC=ced,DC=aos";
		$filter = "userPrincipalName=$ldadLogin@ced.aos";
		$sr=ldap_search($ds, $dn, $filter);
		$info = ldap_get_entries($ds, $sr);
		$sn = $info[0]["sn"][0]; //cognome
		$givenName = $info[0]["givenname"][0];//nome
		$mail = $info[0]["mail"][0]; //email	
		ldap_close($ldapconn);
		/*
		echo "<pre>";
		print_r($info);
		echo "</pre>";
		*/
	}
	//---
	$datiUtente = array(
		"connesso" => $connesso2,
		"ldaplogin" => $ldadLogin,
		"cognome" => $sn,
		"nome" => $givenName,
		"mail" => $mail
	);
	//---
	//return $connesso2;
	return $datiUtente;
}
//===============================================

//---
$ldap = '';
$psw = '';
/*
$ldap = 's.ciampittiello.e';
$psw = 'e335D942';
*/
//---
$conn = null;
session_destroy();
session_start();
$_SESSION = Array();
//---

if (isset($_POST['cf']))
  $ldap = $_POST['cf'];
if (isset($_POST['psw']))
  $psw = $_POST['psw'];
//--
if (($ldap == '') or ($psw == ''))
{
	echo 0;
	exit;
}
//---
//===============================================
$datiUtenteConnesso = ldapLogin($ldap,$psw);
/*
echo "<pre>";
print_r($datiUtenteConnesso);
echo "</pre>";
*/
if ($datiUtenteConnesso['mail'] == '')
{
	echo 0;
	exit;
}
//--
if ($datiUtenteConnesso['connesso'] == 1)
{
	//---
	try 
	{
		//---
		$conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
		$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		//---
		$statement = $conn->prepare("SELECT primo_accesso,
				 nome,matricola,cognome,email,cf,au.asl AS ASL,autista,badge,amministrativo,
			portineria,vhr,sede_lavoro, az.provincia AS PROV, sedi.cod_comune, comune.ex_cdusl, comune.cdzona, attivo, tipo_utente
			FROM autisti AS au JOIN aziende AS az ON au.asl = az.id 
			JOIN sedi on au.sede_lavoro=sedi.id
			JOIN tab_comune_usl AS comune on comune.cdcmn=sedi.cod_comune
			WHERE ldap LIKE '$ldap' 
			AND attivo=1 AND vhr=0");
		//---
		$statement->execute();
		//---

		if ($statement->rowCount() <=0)
		{
			//inserisce il nuovo utente che si è loggato via LDAP
			//echo "inserice nuovo utente".$ldap;
			$_SESSION['primo_accesso'] = $row['primo_accesso'];
			$asl = $row['ASL'];
			//---
			$nome = $datiUtenteConnesso['nome'];
			$cognome = $datiUtenteConnesso['cognome'];
			$cf =  $datiUtenteConnesso['ldaplogin'];
			$sede_lavoro = '35';
			$asl = '5';
			$email = $datiUtenteConnesso['mail'];
			$ldap = $datiUtenteConnesso['ldaplogin'];
			//---
			$sql = "
				INSERT INTO autisti(nome,cognome,cf,sede_lavoro,asl,email,ldap) 
				VALUES('$nome','$cognome','$cf','$sede_lavoro','$asl','$email','$ldap')";		
			//echo $sql;
			$conn->exec($sql);
			$lastInsertId=$conn->lastInsertId();
			//---
			$i++;
			$_SESSION['primo_accesso'] = '0';
			$_SESSION['nome'] = $nome;
			$_SESSION['cognome'] = $cognome;
			$_SESSION['email'] = $email;
			$_SESSION['cf'] = $ldap;
			$_SESSION['matricola'] = $lastInsertId;
			$_SESSION['asl'] = $asl;
			$_SESSION['provinciaASL'] = 'SI';
			$_SESSION['autista'] = '0';
			$_SESSION['badge'] = '';
			$_SESSION['amministrativo'] = '0';
			$_SESSION['portineria'] = '0';
			$_SESSION['vhr'] = '0';
			$_SESSION['sede_lavoro'] = $sede_lavoro;
			$_SESSION['tipo_utente'] = '0';
			//---
		}
		else
		{
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
		}
		//---
		echo 2;
		/*
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
		*/
		//---
/*
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
		*/
		//---
	} 
	catch (PDOException $e) 
	{
			return $e->getMessage(); //return exception
	}
	//---
/*
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
*/
	//---
}
else
{
	echo 0; //non connesso login non andato a buon fine
}
//---
session_write_close();