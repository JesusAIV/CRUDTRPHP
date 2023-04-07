<div class="login-container">
    <!-- registrarse-->
    <div class="container-imgLogin">
        <img class="imgLogin" src="<?php echo SERVERURL;?>view/assets/img/img.png" alt="">
    </div>
    <div class="separador"></div>
    <!-- ingresar  -->
    <div class="login" id="login">
        <h1 class="">INICIAR SESIÓN</h1>
        <form class="" action="" method="POST">
            <div class="form-login">
                <div class="form-group">
                    <label for="Usuario">Usuario</label>
                    <input class="inputt" type="text" name="usuario" id="Usuario">
                </div>
                <div class="form-group">
                    <label for="Contraseña">Contraseña</label>
                    <input class="inputt" type="password" name="clave" id="Contraseña">
                </div>
                <button class="btnIngresar" name="btnIngresar" type="submit" value="Ingresar">Ingresar</button>
                <div class="text-center">
                    <a class="links" href="./cambiarContraseña.php" >Olvido la contraseña?</a>
                </div>
                </div>
            </form>
            <?php echo SERVERURL; ?>
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