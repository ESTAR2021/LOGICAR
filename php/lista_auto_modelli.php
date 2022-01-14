<?php

//mi connetto al db
include 'require_conn.php';
$rows=array();
//leggo i valori

		    try { 
		   $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
           $statement = $conn->prepare("select *, auto.id AS idauto from auto INNER JOIN marca INNER JOIN modello ON marca.id=auto.id_marca AND modello.id=auto.id_modello AND auto.data_cancellazione is null");
		   $statement->execute();
		   $i=0;    
		   while($row=$statement->fetch()){
		   $rows[$i]=array();
		   $rows[$i]=$row;  
		   
		   		   $id_auto=$rows[$i]['idauto'];
				   
				   
//vado sulla tabella autoparco a recuperare l'eventuale id_auto	 
		   $statementcount = $conn->prepare("select count(parco.id) AS numeroauto FROM parco WHERE id_auto='$id_auto' AND parco.data_cancellazione is null");
		   $statementcount->execute();
		  
		    while($rowcount=$statementcount->fetch()){
			$quanti=$rowcount['numeroauto'];
					   }
					   
					   
//aggiungo il valore all'array
		   $rows[$i]['quanti'] = $quanti;
		   
		   $i++;
		   		   }
				   
//passo la dimensione dell'array al js "tabella.js"
		 $rows['dimensione']=$i;

//ritorno l'array
echo json_encode($rows);
			}
			catch (Exception $e){
                return $e->getMessage(); //return exception
        }   
		   ?>
