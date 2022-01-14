$(document).ready(function () {
    //Sezione sede da popolare
    $('.azienda').val(azienda_data["azienda"]);
    $('.id_azienda').val(azienda_data["id"]);
		
		$("#unita_prelievo").select2({
				dropdownParent: $("#modal-dialog_edit")
				//questo codice serve per fa funzionare la select 2 in una finestra modale
		});
		getUnitaPrelievo();
		
    setTimeout(function () {
        if ($('#id_sede').val() != "") {
            id_sede = $('#id_sede').val();
            $.ajax({
                type: "POST",
                url: "php/get_sede.php",
                async: false,
                data: {id_sede: id_sede},
                success: function (data) {
                    sede = $.parseJSON(data);
                    $('#tipoSede').val(sede["tiposede"]);
                    setTimeout(function () {
                        getProvince(sede["tiposede"]);
                    }, 0);
                    setTimeout(function () {
                        getComuni(sede["provincia"]);
                    }, 100);
                    setTimeout(function () {
                        getIndirizzo(sede["comune"]);
                    }, 200);

                }
            });
        }
    }, 100);
    setTimeout(function () {
        $(document)
            .on('change', '#tipoSede', function () {
                $('#provincia').val('');
                $('#comune').val('');
                $('#indirizzo').val('');
                getProvince(this.value);
            })
            .on('change', '#provincia', function () {
                $('#indirizzo').html("<option selected>Scegli indirizzo</option>");
                getComuni(this.value);
            })
            .on('change', '#comune', function () {
                getIndirizzo(this.value);
            })
            .on('change', '#indirizzo', function () {
                setIdSede(this.value);
            })
    }, 1000);

});

function getProvince(val) {     //val è il tipo sede selezionato
    $.ajax({
        type: "POST",
        url: "php/getProvince_perTipoSede.php",
        data: {tipo: val},
        success: function (data) {
            prov_com = $.parseJSON(data);
            var menu = "<option value=\"\" selected>Scegli provincia</option>";
            for (key in Object.keys(prov_com)) {
                menu += "<option value=\"" + Object.keys(prov_com)[key] + "\">" + Object.keys(prov_com)[key] + "</option> ";
            }
            $("#provincia").html(menu);
        }
    });
}

function getComuni(val) {       //val è la provincia selezionata
    var menu = "<option value=\"\" selected>Scegli comune</option>";
    var comuni = prov_com[val];
    for (key in comuni) {
        menu += "<option value=\"" + key + "\">" + comuni[key] + "</option> ";
    }

    $("#comune").html(menu);
}

function getIndirizzo(val) {       //val è la provincia selezionata
    $.ajax({
        type: "POST",
        url: "php/get_indirizzo.php",
        data: {tipo: $("#tipoSede").val(), comune: val},
        success: function (data) {
            var indirizzi = $.parseJSON(data);
            var menu = "<option value=\"\" selected>Scegli indirizzo</option>";
            for (key in indirizzi) {
                menu += "<option value=\"" + key + "\">" + indirizzi[key] + "</option> ";
            }
            $("#indirizzo").html(menu);
        }
    });
}

function getUnitaPrelievo() {
	$.ajax({
		type: "POST",
		url: "php/get_unita_prelievo.php",
		success: function (data) {	
			var unita = $.parseJSON(data);
			var menu = "<option value=\"\" selected>Scegli unita di prelievo</option>";
			for (key in unita) {
					menu += "<option value=\"" + key + "\">" + "(" + key +") " + unita[key] + "</option> ";
			}
//			console.log(menu);
			$("#unita_prelievo").append(menu);
			$("#unita_prelievo").val($("#id_unita_prelievo").val());
		}
	});
}

function setIdSede(val) {
    //Setta il div contenente l'id della sede al corrispondente valore
    $("#id_sede").val(val);
}

//funzione per modificare un'auto
$("#automobile_mod_autoparco").validator().on("submit", function (event) {
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

function submitForm() {
    var id_modello = $("#id_modello").val();
    var targa = $("#targa").val();
    var telaio = $("#telaio").val();
    var colore = $("#colore").val();
    var azienda = $("#id_azienda").val();
    var sede = $("#id_sede").val();
    var compatibilita = $("#compatibilita").val();
    var peso = $("#peso").val();
    var kmlitro = $("#kmlitro").val();
    var posti = $("#posti").val();
    var assi = $("#assi").val();
    var destinazione = $("#destinazione").val();
    var anno_imm = $("#anno_imm").val();
    var mese_imm = $("#mese_imm").val();
    var inputnote = $("#inputnote").val();
    var titoloAcquisto = $('input[name=noleggio]:checked').val();
	var TelePassViacard = $('input[name=radiotelepassviacard]:checked').val();
	var numerolocale = $("#numero_locale").val();
	var numeroTelePassViacard = $("#numero_telepass").val();
	var FuelCard = $("#FuelCard").val();
	var uso = $('input[name=uso]:checked').val();
	var prenotabile = $('input[name=prenotabile]:checked').val();
	var unita_prelievo = $("#unita_prelievo").val();
	var esentebollo = $('input[name=esentebollo]:checked').val();
    $.ajax({
        type: 'POST',
        url: 'php/edit_auto_autoparco.php',
        data: 'id_modello=' + id_modello + '&targa=' + targa + '&telaio=' + telaio + '&colore=' + colore + '&azienda=' + azienda + '&sede=' + sede + '&compatibilita=' + compatibilita + '&peso=' + peso + '&kmlitro=' + kmlitro + '&posti=' + posti + '&assi=' + assi + '&destinazione=' + destinazione + '&anno_imm=' + anno_imm + '&mese_imm=' + mese_imm + '&inputnote=' + inputnote + '&titoloAcquisto=' + titoloAcquisto + '&TelePassViacard=' + TelePassViacard + '&TelePass=' + numeroTelePassViacard + '&FuelCard=' + FuelCard + '&numerolocale=' + numerolocale + '&uso=' + uso + '&prenotabile=' + prenotabile + '&unita_prelievo=' + unita_prelievo+ '&esentebollo=' + esentebollo,
        //'&comune='+comune+'&provincia='+provincia+'&indirizzo='+indirizzo+
        success: function (response) {

            var successo = "<img src=\"img/burningwheel.png\" /> Auto correttamente modificata " +
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
