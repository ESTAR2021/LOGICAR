// popolo subito la select con le marche..
$(document).ready(function() {


//cerco i dati dell'auto in sessione	
	$.ajax({
	type: "POST",
	url: "php/get_auto_session.php",
	success: function(data){
	var lista = $.parseJSON(data);
	var id_auto = lista['id_auto'];
    var dati_auto = lista['dati_auto'];

	//stampo i dati auto sulla pagina
   $("#datimacchina").html(dati_auto);
	},
		 error: function(xhr, desc, err) {

 }

	});



//popolo il menu via include sul div principale
$("#menu").load("menu.html");
	/*
//popolo la prima delle 5 sezioni
$("#primaparte").load("tabella_rifornimento.html");

//popolo la seconda delle 5 sezioni

$("#secondaparte").load("tabella_olio.html");

//popolo la terza delle 5 sezioni
$("#terzaparte").load("tabella_gomme.html");

//popolo la quarta delle 5 sezioni
$("#quartaparte").load("tabella_radiatore.html");


//popolo la quinta delle 5 sezioni
$("#quintaparte").load("tabella_batteria.html");*/

});