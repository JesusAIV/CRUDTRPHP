<?php

if ($ajax) {
    require_once "../../models/main.php";
    require_once "../../models/gestionModel.php";
    require_once "../../view/core/conexion.php";
} else {
    require_once "./models/main.php";
    require_once "./models/gestionModel.php";
    require_once "./view/core/conexion.php";
}

class gestionController extends gestionModel
{

    public function ListarProductos()
    {
        $conexion = Conexion::conectar();

        $sql = "CALL ListarProductos()";
        $datos = $conexion->query($sql);
        $datos = $datos->fetch_all(MYSQLI_ASSOC);
        $mData = array();

        $contador = 1;
        foreach ($datos as $row) {
            $estadoproduc = gestionModel::stockProducto($row['stock']);
            $directorio = gestionModel::imagenProducto($row['imagen']);
            $data = [
                "contador" => $contador,
                "idproducto" => $row['idproducto'],
                "categoria" => $row['nombrecat'],
                "nombre" => $row['nombre'],
                "descripcion" => $row['descripcion'],
                "precio" => $row['precio'],
                "stock" => $row['stock'],
                "imagen" => '<img class="image-table-product" width="70" height="70" src="' . $directorio . '">',
                "estado" => $estadoproduc
            ];
            $mData[] = $data;
            $contador++;
        }

        $data = json_encode($mData, JSON_UNESCAPED_UNICODE);

        return $data;
    }

    public function Listarcategorias()
    {
        $conexion = Conexion::conectar();

        $sql = "SELECT * FROM categoria";
        $datos = $conexion->query($sql);
        $datos = $datos->fetch_all(MYSQLI_ASSOC);
        $mData = array();

        foreach ($datos as $row) {
            $data = [
                "idcategoria" => $row['idcategoria'],
                "nombre" => $row['nombre']
            ];
            $mData[] = $data;
        }

        $data = json_encode($mData, JSON_UNESCAPED_UNICODE);

        return $data;
    }

    public function ProductoID($id)
    {
        $conexion = Conexion::conectar();

        $sql = "SELECT * FROM producto WHERE idproducto = $id";
        $datos = $conexion->query($sql);
        $datos = $datos->fetch_all(MYSQLI_ASSOC);

        $data = json_encode($datos, JSON_UNESCAPED_UNICODE);

        return $data;
    }

    public function CategoriaID($id)
    {
        $conexion = Conexion::conectar();

        $sql = "SELECT * FROM categoria WHERE idcategoria = $id";
        $datos = $conexion->query($sql);
        $datos = $datos->fetch_all(MYSQLI_ASSOC);

        $data = json_encode($datos, JSON_UNESCAPED_UNICODE);

        return $data;
    }

    public function agregarProductoC()
    {
        $categoria = $_POST['categoria'];
        $addpname = $_POST['addpname'];
        $descripcion = $_POST['descripcion'];
        $precio = $_POST['precio'];
        $stock = $_POST['stock'];

        $conexion = Conexion::conectar();

        $sqlcat = "SELECT * FROM categoria WHERE idcategoria = '$categoria'";
        $consultacat = $conexion->query($sqlcat);
        $consultacat = $consultacat->fetch_all(MYSQLI_ASSOC);

        foreach ($consultacat as $key) {
        }

        $dir = "../img/productos/" . $key['nombre'] . "/";
        $nombreArchivo = $_FILES['imagen']['name'];
        $tipo = $_FILES['imagen']['type'];
        $tipo = strtolower($tipo);
        $extension = substr($tipo, strpos($tipo, '/') + 1);
        $name = $nombreArchivo . '-' . time() . '.' . $extension;

        if (!is_dir($dir)) {
            mkdir($dir, 0777, true);
        }

        move_uploaded_file($_FILES['imagen']['tmp_name'], $dir . $name);

        $directorio = $dir . $name;

        $imagen = substr($directorio, 3);


        if (empty($categoria) || empty($addpname) || empty($descripcion) || empty($precio) || empty($stock)) {
            // Dará una alerta de error
            $alerta = [
                "Alerta" => "simple",
                "Titulo" => "Ocurrio un error inesperado",
                "Texto" => "Debe completar todos los campos",
                "Tipo" => "error"
            ];
        } else {
            // Almacena los datos en un array
            $datosP = [
                "categoria" => $categoria,
                "addpname" => $addpname,
                "descripcion" => $descripcion,
                "precio" => $precio,
                "stock" => $stock,
                "imagen" => $imagen
            ];

            // Ejecuta la función agregarPersonal obteniendo el array de datos
            $addProducto = gestionModel::agregarProducto($datosP);

            if ($addProducto >= 1) { /* Si la consulta se ejecuta correctamente */
                // Dará una alerta de éxito
                $alerta = [
                    "Alerta" => "simple",
                    "Titulo" => "Producto registrado",
                    "Texto" => "El producto se registró correctamente en el sistema",
                    "Tipo" => "success"
                ];
            } else {
                // Dará una alerta de error
                $alerta = [
                    "Alerta" => "simple",
                    "Titulo" => "Ocurrio un error inesperado",
                    "Texto" => "No hemos podido agregar el producto",
                    "Tipo" => "error"
                ];
            }
        }
        return mainModel::sweet_alert($alerta);
    }

    public function actualizarProductoC()
    {
        $uppid = $_POST['uppid'];
        $categoria = $_POST['categoria'];
        $nombre = $_POST['nombre'];
        $descripcion = $_POST['descripcion'];
        $precio = $_POST['precio'];
        $stock = $_POST['stock'];

        $conexion = Conexion::conectar();

        $sqlcat = "SELECT * FROM categoria WHERE idcategoria = '$categoria'";
        $consultacat = $conexion->query($sqlcat);
        $consultacat = $consultacat->fetch_all(MYSQLI_ASSOC);

        $sqlprod = "SELECT * FROM producto WHERE idproducto = '$uppid'";
        $consultaprod = $conexion->query($sqlprod);
        $consultaprod = $consultaprod->fetch_all(MYSQLI_ASSOC);

        foreach ($consultacat as $key) {
        }
        foreach ($consultaprod as $keyp) {
        }

        if ($_FILES['imagen']['name']) {
            $dir = "../img/productos/" . $key['nombre'] . "/";
            $nombreArchivo = $_FILES['imagen']['name'];
            $tipo = $_FILES['imagen']['type'];
            $tipo = strtolower($tipo);
            $extension = substr($tipo, strpos($tipo, '/') + 1);
            $name = $nombreArchivo . '-' . time() . '.' . $extension;

            if (!is_dir($dir)) {
                mkdir($dir, 0777, true);
            }

            move_uploaded_file($_FILES['imagen']['tmp_name'], $dir . $name);

            $directorio = $dir . $name;

            $imagen = substr($directorio, 3);
        } else {
            $imagen = $keyp['imagen'];
        }

        $datosP = [
            "uppid" => $uppid,
            "categoria" => $categoria,
            "nombre" => $nombre,
            "descripcion" => $descripcion,
            "precio" => $precio,
            "stock" => $stock,
            "imagen" => $imagen
        ];

        // Ejecuta la función agregarPersonal obteniendo el array de datos
        $addProducto = gestionModel::actualizarProducto($datosP);

        if ($addProducto >= 1) { /* Si la consulta se ejecuta correctamente */
            // Dará una alerta de éxito
            $alerta = [
                "Alerta" => "simple",
                "Titulo" => "Producto actualizado",
                "Texto" => "El producto se actualizó correctamente en el sistema",
                "Tipo" => "success"
            ];
        } else {
            // Dará una alerta de error
            $alerta = [
                "Alerta" => "simple",
                "Titulo" => "Ocurrio un error inesperado",
                "Texto" => "No hemos podido actualizar el producto",
                "Tipo" => "error"
            ];
        }

        return mainModel::sweet_alert($alerta);
    }

    public function eliminarProductoC($id)
    {
        $idd = $id;

        $addProducto = gestionModel::eliminarProducto($idd);

        if ($addProducto >= 1) { /* Si la consulta se ejecuta correctamente */
            // Dará una alerta de éxito
            $alerta = [
                "Alerta" => "simple",
                "Titulo" => "Producto eliminado",
                "Texto" => "El producto se eliminó",
                "Tipo" => "warning"
            ];

            // Cerrar el modal y actualizar la tabla
            return "<script>
                        " . mainModel::sweet_alert($alerta) . "
                        cerrarModal();
                        recargarTabla();
                    </script>";
        } else {
            // Dará una alerta de error
            $alerta = [
                "Alerta" => "simple",
                "Titulo" => "Ocurrio un error inesperado",
                "Texto" => "No hemos podido eliminar el producto",
                "Tipo" => "error"
            ];

            // Mostrar la alerta de error
            return "<script>" . mainModel::sweet_alert($alerta) . "</script>";
        }
    }

    public function cantidadRegistros($tabla)
    {
        $conexion = Conexion::conectar();
    
        $sql = "SELECT COUNT(*) as cantidad FROM $tabla";
        $datos = $conexion->query($sql);
        $datos = $datos->fetch_assoc();
    
        return $datos;
    }
    
}
