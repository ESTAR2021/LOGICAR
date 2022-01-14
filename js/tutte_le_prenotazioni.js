/**
 * Created by anna on 05/09/2016.
 */

	
//modale per avanzamento step
$(document).ready(function() {
	
	
		
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


	$.ajax({
		type:'POST',
		url:'../php/booking/getRiepilogoByPagination_admin.php',
		data:'pagina='+1,
		success: function(data) {
			var riepilogo = $.parseJSON(data);
			for (var i = 0; i <riepilogo['dimensione']; i++) {
				document.getElementById("autista_"+i).innerHTML=riepilogo[i]['nome']+ ' '+ riepilogo[i]['cognome'];
				document.getElementById("dataoraviaggio_"+i).innerHTML=riepilogo[i]['partenza']+' '+riepilogo[i]['ora_partenza'];
				document.getElementById("luogopart_"+i).innerHTML=riepilogo[i]['indirizzo_partenza'];
				document.getElementById("luogodest_"+i).innerHTML=riepilogo[i]['comune_destinazione']+' '+riepilogo[i]['indirizzo_destinazione'];
				document.getElementById("motivoviaggio_"+i).innerHTML=riepilogo[i]['motivo_viaggio'];
				document.getElementById("auto_"+i).innerHTML='Marca: <em>'+riepilogo[i]['marca']+' Modello: <em>'+riepilogo[i]['modello']+' </em>Cilindrata: <em>'+riepilogo[i]['cilindrata']+'</em>';
				document.getElementById("riep_"+i).style.display = 'block';
				var stato=riepilogo[i]['stato'];
					switch(stato) {
						case '0':
							document.getElementById("stato_"+i).innerHTML="<img src='../img/booking/stato_attesa.png'> Richiesta in attesa di approvazione";
							break;
						case '1':
							document.getElementById("stato_"+i).innerHTML="<img src='../img/booking/stato_approvato.png'> Richiesta approvata";
							break;
						case '2':
							document.getElementById("stato_"+i).innerHTML="<img src='../img/booking/stato_rifiutato.png'> Richiesta rifiutata";
							break;
						case '3':
							document.getElementById("stato_"+i).innerHTML="<img src='../img/booking/stato_in_viaggio.png'> Viaggio Iniziato";
							break;
						case '4':
							document.getElementById("stato_"+i).innerHTML="<img src='../img/booking/stato_completato.png'> Viaggio Completato";
							break;
						case '5':
							document.getElementById("stato_"+i).innerHTML="<img src='../img/booking/stato_rifiutato.png'> Richiesta cancellata";
							break;
					}
			}
			$('.loader').fadeOut();
		}
	});


});


