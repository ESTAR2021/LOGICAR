<?php

//recupero i dati
ini_set("error_reporting",0);
if(isset($_POST['identificativo']) and isset($_POST['stato'])) {
    $identificativo = $_POST['identificativo'];
    $chilometraggio = $_POST['chilometraggio'];
    $stato = $_POST['stato'];
    include '../functions/functions.php';
//mi connetto al db
    include '../require_conn.php';

//scrivo i valori
    try {
        $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $sql = "UPDATE viaggi_pianificati 
                SET stato=$stato 
                WHERE idprenotazione=$identificativo";
        $conn->exec($sql);
        if ($conn) {
            session_start();
            $_SESSION['viaggio_iniziato'] = '';
            session_write_close();
        }
        //Se non uso il prepare e setFetchMode le query consecutive non vengono eseguite
        $stmt = $conn->prepare("SELECT id_parco 
                FROM vista_viaggi
                WHERE prenotazione=$identificativo");
        $stmt->execute();
        $stmt->setFetchMode(PDO::FETCH_ASSOC);
        $auto = "";
        if($row = $stmt->fetch()) {
            $auto = $row['id_parco'];
        }
        $stmt = $conn->prepare("INSERT INTO auto.auto_km (id_auto, km, id_viaggio) VALUES ($auto, $chilometraggio, $identificativo)");
        $stmt->execute();
    }

    catch(PDOException $e){
        echo $sql . "<br>" . $e->getMessage();
    }

    $conn = null;
}else{
    echo 0;
}
?>