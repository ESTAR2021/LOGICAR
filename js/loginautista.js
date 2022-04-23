$(document).ready(function()
{
	
  $(document).on('click', '#form-submit', function()
  {
    var cf = $("#cf").val();
    var psw = $("#password").val();
    $.ajax(
    {
      type: "POST",
      url: "php/loginautista.php",
      data: 'cf=' + cf + '&psw=' + psw,
      success: function(data)
      {
        //console.log(data);
        switch (data)
        {
          case '1':
            location.href = 'booking/home.html';
            break;
          case '3':
            location.href = 'booking/cambia_psw.html';
            break;
          case '2':
            location.href = 'booking/avvisi_mail.html';
            break;
          case '4':
            location.href = 'booking/registro_chiavi.html';
            break;
          default:
            $('#errore').fadeIn();
            break;
        }
      }
    });
  });
	
  $(document).on('click', '#procedi_cambio', function()
  {
    var cf = $("#cf").val();
    var psw_vecchia = $("#psw_vecchia").val();
    var psw_nuova = $("#psw_nuova").val();
    var psw_ripeti = $("#psw_ripeti").val();
    $.ajax(
    {
      type: "POST",
      url: "../php/cambia_psw.php",
      data:
      {
        cf: cf,
        psw_vecchia: psw_vecchia,
        psw_nuova: psw_nuova,
        psw_ripeti: psw_ripeti
      },
      success: function(data)
      {
        console.log(data);
        $('#errore_credenziali').fadeOut();
        $('#errore').fadeOut();
        switch (data)
        {
          case '0':
            $('#errore_credenziali').fadeIn();
            break;
          case '1':
            $('#errore').fadeIn();
            break;
          case '2':
            location.href = '../login.html';
            break;
        }
      }
    });
  });
	
  
	
});
