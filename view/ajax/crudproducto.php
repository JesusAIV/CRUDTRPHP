<?php
    $ajax = true;
    session_start();

    require_once "../../controller/gestionController.php";
    $opciones = new gestionController();

    if ($_POST['action'] == 'delete'){
        echo $opciones->eliminarProductoC($_POST['idd']);
    }

    if (isset($_POST['addpname']) || isset($_POST['uppid'])){

        if (isset($_POST['addpname'])) {
            echo $opciones->agregarProductoC();
        }

        if (isset($_POST['uppid'])) {
            echo $opciones->actualizarProductoC();
        }

    }