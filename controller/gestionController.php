<?php

if ($ajax){
    require_once "../../models/main.php";
    require_once "../../models/gestionModel.php";
    require_once "../../view/core/conexion.php";
}else{
    require_once "./models/main.php";
    require_once "./models/gestionModel.php";
    require_once "./view/core/conexion.php";
}

class gestionController extends gestionModel{
    public function ListarProductos(){
        $conexion = Conexion::conectar();

        $sql = "CALL ListarProductos()";
        $datos = $conexion->query($sql);
        $datos = $datos->fetch_all(MYSQLI_ASSOC);
        $mData = array();

        $contador = 1;
        foreach ($datos as $row) {
            $estadoproduc = gestionModel::stockProducto($row['estado']);
            $directorio = gestionModel::imagenProducto($row['imagen']);
            $data = [
                "contador" => $contador,
                "idproducto" => $row['idproducto'],
                "categoria" => $row['nombrecat'],
                "nombre" => $row['nombre'],
                "descripcion" => $row['descripcion'],
                "imagen" => '<img class="image-table-product" width="70" src="'.$directorio.'">',
                "estado" => $estadoproduc
            ];
            $mData[]=$data;
            $contador++;
        }

        $data = json_encode($mData, JSON_UNESCAPED_UNICODE);

        return $data;
    }

    public function Listarcategorias(){
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
            $mData[]=$data;
        }

        $data = json_encode($mData, JSON_UNESCAPED_UNICODE);

        return $data;
    }
}