function indietro() {
    $("#rcorners7").fadeOut("slow");
    $("#rcorners6").css('opacity', '1');
    $("#departure").prop('disabled', false);
    $("#hour").prop('disabled', false);
    $("#freccia").html("<a href=\"#\" id=\"step2\"><img src='img/booking/freccia.png' title=\"vai allo step 2\" alt=\"vai allo step 2\"></a>");
    $("#step2").click(function () {
        avanti();
    });
}


function avanti() {
    $("#rcorners7").fadeIn("slow");
    $("#indirizzo").prop('disabled', true);
    $('#comune').focus(function () {
        $('#error_comune').html('');
        $("#freccia_2").html("<img src='img/booking/freccia_off.png' title=\"vai allo step 3\" alt=\"vai allo step 3\">");
    });
    $('#comune').keyup(function () {
        $('#indirizzo').prop('disabled', false);
    });
    $("#freccia").html("<img src='img/booking/freccia_off.png' title=\"vai allo step 2\" alt=\"vai allo step 2\">");
    $("#freccia_back").html("<a href=\"#\" id=\"frecciaindietro\"><img src='img/booking/freccia_back.png' title=\"torna allo step 1\" alt=\"torna allo step 1\"></a>");
    $("#departure").prop('disabled', true);
    $("#hour").prop('disabled', true);
    $('#rcorners6').css('opacity', '0.3');
    $("#frecciaindietro").click(function () {
        indietro();
    });
}

function avanti_2() {
    $("#rcorners8").fadeIn("slow");
    $("#freccia_back_2").html("<a href=\"#\" id=\"frecciaindietro_2\"><img src='img/booking/freccia_back.png' title=\"torna allo step 2\" alt=\"torna allo step 2\"></a>");
    $("#freccia_3").html("<a href=\"#\" id=\"frecciaindietro_3\"><img src='img/booking/spunta_grigia.png' title=\"torna allo step 2\" alt=\"torna allo step 2\"></a>");
    $("#comune").prop('disabled', true);
    $("#indirizzo").prop('disabled', true);
    $('#rcorners7').css('opacity', '0.3');
    $("#freccia_back").html("<img src='img/booking/freccia_back_off.png' title=\"torna allo step 1\" alt=\"torna allo step 1\">");
    $("#freccia_2").html("<img src='img/booking/freccia_off.png' title=\"vai allo step 3\" alt=\"vai allo step 3\">");

    $("#frecciaindietro_2").click(function () {
        $("#rcorners8").fadeOut("slow");
        $("#rcorners7").css('opacity', '1');
        $("#comune").prop('disabled', false);
        $("#freccia_2").html("<a href=\"#\" id=\"step3\"><img src='img/booking/freccia.png' title=\"vai allo step 3\" alt=\"vai allo step 3\"></a>");
        $("#step3").click(function () {
            avanti_2();
        });
        $("#freccia_back").html("<a href=\"#\" id=\"frecciaindietro\"><img src='img/booking/freccia_back.png' title=\"torna allo step 1\" alt=\"torna allo step 1\"></a>");

        $("#frecciaindietro").click(function () {
            indietro();
        });
    });
}


//modale per avanzamento step
var modalstep = "<div class=\"modal-dialog\" id=\"modal-dialog_step\"  {width:75%;}><div class=\"modal-content\"><div class=\"modal-header\"><img src=\"img/logo.png\"></div>" +
    "<div class=\"modal-body\" id=\"modal-body\"><img src=\"img/booking/prenota_blue.png\" width=\"25%\ height=\"25%\"> <img src=\"img/booking/macchina_grey.png\" width=\"25%\ height=\"25%\"> <img src=\"img/booking/conferma_grey.png\" width=\"25%\ height=\"25%\">" +
    "</div><div class=\"modal-footer\" id=\"modal-footer\"></div></div></div>";


$(document).ready(function () {
    //attivo la modale al document ready per visualizzare lo step
    $("#modalstep").html(modalstep);
    $("#modalstep").modal('show');
    $("#freccia").html("<img src='img/booking/freccia_off.png' />");
    $("#freccia_2").html("<img src='img/booking/freccia_off.png' />");
    $("#freccia_3").html("<img src='img/booking/spunta_grigia.png' />");
    $("#departure").change(function () {
        $("#freccia").html("<a href=\"#\" id=\"step2\"><img src='img/booking/freccia.png' title=\"vai allo step 2\" alt=\"vai allo step 2\"></a>");
        $("#step2").click(function () {
            avanti();
        });
    });


    //controllo coerenza formale di date e orari di partenza e ritorno
    //prima controllo al change del campo data
    $("#departure_2").change(function () {


        var giorno1 = $("#departure").val();
        var orario1 = $("#hour").val();
        var giorno2 = $("#departure_2").val();
        var orario2 = $("#hour_2").val();

        $.ajax({
            type: 'POST',
            url: 'php/booking/controlladateorari.php',
            data: {giorno1: giorno1, orario1: orario1, giorno2: giorno2, orario2: orario2},
            success: function (data) {
                var controllo = $.parseJSON(data);
                //se non ci sono errori metto spunta verde
                if (controllo == 0) {
                    $("#freccia_3").html("<a href=\"#\"><img src='img/booking/spunta.png' id=\"spunta_ok\" title=\"vai alla scelta macchina\" alt=\"vai alla scelta macchina\"></a>");

                    //scrivo la prenotazione su db
                    $("#spunta_ok").click(function () {


                        var comune = $("#comune").val();
                        var indirizzo = $("#indirizzo").val();


                        $.ajax({
                            type: 'POST',
                            url: 'php/booking/addprenotazione_1.php',
                            data: {
                                giorno1: giorno1,
                                orario1: orario1,
                                comune: comune,
                                indirizzo: indirizzo,
                                giorno2: giorno2,
                                orario2: orario2
                            },
                            success: function (response) {
                            }
                        });


                    });
                }
                //altrimenti metto spunta grigia
                if (controllo == 1) {
                    $("#freccia_3").html("<img src='img/booking/spunta_grigia.png' alt=\"sono presenti errori\">");
                }
            }
        });


    });


    //poi replico lo stesso controllo sul campo ora
    $('.td-overlay, .td-clock, .td-select')
        .on('touchmove touchend mousemove mouseup',
            evt.preventDefault());


    var giorno1 = $("#departure").val();
    var orario1 = $("#hour").val();
    var giorno2 = $("#departure_2").val();
    var orario2 = $("#hour_2").val();

    $.ajax({
        type: 'POST',
        url: 'php/booking/controlladateorari.php',
        data: {giorno1: giorno1, orario1: orario1, giorno2: giorno2, orario2: orario2},
        success: function (data) {
            var controllo = $.parseJSON(data);
            //se non ci sono errori metto spunta verde
            if (controllo == 0) {
                $("#freccia_3").html("<a href=\"#\"><img src='img/booking/spunta.png' id=\"spunta_ok\" title=\"vai alla scelta macchina\" alt=\"vai alla scelta macchina\"></a>");

                //scrivo la prenotazione su db
                $("#spunta_ok").click(function () {

                    var comune = $("#comune").val();
                    var indirizzo = $("#indirizzo").val();


                    $.ajax({
                        type: 'POST',
                        url: 'php/booking/addprenotazione_1.php',
                        data: {
                            giorno1: giorno1,
                            orario1: orario1,
                            comune: comune,
                            indirizzo: indirizzo,
                            giorno2: giorno2,
                            orario2: orario2
                        },
                        success: function (response) {
                        }
                    });


                });

            }
            //altrimenti metto spunta grigia
            if (controllo == 1) {
                $("#freccia_3").html("<img src='img/booking/spunta_grigia.png' alt=\"sono presenti errori\">");

            }
        }
    });

});

$("#rcorners7").hide();
$("#rcorners8").hide();


/*
 $("#rcorners7").change(function() {
 $("#freccia_back").html("<a href=\"#\" id=\"frecciaindietro\"><img src='img/booking/freccia_back.png' title=\"torna allo step 1\" alt=\"torna allo step 1\"></a>");
 });
 */


//funzione di autocompletamento campo comune
$(function () {
    $("#comune").autocomplete({
        source: 'php/lista_comuni.php'
    });
});


///setto a vuoto il campo comune al focus on
$('#comune').focusin(function () {
    $('#comune').val('');
    $('#error_comune').html('');
    $('#indirizzo').val('');
});

//funzione per passaggio da step2 a step3
$('#comune, #indirizzo').keyup(function () {
    if ($('#comune').val() != "") {
        if ($('#indirizzo').val() != "") {
            //chiamata ajax per verificare che il comune sia stato scelto da tendina
            var comune = $('#comune').val();
            $.ajax({
                type: 'POST',
                url: 'php/booking/controllacomune.php',
                data: {comune: comune},
                success: function (data) {
                    var numerocomuni = $.parseJSON(data);
                    var quanti_comuni = numerocomuni['dimensione'];


                    if (quanti_comuni > 0) {
                        $("#freccia_2").html("<a href=\"#\" id=\"step3\"><img src='img/booking/freccia.png' title=\"vai allo step 3\" alt=\"vai allo step 3\"></a>");
                        $("#step3").click(function () {
                            avanti_2();
                        });
                    }
                    else {
                        $("#error_comune").html("<font style=\"color:red; font-size:70%;\">Attenzione. Il comune inserito non esiste.<br />Scegliere una voce dal men&uacute; a discesa</font>");
                    }
                }
            });
        }
    }
});




