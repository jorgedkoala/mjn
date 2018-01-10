<?php
$conexion = mysqli_connect('mjncatwohrapp.mysql.db', 'mjncatwohrapp', 'kwE945Fd943o', 'mjncatwohrapp')or
die("Problemas al conectar" . mysqli_error());
mysqli_set_charset($conexion,'utf8');
?>