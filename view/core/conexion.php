<?php

class Conexion{

    // Función protegida para la Conexion
    public static function conectar(){

        $host="localhost";
        $user="root";
        $pass="";
        
        $bd="basededatos";

        $con=mysqli_connect($host,$user,$pass);

        mysqli_select_db($con,$bd);

        return $con;

    }
}