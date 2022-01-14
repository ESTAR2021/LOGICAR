<?php

//mi connetto al db
include 'require_conn.php';

//inizializzo la select con la prima option non cliccabile
echo "  <option value=\"\">Scegli provincia</option>";
//leggo i valori
try {
   $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
	//Si considera sia la colonna provincia che la colonna metropolitana (in corrispondenza della quale la provincia è null)
   $statement = $conn->prepare("(SELECT distinct provincia FROM comuni_italiani) UNION \n"
								. "(SELECT distinct metropolitana FROM comuni_italiani) ORDER BY provincia");
   $statement->execute();
   while($row=$statement->fetch()){
	   //ritorno i dati per popolare la select
	   echo "<option value=" . utf8_encode($row['provincia']) . ">". utf8_encode($row['provincia']) . "</option>";
   }
}
catch (Exception $e){
	return $e->getMessage(); //return exception
}
?>
