

$(document).ready(function() {
	$('#auto').prop('disabled',true);
	jQuery('#dataviaggio').datetimepicker({
						  lang:'it',
						  format:'Y-m-d H:i:s',
						  default: new Date()
						});
//popolo il menu via include sul div principale
$("#menu").load("menu.html"); 
		var matricola;
		$.ajax({
			type: "GET",
			url: "php/get_operatore_sessione.php",
			success: function(data) {
			var response = $.parseJSON(data);
			matricola=data;
			$('.matricola').val(matricola);
			
			$.ajax({
				type: "POST",
				url: "php/lista_viaggi_matricola.php",
				data: {matricola: matricola},
				success: function(data) {
				var lista = $.parseJSON(data);
				var quanti=lista['dimensione'];
				
				var tabellasch="<thead><tr><th>Stato Viaggio</th><th>Matricola Autista</th><th>Data Partenza</th><th>Destinazione</th>"+
							"<th>Auto</th><th></th></tr></thead>"+
							"<tfoot><tr><th></th><th>Matricola Autista</th><th>Data Partenza</th><th>Destinazione</th>"+
							"<th>Auto</th><th></th></tr></tfoot><tbody>";
		
				for(var i=0;i < quanti;i++){
					var matricola=lista[i]['autista'];
					var stato=lista[i]['stato'];
					tabellasch+="<tr>";
		
					switch(stato){
						 case '0': tabellasch+="<td><button type=\"button\" id='start' data-viaggio=\""+lista[i]['idViaggio']+	"\"data-target=\"#esito\" class=\"btn btn-success \"><span class=\"glyphicon glyphicon-road\" aria-hidden=\"true\"></span>  Inizia Viaggio</button></td>";
								break;
						case '1': tabellasch+="<td><button data-toggle=\"modal\" type=\"button\" id='upload' data-viaggio=\""+lista[i]['idViaggio']+		"\"data-target=\"#load_etichette\" class=\"btn btn-success \"><span class=\"glyphicon glyphicon-road\" aria-hidden=\"true\"></span>  Carico/Scarico </button>&nbsp;<button type=\"button\" id='stop' data-viaggio=\""+lista[i]['idViaggio']+		"\"data-target=\"#esito\" class=\"btn btn-warning \"><span class=\"glyphicon glyphicon-road\" aria-hidden=\"true\"></span>  Termina Viaggio</button></td>";
								break;
						case '2': tabellasch+="<td><button disabled type=\"button\" id='stop' class=\"btn btn-danger \"><span class=\"glyphicon glyphicon-road\" aria-hidden=\"true\"></span>  Viaggio terminato</button></td>";
								break;
					}
					tabellasch+="<td>"+lista[i]['autista']+"</td><td>"+lista[i]['datapartenza']+"</td><td>"+lista[i]['destinazione']+"</td><td>"+lista[i]['marca']+" ANNO: "+lista[i]['anno']+"</td><td>";
					tabellasch+="<button type=\"button\" id=\"modifica_autista\" data-toggle=\"modal\" data-target=\"#autistaModal\" class=\"btn btn-success modifica_autista\" data-matricola=\""+lista[i]['matricola']+"\" data-nome=\""+lista[i]['nome']+"\" data-comune_nascita=\""+lista[i]['comune_nascita']+"\" data-cognome=\""+lista[i]['cognome']+"\" data-cf=\""+lista[i]['cf']+"\" data-nascita=\""+lista[i]['data_nascita']+"\"><span class=\"glyphicon glyphicon-wrench\" aria-hidden=\"true\"></span>  Modifica</button>";
					tabellasch+="&nbsp;<button type=\"button\" data-toggle=\"modal\" id='bottDel' data-target=\"#cancella_viaggio\" class=\"btn btn-danger cancella_viaggio\" data-viaggio=\""+lista[i]['idViaggio']+"\"><span class=\"glyphicon glyphicon-remove-circle\" aria-hidden=\"true\"></span>  Cancella</button></td>";
								
				
					}
				tabellasch+="</tbody></table>";
				$('#tab_viaggi').html(tabellasch);

				}/**,
				error: function(xhr, desc, err) {
					alert("Dettagli: " + desc + "\nError:" + err);
				}**/
		
		});
	
			}/**,
			error: function(xhr, desc, err) {
				alert("Dettagli: " + desc + "\nError:" + err);
			}**/
		});
	

	$(document).on('click', '#upload', function(){
		var viaggio=$(this).data('viaggio');
		$('#idViaggioUpload').val(viaggio);
		
				$.ajax({
				type: "POST",
				url: "php/lista_etichette.php",
				data: {viaggio: viaggio},
				success: function(data) {
				var lista = $.parseJSON(data);
				var quanti=lista['dimensione'];
				if(quanti>0){
				var tabellasch="<thead><tr><th>Cod Richiesta</th></thead>"+
							"<tfoot><tr><th>Cod Richiesta</th></tr></tfoot><tbody>";
				} else {
					var tabellasch='Nessuna richiesta Caricata';
					
				}
				for(var i=0;i < quanti;i++){
					
					tabellasch+="<tr><td>"+lista[i]['etichetta']+"</td></tr>";
					
					}
				tabellasch+="</tbody></table>";
				$('#tab_elenco_etichette').html(tabellasch);

				}/**,
				error: function(xhr, desc, err) {
					alert("Dettagli: " + desc + "\nError:" + err);
				}**/
		
		});
		
	});
	
		
	$(document).on('click', '#start',function(){
	var viaggio=$(this).data('viaggio');
	
		$.ajax({
			type: "POST",
			url: "php/change_stato_viaggio.php",
			data: {viaggio: viaggio, stato: 1},
			success: function(response) {
			if(response==1){
					location.reload();
				}else{
					var successo="<div class=\"modal-dialog\"><div class=\"modal-content\"><div class=\"modal-header\"><button type=\"button\" class=\"close\" data-dismiss=\"modal\"></button>"+
				  "<h4 class=\"modal-title\"><img src=\"img/wheel.png\" /> Nuova viaggio</h4></div><div class=\"modal-body\">"+
				  " Errore durante l'inizio del viaggio</div>"+
				  "<div class=\"modal-footer\"><button type=\"button\" class=\"btn btn-default\" id=\"chiudiesito\" data-dismiss=\"modal\" >Chiudi finestra</button></div></div>";
				$('#esito').html(successo);
				
				}
	
			}
			
		});

	});	
	
	
	
	
	$(document).on('click', '#stop',function(){
	var viaggio=$(this).data('viaggio');
	
		$.ajax({
			type: "POST",
			url: "php/change_stato_viaggio.php",
			data: {viaggio: viaggio, stato: 2},
			success: function(response) {
			if(response==1){
				location.reload();
				}else{
					var successo="<div class=\"modal-dialog\"><div class=\"modal-content\"><div class=\"modal-header\"><button type=\"button\" class=\"close\" data-dismiss=\"modal\"></button>"+
				  "<h4 class=\"modal-title\"><img src=\"img/wheel.png\" /> Nuova viaggio</h4></div><div class=\"modal-body\">"+
				  " Errore durante la terminazione del viaggio</div>"+
				  "<div class=\"modal-footer\"><button type=\"button\" class=\"btn btn-default\" id=\"chiudiesito\" data-dismiss=\"modal\" >Chiudi finestra</button></div></div>";
				$('#esito').html(successo);
				
				}
	
			}
		});
		location.reload();
	});	
	
	$(document).on('click','#b_addViaggio',function(){
	$('.modal-title').html('Pianifica Viaggio');
	$('#dataviaggio').val('');	
	$('#destinazione').val('');
	$('#auto').val('');
	
		});
		
	$(document).on('change','#dataviaggio',function(){
		$('#auto').prop('disabled',false);
		var matricola=$('#matricola').val();
		var dataviaggio=$('#dataviaggio').val();
        $.ajax({
			type: "POST",
			url: "php/lista_auto_asl.php",
			data:{matricola: matricola, dataviaggio: dataviaggio}, 
			success: function(data) {
			var lista = $.parseJSON(data);
			var options='';
			var quanti=lista['dimensione'];
			for(var i=0;i < quanti;i++){
				options+="<option value='"+lista[i]['idauto']+"'>"+lista[i]['marca']+" ANNO:"+lista[i]['anno']+"</option>";
			}
			if(i==0){
				options+="<option disabled> nessuna auto disponibile </option>";
			}
	
			
			$('#auto').html(options);
			}/**,
			error: function(xhr, desc, err) {
				alert("Dettagli: " + desc + "\nError:" + err);
			}**/
			});
	});	
	$(document).on('click', '#bottDel',function(){
		
		var viaggio=$(this).data('viaggio');
		$('#delViaggio').val(viaggio);
	});
	$(document).on('submit', '#cancella_viaggio_form',function(){
		var viaggio=$('#delViaggio').val();
	
		  $.ajax({
			type: "POST",
			url: "php/elimina_viaggio.php",
			data:{viaggio: viaggio}, 
			success: function(data) {
			if(response==1){
			var successo="<div class=\"modal-dialog\"><div class=\"modal-content\"><div class=\"modal-header\"><button type=\"button\" class=\"close\" data-dismiss=\"modal\"></button>"+
			  "<h4 class=\"modal-title\"><img src=\"img/wheel.png\" /> Nuova viaggio</h4></div><div class=\"modal-body\">"+
			  " Viaggio cancellato correttamente</div>"+
			  "<div class=\"modal-footer\"><button type=\"button\" class=\"btn btn-default\" id=\"chiudiesito\" data-dismiss=\"modal\" >Chiudi finestra</button></div></div>";
			$('#esito').html(successo);
			$('.chiudi_modale').trigger('click');
			location.reload();
				}else{
					var successo="<div class=\"modal-dialog\"><div class=\"modal-content\"><div class=\"modal-header\"><button type=\"button\" class=\"close\" data-dismiss=\"modal\"></button>"+
				  "<h4 class=\"modal-title\"><img src=\"img/wheel.png\" /> Nuova viaggio</h4></div><div class=\"modal-body\">"+
				  " Errore durante la cancellazioen del viaggio</div>"+
				  "<div class=\"modal-footer\"><button type=\"button\" class=\"btn btn-default\" id=\"chiudiesito\" data-dismiss=\"modal\" >Chiudi finestra</button></div></div>";
				$('#esito').html(successo);
		
				}
			
			}
			
			});
	});
	
	
	$("#aggiungi_viaggio_form").validator().on("submit", function (event) {

	if (event.isDefaultPrevented()) {
			//i campi non sono a posto: stampa messaggio errore
			//nascondo subito la modale
			submitMSG(false, "Non hai compilato i campi richiesti");
		} else {
			//i campi sono a posto
			event.preventDefault();
			
			var matricola=$("#matricola").val();
			var dataviaggio=$('#dataviaggio').val();
			var auto=$('#auto').val();
			var destinazione=$('#destinazione').val();
			

	
			$.ajax({
			type:'POST',
			url:'php/nuovo_viaggio.php',
			data:'matricola='+matricola+'&dataviaggio='+dataviaggio+'&auto='+auto+'&destinazione='+destinazione,
			success: function(response){
			if(response==1){
			var successo="<div class=\"modal-dialog\"><div class=\"modal-content\"><div class=\"modal-header\"><button type=\"button\" class=\"close\" data-dismiss=\"modal\"></button>"+
			  "<h4 class=\"modal-title\"><img src=\"img/wheel.png\" /> Nuova viaggio</h4></div><div class=\"modal-body\">"+
			  " Viaggio inserito correttamente</div>"+
			  "<div class=\"modal-footer\"><button type=\"button\" class=\"btn btn-default\" id=\"chiudiesito\" data-dismiss=\"modal\" >Chiudi finestra</button></div></div>";
			$('#esito').html(successo);
			$('#chiudi_modale').trigger('click');
			location.reload;
				}else{
					var successo="<div class=\"modal-dialog\"><div class=\"modal-content\"><div class=\"modal-header\"><button type=\"button\" class=\"close\" data-dismiss=\"modal\"></button>"+
				  "<h4 class=\"modal-title\"><img src=\"img/wheel.png\" /> Nuova viaggio</h4></div><div class=\"modal-body\">"+
				  " Errore durante l'inserimento del viaggio</div>"+
				  "<div class=\"modal-footer\"><button type=\"button\" class=\"btn btn-default\" id=\"chiudiesito\" data-dismiss=\"modal\" >Chiudi finestra</button></div></div>";
				$('#esito').html(successo);
			
				}
			}
			});
		}
		location.reload;

	});
		
	$(document).on('click','#chiudiesito',function(){
	
		location.reload();
	});
});
