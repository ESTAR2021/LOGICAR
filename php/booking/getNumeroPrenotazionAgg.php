<?php
ini_set("error_reporting",0);
//mi connetto al db
include '../require_conn.php';
session_start();
if(isset($_SESSION['matricola'])){
	$autista=$_SESSION['matricola'];
}else{
	echo 0;
	exit();
}

$rows=array();
//leggo i valori

		   try { 
		   $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
//           $statement = $conn->prepare("select count(*) AS n from pren_prenotazioni, viaggi_condivisi where pren_prenotazioni.id=viaggi_condivisi.prenotazione and pren_prenotazioni.utente='$autista' and str_to_date(giorno_partenza,'%Y-%m-%d')>=CURDATE() ");

//		   $statement = $conn->prepare("select count(distinct prenotazione) AS n
//		   from vista_viaggi LEFT JOIN viaggi_aggregati ON vista_viaggi.id_viaggio_pianificato=viaggi_aggregati.id_viaggio_pianificato  
//           where (vista_viaggi.matricola='$autista' OR viaggi_aggregati.id_utente='$autista') and str_to_date(giorno_partenza,'%Y-%m-%d')>=CURDATE()");

			$statement = $conn->prepare("select count(*) as n from (select distinct vista_viaggi.prenotazione, 'viaggio condiviso' as tipologia, DATE_FORMAT(vista_viaggi.giorno_partenza,'%d/%m/%Y') as partenza, vista_viaggi.ora_partenza,  DATE_FORMAT(vista_viaggi.giorno_ritorno,'%d/%m/%Y') as ritorno, vista_viaggi.ora_ritorno,vista_viaggi.indirizzo_partenza,vista_viaggi.comune_destinazione,vista_viaggi.indirizzo_destinazione,vista_viaggi.passeggeri,alimentazione,targa,cilindrata,marca,modello,stato,vista_viaggi.motivo_viaggio,nome,cognome 
			from vista_viaggi,viaggi_condivisi,pren_prenotazioni   
			where vista_viaggi.prenotazione=viaggi_condivisi.viaggio
			and viaggi_condivisi.prenotazione=pren_prenotazioni.id
			and pren_prenotazioni.utente='$autista' and str_to_date(vista_viaggi.giorno_partenza,'%Y-%m-%d')>=CURDATE()			
			UNION ALL
			select distinct prenotazione, 'viaggio aggregato' as tipologia, DATE_FORMAT(giorno_partenza,'%d/%m/%Y') as partenza, ora_partenza,  DATE_FORMAT(giorno_ritorno,'%d/%m/%Y') as ritorno, ora_ritorno,indirizzo_partenza,comune_destinazione,indirizzo_destinazione,passeggeri,alimentazione,targa,cilindrata,marca,modello,stato,motivo_viaggio,nome,cognome 
			from vista_viaggi LEFT JOIN viaggi_aggregati ON vista_viaggi.id_viaggio_pianificato=viaggi_aggregati.id_viaggio_pianificato  
			where viaggi_aggregati.id_utente='$autista' and str_to_date(giorno_partenza,'%Y-%m-%d')>=CURDATE()) as comodo");

		   $statement->execute();
		   if($row=$statement->fetch()){
			 echo $row['n'];
		   }

		}
			catch (Exception $e){
               return $e->getMessage(); //return exception
        }   
		   ?>
