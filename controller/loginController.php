<?php
    if ($ajax){
        require_once "../models/loginModel.php";
    } else {
        require_once "./models/loginModel.php";
    }

    class logincontrolador extends LoginModel{
        public function iniciar_sesion_controlador(){
            $usuario = mainModel::limpiar_cadena($_POST['usuario']);
            $clave = mainModel::limpiar_cadena($_POST['clave']);

            $clave=mainModel::encryption($clave);

            $datosLogin=[
                "usuario"=>$usuario,
                "passw"=>$clave
            ];

            $datosCuenta = LoginModel::iniciar_sesion($datosLogin);

            $rowCount = $datosCuenta->num_rows;

            $row = $datosCuenta->fetch_array(MYSQLI_ASSOC);

            if(empty($usuario)){
                $alerta=[
                    "Alerta"=>"simple",
                    "Titulo"=>"Campos vacíos",
                    "Texto"=>"Debe ingresar sus datos",
                    "Tipo"=>"error"
                ];
                return mainModel::sweet_alert($alerta);
            }else{
                if($rowCount==1){
                    session_start();
                    $_SESSION['usuario']=$row['usuario'];
                    $url = SERVERURL."inicio";

                    return $urlLocation = '<script> window.location="'.$url.'"</script>';
                }else{
                    $alerta=[
                        "Alerta"=>"simple",
                        "Titulo"=>"Ocurrió un error inesperado",
                        "Texto"=>"Datos incorrectos",
                        "Tipo"=>"error"
                    ];
                    return mainModel::sweet_alert($alerta);
                }
            }
        }

        public function forzar_cierre_sesion(){
            session_destroy();
            return header("Location: ".SERVERURL."login");
        }

        public function cuentaDeshabilitada($cod){
            $sql = mainModel::ejecutar_consulta("SELECT * FROM participante WHERE JHARID='$cod'");
            $row = $sql->fetch_array(MYSQLI_ASSOC);

            foreach($sql as $row){
                $res = $row["Status"];
            }
            return $res;
        }
    }