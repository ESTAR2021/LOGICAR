/**
 * Created by Sara
 on 05/09/2016.
 */

//modale per avanzamento step

$(document).ready(function() {
	$('#qrcode').qrcode('viaggi.html');		//va aggiunta una transazione per effettuare il login e ritornare su questa pagina
	$.ajax({
		type:'GET',
		url:'../php/booking/get_viaggio.php',
		success: function(data) {

			if(data!=0){
				$('#id_viaggio').val(data);
						
				var viaggio=data;
				$.ajax({
					type: "POST",
					url: "../php/lista_etichette.php",
					data: {viaggio: viaggio},
					success: function(data) {
						var lista = $.parseJSON(data);
						var quanti=lista['dimensione'];

						if(quanti>0){
							var tabellasch="<thead><tr><th>Cod Richiesta</th></thead>"+
								"<tbody>";
						} else {
							var tabellasch='Nessuna richiesta Caricata';

						}
						for(var i=0;i < quanti;i++){

							tabellasch+="<tr><td>"+lista[i]['etichetta']+"</td></tr>";

						}
						tabellasch+="</tbody></table>";
						$('#tab_elenco_etichette').html(tabellasch);
						$('.loader').fadeOut();


					}

				});
			}else{
				$('#nessun_viaggio').fadeIn();
				$('#dettagli').fadeOut();
				$('.loader').fadeOut();
			}
		}
	});
	$(document).on('click', '#end_viaggio', function(){
		$('#end_viaggio').hide();
		$('#km_insert').show();
	});

	$(document).on('click', '#conferma_km', function(){
		var id_viaggio=$('#id_viaggio').val();
		var chilometraggio=$('#chilometraggio').val();
		var stato='4';
		console.log(id_viaggio);
		$.ajax({
			type:'POST',
			url:'../php/booking/end_viaggio.php',
			data:{identificativo: id_viaggio, stato:stato, chilometraggio:chilometraggio},
			success: function(data) {
				location.href='inizia_viaggio.html';

			}
		});
	});


	$(document).on('change','#chilometraggio',function(){
		var re = /[0-9]{1,6}/;	//verifica della stringa inserita per il chilometraggio
		if(re.test($('#chilometraggio').val())){
			$('#conferma_km').prop('disabled',false);
		}
		else
			$('#conferma_km').prop('disabled',true);
	});

	$(document).on('change','#carico',function(){
		var ric_codi=$('#carico').val();
		var viaggio=$('#id_viaggio').val();
		$.ajax({
			type:'POST',
			url:'../php/carica.php',
			data: {ric_codi : ric_codi,viaggio:viaggio},
			success: function(response){

				$('#results_carico_scarico').html(response);
				$('#carico').val('');
				$.ajax({
					type: "POST",
					url: "../php/lista_etichette.php",
					data: {viaggio: viaggio},
					success: function(data) {
						var lista = $.parseJSON(data);
						var quanti=lista['dimensione'];
						if(quanti>0){
							var tabellasch="<thead><tr><th>Cod Richiesta</th></thead>"+
								"<tbody>";
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



			}
		});
	});


	$(document).on('change','#scarico',function(){
		var ric_codi=$('#scarico').val();
		var viaggio=$('#id_viaggio').val();

		$.ajax({
			type:'POST',
			url:'../php/scarica.php',
			data: {ric_codi : ric_codi, viaggio:viaggio},
			success: function(response){
				$('#results_carico_scarico').html(response);
				$('#scarico').val('');
				$.ajax({
					type: "POST",
					url: "../php/lista_etichette.php",
					data: {viaggio: viaggio},
					success: function(data) {
						var lista = $.parseJSON(data);
						var quanti=lista['dimensione'];
						if(quanti>0){
							var tabellasch="<thead><tr><th>Cod Richiesta</th></thead>"+
								"<tbody>";
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


			}
		});
	});



});


