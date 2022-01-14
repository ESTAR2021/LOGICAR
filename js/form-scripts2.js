// popolo subito la select con le marche..
$(document).ready(function() {
	$.ajax({
	type: "POST",
	url: "php/get_marca.php",
	success: function(data){
		$("#marca").html(data);
	}
	});
/*
//setto il campo anno all'anno corrente
    var d = new Date();
    var n = d.getFullYear();
    document.getElementById("anno").value = n;
*/	
//popolo il menu via include sul div della pagina chiamante
//$("#menu").load("menu.html"); 

});


//funzione per popolare dinamicamente la select dei modelli
function getModello(val) {
	$.ajax({
	type: "POST",
	url: "php/get_modello.php",
	data:'marca_id='+val,
	success: function(data){
		$("#modello").html(data);
	}
	});
}


//qui genero la tabella con le marche
$("#visualmarca").click(function(){



	$.ajax({
    type:'GET',
    url:'php/lista_marca.php',
    success: function(data){
	var lista = $.parseJSON(data);
	var quanti=lista['dimensione'];
	
			var modaltabella="<div class=\"modal-dialog\" id=\"modal-dialogmarca\"><div class=\"modal-content\"><div class=\"modal-header\"><button type=\"button\" class=\"close\" data-dismiss=\"modal\"></button>"+
      "<h4 class=\"modal-title\"><img src=\"img/wheel.png\" /> Elenco marche</h4></div><div class=\"modal-body\">"+
	  "<table id=\"tabella_macchina\" class=\"table table-striped table-bordered\" cellspacing=\"0\" width=\"100%\">"+
	  "<thead><tr><th>Marca</th>"+
      "<th>Operazioni</th></tr></thead>"+
      "<tfoot><tr><th>Marca</th><th>Operazioni</th></tr></tfoot><tbody>";
	  for(var i=0;i < quanti;i++){
	 var idmarca=lista[i]['idmarca'];
	 modaltabella+="<tr><td>"+lista[i]['marca']+"</td>"+
	  "<td><button type=\"button\" class=\"btn btn-danger\"  onclick=\"cancellamarca("+idmarca+");\"><span class=\"glyphicon glyphicon-remove-circle\" aria-hidden=\"true\"></span>  Cancella</button></td></tr>";
      "</div><div class=\"modal-footer\"><button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Chiudi finestra</button></div>"
	  }
	 modaltabella+="</tbody></table>";
	 
	$('#myModalview').html(modaltabella);
	
	
	}
});
});


//cancellazione marca
//prima lancio una confirm
			function cancellamarca(idmarca){
		    if(confirm('sicuro di voler cancellare la marca?')){
//quindi faccio la chiamata ajax per eliminare la marca
$.ajax({
	type: "POST",
	url: "php/elimina_marca.php",
	data:'id='+idmarca,
	success: function(data2){
		$("#modal-dialogmarca").html(data2);
	}
	
			});
		}
	};






//popolo la finestra modale per l'aggiunta di una nuova marca
$("#nuovamarca").click(function(){
var modalmarca="<div class=\"modal-dialog\"><div class=\"modal-content\"><div class=\"modal-header\"><button type=\"button\" class=\"close\" data-dismiss=\"modal\"></button>"+
      "<h4 class=\"modal-title\"><img src=\"img/wheel.png\" /> Nuova marca</h4></div><div class=\"modal-body\">"+
	  "<form class=\"form-horizontal\" role=\"form\" id=\"registramarca\"><div class=\"form-group\"><label  class=\"col-sm-2 control-label\" for=\"miamarca\">Marca</label>"+
      "<div class=\"col-sm-10\"><input type=\"text\" class=\"form-control\"  id=\"miamarca\" name=\"miamarca\" style='text-transform:uppercase' />"+
      "</div></div><div class=\"form-group\"><div class=\"col-sm-offset-2 col-sm-10\"><button type=\"submit\" class=\"btn btn-default\">Registra</button>"+
      "</div></div></form>"+
      "</div><div class=\"modal-footer\"><button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Chiudi finestra</button></div>"
$('#myModalview').html(modalmarca);




//qui faccio la chiamata ajax per registrare la nuova marca
$("#registramarca").on("submit", function (){
var miamarca=$("#miamarca").val();
$.ajax({
    type:'POST',
    url:'php/nuova_marca.php',
    data:'marca='+miamarca,
    success: function(response){
	
	}
});
});
});





//qui genero la tabella con i modelli
$("#visualmodello").click(function(){

	$.ajax({
    type:'GET',
    url:'php/lista_modello.php',
    success: function(data){
	var lista = $.parseJSON(data);
	var quanti=lista['dimensione'];
	
			var modaltabella="<div class=\"modal-dialog\" id=\"modal-dialogmodello\"><div class=\"modal-content\"><div class=\"modal-header\"><button type=\"button\" class=\"close\" data-dismiss=\"modal\"></button>"+
      "<h4 class=\"modal-title\"><img src=\"img/wheel.png\" /> Elenco modelli</h4></div><div class=\"modal-body\">"+
	  "<table id=\"tabella_macchina\" class=\"table table-striped table-bordered\" cellspacing=\"0\" width=\"100%\">"+
	  "<thead><tr><th>Marca</th><th>Modello</th>"+
      "<th>Operazioni</th></tr></thead>"+
      "<tfoot><tr><th>Marca</th><th>Modello</th><th>Operazioni</th></tr></tfoot><tbody>";
	  for(var i=0;i < quanti;i++){
	 var idmodello=lista[i]['idmodello'];
	 modaltabella+="<tr><td>"+lista[i]['marca']+"</td><td>"+lista[i]['modello']+"</td>"+
	  "<td><a class=\"btn btn-danger btn-ok\"  id=\"elimina_modello\" onclick=\"cancellamodello("+idmodello+");\">Cancella</a></td></tr>";
      "</div><div class=\"modal-footer\"><button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Chiudi finestra</button></div>"
	  }
	 modaltabella+="</tbody></table>";
	 
	$('#myModalview').html(modaltabella);
	
	}
});
});

//cancellazione modello
//prima lancio una confirm
			function cancellamodello(idmodello){
		    if(confirm('sicuro di voler cancellare il modello?')){
//quindi faccio la chiamata ajax per eliminare il modello
$.ajax({
	type: "POST",
	url: "php/elimina_modello.php",
	data:'id='+idmodello,
	success: function(data2){
		$("#modal-dialogmodello").html(data2);
	}
	
			});
		}
	};





//popolo la finestra modale per l'aggiunta di un nuovo modello
$("#nuovomodello").click(function(){
//popolo la select con le marche
		$.ajax({
	type: "POST",
	url: "php/get_marca.php",
	success: function(data){
		$("#sceglimarca").html(data);
	}
	});
var modalmodello="<div class=\"modal-dialog\"><div class=\"modal-content\"><div class=\"modal-header\"><button type=\"button\" class=\"close\" data-dismiss=\"modal\"></button>"+
      "<h4 class=\"modal-title\"><img src=\"img/wheel.png\" /> Nuovo modello</h4></div><div class=\"modal-body\">"+
	  "<form class=\"form-horizontal\" role=\"form\" id=\"registramodello\"><div class=\"form-group\"><label  class=\"col-sm-2 control-label\" for=\"miamarca\">Marca</label>"+
	  "<div class=\"col-sm-10\"><select class=\"form-control\" id=\"sceglimarca\" name=\"sceglimarca\" required></select></div>"+
      "<p></p><label  class=\"col-sm-2 control-label\" for=\"modello\">Modello</label><div class=\"col-sm-10\"><input type=\"text\" class=\"form-control\"  id=\"miomodello\" name=\"miomodello\"  style='text-transform:uppercase' />"+
      "</div></div><div class=\"form-group\"><div class=\"col-sm-offset-2 col-sm-10\"><button type=\"submit\" class=\"btn btn-default\">Registra</button>"+
      "</div></div></form>"+
      "</div><div class=\"modal-footer\"><button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Chiudi finestra</button></div>"
$('#myModalview').html(modalmodello);




//qui faccio la chiamata ajax per registrare il nuovo modello
$("#registramodello").on("submit", function (){
var miamarca=$("#sceglimarca").val();
var miomodello=$("#miomodello").val();
$.ajax({
    type:'POST',
    url:'php/nuovo_modello.php',
    data:'marca='+miamarca+'&modello='+miomodello,
    success: function(response){

	}
});

});
});




//funzione per registrare una nuova auto
$("#automobile").validator().on("submit", function (event) {
    if (event.isDefaultPrevented()) {
        //i campi non sono a posto: stampa messaggio errore
		//nascondo subito la modale
		$('#myModalreg').html('');
        formError();
        submitMSG(false, "Non hai compilato i campi richiesti");
    } else {
        //i campi sono a posto
        event.preventDefault();
        submitForm();
    }
});




function submitForm(){

var marca=$("#marca").val();
var modello=$("#modello").val();
var cilindrata=$("#cilindrata").val();
var potenza=$("#potenza").val();
var alimentazione=$("#alimentazione").val();
var note=$("#note").val();


$.ajax({
    type:'POST',
    url:'php/nuova_auto.php',
    data:'marca='+marca+'&modello='+modello+'&cilindrata='+cilindrata+'&potenza='+potenza+'&alimentazione='+alimentazione+'&note='+note,
    success: function(response){
		 
var successo="<div class=\"modal-dialog\"><div class=\"modal-content\"><div class=\"modal-header\"><button type=\"button\" class=\"close\" data-dismiss=\"modal\"></button>"+
      "<h4 class=\"modal-title\"><img src=\"img/wheel.png\" /> Nuova auto</h4></div><div class=\"modal-body\">"+
      "<img src=\"img/burningwheel.png\" /> Auto correttamente registrata</div>"+
      "<div class=\"modal-footer\"><button type=\"button\" class=\"btn btn-default\" id=\"chiudifinestra\" data-dismiss=\"modal-dialog\">Chiudi finestra</button></div></div>";


	  $('#myModalreg').html(successo);
	  
	  		  //chiudo il fade in nella opener
	  $("#chiudifinestra").click(function(){
	  $('.modal-backdrop').remove();
	  $('body').removeClass('modal-open')
	  $("#primaparte",window.opener).load("tabella_auto.html");	
	  $("#secondaparte",window.opener).load("tabella_auto2.html");	
	  });
	    
      }
	    	  
    });
	
	

	
}



function formSuccess(){
    $("#automobile")[0].reset();
    submitMSG(true, "Registrazione completata")
}

function formError(){
    $("#automobile").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
        $(this).removeClass();
    });
}




function submitMSG(valid, msg){
    if(valid){
        var msgClasses = "h3 text-center tada animated text-success";
    } else {
        var msgClasses = "h3 text-center text-danger";
    }
    $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
}



