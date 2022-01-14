<?php
session_start();
//---
if (!isset($_SESSION['amministrativo'])) { exit; }
if ($_SESSION['amministrativo'] <> '1') {	exit; }
//----
?>

<!DOCTYPE html>
<html>
<body>

<h2>TOOLS</h2>
<p><a href="z-sessione.php" target="_blank">Variabili di sessione</a></p>
<p><a href="z-sql-builder.php" target="_blank">Generatore SQL</a></p>
<p><a href="z-pdo-metadata.php" target="_blank">Schema DB</a></p>
</body>
</html>
