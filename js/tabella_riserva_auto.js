


$(document).ready(function(){
$.ajax({
	type: "GET",
	url: "php/lista_riserva_auto.php",
	success: function (data) {

		var lista_rif = $.parseJSON(data);
		var quanti_rif = lista_rif['dimensione'];
		var tabella_rif = "<thead><tr><th>Da</th>" +
			"<th>A</th><th>Operazioni</th></tr></thead>" +
			"<tfoot><tr><th>Da</th>" +
			"<th>A</th><th>Operazioni</th></tr></tfoot><tbody>";
		for (var i = 0; i < quanti_rif; i++) {
			var idrif = lista_rif[i]['id'];



			tabella_rif += "<tr><td>" + lista_rif[i]['giornoita_da'] + "</td><td>" + lista_rif[i]['giornoita_a'] + "</td>" +
				"<td>";
			tabella_rif += "<button type=\"button\" id=\"cancella_riserva\" class=\"btn btn-danger\"  data-toggle=\"modal\" data-target=\"#confirm-delete-riserva\" data-id=\"" + idrif + "\"><span class=\"glyphicon glyphicon-remove-circle\" aria-hidden=\"true\"></span>  Cancella</button> &nbsp;";
			tabella_rif += "<button type=\"button\" id=\"sprenota_auto\" class=\"btn btn-primary\"  data-toggle=\"modal\" data-target=\"#visualizza-viaggi-riserva\" data-id=\"" + idrif + "\"><span class=\"glyphicon glyphicon-remove-circle\" aria-hidden=\"true\"></span>  Visualizza Prenotazioni</button></td></tr>";
		}
		tabella_rif += "</tbody></table>";


//modale per cancellazione
		var modale="<div class=\"modal-dialog\" id=\"modal-dialog_riserva\"><div class=\"modal-content\"><div class=\"modal-header\">Gestione Riserva auto</div>"+
			"<div class=\"modal-body\" id=\"modal-body_riserva\">"+
			"</div><div class=\"modal-footer\" id=\"modal-footer_riserva\"></div></div></div>";


		$('#confirm-delete-riserva').on('show.bs.modal', function (event) {

			var button = $(event.relatedTarget) // Button that triggered the modal
			var myid = button.data('id') // Extract info from data-* attributes
			$('#modal-body_riserva').html("Stai per cancellare la riserva dell'auto  "+myid+".Sei sicuro di voler proseguire?");
			$('#modal-footer_riserva').html("<button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Annulla</button><a class=\"btn btn-danger btn-ok\"  id=\"elimina_riserva\" href=\"php/elimina_riserva.php?id="+myid+"\" data-toggle=\"modal\" data-target=\"#modal-dialog_riserva\" >Elimina riserva auto</a>")


		});

		var modaleVisualizza="<div class=\"modal-dialog modal-lg\" id=\"modal-dialog_lista_cancellare\"><div class=\"modal-content\"><div class=\"modal-header\">Lista prenotazioni da Cancellare</div>"+
			"<div class=\"modal-body\" id=\"modal-body_lista_cancellare\">"+
			"</div><div class=\"modal-footer\" id=\"modal-footer_lista_cancellare\"></div></div></div>";


		$('#visualizza-viaggi-riserva').on('show.bs.modal', function (event) {
		
			var button = $(event.relatedTarget) // Button that triggered the modal
			var myid = button.data('id') // Extract info from data-* attributes
			$.ajax({
				type: "POST",
				url: "php/booking/lista_auto_da_cancellare.php",
				data: {'riserva':myid},
				success: function (data) {
					console.log(data);
					var lista_rif = $.parseJSON(data);
					var quanti_rif = lista_rif['dimensione'];
					var tabella_rif 
					if(quanti_rif==0){
						tabella_rif='Nessuna prenotazione per le date selezionate';
					}else{
						tabella_rif= "<table id='lista_prenotazioni_cancellare' width='100%' class='table table-striped table-bordered mytable dataTable'><thead><tr><th>Nome</th>" +
							"<th>Cognome</th><th>CF</th><th>Motivo</th><th>Giorno</th><th>Operazioni</th></tr></thead>" +
							"<tfoot><tr><th>Nome</th>" +
							"<th>Cognome</th><th>CF</th><th>Motivo</th><th>Giorno</th><th>Operazioni</th></tr></tfoot><tbody>";
						for (var i = 0; i < quanti_rif; i++) {
							var idrif = lista_rif[i]['id'];



							tabella_rif += "<tr><td>" + lista_rif[i]['nome'] + "</td><td>" + lista_rif[i]['cognome'] + "</td><td>" + lista_rif[i]['cf'] + "</td><td>" + lista_rif[i]['motivo_viaggio']  + "</td><td>" + lista_rif[i]['giorno_partenza_format'] +
								"<td>" + lista_rif[i]['operazioni'] + "</td></tr>";
								}
						tabella_rif += "</tbody></table>";
						
					}
					$('#modal-body_lista_cancellare').html(tabella_rif);
					$('#lista_prenotazioni_cancellare').DataTable();
				}
				});
			
				$('#modal-footer_lista_cancellare').html("<button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Annulla</button><a class=\"btn btn-danger btn-ok\"  id=\"aggiorna_riserva\" href=\"php/booking/lista_auto_da_cancellare_esegui.php?riserva="+myid+"\" data-toggle=\"modal\" data-target=\"#modal-dialog_lista_cancellare\" >Aggiorna Prenotazioni</a>")

		});
		
		$('#tabella_riserva_auto_table').html(tabella_rif);
		$('#tabella_riserva_auto_table').DataTable({
			responsive: true,
			buttons: [
				'copy', 'csv', 'excel', 'pdf', 'print'
			]
		});
		$('#confirm-delete-riserva').html(modale);
		$('#visualizza-viaggi-riserva').html(modaleVisualizza);

	}

});




});




//inserimento nuovo modello
$('#aprinuovoriservauto').click(function(){
//popolo la prima delle 3 sezioni con la form per inserimento modello
$('#riserva').load("riservauto.html");

});
