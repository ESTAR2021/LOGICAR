/**
 * Created by anna on 05/09/2016.
 */

    //modale per avanzamento step
var modalstep="<div class=\"modal-dialog\" id=\"modal-dialog_step\"  {width:55%;}><div class=\"modal-content\"><div class=\"modal-header\"><img src=\"../img/logo.png\"><h1><img src=\"../img/booking/lettering_4.png\"  width=\"50% height=50%\"></h1></div>"+
        "<div class=\"modal-body\" id=\"modal-body\" align=\"center\"><img src=\"../img/booking/prenota_blue.png\"  width=\"15%\" ><i class=\"fa fa-arrow-circle-o-right fa-5x margini_frecce_blue\" style='vertical-align: middle;'></i></h1><img src=\"../img/booking/informazioni_blue.png\"  width=\"15%\" ><i class=\"fa fa-arrow-circle-o-right fa-5x margini_frecce_blue\" style='vertical-align: middle;'></i> <img src=\"../img/booking/macchina_blue.png\"  width=\"15%\"><i class=\"fa fa-arrow-circle-o-right fa-5x margini_frecce_blue\" style='vertical-align: middle;'></i></h1> <img src=\"../img/booking/conferma_blue.png\"  width=\"15%\">"+
        "</div><div class=\"modal-footer\" id=\"modal-footer\"><img src=\"../img/booking/logo_estar.png\"></div></div></div>";

function disableF5(e) { if ((e.which || e.keyCode) == 116) e.preventDefault(); };

$(document).ready(function() {

	$(document).on("keydown", disableF5);
    //attivo la modale al document ready per visualizzare lo step
    $("#modalstep").html(modalstep);
    $("#modalstep").modal('show');

	$("#modalstep").on('click',function(){
		$("#modalstep").hide();
		$('.modal-backdrop').hide();
		$('body').removeClass('modal-open');
	});

	$.ajax({
		type:'GET',
		url:'../php/booking/getRiepilogoAgg.php',
		success: function(data) {
		
			var riepilogo = $.parseJSON(data);
			
			if(riepilogo['tipo']==1){
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
			$('#targa_r').remove();		
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
			$('#targa').html(riepilogo[0]['targa']);			
			$('#cilindrata').html(riepilogo[0]['cilindrata']);	
			$('#marca').html(riepilogo[0]['marca']+' '+riepilogo[0]['modello']);	
			var stato=riepilogo[0]['stato'];
			$('#autista').html(riepilogo[0]['nome']+" "+ riepilogo[0]['cognome']+"<img src='../"+riepilogo[0]['url_foto']+"'>");
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
			$('#targa').html(riepilogo['andata']['targa']);			
			$('#cilindrata').html(riepilogo['andata']['cilindrata']);	
			$('#marca').html(riepilogo['andata']['marca']+' '+riepilogo['andata']['modello']);	
			var stato=riepilogo['andata']['stato'];
			$('#autista').html(riepilogo['andata']['nome']+" "+ riepilogo['andata']['cognome']+"<img src='../"+riepilogo['andata']['url_foto']+"'>");
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
						$('#daypartenza').remove();		
						$('#orapartenza').remove();
						$('#dayarrivo').remove();	
						$('#oraarrivo').remove();
						$('#sedepartenza').remove();
						$('#luogodest').remove();
						$('#passeggeri').remove();
						$('#alimentazione').remove();
						$('#targa').remove();		
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
			$('#targa_r').html(riepilogo['ritorno']['targa']);			
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
						$('#targa_r').remove();		
						$('#cilindrata_r').remove();
						$('#marca_r').remove();
						$('#autista_r').remove();	
						$('#stato_r').remove();
						$('#motivo_r').remove();
						$('#tapperitorno_r').remove();
						$('#tappeandata_r').remove();
			
				
				
			}
		}
		}
		});
		
	$('.bottone_stampa').on('click', function(){
		var myWindow = window.open('stampa_step4_agg.html', "MsgWindow", "width=800,height=800");
	;
	});

});


