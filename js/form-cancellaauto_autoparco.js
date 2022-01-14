$(document).ready(function () {
    //Sezione sede da popolare
 //   $('.azienda').val(azienda_data["azienda"]);
 //   $('.id_azienda').val(azienda_data["id"]);
		

});




//funzione per modificare un'auto
$("#automobile_canc_autoparco").validator().on("submit", function (event) {
    if (event.isDefaultPrevented()) {
        //i campi non sono a posto: stampa messaggio errore
        //nascondo subito la modale
        //$('#myModalmodauto').html('');
        formError();
        submitMSG(false, "Non hai compilato i campi richiesti");
    } else {
        //i campi sono a posto
        event.preventDefault();
        submitForm();
    }
});

function submitForm() {
    var id_parco = $("#id_parco").val();
    var giorno_dismissione=$("#giorno_dismissione").val();
	var motivo_dismissione = $("#motivo").val();
	console.log("motivo_dismissione:" + motivo_dismissione); 
	var note_dismissione = $("#note_dismissione").val();
	console.log("note_dismissione:" + note_dismissione); 
    $.ajax({
        type: 'POST',
        url: 'php/elimina_auto_parco.php',
        data: 'id_parco=' + id_parco + '&giorno_dismissione=' + giorno_dismissione + '&motivo_dismissione=' + motivo_dismissione + '&note_dismissione=' + note_dismissione,
        
        success: function (response) {

            var successo = "<img src=\"img/burningwheel.png\" /> Auto correttamente dismessa " +
                "<button type=\"button\" class=\"btn btn-default\" id=\"chiudifinestra\" data-dismiss=\"modal-dialog\">Chiudi finestra</button>";


            $('#row_container_mod').html(successo);

            //chiudo il fade in nella opener
            $("#chiudifinestra").click(function () {
                $('.modal-backdrop').remove();
                $('body').removeClass('modal-open')
                $("#secondaparte", window.opener).load("tabella_auto2.html");
                $("#terzaparte", window.opener).load("tabella_auto3.html");
            });

        }

    });


}


function formSuccess() {
    $("#automobile_mod")[0].reset();
    submitMSG(true, "Registrazione completata")
}

function formError() {
    $("#automobile_mod").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
        $(this).removeClass();
    });
}


function submitMSG(valid, msg) {
    if (valid) {
        var msgClasses = "h3 text-center tada animated text-success";
    } else {
        var msgClasses = "h3 text-center text-danger";
    }
    $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
}
