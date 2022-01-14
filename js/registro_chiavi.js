/**
 * Created by anna on 05/09/2016.
 */

//modale per avanzamento step
$(document).ready(function() {
	var d = new Date();
	var curr_date = d.getDate();
	var curr_month = d.getMonth() + 1; //Months are zero based
	var curr_year = d.getFullYear();
	var date_formatted= curr_date + "/" + curr_month + "/" + curr_year;
	$('#data_input').val(date_formatted);		
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
			type: "GET",
			url: "../php/booking/lista_sedi_registro_chiavi.php",
			success: function(data) {
			
			var lista = $.parseJSON(data);
			var quanti=lista['dimensione'];
			var selectList="<select id='sedi' class='form-control'>"
			for(var i=0;i < quanti;i++){
				selectList+="<option value="+lista[i]['sede_id']+"> "+lista[i]['provincia']+' '+lista[i]['indirizzo']+"</option>";
				}
			selectList+="</select>";
			
			if(quanti>0){
				$('#partenza_div').html(selectList);
			}
			}
		
		});
	createTable();

	$(document).on('click', '.bottone_stampa' , function(){
		var data_filter=$('#data_input').val();
		var partenza=$('#sedi').val();
		var chk_all=$('#chksuccessivi').val();
		var chk_non=$('#chknonprenotate').val();
		
		var myWindow = window.open('stampa_chiavi.php?data='+data_filter+'&partenza='+partenza+'&chk_all='+chk_all+'&chk_non='+chk_non, "MsgWindow", "width=800,height=800");
	});
	
	$(document).on('change', '#sedi' , function(){
		createTable();
	});
	
	//gestione checkbox per la visualizzazione delle auto prenotate dal giorno selezionato
	$(document).on('click','#chksuccessivi', function(event){
	if ($('input[name="chksuccessivi"]').is(':checked')) 
	{
		$('#chksuccessivi').val('1');
		$('#chknonprenotate').attr('checked', false);
		$('#chknonprenotate').val('0');
	}
	else
	{
		$('#chksuccessivi').val('0');
	}
	console.log('chksuccessivi '+$('#chksuccessivi').val());
	console.log('chknonprenotate '+$('#chknonprenotate').val());
	createTable();
	});
	
	//gestione checkbox per la visualizzazione delle auto prenotate dal giorno selezionato
	$(document).on('click','#chknonprenotate', function(event){
	if ($('input[name="chknonprenotate"]').is(':checked')) 
	{
		$('#chknonprenotate').val('1');
		$('#chksuccessivi').attr('checked', false);
		$('#chksuccessivi').val('0');
	}
	else
	{
		$('#chknonprenotate').val('0');
	}
	console.log('chknonprenotate '+$('#chknonprenotate').val());
	console.log('chksuccessivi '+$('#chksuccessivi').val());
	createTable();
	});	
		
	//$(".btn-aggrego").click(function(event) {
	$(document).on('click','.btn-aggrego', function(event){
//		var idscelto=$('#btn-aggrego').val();		
		var idscelto = event.target.id;
//		var idscelto = event.currentTarget.value;
		if (confirm("Confermi l'operazione?"))
		{
			console.log('va fatto l\'ajax');
			console.log('idscelto:'+idscelto);
			$.ajax({
				type: 'POST',
				url: '../php/booking/addaggregazione.php',
				cache: false,
				async: false,
				data: {
						idscelto: idscelto
				},
				//--- SUCCESS
				success: function (response) {
					console.log(response)
					if (response == 1)
					{
						alert("Operazione eseguita con successo!");
						// createTable();
					}
					else 
					{
						//TODO: In caso di errore
						alert("Attenzione!! L'operazione ha generato un errore!");
					}
				},
				//-- ERROR
        error: function(xhr, ajaxOptions, thrownError)
        {
          //la richiesta ajax è fallita
          console.log('error:' + xhr.status);
          console.log('error:' + thrownError);
          console.log('ajax errore');
        },
        //--- COMPLETE
        complete: function()
        {
          //la richiesta ajax è stata completata 
          console.log('ajax completato');
        }
        //---
		
			});
			//---
			createTable();
		} 
		else 
		{
			console.log('operazione annullata');
		}
  });

});


 function createTable(){
	 var data_filter=$('#data_input').val();
	 var partenza=$('#sedi').val();
	 var chk_all=$('#chksuccessivi').val();
	 var chk_non=$('#chknonprenotate').val();
	 
	var table_head="<div class=\"table-responsive\"><table class='table' id='include_table'><thead>"+
		""+
		"<tr><td>&nbsp</td><td>Prenotante</td>	<td>Passeggeri</td><td>Numero Passeggeri</td><td>Partenza</td><td>Destinazione</td><td>Rientro</td><td>Auto</td><td>Num.Max Passeg.</td><td>Firma ritiro chiavi</td></tr></thead><tbody id='include_table_body'></tbody></table></div>";
	
	$('#div_per_tabella').html(table_head);

	 $('#include_table_body').html();

	$.ajax({
		type:'POST',
		url:'../php/booking/getRegistroChiaviData.php',
		data:'data_filter='+data_filter+'&partenza='+partenza+'&chk_all='+chk_all+'&chk_non='+chk_non,
		success: function(data) {

			var riepilogo = $.parseJSON(data);
		
			
			var table='';
			var i=0;
			for (i = 0; i < riepilogo['dimensione']; i++) {
				console.log("viaggi_pianificati_id:"+riepilogo[i]['viaggi_pianificati_id']);
				table+='<tr>';
				
				//----
				var max = Math.max(riepilogo[i]['num_passeggeri_A'],riepilogo[i]['num_passeggeri_R']);
				var bottone = ''
				if (riepilogo[i]['pian']=='')
				{
					console.log('AGGREGA disabilitato');
					table += '<td id="'+riepilogo[i]['viaggi_pianificati_id']+'"><button id="'+riepilogo[i]['viaggi_pianificati_id']+'" type=\"button\" class=\"btn btn-success btn-aggrego\" disabled> Mi aggrego </button></td>';
				}	
				else if (max < riepilogo[i]['posti'])
				{
					console.log('AGGREGA abilitato');
					console.log("viaggi_pianificati_id:"+riepilogo[i]['viaggi_pianificati_id']);
					table += '<td id="'+riepilogo[i]['viaggi_pianificati_id']+'"><button id="'+riepilogo[i]['viaggi_pianificati_id']+'" type=\"button\" class=\"btn btn-success btn-aggrego\"> Mi aggrego </button></td>';
				}
				else
				{
					console.log('AGGREGA disabilitato');
					table += '<td id="'+riepilogo[i]['viaggi_pianificati_id']+'"><button id="'+riepilogo[i]['viaggi_pianificati_id']+'" type=\"button\" class=\"btn btn-warning\" disabled> Posti esauriti </button></td>';
				}
				
				//----
				table+='<td>'+riepilogo[i]['cognome']+' '+riepilogo[i]['nome']+'</td>';
				table+='<td>'+riepilogo[i]['passeggeri']+'</td>';
				table+='<td>'+riepilogo[i]['num_passeggeri_A']+'[Andata]<br> '+riepilogo[i]['num_passeggeri_R']+'[Ritorno] </td>';
				table+='<td>'+riepilogo[i]['partenza']+' '+riepilogo[i]['ora_partenza']+'</td>';
				table+='<td>'+riepilogo[i]['comune_destinazione']+' '+riepilogo[i]['indirizzo_destinazione']+'</td>';
				table+='<td>'+riepilogo[i]['ritorno']+' '+riepilogo[i]['ora_ritorno']+'</td>';
				table+='<td>'+riepilogo[i]['marca']+' '+riepilogo[i]['modello']+' '+riepilogo[i]['targa']+'</td>';
				table+='<td>'+riepilogo[i]['posti']+'</td>';
				table+='<td id="firma"></td>';
//				table += '<td button type=\"button\" class=\"btn btn-success\"> Mi aggrego A/R</button></td>';
				table += '</tr>';
			}
			if(i==0){
				
				table="<tr><td colspan='8'>Non ci sono prenotazioni per il giorno "+data_filter+"</td></tr>";
	
			}
			$('#include_table_body').html(table);	
	
		

		}
	});
	
	
 }

