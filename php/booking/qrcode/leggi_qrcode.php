
<?php 

session_start();
include("vars.php");
include("checkSession.php");

ini_set("error_reporting", 0);

$profilo=$_SESSION['profilo'];
$operatore=$_SESSION['operatore'];
//$paziente=$_REQUEST['paziente'];
$struttura=$_SESSION['strutturautente'];

$oggi=Date("Y-m-d");



include("../dbconnrepository.php");
  $db = mysql_connect($host, $user, $password)
or die ("Impossibile connettersi al server $host");

mysql_select_db($database, $db)
or die ("Impossibile connettersi al database $database");

	
	
	
	
?>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
	<html>
		<head>
			<title>Nuova scheda</title>
			<meta http-equiv="Content-type" content="text/html; charset=utf-8" />
			
			<link href="../endo/stile/stile_generale.css" rel="stylesheet" type="text/css"> 
			
			<script type="text/javascript" src="js/jquery-1.10.2.js"></script>
			
			<!--<script type="text/javascript" src="js/webqr.js"></script>-->
			<script type="text/javascript" src="js/llqrcode.js"></script>
			
			
			<script type="text/javascript">
				
						
				
				$(document).ready(function() {
					
									
				});
			</script>
			
			
					
			
			<style type="text/css">
			
			#v{
				width:320px;
				height:240px;
			}
			
			#qr-canvas{
				display:none;
			}
			
			
			#outdiv
			{
				width:320px;
				height:240px;
				border: solid;
				border-width: 3px 3px 3px 3px;
			}
			
			
			<!--
			#result{
				border: solid;
				border-width: 1px 1px 1px 1px;
				padding:20px;
				width:70%;
			}
			-->
			#mainbody{
				background: white;
				width:100%;
				display:none;
			}
			
			#main{
				margin: 15px auto;
				background:white;
				overflow: auto;
				width: 100%;

			}

			</style>

			

	  

  
		</head>
		<body background="../endo/images/bg_body.png">
		<fieldset style="border:1; font-weight: normal; color: #444; padding: 5px 10px; border-radius: 2px; -moz-border-radius: 2px; -webkit-border-radius: 2px; border: 1px solid #8DB2E3; background-color: #fff; -moz-box-shadow: 1px 1px 3px #bbb; -webkit-box-shadow: 1px 1px 3px #bbb; box-shadow: 1px 1px 3px #bbb; text-shadow: 0 0 0 #ccc;">
<legend style="border:1; font-weight: normal; color: #444; padding: 3px 10px; border-radius: 2px; -moz-border-radius: 2px; -webkit-border-radius: 2px; border: 1px solid #8DB2E3; background-color:#FFFFFF; background-image:url(../endo/images/bg_menu_selected.png); background-repeat:repeat-x; -moz-box-shadow: 1px 1px 3px #bbb; -webkit-box-shadow: 1px 1px 3px #bbb; box-shadow: 1px 1px 3px #bbb; display: block; -webkit-padding-start: 2px; -webkit-padding-end: 2px; border-image-source: initial; border-image-slice: initial; border-image-width: initial; border-image-outset: initial; border-image-repeat: initial; font-family: Helvetica,Arial,sans-serif; "><font size="-1">&nbsp;<img src="../endo/images/punto_elenco.png" width="15" height="11">Scansiona codice QR&nbsp;</font></legend><br>
					
				<form method="post" action="#" name="form1">
				
														
				
				
				
					<p class="testo">
							
						Operatore: <input name="operatore" value="<?php print $operatore; ?>" readonly="true">
						<br />
						Reparto: <input name="reparto" value="<?php print $struttura; ?>" readonly="true">
						<br />
						<br />
					</p>
					<center>
						
						
						
						
						
						
						<div id="main">
							<p id="mp1">
							
							</p>
						
							
							<div id="mainbody">
								
								<div id="outdiv">
								</div>
										
								
								
										
							</div>&nbsp;
						
						
						</div>
						
						Codice QR decodificato: <input name="code" id="code" readonly="true"/>
						
						<canvas id="qr-canvas" >
						
						</canvas>
						
					<script type="text/javascript">
// QRCODE reader Copyright 2011 Lazar Laszlo
// http://www.webqr.com

var gCtx = null;
var gCanvas = null;
var c=0;
var stype=0;
var gUM=false;
var webkit=false;
var moz=false;
var v=null;

/*
var imghtml='<div id="qrfile"><canvas id="out-canvas" width="320" height="240"></canvas>'+
    '<div id="imghelp">drag and drop a QRCode here'+
	'<br>or select a file'+
	'<input type="file" onchange="handleFiles(this.files)"/>'+
	'</div>'+
'</div>';
*/

var vidhtml = '<video id="v" autoplay></video>';


function dragenter(e) {
  e.stopPropagation();
  e.preventDefault();
}

function dragover(e) {
  e.stopPropagation();
  e.preventDefault();
}
function drop(e) {
  e.stopPropagation();
  e.preventDefault();

  var dt = e.dataTransfer;
  var files = dt.files;
  if(files.length>0)
  {
	handleFiles(files);
  }
  else
  if(dt.getData('URL'))
  {
	qrcode.decode(dt.getData('URL'));
  }
}

/*
function handleFiles(f)
{
	var o=[];
	
	for(var i =0;i<f.length;i++)
	{
        var reader = new FileReader();
        reader.onload = (function(theFile) {
        return function(e) {
            gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);

			qrcode.decode(e.target.result);
        };
        })(f[i]);
        reader.readAsDataURL(f[i]);	
    }
}
*/
function initCanvas(w,h)
{
    gCanvas = document.getElementById("qr-canvas");
    gCanvas.style.width = w + "px";
    gCanvas.style.height = h + "px";
    gCanvas.width = w;
    gCanvas.height = h;
    gCtx = gCanvas.getContext("2d");
    gCtx.clearRect(0, 0, w, h);
}


function captureToCanvas() {
    if(stype!=1)
        return;
    if(gUM)
    {
        try{
            gCtx.drawImage(v,0,0);
            try{
                qrcode.decode();
            }
            catch(e){       
                console.log(e);
                setTimeout(captureToCanvas, 500);
            };
        }
        catch(e){       
                console.log(e);
                setTimeout(captureToCanvas, 500);
        };
    }
}

function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function read(a)
{
    /*
	var html="<br>";
    if(a.indexOf("http://") === 0 || a.indexOf("https://") === 0)
        html+="<a target='_blank' href='"+a+"'>"+a+"</a><br>";
    html+="<b>"+htmlEntities(a)+"</b><br><br>";
	*/
	
	
	
	
	/*
		I PARAMETRI USATI PER CREARE IL QR CODE 
		SONO SEPARATI DAL "-" E SONO ORDINATI NEL SEGUENTE MODO:
		
		1. ID CARTELLA
		2. NOME COMPLETO PAZIENTE (PROVA*PROVA)
		3. CODICE FISCALE
	*/
	
		
    document.getElementById("code").value=a;
	//alert(a);
	
	var struttura="<?php print $struttura; ?>";
	var loginPage="<?php print $loginPage; ?>";
	
		
	var codiceQR = $("#code").val();
	
	//alert(codiceQR);
	
	var arrayQRcode=codiceQR.split("-");
	var id_cartella=arrayQRcode[0];
	var nome=arrayQRcode[1];
	var cod_fis=arrayQRcode[2];
		
	//alert("-id_cartella: "+idcartella+ " -nome: "+nome+ "-codice fiscale: "+cod_fis);
	//alert(struttura);
	//alert(loginPage);

	if(struttura == "oncoematologia pediatrica")
		window.open(loginPage+'oncoped/oncoped_stu.php?paziente='+id_cartella);
	
}	

function isCanvasSupported(){
  var elem = document.createElement('canvas');
  return !!(elem.getContext && elem.getContext('2d'));
}
function success(stream) {
    if(webkit)
        v.src = window.webkitURL.createObjectURL(stream);
    else
    if(moz)
    {
        v.mozSrcObject = stream;
        v.play();
    }
    else
        v.src = stream;
    gUM=true;
    setTimeout(captureToCanvas, 500);
}
		
function error(error) {
    gUM=false;
    return;
}

function load()
{
	if(isCanvasSupported() && window.File && window.FileReader)
	{
		initCanvas(800, 600);
		qrcode.callback = read;
		document.getElementById("mainbody").style.display="inline";
        setwebcam();
	}
	else
	{
		document.getElementById("mainbody").style.display="inline";
		document.getElementById("mainbody").innerHTML='<p id="mp1">QR code scanner for HTML5 capable browsers</p><br>'+
        '<br><p id="mp2">sorry your browser is not supported</p><br><br>'+
        '<p id="mp1">try <a href="http://www.mozilla.com/firefox"><img src="firefox.png"/></a> or <a href="http://chrome.google.com"><img src="chrome_logo.gif"/></a> or <a href="http://www.opera.com"><img src="Opera-logo.png"/></a></p>';
	}
}

function setwebcam()
{
	document.getElementById("code").value="";
    if(stype==1)
    {
        setTimeout(captureToCanvas, 500);    
        return;
    }
    var n=navigator;
    document.getElementById("outdiv").innerHTML = vidhtml;
    v=document.getElementById("v");

    if(n.getUserMedia)
        n.getUserMedia({video: true, audio: false}, success, error);
    else
    if(n.webkitGetUserMedia)
    {
        webkit=true;
        n.webkitGetUserMedia({video: true, audio: false}, success, error);
    }
    else
    if(n.mozGetUserMedia)
    {
        moz=true;
        n.mozGetUserMedia({video: true, audio: false}, success, error);
    }

    //document.getElementById("qrimg").src="qrimg2.png";
    //document.getElementById("webcamimg").src="webcam.png";
    //document.getElementById("qrimg").style.opacity=0.2;
    //document.getElementById("webcamimg").style.opacity=1.0;

    stype=1;
    setTimeout(captureToCanvas, 500);
}

/*
function setimg()
{
	document.getElementById("result").innerHTML="";
    if(stype==2)
        return;
    document.getElementById("outdiv").innerHTML = imghtml;
    //document.getElementById("qrimg").src="qrimg.png";
    //document.getElementById("webcamimg").src="webcam2.png";
    //document.getElementById("qrimg").style.opacity=1.0;
    //document.getElementById("webcamimg").style.opacity=0.2;
    var qrfile = document.getElementById("qrfile");
    qrfile.addEventListener("dragenter", dragenter, false);  
    qrfile.addEventListener("dragover", dragover, false);  
    qrfile.addEventListener("drop", drop, false);
    stype=2;
}
*/
							
							
							
load();
							
</script>

						
					
					
					
					<!--
					<fieldset>
						<legend>Test 2</legend>
						<video id="Video" autoplay="autoplay" audio="muted" width="30%" height ="30%"> </video>

						
						<script type="text/javascript">
						/*
						navigator.getUserMedia = ( navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);

						if (navigator.getUserMedia) {
						   navigator.getUserMedia (

							  // constraints
							  
								{
								 video: true
								},

							  // successCallback
							  function(localMediaStream) {
								 var video = document.querySelector('Video');
								 video.src = window.URL.createObjectURL(localMediaStream);
								 // Do something with the video here, e.g. video.play()
							  },

							  // errorCallback
							  function(err) {
								 console.log("The following error occured: " + err);
							  }
						   );
						} else {
						   console.log("getUserMedia not supported");
						}
						*/
						
						//------------------------------------------------------------
						/*
						if (navigator.getUserMedia) {
							var video = document.getElementById('Video');
							video.src = null;
							navigator.getUserMedia('video', successCallback, errorCallback);
							//if everything if good then set the source of the video element to the mediastream
							function successCallback(stream) {
								video.src = stream;
							}
							//If everything isn't ok then say so
							function errorCallback(error) {
								alert("An error occurred: [CODE " + error.code + "]");
							}
						}
						else {
							//show no support for getUserMedia
							alert("Native camera is not supported in this browser!");
						}
						*/
						</script>
				
					</fieldset>
					-->
					
					
				
				
			
				</form>
			
			</center>
			</fieldset>
		</body>
	</html>