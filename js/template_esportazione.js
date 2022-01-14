$(document).ready(function() {
    $.ajax({
        type:'GET',
        url:'../php/booking/getNumeroPrenotazioniDaApprovare.php',
        success: function(data) {

        }
    });

    $.ajax({
        type:'POST',
        url:'../php/booking/getRiepilogoByPaginationDaApprovare.php',
        data:'pagina=1',
        success: function(data) {


        }
    });

    $(document).on('click', '.approva', function(){
        var stato='1';
        var identificativo=$(this).parents('.row').find('.identificativo').val();
        $.ajax({
            type:'POST',
            url:'../php/booking/update_stato_viaggio.php',
            data:{identificativo: identificativo, stato:stato},
            success: function(data) {


            }
        });

    }) .on('click','.pagina', function(){
        var pagina=$(this).find('a').html();

        $('.active').removeClass('active');
        $(this).addClass('active');
        $.ajax({
            type:'POST',
            url:'../php/booking/getRiepilogoByPaginationDaApprovare.php',
            data:{pagina: pagina},
            success: function(data) {

            }

        });
    });
});


