<?php
ini_set("error_reporting",0);
//mi connetto al db
include '../require_conn.php';
session_start();
//recupero i dati in sessione
$azienda=$_SESSION['asl'];
if(isset($_SESSION['pianificazione'])){
	$pianificazione=$_SESSION['pianificazione'];
}else{
	//echo 0;
	exit();
}

$rows=array();
$rows['andata_ritorno']=array();
$rows['andata']=array();
$rows['ritorno']=array();
//leggo i valori

		   try { 
		   $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
           $statement = $conn->prepare("select distinct marca.*,auto.*, modello.*, p2.*,p2.id as idviaggio, parco.targa as targa_auto, parco.posti,
		   parco.id AS idauto ,
		   p1.ora_partenza as ora_partenza_p1, p2.ora_partenza as ora_partenza_p2,p1.passeggeri as passeggeri_da_aggiungere, parco.posti as posti_in_auto,
		   p1.ora_ritorno as ora_ritorno_p1, p2.ora_ritorno as ora_ritorno_p2, passeggeri_andata as passeggeri_andata_tot, passeggeri_ritorno as passeggeri_ritorno_tot
		   from marca, auto, parco, modello, pren_prenotazioni p1,pren_auto,  pren_prenotazioni p2, viaggi_pianificati where auto.id=parco.id_auto and marca.id=auto.id_marca and auto.id_modello=modello.id and parco.id_azienda=p1.azienda and p1.id='$pianificazione' AND parco.id=pren_auto.auto and viaggi_pianificati.stato='1' and `prenotazione`=idprenotazione and
		   p2.id=prenotazione and DATE(p2.giorno_partenza ) =DATE(p1.giorno_partenza) and
		   LOWER(p1.comune_destinazione)=LOWER(p2.comune_destinazione) and
		   LOWER(p1.indirizzo_partenza)=LOWER(p2.indirizzo_partenza) and 
		   viaggi_pianificati.passeggeri_ritorno<= parco.posti 
			and viaggi_pianificati.passeggeri_andata<= parco.posti");

		   $statement->execute();
		   $i_andata_ritorno=0;    
		   $i_ritorno=0;    
		   $i_andata=0;   
		   $i_altri_orari=0;   
		  
		   while($row=$statement->fetch()){
				$ora_partenza_p1 = strtotime($row['ora_partenza_p1']); 
				$ora_partenza_p2 = strtotime($row['ora_partenza_p2']); 
				$ora_ritorno_p1 = strtotime($row['ora_ritorno_p1']); 
				$ora_ritorno_p2 = strtotime($row['ora_ritorno_p2']); 
				$targa = $row['targa_auto']; 
				$passeggeri_andata = $row['passeggeri_andata_tot']; 
	
				$passeggeri_ritorno =$row['passeggeri_ritorno_tot']; 
				$passeggeri_da_aggiungere =$row['passeggeri_da_aggiungere']; 
				$posti_in_auto =$row['posti_in_auto']; 
			
				$interval_partenza  = abs($ora_partenza_p1 - $ora_partenza_p2);
				$minutes_partenza   = round($interval_partenza / 60);
				$interval_ritorno = abs($ora_ritorno_p1 - $ora_ritorno_p2);
				$minutes_ritorno   = round($interval_ritorno / 60);
		
			if($minutes_ritorno<=60 and $minutes_partenza<=60 and ($passeggeri_andata+$passeggeri_da_aggiungere<=$posti_in_auto and $passeggeri_ritorno+$passeggeri_da_aggiungere <=$posti_in_auto)){
				$rows['andata_ritorno'][$i_andata_ritorno]=array();
				$rows['andata_ritorno'][$i_andata_ritorno]=$row;  
				$i_andata_ritorno++;
			}
				if($passeggeri_andata+$passeggeri_da_aggiungere<=$posti_in_auto and $passeggeri_ritorno+$passeggeri_da_aggiungere <=$posti_in_auto){
	  
				$i_altri_orari++;
			}
			if($minutes_ritorno<=60 and ($passeggeri_ritorno+$passeggeri_da_aggiungere <=$posti_in_auto)){
				$rows['ritorno'][$i_ritorno]=array();
				$rows['ritorno'][$i_ritorno]=$row;  
				$i_ritorno++;
			}
			if($minutes_partenza<=60 and ($passeggeri_andata+$passeggeri_da_aggiungere<=$posti_in_auto)){
				$rows['andata'][$i_andata]=array();
				$rows['andata'][$i_andata]=$row;  
				$i_andata++;
			}
		   }
			$rows['andata_ritorno']['i_altri_orari']=$i_altri_orari;
			$rows['andata_ritorno']['dimensione']=$i_andata_ritorno;
			$rows['ritorno']['dimensione']=$i_ritorno;
			$rows['andata']['dimensione']=$i_andata;
		   



echo json_encode($rows);
		}
			catch (Exception $e){
               return $e->getMessage(); //return exception
        }   
		   ?>
