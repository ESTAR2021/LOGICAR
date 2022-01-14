<html>
<head>
    <script src="../js/jquery.js"></script>
    <script src="../js/jquery-ui.js"></script>
    <script src="../js/application.js"></script>
    <link rel="stylesheet" type="text/css" href="../css/bootstrap.css">
    <style type="text/css">
        @media print{
            body{ background-color:#FFFFFF; background-image:none; color:#000000; }
            #ad{ display:none;}
            #leftbar{ display:none;}
            #contentarea{ width:100%;}
        }
    </style>

</head>
<body>

<div class="container">


    <div class="col-md-12 " >

        <div class="col-md-12" id="riepilogo">
            <img class="spostamento" src="../img/booking/riepilogo.png">
            <div class="sfondo_box_auto" >

                 
					<?php
					session_start();
					if(isset($_REQUEST['pren'])){
						
						$_SESSION['pianificazione']=$_REQUEST['pren'];
						
						
					}
					 ?><div class='row'>
                        <div class="col-md-6 titoli" >
                           <b> Prenotante</b>
                        </div>
                        <div class="col-md-6 contenuti" id='prenotante' >

                        </div>
                    </div>
					   <div class='row'>
                        <div class="col-md-6 titoli" >
                          <b> Giorno Partenza</b>
                        </div>
                        <div class="col-md-6 contenuti" id='daypartenza' >

                        </div>
                    </div>
                    <div class='row'>
                        <div class="col-md-6 titoli" >
                            <b> Ora Partenza  </b>
                        </div>
                        <div class="col-md-6 contenuti" id='orapartenza'>

                        </div>
                    </div>
                    <div class='row'>
                        <div class="col-md-6 titoli" >
                          <b> Giorno Arrivo</b>
                        </div>
                        <div class="col-md-6 contenuti" id='dayarrivo'>

                        </div>
                    </div>
                    <div class='row'>
                        <div class="col-md-6 titoli" >
                           <b>Ora Arrivo</b>
                        </div>
                        <div class="col-md-6 contenuti" id='oraarrivo' >

                        </div>
                    </div>
                    <div class='row'>
                        <div class="col-md-6 titoli" >
                          <b> Sede Partenza </b>
                        </div>
                        <div class="col-md-6 contenuti" id='sedepartenza'>

                        </div>
                    </div>
                    <div class='row'>
                        <div class="col-md-6 titoli" >
                            <b> Luogo Destinazione </b>
                        </div>
                        <div class="col-md-6 contenuti" id='luogodest'>

                        </div>
                    </div>

                        <div class='row'>
                            <div class="col-md-6 titoli" >
                               <b> Passeggeri </b>
                            </div>
                            <div class="col-md-6 contenuti" id='passeggeri'>

                            </div>

                    </div>
                    <div class='row'>
                        <div class="col-md-6 titoli" >
                          <b>Tappe Intermedie Andata</b>
                        </div>
                        <div class="col-md-6 contenuti" id='tappeandata'>

                        </div>
                    </div>
                    <div class='row'>
                        <div class="col-md-6 titoli" >
                            <b>Tappe Intermedie Ritorno</b>
                        </div>
                        <div class="col-md-6 contenuti" id='tapperitorno'>

                        </div>
                    </div>



                <div class="clearfix">
                    <br>
                </div>


                <div class='row'>
                    <div class="col-md-6 macchina" >
                      <b> Marca</b>
                    </div>
                    <div class="col-md-6 contenuti" id='marca' >

                    </div>
                </div>


                    <div class='row'>
                <div class="col-md-6 macchina" >
                    <b> Alimentazione </b>
                </div>
                <div class="col-md-6 contenuti" id='alimentazione' >

                </div>
            </div>

                <div class='row'>
                    <div class="col-md-6 macchina" >
                        <b>  Anno </b>
                    </div>
                    <div class="col-md-6 contenuti" id='anno' >

                    </div>
                </div>

                <div class='row'>
                    <div class="col-md-6 macchina" >
                        <b> Cilindrata </b>
                    </div>
                    <div class="col-md-6 contenuti" id='cilindrata' >

                    </div>
                </div>

			<div class='row'>
                    <div class="col-md-6 macchina" >
                        <b>   Targa</b>
                    </div>
                    <div class="col-md-6 contenuti" id='targa' >

                    </div>
                </div>
              <div class='row'>
                <div class="col-md-6 stato" >
                    <b>   Motivo Viaggio </b>
                </div>
                <div class="col-md-6 contenuti" id='motivo' >
					
                </div>
            </div>

              <div class='row'>
                <div class="col-md-6 stato" >
                    <b>  Stato Viaggio  </b>
                </div>
                <div class="col-md-6 contenuti" id='stato' >
					
                </div>
            </div>

                <div class="clearfix">
                    <br>
                </div>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript">
    App.loadJsFile('../js/stampa_step_4.js');

</script>

</html>
