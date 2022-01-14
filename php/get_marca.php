<?php

//mi connetto al db
include 'require_conn.php';

//inizializzo la select con la prima option non cliccabile
		echo "  <option value=\"\">Scegli marca</option>";
//leggo i valori

		    try { 
		   $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
           $statement = $conn->prepare("select ID,marca from marca ORDER BY marca");
		   $statement->execute();
		   
		   while($row=$statement->fetch()){
		  //ritorno i dati per popolare la select
		echo "<option value=" . $row['ID'] . ">". $row['marca'] . "</option>";
		   		   }

			}
			catch (Exception $e){
                return $e->getMessage(); //return exception
        }   
		   ?>
