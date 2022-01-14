$(document).ready(function() {



	$.ajax({
		type: "GET",
		url: "php/lista_auto_modelli.php",
		success: function(data) {
			var lista_mod = $.parseJSON(data);
			var quanti_mod=lista_mod['dimensione'];
			var tabella_mod="<thead><tr><th>Marca</th><th>Modello</th>"+
				"<th>Cilindrata</th><th>Alimentazione</th><th>Potenza</th><th>Operazioni</th></tr></thead>"+
				"<tfoot><tr><th>Marca</th><th>Modello</th>"+
				"<th>Cilindrata</th><th>Alimentazione</th><th>Potenza</th><th>Operazioni</th></tr></tfoot><tbody>";
			for(var i=0;i < quanti_mod;i++){
				var idauto_mod=lista_mod[i]['idauto'];

//verifico se il modello è presente negli autoparchi, e se sì disattivo i pulsanti di modifica e cancellazione
				var inautoparco=lista_mod[i]['quanti'];
				tabella_mod+="<tr><td>"+lista_mod[i]['marca']+"</td><td>"+lista_mod[i]['modello']+"</td><td>"+lista_mod[i]['cilindrata']+"</td><td>"+lista_mod[i]['alimentazione']+"</td><td>"+lista_mod[i]['potenza']+"</td><td>";
				//+lista_mod[i]['anno']+"</td><td>";

				if(inautoparco<1){
					tabella_mod+="<button type=\"button\" id=\"modifica1\" class=\"btn btn-success\" data-toggle=\"modal\" data-target=\"#confirm-modifica_mod\"  data-id=\""+lista_mod[i]['idauto']+"\" data-modello=\""+lista_mod[i]['modello']+"\" data-marca=\""+lista_mod[i]['marca']+"\" data-cilindrata=\""+lista_mod[i]['cilindrata']+"\" data-potenza=\""+lista_mod[i]['potenza']+"\" data-alimentazione=\""+lista_mod[i]['alimentazione']+"\" data-note=\""+lista_mod[i]['note']+"\"><span class=\"glyphicon glyphicon-wrench\" aria-hidden=\"true\"></span>  Modifica</button>";
					tabella_mod+="  <button type=\"button\" id=\"cancella1\" class=\"btn btn-danger\"  data-toggle=\"modal\" data-target=\"#confirm-delete_mod\" data-id=\""+lista_mod[i]['idauto']+"\" data-modello=\""+lista_mod[i]['modello']+"\" data-marca=\""+lista_mod[i]['marca']+"\"><span class=\"glyphicon glyphicon-remove-circle\" aria-hidden=\"true\"></span>  Cancella</button>";
				} else{
					tabella_mod+="<img src=\"img/in_autoparco.png\" title=\"auto già presente in un autoparco aziendale\">";
				}
				tabella_mod+="</td></tr>";
			}
			tabella_mod+="</tbody></table>";

//modale per cancellazione
			var modale="<div class=\"modal-dialog\" id=\"modal-dialog_mod\"><div class=\"modal-content\"><div class=\"modal-header\">Gestione auto</div>"+
				"<div class=\"modal-body\" id=\"modal-body_mod\">"+
				"</div><div class=\"modal-footer\" id=\"modal-footer_mod\"></div></div></div>";

			$('#confirm-delete_mod').on('show.bs.modal', function (event) {
				var button = $(event.relatedTarget) // Button that triggered the modal
				var myidauto = button.data('id') // Extract info from data-* attributes
				var mymarca = button.data('marca')
				var mymodello = button.data('modello')
				$('#modal-body_mod').html("Stai per cancellare l'auto "+mymarca+" "+mymodello+". Questa operazione comporter&agrave; l'eliminazione di ogni vettura aziendale eventualmente associata al modello. Sei sicuro di voler proseguire?");
				$('#modal-footer_mod').html("<button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Annulla</button>"+
					"<a class=\"btn btn-danger btn-ok\"  id=\"elimina_auto_mod\" href=\"php/elimina_auto.php?id="+myidauto+"\" data-toggle=\"modal\" data-target=\"#modal-dialog_mod\" >Elimina auto</a>")
			})

//modale modifica
			var modalemod="<div class=\"modal-dialog modal-lg\" id=\"modal-dialogmodifica\"><div class=\"modal-content\" ><div class=\"modal-header\">Gestione auto</div>"+
				"<div class=\"modal-body\" id=\"modal-bodymodifica\" background=\"img/asphalt.jpg\">"+
				"</div><div class=\"modal-footer\" id=\"modal-footerins\"></div></div></div>";


			$('#confirm-modifica_mod').on('show.bs.modal', function (event) {
				var button = $(event.relatedTarget); // Button that triggered the modal
				var myidauto = button.data('id'); // Extract info from data-* attributes
				var mymarca = button.data('marca');
				var mymodello = button.data('modello');
				var mycilindrata = button.data('cilindrata');
				var mypotenza = button.data('potenza');
				var myalimentazione = button.data('alimentazione');
				var mynote = button.data('note');
				$.get("auto_edit.html",function(data){
					$('#modal-bodymodifica').html(data);
					$('#marcamod').val(mymarca);
					$('#modellomod').val(mymodello);
					$('#idauto').val(myidauto);
					$('#cilindrata').val(mycilindrata);
					$('#potenza').val(mypotenza);
					$('#alimentazione').val(myalimentazione);
					$('#note').val(mynote);
				});
			})
			$('#confirm-delete_mod').html(modale);
			$('#confirm-modifica_mod').html(modalemod);
			//popola la tabella con le auto già inserite nell'autoparco
			$('#tabella_macchina1').html(tabella_mod);
			$('#tabella_macchina1').DataTable(
				{//todo da capire come funziona
					"columnDefs": [
						{ "orderData": [ 1, 2 ],    "targets": 1 },
						{ "orderData": [ 0, 5 ],    "targets": 0 }]
				}
			);
		}
	});
});

//inserimento nuovo modello
$('#aprinuovomodello').click(function(){
//popolo la prima delle 3 sezioni con la form per inserimento modello
	$('#primaparte').load("auto2.html");
});
