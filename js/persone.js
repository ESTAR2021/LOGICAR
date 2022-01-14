

function loadFile (event) {
    var reader = new FileReader();
    reader.onload = function(){
      var preview = document.getElementById('preview');
      preview.src = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
  };

$(document).ready(function() {

//popolo il menu via include sul div principale


	$.ajax({
			type: "GET",
			url: "php/lista_persone.php",
			async: false,
			success: function(data) {
			var lista = $.parseJSON(data);
			var quanti=lista['dimensione'];
			/*
			var tabellasch="<thead><tr><th>Matricola</th><th>Cognome</th><th>Nome</th>"+
						"<th>CF</th><th>Azienda</th><th> Amministratore </th><th> Sede </th><th> Email </th><th> Foto </th> <th> </th></tr></thead>"+
						"<tfoot><tr><th>Matricola</th><th>Cognome</th><th>Nome</th>"+
						"<th>CF</th><th>Azienda</th><th> Amministratore </th><th> Sede </th><th> Email </th><th> Foto </th><th></th></tr></thead></tfoot><tbody>";
			*/
			var tabellasch="<thead><tr><th>Matricola</th><th>Cognome</th><th>Nome</th>"+
						"<th>CF</th><th>Azienda</th><th> Sede </th><th> Admin </th><th> Portineria </th><th> Foto </th><th> Email </th> <th> </th></tr></thead>"+
						"<tfoot><tr><th>Matricola</th><th>Cognome</th><th>Nome</th>"+
						"<th>CF</th><th>Azienda</th><th> Sede </th><th> Admin </th><th> Portineria </th><th> Foto </th><th> Email </th><th></th></tr></thead></tfoot><tbody>";
			for(var i=0;i < quanti;i++){
				var matricola=lista[i]['matricola'];
				//riga della datatables
				tabellasch+="<tr><td>"+lista[i]['badge']+"</td><td>"+lista[i]['cognome']+"</td><td>"+lista[i]['nome']+"</td><td>"+lista[i]['cf']+"</td><td>"+lista[i]['azienda']+"</td><td>"+lista[i]['indirizzo']+"</td><td>"+lista[i]['amministrativo']+"</td><td>"+lista[i]['portineria']+"</td><td><img src='"+lista[i]['url_foto']+"'></td><td>"+lista[i]['email']+"</td><td>";
				
				tabellasch+="<button type=\"button\" id=\"modifica_autista"+lista[i]['matricola']+"\" data-toggle=\"modal\" data-target=\"#autistaModal\" class=\"btn btn-success modifica_autista\" data-matricola=\""+lista[i]['matricola']+"\" data-badge=\""+lista[i]['badge']+"\" data-email=\""+lista[i]['email']+"\" data-nome=\""+lista[i]['nome']+"\" data-comune_nascita=\""+lista[i]['comune_nascita']+"\" data-cognome=\""+lista[i]['cognome']+"\" data-cf=\""+lista[i]['cf']+"\"  data-asl=\""+lista[i]['ASL']+"\"  data-amministrativo=\""+lista[i]['amministrativo']+"\"  data-portineria=\""+lista[i]['portineria']+"\" data-nascita=\""+lista[i]['data_nascita']+"\" data-sede_lavoro=\""+lista[i]['sede_lavoro']+"\"><span class=\"glyphicon glyphicon-wrench\" aria-hidden=\"true\"></span>  Modifica</button>";
				//--- bottone cancella autista
			/*
				tabellasch+="&nbsp;<button type=\"button\" id=\"cancella_autista"+lista[i]['matricola']+"\" data-toggle=\"modal\" data-target=\"#cancella_autista\" class=\"btn btn-danger cancella_autista\" data-matricola=\""+lista[i]['matricola']+"\" data-nome=\""+lista[i]['nome']+"\" data-cognome=\""+lista[i]['cognome']+"\" data-cf=\""+lista[i]['cf']+"\" data-nascita=\""+lista[i]['data_nascita']+"\"><span class=\"glyphicon glyphicon-remove-circle\" aria-hidden=\"true\"></span>  Cancella</button>";				
		*/
				tabellasch+="&nbsp;<button type=\"button\" id=\"cancella_autista"+lista[i]['matricola']+"\" data-toggle=\"modal\" data-target=\"#cancella_autista\" class=\"btn btn-danger cancella_autista\" data-matricola=\""+lista[i]['matricola']+"\" data-badge=\""+lista[i]['badge']+"\" data-email=\""+lista[i]['email']+"\" data-nome=\""+lista[i]['nome']+"\" data-comune_nascita=\""+lista[i]['comune_nascita']+"\" data-cognome=\""+lista[i]['cognome']+"\" data-cf=\""+lista[i]['cf']+"\"  data-asl=\""+lista[i]['ASL']+"\"  data-amministrativo=\""+lista[i]['amministrativo']+"\"  data-portineria=\""+lista[i]['portineria']+"\" data-nascita=\""+lista[i]['data_nascita']+"\"><span class=\"glyphicon glyphicon-remove-circle\" aria-hidden=\"true\"></span>  Cancella</button>";
				//--- bottone carica foto
			    tabellasch+="&nbsp;<a href=\"ajaxup/index.php?matricola="+lista[i]['matricola']+"\" target=\"blank\"><button type=\"button\" id=\"carica_foto"+lista[i]['matricola']+"\" class=\"btn btn-info carica-foto\" data-matricola=\""+lista[i]['matricola']+"\" data-nome=\""+lista[i]['nome']+"\" data-cognome=\""+lista[i]['cognome']+"\" data-cf=\""+lista[i]['cf']+"\" data-nascita=\""+lista[i]['data_nascita']+"\"><span class=\"glyphicon glyphicon-record\" aria-hidden=\"true\"></span> Foto</button></a></td>";	
				}
			tabellasch+="</tbody></table>";
			$('#tab_autisti').html(tabellasch);
		
			$('#tab_autisti').DataTable();
			}/**,
			error: function(xhr, desc, err) {
				alert("Dettagli: " + desc + "\nError:" + err);
			}**/
		
		});
	
	
	$('#carica_foto').on('show.bs.modal', function (event) {
			var button = $(event.relatedTarget); // Button that triggered the modal
			var mymatricola = button.data('matricola'); // Extract info from data-* attributes
			
	});
	
	
	$(document).on('click','.cancella_autista', function(){
		$('#delMatricola').val($(this).data('matricola'));
		$('#cancel_mtr').html($(this).data('matricola'));
	
	});

	$(document).on('submit','#cancella_autista', function(){
		var matricola=$('#delMatricola').val();

		    $.ajax({
				type: "POST",
				data: {matricola: matricola},
				url: "php/elimina_autista.php",
				success: function(data) {
				
				if(data==1){
					
				var successo="<div class=\"modal-dialog\"><div class=\"modal-content\"><div class=\"modal-header\"><button type=\"button\" class=\"close\" data-dismiss=\"modal\"></button>"+
				  "<h4 class=\"modal-title\"><img src=\"img/uomo.png\" /> Nuova autista</h4></div><div class=\"modal-body\">"+
				  " Autista cancellato correttamente</div>"+
				  "<div class=\"modal-footer\"><button type=\"button\" class=\"btn btn-default\" id=\"chiudioggetto\" data-dismiss=\"modal\" >Chiudi finestra</button></div></div>";
				$('#esito').html(successo);}
					else{
						var successo="<div class=\"modal-dialog\"><div class=\"modal-content\"><div class=\"modal-header\"><button type=\"button\" class=\"close\" data-dismiss=\"modal\"></button>"+
					  "<h4 class=\"modal-title\"><img src=\"img/uomo.png\" /> Nuova autista</h4></div><div class=\"modal-body\">"+
					  " Errore durante la cancellazione dell'autista</div>"+
					  "<div class=\"modal-footer\"><button type=\"button\" class=\"btn btn-default\" id=\"chiudioggetto\" data-dismiss=\"modal\" >Chiudi finestra</button></div></div>";
					$('#esito').html(successo);
					}
			}
			});
	});
	
	
	$(document).on('click','#b_addOp',function(){
	$('.titolo').html('Aggiungi Autista');
	$('#tipo_op').val('0');
	$('#badge').val('');
//	$('#matricola').val('');
//	$('#matricola').prop('readonly',false);	
	$('#nome').val('');
	$('#cognome').val('');
	$('#asl').val('');
	$('#foto').val('');
	$('#preview').val('');
	$('#cf').val('');

	$('#email').val('');
	//$('#nascita').val('');

        $.ajax({
			type: "GET",
			url: "php/lista_sedi_lavoro_personale.php",
			success: function(data) {
			var lista = $.parseJSON(data);
	
			var quanti=lista['dimensione'];
			var option_asl="<option value='"+lista['asl_id']+"'>"+lista['azienda']+"</option>";
			var options='';
			for(var i=0;i < quanti;i++){
				options+="<option value='"+lista[i]['id']+"'>"+lista[i]['indirizzo']+"</option>";
			}
			
			$('#sede').html(options);
			$('#asl').html(option_asl);
			}
			/**,
			error: function(xhr, desc, err) {
				alert("Dettagli: " + desc + "\nError:" + err);
			}**/
			});
		});
		
		
		
	$(document).on('click','.modifica_autista',function(){
		console.log($(this).data());
	$('.titolo').html('Modifica Autista');
	$('.form').attr('id','modifica_autista_form');
	$('#tipo_op').val('1');
	$('#badge').val($(this).data('badge'));
	$('#matricola').val($(this).data('matricola'));	//max
	$('#email').val($(this).data('email'));	
//	$('#matricola').prop('readonly',true);
	$('#nome').val($(this).data('nome'));
	$('#cognome').val($(this).data('cognome'));
	$('#asl').val($(this).data('asl'));
	$('#foto').val($(this).data('foto'));
	$('#preview').val($(this).data('preview'));
	$('#cf').val($(this).data('cf'));
	$('#comune_nascita').val($(this).data('comune_nascita'));
	//---
	if ($(this).data('amministrativo') == 1)
	{
		$('#amministrativo').prop( "checked", true );
	}
	else
	{
		$('#amministrativo').prop( "checked", false );
	}
	//---
	if ($(this).data('portineria') == 1)
	{
		$('#portineria').prop( "checked", true );
	}
	else
	{
		$('#portineria').prop( "checked", false );
	}
	//---
	$('#nascita').val($(this).data('nascita'));
		var asl_select=$(this).data('asl');
		var sede_lavoro=$(this).data('sede_lavoro');
         $.ajax({
			//type: "GET",
			type: "POST",
			url: "php/lista_sedi_lavoro_personale.php",
			data: { matricola: $('#matricola').val() },
			success: function(data) {
			var lista = $.parseJSON(data);
			//console.log(data);
			//console.log($('#matricola').val());
			console.log(lista);	
	//		var sede_lavoro=$(this).data('sede_lavoro');
	//		var sede_lavoro=lista['sede_lavoro'];
			console.log("sede_lavoro="+sede_lavoro);
			var quanti=lista['dimensione'];
			var option_asl="<option value='"+lista['asl_id']+"'>"+lista['azienda']+"</option>";
			var options='';
			for(var i=0;i < quanti;i++)
			{
				if (lista[i]['0'] == sede_lavoro)
				{
					//nel caso che la sede_lavoro corrisponda con l'autista selezionato
					//mette la propietà selected
					options+="<option value='"+lista[i]['id']+"' selected>"+lista[i]['indirizzo']+"</option>";
					console.log('i',i);
				}
				else
				{
					options+="<option value='"+lista[i]['id']+"'>"+lista[i]['indirizzo']+"</option>";
				}
			}
			
			
			$('#sede').html(options);
			$('#asl').html(option_asl);
			}
			/**,
			error: function(xhr, desc, err) {
				alert("Dettagli: " + desc + "\nError:" + err);
			}**/
			});
		});	
		
		
	$("#autista_form").validator().on("submit", function (event) {
//console.log('hai premuto questo tasto');
alert('formsubmit');
	if (event.isDefaultPrevented()) {
			//i campi non sono a posto: stampa messaggio errore
			//nascondo subito la modale
			//submitMSG(false, "Non hai compilato i campi richiesti");
			alert("Non hai compilato i campi richiesti");
		} else {
			//i campi sono a posto
			event.preventDefault();	
			var matricola=$("#matricola").val();
			var badge=$("#badge").val();// aggiunto max
			var nome=$("#nome").val();
			var cognome=$("#cognome").val();
			var asl=$("#asl").val();
			var sede_lavoro=$("#sede").val();
			var cf=$("#cf").val();
			var foto=$("#foto").val();
			var tipo=$('#tipo_op').val();
			var email=$('#email').val();
			//---
			var amministrativo=0;
			if($('#amministrativo').is(":checked")){
				amministrativo=1;
			}
			//---
			var portineria=0;
			if($('#portineria').is(":checked")){
					portineria=1;
				}
			//---
			$.ajax({
			type:'POST',
			url:'php/query_persone.php',
			data:'matricola='+matricola+'&badge='+badge+'&nome='+nome+'&cognome='+cognome+'&email='+email+'&amministrativo='+amministrativo+'&sede_lavoro='+sede_lavoro+'&portineria='+portineria+'&asl='+asl+'&cf='+cf+'&foto='+foto+'&tipo='+tipo,
			success: function(response){
//console.log(data);
			console.log(response);
			if(response==1){
			var successo="<div class=\"modal-dialog\"><div class=\"modal-content\"><div class=\"modal-header\"><button type=\"button\" class=\"close\" data-dismiss=\"modal\"></button>"+
			  "<h4 class=\"modal-title\"><img src=\"img/uomo.png\" /> Nuovo dipendenge</h4></div><div class=\"modal-body\">"+
			  " Dipendente salvato correttamente</div>"+
			  "<div class=\"modal-footer\"><button type=\"button\" class=\"btn btn-default\" id=\"chiudiesito\" data-dismiss=\"modal\" >Chiudi finestra</button></div></div>";
			$('#esito').html(successo);
			$('#chiudi_modale').trigger('click')
		
				}else{
					var successo="<div class=\"modal-dialog\"><div class=\"modal-content\"><div class=\"modal-header\"><button type=\"button\" class=\"close\" data-dismiss=\"modal\"></button>"+
				  "<h4 class=\"modal-title\"><img src=\"img/uomo.png\" /> Nuovo dipendente</h4></div><div class=\"modal-body\">"+
				  " Errore durante il salvataggio del dipendente</div>"+
				  "<div class=\"modal-footer\"><button type=\"button\" class=\"btn btn-default\" id=\"chiudiesito\" data-dismiss=\"modal\" >Chiudi finestra</button></div></div>";
				$('#esito').html(successo);
				}
			}
			});
		}

	});
	
	
	
	
	$(document).on('click','#chiudiesito',function(){
	
		location.reload();
	});
	$("#menu").load("menu.html"); 
});

function submitMSG(valid, msg) {
    if (valid) {
        var msgClasses = "h3 text-center tada animated text-success";
    } else {
        var msgClasses = "h3 text-center text-danger";
    }
    $("#msgSubmit").html("non hai compilato i campi richiesti");
}
