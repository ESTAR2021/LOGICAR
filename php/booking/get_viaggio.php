<?php

session_start();
ini_set("error_reporting",0);
$i=0;
//mi connetto al db
include '../require_conn.php';

if(isset ($_SESSION['viaggio_iniziato'])){
    echo $_SESSION['viaggio_iniziato'];
}else{
    if(isset ($_SESSION['matricola'])){
        $autista_sessione=$_SESSION['matricola'];
	
        $rows=array();
//leggo i valori
        try {
            $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
            $statement = $conn->prepare("select pren_prenotazioni.id as prenotazione_id 
                                         from pren_prenotazioni, viaggi_pianificati 
                                         where pren_prenotazioni.id=viaggi_pianificati.idprenotazione 
                                         and pren_prenotazioni.utente='$autista_sessione' 
                                         and giorno_partenza=curdate() 
                                         and stato=3");
            $statement->execute();

            while($row=$statement->fetch()){
                $i=$row['prenotazione_id'];
            }
//ritorno l'array
           echo $i;
        }
        catch (Exception $e){
            return $e->getMessage(); //return exception
        }
    }}
?>