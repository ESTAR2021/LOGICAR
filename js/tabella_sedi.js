var iconaSede = "<img src=\"img/sede.png\" class=\"icona_accordion\"/>";

function getComuni(val) {
    var menu = "<option value=\"\" selected>Scegli comune</option>";
    var comuni = locations[val];
    for (key in comuni) {
        menu += "<option value=\"" + key + "\">" + comuni[key] + "</option> ";
    }
    $('.comune').html(menu);
}

function ricaricaTabellaSede() {
    url = "tabella_sede.html";
    $parte = $('#partesede');
    $.ajax({
        url: url,
        cache: false,
        type: 'GET',
        success: function (data) {
            //$('.panel-collapse').html('');
            $parte.html(data);
        }
    });
}

$(document).ready(function () {


    $('.azienda').html(azienda_data["azienda"]);

    $.ajax({
        type: "POST",
        url: "php/get_locations.php",
        success: function (data) {
            //Recupero del repository globale di Province->Comune
            locations = $.parseJSON(data);
        }
    });

    $.ajax({
        type: "GET",
        url: "php/lista_sedi.php",
        success: function (data) {
            var lista_sedi = $.parseJSON(data);
            $('#nome_azienda').html(data['nome_azienda']);
            var quante_sedi = lista_sedi['dimensione'];
            var tabella_mod = "" +
                "<thead><tr><th>Tipo Sede</th>" +
                "<th>Provincia</th>" +
                "<th>Comune</th>" +
                "<th>Indirizzo</th>" +
                "<th>Operazioni</th></thead><tfoot><tr>" +
                "<th>Tipo Sede</th>" +
                "<th>Provincia</th>" +
                "<th>Comune</th>" +
                "<th>Indirizzo</th>" +
                "<th>Operazioni</th></tr></tfoot><tbody>";
            //Popolamento della tabella con i dati delle sedi
            for (var i = 0; i < quante_sedi; i++) {
                tabella_mod += "<tr><td >" +
                    tipi_sede[lista_sedi[i]['tipo']] + "</td><td>" +
                    lista_sedi[i]['provincia'] + "</td><td>" +
                    lista_sedi[i]['denominazione'] + "</td><td>" +
                    lista_sedi[i]['indirizzo'] + "</td><td>";

                //OPERAZIONI: Pulsanti
                tabella_mod += " " +
                    "<button type=\"button\" id=\"modifica_sede_btn\" class=\"btn btn-success\" " +
                    "data-action=\"modifica\" " +
                    "data-toggle=\"modal\" " +
                    "data-target=\"#div-modal\"  " +
                    "data-id=\"" + lista_sedi[i]['id'] + "\" " +
                    "data-tipo=\"" + lista_sedi[i]['tipo'] + "\" " +
                    "data-azienda=\"" + lista_sedi['asl'] + "\" " +
                    "data-prov=\"" + lista_sedi[i]['provincia'] + "\" " +
                    "data-com=\"" + lista_sedi[i]['codice'] + "\" " +
                    "data-ind=\"" + lista_sedi[i]['indirizzo'] + "\">" +
                    "<span class=\"glyphicon glyphicon-wrench\" aria-hidden=\"true\"></span>  Modifica</button>";
                if (lista_sedi[i]['associata'] < 1) {
                    tabella_mod += " " +
                        "<button type=\"button\" id=\"cancella_sede_btn\" class=\"btn btn-danger\" " +
                        "data-action=\"cancella\" " +
                        "data-toggle=\"modal\" " +
                        "data-target=\"#div-modal\" " +
                        "data-id=\"" + lista_sedi[i]['id'] + "\">" +
                        "<span class=\"glyphicon glyphicon-remove-circle\" aria-hidden=\"true\"></span>  Cancella</button>";
                }

                tabella_mod += "</td></tr>";
            }
            tabella_mod += "</tbody></table>";

            $('#tabella_sede').html(tabella_mod);
            $('#tabella_sede').DataTable();
        },
        error: function (jqXHR) {
            App.createNotifyError(jqXHR.responseText);
        }
    });


});


//Azione Show sulla Modale di Aggiunta Sede
$('#div-modal').on('show.bs.modal', function (event) {
    button = $(event.relatedTarget);
    switch (button.data('action')) {
        case 'aggiungi':
            $.ajax({
                url: 'sede.html',
                type: 'GET',
                cache: false,
                success: function (data) {
                    $('#modal-title-sede').html("Aggiungi una nuova Sede");
                    //Aggiunge l'html al corpo della modale
                    $('#modal-body-sede').html(data);
                    //Il seguente pulsante si trova dentro la pagina html
                    $('.form-submit').html("Aggiungi");
                }
            });
            break;
        case 'modifica':
            var idsede = button.data('id');       // Extract info from data-* attributes
            var tipo = button.data('tipo');
            var azienda = button.data('azienda');
            var prov = button.data('prov');
            var com = button.data('com');
            var ind = button.data('ind');
            $.ajax({
                url: 'sede_edit.html',
                type: 'GET',
                cache: false,
                success: function (data) {
                    $('#modal-title-sede').html("Modifica una Sede");
                    //Aggiunge l'html al corpo della modale
                    $('#modal-body-sede').html(data);
                    //$('#modal-body').append(buttons);
                    $('.form-submit').html("Salva");
                    $('.id_sede').val(idsede);
                    $('.id_azienda').val(azienda);
                    $('.tipo').val(tipo);
                    setTimeout(function () {
                        $('.provincia').val(prov);
                        getComuni(prov);
                    }, 250);
                    /*var comuni = locations[prov];*/
                    setTimeout(function () {
                        $('.comune').val(com);
                        $('.indirizzo').val(ind);
                    }, 500);
                }
            });
            break;
        case 'cancella':
            var id = button.data('id'); // Extract info from data-* attributes
            $('#modal-body-sede').html("Stai per cancellare la sede. Sei sicuro di voler proseguire?");
            $('#modal-footer-sede').html("" +
                "<button type=\"button\" class=\"btn btn-default btn-annulla\" data-dismiss=\"modal\">Annulla</button>" +
                "<button class=\"btn btn-danger\"  " +
                "id=\"elimina_sede_btn\" " +
                ">Elimina sede</button>");
            $('#elimina_sede_btn').on('click', function (event) {
                event.preventDefault();
                var elimina = $(this);
                $.ajax({
                    url: 'php/elimina_sede.php',
                    type: 'GET',
                    data: {id: id},
                    success: function () {
                        elimina.hide();
                        $('#modal-body-sede').html(iconaSede + " Cancellazione avvenuta correttamente!");
                        $('.btn-annulla').html('Chiudi')
                    },
                    error: function (jqXHR) {
                        App.createNotifyError(jqXHR.responseText);
                        elimina.hide();
                        $('.btn-annulla').html('Chiudi');
                        $('#modal-body-sede').html(iconaSede + "Errore durante la cancellazione.");
                    }
                })
            });
            break;
    }
})
//Azione eseguita sull'evento hidden per svuotare la modale
    .on('hidden.bs.modal', function () {
        $('#modal-title-sede').html("");
        $('#modal-body-sede').html("");
        $('#modal-footer-sede').html("");
        ricaricaTabellaSede();
    });
