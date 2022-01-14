<?php
session_start();



ini_set("error_reporting",0);


	

?>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<title>Crea e stampa codice QR</title>
		
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
				
		<script type="text/javascript" src="js/jquery-1.10.2.js"></script>
		
		
		<script type="text/javascript" src="../../../js/jquery-1.7.min.js"></script>
		<script type="text/javascript" src="js/jquery.qrcode.js"></script>
		<script type="text/javascript" src="js/qrcode.js"></script>
		
		
		<script type="text/javascript">
		
		$(document).ready(function(){
				
		
				
				
					$('#qrcode').qrcode('viaggi.html');
				
		});
		
		
		</script>
	</head>
	
	<body>
		
	<h2 style="font-family:Arial, Helvetica, sans-serif; font-size:14;" >Pagina per la creazione e la stampa del codice QR</h2>
	<br />
	<p class="testo">
	
	<center><div id="qrcode"></div></center>
	<br>
	<button type="button" class="btn btn-default" data-dismiss="modal">Stampa</button>

	<br />
	<br />
		
	</body>
</html>