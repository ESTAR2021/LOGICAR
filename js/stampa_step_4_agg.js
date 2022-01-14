
$(document).ready(function() {
		
$.ajax({
		type:'GET',
		url:'../php/booking/getRiepilogoAgg.php',
		success: function(data) {
		
			var riepilogo = $.parseJSON(data);
			
			if(riepilogo['tipo']==1){
			$('#daypartenza_r').remove();
			$('#ritorno').remove();
			$('#orapartenza_r').remove();
			$('#dayarrivo_r').remove();	
			$('#oraarrivo_r').remove();
			$('#sedepartenza_r').remove();
			$('#luogodest_r').remove();
			$('#passeggeri_r').remove();
			$('#alimentazione_r').remove();
			$('#anno_r').remove();		
			$('#cilindrata_r').remove();
			$('#marca_r').remove();
			$('#autista_r').remove();	
			$('#stato_r').remove();
			$('#motivo_r').remove();
			$('#tapperitorno_r').remove();
			$('#tappeandata_r').remove();
			

			
			$('#daypartenza').html(riepilogo[0]['partenza']);		
			$('#orapartenza').html(riepilogo[0]['ora_partenza']);	
			$('#dayarrivo').html(riepilogo[0]['ritorno']);		
			$('#oraarrivo').html(riepilogo[0]['ora_ritorno']);	
			$('#sedepartenza').html(riepilogo[0]['indirizzo_partenza']);			
			$('#luogodest').html(riepilogo[0]['comune_destinazione']+' Via '+riepilogo[0]['indirizzo_destinazione'] );	
			$('#passeggeri').html(riepilogo[0]['passeggeri']);	
			$('#alimentazione').html(riepilogo[0]['alimentazione']);	
			$('#anno').html(riepilogo[0]['anno']);			
			$('#cilindrata').html(riepilogo[0]['cilindrata']);	
			$('#marca').html(riepilogo[0]['marca']+' '+riepilogo[0]['modello']);	
			var stato=riepilogo[0]['stato'];
			$('#autista').html(riepilogo[0]['nome']+" "+ riepilogo[0]['cognome']+"");
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
			$('#andata').html('Viaggio');
		}else{
			$('#andata').html('<b>Andata</b>');
			$('#ritorno').html('<b>Ritorno</b>');
		
			if(riepilogo['andata']){
			$('#daypartenza').html(riepilogo['andata']['partenza']);		
			$('#orapartenza').html(riepilogo['andata']['ora_partenza']);	
			$('#dayarrivo').html(riepilogo['andata']['ritorno']);		
			$('#oraarrivo').html(riepilogo['andata']['ora_ritorno']);	
			$('#sedepartenza').html(riepilogo['andata']['indirizzo_partenza']);			
			$('#luogodest').html(riepilogo['andata']['comune_destinazione']+' Via '+riepilogo['andata']['indirizzo_destinazione'] );	
			$('#passeggeri').html(riepilogo['andata']['passeggeri']);	
			$('#alimentazione').html(riepilogo['andata']['alimentazione']);	
			$('#anno').html(riepilogo['andata']['anno']);			
			$('#cilindrata').html(riepilogo['andata']['cilindrata']);	
			$('#marca').html(riepilogo['andata']['marca']+' '+riepilogo['andata']['modello']);	
			var stato=riepilogo['andata']['stato'];
			$('#autista').html(riepilogo['andata']['nome']+" "+ riepilogo['andata']['cognome']+"");
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
			$('#motivo').html(riepilogo['andata']['motivo_viaggio']);	
			
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
			}else{
						$('#daypartenza').remove();
						$('#andata').remove();	
						$('#orapartenza').remove();
						$('#dayarrivo').remove();	
						$('#oraarrivo').remove();
						$('#sedepartenza').remove();
						$('#luogodest').remove();
						$('#passeggeri').remove();
						$('#alimentazione').remove();
						$('#anno').remove();		
						$('#cilindrata').remove();
						$('#marca').remove();
						$('#autista').remove();	
						$('#stato').remove();
						$('#motivo').remove();
						$('#tapperitorno').remove();
						$('#tappeandata').remove();
			
				
			}
		
			if(riepilogo['ritorno']){
			$('#daypartenza_r').html(riepilogo['ritorno']['partenza']);		
			$('#orapartenza_r').html(riepilogo['ritorno']['ora_partenza']);	
			$('#dayarrivo_r').html(riepilogo['ritorno']['ritorno']);		
			$('#oraarrivo_r').html(riepilogo['ritorno']['ora_ritorno']);	
			$('#sedepartenza_r').html(riepilogo['ritorno']['indirizzo_partenza']);			
			$('#luogodest_r').html(riepilogo['ritorno']['comune_destinazione']+' Via '+riepilogo['ritorno']['indirizzo_destinazione'] );	
			$('#passeggeri_r').html(riepilogo['ritorno']['passeggeri']);	
			$('#alimentazione_r').html(riepilogo['ritorno']['alimentazione']);	
			$('#anno_r').html(riepilogo['ritorno']['anno']);			
			$('#cilindrata_r').html(riepilogo['ritorno']['cilindrata']);	
			$('#marca_r').html(riepilogo['ritorno']['marca']+' '+riepilogo['ritorno']['modello']);	
			var stato=riepilogo['ritorno']['stato'];
			$('#autista_r').html(riepilogo['ritorno']['nome']+" "+ riepilogo['ritorno']['cognome']+"<img src='../"+riepilogo['ritorno']['url_foto']+"'>");
			switch(stato) {
				case '0':
					$('#stato_r').html("<img src='../img/booking/stato_attesa.png'> Richiesta in attesa di approvazione");
					break;
				case '1':
					$('#stato_r').html("<img src='../img/booking/stato_approvato.png'> Richiesta approvata");
					break;
				case '2':
					$('#stato_r').html("<img src='../img/booking/stato_rifiutato.png'> Richiesta rifiutata");
					break;
			}
			$('#motivo_r').html(riepilogo['ritorno']['motivo_viaggio']);	
			
			var andata=0;
			var ritorno=0;
			for (var i = 1; i < riepilogo.dimensione; i++) {
				if(riepilogo[i]['A/R']==0){
					$('#tappeandata_r').append(riepilogo[i]['indirizzo']);
					andata++;					
				}
				if(riepilogo[i]['A/R']==1){
					$('#tapperitorno_r').append(riepilogo[i]['indirizzo']);
					ritorno++;
				}
		
			}
			if(andata==0){
				$('#tappeandata_r').html('Nessuna Tappa Intermedia nel viaggio di ANDATA');
			}
			if(ritorno==0){
				$('#tapperitorno_r').html('Nessuna Tappa Intermedia nel viaggio di RITORNO');
			}
			}else{
						$('#daypartenza_r').remove();
						$('#ritorno').remove();
						$('#daypartenza_r').remove();		
						$('#orapartenza_r').remove();
						$('#dayarrivo_r').remove();	
						$('#oraarrivo_r').remove();
						$('#sedepartenza_r').remove();
						$('#luogodest_r').remove();
						$('#passeggeri_r').remove();
						$('#alimentazione_r').remove();
						$('#anno_r').remove();		
						$('#cilindrata_r').remove();
						$('#marca_r').remove();
						$('#autista_r').remove();	
						$('#stato_r').remove();
						$('#motivo_r').remove();
						$('#tapperitorno_r').remove();
						$('#tappeandata_r').remove();
			
				
				
			}
		}
		window.print();
		} 	

		});

	

	
	


});


