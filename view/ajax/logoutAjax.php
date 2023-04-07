<?php
    // obtiene el archivo core/configGeneral.php
    require_once '../core/constantes.php';
    // Inicializar la sesión
    session_start();

    // Destruir todas las variables de sesión.
    $_SESSION = array();

    // Destruir la sesión completamente, borra la cookie de sesión
    if (ini_get("session.use_cookies")) {
        $params = session_get_cookie_params();
        setcookie(session_name(), '', time() - 42000,
            $params["path"], $params["domain"],
            $params["secure"], $params["httponly"]
        );
    }

    // Finalmente, destruir la sesión.
    session_destroy();
    // Direcciona al login
    header('Location: '.SERVERURL.'login');
?>