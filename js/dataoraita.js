	$( document ).ready(function() {
		
		var oggi = Date();
		
		$.ajax({
			url: "php/get_data.php", 
			success: function(result)
			{
        oggi = result;
				console.log(result);
			},
			error: function(jqXHR, textStatus, errorThrown)
			{
				oggi = Date();
			}
		});
		
						jQuery('#dataora').datetimepicker({
						  timepicker:false,	
						  lang:'it',
						  format:'d/m/Y',
							maxDate : oggi
						//  format:'d/m/Y'
						//  format:'d/m/Y H:i'
						});

		                jQuery('#data_iniziale').datetimepicker({
						  timepicker:false,
						  lang:'it',
						  format:'d/m/Y',
							maxDate : oggi
						});


						jQuery('#data_iniziale_rev').datetimepicker({
						  timepicker:false,
						  lang:'it',
						  format:'d/m/Y',
							maxDate : oggi
						});
						
						jQuery('#dataora_olio').datetimepicker({
						  timepicker:false, 	
						  lang:'it',
						  format:'d/m/Y'
						});
						
						jQuery('#dataora_gomme').datetimepicker({
						  timepicker:false,	
						  lang:'it',
						  format:'d/m/Y',
							maxDate : oggi
						});
					
						jQuery('#dataora_radiatore').datetimepicker({
						  timepicker:false, 	
						  lang:'it',
						  format:'d/m/Y',
							maxDate : oggi
						});
						
						jQuery('#dataora_batteria').datetimepicker({
						  timepicker:false, 	
						  lang:'it',
						  format:'d/m/Y',
							maxDate : oggi
						});
						
						jQuery('#giorno_inizio_rca').datetimepicker({
						  timepicker:false,
						  lang:'it',
						  format:'d/m/Y',
							maxDate : oggi

						});
						
						
						jQuery('#giorno_tagliando').datetimepicker({
						  timepicker:false,
						  lang:'it',
						  format:'d/m/Y',
							maxDate : oggi
						});


						jQuery('#dataora_man_da').datetimepicker({
							timepicker:false,
							lang:'it',
							format:'d/m/Y'
						//	format:'d/m/Y H:i'

						});
						jQuery('#dataora_man_a').datetimepicker({
							timepicker:false,
							lang:'it',
							format:'d/m/Y'//,
						//	maxDate : oggi
						//	format:'d/m/Y H:i',
						});

						jQuery('#giorno_bollo').datetimepicker({
							timepicker:false,
							lang:'it',
							format:'d/m/Y',
							maxDate : oggi

						});
						jQuery('#giorno_chilometraggio').datetimepicker({
							timepicker:false,
							lang:'it',
							format:'d/m/Y',
							maxDate : oggi

						});

						jQuery('#data_report_da').datetimepicker({
							timepicker:false,
							lang:'it',
							format:'d/m/Y'

						});
						
						jQuery('#data_report_a').datetimepicker({
							timepicker:false,
							lang:'it',
							format:'d/m/Y',
							maxDate : oggi

						});	

						jQuery('#giorno_dismissione').datetimepicker({
							timepicker:false,
							lang:'it',
							format:'d/m/Y',
							maxDate : oggi

						});						

	});
		