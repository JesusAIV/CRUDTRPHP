<?php
    require_once "core/constantes.php";
    session_start();
    
    $pagina = explode("/", $_GET['views']);

    $viewurl = $pagina[0];
?>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>TGestiona</title>
    <link rel="stylesheet" href="https://site-assets.fontawesome.com/releases/v6.4.0/css/all.css">
    <link rel="stylesheet" href="<?php echo SERVERURL ?>view/css/style.css" />
    <link rel="stylesheet" href="<?php echo SERVERURL ?>view/css/dataTable.css" />
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet">

    <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
    <script src="<?php echo SERVERURL ?>view/js/sidebar.js"></script>
    <script src="<?php echo SERVERURL ?>view/js/sweetalert2.js"></script>
    <script src="<?php echo SERVERURL;?>view/js/dataTable.js"></script>
    <script src="<?php echo SERVERURL;?>view/js/chart.js"></script>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.36/pdfmake.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.36/vfs_fonts.js"></script>
</head>

<body id="body-pd <?php if($viewurl == "login" || empty($viewurl) || !isset($_SESSION['usuario'])) { echo "position-relative"; } ?>">
    <?php
        /* Prueba 01 */
        $ajax = false;
        require_once "./controller/viewcontroller.php";
        $view = new viewcontroller();
        $vistas = $view->obtenervistacontrolador();

        if ($vistas == "login") :
            require_once "./view/content/login.php";
        else :
            require_once "./controller/loginController.php";
            $control = new logincontrolador();
            if (!isset($_SESSION['usuario'])) {
                $control->forzar_cierre_sesion();
            }
    ?>

    <?php include "modulos/sidebar.php"; ?>
    <div class="height-100 bg-light">
        <?php require_once $vistas; ?>
    </div>

    <?php
        include "./view/modulos/logout.php";
        endif;
    ?>
    <?php if($viewurl == "inicio") { echo '<script defer src="<?php echo SERVERURL;?>view/js/graficos.js"></script>';} ?>
    <script src="<?php echo SERVERURL;?>view/js/adfunctions.js"></script>
    <script src="<?php echo SERVERURL;?>view/js/acciones.js"></script>
</body>
</html>