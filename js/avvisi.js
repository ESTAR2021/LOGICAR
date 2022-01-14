/**
 * Created by anna on 05/09/2016.
 */

//modale per avanzamento step
$(document).ready(function() {
	
	
		
	$.ajax({
		type:'GET',
		url:'../php/checksession.php',
		success: function(data) {
			if(data==0){
				location.href='../login.html';
			}
		}
	});
	//attivo la modale al document ready per visualizzare lo step
	$.ajax({
		type:'GET',
		url:'../php/booking/getNumeroAvvisi.php',
		success: function(data) {
			if(data==0){
				$('#titolo_avvisi').html("Non sono presenti AVVISI");
			}else
			for (var i = 1; i <= data; i++) {
				if(i==1){
					$('.pagination').append('<li class="pagina active"><a href="#" >'+i+'</a></li>');
				}else{
					$('.pagination').append('<li class="pagina"><a href="#" >'+i+'</a></li>');
				}
			}
		}
});

	$.ajax({
		type:'GET',
		url:'../php/booking/getMail.php',
		success: function(data) {
			$('#email_da_aggiungere').val(data);
		}
});
$(document).on('click', '#aggiorna_mail', function(){
	$('#email_da_aggiungere_errore').fadeOut();
	$('#email_aggiornata').fadeOut();
	var aggiorna_mail=$('#email_da_aggiungere').val();
		$.ajax({
		type:'POST',
		data:{aggiorna_mail:aggiorna_mail },
		url:'../php/booking/setMail.php',
		success: function(data) {
			if(data!='-1'){
				$('#email_da_aggiungere').val(data);
				$('#email_da_aggiungere_errore').fadeOut();
				$('#email_aggiornata').fadeIn();
			}else{
				$('#email_da_aggiungere_errore').fadeIn();
				$('#email_aggiornata').fadeOut();
			}
		}
});
	
})


	$.ajax({
		type:'POST',
		url:'../php/booking/getAvvisiByPagination.php',
		data:'pagina='+1,
		success: function(data) {
			var riepilogo = $.parseJSON(data);
			for (var i = 0; i <riepilogo['dimensione']; i++) {
		console.log(riepilogo);
				document.getElementById("testo_avviso_"+i).innerHTML=riepilogo[i]['avviso'];
				document.getElementById("id_avviso_"+i).value=riepilogo[i]['id'];
				document.getElementById("avviso_"+i).style.display = 'block';
			}
			$('.loader').fadeOut();
		}
	});
	$(document).on('click','.letto', function(){
	
		var avviso=$(this).parents('.row').find('.id_avviso').val();

		$.ajax({
			type:'POST',
			url:'../php/booking/set_avviso_letto.php',
			data:'avviso='+avviso,
			success: function(data){

			location.reload();
			}
			
	});
	});

	$(document).on('click','.pagina', function(){
		$('.loader').fadeIn();
		var pagina=$(this).find('a').html();
		
		$('.active').removeClass('active');
		$(this).addClass('active');
		$.ajax({
			type:'POST',
			url:'../php/booking/getAvvisiByPagination.php',
			data:'pagina='+pagina,
			success: function(data) {
				var riepilogo = $.parseJSON(data);
				for (var i = 0; i <5; i++) {
					document.getElementById("testo_avviso_"+i).innerHTML='';
					document.getElementById("id_avviso_"+i).value='';
					document.getElementById("riep_"+i).style.display =  "none";
				}
				for (var i = 0; i <riepilogo['dimensione']; i++) {
					document.getElementById("testo_avviso_"+i).innerHTML=riepilogo[i]['avviso'];
					document.getElementById("id_avviso_"+i).value=riepilogo[i]['id'];
					document.getElementById("avviso_"+i).style.display = 'block';
				}
				$('.loader').fadeOut();
			}
		});
	} );

});


