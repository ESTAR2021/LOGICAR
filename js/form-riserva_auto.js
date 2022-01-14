//funzione per modificare un'auto
$("#automobile_riserva").validator().on("submit", function (event) {
    if (event.isDefaultPrevented()) {
        //i campi non sono a posto: stampa messaggio errore
		//nascondo subito la modale
		$('#myModalmodauto').html('');
        formError();
        submitMSG(false, "Non hai compilato i campi richiesti");
    } else {
        //i campi sono a posto
        event.preventDefault();
        submitForm();
    }
});

function submitForm(){
	var id_modello=$("#id_modello").val();
	var targa=$("#targa").val();
	var telaio=$("#telaio").val();
	var colore=$("#colore").val();
	var azienda=$("#azienda").val();
	var sede=$("#sede").val();
	var comune=$("#comune").val();
	var provincia=$("#provincia").val();
	var indirizzo=$("#indirizzo").val();
	var compatibilita=$("#compatibilita").val();
	var kmlitro=$("#kmlitro").val();
	var posti=$("#posti").val();
	var destinazione=$("#destinazione").val();
	var inputnote=$("#inputnote").val();

	$.ajax({
		type:'POST',
		url:'php/edit_riserva_auto.php',
		data:'id_modello='+id_modello+'&targa='+targa+'&telaio='+telaio+'&colore='+colore+'&azienda='+azienda+'&sede='+sede+'&comune='+comune+'&provincia='+provincia+'&indirizzo='+indirizzo+'&compatibilita='+compatibilita+'&peso='+peso+'&kmlitro='+kmlitro+'&posti='+posti+'&assi='+assi+'&destinazione='+destinazione+'&anno_imm='+anno_imm+'&mese_imm='+mese_imm+'&inputnote='+inputnote,
		success: function(response){
			
	var successo="<img src=\"img/burningwheel.png\" /> Auto correttamente modificata "+
		  "<button type=\"button\" class=\"btn btn-default\" id=\"chiudifinestra\" data-dismiss=\"modal-dialog\">Chiudi finestra</button>";


		  $('#row_container_mod').html(successo);
		  
				  //chiudo il fade in nella opener
		  $("#chiudifinestra").click(function(){
		  $('.modal-backdrop').remove();
		  $('body').removeClass('modal-open')
		  $("#secondaparte",window.opener).load("tabella_auto2.html");	
		  $("#terzaparte",window.opener).load("tabella_auto3.html");	
		  });
			
		  }
				  
		});
		
		

		
}



function formSuccess(){
    $("#automobile_mod")[0].reset();
    submitMSG(true, "Registrazione completata")
}

function formError(){
    $("#automobile_mod").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
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
