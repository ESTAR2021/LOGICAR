<?php
$date = "2011-06-14";
$newdate = strtotime ( '-5 day' , strtotime ( $date ) ) ; // facciamo l'operazione
$newdate = date ( 'Y-m-d' , $newdate ); //trasformiamo la data nel formato accettato dal db YYYY-MM-DD

echo $newdate;
?>