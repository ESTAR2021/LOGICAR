<?php

//recupero i dati
ini_set("error_reporting",0);
if(isset($_POST['avviso'])){
	$avviso=$_POST['avviso'];
}
else{
	echo 0;
	exit();
}

include '../functions/functions.php';

//mi connetto al db
include '../require_conn.php';

//scrivo i valori

try {
		   $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
           $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
           $sql = "UPDATE avvisi set stato='1' where id='$avviso'";
	
			$conn->exec($sql);
			if($conn){
				echo 1;
			}else{
				echo 0;
			}

    }
catch(PDOException $e)
    {
    echo $sql . "<br>" . $e->getMessage();
    }

$conn = null;

?>