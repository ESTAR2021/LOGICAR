function getModello(val) {
	$.ajax({
	type: "POST",
	url: "get_modello.php",
	data:'marca_id='+val,
	success: function(data){
		$("#modello").html(data);
	}
	});
}

$("#automobile").validator().on("submit", function (event) {
    if (event.isDefaultPrevented()) {
        // handle the invalid form...
        formError();
        submitMSG(false, "Non hai compilato i campi richiesti");
    } else {
        // everything looks good!
        event.preventDefault();
        submitForm();
    }
});


function submitForm(){

var marca=$("#marca").val();
var modello=$("#modello").val();
var cilindrata=$("#cilindrata").val();
var potenza=$("#potenza").val();
var alimentazione=$("#alimentazione").val();
var anno=$("#anno").val();
var note=$("#note").val();

    
$.ajax({
    type:'POST',
    url:'php/nuova_auto.php',
    data:'marca='+marca+'&modello='+modello+'&cilindrata='+cilindrata+'&potenza='+potenza+'&alimentazione='+alimentazione+'&anno='+anno+'&note='+note,
    success: function(response){
var successo="<div class=\"modal-dialog\"><div class=\"modal-content\">"+
   "<div class=\"modal-header\"><button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>"+
    "<h4 class=\"modal-title\">Nuova auto</h4></div><div class=\"modal-body\"><img src=\"img/burningwheel.png\"><p>Auto correttamente inserita</p>"+
   "</div><div class=\"modal-footer\"><button type=\"button\" onclick=\"javascript:window.location.reload()\" class=\"btn btn-default\" data-dismiss=\"modal\">Chiudi</button>"+
   "</div></div></div></div>";
$('#myModal').html(successo);
      }
    });
}



function formSuccess(){
    $("#automobile")[0].reset();
    submitMSG(true, "Message Submitted!")
}

function formError(){
    $("#automobile").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
        $(this).removeClass();
    });
}

function submitMSG(valid, msg){
    if(valid){
        var msgClasses = "h3 text-center tada animated text-success";
    } else {
        var msgClasses = "h3 text-center text-danger";
    }
    $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
}