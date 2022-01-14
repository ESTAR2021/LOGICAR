<?php
session_start();
//---
if (!isset($_SESSION['amministrativo'])) {	exit; }
if ($_SESSION['amministrativo'] <> '1') {	exit; }
//----
?>

<!DOCTYPE html>
<html>
<head>
<title>DB template</title>
</head>
<body>
<?php
//--- db connect

include '../php/require_conn.php';

$connection = array(
	'host' => 'mysql',
	'server' => $servername,
	'database' => $dbname,
	'username' => $username,
	'password' => $password
);

//--- adodb
include("adodb-5.20.9/adodb5/adodb.inc.php");
$db = NewADOConnection('mysqli');

//--- configurazione
$stampaTabella = true;
$stampaSQL = true;
$stampaDatatables = true;
$nl = '<br>';

//--- connessione al db
$dbserver = $connection['server'];
$dbuser = $connection['username'];
$dbpassword = $connection['password'];	
$dbname = $connection['database'];
$db->Connect($dbserver,$dbuser,$dbpassword,$dbname);

//--- tabelle del database
$tables = $db->metaTables('TABLES');
//print_r($tables);

//--- stampa tabelle
echo "<a name=\"indice\"></a>";
echo "<p><strong>TABELLE</strong></p>";
echo "<table border=\"1\">";
echo "<tr><td>TABELLA</td></tr>";
foreach ($tables as $t)
{
	echo "<tr><td><a href=\"#$t\">$t</a></td></tr>";
}
echo "</table>";
echo "<hr>";

//--- stampa le colonne per ogni tabella
foreach ($tables as $t)
{
	//---
	echo "<a name=\"$t\"></a>";
	//---
	$columns = $db->metaColumns($t);
	//---
	echo "<p><strong>tabella: $t</strong></p>";
	//---- stampa nome e attributi dei campi della tabella
	if ($stampaTabella)
	{
		echo "<table border=\"1\">";
		echo "<tr>";
		echo "<td>name</td>";
		echo "<td>max_length</td>";
		echo "<td>type</td>";
		echo "<td>scale</td>";
		echo "<td>not_null</td>";
		echo "<td>primary_key</td>";
		echo "<td>auto_increment</td>";
		echo "<td>binary</td>";
		echo "<td>unsigned</td>";
		echo "<td>zerofill</td>";
		echo "<td>has_default</td>";
		echo "</tr>";
		foreach ($columns as $c)
		{
			//print_r($c);
			echo "<tr>";
			echo "<td>$c->name</td>";
			echo "<td>$c->max_length</td>";
			echo "<td>$c->type</td>";
			echo "<td>$c->scale</td>";
			echo "<td>$c->not_null</td>";
			echo "<td>$c->primary_key</td>";
			echo "<td>$c->auto_increment</td>";
			echo "<td>$c->binary</td>";
			echo "<td>$c->unsigned</td>";
			echo "<td>$c->zerofill</td>";
			echo "<td>$c->has_default</td>";
			echo "</tr>";
		}
		echo "</table>";
		echo "<br>";
	}
	//---
	//--- stampa SELECT
	if ($stampaSQL)
	{
		echo "<p><strong>SQL</strong></p><br>";
		$st = "SELECT $nl";
		foreach ($columns as $c)
		{
			$st = $st . "$t.$c->name, $nl";
		}
		$st = rtrim($st,", $nl"); //toglie l'ultima virgola e spazio
		$st = $st . "$nl FROM $t";
		echo $st;
		echo "<br>";
		echo "<br>";
	}
	//---
	
	
	
	//--- stampa INSERT
	if ($stampaSQL)
	{
		$st = "INSERT INTO $t (";
		foreach ($columns as $c)
		{
			$st = $st . "$t.$c->name, ";
		}
		$st = rtrim($st,", "); //toglie l'ultima virgola e spazio
		$st = $st . ") VALUES (";
		foreach ($columns as $c)
		{
			$st = $st . "$$c->name, ";
		}
		$st = rtrim($st,", "); //toglie l'ultima virgola e spazio
		$st = $st . ");";
		echo $st;
		echo "<br>";
		echo "<br>";
	}
	//---
	//--- stampa UPDATE
	//"UPDATE MyGuests SET lastname='Doe' WHERE id=2";
	if ($stampaSQL)
	{
		$st = "UPDATE $t SET$nl";
		foreach ($columns as $c)
		{
			$st = $st . "$t.$c->name = 'valore', $nl";
		}
		$st = rtrim($st,", $nl"); //toglie l'ultima virgola e spazio
		$st = $st . "$nl WHERE id='xxx';";
		echo $st;
		echo "<br>";
		echo "<br>";
	}
	
	//--- stampa datatables
	$st = "";
	if ($stampaDatatables)
	{
		echo "<p><strong>Datatables</strong></p><br>";
		//--- stampa HTML
		echo "<strong>HTML</strong><br><br>";
		$st = $st .  "<table id=\"$t\" class=\"display\" cellspacing=\"0\" width=\"100%\">\n";
        $st = $st .  "<thead>\n";
        $st = $st .  "    <tr>\n";
		foreach ($columns as $c)
		{
			$st = $st .  "        <th>$c->name</th>\n";
		}
        $st = $st .  "    </tr>\n";
        $st = $st .  "</thead>\n";
        $st = $st .  "<tfoot>\n";
        $st = $st .  "    <tr>\n";
        foreach ($columns as $c)
		{
			$st = $st .  "        <th>$c->name</th>\n";
		}
        $st = $st .  "    </tr>\n";
        $st = $st .  "</tfoot>\n";
		$st = $st .  "</table>\n";
		//---
		$st = str_replace("<","&lt",$st); // sostituisce i caratteri < per stampare i tag
		$st = str_replace(">","&gt",$st); // sostituisce i caratteri > per stampare i tag
		echo "<pre>";
		echo $st;
		echo "</pre>";
		//--- stampa javascript
		echo "<p><strong>JavaScript</strong></p><br>";
		echo "<pre>";
		echo "$(document).ready(function() {"."<br>";
		echo "	$('#$t').DataTable( {"."<br>";
		echo "		\"processing\": true,"."<br>";
		echo "		\"serverSide\": true,"."<br>";
		echo "		\"ajax\": {"."<br>";
		echo "			\"url\": \"post.php\","."<br>";
		echo "			\"type\": \"POST\""."<br>";
		echo "		},"."<br>";
		echo "		\"columns\": ["."<br>";
		//---
		$st = "";
		foreach ($columns as $c)
		{
			$st = $st . "			{ \"data\": \"$c->name\" }, $nl";
		}
		$st = rtrim($st,", $nl"); //toglie l'ultima virgola e spazio
		echo $st;
		//---
		echo "		]"."<br>";
		echo "	} );"."<br>";
		echo "} );"."<br>";
		echo "</pre>";
		//--- stampa PHP
		echo "<p><strong>PHP</strong></p><br>";
?>
<pre>
/*
 * DataTables example server-side processing script.
 */
 
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Easy set variables
 */
 
// DB table to use
$table = '<?php echo $t ?>';
 
// Table's primary key
$primaryKey = 'id'; //da specificare
 
// Array of database columns which should be read and sent back to DataTables.
// The `db` parameter represents the column name in the database, while the `dt`
// parameter represents the DataTables column identifier. In this case object
// parameter names
$columns = array(
	<?php 
		$st = "";
		foreach ($columns as $c)
		{
			$st = $st . "	    array( 'db' => '$c->name', 'dt' => '$c->name' ), $nl";	
		}
		$st = rtrim($st,", $nl"); //toglie l'ultima virgola e spazio
		echo $st;
	?>
);
 
/ SQL server connection information
$sql_details = array(
    'user' => '<?php echo $dbuser ?>',
    'pass' => '<?php echo $dbpassword ?>',
    'db'   => '<?php echo $dbname ?>',
    'host' => '<?php echo $dbserver ?>'
);
 
 
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * If you just want to use the basic configuration for DataTables with PHP
 * server-side, there is no need to edit below this line.
 */
 
require( 'ssp.class.php' );
 
echo json_encode(
    SSP::simple( $_POST, $sql_details, $table, $primaryKey, $columns )
);
</pre>

<strong>Resources</strong><br><br>
<pre>
in addition to the above code, the following Javascript library files are loaded for use in this example:

    //code.jquery.com/jquery-1.12.4.js
    https://cdn.datatables.net/1.10.16/js/jquery.dataTables.min.js
	https://cdn.datatables.net/1.10.16/css/jquery.dataTables.min.css
</pre>


<?php		

//---------------------------------------------------------------------------		
		
		
		
		
		//$st = $st . "<p>prova</p>";
		//---
		//$st = str_replace("<","&lt",$st); // sostituisce i caratteri < per stampare i tag
		//$st = str_replace(">","&gt",$st); // sostituisce i caratteri > per stampare i tag
		//echo $st;
		echo "<br>";
		echo "<br>";
	}
	//---
	echo "<a href=\"#indice\">Vai a inizio pagina</a>";
	//---
	echo "<hr>";
//---	
}
echo "<br>";
echo "<br>";

?>
</body>
</html>
