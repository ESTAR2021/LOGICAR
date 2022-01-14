<?php

//mi connetto al db
include 'require_conn.php';
$rows=array();
$id_auto=$_REQUEST['id'];
$todays_date=Date("d-m-Y");
//leggo i valori

		    try { 
		   $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
           $statement = $conn->prepare("select rca.ID AS idrca, rca_pagamenti.scadenza AS scadenzapag  FROM rca INNER JOIN rca_pagamenti ON rca.ID=rca_pagamenti.id_rca WHERE rca.id_auto=$id_auto ORDER BY rca.ID DESC LIMIT 1");
		   $statement->execute();
		   $i=0;    
		   while($row=$statement->fetch()){
		   $rows[$i]=array();
		   $rows[$i]=$row;  
		   $scadenzapag=$rows[$i]['scadenzapag'];
		   $scadenzapag2 = date("d-m-Y", strtotime($scadenzapag));
		   
		   
		   
		   //calcolo la differenza tra la data di oggi e quella di scadenza rata
$today = strtotime($todays_date);
$scadenzapag2_new = strtotime($scadenzapag2); 
if ($scadenzapag2_new > $today)
 { $scaduta="no"; } 
else 
{ $scaduta="si"; }

//aggiungo il valore all'array
$rows[$i]['scaduta'] = $scaduta;
		   
		   		   $i++;
		   		   }
				   
			

		 
//ritorno l'array
echo json_encode($rows);

			}
			catch (Exception $e){
                return $e->getMessage(); //return exception
        }   
		
		   ?>
