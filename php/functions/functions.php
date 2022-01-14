<?php
//funzioni per riformattare la data
function reformatDate($date, $from_format = 'd/m/Y', $to_format = 'Y-m-d') {
    $date_aux = date_create_from_format($from_format, $date);
    return date_format($date_aux,$to_format);
}


function reformatDateEN($date, $from_format = 'd/m/Y', $to_format = 'm/d/Y') {
    $date_aux = date_create_from_format($from_format, $date);
    return date_format($date_aux,$to_format);
}

function reformatHour($hour) {
return date("H:i", strtotime($hour));
}
?>