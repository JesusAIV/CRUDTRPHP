<?php
    class Main{
        // Funcion protegida para Limpiar String (evita SQL-Injection)
        protected function limpiar_cadena($cadena){
            $cadena = trim($cadena);
            $cadena = stripslashes($cadena);
            $cadena = str_ireplace("<script>","",$cadena);
            $cadena = str_ireplace("</script>","",$cadena);
            $cadena = str_ireplace("<script src","",$cadena);
            $cadena = str_ireplace("<script type=","",$cadena);
            $cadena = str_ireplace("SELECT * FROM","",$cadena);
            $cadena = str_ireplace("DELETE FROM","",$cadena);
            $cadena = str_ireplace("INSERT INTO","",$cadena);
            $cadena = str_ireplace("--","",$cadena);
            $cadena = str_ireplace("^","",$cadena);
            $cadena = str_ireplace("[","",$cadena);
            $cadena = str_ireplace("]","",$cadena);
            $cadena = str_ireplace("==","",$cadena);
            return $cadena;
        }
        public function unirnombre($nombrealumno){
            $nombreproduc = Main::limpiar_cadena($nombrealumno);

            $nombreproduc = str_ireplace(" ", "-", $nombreproduc);

            return $nombreproduc;
        }
        public function desunirnombre($nombrealumno){
            $nombreproduc = Main::limpiar_cadena($nombrealumno);

            $nombreproduc = str_ireplace("-", " ", $nombreproduc);

            return $nombreproduc;
        }
    }
?>