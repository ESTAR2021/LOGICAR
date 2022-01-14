<?php
ini_set("error_reporting",0);
//mi connetto al db
include 'require_conn.php';
$rows=array();
//leggo i valori

		   try { 
		   $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
           $statement = $conn->prepare("select * from aziende ORDER BY azienda DESC");
		   $statement->execute();
		   $i=0;    
		   while($row=$statement->fetch()){
			   $rows[$i]=array();
			   $rows[$i]=$row;  
			   $i++;
		   }
		 $rows['dimensione']=$i;
echo json_encode($rows);
		}
			catch (Exception $e){
               return $e->getMessage(); //return exception
        }   
		   ?>
