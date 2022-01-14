<?php
ini_set("error_reporting",0);
//mi connetto al db

session_destroy();
session_start();
$_SESSION=Array();
session_write_close();

include 'require_conn.php';
$cf = '';
$psw_vecchia = '';
$conn = null;
session_destroy();
session_start();
$_SESSION = Array();
if (isset($_POST['cf']))
	$cf = $_POST['cf'];
if (isset($_POST['psw_vecchia']))
	$psw_vecchia = $_POST['psw_vecchia'];
if (isset($_POST['psw_nuova']))
	$psw_nuova = $_POST['psw_nuova'];
if (isset($_POST['psw_ripeti']))
	$psw_ripeti = $_POST['psw_ripeti'];
$i = 0;

try {
$conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$psw_md5=md5($psw_vecchia);
$psw_md5_nuova=md5($psw_nuova);
	$i=0;
$statement = $conn->prepare("select *, az.provincia AS PROV
                                 FROM autisti AS au JOIN aziende AS az ON au.asl = az.id
                                 WHERE cf LIKE '$cf'
                                 AND password LIKE '$psw_md5' and attivo=1");
$statement->execute();

while ( $row = $statement->fetch()) {
	$i++;

	if($psw_nuova==$psw_ripeti){

		$sql = "UPDATE `autisti` SET  password='$psw_md5_nuova', primo_accesso=0 WHERE matricola='".$row['matricola']."'";
		$conn->exec($sql);
		$i++;
	}

}

} catch (PDOException $e) {
	return $e->getMessage(); //return exception
}

echo $i;