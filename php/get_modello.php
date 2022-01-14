<?php

//mi connetto al db
include 'require_conn.php';

$id_marca=$_POST['marca_id'];

//leggo i valori

		    try { 
		   $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
           $statement = $conn->prepare("select id,modello from modello WHERE id_marca='$id_marca'");
		   $statement->execute();
		   
		   while($row=$statement->fetch()){
		  //ritorno i dati per popolare la select
		echo "<option value=" . $row['id'] . ">". $row['modello'] . "</option>";
		   		   }

			}
			catch (Exception $e){
                return $e->getMessage(); //return exception
        }   
		   ?>
