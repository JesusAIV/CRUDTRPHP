<?php
if ($ajax) {
    require_once "../../models/main.php";
    require_once "../../view/core/constantes.php";
    require_once "../../view/core/mainModel.php";
    require_once "../../view/core/conexion.php";
} else {
    require_once "./models/main.php";
    require_once "./view/core/constantes.php";
    require_once "./view/core/mainModel.php";
    require_once "./view/core/conexion.php";
}

class gestionModel extends mainModel
{
    protected function imagenProducto($ruta)
    {
        $directorio = SERVERURL . 'view/' . $ruta;

        return $directorio;
    }

    protected function stockProducto($stock)
    {
        if ($stock > 0) {
            $estadoproduc = '<button class="btn btn-success">
                                    En stock
                                </button>';
        } else {
            $estadoproduc = '<button class="btn btn-danger">
                                    Agotado
                                </button>';
        }

        return $estadoproduc;
    }

    protected function agregarProducto($datos)
    {
        $conexion = Conexion::conectar();

        $categoria = $datos['categoria'];
        $addpname = $datos['addpname'];
        $descripcion = $datos['descripcion'];
        $precio = $datos['precio'];
        $stock = $datos['stock'];
        $imagen = $datos['imagen'];

        $sql = "CALL AgregarProducto('$categoria', '$addpname', '$descripcion', $precio, $stock, '$imagen')";

        $result = $conexion->query($sql);

        return $result;
    }

    protected function actualizarImagenProducto($idProducto, $newName)
    {
        $conexion = Conexion::conectar();

        $sql = "UPDATE producto SET imagen = '$newName' WHERE idproducto = $idProducto";

        $result = $conexion->query($sql);

        return $result;
    }

    protected function actualizarProducto($datos)
    {
        $conexion = Conexion::conectar();

        $uppid = $datos['uppid'];
        $categoria = $datos['categoria'];
        $nombre = $datos['nombre'];
        $descripcion = $datos['descripcion'];
        $precio = $datos['precio'];
        $stock = $datos['stock'];
        $imagen = $datos['imagen'];

        $sql = "CALL EditarProducto($uppid, '$categoria', '$nombre', '$descripcion', $precio, $stock, '$imagen')";

        $result = $conexion->query($sql);

        return $result;
    }

    protected function eliminarProducto($id)
    {
        $conexion = Conexion::conectar();

        $sql = "CALL EliminarProducto($id)";

        $result = $conexion->query($sql);

        return $result;
    }
}
