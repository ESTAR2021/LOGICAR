<?php 
session_start();
$data=$_REQUEST['data'];
$chk_all=$_REQUEST['chk_all'];
$chk_non=$_REQUEST['chk_non'];
$sede_operatore=$_SESSION['sede_lavoro'];
if(isset($_REQUEST['partenza'])){
	$sede_operatore=$_REQUEST['partenza'];}
?>
<html>
<head>
    <script src="../js/jquery.js"></script>
    <script src="../js/jquery-ui.js"></script>
    <script src="../js/application.js"></script>
    <link rel="stylesheet" type="text/css" href="../css/bootstrap.css">
    <style type="text/css">
        @media print{
            body{ background-color:#FFFFFF; background-image:none; color:#000000; }
            #ad{ display:none;}
            #leftbar{ display:none;}
            #contentarea{ width:100%;}
			 a[href]:after {
			content: none !important;
		  }
					
        }
		@page {size: A4;margin: 0; size: landscape;} 
    </style>

</head>
<body>


    <div class="col-md-12 " >

        <div class="col-md-12" id="riepilogo">
            <img class="spostamento" src="../img/booking/riepilogo.png">
            <div class="sfondo_box_auto" >

                    <div class='row'>
					<?php
					include '../php/require_conn.php';
		
	try { 
		 $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
			 
	     if($chk_all==1){ 	//tutte le auto prenotate dal giorno selezionato (senza auto non prenotate)
				$statement = $conn->prepare("select cognome,nome,pren_prenotazioni.passeggeri as passeggeri,passeggeri_andata,passeggeri_ritorno,ora_partenza,comune_destinazione,indirizzo_destinazione,ora_ritorno,marca,modello,targa,pren_prenotazioni.id as pian, viaggi_pianificati.passeggeri as num_passeggeri,
				DATE_FORMAT(giorno_partenza,'%Y/%m/%d') as partenza, DATE_FORMAT(giorno_ritorno,'%Y/%m/%d') as 
				ritorno from pren_prenotazioni, pren_auto,viaggi_pianificati, marca, auto,modello, parco, autisti where matricola=pren_prenotazioni.utente and
				( pren_prenotazioni.giorno_partenza>=STR_TO_DATE('$data','%d/%m/%Y') or pren_prenotazioni.giorno_ritorno=STR_TO_DATE('$data','%d/%m/%Y') )
			    and pren_auto.prenotazione=pren_prenotazioni.id and parco.id_auto= auto.id and parco.id=pren_auto.auto and marca.ID=auto.id_marca 
			    and viaggi_pianificati.idprenotazione=pren_prenotazioni.id  and stato=1  and modello.id = id_modello and sede_partenza='$sede_operatore'         
				ORDER BY partenza,ora_partenza");
		 } 		 
		 elseif($chk_non==1){	//tutte le auto prenotate e non prenotate del solo giorno selezionato 
				$statement = $conn->prepare("select cognome,nome,pren_prenotazioni.passeggeri as passeggeri,passeggeri_andata,passeggeri_ritorno,ora_partenza,comune_destinazione,indirizzo_destinazione,ora_ritorno,marca,modello,targa,pren_prenotazioni.id as pian, viaggi_pianificati.passeggeri as num_passeggeri,
				DATE_FORMAT(giorno_partenza,'%Y/%m/%d') as partenza, DATE_FORMAT(giorno_ritorno,'%Y/%m/%d') as 
				ritorno from pren_prenotazioni, pren_auto,viaggi_pianificati, marca, auto,modello, parco, autisti where matricola=pren_prenotazioni.utente and
				( pren_prenotazioni.giorno_partenza=STR_TO_DATE('$data','%d/%m/%Y') or pren_prenotazioni.giorno_ritorno=STR_TO_DATE('$data','%d/%m/%Y') )
				and pren_auto.prenotazione=pren_prenotazioni.id and parco.id_auto= auto.id and parco.id=pren_auto.auto and marca.ID=auto.id_marca 
				and viaggi_pianificati.idprenotazione=pren_prenotazioni.id  and stato=1  and modello.id = id_modello    and sede_partenza='$sede_operatore' 
				UNION
				select '_________' as cognome ,'','','','','','','','',marca,modello,targa,'','','__________' as partenza,'__________' as ritorno from v_parco where sede='$sede_operatore' and v_parco.data_cancellazione is null and v_parco.prenotabile='Si' and id not in (select id_auto from v_prenotazioni where sede_partenza='$sede_operatore' and STR_TO_DATE('$data','%d/%m/%Y') between giorno_partenza and giorno_ritorno and (stato!=5 AND stato!=2))             
				ORDER BY partenza,ora_partenza");
		 }
		  else {	//tutte le auto prenotate del solo giorno selezionato 
				$statement = $conn->prepare("select cognome,nome,pren_prenotazioni.passeggeri as passeggeri,passeggeri_andata,passeggeri_ritorno,ora_partenza,comune_destinazione,indirizzo_destinazione,ora_ritorno,marca,modello,targa,pren_prenotazioni.id as pian, viaggi_pianificati.passeggeri as num_passeggeri,
				DATE_FORMAT(giorno_partenza,'%Y/%m/%d') as partenza, DATE_FORMAT(giorno_ritorno,'%Y/%m/%d') as 
				ritorno from pren_prenotazioni, pren_auto,viaggi_pianificati, marca, auto,modello, parco, autisti where matricola=pren_prenotazioni.utente and
				( pren_prenotazioni.giorno_partenza=STR_TO_DATE('$data','%d/%m/%Y') or pren_prenotazioni.giorno_ritorno=STR_TO_DATE('$data','%d/%m/%Y') )
				and pren_auto.prenotazione=pren_prenotazioni.id and parco.id_auto= auto.id and parco.id=pren_auto.auto and marca.ID=auto.id_marca 
				and viaggi_pianificati.idprenotazione=pren_prenotazioni.id  and stato=1  and modello.id = id_modello    and sede_partenza='$sede_operatore'        
				ORDER BY partenza,ora_partenza");
		 }				
	
		 $statement->execute();
		 $i=0; 
		  print "DATA PRENOTAZIONE          ". $data;
	   
		   while($row=$statement->fetch()){
			   if($i==0){
				    print "    SEDE          ". $row['indirizzo_partenza'];
					?> 
						<table class='table' border='1px' id='include_table'><thead>
					<tr><td>Prenotante</td>	<td>Passeggeri</td>	<td>Num.Passeggeri</td><td>Partenza</td><td>Destinazione</td><td>Rientro</td><td>Auto</td><td>Firma ritiro chiavi</td><td>Firma restituzione chiavi</td></tr></thead><tbody id='include_table_body'><?php
					
			   } 
			   $rows[$i]=array();
			   $rows[$i]=$row;  
			   $pian= $rows[$i]['pian'];
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
					   
				?><tr><td><?php print $rows[$i]['cognome'].' '.$rows[$i]['nome']; ?> </td>
				<td><?php print $rows[$i]['passeggeri']; ?></td><td><?php print $rows[$i]['num_passeggeri_A'].'[Andata]   '. $rows[$i]['num_passeggeri_R'].'[Ritorno]'; ?></td><td> <?php print $rows[$i]['partenza'].' '.$rows[$i]['ora_partenza']; ?>
				</td><td><?php print $rows[$i]['comune_destinazione'].' '.$rows[$i]['indirizzo_destinazione']; ?> </td><td>
				<?php print $rows[$i]['ritorno'].' '.$rows[$i]['ora_ritorno']; ?></td><td> 
				<?php print $rows[$i]['marca'].' '.$rows[$i]['modello'].' '.$rows[$i]['targa']; ?></td><td></td><td></td><?php 
					 
			  $i++;
		   }
		   if($i==0){
			    print " Nessuna prenotazione per la data scelta";
		   }
		  
		?> </tbody></table> <?php
		 $rows['dimensione']=$i;


		}
			catch (Exception $e){
               return $e->getMessage(); //return exception
        }   
		   ?>
					 

                       

             
            </div>
        </div>
    </div>


<script type="text/javascript">
$(document).ready(function() {	window.print(); });

</script>

</html>
