
	//modale per avanzamento step
var modalstep="<div class=\"modal-dialog\" id=\"modal-dialog_step\"  {width:55%;}><div class=\"modal-content\"><div class=\"modal-header\"><img src=\"../img/logo.png\"><h1><img src=\"../img/booking/lettering_2_bis.png\"  width=\"50% height=50%\"></h1></div>"+
            "<div class=\"modal-body\" id=\"modal-body\" align=\"center\"><img src=\"../img/booking/prenota_blue.png\"  width=\"15%\" ><i class=\"fa fa-arrow-circle-o-right fa-5x margini_frecce_blue\" style='vertical-align: middle;'></i><img src=\"../img/booking/informazioni_blue.png\"  width=\"15%\" ><i class=\"fa fa-arrow-circle-o-right fa-5x margini_frecce\" style='vertical-align: middle;'></i> <img src=\"../img/booking/macchina_grey.png\"  width=\"15%\"><i class=\"fa fa-arrow-circle-o-right fa-5x margini_frecce\" style='vertical-align: middle;'></i></h1> <img src=\"../img/booking/conferma_grey.png\"  width=\"15%\">"+
            "</div><div class=\"modal-footer\" id=\"modal-footer\"><img src=\"../img/booking/logo_estar.png\"></div></div></div>";
			
function displayRoute(origin, destination, indirizzi, service, display) {
	var waypts = [];
	// console.log(indirizzi);
        for (var x = 1; x < indirizzi.length; x++) {
			if(indirizzi[x]!=''){
				 waypts.push({
					location: indirizzi[x],
					stopover: true
            });
			
			}
          
          }
	// console.log(waypts);
	service.route({
    origin: origin,
    destination: destination,
	waypoints: waypts,
    avoidTolls: true,
    avoidHighways: false,
	provideRouteAlternatives: true,
    travelMode: google.maps.TravelMode.DRIVING
  }, function(response, status) {
    if (status === 'OK') {
      display.setDirections(response);
    } else {
   //   alert('Could not display directions due to: ' + status);
    }
  });
}
			
function mappa(indirizzi, indirizzi_r, comuni, comuni_r){

	var myLatLngArrivo ='';
	var indirizzo_completo='toscana italia';
	$.ajax({
	type: "GET",
	url: "../php/booking/getArrivo.php",
    success: function(data) {
		var latlngdest;
		var map;
		var result = $.parseJSON(data);
		var directionsService;
		var directionsDisplay;
		var quanti=result['dimensione'];
		var comune=result[0]['comune_destinazione'];
		var indirizzo=result[0]['indirizzo_destinazione'];
		var indirizzo_partenza = $('#sedi :selected').html();
	
		indirizzo_completo=comune+' '+indirizzo+' , Italia';
		$("#mapcanvas").html();
		var $content = $("#mapcanvas");
		$content.height (300);
		$.getJSON('https://maps.googleapis.com/maps/api/geocode/json?address='+indirizzo_completo+'&sensor=false', null, function (data) {
		
		if(data.results[0]!=null){
			
		var p = data.results[0].geometry.location
		var latlng = new google.maps.LatLng(p.lat, p.lng);
		latlngdest=latlng;
		var options = { 
			zoom: 8,
			center: latlng,
			mapTypeControl: false,
			navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
			mapTypeId: google.maps.MapTypeId.ROADMAP
			};
		map = new google.maps.Map ($content[0], options);
		directionsService = new google.maps.DirectionsService;
		directionsDisplay = new google.maps.DirectionsRenderer({
          draggable: true,
          map: map,
		  suppressMarkers : true,
          panel: document.getElementById('percorso_andata')
        });
			
		google.maps.event.trigger(map, 'resize');
		
		var image = '../img/booking/pointer_arrivo.png';
		new google.maps.Marker({
			position: latlng,
			map: map,
			title: 'Destinazione',
			icon: image
		});
		var infowindow = new google.maps.InfoWindow({
			content: 'Destinazione'
		});

		 $.getJSON('https://maps.googleapis.com/maps/api/geocode/json?address='+indirizzo_partenza+'&sensor=false', null, function (data) {
			
	//TODO nel caso in cui results è vuoto cercare solo la città
			var p = data.results[0].geometry.location
            var latlng = new google.maps.LatLng(p.lat, p.lng);
			
		
           new google.maps.Marker({
                position: latlng,
                map: map,
				title: 'Partenza',
				icon: '../img/booking/pointer_partenza.png'
            });
			google.maps.event.trigger(map, 'resize');
        });
			
		
		for (var x = 1; x < indirizzi.length; x++) {
		var id='error_indirizzo-'+x;
        $.getJSON('https://maps.googleapis.com/maps/api/geocode/json?address='+indirizzi[x]+'&sensor=false', null, function (data) {
			var p;
			var latlng;
			if (data.status == "OK"){
				p = data.results[0].geometry.location;
				trovato=true;
				latlng = new google.maps.LatLng(p.lat, p.lng);
				   new google.maps.Marker({
						position: latlng,
						map: map
					});
					google.maps.event.trigger(map, 'resize'); 
					document.getElementById(id).style.display = 'none'; 
			  }else{
				  document.getElementById(id).style.display = 'block'; 
			  }
		});
	
    }
	
	
		for (var x = 1; x < indirizzi_r.length; x++) {
		var idR='error_indirizzo_r-'+x;
			//indPartenza=indirizzi_r[x];
        $.getJSON('https://maps.googleapis.com/maps/api/geocode/json?address='+indirizzi_r[x]+'&sensor=false', null, function (data) {
	
			if (data.status == "OK"){
				var p = data.results[0].geometry.location
				var latlng = new google.maps.LatLng(p.lat, p.lng);
				
			
			   new google.maps.Marker({
					position: latlng,
					map: map
				});
				google.maps.event.trigger(map, 'resize');
				document.getElementById(idR).style.display = 'none'; 
			}else{
				document.getElementById(idR).style.display = 'block'; 
			  }
        });
    }

	
		displayRoute(indirizzo_partenza,indirizzo_completo,indirizzi,directionsService,directionsDisplay);
	var directionsServiceRitorno = new google.maps.DirectionsService;
    var directionsDisplayRitorno = new google.maps.DirectionsRenderer({
          draggable: true,
          map: map,		  
		  suppressMarkers : true,
          panel: document.getElementById('percorso_ritorno')
        });
		displayRoute(indirizzo_completo,indirizzo_partenza,indirizzi_r,directionsServiceRitorno,directionsDisplayRitorno);
		}else{
			indirizzo_completo=comune+' , Italia';
			$.getJSON('https://maps.googleapis.com/maps/api/geocode/json?address='+indirizzo_completo+'&sensor=false', null, function (data) {
			var p = data.results[0].geometry.location
			var latlng = new google.maps.LatLng(p.lat, p.lng);
			latlngdest=latlng;
			var options = { 
				zoom: 8,
				center: latlng,
				mapTypeControl: false,
				navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
				mapTypeId: google.maps.MapTypeId.ROADMAP
				};
			map = new google.maps.Map ($content[0], options);
			directionsService = new google.maps.DirectionsService;
			directionsDisplay = new google.maps.DirectionsRenderer({
			  draggable: true,
			  map: map,
			  suppressMarkers : true,
			  panel: document.getElementById('percorso_andata')
			});
			
			google.maps.event.trigger(map, 'resize');
			
			var image = '../img/booking/pointer_arrivo.png';
			new google.maps.Marker({
				position: latlng,
				map: map,
				title: 'Destinazione',
				icon: image
			});
			var infowindow = new google.maps.InfoWindow({
				content: 'Destinazione'
			});

			 $.getJSON('https://maps.googleapis.com/maps/api/geocode/json?address='+indirizzo_partenza+'&sensor=false', null, function (data) {
				
		//TODO nel caso in cui results è vuoto cercare solo la città
				var p = data.results[0].geometry.location
				var latlng = new google.maps.LatLng(p.lat, p.lng);
				
			
			   new google.maps.Marker({
					position: latlng,
					map: map,
					title: 'Partenza',
					icon: '../img/booking/pointer_partenza.png'
				});
				google.maps.event.trigger(map, 'resize');
			});
				
		
		for (var x = 1; x < indirizzi.length; x++) {
			var id='error_indirizzo-'+x;
			$.getJSON('https://maps.googleapis.com/maps/api/geocode/json?address='+indirizzi[x]+'&sensor=false', null, function (data) {
				var p;
				var latlng;
				if (data.status == "OK"){
					p = data.results[0].geometry.location;
					trovato=true;
					latlng = new google.maps.LatLng(p.lat, p.lng);
					   new google.maps.Marker({
							position: latlng,
							map: map
						});
						google.maps.event.trigger(map, 'resize'); 
						document.getElementById(id).style.display = 'none'; 
				  }else{
					  document.getElementById(id).style.display = 'block'; 
				  }
			});
	
			}
	
	
			for (var x = 1; x < indirizzi_r.length; x++) {
			var idR='error_indirizzo_r-'+x;
				//indPartenza=indirizzi_r[x];
			$.getJSON('https://maps.googleapis.com/maps/api/geocode/json?address='+indirizzi_r[x]+'&sensor=false', null, function (data) {
		
				if (data.status == "OK"){
					var p = data.results[0].geometry.location
					var latlng = new google.maps.LatLng(p.lat, p.lng);
					
				
				   new google.maps.Marker({
						position: latlng,
						map: map
					});
					google.maps.event.trigger(map, 'resize');
					document.getElementById(idR).style.display = 'none'; 
				}else{
					document.getElementById(idR).style.display = 'block'; 
				  }
			});
		}

		
			displayRoute(indirizzo_partenza,indirizzo_completo,indirizzi,directionsService,directionsDisplay);
		var directionsServiceRitorno = new google.maps.DirectionsService;
		var directionsDisplayRitorno = new google.maps.DirectionsRenderer({
			  draggable: true,
			  map: map,		  
			  suppressMarkers : true,
			  panel: document.getElementById('percorso_ritorno')
			});
			displayRoute(indirizzo_completo,indirizzo_partenza,indirizzi_r,directionsServiceRitorno,directionsDisplayRitorno);
		});	}
		});
		}

		});
	
}		
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
	
		//comune e via 
		
		var indirizzi=[];	
		var indirizzi_r=[];	
		var comuni=[];	
		var comuni_r=[];	
	
		$(document).on('focusout','.check', function(){
			var div=$(this).parent('.input-group');
			var via=div.find('.via').val();
			var comune=div.find('.comune').val();
			if(comune!=""){
			$.ajax({
					type:'POST',
					url:'../php/booking/controllacomune.php',
					data:{comune:comune},
					success: function(data) {
					var numerocomuni = $.parseJSON(data);
					var quanti_comuni=numerocomuni['dimensione'];
					
					if(quanti_comuni==0){
						div.find(".error_comune").html("<font style=\"color:red; font-size:100%;\">Attenzione. Il comune inserito non esiste. Scegliere una voce dal men&uacute; a discesa</font>");
						
					}else{div.find(".error_comune").html('');
						if(via!=""){
							var id=div.find('.comune').attr('id');
							var parole=id.split("-");
							var num=parole[1];
							indirizzi[num]=comune+' '+via+' , Italia';
							comuni[num]=comune+' centro,  Italia';
							mappa(indirizzi, indirizzi_r, comuni, comuni_r);
						}
					
					
					}
				}
			});
		}
		
		});	
		
			$(document).on('focusout','.check_r', function(){
			var div=$(this).parent('.input-group');
			var via=div.find('.via_r').val();
			var comune=div.find('.comune_r').val();
			
			if(comune!=""){
			$.ajax({
					type:'POST',
					url:'../php/booking/controllacomune.php',
					data:{comune:comune},
					success: function(data) {
					var numerocomuni = $.parseJSON(data);
					var quanti_comuni=numerocomuni['dimensione'];
					
					if(quanti_comuni==0){
						div.find(".error_comune").html("<font style=\"color:red; font-size:100%;\">Attenzione. Il comune inserito non esiste. Scegliere una voce dal men&uacute; a discesa</font>");
						
					}else{div.find(".error_comune").html('');
						if(via!=""){
							var id=div.find('.comune_r').attr('id');
							var parole=id.split("-");
							var num=parole[1];
							indirizzi_r[num]=comune+' '+via+' Italia';
							comuni_r[num]=comune+' centro, Italia';
							mappa(indirizzi, indirizzi_r,  comuni, comuni_r);
						}
					
					
					}
				}
			});
		}
		
		});	
	
		$(document).on('click', "#addFermata", function() {
				var count=$('.comune').size();
				count=count+1;
				var altre_fermate=$('#altre_fermate');
				$('<div class="input-group"><input type="text"  class="form-control comune check" id="comune-'+count+'" placeholder="Comune" name="comune[]"><div class="error_comune"></div><input type="text"  class="form-control via check"  id="via-'+count+'" placeholder="Via" name="via[]">	<div id="error_indirizzo-'+count+'"  hidden><font style="color:red; font-size:100%;">				Attenzione. L\'indirizzo inserito non &egrave; stato trovato. </font></div><span class="input-group-addon removeFermata"><span class="glyphicon glyphicon-minus" aria-hidden="true"></span></span></div><br>').appendTo(altre_fermate);
	    
	    });
	
	
		$(document).on('change', "#sedi", function() {
			mappa(indirizzi,indirizzi_r, comuni, comuni_r);
	    
	    });
		$(document).on('click', ".removeFermata", function() {
			var div=$(this).parent('.input-group');
			var id=div.find('.comune').attr('id');
			$(this).parent('.input-group').remove();
			
			var parole=id.split("-");
			var num=parole[1];
			indirizzi[num]='';
			mappa(indirizzi,indirizzi_r, comuni, comuni_r);
	    
	    });
		$(document).on('click', "#addFermata_r", function() {
				var count=$('.comune_r').size();
				count=count+1;
				var altre_fermate=$('#altre_fermate_r');
				$('<div class="input-group"><input type="text"  class="form-control comune_r check_r" id="comune_r-'+count+'" placeholder="Comune" name="comune[]"><div class="error_comune"></div><input type="text"  class="form-control via_r check_r"  id="via-'+count+'" placeholder="Via" name="via[]">	<div id="error_indirizzo_r-'+count+'"  hidden><font style="color:red; font-size:100%;"> Attenzione. L\'indirizzo inserito non &egrave; stato trovato. </font></div><span class="input-group-addon removeFermata_r"><span class="glyphicon glyphicon-minus" aria-hidden="true"></span></span></div><br>').appendTo(altre_fermate);
	    
	    });
	
		$(document).on('click', ".removeFermata_r", function() {
			
			$(this).parent('.input-group').remove();
	    
	    });
	//attivo la modale al document ready per visualizzare lo step
	$("#modalstep").html(modalstep);
    $("#modalstep").modal('show');

	$("#modalstep").on('click',function(){
		$("#modalstep").hide();
		$('.modal-backdrop').hide();
		$('body').removeClass('modal-open');
	});

	$.ajax({
			type: "GET",
			url: "../php/booking/lista_sedi.php",
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
		
			mappa(indirizzi, indirizzi_r, comuni, comuni_r);
			
			
			$(document).on('click', "#vaistep3", function (event) {
				event.preventDefault();
				var sedescelta = $('#sedi').val();
				var indirizzo_partenza = $('#sedi :selected').html();
				if (sedescelta == '') {
					$('#error_sede').fadeIn();
				}
				else
				{
					$('#error_sede').fadeOut();
				}
				var passeggeri = $('#rating').val();
				console.log("numero passeggeri: " + passeggeri);
				if (passeggeri == 0) {
					console.log("ERRORE passeggeri");
					$('#error_passeggeri').fadeIn();
				}
				else
				{
					$('#error_passeggeri').fadeOut();
				}
				var motivo = $('#motivo').val();
				if (motivo == '') {
					console.log("ERRORE motivo");
					$('#error_motivo').fadeIn();
				}
				else
				{
					$('#error_motivo').fadeOut();
				}
				if (sedescelta != '' && passeggeri != 0 && motivo != '') {
					$.ajax({
						type: "POST",
						url: "../php/booking/setpartenza.php",
						data: {
							sedescelta: sedescelta,
							passeggeri: passeggeri,
							motivo: motivo,
							indirizzo_partenza: indirizzo_partenza
						},
						success: function (data) {
							var arrayAndata = JSON.stringify(indirizzi);
							var arrayRitorno = JSON.stringify(indirizzi_r);
							if (data == 1) {
								//TODO Tappe Intermedie
								$.ajax({
									type: "POST",
									url: "../php/booking/tappeintermedie.php",
									data: {
										andata: arrayAndata,
										ritorno: arrayRitorno
									},
									success: function (data) {
										if (data == 1) {
											location.href = 'step3.html';
										}
									}
								});
							}
						}
					});
				}
			});
		
		  $( ".comune" ).autocomplete({
			  source: '../php/lista_comuni.php'
			});
});
	

	