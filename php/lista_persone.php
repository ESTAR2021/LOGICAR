<?php
ini_set("error_reporting",0);
//mi connetto al db
include 'require_conn.php';
$rows=array();
//leggo i valori
session_start();
$asl=$_SESSION['asl'];
		   try { 
		   $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
           $statement = $conn->prepare("select *,concat(v_sedi.denominazione,' - ',v_sedi.indirizzo) as indirizzo 
										from autisti,aziende,v_sedi 
										WHERE aziende.id=autisti.asl and v_sedi.id=sede_lavoro 
										and autisti.attivo=1 AND autisti.asl=$asl  ORDER BY autisti.cognome, autisti.nome DESC");
										
		 $statement->execute();
		   $i=0;    
		   while($row=$statement->fetch()){
				$rows[$i]=array();
				/*
				if($row['amministrativo']){
					$row['amministrativo']='Si';
				}else{
					$row['amministrativo']='No';
			   }
				*/
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
