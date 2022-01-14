function indietro() {

    $("#rcorners7").fadeOut("slow");
    $("#rcorners6").css('opacity', '1');
    $("#departure").prop('disabled', false);
    $("#hour").prop('disabled', false);
    $("#freccia").html("<a href=\"#\" id=\"step2\"><img src='../img/booking/freccia.png' title=\"vai allo step 2\" alt=\"vai allo step 2\"></a>");
    $("#step2").click(function () {
        avanti();

    });
}


function avanti() {
    $("#rcorners7").fadeIn("slow");
    $("#indirizzo").prop('disabled', true);
    $('#comune').focus(function () {
        $('#error_comune').html('');
        $("#freccia_2").html("<img src='../img/booking/freccia_off.png' title=\"vai allo step 3\" alt=\"vai allo step 3\">");
    });
    $('#comune').keyup(function () {
        $('#indirizzo').prop('disabled', false);
    })
    $("#freccia").html("<img src='../img/booking/freccia_off.png' title=\"vai allo step 2\" alt=\"vai allo step 2\">");
    $("#freccia_back").html("<a href=\"#\" id=\"frecciaindietro\"><img src='../img/booking/freccia_back.png' title=\"torna allo step 1\" alt=\"torna allo step 1\"></a>");
    $("#departure").prop('disabled', true);
    $("#hour").prop('disabled', true);
    $('#rcorners6').css('opacity', '0.3');
    $("#frecciaindietro").click(function () {
        indietro();
    });

}

function avanti_2() {

    $("#rcorners8").fadeIn("slow");
    $("#freccia_back_2").html("<a href=\"#\" id=\"frecciaindietro_2\"><img src='../img/booking/freccia_back.png' title=\"torna allo step 2\" alt=\"torna allo step 2\"></a>");
    $("#freccia_3").html("<a href=\"#\" id=\"frecciaindietro_3\"><img src='../img/booking/spunta_grigia.png' title=\"torna allo step 2\" alt=\"torna allo step 2\"></a>");
    $("#comune").prop('disabled', true);
    $("#indirizzo").prop('disabled', true);
    $('#rcorners7').css('opacity', '0.3');
    $("#freccia_back").html("<img src='../img/booking/freccia_back_off.png' title=\"torna allo step 1\" alt=\"torna allo step 1\">");
    $("#freccia_2").html("<img src='../img/booking/freccia_off.png' title=\"vai allo step 3\" alt=\"vai allo step 3\">");

    $("#frecciaindietro_2").click(function () {
        $("#rcorners8").fadeOut("slow");
        $("#rcorners7").css('opacity', '1');
        $("#comune").prop('disabled', false);
        $("#freccia_2").html("<a href=\"#\" id=\"step3\"><img src='../img/booking/freccia.png' title=\"vai allo step 3\" alt=\"vai allo step 3\"></a>");
        $("#step3").click(function () {
            avanti_2();
        });
        $("#freccia_back").html("<a href=\"#\" id=\"frecciaindietro\"><img src='../img/booking/freccia_back.png' title=\"torna allo step 1\" alt=\"torna allo step 1\"></a>");

        $("#frecciaindietro").click(function () {
            indietro();
        });

    });
}


//modale per avanzamento step
var modalstep = "<div class=\"modal-dialog\" id=\"modal-dialog_step\"  {width:55%;}><div class=\"modal-content\"><div class=\"modal-header\"><img src=\"../img/logo.png\"><h1><img src=\"../img/booking/lettering_1.png\"  width=\"50% height=50%\"></h1></div>" +
    "<div class=\"modal-body\" id=\"modal-body\" align=\"center\"><img src=\"../img/booking/prenota_blue.png\"  width=\"15%\" ><i class=\"fa fa-arrow-circle-o-right fa-5x margini_frecce\" style='vertical-align: middle;'></i></h1><img src=\"../img/booking/informazioni_grey.png\"  width=\"15%\" ><i class=\"fa fa-arrow-circle-o-right fa-5x margini_frecce\" style='vertical-align: middle;'></i> <img src=\"../img/booking/macchina_grey.png\"  width=\"15% height=20%\"><i class=\"fa fa-arrow-circle-o-right fa-5x margini_frecce\" style='vertical-align: middle;'></i></h1> <img src=\"../img/booking/conferma_grey.png\"  width=\"15% height=20%\">" +
    "</div><div class=\"modal-footer\" id=\"modal-footer\"><img src=\"../img/booking/logo_estar.png\"></div></div></div>";


$(document).ready(function () {
	
	console.log('------- Dcoument Ready');
		
	//imposta la data attuale leggendola dal sever 
	var d1 = moment(new Date(),'DD/MM/YYYY');
	console.log('d1 = '+d1+' inizializzta da moment');
	//---
	$.get("../php/get_data.php", function(data, status){
		d1 = moment(data,'DD/MM/YYYY');
		console.log('d1 = '+d1+' letta dal server');
	});		
	
	//imposta l'ora attuale leggendola dal server
	var h1 = '';
	//---
		$.get("../php/get_ora.php", function(ora, status){
		h1 = ora; //ora attuale formato HH:mm
	});
	
	//asl di appartenza dell'utente loggato
	var asl = '';
	//---
		$.get("../php/get_asl_sessione.php", function(azienda, status){
		asl = azienda; 
	});
	
	$.get("../php/get_giornosettimana.php", function(data, status){
		if (asl==2 && data > 3) // condizione per AslNO  
		{ 
			alert("Attenzione!!! Non e' possibile prenotare il giovedi', venerdi' e sabato");
			window.location = 'avvisi_mail.html';
		}
	});
	
	function controllaDataOraPartenza()
	{
		console.log("---- controllaDataOraPartenza");
		//---
		//var d2 = new Date($("#departure").val()); //data inserita
		var d2 = moment($("#departure").val(),'DD/MM/YYYY'); //data andata inserita
		var h2 = $("#hour").val(); //ora andata scelta in formato HH:mm
		//---
		console.log("d1: "+d1.toString()+'    '+d1.day());
		console.log("d2: "+d2.toString());
		console.log("isBefore: "+d2.isBefore(d1));
		deltat = d2.diff(d1,'days'); // delta t
		console.log('d2-d1 = '+deltat);		
		//if (d2.getTime() < d1.getTime())
		if(d2.isBefore(d1))
		{
			//se data di partenza è antecedente alla data attuale
			console.log('d2 is before d1');
			return 1;
		}
		else if ((d2.isSame(d1)) && (h2 <= h1))
		{
			//se data partenza è uguale alla data attuale e l'ora è antecedente a quella attuale
			console.log('d2 is the same d1'); 
			return 2;
		}
		else if ((asl!=10)&&(d2.week()-d1.week()==0 || d2.week()-d1.week()>1))
		{
			// escluso Estar si prenota la settimana prima per la successiva, quindi:
			// ok se la differenza è 1 oppure negativa (caso in cui gli ultimi giorni di dicembre sono entro la settimana numero 1
			// dunque no ok se la differenza è 0, ovvero siano nella stesso settimana, oppure >1, ovvero abbiamo superato la distanza di 1 settimana 
			return 3;
		}	
			
		else return 0;
	}
	
	function controllaDataOraRitorno()
	{
		console.log("---- controllaDataOraRitorno");
		//---
		var d2 = moment($("#departure").val(),'DD/MM/YYYY'); //data andata inserita
		var h2 = $("#hour").val(); //ora andata inserita in formato HH:mm
		//---
		var d3 = moment($("#departure_2").val(),'DD/MM/YYYY'); //data ritorno inserita
		var h3 = $("#hour_2").val(); //ora ritorno inserita in formato HH:mm
		//---
		//---
		//---
		console.log("d2: "+d2.toString()+'    '+d2.day());
		console.log("d3: "+d3.toString());
		console.log("isBefore: "+d3.isBefore(d2));
		deltat = d3.diff(d2,'days'); // delta t
		console.log('d3-d2 = '+deltat);	
		//if (d2.getTime() < d1.getTime())
		if(d3.isBefore(d2))
		{
			//se data di ritorno è antecedente alla data di partenza
			return 1;
		}
		else if ((d3.isSame(d2)) && (h3 <= h2))
		{
			//se data ritorno è uguale alla data di partenza e l'ora di ritorno è antecedente a quella di partenza
			return 2;
		}
		else if ((asl=='10') && (deltat >= 2))
		{
			//nel caso di ESTAR non si può superare i due giorni di prenotazione dell'auto
			//giorno di prenotazione e successivo
			return 3;
		}
		else return 0;
	}
	
	$.ajax({
		type: 'GET',
		url: '../php/checksession.php',
		success: function (data) {
			if (data == 0) {
					location.href = '../login.html';
			}
		}
	});

	//attivo la modale al document ready per visualizzare lo step
	$("#modalstep").html(modalstep);
	$("#modalstep").modal('show');
	$("#modalstep").on('click', function () {
	$("#modalstep").hide();
	$('.modal-backdrop').hide();
	$('body').removeClass('modal-open');
	});

	$("#freccia").html("<img src='../img/booking/freccia_off.png' />");
	$("#freccia_2").html("<img src='../img/booking/freccia_off.png' />");
	$("#freccia_3").html("<img src='../img/booking/spunta_grigia.png' />");
	
	//handler cambio giorno di partenza
	$("#departure").change(function() {
		//controlla che la data non sia antecedente alla data di oggi
		//console.log( $("#departure").val());
		var errore = '';
		var verificaInput = controllaDataOraPartenza();
		//console.log( verificaInput);
		switch (verificaInput) {
    case 0:
			swfreccia = 1; //va tutto bene
			$("#departure_2").val($("#departure").val()) //inzialiazza il rientro alla stessa data di partenza
			break;
    case 1:
			swfreccia = 0; //data passata
			errore = "La data inserita e' antecedente alla data odierna";
			$("#departure").select().focus();
			break;
    case 2: //data odierna ora passata
			swfreccia = 0;
			break;
    case 3: // questa condizione può essere generata solo da ente diverso da Estar
			swfreccia = 0; //data oltre il limite ammesso di una settimana dal momento della prenotazione
			errore = "E' possibile prenotare solo per la settimana successiva rispetto all'attuale";
			$("#departure").select().focus();
			break;		
		default:
			swfreccia = 1;
		}
		//---
		if (swfreccia == 0)
		{
			$("#error_data_partenza").html(errore);
			//---
			$("#freccia").html("<img src='../img/booking/freccia_off.png' />");
		}
		else
		{
			$("#error_data_partenza").html("");
			//---
			$('#td-clock-0').click();	//simulo l'evento click sull'ora di partenza
			//---
			$("#freccia").html("<a href=\"#\" id=\"step2\"><img src='../img/booking/freccia.png' title=\"vai allo step 2\" alt=\"vai allo step 2\"></a>");
			$("#step2").click(function () {
				avanti();
			});
		}
		//---
	});
	
	//handler cambio ora di partenza
	//il widget timedropper non risponde all'evento change
	//$("#hour").on('change',function() {
	$('#td-clock-0').on('click',function() {
		//controlla che la data non sia antecedente alla data di oggi
		//console.log( $("#departure").val());
		var errore = '';
		var verificaInput = controllaDataOraPartenza();
		switch (verificaInput) {
    case 0:
			swfreccia = 1; //va tutto bene
			break;
    case 1:
			swfreccia = 0; //data passata
			break;
    case 2: //data odierna ora passata
			swfreccia = 0;
			errore = "l'ora inserita e' antecedente a quella attuale";
			$("#hour").select().focus();
			break;		 
    case 3: // questa condizione si può presentare solo in caso di ente diverso da Estar
			swfreccia = 0; //data oltre il limite ammesso di una settimana dal momento della prenotazione
			errore = "E' possibile prenotare solo per la settimana successiva rispetto all'attuale";
			$("#departure").select().focus();
			break;			   
		default:
			swfreccia = 1;
		}
		//---
		if (swfreccia == 0)
		{
			$("#error_ora_partenza").html(errore);
			//---
			$("#freccia").html("<img src='../img/booking/freccia_off.png' />");
		}
		else
		{
			$("#error_ora_partenza").html("");
			//---
			$("#departure").change(); //simulo evento cambio data di partenza
			//---
			$("#freccia").html("<a href=\"#\" id=\"step2\"><img src='../img/booking/freccia.png' title=\"vai allo step 2\" alt=\"vai allo step 2\"></a>");
			$("#step2").click(function () {
				avanti();
			});
		}
		//---
	});
	
	//handler cambio ora di ritorno
	//il widget timedropper non risponde all'evento change
	//$("#hour_2").on('change',function() {
	$('#td-clock-1').on('click',function() {
		//controlla che la data non sia antecedente alla data di oggi
		//console.log( $("#hour_2").val());
		var errore = '';
		var verificaInput = controllaDataOraRitorno();
		switch (verificaInput) {
    case 0:
			swfreccia = 1; //va tutto bene
			break;
    case 1:
			swfreccia = 0; //data passata
			break;
    case 2: //data odierna ora passata
			swfreccia = 0;
			errore = "l'ora di ritorno inserita e' antecedente a quella di partenza";
			$("#hour_2").select().focus();
			break;
		default:
			swfreccia = 1;
		}
		//---
		if (swfreccia == 0)
		{
			$("#error_ora_ritorno").html(errore);
			//---
			//$("#freccia").html("<img src='../img/booking/freccia_off.png' />");
		}
		else
		{
			$("#error_ora_ritorno").html("");
			//---
			$("#departure").change(); //simulo evento cambio data di partenza
			//---
			/*
			$("#freccia").html("<a href=\"#\" id=\"step2\"><img src='../img/booking/freccia.png' title=\"vai allo step 2\" alt=\"vai allo step 2\"></a>");
			$("#step2").click(function () {
				avanti();
			});
			*/
		}
		//---
	});

		/*
		$("#freccia").html("<a href=\"#\" id=\"step2\"><img src='../img/booking/freccia.png' title=\"vai allo step 2\" alt=\"vai allo step 2\"></a>");

		$("#step2").click(function () {
			avanti();
		});
		*/
	
    //controllo coerenza formale di date e orari di partenza e ritorno
    //prima controllo al change del campo data
    $("#departure_2").change(function () {
			//controlla che la data di ritorno non sia antecedente alla data di partenza
			//console.log( $("#departure").val());
			var errore = '';
			var verificaInput = controllaDataOraRitorno();
			//console.log( verificaInput);
			switch (verificaInput) {
			case 0:
				swfreccia = 1; //va tutto bene
				break;
			case 1:
				swfreccia = 0; //data passata
				errore = "La data di ritorno inserita e' antecedente alla data di partenza";
				$("#departure_2").select().focus();
				break;
			case 2: //data odierna ora passata
				swfreccia = 0;
				break;
			case 3: //data successiva alla prossima giornata lavorativa (solo per estar)
				swfreccia = 0;
				errore = "Si puo' prenotare l'auto solo per un massimo di 2 giorni consecutivi (giorno partenza e successivo).";
				//$("#departure_2").val($("#departure").val())
				$("#departure_2").select().focus();
				console.log('errore 3');
				break;		
			default:
				swfreccia = 1;
			}
			//---
			if (swfreccia == 0)
			{
				$("#error_data_ritorno").html(errore);
				//---
				//$("#freccia").html("<img src='../img/booking/freccia_off.png' />");
			}
			else
			{
				$("#error_data_ritorno").html("");
				//---
				$('#td-clock-0').click();	//simulo l'evento click sull'ora di partenza
				//---
				/*
				$("#freccia").html("<a href=\"#\" id=\"step2\"><img src='../img/booking/freccia.png' title=\"vai allo step 2\" alt=\"vai allo step 2\"></a>");
				$("#step2").click(function () {
					avanti();
				});
				*/
			}


		//--- codice precendete alla modifica sovrastante
        var giorno1 = $("#departure").val();
        var orario1 = $("#hour").val();
        var giorno2 = $("#departure_2").val();
        var orario2 = $("#hour_2").val();
		console.log("sono qui!!");
//		console.log("#departure:".giorno1);
//		console.log("#departure_2:".giorno2);

        $.ajax({
            type: 'POST',
            url: '../php/booking/controlladateorari.php',
            data: {giorno1: giorno1, orario1: orario1, giorno2: giorno2, orario2: orario2},
            success: function (data) {
                var controllo = $.parseJSON(data);
                //se non ci sono errori metto spunta verde
//alert('ajax');
console.log('controlladateorari:'+controllo);
                if (controllo == 0) {
                    $("#freccia_3").html("<a href=\"#\"><img src='../img/booking/spunta.png' id=\"spunta_ok\" title=\"vai alla scelta macchina\" alt=\"vai alla scelta macchina\"></a>");
                    //scrivo la prenotazione su db
                    $("#spunta_ok").one("click", function () {
                        var comune = $("#comune").val();
                        var indirizzo = $("#indirizzo").val();
                        $.ajax({
                            type: 'POST',
                            url: '../php/booking/addprenotazione_1.php',
                            data: {
                                giorno1: giorno1,
                                orario1: orario1,
                                comune: comune,
                                indirizzo: indirizzo,
                                giorno2: giorno2,
                                orario2: orario2
                            },
                            success: function (response) {
                                if (response == 1) {
                                    location.href = 'step2.html';
                                }
                                else {
                                    //TODO: In caso di errore
                                }
                            }
                        });
                    });
                }
                //altrimenti metto spunta grigia
                if (controllo == 1) {
                    $("#freccia_3").html("<img src='../img/booking/spunta_grigia.png' alt=\"sono presenti errori\">");
                }
            }
        });


    });


    //poi replico lo stesso controllo sul campo ora
    $('.td-overlay, .td-clock, .td-select').on('touchmove touchend mousemove mouseup', function(event){
			//---
      event.preventDefault();
			//---
			var giorno1 = $("#departure").val();
			var orario1 = $("#hour").val();
			var giorno2 = $("#departure_2").val();
			var orario2 = $("#hour_2").val();
			//---
			$.ajax({
        type: 'POST',
        url: '../php/booking/controlladateorari.php',
        data: {giorno1: giorno1, orario1: orario1, giorno2: giorno2, orario2: orario2},
        success: function (data) {
            var controllo = $.parseJSON(data);
            //se non ci sono errori metto spunta verde
            if (controllo == 0) {
                $("#freccia_3").html("<a href=\"#\"><img src='../img/booking/spunta.png' id=\"spunta_ok\" title=\"vai alla scelta macchina\" alt=\"vai alla scelta macchina\"></a>");

                //scrivo la prenotazione su db
                $("#spunta_ok").click(function () {
                    var comune = $("#comune").val();
                    var indirizzo = $("#indirizzo").val();
                    $.ajax({
                        type: 'POST',
                        url: '../php/booking/addprenotazione_1.php',
                        data: {
                            giorno1: giorno1,
                            orario1: orario1,
                            comune: comune,
                            indirizzo: indirizzo,
                            giorno2: giorno2,
                            orario2: orario2
                        },
                        success: function (response) {

                            if (response == 1) {
                                location.href = 'step2.html';
                            }
                            else {
                                //TODO: In caso di errore
                            }
                        }
                    });


                });

            }
            //altrimenti metto spunta grigia
            if (controllo == 1) {
                $("#freccia_3").html("<img src='../img/booking/spunta_grigia.png' alt=\"sono presenti errori\">");

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
            source: '../php/lista_comuni.php'
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
                    url: '../php/booking/controllacomune.php',
                    data: {comune: comune},
                    success: function (data) {
                        var numerocomuni = $.parseJSON(data);
                        var quanti_comuni = numerocomuni['dimensione'];


                        if (quanti_comuni > 0) {
                            $("#freccia_2").html("<a href=\"#\" id=\"step3\"><img src='../img/booking/freccia.png' title=\"vai allo step 3\" alt=\"vai allo step 3\"></a>");
                            $("#step3").click(function () {
                                $('#departure_2').val($('#departure').val())
                                $("#hour_2").val($("#hour").val());
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

});




