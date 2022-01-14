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
if(isset($_POST['pagina'])){
	$pagina=$_POST['pagina'];
}else{
	$pagina=1;
	//exit();
}


$pagina=$pagina-1;
$rows=array();
//leggo i valori

		    try { 
		   $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
          
//			$statement = $conn->prepare("select  pren_prenotazioni.id  from pren_prenotazioni, 
//			viaggi_condivisi where pren_prenotazioni.id=viaggi_condivisi.prenotazione and pren_prenotazioni.utente='$autista'  order by giorno_partenza DESC LIMIT $pagina,1 ");


			$statement = $conn->prepare("select distinct viaggi_condivisi.prenotazione, 'viaggio condiviso' as tipologia, DATE_FORMAT(vista_viaggi.giorno_partenza,'%d/%m/%Y') as partenza, vista_viaggi.ora_partenza,  DATE_FORMAT(vista_viaggi.giorno_ritorno,'%d/%m/%Y') as ritorno, vista_viaggi.ora_ritorno,vista_viaggi.indirizzo_partenza,vista_viaggi.comune_destinazione,vista_viaggi.indirizzo_destinazione,vista_viaggi.passeggeri,alimentazione,targa,cilindrata,marca,modello,stato,vista_viaggi.motivo_viaggio,nome,cognome,vista_viaggi.id_viaggio_pianificato 
			from vista_viaggi,viaggi_condivisi,pren_prenotazioni 
			where 
			vista_viaggi.prenotazione=viaggi_condivisi.viaggio
			and viaggi_condivisi.prenotazione=pren_prenotazioni.id
			and pren_prenotazioni.utente='$autista' and str_to_date(vista_viaggi.giorno_partenza,'%Y-%m-%d')>=CURDATE()			
			UNION ALL
			select distinct prenotazione, 'viaggio aggregato' as tipologia, DATE_FORMAT(giorno_partenza,'%d/%m/%Y') as partenza, ora_partenza,  DATE_FORMAT(giorno_ritorno,'%d/%m/%Y') as ritorno, ora_ritorno,indirizzo_partenza,comune_destinazione,indirizzo_destinazione,passeggeri,alimentazione,targa,cilindrata,marca,modello,stato,motivo_viaggio,nome,cognome,vista_viaggi.id_viaggio_pianificato 
			from vista_viaggi LEFT JOIN viaggi_aggregati ON vista_viaggi.id_viaggio_pianificato=viaggi_aggregati.id_viaggio_pianificato  
			where viaggi_aggregati.id_utente='$autista' and str_to_date(giorno_partenza,'%Y-%m-%d')>=CURDATE()
			order by partenza DESC LIMIT $pagina,1 ");



/*
			$statement->execute();
		   if($row=$statement->fetch()){
			$id_p2= $row['id'];

		   }
		
			$statement = $conn->prepare("select *, p2.id as prenotazione_agg, DATE_FORMAT(p1.giorno_partenza,'%d/%m/%Y') as partenza, DATE_FORMAT(p1.giorno_ritorno,'%d/%m/%Y') as ritorno from pren_prenotazioni p2, pren_prenotazioni p1 JOIN pren_auto  JOIN viaggi_condivisi JOIN marca JOIN autisti JOIN auto JOIN parco LEFT JOIN modello ON auto.id_modello=modello.id where p2.id=$id_p2 and p1.id=viaggi_condivisi.viaggio and autisti.matricola=p1.utente and pren_auto.prenotazione=viaggi_condivisi.viaggio and parco.id=pren_auto.auto and parco.id_auto=auto.id and marca.ID=auto.id_marca and p2.utente='$autista' and p2.id=viaggi_condivisi.prenotazione ");
*/

		   $statement->execute();
		   $i=0;    
		   while($row=$statement->fetch()){
			   $rows[$i]=array();
			   $rows[$i]=$row;  
			   $i++;
		   }
		   $statement = $conn->prepare("select * from pren_tappeintermedie where prenotazione='$pianificazione'");
		   $statement->execute();
		   while($row=$statement->fetch()){
			   $rows[$i]=array();
			   $rows[$i]=$row;  
			   $i++;
		   }
		 $rows['dimensione']=$i;
		 $rows['tipo']=1;
		 if($i==0){
			  $rows['tipo']=0;
			
			   $statement = $conn->prepare("select *, p2.id as prenotazione_agg, DATE_FORMAT(p1.giorno_partenza,'%d/%m/%Y') as partenza, DATE_FORMAT(p1.giorno_ritorno,'%d/%m/%Y') as ritorno from pren_prenotazioni p2, pren_prenotazioni p1 JOIN pren_auto  JOIN viaggi_condivisi JOIN marca JOIN autisti JOIN auto JOIN parco LEFT JOIN modello ON auto.id_modello=modello.id where p2.id=$id_p2 and p1.id=viaggi_condivisi.prenotazione_andata and autisti.matricola=p1.utente and pren_auto.prenotazione=viaggi_condivisi.prenotazione_andata and parco.id=pren_auto.auto and parco.id_auto=auto.id and marca.ID=auto.id_marca and p2.utente='$autista' and p2.id=viaggi_condivisi.prenotazione ");
		   $statement->execute();
		   $i=0;    
		   while($row=$statement->fetch()){
			   $rows['andata']=array();
			   $rows['andata']=$row;  
			   $i++;
		   }
		    
		   		   $statement = $conn->prepare("select *, p2.id as prenotazione_agg, DATE_FORMAT(p1.giorno_partenza,'%d/%m/%Y') as partenza, DATE_FORMAT(p1.giorno_ritorno,'%d/%m/%Y') as ritorno from pren_prenotazioni p2, pren_prenotazioni p1 JOIN pren_auto  JOIN viaggi_condivisi JOIN marca JOIN autisti JOIN auto JOIN parco LEFT JOIN modello ON auto.id_modello=modello.id where  p2.id=$id_p2 and p1.id=viaggi_condivisi.prenotazione_ritorno and autisti.matricola=p1.utente and pren_auto.prenotazione=viaggi_condivisi.prenotazione_ritorno and parco.id=pren_auto.auto and parco.id_auto=auto.id and marca.ID=auto.id_marca and p2.utente='$autista' and p2.id=viaggi_condivisi.prenotazione ");

		   $statement->execute();
		   $i=0;    
		   while($row=$statement->fetch()){
			   $rows['ritorno']=array();
			   $rows['ritorno']=$row;  
			   $i++;
		   }
		   
		   $statement = $conn->prepare("select * from pren_tappeintermedie where prenotazione='$pianificazione'");
		   $statement->execute();
		   while($row=$statement->fetch()){
			   $rows[$i]=array();
			   $rows[$i]=$row;  
			   $i++;
		   }
		    $rows['dimensione']=$i;
		 }

//ritorno l'array
echo json_encode($rows);
		}
			catch (Exception $e){
               return $e->getMessage(); //return exception
        }   
		   ?>
