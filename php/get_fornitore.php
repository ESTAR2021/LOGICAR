<?php

//mi connetto al db
include 'require_conn.php';
$rows=array();
//leggo i valori

		    try { 
		   $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
           $statement = $conn->prepare("select *  from compagnie_rifornimento ORDER BY fornitore");
		   $statement->execute();
		   $i=0;    
		   while($row=$statement->fetch()){
		   $rows[$i]=array();
		   $rows[$i]=$row;  
		   $i++;
		   		   }
				   
//passo la dimensione dell'array al js "rifornimento_add.js"
		 $rows['dimensione']=$i;

//ritorno l'array
echo json_encode($rows);
			}
			catch (Exception $e){
                return $e->getMessage(); //return exception
        }   
		   ?>
