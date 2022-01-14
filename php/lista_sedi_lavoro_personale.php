<?php
ini_set("error_reporting",0);
//mi connetto al db
include 'require_conn.php';
$rows=array();
//leggo i valori
session_start();
$asl_sessione=$_SESSION['asl'];

		   try { 
		   $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
           $statement = $conn->prepare("select v_sedi.*, aziende.azienda, aziende.id as asl_id,concat(v_sedi.denominazione,' - ',v_sedi.indirizzo) as indirizzo from aziende,v_sedi where v_sedi.asl=aziende.id and v_sedi.asl='$asl_sessione' and aziende.attiva=1 ORDER BY indirizzo ASC");

	$statement->execute();
		   $i=0;
			$asl='';		   
		   while($row=$statement->fetch()){
			   $rows[$i]=array();
			   $rows[$i]=$row;  
			   $rows['azienda']=$row['azienda'];  
			   $rows['asl_id']=$row['asl_id'];  
			   $i++;
		   }
		 $rows['dimensione']=$i;

echo json_encode($rows);
		}
			catch (Exception $e){
               return $e->getMessage(); //return exception
        }   
		   ?>
