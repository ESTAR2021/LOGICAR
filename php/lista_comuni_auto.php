<?php
ini_set("error_reporting",0);

//mi connetto al db
include 'require_conn.php';


//recupero la stringa di ricerca
$provincia=$_POST['provincia'];

//leggo i valori

		    try { 
		   $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
           $statement = $conn->prepare("select * FROM comuni_italiani WHERE (provincia  LIKE '$provincia' OR metropolitana LIKE '$provincia')  ORDER BY id");
		   $statement->execute();
		   $i=0;    
		   while($row=$statement->fetch()){
		   $rows[$i]=array();
		   $rows[$i]=$row;  
		   $i++;
		   		   }
				   
//passo la dimensione dell'array al js "autoparco.js"
		 $rows['dimensione']=$i;

//ritorno l'array
echo json_encode($rows);
		   		   
	

			}
			catch (Exception $e){
                return $e->getMessage(); //return exception
        }   
		   ?>
