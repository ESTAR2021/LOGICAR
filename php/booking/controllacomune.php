<?php
ini_set("error_reporting", 0);

//mi connetto al db
include '../require_conn.php';

//recupero i dati in sessione
$comune=$_POST['comune'];


$rows=array();
//leggo i valori

		    try { 
		   $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
           $statement = $conn->prepare("select *  FROM comuni_italiani WHERE denominazione LIKE :com");
			$statement->bindValue(':com',$comune,PDO::PARAM_STR);
			$statement->execute();
		   $i=0;    
		   while($row=$statement->fetch()){
		   $rows[$i]=array();
		   $rows[$i]=$row;  
		   $i++;
		   		   }
				   
//passo la dimensione dell'array al js "prenotazione.js"
		 $rows['dimensione']=$i;

//ritorno l'array
echo json_encode($rows);
			}
			catch (Exception $e){
                return $e->getMessage(); //return exception
        }   
		   ?>
