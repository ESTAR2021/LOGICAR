<?php
include 'require_conn.php';

session_start();

$asl=$_SESSION['asl'];
/*
$_SESSION['zoneselezionate'] = '';
$_SESSION['zoneselezionate_descrizione'] = '';
$_SESSION['zoneselezionate_options'] = '';
*/

//$asl = 2;
//$prova = "'A','C','H'";


if(isset($_POST['zone']) && !empty($_POST['zone']))
{
$_SESSION['prova'] = $_POST['zone'];

	//---
	//inserisce gli apici
	//---
	$zs = ''; //zoneselezionate
	$post = $_POST['zone'];
	str_replace("'","",$post);
$_SESSION['prova2'] = $post;
	$vt = explode(",",$post);
	for($i = 0; $i<count($vt); $i++)
	{
		if (strpos($vt[$i],"'")<=0) 
		{
			$vt[$i] = "'" . $vt[$i] . "'";
		}
	}
	$zs = implode(",",$vt);
	//$zs = $prova;
	//---
	$_SESSION['zoneselezionate'] = $zs; //zone selezionate per le query
	//---
	if ($zs == '')
	{
		$whereclause = " AND TRUE";
	}
	else
	{
		$whereclause = " AND CDZONA IN ( $zs )";
	}	
	
	//esegue la query sulle zone selezionate
	$zsd = ''; // zone selezionate descrizione
	if ($zs != '')
	{
		try
		{
			$conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
			$sql = "SELECT CDZONA,DESCZONA FROM tab_usl_zone WHERE CDUSL = '$asl'".$whereclause;
			$statement = $conn->prepare($sql);		
			$statement->execute();
			//---
			while($row=$statement->fetch()){
				//ritorno i dati per popolare la select
				$zsd = $zsd . trim($row['CDZONA']) . '-' .  $row['DESCZONA'] . '<br>';
			}
		}
		catch (Exception $e)
		{
			return $e->getMessage(); //return exception
		}
	}
	//---
	$_SESSION['zoneselezionate_descrizione'] = $zsd;
	//---
	$zso = ''; // zone selezione option per checkbox
	try
	{
		$conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
		//$sql = "SELECT CDZONA,DESCZONA FROM tab_usl_zone WHERE CDUSL = '$asl'";
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
							autisti.matricola = " . $_SESSION['matricola'];		
		}	
		else
		{
			//per tipo_utente = 1 si ha utente amministratore su tutte le zone
			$sql = "SELECT CDZONA,DESCZONA FROM tab_usl_zone WHERE CDUSL = '$asl'";
		}
		$statement = $conn->prepare($sql);	
		$statement->execute();
		//---
		while($row=$statement->fetch()){
			//ritorno i dati per popolare la select
			if (strpos($zs,trim($row['CDZONA']))>=1)
			{
				//option con select
				//---	
				//$zs = $zs."'".trim($row['CDZONA'])."',";
				//---
				//$zsd = $zsd."<div>".trim($row['CDZONA'])." - ".$row['DESCZONA']." </div>";
				//---
				$zso = $zso.'<input id="'.trim($row['CDZONA']).'" class="zone" type="checkbox" name="'.trim($row['CDZONA']).'" checked="checked" />'.trim($row['CDZONA']).' - '.$row['DESCZONA'].'<br>';
				//---
			}
			else
			{				
				//$zs = $zs."'".trim($row['CDZONA'])."',";
				//---
				//$zsd = $zsd."<div>".trim($row['CDZONA'])." - ".$row['DESCZONA']." </div>";
				//---
				$zso = $zso.'<input id="'.trim($row['CDZONA']).'" class="zone" type="checkbox" name="'.trim($row['CDZONA']).'" />'.trim($row['CDZONA']).' - '.$row['DESCZONA'].'<br>';
				//---
			}
			
		}
	}
	catch (Exception $e)
	{
		return $e->getMessage(); //return exception
	}
	//---
	$_SESSION['zoneselezionate_options'] = $zso;
	//---
	echo "success";
	//exit();
}
else
{
	$_SESSION['zoneselezionate'] = '';
	$_SESSION['zoneselezionate_descrizione'] = '';
	//---
	//$_SESSION['zoneselezionate_options'] = '';
	$zso = ''; // zone selezione option per select
	try
	{
		$conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
		$sql = "SELECT CDZONA,DESCZONA FROM tab_usl_zone WHERE CDUSL = '$asl'";
		$statement = $conn->prepare($sql);	
		$statement->execute();
		//---
		//echo '<option value="' . trim($row['CDZONA']) . '">'. trim($row['CDZONA']) . '-' .  $row['DESCZONA'] . '</option>';
		while($row=$statement->fetch()){
			$zso = $zso.'<input id="'.trim($row['CDZONA']).'" class="zone" type="checkbox" name="'.trim($row['CDZONA']).'" />'.trim($row['CDZONA']).' - '.$row['DESCZONA'].'<br>';
			//---
		}
	}
	catch (Exception $e)
	{
		return $e->getMessage(); //return exception
	}
	//---
	$_SESSION['zoneselezionate_options'] = $zso;
	//---
	echo "success";	
}