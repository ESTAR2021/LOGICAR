<?php
ini_set("error_reporting",0);
//mi connetto al db
include 'require_conn.php';
$rows=array();
session_start();
$asl=$_SESSION['asl'];
//leggo i valori

		   try { 
		   $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
           $statement = $conn->prepare("select *,DATE_FORMAT(nascita,'%d/%m/%Y') as data_nascita from autisti,aziende 
										WHERE aziende.id=asl AND autista='1'and attivo=1 AND asl=$asl ORDER BY autisti.cognome, autisti.nome DESC");
		   $statement->execute();
		   $i=0;    
		   while($row=$statement->fetch()){
				$rows[$i]=array();
				$rows[$i]=$row;  
				$i++;
		}

		 $rows['dimensione']=$i;

//ritorno l'array
echo json_encode($rows);
		}
			catch (Exception $e){
               return $e->getMessage(); //return exception
        }   
		   ?>
