/**
 * Parametro random utile a risolvere il problema del recupero dinamico
 * dei file javascript dalla cache
 */
var rnd = Math.floor(Math.random() * 8000);

// popolo subito la select con le marche..
$(document).ready(function () {

    $.ajax({
        type: "GET",
        url: "php/get_nomeAzienda.php",
        success: function (data) {
            //Se la sessione è scaduta, reindirizza al Login altrimenti scarica i dati dell'azienda
            //todo verificare se è necessaria una migliore location per l'impostazione dei dati e redirect
            if(data != "error") {
                azienda_data = $.parseJSON(data);
            }
            else {
                window.location.replace("login.html");
            }
            $('.azienda').html(azienda_data['azienda'])
        }
    });
    App.loadJsFile('js/bootstrap-notify.min.js');

    var url = 'menu.html';
//popolo il menu via include sul div principale
    $("#menu").load(url);

    $(document).on('click', 'a', function () {
        switch ($(this).attr('href')) {
            case '#primaparte':
                url = "tabella_auto.html";
                break;
            case '#partesede':
                url = "tabella_sede.html";
                break;
            case '#secondaparte':
                url = "tabella_auto2.html";
                break;
            case '#terzaparte':
                url = "tabella_auto3.html";
                break;
		    case '#quartaparte':
                url = "tabella_auto4.html";
                break;
        }

        $parte = $($(this).attr('href'));
        $.ajax({
            url: url,
            cache: false,
            type: 'GET',
            success: function (data) {
                //$('.panel-collapse').html('');
                $parte.html(data);
            }
        });
    });



});
