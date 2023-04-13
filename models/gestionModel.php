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
        protected function imagenProducto($ruta){
            $directorio = SERVERURL.'view/'.$ruta;

            return $directorio;
        }

        protected function stockProducto($stock){
            if($stock > 0){
                $estadoproduc = '<button class="btn btn-success">
                                    En stock
                                </button>';
            }else{
                $estadoproduc = '<button class="btn btn-danger">
                                    Agotado
                                </button>';
            }

            return $estadoproduc;
        }
    }