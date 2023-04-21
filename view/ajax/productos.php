<?php
    $ajax = true;
    session_start();

    require_once "../../controller/gestionController.php";
    $opciones = new gestionController();

    if ($_POST['action'] == 'listarproductos' || $_POST['action'] == 'listarproductosdisponibles') {
        echo $opciones->Listarproductos();
    }

    if ($_POST['action'] == 'datosSelect') {
        echo $opciones->Listarcategorias();
    }

    if ($_POST['action'] == 'modalUpdate') {
        $id = $_POST['id'];
        echo $opciones->ProductoID($id);
    }

    if ($_POST['action'] == 'categoriaSelect') {
        $id = $_POST['idcat'];
        echo $opciones->CategoriaID($id);
    }

    if (isset($_POST['addpname'])) {
        echo $opciones->agregarProductoC();
    }

    if ($_POST['action'] == 'guardarventa') {
        echo $opciones->GuardarVenta();
    }

    if ($_POST['action'] == 'graficoProducto') {
        echo $opciones->graficoProducto();
    }

    if ($_POST['action'] == 'graficoVenta') {
        echo $opciones->graficoVenta();
    }

    if ($_POST['action'] == 'listarventas') {
        echo $opciones->ListarVentas();
    }

    if ($_POST['action'] == 'guardarcompra') {
        echo $opciones->GuardarCompra();
    }