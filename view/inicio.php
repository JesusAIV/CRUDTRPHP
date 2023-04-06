<?php
require_once "core/constantes.php";
?>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Proyecto 01</title>
    <script src="<?php echo SERVERURL ?>view/js/jquery.js"></script>
    <link rel="stylesheet" href="https://site-assets.fontawesome.com/releases/v6.4.0/css/all.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js"></script>
    <link rel="stylesheet" href="<?php echo SERVERURL ?>view/css/style.css" />
    <script src="<?php echo SERVERURL ?>view/js/sidebar.js"></script>
</head>

<body id="body-pd">
    <?php
        $ajax = false;
        require_once "./controller/viewcontroller.php";
        $view = new viewcontroller();
        $vistas = $view->obtenervistacontrolador();

        if ($vistas == "inicio") {
            $vistas = "./view/content/inicio.php";
        }
    ?>

    <?php include "modulos/sidebar.php"; ?>
    <div class="height-100 bg-light">
        <?php require_once $vistas; ?>
    </div>
</body>
</html>