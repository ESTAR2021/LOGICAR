/**
 * Created by anna on 05/09/2016.
 */

    //modale per avanzamento step

		
$(document).ready(function() {
	
	$('#btn_sostituisci_auto_0').hide();
	$('#btn_sostituisci_auto_1').hide();
	$('#btn_sostituisci_auto_2').hide();
	$('#btn_sostituisci_auto_3').hide();
	$('#btn_sostituisci_auto_4').hide();

	console.log('sono in document ready');
	
    //attivo la modale al document ready per visualizzare lo step

	$.ajax({
		type:'GET',
		url:'../php/booking/getNumeroPrenotazioniDaApprovare.php',
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
			}
		}
	});

	$.ajax({
		type:'POST',
		url:'../php/booking/getRiepilogoByPaginationDaApprovare.php',
		data:'pagina=1',
		success: function(data) {
		
			var riepilogo = $.parseJSON(data);
			for (var i = 0; i <riepilogo['dimensione']; i++) {
				
				document.getElementById("autista_"+i).innerHTML=riepilogo[i]['nome']+ ' '+ riepilogo[i]['cognome']; 
				document.getElementById("dataoraviaggio_"+i).innerHTML=riepilogo[i]['partenza']+' '+riepilogo[i]['ora_partenza'];
				document.getElementById("luogopart_"+i).innerHTML=riepilogo[i]['indirizzo_partenza'];
				document.getElementById("luogodest_"+i).innerHTML=riepilogo[i]['comune_destinazione']+' '+riepilogo[i]['indirizzo_destinazione'];				
				document.getElementById("motivoviaggio_"+i).innerHTML=riepilogo[i]['motivo_viaggio']; 
				document.getElementById("auto_"+i).innerHTML='Targa: <em>'+riepilogo[i]['targa']+'</em> Marca: <em>'+riepilogo[i]['marca']+'</em> Modello: <em>'+riepilogo[i]['modello']+' </em>Cilindrata: <em>'+riepilogo[i]['cilindrata']+'</em>'; 
				document.getElementById("identificativo_"+i).value=riepilogo[i]['prenotazione'];
//				document.getElementById("identificativo_auto"+i).value=riepilogo[i]['auto'];
				document.getElementById("riep_"+i).style.display = 'block';
			}
				/*console.log($("#identificativo_0").val());	
				console.log('id_prenotazione:'+riepilogo[0]['prenotazione']);
				console.log('id_prenotazione:'+$("#identificativo_0").val());
				console.log('auto:'+riepilogo[0]['auto']);*/
			$('.loader').fadeOut();
		}
		});
		
	$(document).on('click', '.approva', function(){
		var stato='1';
		var identificativo=$(this).parents('.row').find('.identificativo').val();
		$.ajax({
		type:'POST',
		url:'../php/booking/update_stato_viaggio.php',
		cache: false,
		async: false,
		data:{identificativo: identificativo, stato:stato},
		success: function(data) {
		//	console.log(data);
		//	alert(data);
			if(data==0)
			{
				
/*					var modalstep="<div class=\"modal-dialog\" id=\"modal-dialog_step\"  {width:55%;}><div class=\"modal-content\"><div class=\"modal-header\"><img src=\"../img/logo.png\"><h1>Prenotazione ACCETTATA con successo</div>"+
					 "<div class=\"modal-body\" id=\"modal-body\" align=\"center\"><img src=\"../img/booking/stato_approvato.png\"  width=\"15%\" >"+
					"</div><div class=\"modal-footer\" id=\"modal-footer\"><img src=\"../img/booking/logo_estar.png\"></div></div></div>";
					$("#modal_risultato").html(modalstep);
					jQuery.noConflict(); 
					$("#modal_risultato").modal('show');*/
					var modalstep="<div class=\"modal-dialog\" id=\"modal-dialog_step\"  {width:55%;}><div class=\"modal-content\"><div class=\"modal-header\"><img src=\"../img/logo.png\"><h1>Si &egrave; verificato un errore</div>"+
					 "<div class=\"modal-body\" id=\"modal-body\" align=\"center\"><img src=\"../img/booking/stato_rifiutato.png\"  width=\"15%\" >"+
					"</div><div class=\"modal-footer\" id=\"modal-footer\"><img src=\"../img/booking/logo_estar.png\"></div></div></div>";
					$("#modal_risultato").html(modalstep);
					jQuery.noConflict(); 
					$("#modal_risultato").modal('show');						
				//jQuery.noConflict(); 
				//	alert('OPERAZIONE FALLITA!!');
			
			}
			else
			{
				
/*					var modalstep="<div class=\"modal-dialog\" id=\"modal-dialog_step\"  {width:55%;}><div class=\"modal-content\"><div class=\"modal-header\"><img src=\"../img/logo.png\"><h1>Si &egrave; verificato un errore</div>"+
					 "<div class=\"modal-body\" id=\"modal-body\" align=\"center\"><img src=\"../img/booking/stato_rifiutato.png\"  width=\"15%\" >"+
					"</div><div class=\"modal-footer\" id=\"modal-footer\"><img src=\"../img/booking/logo_estar.png\"></div></div></div>";
					$("#modal_risultato").html(modalstep);
					jQuery.noConflict(); 
					$("#modal_risultato").modal('show');	*/
					var modalstep="<div class=\"modal-dialog\" id=\"modal-dialog_step\"  {width:55%;}><div class=\"modal-content\"><div class=\"modal-header\"><img src=\"../img/logo.png\"><h1>Prenotazione ACCETTATA con successo</div>"+
					 "<div class=\"modal-body\" id=\"modal-body\" align=\"center\"><img src=\"../img/booking/stato_approvato.png\"  width=\"15%\" >"+
					"</div><div class=\"modal-footer\" id=\"modal-footer\"><img src=\"../img/booking/logo_estar.png\"></div></div></div>";
					$("#modal_risultato").html(modalstep);
					jQuery.noConflict(); 
					$("#modal_risultato").modal('show');					
				
			//	jQuery.noConflict(); 
			//	alert('OPERAZIONE ESEGUITA CON SUCCESSO!!');
			}
			
		}
		});
		
	});
	$(document).on('click', '.rifiuta', function(){
		var stato='2';
		var identificativo=$(this).parents('.row').find('.identificativo').val();
		$.ajax({
		type:'POST',
		url:'../php/booking/update_stato_viaggio.php',
		data:{identificativo: identificativo, stato:stato},
		success: function(data) {
			if(data==0){ //OPERAZIONE FALLITA
				var modalstep="<div class=\"modal-dialog\" id=\"modal-dialog_step\"  {width:55%;}><div class=\"modal-content\"><div class=\"modal-header\"><img src=\"../img/logo.png\"><h1>Si è verificato un errore</div>"+
					 "<div class=\"modal-body\" id=\"modal-body\" align=\"center\"><img src=\"../img/booking/stato_rifiutato.png\"  width=\"15%\" >"+
					"</div><div class=\"modal-footer\" id=\"modal-footer\"><img src=\"../img/booking/logo_estar.png\"></div></div></div>";
					$("#modal_risultato").html(modalstep);
					jQuery.noConflict(); 
					$("#modal_risultato").modal('show');	
/*				var modalstep="<div class=\"modal-dialog\" id=\"modal-dialog_step\"  {width:55%;}><div class=\"modal-content\"><div class=\"modal-header\"><img src=\"../img/logo.png\"><h1>Prenotazione RIFIUTATA con successo</div>"+
					 "<div class=\"modal-body\" id=\"modal-body\" align=\"center\"><img src=\"../img/booking/stato_approvato.png\"  width=\"15%\" >"+
					"</div><div class=\"modal-footer\" id=\"modal-footer\"><img src=\"../img/booking/logo_estar.png\"></div></div></div>";
					$("#modal_risultato").html(modalstep);
					jQuery.noConflict(); 
					$("#modal_risultato").modal('show');	*/
			}else{ // TUTTO OK
/*				var modalstep="<div class=\"modal-dialog\" id=\"modal-dialog_step\"  {width:55%;}><div class=\"modal-content\"><div class=\"modal-header\"><img src=\"../img/logo.png\"><h1>Si è verificato un errore</div>"+
					 "<div class=\"modal-body\" id=\"modal-body\" align=\"center\"><img src=\"../img/booking/stato_rifiutato.png\"  width=\"15%\" >"+
					"</div><div class=\"modal-footer\" id=\"modal-footer\"><img src=\"../img/booking/logo_estar.png\"></div></div></div>";
					$("#modal_risultato").html(modalstep);
					jQuery.noConflict(); 
					$("#modal_risultato").modal('show');*/
				var modalstep="<div class=\"modal-dialog\" id=\"modal-dialog_step\"  {width:55%;}><div class=\"modal-content\"><div class=\"modal-header\"><img src=\"../img/logo.png\"><h1>Prenotazione RIFIUTATA con successo</div>"+
					 "<div class=\"modal-body\" id=\"modal-body\" align=\"center\"><img src=\"../img/booking/stato_approvato.png\"  width=\"15%\" >"+
					"</div><div class=\"modal-footer\" id=\"modal-footer\"><img src=\"../img/booking/logo_estar.png\"></div></div></div>";
					$("#modal_risultato").html(modalstep);
					jQuery.noConflict(); 
					$("#modal_risultato").modal('show');					
			}
		
		}
		});
	
	});
	$(document).on('hide.bs.modal','#modal_risultato', function(){
		location.reload();
		
	});
	$(document).on('click','.pagina', function(){
		var pagina=$(this).find('a').html();
		$('.loader').fadeIn();
		$('.active').removeClass('active');
		$(this).addClass('active');
		$.ajax({
		type:'POST',
		url:'../php/booking/getRiepilogoByPaginationDaApprovare.php',
		data:{pagina: pagina},
		success: function(data) {
		
			var riepilogo = $.parseJSON(data);
			for (var i = 0; i <riepilogo['dimensione']; i++) {
				
				document.getElementById("autista_"+i).innerHTML=riepilogo[i]['nome']+ ' '+ riepilogo[i]['cognome']; 
				document.getElementById("dataoraviaggio_"+i).innerHTML=riepilogo[i]['partenza']+' '+riepilogo[i]['ora_partenza'];
				document.getElementById("luogopart_"+i).innerHTML=riepilogo[i]['indirizzo_partenza'];				
				document.getElementById("luogodest_"+i).innerHTML=riepilogo[i]['comune_destinazione']+' '+riepilogo[i]['indirizzo_destinazione'];
				document.getElementById("motivoviaggio_"+i).innerHTML=riepilogo[i]['motivo_viaggio']; 
				document.getElementById("auto_"+i).innerHTML='Targa: <em>'+riepilogo[i]['targa']+'</em> Marca: <em>'+riepilogo[i]['marca']+' </em>Cilindrata: <em>'+riepilogo[i]['cilindrata']+'</em>'; 
				document.getElementById("identificativo_"+i).value=riepilogo[i]['prenotazione'];
				document.getElementById("riep_"+i).style.display = 'block';
			}
			for (var i = riepilogo['dimensione']; i <5 ; i++) {
				
				document.getElementById("autista_"+i).innerHTML=''; 
				document.getElementById("dataoraviaggio_"+i).innerHTML=''; 
				document.getElementById("luogopart_"+i).innerHTML='';
				document.getElementById("luogodest_"+i).innerHTML='';
				document.getElementById("motivoviaggio_"+i).innerHTML=''; 
				document.getElementById("auto_"+i).innerHTML=''; 
				document.getElementById("identificativo_"+i).value='';
				document.getElementById("riep_"+i).style.display =  "none";
			}
			$('.loader').fadeOut();
		}
		});
	} );
	
	

 // carico l'elenco delle auto disponibili 

	$(document).on('click', '.cambia_0', function(){
	var pianificazione_0=$("#identificativo_0").val();

	$.ajax({
			type: "POST",
			url: "../php/booking/lista_auto_prenotabili.php",
			data:{pianificazione: pianificazione_0},
			success: function(data) {
			$("#btn_sostituisci_auto_0").show();
			console.log('data:');	
			var lista = $.parseJSON(data);
			console.log(lista);	
			var quanti=lista['dimensione'];
			var selectList="<select id='sedi' class='form-control'>"

			for(var i=0;i < quanti;i++){
				selectList+="<option value="+lista[i]['idauto']+"> Targa: <em>"+lista[i]['targa']+"</em> Marca: <em>"+lista[i]['marca']+"</em> Modello: <em>"+lista[i]['modello']+" </em>Cilindrata: <em>"+lista[i]['cilindrata']+"</em>"+"</option>";
				}
			selectList+="</select>";
			
			if(quanti>0){
				$('#auto_altenativa_0').html(selectList);
			} else{
				$('#auto_altenativa_0').html('Non sono presenti macchine aziendali disponibili.');
			}
			}
		
		});	
    } );
	
	$(document).on('click', '.cambia_1', function(){
	var pianificazione_1=$("#identificativo_1").val();

	$.ajax({
			type: "POST",
			url: "../php/booking/lista_auto_prenotabili.php",
			data:{pianificazione: pianificazione_1},
			success: function(data) {
			$("#btn_sostituisci_auto_1").show();
			console.log('data:');	
			var lista = $.parseJSON(data);
			console.log(lista);	
			var quanti=lista['dimensione'];
			var selectList="<select id='sedi' class='form-control'>"

			for(var i=0;i < quanti;i++){
				selectList+="<option value="+lista[i]['idauto']+"> Targa: <em>"+lista[i]['targa']+"</em> Marca: <em>"+lista[i]['marca']+"</em> Modello: <em>"+lista[i]['modello']+" </em>Cilindrata: <em>"+lista[i]['cilindrata']+"</em>"+"</option>";
				}
			selectList+="</select>";
			
			if(quanti>0){
				$('#auto_altenativa_1').html(selectList);
			} else{
				$('#auto_altenativa_1').html('Non sono presenti macchine aziendali disponibili.');
			}
			}
		
		});	
    } );	
	
	$(document).on('click', '.cambia_2', function(){
	var pianificazione_2=$("#identificativo_2").val();

	$.ajax({
			type: "POST",
			url: "../php/booking/lista_auto_prenotabili.php",
			data:{pianificazione: pianificazione_2},
			success: function(data) {
			$("#btn_sostituisci_auto_2").show();
			console.log('data:');	
			var lista = $.parseJSON(data);
			console.log(lista);	
			var quanti=lista['dimensione'];
			var selectList="<select id='sedi' class='form-control'>"

			for(var i=0;i < quanti;i++){
				selectList+="<option value="+lista[i]['idauto']+"> Targa: <em>"+lista[i]['targa']+"</em> Marca: <em>"+lista[i]['marca']+"</em> Modello: <em>"+lista[i]['modello']+" </em>Cilindrata: <em>"+lista[i]['cilindrata']+"</em>"+"</option>";
				}
			selectList+="</select>";
			
			if(quanti>0){
				$('#auto_altenativa_2').html(selectList);
			} else{
				$('#auto_altenativa_2').html('Non sono presenti macchine aziendali disponibili.');
			}
			}
		
		});	
    } );	
	
	$(document).on('click', '.cambia_3', function(){
	var pianificazione_3=$("#identificativo_3").val();

	$.ajax({
			type: "POST",
			url: "../php/booking/lista_auto_prenotabili.php",
			data:{pianificazione: pianificazione_3},
			success: function(data) {
			$("#btn_sostituisci_auto_3").show();
			console.log('data:');	
			var lista = $.parseJSON(data);
			console.log(lista);	
			var quanti=lista['dimensione'];
			var selectList="<select id='sedi' class='form-control'>"

			for(var i=0;i < quanti;i++){
				selectList+="<option value="+lista[i]['idauto']+"> Targa: <em>"+lista[i]['targa']+"</em> Marca: <em>"+lista[i]['marca']+"</em> Modello: <em>"+lista[i]['modello']+" </em>Cilindrata: <em>"+lista[i]['cilindrata']+"</em>"+"</option>";
				}
			selectList+="</select>";
			
			if(quanti>0){
				$('#auto_altenativa_3').html(selectList);
			} else{
				$('#auto_altenativa_3').html('Non sono presenti macchine aziendali disponibili.');
			}
			}
		
		});	
    } );

	$(document).on('click', '.cambia_4', function(){
	var pianificazione_4=$("#identificativo_4").val();

	$.ajax({
			type: "POST",
			url: "../php/booking/lista_auto_prenotabili.php",
			data:{pianificazione: pianificazione_4},
			success: function(data) {
			$("#btn_sostituisci_auto_4").show();
			console.log('data:');	
			var lista = $.parseJSON(data);
			console.log(lista);	
			var quanti=lista['dimensione'];
			var selectList="<select id='sedi' class='form-control'>"

			for(var i=0;i < quanti;i++){
				selectList+="<option value="+lista[i]['idauto']+"> Targa: <em>"+lista[i]['targa']+"</em> Marca: <em>"+lista[i]['marca']+"</em> Modello: <em>"+lista[i]['modello']+" </em>Cilindrata: <em>"+lista[i]['cilindrata']+"</em>"+"</option>";
				}
			selectList+="</select>";
			
			if(quanti>0){
				$('#auto_altenativa_4').html(selectList);
			} else{
				$('#auto_altenativa_4').html('Non sono presenti macchine aziendali disponibili.');
			}
			}
		
		});	
    } );
	
// sostituisco l'auto

	$(document).on('click', '#btn_sostituisci_auto_0', function(){
	var pianificazione_0=$("#identificativo_0").val();
	var idauto_0=$("#auto_altenativa_0 option:selected").val();
	console.log('sostiutisco auto');
    console.log('id_auto_scelta!:'+$("#auto_altenativa_0 option:selected").val()); 	
	 console.log('auto_scelta!:'+$("#auto_altenativa_0 option:selected").text());
    console.log('prenotazione:'+$("#identificativo_0").val());	

	$.ajax({
			type: "POST",
			url: "../php/booking/edit_prenotazione_auto.php",
			data:{pianificazione:pianificazione_0,idauto:idauto_0},
			async:false,
			success: function(data) {
				console.log(data);	
				window.location.reload(true);
			}
		});			
	});

	$(document).on('click', '#btn_sostituisci_auto_1', function(){
	var pianificazione_1=$("#identificativo_1").val();
	var idauto_1=$("#auto_altenativa_1 option:selected").val();
	console.log('sostiutisco auto');
    console.log('id_auto_scelta!:'+$("#auto_altenativa_1 option:selected").val()); 	
	 console.log('auto_scelta!:'+$("#auto_altenativa_1 option:selected").text());
    console.log('prenotazione:'+$("#identificativo_1").val());	

	$.ajax({
			type: "POST",
			url: "../php/booking/edit_prenotazione_auto.php",
			data:{pianificazione:pianificazione_1,idauto:idauto_1},
			async:false,
			success: function(data) {
				console.log(data);	
				window.location.reload(true);
			}
		});		
	});
	
	$(document).on('click', '#btn_sostituisci_auto_2', function(){
	var pianificazione_2=$("#identificativo_2").val();
	var idauto_2=$("#auto_altenativa_2 option:selected").val();
	console.log('sostiutisco auto');
    console.log('id_auto_scelta!:'+$("#auto_altenativa_2 option:selected").val()); 	
	 console.log('auto_scelta!:'+$("#auto_altenativa_2 option:selected").text());
    console.log('prenotazione:'+$("#identificativo_2").val());	

	$.ajax({
			type: "POST",
			url: "../php/booking/edit_prenotazione_auto.php",
			data:{pianificazione:pianificazione_2,idauto:idauto_2},
			async:false,
			success: function(data) {
				console.log(data);	
				window.location.reload(true);
			}
		});		
	});	

	$(document).on('click', '#btn_sostituisci_auto_3', function(){
	var pianificazione_3=$("#identificativo_3").val();
	var idauto_3=$("#auto_altenativa_3 option:selected").val();
	console.log('sostiutisco auto');
    console.log('id_auto_scelta!:'+$("#auto_altenativa_3 option:selected").val()); 	
	 console.log('auto_scelta!:'+$("#auto_altenativa_3 option:selected").text());
    console.log('prenotazione:'+$("#identificativo_3").val());	

	$.ajax({
			type: "POST",
			url: "../php/booking/edit_prenotazione_auto.php",
			data:{pianificazione:pianificazione_3,idauto:idauto_3},
			async:false,
			success: function(data) {
				console.log(data);	
				window.location.reload(true);
			}
		});		
	});	
	
	$(document).on('click', '#btn_sostituisci_auto_4', function(){
	var pianificazione_1=$("#identificativo_4").val();
	var idauto_4=$("#auto_altenativa_4 option:selected").val();
	console.log('sostiutisco auto');
    console.log('id_auto_scelta!:'+$("#auto_altenativa_4 option:selected").val()); 	
	 console.log('auto_scelta!:'+$("#auto_altenativa_4 option:selected").text());
    console.log('prenotazione:'+$("#identificativo_4").val());	

	$.ajax({
			type: "POST",
			url: "../php/booking/edit_prenotazione_auto.php",
			data:{pianificazione:pianificazione_4,idauto:idauto_4},
			async:false,
			success: function(data) {
				console.log(data);	
				window.location.reload(true);
			}
		});		
	});	
	
});


