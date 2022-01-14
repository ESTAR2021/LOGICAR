<?php
ini_set("error_reporting",0);
//mi connetto al db
include 'require_conn.php';
$matricola_autista=$_POST['matricola'];
$dataviaggio=$_POST['dataviaggio'];
$rows=array();
//leggo i valori

		   try { 
		   $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
           $statement = $conn->prepare("select *, auto.id AS idauto from  marca INNER JOIN auto INNER JOIN auto_asl INNER JOIN autisti ON auto.id=auto_asl.auto and marca.id=auto.id_marca and auto_asl.asl=autisti.asl and autisti.matricola='$matricola_autista' 
			AND auto.id NOT IN (
				SELECT auto from viaggi where 
				DATE(datetime_partenza ) =DATE('$dataviaggio') AND (
				'$dataviaggio' < datetime_arrivo OR datetime_arrivo= '000-00-00')
				) ORDER BY auto.id DESC");
		   $statement->execute();
		   $i=0;    
		   while($row=$statement->fetch()){
		   $rows[$i]=array();
		   $rows[$i]=$row;  
		   $i++;
		   }
				   
				   
//passo la dimensione dell'array al js "tabella.js"
		 $rows['dimensione']=$i;

//ritorno l'array
echo json_encode($rows);
		}
			catch (Exception $e){
               return $e->getMessage(); //return exception
        }   
		   ?>
