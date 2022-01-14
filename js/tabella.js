$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: "php/lista_auto.php",
        success: function (data) {
            var lista = $.parseJSON(data);
            var quanti = lista['dimensione'];
            var tabella = "<thead><tr><th>Marca</th><th>Modello</th>" +
                "<th>Cilindrata</th><th>Alimentazione</th><th>Potenza</th><th>Operazioni</th><</tr></thead>" +
                "<tfoot><tr><th>Marca</th><th>Modello</th>" +
                "<th>Cilindrata</th><th>Alimentazione</th><th>Potenza</th><th>Operazioni</th></tr></tfoot><tbody>";
            for (var i = 0; i < quanti; i++) {
                var idauto = lista[i]['idauto'];
                tabella += "<tr><td>" + lista[i]['marca'] + "</td><td>" + lista[i]['modello'] + "</td><td>" + lista[i]['cilindrata'] + "</td><td>" + lista[i]['alimentazione'] + "</td><td>" + lista[i]['potenza'] + "</td><td>";

//se l'auto è presente nell'autoparco aziendale do possibilità di modifica e cancellazione
                var giapresente = lista[i]['quanti'];
                /*if(giapresente>0){
                 tabella+="<button type=\"button\" class=\"btn btn-success\" data-toggle=\"modal\" data-target=\"#confirm-edit\" data-id=\""+lista[i]['idauto']+"\" data-modello=\""+lista[i]['modello']+"\" data-marca=\""+lista[i]['marca']+"\" data-targa=\""+lista[i]['targa']+"\" data-colore=\""+lista[i]['colore']+"\" data-telaio=\""+lista[i]['telaio']+"\" data-anno_imm=\""+lista[i]['anno_imm']+"\" data-mese_imm=\""+lista[i]['mese_imm']+"\" data-posti=\""+lista[i]['posti']+"\" data-peso=\""+lista[i]['peso']+"\" data-kmlitro=\""+lista[i]['kmlitro']+"\" data-destinazione=\""+lista[i]['destinazione']+"\" data-note=\""+lista[i]['note']+"\"><span class=\"glyphicon glyphicon-wrench\" aria-hidden=\"true\"></span>  Modifica</button>";
                 }*/
                //Pulsante "Inserisci in Autoparco"
                tabella += " <button type=\"button\" id=\"auto" + idauto + "\" class=\"btn btn-primary\" data-toggle=\"modal\" data-target=\"#inserisci\" data-id=\"" + lista[i]['idauto'] + "\" data-modello=\"" + lista[i]['modello'] + "\" data-marca=\"" + lista[i]['marca'] + "\"><span class=\"glyphicon glyphicon-thumbs-up\" aria-hidden=\"true\"></span>  Inserisci in autoparco <span class=\"badge\">" + lista[i]['quanti'] + "</span> </button> ";


                /*if(giapresente>0){
                 tabella+="<button type=\"button\" id=\"cancella\" class=\"btn btn-danger\"  data-toggle=\"modal\" data-target=\"#confirm-delete\" data-id=\""+lista[i]['idauto']+"\" data-modello=\""+lista[i]['modello']+"\" data-marca=\""+lista[i]['marca']+"\"><span class=\"glyphicon glyphicon-remove-circle\" aria-hidden=\"true\"></span>  Cancella</button></td></tr>";
                 }	*/

            }
            tabella += "</tbody></table>";

//modale per cancellazione
            var modale = "<div class=\"modal-dialog\" id=\"modal-dialog\"><div class=\"modal-content\"><div class=\"modal-header\">Gestione auto</div>" +
                "<div class=\"modal-body\" id=\"modal-body\">" +
                "</div><div class=\"modal-footer\" id=\"modal-footer\"></div></div></div>";


            $('#confirm-delete').on('show.bs.modal', function (event) {
                var button = $(event.relatedTarget) // Button that triggered the modal
                var myidauto = button.data('id') // Extract info from data-* attributes
                var mymarca = button.data('marca')
                var mymodello = button.data('modello')
                $('#modal-body').html("Stai per cancellare l'auto " + mymarca + " " + mymodello + ". Questa operazione comporter&agrave; l'eliminazione di ogni vettura aziendale eventualmente associata al modello. Sei sicuro di voler proseguire?");
                $('#modal-footer').html("<button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Annulla</button>" +
                    "<a class=\"btn btn-danger btn-ok\"  id=\"elimina_auto\" href=\"php/elimina_auto.php?id=" + myidauto + "\" data-toggle=\"modal\" data-target=\"#modal-dialog\" >Elimina auto</a>")

            })


//modale per modifica
            var modale_edit = "<div class=\"modal-dialog modal-lg\" id=\"modal-dialog_edit\"><div class=\"modal-content\" ><div class=\"modal-header\">Gestione auto</div>" +
                "<div class=\"modal-body\" id=\"modal-body_edit\">" +
                "</div><div class=\"modal-footer\" id=\"modal-footerins\"></div></div></div>";


            $('#confirm-edit').on('show.bs.modal', function (event) {
                var button = $(event.relatedTarget); // Button that triggered the modal
                var myidauto = button.data('id'); // Extract info from data-* attributes
                var mymarca = button.data('marca');
                var mymodello = button.data('modello');
                var mytarga = button.data('targa');
                var mycolore = button.data('colore');
                var mytelaio = button.data('telaio');
                var myanno_imm = button.data('anno_imm');
                var mymese_imm = button.data('mese_imm');
                var myposti = button.data('posti');
                var mypeso = button.data('peso');
                var myassi = button.data('assi');
                var mykmlitro = button.data('kmlitro');
                var mydestinazione = button.data('destinazione');
                var mynote = button.data('note');
                $.get("edit_caratteristiche.html", function (data) {
                    $('#modal-body_edit').html(data);
                    $('#inputmarca').val(mymarca);
                    $('#inputmodello').val(mymodello);
                    $('#id_modello').val(myidauto);
                    $('#targa').val(mytarga);
                    $('#colore').val(mycolore);
                    $('#telaio').val(mytelaio);
                    $('#anno_imm').val(myanno_imm);
                    $('#mese_imm').val(mymese_imm);
                    $('#posti').val(myposti);
                    $('#peso').val(mypeso);
                    $('#assi').val(myassi);
                    $('#kmlitro').val(mykmlitro);
                    $('#destinazione').val(mydestinazione);
                    $('#inputnote').val(mynote);
                });


            })


//modale per inserimento in autoparco
            var modaleins = "<div class=\"modal-dialog modal-lg\" id=\"modal-dialogins\"><div class=\"modal-content\" ><div class=\"modal-header\">Gestione auto</div>" +
                "<div class=\"modal-body\" id=\"modal-bodyins\">" +
                "</div><div class=\"modal-footer\" id=\"modal-footerins\"></div></div></div>";


            $('#inserisci').on('show.bs.modal', function (event) {
                var button = $(event.relatedTarget); // Button that triggered the modal
                var myidauto = button.data('id'); // Extract info from data-* attributes
                var mymarca = button.data('marca');
                var mymodello = button.data('modello');
                /*//todo Controllo se la modale è stata già popolata
                 if ($('#modal-bodyins').html() === '') {*/
                $.ajax({
                    url: "caratteristiche.html",
                    cache: false,
                    success: function (data) {
                        $('#modal-bodyins').html(data);
                        $('#inputmarca').val(mymarca);
                        $('#inputmodello').val(mymodello);
                        $('#id_modello').val(myidauto);
                    },
                    error: function (jqXHR) {
                        App.createNotifyError(jqXHR.responseText);
                    }
                });


            });

            $('#confirm-delete').html(modale);
            $('#confirm-edit').html(modale_edit);
            $('#inserisci').html(modaleins);
            $('#tabella_macchina').html(tabella);
            $('#tabella_macchina').DataTable();
        },
        error: function (jqXHR) {
            App.createNotifyError(jqXHR.responseText);
        }

    });
    $('#inserisci').on('hidden.bs.modal', function (event) {
        $('.modal-body').html('');
    });
});

