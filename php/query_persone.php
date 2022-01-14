<?php

//recupero i dati
ini_set("error_reporting",0);
$matricola=$_POST['matricola'];
$badge=$_POST['badge'];// aggiunta max 
$nome=$_POST['nome'];
$cognome=$_POST['cognome'];
$cognome=addslashes($cognome);
$cf=$_POST['cf'];
$portineria=$_POST['portineria'];
$email=$_POST['email'];
$sede_lavoro=$_POST['sede_lavoro'];
$amministrativo=$_POST['amministrativo'];
$asl=$_POST['asl'];
//$foto=$_POST['foto'];
$tipo=$_POST['tipo'];
define("UPLOAD_DIR", "../uploads/");
//mi connetto al db
include 'require_conn.php';
if(isset($_FILES['foto']))
    {
        $file = $_FILES['foto'];
        if($file['error'] == UPLOAD_ERR_OK and is_uploaded_file($file['tmp_name']))
        {
            move_uploaded_file($file['tmp_name'], UPLOAD_DIR.$file['name']);
        }
    }
//scrivo i valori
$foto='./uploads/uomo.png';
try {
		   $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
           $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
          switch($tipo){
			  case 0:
/*					$sql = "INSERT INTO autisti(nome,cognome,cf,portineria,amministrativo,sede_lavoro,asl,url_foto,email, autista,badge) 
							values('$nome','$cognome','$cf',
							'$portineria','$amministrativo','$sede_lavoro','$asl','$foto','$email','0','$matricola')";*/ 
					$sql = "INSERT INTO autisti(nome,cognome,cf,portineria,amministrativo,sede_lavoro,asl,url_foto,email, autista,badge) 
							values('$nome','$cognome','$cf',
							'$portineria','$amministrativo','$sede_lavoro','$asl','$foto','$email','0','$badge')";	//max	
                    $conn->exec($sql);
                    $lastInsertId=$conn->lastInsertId();
					break;
			  case 1:
             //     $sql = "UPDATE `autisti` SET `nome`='$nome' , `cognome`='$cognome' ,`sede_lavoro`='$sede_lavoro' ,`email`='$email',`portineria`='$portineria',`amministrativo`='$amministrativo', `cf`='$cf', `ASL`='$asl', `url_foto`='$url_foto' WHERE badge='$matricola'";
					$sql = "UPDATE `autisti` SET `nome`='$nome' , `cognome`='$cognome' ,`sede_lavoro`='$sede_lavoro' ,`email`='$email',`portineria`='$portineria',`amministrativo`='$amministrativo', `cf`='$cf', `ASL`='$asl', `url_foto`='$url_foto', `badge`='$badge' WHERE matricola='$matricola'";//max

                  $lastInsertId=$matricola;
                  $conn->exec($sql);
                  break;
		  }

            session_start();

            $matricola_utente=$_SESSION['matricola'];
            $sql_quote= $conn->quote($sql);
            $sql =' INSERT INTO `log_azioni`( `query`, `matricola_utente`, `id_scheda`) VALUES("'.$sql_quote.'" ,"'.$matricola_utente.'","'.$lastInsertId.'")';
            $conn->exec($sql);
     }
catch(PDOException $e)
    {
    echo $sql . "<br>" . $e->getMessage();
    }

$conn = null;
echo 1;

?>