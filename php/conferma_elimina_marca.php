<?php

//recupero i dati
$id=$_REQUEST['id'];


	//genero la finestra modale bootstrap
    echo "<div class=\"modal-content\"><div class=\"modal-header\">Cancella marca</div><div class=\"modal-body\" id=\"modal-body\"> Sei sicuro di voler cancellare la marca?</div><div class=\"modal-footer\" id=\"modal-footer\"><a class=\"btn btn-danger btn-ok\" a href=\"php/elimina_marca.php?id=$id\" id=\"elimina_marca\" data-toggle=\"modal\" data-target=\"#modal-content\" ;>Prosegui</a> <button type=\"button\" onclick=\"javascript:window.location.reload()\" class=\"btn btn-default\" data-dismiss=\"modal\">Annulla</button></div></div>";
   

?>