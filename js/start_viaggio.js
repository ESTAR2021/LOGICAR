/**
 * Created by anna on 05/09/2016.
 */

//modale per avanzamento step

$(document).ready(function() {


	//attivo la modale al document ready per visualizzare lo step
	$.ajax({
		type:'GET',
		url:'../php/booking/get_viaggi_iniziato.php',
		success: function(data) {
			var riepilogo = $.parseJSON(data);

			if(riepilogo['dimensione']>0){
				$('#viaggio_iniziato').fadeIn();
				$('#start_viaggio').prop('disabled',true);
			}
		}
	});



	$.ajax({
		type:'GET',
		url:'../php/booking/getNumeroPrenotazioniIniziabili.php',
		success: function(data) {

			for (var i = 1; i <= data; i++) {
				if(i==1){
					$('.pagination').append('<li class="pagina active"><a href="#" >'+i+'</a></li>');
				}else{
					$('.pagination').append('<li class="pagina"><a href="#" >'+i+'</a></li>');
				}
			}

			if(data==0){
				$('#nessuna_prenotazione').show();
				$('#dettagli').hide();
				$('.loader').fadeOut();
			}else{
				$.ajax({
					type:'POST',
					url:'../php/booking/getRiepilogoByPaginationIniziabili.php',
					data:{pagina: 1},
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
						$('#anno').html(riepilogo[0]['anno']);
						$('#cilindrata').html(riepilogo[0]['cilindrata']);
						$('#marca').html(riepilogo[0]['marca']);
						$('#id_viaggio').val(riepilogo[0]['prenotazione']);
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
			}
		}
	});

	$(document).on('click','#vai_viaggio' , function(){

		location.href='viaggio.html';

	})

	$(document).on('click','.pagina', function(){
		$('.loader').fadeIn();
		var pagina=$(this).find('a').html();
		$('.active').removeClass('active');
		$(this).addClass('activate');
		$.ajax({
			type:'POST',
			url:'../php/booking/getRiepilogoByPaginationIniziabili.php',
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
				$('#anno').html(riepilogo[0]['anno']);
				$('#cilindrata').html(riepilogo[0]['cilindrata']);
				$('#marca').html(riepilogo[0]['marca']);
				var stato=riepilogo[0]['stato'];
				$('#id_viaggio').val(riepilogo[0]['prenotazione']);
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

	$(document).on('click', '#start_viaggio', function(){
		var id_viaggio=$('#id_viaggio').val();
		var stato='3';
		$.ajax({
			type:'POST',
			url:'../php/booking/start_viaggio.php',
			data:{identificativo: id_viaggio, stato:stato},
			success: function(data) {


				location.href='viaggio.html';

			}

		});
	});

});


