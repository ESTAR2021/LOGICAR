<?php
ini_set("error_reporting",0);
//mi connetto al db
include 'require_conn.php';
$matricola=$_POST['matricola'];
$rows=array();
//leggo i valori

		   try { 
		   $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
           $statement = $conn->prepare("SELECT *, viaggi.id as idViaggio, DATE_FORMAT(datetime_partenza,'%d/%m/%Y') as datapartenza FROM `viaggi`, auto ,marca WHERE `autista`='$matricola' AND marca.id=auto.id_marca AND viaggi.auto= auto.id order by `datetime_partenza` DESC");
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
