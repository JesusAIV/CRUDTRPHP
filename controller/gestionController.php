<?php

if ($ajax){
    require_once "../../models/main.php";
    require_once "../../models/gestionModel.php";
    require_once "../../view/core/conexion.php";
}else{
    require_once "./models/main.php";
    require_once "./models/gestionModel.php";
    require_once "./view/core/conexion.php";
}

class gestionController extends gestionModel{
    
}