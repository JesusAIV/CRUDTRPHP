<div class="container">
    <!-- ingresar  -->
    <div class="row justify-content-center">
        <div class="col-md-12 col-lg-10">
            <div class="wrap">
                <form class="" action="" method="POST">
                    <div class="row mb-4">
                        <label for="Usuario" class="col-sm-2 col-form-label">Usuario</label>
                        <div class="col-sm-10">
                            <input class="form-control" type="text" name="usuario" id="Usuario">
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="Contraseña" class="col-sm-2 col-form-label">Contraseña</label>
                        <div class="col-sm-10">
                            <input class="form-control" type="password" name="clave" id="Contraseña">
                        </div>              
                    </div>
                    <button class="btn btn-primary" name="btnIngresar" type="submit" value="Ingresar">Ingresar</button>
                </form>
            </div>
        </div>
            
    </div>
</div>
<?php
    if(isset($_POST['usuario']) && isset($_POST['clave'])){
        require_once "./controller/loginController.php";
        $login = new logincontrolador();
        echo $login->iniciar_sesion_controlador();
    }
?>