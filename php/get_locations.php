<?php
/**
 * Created by PhpStorm.
 * User: paolo
 * Date: 05/10/2016
 * Time: 15:31
 *
 */

//Connessione al db
include 'require_conn.php';

$hierarchy = array();
//Query al db
try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    //Costruisco un dizionario dei comuni
    $query_province="SELECT DISTINCT provincia,codice,denominazione FROM comuni_italiani WHERE regione='Toscana' ORDER BY provincia";
    $statement_province = $conn->prepare($query_province);
    $statement_province->execute();
    //Recupero tutti i dati in un array
    $array_province = $statement_province->fetchAll();
    //Inizializzo l'array
    foreach ($array_province as $el){
        $hierarchy[utf8_encode($el[0])]=array();        //é necessario utf8_encode?
    }
    //Memorizzo la gerarchia Provincia->Comune in un array multidimensionale con opportuna codifica UTF-8 delle chiavi
    foreach ($array_province as $el){
        $hierarchy[utf8_encode($el[0])][$el[1]] = utf8_encode($el[2]);
    }
    //Codifico in JSON l'output
    echo json_encode($hierarchy);
}
catch (Exception $e){
    return $e->getMessage(); //return exception
}


/*Stampa dei comuni
    print "I comuni sono:<br>";
    foreach (array_keys($hierarchy) as $el){
            print "Provincia di ".$el."<br>";
            foreach (array_keys($hierarchy[$el]) as $er){
                print $hierarchy[$el][$er]."<br>";
            }
            print "------------------<br>";
    }

    Stampa delle province
    print "Le province sono:<br>";
    foreach (array_keys($hierarchy) as $el){
            print $el."<br>";
    }*/
?>


