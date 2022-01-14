<?php

//mi connetto al db
include 'require_conn.php';

//inizializzo la select con la prima option non cliccabile
echo "  <option value=\"\">Scegli Azienda</option>";
//leggo i valori

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $statement = $conn->prepare("SELECT id,azienda FROM `aziende` ORDER BY `azienda` ASC");
    $statement->execute();

    while ($row = $statement->fetch()) {
        //ritorno i dati per popolare la select
        echo "<option value=" . $row['id'] . ">" . $row['azienda'] . "</option>";
    }

} catch (Exception $e) {
    return $e->getMessage(); //return exception
}
?>
