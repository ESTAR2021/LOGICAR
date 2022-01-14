$(document).ready(function () {
    $.ajax({
        type: "GET",
        cache: false,
        url: "php/lista_auto3.php",
        success: function (data) {
            var lista = $.parseJSON(data);
            var quanti = lista['dimensione'];
            var tabellasch = "" +
                "<thead>" +
                "<tr>" +
                "<th>Sede</th>" +
                "<th>Targa</th>" +
                "<th>Marca</th>" +
                "<th>Modello</th>" +
                "<th>N. locale</th>" +
                "<th>Alimentazione</th>" +
                "<th>Cilindrata</th>" +
                "<th>Operazioni</th>" +
                "</tr>" +
                "</thead>" +
                "<tfoot>" +
                "<tr>" +
                "<th>Sede</th>" +
                "<th>Targa</th>" +
                "<th>Marca</th>" +
                "<th>Modello</th>" +
                "<th>N. locale</th>" +
                "<th>Alimentazione</th>" +
                "<th>Cilindrata</th>" +
                "<th>Operazioni</th>" +
                "</tr>" +
                "</tfoot><tbody>";
            for (var i = 0; i < quanti; i++) {
                var idautosch = lista[i]['id_auto'];
                tabellasch += "<tr>" +
                    /*"<td hidden>" + lista[i]['cod_comune'] + "</td>" +*/
                    "<td>" + lista[i]['ind_sede'] + "</td>" +
                    "<td>" + lista[i]['targa'] + "</td>" +
                    "<td>" + lista[i]['marca'] + "</td>" +
                    "<td>" + lista[i]['modello'] + "</td>" +
                    "<td>" + lista[i]['numero_auto_locale'] + "</td>"	+	//todo VERIFICARE SE DEBBA ESSERE ANNO O ANNO_IMM
                    "<td>" + lista[i]['alimentazione'] + "</td>" +
                    "<td>" + lista[i]['cilindrata'] + "</td><td>";
                tabellasch += "<button type=\"button\" class=\"btn btn-success\" " +
                    "data-toggle=\"modal\" " +
                    "data-target=\"#confirm-edit\" " +
                    "data-id=\"" + lista[i]['idauto'] + "\" " +
                    "data-modello=\"" + lista[i]['modello'] + "\" " +
                    "data-marca=\"" + lista[i]['marca'] + "\" " +
                    "data-targa=\"" + lista[i]['targa'] + "\" " +
                    "data-azienda=\"" + lista[i]['id_azienda'] + "\" " +
                    "data-compatibilita=\"" + lista[i]['compatibilita'] + "\" " +
                    "data-colore=\"" + lista[i]['colore'] + "\" " +
                    "data-id_sede=\"" + lista[i]['sede'] + "\" " +
                    "data-telaio=\"" + lista[i]['telaio'] + "\" " +
                    "data-anno_imm=\"" + lista[i]['anno_imm'] + "\" " +
                    "data-mese_imm=\"" + lista[i]['mese_imm'] + "\" " +
                    "data-posti=\"" + lista[i]['posti'] + "\" " +
                    "data-peso=\"" + lista[i]['peso'] + "\" " +
                    "data-kmlitro=\"" + lista[i]['kmlitro'] + "\" " +
                    "data-destinazione=\"" + lista[i]['destinazione'] + "\" " +
                    "data-assi=\"" + lista[i]['assi'] + "\" " +
                    "data-titoloAcquisto=\"" + lista[i]['titoloAcquisto'] + "\" " +
                    "data-tipoSede=\"" + lista[i]['tipo'] + "\" " +
                    "data-provincia=\"" + lista[i]['prov_comune'] + "\" " +
                    "data-comune=\"" + lista[i]['cod_comune'] + "\" " +
                    "data-indirizzo=\"" + lista[i]['ind_sede'] + "\" " +
					"data-telepass_viacard=\"" + lista[i]['telepass_viacard'] + "\" " +
					"data-telepass_viacard_numero=\"" + lista[i]['telepass_viacard_numero'] + "\" " +
					"data-fuel_card=\"" + lista[i]['fuel_card'] + "\" " +
					"data-numero_locale=\"" + lista[i]['numero_auto_locale'] + "\" " +
					"data-uso=\"" + lista[i]['uso'] + "\" " +
					"data-prenotabile=\"" + lista[i]['prenotabile'] + "\" " +
					"data-esentebollo=\"" + lista[i]['esente_bollo'] + "\" " +
					"data-unita_prelievo=\"" + lista[i]['unita_prelievo'] + "\" " +
                    "data-note=\"" + lista[i]['note'] + "\"><span class=\"glyphicon glyphicon-wrench\" aria-hidden=\"true\"></span>  Modifica</button> ";
                //verifico se l'auto è già presente in manutenzione,se no attivo solo l'inserimento, se sì solo la modifica
//console.log(tabellasch);
			   var inmanutenzione = lista[i]['quanti'];
               /**
                if (inmanutenzione < 1) {
                    tabellasch += " <button type=\"button\" id=\"auto\" class=\"btn btn-primary\" " +
                        "data-toggle=\"modal\" data-target=\"#inserisci_3\" " +
                        "data-id=\"" + lista[i]['idauto'] + "\" data-modello=\"" + lista[i]['modello'] + "\" " +
                        "data-marca=\"" + lista[i]['marca'] + "\" data-colore=\"" + lista[i]['colore'] + "\" " +
                        "data-sede=\"" + lista[i]['sede'] + "\"" + /*" data-comune=\""+lista[i]['comune']+"\" " +
                         "data-provincia=\""+lista[i]['provincia']+"\" data-indirizzo=\""+lista[i]['indirizzo']+"\"   " +*/
/**   "data-targa=\"" + lista[i]['targa'] + "\">" +
                        "<span class=\"glyphicon glyphicon-wrench\" aria-hidden=\"true\"></span>Aggiungi Manutenzione</button> ";
                }
                else {
                    tabellasch += " <button type=\"button\" " +
                        "class=\"btn btn-warning\"><span " +
                        "class=\"glyphicon glyphicon-wrench\" " +
                        "aria-hidden=\"true\"></span>Modifica Manutenzione </button> ";
                } **/
                tabellasch += "<button type=\"button\" id=\"cancella\" class=\"btn btn-danger\"  " +
                    "data-toggle=\"modal\" data-target=\"#confirm-cancparco\" " +
                    "data-id=\"" + lista[i]['idauto'] + "\" data-modello=\"" + lista[i]['modello'] + "\" " +
                    "data-marca=\"" + lista[i]['marca'] + "\" data-targa=\"" + lista[i]['targa'] + "\">" +
                    "<span class=\"glyphicon glyphicon-remove-circle\" aria-hidden=\"true\"></span>  Cancella</button></td></tr>";
                //Pulsante "Riserva Auto"
                //tabellasch+="<button type=\"button\" id=\"auto"+lista[i]['idauto']+"\" class=\"btn btn-success\" data-toggle=\"modal\" data-target=\"#riserva\" data-id=\""+lista[i]['idauto']+"\" data-modello=\""+lista[i]['modello']+"\" data-marca=\""+lista[i]['marca']+"\"><span class=\"glyphicon glyphicon-thumbs-up\" aria-hidden=\"true\"></span>  Riserva <span class=\"badge\">"+lista[i]['quanti']+"</span> </button> ";
                inmanutenzione = 0;
            }
            tabellasch += "</tbody></table>";

            //modale per inserimento manutenzione
            var modaleschins = "" +
                "<div class=\"modal-dialog modal-lg\" id=\"modal-dialogsch\">" +
                "	<div class=\"modal-content\">" +
                "		<div class=\"modal-header\">Gestione manutenzione</div>" +
                "		<div class=\"modal-body\" id=\"modal-bodysch\" background=\"img/asphalt.jpg\"></div>" +
                "		<div class=\"modal-footer\" id=\"modal-footersch\"></div>" +
                "	</div>" +
                "</div>";


            $('#inserisci_3').on('show.bs.modal', function (event) {
                var button = $(event.relatedTarget); // Button that triggered the modal
                var myidauto = button.data('id'); // Extract info from data-* attributes
                var mymarca = button.data('marca');
                var mymodello = button.data('modello');
                var mycolore = button.data('colore');
                var mytarga = button.data('targa');
                $.ajax({
                    url: "manutenzione.html",
                    cache: false,
                    success: function (data) {
                        $('#modal-bodysch').html(data);
                        $('#inputmarcaman').val(mymarca);
                        $('#inputmodelloman').val(mymodello);
                        $('#coloreman').val(mycolore);
                        $('#targaman').val(mytarga);
                        $('#idautoman').val(myidauto);
                    },
                    error: function (jqXHR) {
                        App.createNotifyError(jqXHR.responseText);
                    }
                });
            });

            //modale per modifica caratteristiche
            var modale_edit = "" +
                "<div class=\"modal-dialog modal-lg\" id=\"modal-dialog_edit\">" +
                "	<div class=\"modal-content\" >" +
                "		<div class=\"modal-header\">Gestione auto</div>" +
                "		<div class=\"modal-body\" id=\"modal-body_edit\"></div>" +
                "		<div class=\"modal-footer\" id=\"modal-footerins\"></div>" +
                "	</div>" +
                "</div>";

            $('#confirm-edit').on('show.bs.modal', function (event) {
                var button = $(event.relatedTarget); // Button that triggered the modal
                var myidauto = button.data('id'); // Extract info from data-* attributes
                var mymarca = button.data('marca');
                var mymodello = button.data('modello');
                var mytarga = button.data('targa');
                var myazienda = azienda_data["azienda"];//button.data('azienda');
                var mycolore = button.data('colore');
                var mytelaio = button.data('telaio');
                var mysede = button.data('id_sede');
                var myanno_imm = button.data('anno_imm');
                var mymese_imm = button.data('mese_imm');
                var myposti = button.data('posti');
                var mypeso = button.data('peso');
                var mycompatibilita = button.data('compatibilita');
                var myassi = button.data('assi');
                var mykmlitro = button.data('kmlitro');
                var mydestinazione = button.data('destinazione');
                var mynote = button.data('note');
                var titoloAcquisto = button.data('titoloacquisto');
                var tipoSede= button.data('tipoSede');
                var provincia= button.data('provincia');
                var comune= button.data('comune');
                var indirizzo= button.data('indirizzo');
				var mytelepass_viacard= button.data('telepass_viacard');
				var mytelepass_viacard_numero= button.data('telepass_viacard_numero');
				var myfuel_card= button.data('fuel_card');
				var mynumerolocale= button.data('numero_locale');
				var myuso = button.data('uso');
				var myprenotabile = button.data('prenotabile');
				var myesentebollo = button.data('esentebollo');
				var myunita_prelievo = button.data('unita_prelievo');
                $.ajax({
                    url: "edit_caratteristiche.html",
                    cache: false,
                    success: function (data) {
                        $('#modal-body_edit').html(data);
                        $('#inputmarca').val(mymarca);
                        $('#inputmodello').val(mymodello);
                        $('#id_modello').val(myidauto);
                        $('#targa').val(mytarga);
                        //$('#id_azienda').val(azienda_data["id"]);
                        $('#azienda').val(myazienda);
                        $('#colore').val(mycolore);
                        $('#telaio').val(mytelaio);
                        $('#compatibilita').val(mycompatibilita);
                        $('#id_sede').val(mysede);
                        $('#anno_imm').val(myanno_imm);
                        $('#mese_imm').val(mymese_imm);
                        $('#posti').val(myposti);
                        $('#peso').val(mypeso);
                        $('#assi').val(myassi);
                        $('#kmlitro').val(mykmlitro);
                        $('#destinazione').val(mydestinazione);
						$("input[name=radiotelepassviacard][value='" + mytelepass_viacard + "']").prop('checked', true);
						$('#numero_telepass').val(mytelepass_viacard_numero);
						$('#FuelCard').val(myfuel_card);
						$('#numero_locale').val(mynumerolocale);
						$("input[name=uso][value='" + myuso + "']").prop('checked', true);
						$("input[name=prenotabile][value='" + myprenotabile + "']").prop('checked', true);
						$("input[name=esentebollo][value='" + myesentebollo + "']").prop('checked', true);
						console.log(mytelepass_viacard);
						console.log(button.data('telepass_viacard'));
						console.log(button.data('telepass_viacard_numero'));
						console.log('pippo');
						console.log(mynote);
						$('#inputnote').val(mynote);
						$('#id_unita_prelievo').val(myunita_prelievo);
                        setTimeout(function(){
                            $('#provincia').val(provincia);
                            $('#comune').val(comune);
                            $('#indirizzo').val($('#id_sede').val());
                        },1000);
                        $("input[name=noleggio][value='" + titoloAcquisto + "']").prop('checked', true)
                    },
                    error: function (jqXHR) {
                        App.createNotifyError(jqXHR.responseText);
                    }
                });

            });

            //modale per cancellazione da parco
            var modalecancparco = "" +
                "<div class=\"modal-dialog\" id=\"modal-dialog_cancparco\">" +
                "	<div class=\"modal-content\">" +
                "		<div class=\"modal-header\">Gestione auto</div>" +
                "		<div class=\"modal-body\" id=\"modal-body_cancparco\"></div>" +
                "		<div class=\"modal-footer\" id=\"modal-footer_cancparco\"></div>" +
                "	</div>" +
                "</div>";

            $('#confirm-cancparco').on('show.bs.modal', function (event) {
					
                var button = $(event.relatedTarget); // Button that triggered the modal
                var myidauto = button.data('id'); // Extract info from data-* attributes
                var mymarca = button.data('marca');
                var mymodello = button.data('modello');
                var mytarga = button.data('targa');

                $.ajax({
                    url: "cancella_auto.html",
                    cache: false,
                    success: function (data) {
                        $('#modal-body_cancparco').html(data);
                        $('#inputmarca').val(mymarca);
                        $('#inputmodello').val(mymodello);
                        $('#id_parco').val(myidauto);
                        $('#targa').val(mytarga);

                    },
                    error: function (jqXHR) {
                        App.createNotifyError(jqXHR.responseText);
                    }
                });					
            });

            $('#confirm-cancparco').html(modalecancparco);
            $('#confirm-edit').html(modale_edit);
            $('#inserisci_3').html(modaleschins);
            $('#tabella_macchina_3').html(tabellasch);
            $('#tabella_macchina_3').DataTable();
        },
        error: function () {
            console.log("errore");
        }
    });
    $('#inserisci3').on('hidden.bs.modal', function (event) {
        $('.modal-body').html('');
    });
});