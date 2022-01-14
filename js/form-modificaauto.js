//funzione per modificare un'auto
$("#automobile_mod").validator().on("submit", function (event) {
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
var idauto=$("#idauto").val();
var cilindrata=$("#cilindrata").val();
var potenza=$("#potenza").val();
var alimentazione=$("#alimentazione").val();
var note=$("#note").val();


$.ajax({
    type:'POST',
    url:'php/edit_auto.php',
    data:'idauto='+idauto+'&cilindrata='+cilindrata+'&potenza='+potenza+'&alimentazione='+alimentazione+'&note='+note,
    success: function(response){
		 
var successo="<img src=\"img/burningwheel.png\" /> Auto correttamente modificata "+
      "<button type=\"button\" class=\"btn btn-default\" id=\"chiudifinestra\" data-dismiss=\"modal-dialog\">Chiudi finestra</button>";


	  $('#row_container').html(successo);
	  
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
