<?php
    class viewmodel{
        protected function obtenervistamodelo($views){
            $lista = ["inicio"];

            if(in_array($views,$lista)){
                if(is_file("./view/content/".$views.".php")){
                    $contenido = "./view/content/".$views.".php";
                }else{
                    $contenido = "inicio";
                }
            }else{
                $contenido = "inicio";
            }
            return $contenido;
        }
    }