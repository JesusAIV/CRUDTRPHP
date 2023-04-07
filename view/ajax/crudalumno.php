<?php
    $ajax = true;

    require_once "../../controller/gestionController.php";
    $opciones = new gestionController();

    if (isset($_POST['dniadd'])){

        if (isset($_POST['dniadd'])) {
            echo $opciones->actualizarAlumnoC();
        }
    }