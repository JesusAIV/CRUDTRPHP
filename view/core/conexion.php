<?php

class Conexion{
    // Función protegida para la Conexion
    public static function conectar(){
        $host = "127.0.0.1";
        $username = "root";
        $pass = "";
        $database = "tgestiona";
        $conexion = mysqli_connect($host,$username,$pass,$database);

        // retorna la conexion
        return $conexion;
    }
}