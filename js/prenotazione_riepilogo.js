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
		url:'../php/booking/getNumeroPrenotazioni.php',
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
				url:'../php/booking/getRiepilogoByPagination.php',
				data:{pagina: 1},
				success: function(data) {
				
					var riepilogo = $.parseJSON(data);
				 console.log(riepilogo);
					$('#daypartenza').html(riepilogo[0]['partenza']);		
					$('#orapartenza').html(riepilogo[0]['ora_partenza']);	
					$('#dayarrivo').html(riepilogo[0]['ritorno']);		
					$('#oraarrivo').html(riepilogo[0]['ora_ritorno']);	
					$('#sedepartenza').html(riepilogo[0]['indirizzo_partenza']);			
					$('#luogodest').html(riepilogo[0]['comune_destinazione']+' Via '+riepilogo[0]['indirizzo_destinazione'] );	
					$('#passeggeri').html(riepilogo[0]['passeggeri']);	
					$('#alimentazione').html(riepilogo[0]['alimentazione']);				
					$('#cilindrata').html(riepilogo[0]['cilindrata']);	
					$('#targa').html(riepilogo[0]['targa']);	
					$('#marca').html(riepilogo[0]['marca']+' '+riepilogo[0]['modello']);	
						$('#id_prenotazione').val(riepilogo[0]['prenotazione']);	
					var stato=riepilogo[0]['stato'];
					switch(stato) {
						case '0':
							$('#stato').html("<img src='../img/booking/stato_attesa.png'> Richiesta in attesa di approvazione");
							$('#bottoneCancella').prop('disabled', false);
							break;
						case '1':
							$('#stato').html("<img src='../img/booking/stato_approvato.png'> Richiesta approvata");
							$('#bottoneCancella').prop('disabled', false);
							break;
						case '2':
							$('#stato').html("<img src='../img/booking/stato_rifiutato.png'> Richiesta rifiutata");
							$('#bottoneCancella').prop('disabled', true);
							break;
						case '3':
							$('#stato').html("<img src='../img/booking/stato_in_viaggio.png'> Viaggio Iniziato");
							$('#bottoneCancella').prop('disabled', true);
							break;
						case '4':
							$('#stato').html("<img src='../img/booking/stato_completato.png'> Viaggio Completato");
							$('#bottoneCancella').prop('disabled', true);
							break;
						case '5':
							$('#stato').html("<img src='../img/booking/stato_rifiutato.png'> Richiesta Cancellata");
							$('#bottoneCancella').prop('disabled', true);
							break;
					}
/*	//questo codice disabilitava il pulsante cancellazione il giorno stesso della prenotazione
				var parts =riepilogo[0]['partenza'].split('/');

					var mydate = new Date(parts[2],parts[1]-1,parts[0]); 
					var today = new Date();
			
					if(today>mydate){
						$('#bottoneCancella').prop('disabled', true);
					}
*/					
					$('#motivo').html(riepilogo[0]['motivo_viaggio']);
					$('#id_prenotazione').val(riepilogo[0]['prenotazione']);
					var andata=0;
					var ritorno=0;
					$('#tappeandata').html('');
					$('#tapperitorno').html('');
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
		var pagina=$(this).find('a').html();
		$('.active').removeClass('active');
		$(this).addClass('activate');
		$.ajax({
		type:'POST',
		url:'../php/booking/getRiepilogoByPagination.php',
		data:{pagina: pagina},
		success: function(data) {
		
			var riepilogo = $.parseJSON(data);
			// console.log(riepilogo);
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
			$('#id_prenotazione').val(riepilogo[0]['prenotazione']);	
			var stato=riepilogo[0]['stato'];
			switch(stato) {
				case '0':
					$('#stato').html("<img src='../img/booking/stato_attesa.png'> Richiesta in attesa di approvazione");
					$('#bottoneCancella').prop('disabled', false);
					break;
				case '1':
					$('#stato').html("<img src='../img/booking/stato_approvato.png'> Richiesta approvata");
					$('#bottoneCancella').prop('disabled', false);
					break;
				case '2':
					$('#stato').html("<img src='../img/booking/stato_rifiutato.png'> Richiesta rifiutata");
					$('#bottoneCancella').prop('disabled', true);
					break;
				case '3':
					$('#stato').html("<img src='../img/booking/stato_in_viaggio.png'> Viaggio Iniziato");
					$('#bottoneCancella').prop('disabled', true);
					break;
				case '4':
					$('#stato').html("<img src='../img/booking/stato_completato.png'> Viaggio Completato");
					$('#bottoneCancella').prop('disabled', true);
					break;
				case '5':
					$('#stato').html("<img src='../img/booking/stato_rifiutato.png'> Richiesta Cancellata");
					$('#bottoneCancella').prop('disabled', true);
					break;
				
			}
			$('#motivo').html(riepilogo[0]['motivo_viaggio']);	
/*	//questo codice disabilitava il pulsante cancellazione il giorno stesso della prenotazione
			var parts =riepilogo[0]['partenza'].split('/');

					var mydate = new Date(parts[2],parts[1]-1,parts[0]); 
					var today = new Date();
			
					if(today>mydate){
						$('#bottoneCancella').prop('disabled', true);
					}
*/					
			var andata=0;
			var ritorno=0;
			$('#tappeandata').html('');
			$('#tapperitorno').html('');
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
			$('.loader').fadeOut();
		}
		});
	} );
	$(document).on('click', '#cancella', function(){

		var pren=$('#id_prenotazione').val();
		var stato=5;
		$.ajax({
			type:'POST',
			url:'../php/booking/update_stato_viaggio.php',
			data:{stato: stato, identificativo: pren},
			success: function(data) {
			
				location.reload();
			}});
	});
		$('.bottone_stampa').on('click', function(){
			var pren=$('#id_prenotazione').val();
		var myWindow = window.open('stampa_step4.php?pren='+pren, "MsgWindow", "width=800,height=800");
	;
	});
});


