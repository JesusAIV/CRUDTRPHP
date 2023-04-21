<?php
    class viewmodel{
        protected function obtenervistamodelo($views){
            $lista = ["inicio", "almacen", "compras", "ventas", "registrarventa" ,"registrarcompra"];

            if(in_array($views,$lista)){
                if(is_file("./view/content/".$views.".php")){
                    $contenido = "./view/content/".$views.".php";
                }else{
                    $contenido = "login";
                }
            }else{
                $contenido = "login";
            }
            return $contenido;
        }
    }