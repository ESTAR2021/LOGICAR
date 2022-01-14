<?php

//mi connetto al db
include 'require_conn.php';
$rows=array();
//leggo i valori

		  //  try { 
		   $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
           $statement = $conn->prepare("select count(parco.id) AS numeroauto FROM parco INNER JOIN auto ON parco.id_auto=auto.id");
		   $statement->execute();
		  
		   while($row=$statement->fetch()){
			$quanti=$row['numeroauto'];
		   }
		   
		   
		   echo json_encode($quanti);
			}
		catch (Exception $e){
               return $e->getMessage(); //return exception
        }   
		   
		   
		   ?>
