$(document).ready(function() {

//popolo la select per la compagnia fornitrice	



	
//cerco i dati dell'auto in sessione	
	$.ajax({
	type: "POST",
	url: "php/get_auto_session.php",
	success: function(data){
		console.log(data);
	var lista = $.parseJSON(data);
	var id_auto = lista['id_auto'];
    var dati_auto = lista['dati_auto'];
    var alimentazione = lista['alimentazione'];

	//carico la form e stampo i dati sui campi
   			$.get("manutenzione_officina_add.html",function(data2){
			$('#bodyins_officina').html(data2);
			$('#id_auto').val(id_auto);
			$('#alimentazione').val(alimentazione);
			
	//pulsante di ritorno alla tabella
	$('#tornatabella_manutenzione_officina').click(function(){
	//popolo la prima delle 5 sezioni con la tabella
	$('#officina').load("tabella_manutenzione_officina.html");
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
var officina=$("[name=officina]").val();
var stazione=$("#stazione").val();
var importo=$("#importo").val();
var dataora_da=$("#dataora_man_da").val();
var dataora_a=$("#dataora_man_a").val();
var num_fattura=$("#num_fattura").val();
var tipo_intervento=$("#tipo_intervento").val();


	$.ajax({
    type:'POST',
    url:'php/nuova_manutenzione_officina.php',
    data:'id_auto='+id_auto+'&officina='+officina+'&dataora_da='+dataora_da+'&importo='+importo+'&dataora_a='+dataora_a+'&num_fattura='+num_fattura+'&tipo_intervento='+tipo_intervento,
    success: function(response){

	/**var successo="<div class=\"modal-dialog\"><div class=\"modal-content\"><div class=\"modal-header\">"+
      "<h4 class=\"modal-title\"><img src=\"img/manutenzione/benzina_small.png\" /> Nuova Manutenzione</h4></div><div class=\"modal-body\">"+
      "<img src=\"img/burningwheel.png\" /> Manutenzione correttamente registrato</div>"+
      "<div class=\"modal-footer\"><button type=\"button\" class=\"btn btn-default\" id=\"chiudifinestra2\" data-dismiss=\"modal-dialog\">Chiudi finestra</button></div></div>";

	  $('#myModalregman').html(successo);
	**/

	  $('#myModalregmanManutenzione').fadeIn(1000);
	  //$('#myModalregman').fadeIn();


	  //chiudo il fade in nella opener
	  $("#chiudifinestraManutenzione").click(function(){
	  $('.modal-backdrop').remove();
	  $('body').removeClass('modal-open');
	  $('#myModalregmanManutenzione').fadeOut();
	  $("#officina",window.opener).load("tabella_manutenzione_officina.html");
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

