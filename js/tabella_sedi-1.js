$(document).ready(function() {


    $('#aggiungiNuovaSede').click(function(){
    //popolo la parte sede delle 3 sezioni con la form per inserimento modello
        $('#partesede').load("sede.html");
    });
})