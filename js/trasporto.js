$(document).ready(function() {
	
	
	var now = new Date();
	$('#data_oggi').html(now.getDate()+'/'+now.getMonth()+'/'+now.getFullYear());
	$(document).on('change','#carico',function(){
		var ric_codi=$('#carico').val();
		var viaggio=$('#idViaggioUpload').val();
		$.ajax({
			type:'POST',
			url:'php/carica.php',
			data: {ric_codi : ric_codi,viaggio:viaggio},
			success: function(response){
			
				$('#results_carico_scarico').html(response);
				$('#carico').val('');
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
			
				
				
			}
		});
	});
	$(document).on('change','#scarico',function(){
		var ric_codi=$('#scarico').val();
		var viaggio=$('#idViaggioUpload').val();
		
		$.ajax({
			type:'POST',
			url:'php/scarica.php',
			data: {ric_codi : ric_codi, viaggio:viaggio},
			success: function(response){
				$('#results_carico_scarico').html(response);
				$('#scarico').val('');
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
			

			}
		});
	});



});