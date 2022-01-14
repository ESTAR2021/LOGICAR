<?php
session_start();
//mi connetto al db
include 'require_conn.php';

//recupero i dati in sessione
$id_auto=$_SESSION['id_auto'];


$rows=array();
//leggo i valori

		    try { 
		   $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
           $statement = $conn->prepare("select *, DATE_FORMAT(inizio,'%d/%m/%Y %H:%i') AS giornoita_da, DATE_FORMAT(fine,'%d/%m/%Y %H:%i') AS giornoita_a FROM auto_riservate WHERE id_parco=$id_auto ORDER BY inizio DESC");
			 $statement->execute();
		   $i=0;    
		   while($row=$statement->fetch()){
		   $rows[$i]=array();
		   $rows[$i]=$row;  
		   $i++;
		   		   }
				   
//passo la dimensione dell'array al js "form-scripts2.js"
		 $rows['dimensione']=$i;

//ritorno l'array
echo json_encode($rows);
			}
			catch (Exception $e){
                return $e->getMessage(); //return exception
        }   
		   ?>
