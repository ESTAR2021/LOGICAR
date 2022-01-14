//Al caricamento popolo i campi di input
$(document).ready(function () {
    $('.azienda').val(azienda_data["azienda"]);
    $('.id_azienda').val(azienda_data["id"]);
    //Valorizzo i campi input con dati standard
    var menu = "<option value=\"\" selected>Scegli provincia</option>";
    for (key in Object.keys(locations)) {
        menu += "<option value=\"" + Object.keys(locations)[key] + "\">" + Object.keys(locations)[key] + "</option> ";
    }
    $('.provincia').html(menu);
    $(".comune").html("<option value=\"\">Selezionare una provincia</option>");
});

function getComuni(val) {
    var menu = "<option value=\"\" selected>Scegli comune</option>";
    var comuni = locations[val];
    for (key in comuni) {
        menu += "<option value=\"" + key + "\">" + comuni[key] + "</option> ";
    }
    $('.comune').html(menu);
}

//Submit del form
$("#formSede").validator().on("submit", function (event) {
    if (event.isDefaultPrevented()) {
        formError();
        submitMSG(false, "Non hai compilato i campi richiesti");
    } else {
        //i campi sono a posto
        event.preventDefault();
        submitForm();
    }
});

function submitForm() {
    var id_sede = '';
    var tipo = $('.tipo').val();              //val testuale
    var asl = $('.id_azienda').val();         //val numerico
    var comune = $('.comune').val();          //val numerico
    var indirizzo = $('.indirizzo').val();    //val testuale
    var url = 'php/nuova_sede.php';
    //In base all'azione effettuata, popolo l'id e l'url PHP in maniera opportuna
    if ($('.form-submit').html() === "Salva") {
        id_sede = $('.id_sede').val();
        url = 'php/edit_sede.php';
    }
    $.ajax({
        type: 'POST',
        url: url,
        data: {id_sede: id_sede, tipo: tipo, asl: asl, comune: comune, indirizzo: indirizzo},
        success: function (response) {
            $('#modal-title-sede').html('Aggiornamento Sede');
            $('#modal-body-sede').html(iconaSede + 'Operazione eseguita correttamente');
            $('#modal-footer-sede').html("" +
                "<button type=\"button\" " +
                "class=\"btn btn-default\" " +
                "id=\"chiudifinestra\" " +
                "data-dismiss=\"modal\"" +
                ">Chiudi finestra</button>");
            $('#chiudifinestra').on('click',function(){
                $('.modal-backdrop').remove();
                $('body').removeClass('modal-open');
                ricaricaTabellaSede();
            })
        },
        error: function (jqXHR) {
            App.createNotifyError(jqXHR.responseText);
            $('#modal-footer-sede').html("" +
                "<button type=\"button\" " +
                "class=\"btn btn-default\" " +
                "id=\"chiudifinestra\" " +
                "data-dismiss=\"modal\"" +
                ">Chiudi finestra</button>");
            $('#modal-body-sede').html(iconaSede + "Errore durante l'aggiornamento sedi");
        }
    });

}

function formError() {
    $("#formSede").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
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

