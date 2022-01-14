
	//modale per avanzamento step
var modalstep="<div class=\"modal-dialog\" id=\"modal-dialog_step\"  {width:55%;}><div class=\"modal-content\"><div class=\"modal-header\"><img src=\"../img/logo.png\"><h1><img src=\"../img/booking/lettering_3_bis.png\"  width=\"50% height=50%\"></h1></div>"+
            "<div class=\"modal-body\" id=\"modal-body\" align=\"center\"><img src=\"../img/booking/prenota_blue.png\"  width=\"15%\" ><i class=\"fa fa-arrow-circle-o-right fa-5x margini_frecce_blue\" style='vertical-align: middle;'></i></h1><img src=\"../img/booking/informazioni_blue.png\"  width=\"15%\" ><i class=\"fa fa-arrow-circle-o-right fa-5x margini_frecce_blue\" style='vertical-align: middle;'></i> <img src=\"../img/booking/macchina_blue.png\"  width=\"15%\"><i class=\"fa fa-arrow-circle-o-right fa-5x margini_frecce\" style='vertical-align: middle;'></i></h1> <img src=\"../img/booking/conferma_grey.png\"  width=\"15%\">"+
            "</div><div class=\"modal-footer\" id=\"modal-footer\"><img src=\"../img/booking/logo_estar.png\"></div></div></div>";
			
			
	
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
	$("#modalstep").html(modalstep);
    $("#modalstep").modal('show');
	$("#modalstep").on('click',function(){
		
		$("#modalstep").hide();
		$('.modal-backdrop').hide();
		$('body').removeClass('modal-open');
	});
	$(document).on('click','.seleziona',function(){
		$('.auto_sel').attr("src",'../img/booking/car_deselected.png' );
		$('.auto_sel').removeClass('auto_sel');
		$('.auto_sel_andata').attr("src",'../img/booking/car_deselected.png' );
		$('.auto_sel_andata').removeClass('auto_sel');
		$('.auto_sel_ritorno').attr("src",'../img/booking/car_deselected.png' );
		$('.auto_sel_ritorno').removeClass('auto_sel');
		$(this).find('.auto').attr("src",'../img/booking/car_selected.png' );
		$(this).find('.auto').addClass('auto_sel');
		if($('.auto_sel').size() >0){
			$('.prosegui').fadeIn();
		}
	});
	$(document).on('click', '#vaistep4', function(){
		var idauto=$('.auto_sel').attr('data-value');
	
		$.ajax({
					type:'POST',
					url:'../php/booking/setauto.php',
					data:{idauto:idauto},
					success: function(data) {
					console.log('sono qui');	
					console.log(data);
					if(data==1){
				
						location.href='step4.html';
					}
					else if (data==3){
					alert("ATTENZIONE!! AUTO NON PIU' DISPONIBILE!");
					}
					}
			});
	});
		$(document).on('click','.seleziona_condivisione',function(){
		$('.auto_sel').attr("src",'../img/booking/car_deselected.png' );
		$('.auto_sel').removeClass('auto_sel');
		$('.auto_sel_andata').attr("src",'../img/booking/car_deselected.png' );
		$('.auto_sel_andata').removeClass('auto_sel_andata');
		$('.auto_sel_ritorno').attr("src",'../img/booking/car_deselected.png' );
		$('.auto_sel_ritorno').removeClass('auto_sel_ritorno');
		$(this).find('.auto').attr("src",'../img/booking/car_selected.png' );
		$(this).find('.auto').addClass('auto_sel');
		if($('.auto_sel').size() >0){
			$('.prosegui_2').fadeIn();
		}
	});
		$(document).on('click','.seleziona_condivisione_andata',function(){
		$('.auto_sel').attr("src",'../img/booking/car_deselected.png' );
		$('.auto_sel').removeClass('auto_sel');
		$('.auto_sel_andata').attr("src",'../img/booking/car_deselected.png' );
		$('.auto_sel_andata').removeClass('auto_sel_andata');
		$(this).find('.auto_andata').attr("src",'../img/booking/car_selected.png' );
		$(this).find('.auto_andata').addClass('auto_sel_andata');
		if($('.auto_sel_andata').size() >0){
			$('.prosegui_2').fadeIn();
		}
	});
		$(document).on('click','.seleziona_condivisione_ritorno',function(){
		$('.auto_sel').attr("src",'../img/booking/car_deselected.png' );
		$('.auto_sel').removeClass('auto_sel');
		$('.auto_sel_ritorno').attr("src",'../img/booking/car_deselected.png' );
		$('.auto_sel_ritorno').removeClass('auto_sel_ritorno');
		$(this).find('.auto_ritorno').attr("src",'../img/booking/car_selected.png' );
		$(this).find('.auto_ritorno').addClass('auto_sel_ritorno');
		if($('.auto_sel_ritorno').size() >0){
			$('.prosegui_2').fadeIn();
		}
	});
	$(document).on('click', '#vaistep4_2', function(){
		var idauto=$('.auto_sel').attr('data-value');
		var viaggio=$('.auto_sel').parents('tr').find('button').attr('id');
		var viaggio_andata=$('.auto_sel_andata').parents('tr').find('button').attr('id');
		var viaggio_ritorno=$('.auto_sel_ritorno').parents('tr').find('button').attr('id');
		console.log(viaggio_andata);
		console.log('idauto:'+idauto+', viaggio:'+viaggio+', viaggio_andata:'+viaggio_andata+', viaggio_ritorno:'+viaggio_ritorno);
		$.ajax({
			type:'POST',
			url:'../php/booking/set_condivisione.php',
			data:{idauto:idauto, viaggio:viaggio, viaggio_andata:viaggio_andata, viaggio_ritorno:viaggio_ritorno},
			success: function(data) {
			console.log(data);
			if(data==1){
				
				location.href='step4agg.html';
			}
					
			}
			});
	});
	$.ajax({
			type: "GET",
			url: "../php/booking/lista_auto_pren.php",
			success: function(data) {
			var lista = $.parseJSON(data);
			var quanti=lista['dimensione'];
			var tabellasch="<table class='table table-striped table-bordered' cellspacing='0' width='80%'"	+
						"><thead><tr><th></th><th>Marca</th><th>Modello</th><th>Alimentazione</th><th>Max passeggeri</th>"+
						"<th>Targa</th><th></th><th></th><tr></thead>";
			for(var i=0;i < quanti;i++){
				tabellasch+="<tr><td><img src='../"+lista[i]['img']+"'  ></td><td>"+lista[i]['marca']+"</td><td>"+lista[i]['modello']+"</td><td>"+lista[i]['alimentazione']+"</td><td>"+lista[i]['posti']+"</td><td>"+lista[i]['targa']+"</td><td>	" +
					"			</td><td><a href='#' class='seleziona'><img class='auto' data-value='"+lista[i]['idauto']+"'src='../img/booking/car_deselected.png'></a></td></tr>";
				}
			tabellasch+="</tbody></table>";
			
			if(quanti>0){
				$('#lista_auto').html(tabellasch);
			} else{
				$('#lista_auto').html('Non sono presenti macchine aziendali disponibili. <br>Puoi decidere di essere avvisato, qualora si liberassero delle auto.');
				$('#lista_auto').append('<br><button type="button" id="avvisami" class="btn btn-success">Avvisami</button>');
			}
			}/**,
			error: function(xhr, desc, err) {
				alert("Dettagli: " + desc + "\nError:" + err);
			}**/
		
		});
		
		
			$.ajax({
			type: "GET",
			url: "../php/booking/lista_auto_condivise.php",
			success: function(data) {
			var risultato=$.parseJSON(data);
				var lista = risultato['andata_ritorno'];
				var quanti=lista['dimensione'];
				var i_altri_orari=lista['i_altri_orari'];
				
				var quanti_andata_ritorno=quanti;
				var tabellasch_condivise="<p class='titolo'>Viaggio Andata e Ritorno</p> <table class='table table-striped table-bordered' cellspacing='0' width='80%'"	+
							"><thead><tr><th></th><th>Marca</th><th>Modello</th><th>Alimentazione</th><th>Max passeggeri</th>"+
							"<th>Targa</th><th></th><th></th><tr></thead>";
				for(var i=0;i < quanti;i++){
					tabellasch_condivise+="<tr><td><img src='../"+lista[i]['img']+"'  ></td><td>"+lista[i]['marca']+"</td><td>"+lista[i]['modello']+"</td><td>"+lista[i]['alimentazione']+"</td><td>"+lista[i]['posti']+"</td><td>"+lista[i]['targa_auto']+"</td><td>				<button type='button' class='btn btn-success dettagli_viaggio' data-toggle='modal' data-target='#detailModal' id='"+lista[i]['idviaggio']+"' >Dettagli Viaggio</button></td><td><a href='#' class='seleziona_condivisione'><img class='auto' data-value='"+lista[i]['idauto']+"'src='../img/booking/car_deselected.png'></a></td></tr>";
					}
				tabellasch_condivise+="</tbody></table>";
				
				if(quanti>0){
					$('#lista_auto_condivise').html(tabellasch_condivise);
				} else{
					$('#lista_auto_condivise').html('Non sono presenti viaggi COMPLETI a cui aggregarsi');
				}
				
				lista = risultato['andata'];
				quanti=lista['dimensione'];
				var tabellasch_condivise="<p class='titolo'>Partecipa al solo viaggio di Andata</p> <table class='table table-striped table-bordered' cellspacing='0' width='80%'"	+
							"><thead><tr><th></th><th>Marca</th><th>Modello</th><th>Alimentazione</th><th>Max passeggeri</th>"+
							"<th>Targa</th><th></th><th></th><tr></thead>";
				for(var i=0;i < quanti;i++){
					tabellasch_condivise+="<tr><td><img src='../"+lista[i]['img']+"'  ></td><td>"+lista[i]['marca']+"</td><td>"+lista[i]['modello']+"</td><td>"+lista[i]['alimentazione']+"</td><td>"+lista[i]['posti']+"</td><td>"+lista[i]['targa_auto']+"</td><td>				<button type='button' class='btn btn-success dettagli_viaggio' data-toggle='modal' data-target='#detailModal' id='"+lista[i]['idviaggio']+"' >Dettagli Viaggio</button></td><td><a href='#' class='seleziona_condivisione_andata'><img class='auto_andata' data-value='"+lista[i]['idauto']+"'src='../img/booking/car_deselected.png'></a></td></tr>";
					}
				tabellasch_condivise+="</tbody></table>";
				
				if(quanti>0){
					$('#lista_auto_condivise_andata').html(tabellasch_condivise);
				} else{
					$('#lista_auto_condivise_andata').html('Non sono presenti viaggi di ANDATA a cui aggregarsi');
				}
				
				lista = risultato['ritorno'];
				quanti=lista['dimensione'];
				var tabellasch_condivise="<p class='titolo'>Partecipa al solo viaggio di Ritorno</p><table class='table table-striped table-bordered' cellspacing='0' width='80%'"	+
							"><thead><tr><th></th><th>Marca</th><th>Modello</th><th>Alimentazione</th><th>Max passeggeri</th>"+
							"<th>Targa</th><th></th><th></th><tr></thead>";
				for(var i=0;i < quanti;i++){
					tabellasch_condivise+="<tr><td><img src='../"+lista[i]['img']+"'  ></td><td>"+lista[i]['marca']+"</td><td>"+lista[i]['modello']+"</td><td>"+lista[i]['alimentazione']+"</td><td>"+lista[i]['posti']+"</td><td>"+lista[i]['targa_auto']+"</td><td>				<button type='button' class='btn btn-success dettagli_viaggio' data-toggle='modal' data-target='#detailModal' id='"+lista[i]['idviaggio']+"' >Dettagli Viaggio</button></td><td><a href='#' class='seleziona_condivisione_ritorno'><img class='auto_ritorno' data-value='"+lista[i]['idauto']+"'src='../img/booking/car_deselected.png'></a></td></tr>";
					}
				tabellasch_condivise+="</tbody></table>";
				
				if(quanti>0){
					$('#lista_auto_condivise_ritorno').html(tabellasch_condivise);
				} else{
					$('#lista_auto_condivise_ritorno').html('Non sono presenti viaggi di RITORNO cui aggregarsi');
				}
				if(i_altri_orari){
				$('#ulteriori_auto').html('<input type="button" class="btn btn-danger" value="Cerca per tutti gli orari" id="cerca_tutti_orari" >');
			}else{ 	$('#ulteriori_auto').html('Non sono presenti viaggi COMPLETI in altri orari a cui aggragarsi'); }

				if(quanti_andata_ritorno>0){
					
					$('#box_nuove').fadeOut();
					$('#motivazione').fadeIn();
					$(document).on('click','#conferma_motivazione', function(){
						var motivazione_non_condivisione=$('#motivazione_non_condivisione').val();
						var n = motivazione_non_condivisione.length;
						console.log(n);
						if(n>5){
						$.ajax({
							type: "POST",
							url: "../php/booking/add_motivazione_auto.php",
							data: {motivazione: motivazione_non_condivisione},
							success: function(data) {
								var risultato = $.parseJSON(data);
								if(risultato==1){
									$('#box_nuove').fadeIn();
									$('#motivazione').fadeOut();
								}


							}
						});
						}else{
							alert('inserire una motivazione di almeno 5 caratteri');
						}
					})
				}else{
			
					$('#box_nuove').fadeIn();
					$('#motivazione').fadeOut();
				}
				}

		
		});
		
		$(document).on('click','#cerca_tutti_orari', function(){
			
	
		$.ajax({
			type: "GET",
			url: "../php/booking/lista_auto_condivise_tutti_orari.php",
			success: function(data) {
			var risultato=$.parseJSON(data);
				var lista = risultato['andata_ritorno'];
				var quanti=lista['dimensione'];
				var quanti_andata_ritorno=quanti;
				var tabellasch_condivise="<p class='titolo'>Viaggio Andata e Ritorno</p> <table class='table table-striped table-bordered' cellspacing='0' width='80%'"	+
							"><thead><tr><th></th><th>Marca</th><th>Modello</th><th>Alimentazione</th><th>Max passeggeri</th>"+
							"<th>Targa</th><th></th><th></th><tr></thead>";
				for(var i=0;i < quanti;i++){
					tabellasch_condivise+="<tr><td><img src='../"+lista[i]['img']+"'  ></td><td>"+lista[i]['marca']+"</td><td>"+lista[i]['modello']+"</td><td>"+lista[i]['alimentazione']+"</td><td>"+lista[i]['posti']+"</td><td>"+lista[i]['targa_auto']+"</td><td>				<button type='button' class='btn btn-success dettagli_viaggio' data-toggle='modal' data-target='#detailModal' id='"+lista[i]['idviaggio']+"' >Dettagli Viaggio</button></td><td><a href='#' class='seleziona_condivisione'><img class='auto' data-value='"+lista[i]['idauto']+"'src='../img/booking/car_deselected.png'></a></td></tr>";
					}
				tabellasch_condivise+="</tbody></table>";
				
				if(quanti>0){
					$('#lista_auto_condivise').html(tabellasch_condivise);
					
				} else{
					//$('#lista_auto_condivise').html('Non sono presenti viaggi COMPLETI a cui aggregarsi');
					$('#ulteriori_auto').html('Non sono presenti viaggi COMPLETI in altri orari a cui aggragarsi');
				}
				
			
	}});	});
		$(document).on('click','#avvisami', function(){
			
			$.ajax({
			type: "GET",
			url: "../php/booking/set_avvisami.php",
			success: function(data) {
				var riepilogo = $.parseJSON(data);
				if(riepilogo==1){
					$('#lista_auto').html("Verrai avvisato se si libereranno delle auto.");
					$('#lista_auto').append('<br><button type="button" id="esci" class="btn btn-success">Chiudi</button><button id="no_avviso" type="button" class="btn btn-danger">Non Avvisarmi</button>');
				}
			}});
		});
			$(document).on('click','#no_avviso', function(){
			
			$.ajax({
			type: "GET",
			url: "../php/booking/remove_avvisami.php",
			success: function(data) {
				var riepilogo = $.parseJSON(data);
				if(riepilogo==1){
					$('#lista_auto').html('Non sono presenti macchine aziendali disponibili. <br>Puoi decidere di essere avvisato, qualora si liberassero delle auto.');
					$('#lista_auto').append('<br><button type="button" id="avvisami" class="btn btn-success">Avvisami</button>');
				}
			}});
		});
		
		$(document).on('click','#esci', function(){
			location.href='./home.html';
		});
		$(document).on('click','.check-auto',function(){
			var auto=$(this).attr("id");
			jQuery.noConflict(); 
			$("#corpo_modale").load( "./check_auto.html" );
			$("#modal_check").modal('show');	
		});
		
		$(document).on('click','.dettagli_viaggio',function(){
			var viaggio=$(this).attr("id");

			$.ajax({
			type: "POST",
			data:{viaggio: viaggio},
			url: "../php/booking/get_detail_viaggio.php",
			success: function(data) {
				var riepilogo = $.parseJSON(data);
					
					
					$('#daypartenza').html(riepilogo[0]['partenza']);		
					$('#orapartenza').html(riepilogo[0]['ora_partenza']);	
					$('#dayarrivo').html(riepilogo[0]['ritorno']);		
					$('#oraarrivo').html(riepilogo[0]['ora_ritorno']);	
					$('#sedepartenza').html(riepilogo[0]['indirizzo_partenza']);			
					$('#luogodest').html(riepilogo[0]['comune_destinazione']+' Via '+riepilogo[0]['indirizzo_destinazione'] );	
					$('#passeggeri').html(riepilogo[0]['passeggeri']);	
					$('#alimentazione').html(riepilogo[0]['alimentazione']);			
					$('#cilindrata').html(riepilogo[0]['cilindrata']);	
					$('#marca').html(riepilogo[0]['marca']);
					$('#modello').html(riepilogo[0]['modello']);
					$('#targa').html(riepilogo[0]['targa']);	
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
					$('#autista').html(riepilogo[0]['nome']+" "+ riepilogo[0]['cognome']+"<img src='../"+riepilogo[0]['url_foto']+"'>");
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
					
				
					
				}
				});
		
			
			
			});
		});
	
		

		
