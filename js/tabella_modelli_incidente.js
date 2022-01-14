$(document).ready(function() {

//popolo il menu via include sul div principale
$("#menu").load("menu.html"); 

$.ajax({
	type: "GET",
	url: "php/lista_auto_modelli_manut.php",
    success: function(data) {
	var lista = $.parseJSON(data);
	var quanti=lista['dimensione'];
	var tabellasch="<thead><tr><th>Marca</th><th>Modello</th>"+
                "<th>Cilindrata</th><th>Alimentazione</th><th>Targa</th><th>Colore</th><th>Operazioni</th><</tr></thead>"+
				"<tfoot><tr><th>Marca</th><th>Modello</th>"+
                "<th>Cilindrata</th><th>Alimentazione</th><th>Targa</th><th>Colore</th><th>Operazioni</th></tr></tfoot><tbody>";
for(var i=0;i < quanti;i++){
	var idautosch=lista[i]['id_auto'];
	tabellasch+="<tr><td>"+lista[i]['marca']+"</td><td>"+lista[i]['modello']+"</td><td>"+lista[i]['cilindrata']+"</td><td>"+lista[i]['alimentazione']+"</td><td>"+lista[i]['targa']+"</td><td>"+lista[i]['colore']+"</td><td>";

	tabellasch+=" <button type=\"button\" id=\"aprincidente"+lista[i]['idparco']+"\" class=\"btn btn-danger aprincidente\" data-id=\""+lista[i]['idparco']+"\" data-marca=\""+lista[i]['marca']+"\" data-modello=\""+lista[i]['modello']+"\" data-alimentazione=\""+lista[i]['alimentazione']+"\" data-targa=\""+lista[i]['targa']+"\"><span class=\"glyphicon glyphicon-warning-sign\" aria-hidden=\"true\"></span>  Segnala incidente</button>";	
	
	}
tabellasch+="</tbody></table>";




    $('#tabella_macchina_3').html(tabellasch);

	
	//inserimento nuovo incidente
$('.aprincidente').click(function(event){
	//var button = $(event.relatedTarget);
	var id_auto=$(this).attr('data-id');
	var marca=$(this).attr('data-marca');
	var modello=$(this).attr('data-modello');
	var targa=$(this).attr('data-targa');
	var alimentazione=$(this).attr('data-alimentazione');
//chiamo la pagina php che avvia la sessione
$.ajax({
	type:'POST',
	url:'php/functions/avviasessione.php',
	 data:{id_auto:id_auto, marca:marca, modello:modello,targa:targa,alimentazione:alimentazione},
	 success: function() {
		window.location.replace("scheletro_incidente.html");
	}
})

});


 }/**,
 
 error: function(xhr, desc, err) {
 alert("Dettagli: " + desc + "\nError:" + err);
 }**/
});


});

