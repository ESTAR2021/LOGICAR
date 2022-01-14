/**
 * Created by anna on 05/09/2016.
 */

    //modale per avanzamento step

$(document).ready(function() {


    //attivo la modale al document ready per visualizzare lo step
	
	$.ajax({
		type:'GET',
		url:'../php/checksession.php',
		success: function(data) {
			if(data==0){
				location.href='../login.html';
			}
		}
	});
	$.ajax({
		type:'GET',
		url:'../php/booking/getNumeroPrenotazionAgg.php',
		success: function(data) {
		var n=data;

			for (var i = 1; i <= n; i++) {
				if(i==1){
					$('.pagination').append('<li class="pagina active"><a href="#" >'+i+'</a></li>');
				}else{
					$('.pagination').append('<li class="pagina"><a href="#" >'+i+'</a></li>');
				}
			}
			if(n>=1){
				$.ajax({
				type:'POST',
				url:'../php/booking/getRiepilogoByPaginationAgg.php',
				data:{pagina: 1},
				success: function(data) {
					
					var riepilogo = $.parseJSON(data);
				
						if(riepilogo['tipo']==1){
						$('#tipologia_r').hide();
						$('#daypartenza_r').hide();
						$('#ritorno').hide();
						$('#daypartenza_r').hide();		
						$('#orapartenza_r').hide();
						$('#dayarrivo_r').hide();	
						$('#oraarrivo_r').hide();
						$('#sedepartenza_r').hide();
						$('#luogodest_r').hide();
						$('#passeggeri_r').hide();
						$('#alimentazione_r').hide();
						$('#targa_r').hide();		
						$('#cilindrata_r').hide();
						$('#marca_r').hide();
						$('#autista_r').hide();	
						$('#stato_r').hide();
						$('#motivo_r').hide();
						$('#tapperitorno_r').hide();
						$('#tappeandata_r').hide();
						

						
						$('#daypartenza').html(riepilogo[0]['partenza']);	
						$('#id_prenotazione').val(riepilogo[0]['prenotazione']);
						$('#id_viaggio_pianificato').val(riepilogo[0]['id_viaggio_pianificato']);
						$('#id_tipologia').val(riepilogo[0]['tipologia']);						
/*	//questo codice disabilitava il pulsante cancellazione il giorno stesso della prenotazione
						var parts =riepilogo[0]['partenza'].split('/');

						var mydate = new Date(parts[2],parts[1]-1,parts[0]); 
						var today = new Date();
				
						if(today>mydate){
							$('#bottoneCancella').prop('disabled', true);
						}
						*/
						$('#tipologia').html(riepilogo[0]['tipologia']);
						$('#orapartenza').html(riepilogo[0]['ora_partenza']);	
						$('#dayarrivo').html(riepilogo[0]['ritorno']);		
						$('#oraarrivo').html(riepilogo[0]['ora_ritorno']);	
						$('#sedepartenza').html(riepilogo[0]['indirizzo_partenza']);			
						$('#luogodest').html(riepilogo[0]['comune_destinazione']+' Via '+riepilogo[0]['indirizzo_destinazione'] );	
						$('#passeggeri').html(riepilogo[0]['passeggeri']);	
						$('#alimentazione').html(riepilogo[0]['alimentazione']);	
						$('#targa').html(riepilogo[0]['targa']);			
						$('#cilindrata').html(riepilogo[0]['cilindrata']);	
						$('#marca').html(riepilogo[0]['marca']+' '+riepilogo[0]['modello']);	
						var stato=riepilogo[0]['stato'];
						$('#autista').html(riepilogo[0]['nome']+" "+ riepilogo[0]['cognome']);
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
						$('#id_prenotazione').val(riepilogo['andata']['prenotazione']);
						$('#id_viaggio_pianificato').val(riepilogo['andata']['id_viaggio_pianificato']);
						$('#id_tipologia').val(riepilogo['andata']['tipologia']);							
						$('#daypartenza').html(riepilogo['andata']['partenza']);
/*	//questo codice disabilitava il pulsante cancellazione il giorno stesso della prenotazione
						var parts =riepilogo['andata']['partenza'].split('/');

						var mydate = new Date(parts[2],parts[1]-1,parts[0]); 
						var today = new Date();
				
						if(today>mydate){
							$('#bottoneCancella').prop('disabled', true);
						} */
						$('#tipologia').html(riepilogo['andata']['tipologia']);						
						$('#orapartenza').html(riepilogo['andata']['ora_partenza']);	
						$('#dayarrivo').html(riepilogo['andata']['ritorno']);		
						$('#oraarrivo').html(riepilogo['andata']['ora_ritorno']);	
						$('#sedepartenza').html(riepilogo['andata']['indirizzo_partenza']);			
						$('#luogodest').html(riepilogo['andata']['comune_destinazione']+' Via '+riepilogo['andata']['indirizzo_destinazione'] );	
						$('#passeggeri').html(riepilogo['andata']['passeggeri']);	
						$('#alimentazione').html(riepilogo['andata']['alimentazione']);	
						$('#targa').html(riepilogo['andata']['targa']);			
						$('#cilindrata').html(riepilogo['andata']['cilindrata']);	
						$('#marca').html(riepilogo['andata']['marca']+' '+riepilogo['andata']['modello']);	
						var stato=riepilogo['andata']['stato'];
						$('#autista').html(riepilogo['andata']['nome']+" "+ riepilogo['andata']['cognome']);
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
									$('#tipologia').hide();
									$('#daypartenza').hide();
									$('#andata').hide();
									$('#daypartenza').hide();		
									$('#orapartenza').hide();
									$('#dayarrivo').hide();	
									$('#oraarrivo').hide();
									$('#sedepartenza').hide();
									$('#luogodest').hide();
									$('#passeggeri').hide();
									$('#alimentazione').hide();
									$('#targa').hide();		
									$('#cilindrata').hide();
									$('#marca').hide();
									$('#autista').hide();	
									$('#stato').hide();
									$('#motivo').hide();
									$('#tapperitorno').hide();
									$('#tappeandata').hide();
			
				
						}
		
						if(riepilogo['ritorno']){
						$('#id_prenotazione').val(riepilogo['ritorno']['prenotazione']);
						$('#id_viaggio_pianificato').val(riepilogo['ritorno']['id_viaggio_pianificato']);
						$('#id_tipologia').val(riepilogo['ritorno']['tipologia']);		
						$('#daypartenza_r').html(riepilogo['ritorno']['partenza']);	
/*	//questo codice disabilitava il pulsante cancellazione il giorno stesso della prenotazione
						var parts =riepilogo['ritorno']['partenza'].split('/');

						var mydate = new Date(parts[2],parts[1]-1,parts[0]); 
						var today = new Date();
				
						if(today>mydate){
							$('#bottoneCancella').prop('disabled', true);
						}	*/	
						$('#tipologia_r').html(riepilogo['ritorno']['tipologia']);							
						$('#orapartenza_r').html(riepilogo['ritorno']['ora_partenza']);	
						$('#dayarrivo_r').html(riepilogo['ritorno']['ritorno']);		
						$('#oraarrivo_r').html(riepilogo['ritorno']['ora_ritorno']);	
						$('#sedepartenza_r').html(riepilogo['ritorno']['indirizzo_partenza']);			
						$('#luogodest_r').html(riepilogo['ritorno']['comune_destinazione']+' Via '+riepilogo['ritorno']['indirizzo_destinazione'] );	
						$('#passeggeri_r').html(riepilogo['ritorno']['passeggeri']);	
						$('#alimentazione_r').html(riepilogo['ritorno']['alimentazione']);	
						$('#targa_r').html(riepilogo['ritorno']['targa']);			
						$('#cilindrata_r').html(riepilogo['ritorno']['cilindrata']);	
						$('#marca_r').html(riepilogo['ritorno']['marca']+' '+riepilogo['ritorno']['modello']);	
						var stato=riepilogo['ritorno']['stato'];
						$('#autista_r').html(riepilogo['ritorno']['nome']+" "+ riepilogo['ritorno']['cognome']);
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
									$('#tipologia_r').hide();
									$('#daypartenza_r').hide();
									$('#ritorno').hide();
									$('#daypartenza_r').hide();		
									$('#orapartenza_r').hide();
									$('#dayarrivo_r').hide();	
									$('#oraarrivo_r').hide();
									$('#sedepartenza_r').hide();
									$('#luogodest_r').hide();
									$('#passeggeri_r').hide();
									$('#alimentazione_r').hide();
									$('#targa_r').hide();		
									$('#cilindrata_r').hide();
									$('#marca_r').hide();
									$('#autista_r').hide();	
									$('#stato_r').hide();
									$('#motivo_r').hide();
									$('#tapperitorno_r').hide();
									$('#tappeandata_r').hide();
						
							
							
						}
					}
					
					
					$('.loader').fadeOut();
				}
				});
		
			}else{
				$('#nessuna_prenotazione').fadeIn();
				$('#dettagli').fadeOut();
				$('.loader').fadeOut();
			}
		}
	});

	
		
	$(document).on('click','.pagina', function(){
		$('.loader').fadeIn();
		$('#id_prenotazione').val('');
		$('#id_viaggio_pianificato').val('');
		$('#id_tipologia').val('');
		var pagina=$(this).find('a').html();
		$('.active').removeClass('active');
		$(this).addClass('activate');
		$.ajax({
		type:'POST',
		url:'../php/booking/getRiepilogoByPaginationAgg.php',
		data:{pagina: 2},
		success: function(data) {
						$('#tipologia').show();
						$('#daypartenza').show();
						$('#andata').show();
						$('#daypartenza').show();		
						$('#orapartenza').show();
						$('#dayarrivo').show();
						$('#oraarrivo').show();
						$('#sedepartenza').show();
						$('#luogodest').show();
						$('#passeggeri').show();
						$('#alimentazione').show();
						$('#targa').show();		
						$('#cilindrata').show();
						$('#marca').show();
						$('#autista').show();	
						$('#stato').show();
						$('#motivo').show();
						$('#tapperitorno').show();
						$('#tappeandata').show();
						$('#daypartenza_r').show();
						$('#ritorno').show();
						$('#tipologia_r').show();
						$('#daypartenza_r').show();		
						$('#orapartenza_r').show();
						$('#dayarrivo_r').show();	
						$('#oraarrivo_r').show();
						$('#sedepartenza_r').show();
						$('#luogodest_r').show();
						$('#passeggeri_r').show();
						$('#alimentazione_r').show();
						$('#targa_r').show();		
						$('#cilindrata_r').show();
						$('#marca_r').show();
						$('#autista_r').show();	
						$('#stato_r').show();
						$('#motivo_r').show();
						$('#tapperitorno_r').show();
						$('#tappeandata_r').show();
						
			var riepilogo = $.parseJSON(data);
		$.ajax({
				type:'POST',
				url:'../php/booking/getRiepilogoByPaginationAgg.php',
				data:{pagina: pagina},
				success: function(data) {
				console.log(pagina);
					var riepilogo = $.parseJSON(data);

						if(riepilogo['tipo']==1){
						$('#tipologia_r').hide();
						$('#daypartenza_r').hide();
						$('#ritorno').hide();
						$('#daypartenza_r').hide();		
						$('#orapartenza_r').hide();
						$('#dayarrivo_r').hide();	
						$('#oraarrivo_r').hide();
						$('#sedepartenza_r').hide();
						$('#luogodest_r').hide();
						$('#passeggeri_r').hide();
						$('#alimentazione_r').hide();
						$('#targa_r').hide();		
						$('#cilindrata_r').hide();
						$('#marca_r').hide();
						$('#autista_r').hide();	
						$('#stato_r').hide();
						$('#motivo_r').hide();
						$('#tapperitorno_r').hide();
						$('#tappeandata_r').hide();
						

						$('#id_prenotazione').val(riepilogo[0]['prenotazione']);
						$('#id_viaggio_pianificato').val(riepilogo[0]['id_viaggio_pianificato']);
						$('#id_tipologia').val(riepilogo[0]['tipologia']);							
						$('#tipologia').html(riepilogo[0]['tipologia']);						
						$('#daypartenza').html(riepilogo[0]['partenza']);		
						$('#orapartenza').html(riepilogo[0]['ora_partenza']);	
						$('#dayarrivo').html(riepilogo[0]['ritorno']);		
						$('#oraarrivo').html(riepilogo[0]['ora_ritorno']);	
						$('#sedepartenza').html(riepilogo[0]['indirizzo_partenza']);			
						$('#luogodest').html(riepilogo[0]['comune_destinazione']+' Via '+riepilogo[0]['indirizzo_destinazione'] );	
						$('#passeggeri').html(riepilogo[0]['passeggeri']);	
						$('#alimentazione').html(riepilogo[0]['alimentazione']);	
						$('#targa').html(riepilogo[0]['targa']);			
						$('#cilindrata').html(riepilogo[0]['cilindrata']);	
						$('#marca').html(riepilogo[0]['marca']+' '+riepilogo[0]['modello']);	
						var stato=riepilogo[0]['stato'];
						$('#autista').html(riepilogo[0]['nome']+" "+ riepilogo[0]['cognome']);
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
						$('#tipologia').html(riepilogo['andata']['tipologia']);	
						$('#daypartenza').html(riepilogo['andata']['partenza']);		
						$('#id_prenotazione').val(riepilogo['andata']['prenotazione']);
						$('#id_viaggio_pianificato').val(riepilogo['andata']['id_viaggio_pianificato']);
						$('#id_tipologia').val(riepilogo['andata']['tipologia']);							
						$('#orapartenza').html(riepilogo['andata']['ora_partenza']);	
						$('#dayarrivo').html(riepilogo['andata']['ritorno']);		
						$('#oraarrivo').html(riepilogo['andata']['ora_ritorno']);	
						$('#sedepartenza').html(riepilogo['andata']['indirizzo_partenza']);			
						$('#luogodest').html(riepilogo['andata']['comune_destinazione']+' Via '+riepilogo['andata']['indirizzo_destinazione'] );	
						$('#passeggeri').html(riepilogo['andata']['passeggeri']);	
						$('#alimentazione').html(riepilogo['andata']['alimentazione']);	
						$('#targa').html(riepilogo['andata']['targa']);			
						$('#cilindrata').html(riepilogo['andata']['cilindrata']);	
						$('#marca').html(riepilogo['andata']['marca']+' '+riepilogo['andata']['modello']);	
						var stato=riepilogo['andata']['stato'];
						$('#autista').html(riepilogo['andata']['nome']+" "+ riepilogo['andata']['cognome']);
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
									$('#tipologia').hide();
									$('#daypartenza').hide();
									$('#andata').hide();
									$('#daypartenza').hide();		
									$('#orapartenza').hide();
									$('#dayarrivo').hide();	
									$('#oraarrivo').hide();
									$('#sedepartenza').hide();
									$('#luogodest').hide();
									$('#passeggeri').hide();
									$('#alimentazione').hide();
									$('#targa').hide();		
									$('#cilindrata').hide();
									$('#marca').hide();
									$('#autista').hide();	
									$('#stato').hide();
									$('#motivo').hide();
									$('#tapperitorno').hide();
									$('#tappeandata').hide();
			
				
						}
		
						if(riepilogo['ritorno']){
						$('#id_prenotazione').val(riepilogo['ritorno']['prenotazione']);
						$('#id_viaggio_pianificato').val(riepilogo['ritorno']['id_viaggio_pianificato']);
						$('#id_tipologia').val(riepilogo['ritorno']['tipologia']);	
						$('#tipologia_r').html(riepilogo['ritorno']['tipologia']);							
						$('#daypartenza_r').html(riepilogo['ritorno']['partenza']);		
						$('#orapartenza_r').html(riepilogo['ritorno']['ora_partenza']);	
						$('#dayarrivo_r').html(riepilogo['ritorno']['ritorno']);		
						$('#oraarrivo_r').html(riepilogo['ritorno']['ora_ritorno']);	
						$('#sedepartenza_r').html(riepilogo['ritorno']['indirizzo_partenza']);			
						$('#luogodest_r').html(riepilogo['ritorno']['comune_destinazione']+' Via '+riepilogo['ritorno']['indirizzo_destinazione'] );	
						$('#passeggeri_r').html(riepilogo['ritorno']['passeggeri']);	
						$('#alimentazione_r').html(riepilogo['ritorno']['alimentazione']);	
						$('#targa_r').html(riepilogo['ritorno']['targa']);			
						$('#cilindrata_r').html(riepilogo['ritorno']['cilindrata']);	
						$('#marca_r').html(riepilogo['ritorno']['marca']+' '+riepilogo['ritorno']['modello']);	
						var stato=riepilogo['ritorno']['stato'];
						$('#autista_r').html(riepilogo['ritorno']['nome']+" "+ riepilogo['ritorno']['cognome']);
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
									$('#tipologia_r').hide();
									$('#daypartenza_r').hide();
									$('#ritorno').hide();
									$('#daypartenza_r').hide();		
									$('#orapartenza_r').hide();
									$('#dayarrivo_r').hide();	
									$('#oraarrivo_r').hide();
									$('#sedepartenza_r').hide();
									$('#luogodest_r').hide();
									$('#passeggeri_r').hide();
									$('#alimentazione_r').hide();
									$('#targa_r').hide();		
									$('#cilindrata_r').hide();
									$('#marca_r').hide();
									$('#autista_r').hide();	
									$('#stato_r').hide();
									$('#motivo_r').hide();
									$('#tapperitorno_r').hide();
									$('#tappeandata_r').hide();
							
						}
					}
					
					$('.loader').fadeOut();
				}
				});
		
		}
		});
	} );
	$(document).on('click', '#bottoneCancella', function(){

		var pren=$('#id_prenotazione').val();
		var tipologia=$('#id_tipologia').val();
		var viaggio=$('#id_viaggio_pianificato').val();
		var stato=5;
		console.log("prenotazione:"+pren);
		console.log("tipologia:"+tipologia);
		console.log("viaggio:"+viaggio);
		if (tipologia=='viaggio condiviso'){
			console.log("scelto viaggio condiviso");
		$.ajax({
			type:'POST',
			url:'../php/booking/update_stato_viaggio_agg.php',
			data:{ identificativo: pren},
			success: function(data) {
			console.log(data);
				location.reload();
			}}); 
		}
		else {
			console.log("scelto viaggio aggregato");
			$.ajax({
				type:'POST',
				url:'../php/booking/elimina_viaggio_agg.php',
				data:{ identificativo: viaggio},
				success: function(data) {
				console.log(data);
					location.reload();
				}}); 			
		}	
	});
});


