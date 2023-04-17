<?php
    $ajax = true;
    session_start();

    require_once "../../controller/gestionController.php";
    $opciones = new gestionController();

    if (isset($_POST['addpname'])){

        if (isset($_POST['addpname'])) {
            echo $opciones->agregarProductoC();
        }

    }