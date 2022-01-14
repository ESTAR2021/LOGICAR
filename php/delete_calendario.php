<?php

//recupero i dati
$id=$_POST['id'];
$tipo=$_POST['tipo'];


session_start();
$azienda_ute = $_SESSION['asl'];
include 'require_conn.php';

//scrivo i valori

try {
		   $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
           $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            if($tipo=='nota'){
                $sql = "DELETE FROM  calendario WHERE id='$id' and id_azienda='$azienda_ute' ";
            }else{
                $sql = "INSERT INTO `calendario_non_visibile`( `id_evento`, `tipo_evento`,`id_azienda`) VALUES ('$id','$tipo','$azienda_ute')";
            }

    $conn->exec($sql);
echo $sql;
    }
catch(PDOException $e)
    {
    echo $sql . "<br>" . $e->getMessage();
    }

$conn = null;

?>