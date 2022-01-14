$(document).ready(function() {

$(document).on('submit','#loginform',function(){

var matricola=$("#matricola").val();
var psw=$("#password").val();

$.ajax({
	type: "POST",
	url: "php/login.php",
	data:'matricola='+matricola+'&psw='+psw
});
});

});