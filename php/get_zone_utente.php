<?php

ini_set("error_reporting",0);
//mi connetto al db
include 'require_conn.php';

session_start();

//recupero i dati in sessione
if (!isset($_SESSION['asl']))
{
	echo "error";
}
else
{
	$asl = $_SESSION['asl'];

	//$asl = 10;
	if (isset($_SESSION['zoneselezionate_options']))
	{
		if($_SESSION['zoneselezionate_options'] != '')
		{
			echo $_SESSION['zoneselezionate_options'];
		}
		else
		{
			try
			{
				$conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
				$statement = $conn->prepare("SELECT CDZONA,DESCZONA FROM tab_usl_zone WHERE CDUSL = '$asl'");		
				$statement->execute();
				//---
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
				//---
				echo $_SESSION['zoneselezionate_options'];
			}
			catch (Exception $e)
			{
				return $e->getMessage(); //return exception
			}
			
		}
	}
	
}

