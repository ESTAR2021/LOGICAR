$(document).ready(function () {
  var trigger = $('.hamburger'),
      overlay = $('.overlay'),
     isClosed = false;

    trigger.click(function () {
      hamburger_cross();      
    });

    function hamburger_cross() {

      if (isClosed == true) {          
       $('.overlay').hide();
        $('.hamburger').removeClass('is-open');
       $('.hamburger').addClass('is-closed');
        isClosed = false;
      } else {   
        overlay.show();
        trigger.removeClass('is-closed');
        trigger.addClass('is-open');
        isClosed = true;
      }
  }
  
  $('[data-toggle="offcanvas"]').click(function () {
        $('#wrapper').toggleClass('toggled');
  }); 

	//asl di appartenza dell'utente loggato
	var asl = '';
	//---
		$.get("../php/get_asl_sessione.php", function(azienda, status){
		asl = azienda; 
	});  
  
  
  $.ajax({
	type:'GET',
	url:'../php/booking/get_profilo.php',
	success: function(data) {
		
		if(data==0){
			$('.admin').parents('li').remove();
			$('.portineria').parents('li').remove();
		}
		if(data==2){
			$('.admin').parents('li').remove();
		}		
					
		}
	});
	  $.ajax({
	type:'GET',
	url:'../php/booking/get_autenticazione.php',
	success: function(data) {
		
		if(data==1){
			$('.vhr').parents('li').remove();
			
		}
				
					
		}
	});
	
	$('#step1').click(function(event){
		$.get("../php/get_giornosettimana.php", function(data, status){
			if (asl==2 && data > 3) // condizione per AslNO  
			{ 
				alert('Attenzione!!! Non è possibile prenotare il giovedì, venerdì e sabato');
			}
			else
			{
				window.location = 'step1.html';
			}
		});
	});
	
	
	
			
});