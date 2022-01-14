<?php
ini_set("error_reporting",0);
//mi connetto al db
include '../require_conn.php';
session_start();
$sede_operatore=$_SESSION['sede_lavoro'];

if(isset($_POST['data_filter'])) {
	$data=$_POST['data_filter'];
	$chk_all=$_POST['chk_all'];
	$chk_non=$_POST['chk_non'];
	if(isset($_POST['partenza'])and $_POST['partenza']!='undefined'){
	$sede_operatore=$_POST['partenza'];}
}else{
	exit();
}

$rows=array();
//leggo i valori

		try { 
		$conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);

	     if($chk_all==1){ 	//tutte le auto prenotate dal giorno selezionato(senza auto non prenotate) , quindi con stato diverso da cancellato e rifiutato 
				$statement = $conn->prepare("select cognome,nome,pren_prenotazioni.passeggeri as passeggeri,passeggeri_andata,passeggeri_ritorno,ora_partenza,comune_destinazione,indirizzo_destinazione,ora_ritorno,marca,modello,targa,posti,pren_prenotazioni.id as pian, viaggi_pianificati.id as viaggi_pianificati_id, viaggi_pianificati.passeggeri as num_passeggeri,
				DATE_FORMAT(giorno_partenza,'%Y/%m/%d') as partenza, DATE_FORMAT(giorno_ritorno,'%Y/%m/%d') as 
				ritorno 
				from pren_prenotazioni, pren_auto,viaggi_pianificati, marca, auto,modello, parco, autisti where matricola=pren_prenotazioni.utente and
				( pren_prenotazioni.giorno_partenza>=STR_TO_DATE('$data','%d/%m/%Y') or pren_prenotazioni.giorno_ritorno=STR_TO_DATE('$data','%d/%m/%Y') )
			    and pren_auto.prenotazione=pren_prenotazioni.id and parco.id_auto= auto.id and parco.id=pren_auto.auto and marca.ID=auto.id_marca 
			    and viaggi_pianificati.idprenotazione=pren_prenotazioni.id  and stato=1  and modello.id = id_modello and sede_partenza='$sede_operatore'         
				ORDER BY partenza,ora_partenza");
		 } 		 
		 elseif($chk_non==1){	//tutte le auto prenotate e non prenotate del solo giorno selezionato 
				$statement = $conn->prepare("select cognome,nome,pren_prenotazioni.passeggeri as passeggeri,passeggeri_andata,passeggeri_ritorno,ora_partenza,comune_destinazione,indirizzo_destinazione,ora_ritorno,marca,modello,targa,posti,pren_prenotazioni.id as pian, viaggi_pianificati.id as viaggi_pianificati_id, viaggi_pianificati.passeggeri as num_passeggeri,
				DATE_FORMAT(giorno_partenza,'%Y/%m/%d') as partenza, DATE_FORMAT(giorno_ritorno,'%Y/%m/%d') as 
				ritorno from pren_prenotazioni, pren_auto,viaggi_pianificati, marca, auto,modello, parco, autisti where matricola=pren_prenotazioni.utente and
				( pren_prenotazioni.giorno_partenza=STR_TO_DATE('$data','%d/%m/%Y') or pren_prenotazioni.giorno_ritorno=STR_TO_DATE('$data','%d/%m/%Y') )
				and pren_auto.prenotazione=pren_prenotazioni.id and parco.id_auto= auto.id and parco.id=pren_auto.auto and marca.ID=auto.id_marca 
				and viaggi_pianificati.idprenotazione=pren_prenotazioni.id  and stato=1  and modello.id = id_modello    and sede_partenza='$sede_operatore' 
				UNION // tutte le auto non prenotate
				select '_________' as cognome ,'','','','','','','','',marca,modello,targa,'','','__________' as partenza,'__________' as ritorno from v_parco where sede='$sede_operatore' and v_parco.data_cancellazione is null and v_parco.prenotabile='Si' and id not in (select id_auto from v_prenotazioni where sede_partenza='$sede_operatore' and STR_TO_DATE('$data','%d/%m/%Y') between giorno_partenza and giorno_ritorno and (stato!=5 AND stato!=2))           
				ORDER BY partenza,ora_partenza");
		 }
		  else {	//tutte le auto prenotate del solo giorno selezionato 
				$statement = $conn->prepare("select cognome,nome,pren_prenotazioni.passeggeri as passeggeri,passeggeri_andata,passeggeri_ritorno,ora_partenza,comune_destinazione,indirizzo_destinazione,ora_ritorno,marca,modello,targa,posti,pren_prenotazioni.id as pian, viaggi_pianificati.id as viaggi_pianificati_id, viaggi_pianificati.passeggeri as num_passeggeri,
				DATE_FORMAT(giorno_partenza,'%Y/%m/%d') as partenza, DATE_FORMAT(giorno_ritorno,'%Y/%m/%d') as 
				ritorno from pren_prenotazioni, pren_auto,viaggi_pianificati, marca, auto,modello, parco, autisti where matricola=pren_prenotazioni.utente and
				( pren_prenotazioni.giorno_partenza=STR_TO_DATE('$data','%d/%m/%Y') or pren_prenotazioni.giorno_ritorno=STR_TO_DATE('$data','%d/%m/%Y') )
				and pren_auto.prenotazione=pren_prenotazioni.id and parco.id_auto= auto.id and parco.id=pren_auto.auto and marca.ID=auto.id_marca 
				and viaggi_pianificati.idprenotazione=pren_prenotazioni.id  and stato=1  and modello.id = id_modello    and sede_partenza='$sede_operatore'        
				ORDER BY partenza,ora_partenza");
		 }		 
		 
		   $statement->execute();
		   $i=0;    
		   while($row=$statement->fetch()){
			   $rows[$i]=array();
			   $rows[$i]=$row;  
			   $pian= $rows[$i]['pian'];
			   $viaggio_pianificato_id= $rows[$i]['viaggi_pianificati_id'];
			    $rows[$i]['num_passeggeri']=$rows[$i]['num_passeggeri'];
				$rows[$i]['num_passeggeri_A']=$rows[$i]['passeggeri_andata'];
			    $rows[$i]['num_passeggeri_R']=$rows[$i]['passeggeri_ritorno'];
			    $rows[$i]['passeggeri']='';
				$statement2 = $conn->prepare("SELECT nome, cognome, prenotazione_ritorno,prenotazione_andata,viaggio  FROM `viaggi_condivisi`, pren_prenotazioni pp,autisti 
					where prenotazione=pp.id and (prenotazione_andata= $pian or viaggio= $pian or prenotazione_ritorno= $pian) and pp.utente=autisti.matricola");	
					
				$statement2->execute();
					   while($row2=$statement2->fetch()){	
						   if($row2['viaggio']==$pian){
								 $rows[$i]['passeggeri'].=$row2['nome'].' '.$row2['cognome'].' [A/R]<br>';  
						   }
						  if($row2['prenotazione_andata']==$pian and $row2['prenotazione_ritorno']!=$pian){
						     $rows[$i]['passeggeri'].=$row2['nome'].' '.$row2['cognome'].' [A]<br>';  
							}
							  if($row2['prenotazione_andata']!=$pian and $row2['prenotazione_ritorno']==$pian){
						     $rows[$i]['passeggeri'].=$row2['nome'].' '.$row2['cognome'].' [R]<br>';  
							}
					   }
				$statement3 = $conn->prepare("SELECT nome, cognome, id_viaggio_pianificato, id_utente  FROM viaggi_aggregati, autisti 
					where id_viaggio_pianificato=$viaggio_pianificato_id and id_utente=autisti.matricola");	
                $statement3->execute();
				while($row3=$statement3->fetch()){				
					$rows[$i]['passeggeri'].=$row3['nome'].' '.$row3['cognome'].' [A/R]<br>'; 
				}				
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
