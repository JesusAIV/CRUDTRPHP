<?php
    $ajax = true;
    session_start();

    require_once "../../controller/gestionController.php";
    $opciones = new gestionController();

    if ($_POST['action'] == 'listarproductos') {
        echo $opciones->Listarproductos();
    }

    if ($_POST['action'] == 'datosSelect') {
        echo $opciones->Listarcategorias();
    }