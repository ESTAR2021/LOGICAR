<?php
ini_set("error_reporting",0);
//recupero i dati
$sedescelta=$_POST['sedescelta'];
$andata='';

if(isset($_POST['andata'])){
	$andata =json_decode($_POST['andata']);
}
$ritorno='';
if(isset($_POST['ritorno'])){
	$ritorno = json_decode($_POST['ritorno']);
}

session_start();

if(isset($_SESSION['pianificazione'])){
	$pianificazione=$_SESSION['pianificazione'];
}else{
	
	echo 0;
	exit();
}


include '../functions/functions.php';
$tutti=1;
//mi connetto al db
include '../require_conn.php';

//scrivo i valori

try {
		   $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
           $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		   $sql = "DELETE FROM `pren_tappeintermedie` WHERE prenotazione='$pianificazione'";
						$conn->exec($sql);
			for ($i = 1; $i <= sizeof($andata); $i++) {
					$indirizzo=$andata[$i];
					$indirizzo=str_replace("'","\'",$indirizzo);
					if($indirizzo!=null){
						$sql = "INSERT INTO `pren_tappeintermedie`(`prenotazione`, `indirizzo`, `A/R`) VALUES ('$pianificazione','$indirizzo',0)";
						$conn->exec($sql);
						if(!$conn){
							$tutti=0;
						}
					}
			}
				for ($i = 1; $i <= sizeof($ritorno); $i++) {
					$indirizzo=$ritorno[$i];
					$indirizzo=str_replace("'","\'",$indirizzo);
					if($indirizzo!=null){
						$sql = "INSERT INTO `pren_tappeintermedie`(`prenotazione`, `indirizzo`, `A/R`) VALUES ('$pianificazione','$indirizzo',1)";
						$conn->exec($sql);
						if(!$conn){
							$tutti=0;
						}
					}
			}

			

    }

catch(PDOException $e)
    {
    echo $sql . "<br>" . $e->getMessage();
    }

$conn = null;
	echo $tutti;
session_write_close();
?>