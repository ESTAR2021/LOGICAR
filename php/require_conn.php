<?php

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "logicar";


define("HTML_RESP", "html");
define("JSON_RESP", "json");
/**
 * MAIN Error Funcion:
 * - Restituisce al client una pagina con errore 500 Internal Server Error
 * @param $message String - Messaggio da restituire al client
 * @param $type String TEXT_RESP|JSON_RESP valore di default è TEXT_RESP
 * @param $error_code Integer codice
 */
function returnError($message, $type = HTML_RESP, $error_code = 0)
{
    //Setto gli header con il codice di errore HTTP
    header("HTTP/1.1 500 Internal Server Error");
//Setto il tipo di contenuto in base al tipo di chiamata di funzione
    header("Content-Type: application/$type; charset=UTF-8");

    $page = "Errore generico: $message";

    /**
     * Termino l'esecuzione della pagina php che ha chiamato tale funzione restituendo
     * il tipo di risposta Testuale (HTML_RESP) oppure json (JSON_RESP) richiesto
     */
    die(($type === JSON_RESP)
        ? json_encode(array(
            'message' => $message,
            'code' => $error_code))
        : $page);

}
?>
