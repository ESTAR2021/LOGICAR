//modale per avanzamento step
var modalstep="<div class=\"modal-dialog\" id=\"modal-dialog_step\"  {width:55%;}><div class=\"modal-content\"><div class=\"modal-header\"><img src=\"../img/logo.png\"><h1><img src=\"../img/booking/lettering_4.png\"  width=\"50% height=50%\"></h1></div>"+
        "<div class=\"modal-body\" id=\"modal-body\" align=\"center\"><img src=\"../img/booking/prenota_blue.png\"  width=\"15%\" ><i class=\"fa fa-arrow-circle-o-right fa-5x margini_frecce_blue\" style='vertical-align: middle;'></i></h1><img src=\"../img/booking/informazioni_blue.png\"  width=\"15%\" ><i class=\"fa fa-arrow-circle-o-right fa-5x margini_frecce_blue\" style='vertical-align: middle;'></i> <img src=\"../img/booking/macchina_blue.png\"  width=\"15%\"><i class=\"fa fa-arrow-circle-o-right fa-5x margini_frecce_blue\" style='vertical-align: middle;'></i></h1> <img src=\"../img/booking/conferma_blue.png\"  width=\"15%\">"+
        "</div><div class=\"modal-footer\" id=\"modal-footer\"><img src=\"../img/booking/logo_estar.png\"></div></div></div>";

function disableF5(e) { if ((e.which || e.keyCode) == 116) e.preventDefault(); };

$(document).ready(function() {
$(document).on("keydown", disableF5);		
	$.ajax({
		type:'GET',
		url:'../php/checksession.php',
		success: function(data) {
			if(data==0){
				location.href='../login.html';
			}
		}
	});

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
		url:'../php/booking/getRiepilogo.php',
		success: function(data) {
			var riepilogo = $.parseJSON(data);
			// console.log(riepilogo);
			$('#prenotante').html(riepilogo[0]['nome']+' '+riepilogo[0]['cognome']);		
			$('#daypartenza').html(riepilogo[0]['partenza']);		
			$('#orapartenza').html(riepilogo[0]['ora_partenza']);	
			$('#dayarrivo').html(riepilogo[0]['ritorno']);		
			$('#oraarrivo').html(riepilogo[0]['ora_ritorno']);	
			$('#sedepartenza').html(riepilogo[0]['indirizzo_partenza']);			
			$('#luogodest').html(riepilogo[0]['comune_destinazione']+' Via '+riepilogo[0]['indirizzo_destinazione'] );	
			$('#passeggeri').html(riepilogo[0]['passeggeri']);	
			$('#alimentazione').html(riepilogo[0]['alimentazione']);	
//			$('#anno').html(riepilogo[0]['anno']);	
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
		}
		});

	$('.bottone_stampa').on('click', function(){
		var myWindow = window.open('stampa_step4.php', "MsgWindow", "width=800,height=800");
	;
	});

});


