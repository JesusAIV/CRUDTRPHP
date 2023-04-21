<?php
    if ($ajax){
        require_once "../view/core/mainModel.php";
    } else {
        require_once "./view/core/mainModel.php";
    }
    class LoginModel extends MainModel{

        protected function iniciar_sesion($datos){
            $conexion = mainModel::conexion();
            $usuario = $datos['usuario'];
            $pass = $datos['passw'];
            $sql = "SELECT * FROM usuario WHERE usuario='$usuario' AND passw='$pass'";
            $consulta = $conexion->query($sql);

            return $consulta;
        }
    }
