<?php

//mi connetto al db
include 'require_conn.php';


//recupero la stringa di ricerca
$searchTerm = $_GET['term'];

//leggo i valori

		    try { 
		   $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
           $statement = $conn->prepare("select * FROM comuni_italiani WHERE denominazione  LIKE '%".$searchTerm."%'  ORDER BY id");
		 $statement->execute();
		   $i=0;    
		   while($row=$statement->fetch()){
		   $data[] = $row['denominazione'];
		   		   }
			   
			//ritorno l'array
			echo json_encode($data);

			}
			catch (Exception $e){
                return $e->getMessage(); //return exception
        }   
		   ?>
