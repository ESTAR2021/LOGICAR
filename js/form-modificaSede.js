//funzioni per modificare una sede
$(document).ready(function (){
        //Recupera le option della select per le province
        /*var id_sede=$('.id_sede').val();
        $('.azienda').val(azienda_data["azienda"]);
        $('.id_azienda').val(azienda_data["id"]);*/
        //var datiSede = {};
        /*$.ajax({
            type: "POST",
            url: "php/get_sede.php",
            data: {id_sede:id_sede},
            success: function(data){
                datiSede = $.parseJSON(data);
                //$("#provincia_edit").html(data);
                //$("#comuni").html("<option value=\"\">Scegli prima la provincia</option>");
            }
        });*/
        //$('#tipo_edit').val(datiSede['tiposede']);
        //$('#tipo_edit').prop('disabled',true);
        /*var menu = "";
        for (key in Object.keys(locations)) {
            menu += "<option value=\"" + Object.keys(locations)[key] + "\">" + Object.keys(locations)[key] + "</option> ";
        }
        $('.provincia').html(menu);*/

        /*$.ajax({
            type: "POST",
            url: "php/get_provincia.php",
            success: function(data){
                $(".provincia_edit").html(data);
                //$(".comuni_edit").html("<option value=\"\">Scegli prima la provincia</option>");
            }
        });*/
        /*/recupera le option della select per le ASL
         $.ajax({
         type: "POST",
         url: "php/get_azienda.php",
         success: function(data){
         $("#asl").html(data);
         }
         });*/

    }
);

$("#sede_mod").validator().on("submit", function (event) {
    if (event.isDefaultPrevented()) {
        //i campi non sono a posto: stampa messaggio errore
        //nascondo subito la modale
        $('#myModalmodSede').html('');
        //formError();
        submitMSG(false, "Non hai compilato i campi richiesti");
    } else {
        //i campi sono a posto
        event.preventDefault();
        submitForm();
    }
});

//recupera i comuni appartenenti ad una singola provincia (onChange)
function getComuni(val) {

    $.ajax({
        type: "POST",
        url: "php/get_comuni.php",
        data: {'provincia_sel': val},
        success: function (data) {
            $(".comuni_edit").html(data);
        }
    });
}


function submitForm(){
    var id_sede=$("#id_sede_edit").val();        //val numerico
    var tipo=$("#tipo_edit").val();              //val testuale
    var asl=$("#asl_edit").val();                //val numerico
    var prov=$("#provincia_edit").val();         //val testuale
    var com=$("#comuni_edit").val();             //val numerico
    var ind=$("#indirizzo_edit").val();          //val testuale

    $.ajax({
        type:'POST',
        url:'php/edit_sede.php',
        data:{id_sede:id_sede,tipo:tipo,prov:prov,com:com,ind:ind},
        success: function(data){

            var successo = "" +
                "<div class=\"modal-dialog\">" +
                "   <div class=\"modal-content\">" +
                "       <div class=\"modal-header\">" +
                "           <button type=\"button\" class=\"close\" data-dismiss=\"modal\"></button>" +
                "           <h4 class=\"modal-title\"><img src=\"img/wheel.png\" /> Aggiornamento Sede</h4>" +
                "       </div>" +
                "   <div class=\"modal-body\">" +
                "       <img src=\"img/burningwheel.png\" /> Operazione eseguita correttamente " +
                "   </div>" +
                "   <div class=\"modal-footer\">" +
                "       <button type=\"button\" class=\"btn btn-default\" id=\"chiudifinestra\" onclick=\"location.reload(true)\">Chiudi finestra</button>" +
                "   </div>" +
                "</div>";

            if ($('.form-submit').html() == "Modifica") {
                //Si popola il contenuto della modale di conferma
                $("#div-modifica_sede").html(successo);
            }

            //chiudo il fade in nella opener
            $("#chiudifinestra").click(function(){
                $('.modal-backdrop').remove();
                $('body').removeClass('modal-open');
                $("#div-nuova_sede").html('')
                $("#div-modifica_sede").html('')
                $("#partesede",window.opener).load("tabella_sede.html");
                $("#secondaparte",window.opener).load("tabella_auto2.html");
            });

        }

    });
}

/*function formSuccess(){
    $("#automobile_mod")[0].reset();
    submitMSG(true, "Registrazione completata")
}

function formError(){
    $("#automobile_mod").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
        $(this).removeClass();
    });
}*/

function submitMSG(valid, msg){
    if(valid){
        var msgClasses = "h3 text-center tada animated text-success";
    } else {
        var msgClasses = "h3 text-center text-danger";
    }
    $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
}
