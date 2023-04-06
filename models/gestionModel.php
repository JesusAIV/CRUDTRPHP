<?php
    if ($ajax){
        require_once "../../models/main.php";
        require_once "../../view/core/constantes.php";
        require_once "../../view/core/conexion.php";
    }else {
        require_once "./models/main.php";
        require_once "./view/core/constantes.php";
        require_once "./view/core/conexion.php";
    }

    class gestionModel extends Main{
        
    }