$(document).ready(function () {
    $.ajax({
        type: "GET",
        cache: false,
        url: "php/lista_auto4.php",
        success: function (data) {
            var lista = $.parseJSON(data);
            var quanti = lista['dimensione'];
            var tabellasch = "" +
                "<thead>" +
                "<tr>" +
                "<th>Sede</th>" +
                "<th>Targa</th>" +
                "<th>Marca</th>" +
                "<th>Modello</th>" +
                "<th>N. locale</th>" +
                "<th>Alimentazione</th>" +
                "<th>Cilindrata</th>" +
                "<th>Da</th>" +
                "<th>A</th>" +
                "</tr>" +
                "</thead>" +
                "<tfoot>" +
                "<tr>" +
                "<th>Sede</th>" +
                "<th>Targa</th>" +
                "<th>Marca</th>" +
                "<th>Modello</th>" +
                "<th>N. locale</th>" +
                "<th>Alimentazione</th>" +
                "<th>Cilindrata</th>" +
                "<th>Da</th>" +
                "<th>A</th>" +
                "</tr>" +
                "</tfoot><tbody>";
            for (var i = 0; i < quanti; i++) {
                var idautosch = lista[i]['id_auto'];
                tabellasch += "<tr>" +
                    /*"<td hidden>" + lista[i]['cod_comune'] + "</td>" +*/
                    "<td>" + lista[i]['ind_sede'] + "</td>" +
                    "<td>" + lista[i]['targa'] + "</td>" +
                    "<td>" + lista[i]['marca'] + "</td>" +
                    "<td>" + lista[i]['modello'] + "</td>" +
                    "<td>" + lista[i]['numero_auto_locale'] + "</td>"	+	//todo VERIFICARE SE DEBBA ESSERE ANNO O ANNO_IMM
                    "<td>" + lista[i]['alimentazione'] + "</td>" +
                    "<td>" + lista[i]['cilindrata'] + "</td>" +
					"<td>" + lista[i]['giornoita_da'] + "</td>" +
                    "<td>" + lista[i]['giornoita_a'] + "</td></tr>";
                                
			            }
            tabellasch += "</tbody></table>";
            $('#tabella_macchina_4').html(tabellasch);
            $('#tabella_macchina_4').DataTable();
        }
		
		

});
	});