
$(document).ready(function() {
		

	$.ajax({
		type:'GET',
		url:'../php/booking/getRiepilogo.php',
		success: function(data) {
			var riepilogo = $.parseJSON(data);

			$('#prenotante').html(riepilogo[0]['nome']+' '+riepilogo[0]['cognome']);		
			$('#daypartenza').html(riepilogo[0]['partenza']);		
			$('#orapartenza').html(riepilogo[0]['ora_partenza']);	
			$('#dayarrivo').html(riepilogo[0]['ritorno']);		
			$('#oraarrivo').html(riepilogo[0]['ora_ritorno']);	
			$('#sedepartenza').html(riepilogo[0]['indirizzo_partenza']);			
			$('#luogodest').html(riepilogo[0]['comune_destinazione']+' Via '+riepilogo[0]['indirizzo_destinazione'] );	
			$('#passeggeri').html(riepilogo[0]['passeggeri']);	
			$('#alimentazione').html(riepilogo[0]['alimentazione']);	
			$('#anno').html(riepilogo[0]['anno']);		
			$('#targa').html(riepilogo[0]['targa']);				
			$('#cilindrata').html(riepilogo[0]['cilindrata']);	
			$('#marca').html(riepilogo[0]['marca']+' '+riepilogo[0]['modello']);	
			var stato=riepilogo[0]['stato'];
		
			switch(stato) {
				case '0':
					$('#stato').html("<img src='../img/booking/stato_attesa.png'> Richiesta in attesa di approvazione");
					break;
				case '1':
					$('#stato').html("<img src='../img/booking/stato_approvato.png'> Richiesta approvata");
					break;
				case '2':
					$('#stato').html("<img src='../img/booking/stato_rifiutato.png'> Richiesta rifiutata");
					break;
			}
			$('#motivo').html(riepilogo[0]['motivo_viaggio']);	
			
			var andata=0;
			var ritorno=0;
			for (var i = 1; i < riepilogo.dimensione; i++) {
				if(riepilogo[i]['A/R']==0){
					$('#tappeandata').append(riepilogo[i]['indirizzo']);
					andata++;					
				}
				if(riepilogo[i]['A/R']==1){
					$('#tapperitorno').append(riepilogo[i]['indirizzo']);
					ritorno++;
				}
		
			}
			if(andata==0){
				$('#tappeandata').html('Nessuna Tappa Intermedia nel viaggio di ANDATA');
			}
			if(ritorno==0){
				$('#tapperitorno').html('Nessuna Tappa Intermedia nel viaggio di RITORNO');
			}
			window.print();
		}
		});


});


