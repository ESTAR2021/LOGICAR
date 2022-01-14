$(document).ready(function () {
  $.ajax({
	type:'GET',
	url:'../php/booking/get_profilo.php',
	success: function(data) {
		
		if(data==0){
			$('.admin').fadeOut();
			$('.loader').fadeOut(2000);	
		}
		if(data==1){
			$('.operatore').remove();
			$('.loader').fadeOut(2000);	
		}		
				
		}
	});
});