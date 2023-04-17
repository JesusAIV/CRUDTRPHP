<?php
require_once "constantes.php";
class mainModel{
    // Función protegida para la Conexion
    protected function conexion(){
        $host = "127.0.0.1";
        $username = "root";
        $pass = "";
        $database = "tgestiona";

        /*
        $host = "localhost";
        $username = "u690797633_tgestiona";
        $pass = "W2@2y0:Z";
        $database = "u690797633_tgestiona";
        */

        $conexion = mysqli_connect($host,$username,$pass,$database);

        // retorna la conexion
        return $conexion;
    }
    // Funcion protegida para Ejecutar Consultas
    protected function ejecutar_consulta($consulta){
        $conexion = self::conexion();

        $respuesta = $conexion->query($consulta);
        return $respuesta;
    }
    // Función para eliminar cuenta
    /*protected function eliminar_cuenta($codigo){
        $sql = "DELETE FROM participante WHERE DNI='$codigo'";
        $consulta = self::conexion()->query($sql);
        return $consulta;
    }*/
    // Funcion publica para Encriptar
    public static function encryption($string){
        $output = FALSE;
        $key = hash('sha256', SECRET_KEY);
        $iv = substr(hash('sha256', SECRET_IV),0,16);
        $output = openssl_encrypt($string,METHOD,$key,0,$iv);
        $output = base64_encode($output);
        return $output;
    }
    //Funcion protegida para desEncriptar
    public static function decryption($string){
        $key = hash('sha256', SECRET_KEY);
        $iv = substr(hash('sha256', SECRET_IV), 0, 16);
        $output = openssl_decrypt(base64_decode($string), METHOD, $key, 0, $iv);
        return $output;
    }
    //Funcion protegida para generar codigo
    protected function generar_codigo($letra,$longitud,$numeros){
        for($i = 1;$i <= $longitud; $i++){
            $number = rand(0,9);
            $letra.=$number;

        }
        return $letra.$numeros;
    }
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
    // Funcion publica para verificar si usuario existe
    public function usuarioExiste($usuario){
        $respuesta = self::conexion()->prepare("SELECT * FROM participante WHERE Us_ac=?");
        $respuesta->bind_param("s", $usuario);
        $respuesta->execute();
        $numUser = $respuesta->num_rows;

        if($numUser >= 1){
            return true;
        } else {
            return false;
        }
    }
    protected function sweet_alert($datos){
        if($datos['Alerta']=="simple"){
            $alerta = "
                <script>
                    Swal.fire({
                        title: '".$datos['Titulo']."',
                        text: '".$datos['Texto']."',
                        icon: '".$datos['Tipo']."',
                        showConfirmButton: false,
                        timer: 1500
                    });
                </script>
            ";
        }elseif($datos['Alerta']=="recargar"){
            $alerta = "
                <script>
                    Swal.fire({
                        title: '".$datos['Titulo']."',
                        text: '".$datos['Texto']."',
                        icon: '".$datos['Tipo']."',
                        confirmButtonText: 'Aceptar'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            $('#table-productos').DataTable().ajax.reload();
                        }
                    })
                </script>
            ";
        }elseif($datos['Alerta']=="limpiar"){
            $alerta = "
                <script>
                    Swal.fire({
                        title: '".$datos['Titulo']."',
                        text: '".$datos['Texto']."',
                        icon: '".$datos['Tipo']."',
                        confirmButtonText: 'Aceptar'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            $('.FormularioAjax')[0].reset();
                        }
                    });
                </script>
            ";
        }elseif($datos['Alerta']=="mensaje"){
            $alerta = "
                <script>
                    Swal.fire({
                        title: '".$datos['Titulo']."',
                        text: '".$datos['Texto']."',
                        icon: '".$datos['Tipo']."'
                    })
                </script>
            ";
        }
        return $alerta;
    }
    
    public static function CalcularEdad($fecha){
        $fecha_nacimiento = $fecha;
        $dia_actual = date("Y-m-d");
        $edad_diff = date_diff(date_create($fecha_nacimiento), date_create($dia_actual));
        $edad = $edad_diff->format('%y');

        return $edad;
    }

    public function obtenerNomAndLast($nombres, $apellidos){
        $numbername = strpos($nombres, ' ');
        $numberapp = strpos($apellidos, ' ');

        $nombre = substr($nombres, 0, $numbername);
        $apellido = substr($apellidos, 0, $numberapp);

        $datos = $nombre.' '.$apellido;

        return $datos;
    }
}
?>