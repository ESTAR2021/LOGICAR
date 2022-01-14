$(document).ready(function() {

//popolo la select per la compagnia fornitrice	



	
//cerco i dati dell'auto in sessione	
	$.ajax({
	type: "POST",
	url: "php/get_auto_session.php",
	success: function(data){
	
	var lista = $.parseJSON(data);
	var id_auto = lista['id_auto'];
    var dati_auto = lista['dati_auto'];
    var alimentazione = lista['alimentazione'];

	//carico la form e stampo i dati sui campi
   			$.get("riserva_add.html",function(data2){
			$('#bodyins_riserva').html(data2);
			$('#id_auto').val(id_auto);

			
	//pulsante di ritorno alla tabella
	$('#tornatabella_riserva').click(function(){
	//popolo la prima delle 5 sezioni con la tabella
	$('#riserva').load("tabella_riserva_auto.html");
	});			
			
		

	
	
	
//registrazione rifornimento
$("#manutenzione_officina").validator().on("submit", function (event) {
    if (event.isDefaultPrevented()) {
        // handle the invalid form...
        formError();

    } else {
        // everything looks good!
        event.preventDefault();
        submitForm();

    }
});

function submitForm(){


var id_auto=$("#id_auto").val();
var dataora_da=$("#dataora_man_da").val();
var dataora_a=$("#dataora_man_a").val();



	$.ajax({
    type:'POST',
    url:'php/nuova_riserva.php',
    data:'id_auto='+id_auto+'&dataora_da='+dataora_da+'&dataora_a='+dataora_a,
    success: function(response){

	  $('#myModalregriserva').fadeIn(1000);
	  //$('#myModalregman').fadeIn();


	  //chiudo il fade in nella opener
	  $("#chiudifinestrariserva").click(function(){
	  //$('.modal-backdrop').remove();
	  //$('body').removeClass('modal-open');
	  //$('#myModalregriserva').fadeOut();
	  $("#riserva",window.opener).load("tabella_riserva_auto.html");
	  });


		
		
      }
	    	  
    });


}


function formError(){
	  $('.modal-backdrop').remove();
	  $('body').removeClass('modal-open');
}

			
			
			});
     
	}
   

	});	
	
});

