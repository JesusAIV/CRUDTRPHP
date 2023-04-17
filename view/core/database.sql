-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 17-04-2023 a las 05:38:20
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `tgestiona`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE PROCEDURE `ListarProductos` ()   SELECT 
	tbp.idproducto,
	tbc.nombre as 'nombrecat', 
    tbp.nombre,
    tbp.descripcion,
    tbp.precio,
    tbp.stock,
    tbp.imagen,
    tbp.estado
FROM producto AS tbp 
JOIN categoria AS tbc
ON (tbp.idcategoria = tbc.idcategoria)$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `idcategoria` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`idcategoria`, `nombre`) VALUES
(1, 'Relojes'),
(2, 'Audifonos'),
(3, 'Teclados');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleado`
--

CREATE TABLE `empleado` (
  `idempleado` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellidos` varchar(50) NOT NULL,
  `tipo_documento` int(11) NOT NULL,
  `num_documento` varchar(15) NOT NULL,
  `direccion` varchar(150) NOT NULL,
  `telefono` varchar(9) NOT NULL,
  `email` varchar(100) NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `foto` varchar(255) NOT NULL,
  `usuario` varchar(50) NOT NULL,
  `passw` varchar(255) NOT NULL,
  `estado` char(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `empleado`
--

INSERT INTO `empleado` (`idempleado`, `nombre`, `apellidos`, `tipo_documento`, `num_documento`, `direccion`, `telefono`, `email`, `fecha_nacimiento`, `foto`, `usuario`, `passw`, `estado`) VALUES
(2, 'Jesus', 'Isique Vasquez', 0, '74893553', 'casa', '970819776', 'jesusalbertoisiquevasquez@gmail.com', '2004-04-11', '', 'yisus', 'RXp5V2V6eS8wRDZYaGJKb1QzbkRjdz09', '1');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `idproducto` int(11) NOT NULL,
  `idcategoria` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text NOT NULL,
  `precio` double(15,2) NOT NULL,
  `stock` int(11) NOT NULL,
  `imagen` varchar(255) NOT NULL,
  `estado` char(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`idproducto`, `idcategoria`, `nombre`, `descripcion`, `precio`, `stock`, `imagen`, `estado`) VALUES
(1, 1, 'Reloj Invicta 35740 Negro Hombres', 'Reloj invicta modelo 35740 color negro para hombres de silicona, resistencia al agua hasta 100', 349.00, 20, 'img/categoria/Relojes/1.webp', '1'),
(2, 2, 'Audífono BLACKLINE HP-2035 Verde', 'Blackline es una marca que tiene como propósito mejorar y simplificar la vida de los usuarios. La marca tiene dentro de su catálogo de productos una variedad de artefactos electrónicos para el hogar, desde televisores hasta pequeños electrodomésticos.', 29.90, 20, 'img/categoria/Audifonos/2.webp', '1'),
(3, 3, 'Teclado Mecánico Gamer T-Dagger Arena Rainbow White', 'Teclado T-Dagger ARENA Rainbow\r\n\r\nEspecificaciones técnicas:\r\n-Tipo de teclado: mecánico.\r\n-Bloqueo de tecla Windows: YES.\r\n-Tamaño de teclado: compacto 60%.\r\n-Retroiluminado: YES, Rainbow.', 114.90, 1, 'img/categoria/Teclados/3.webp', '0');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sucursal`
--

CREATE TABLE `sucursal` (
  `idsucursal` int(11) NOT NULL,
  `razon_social` varchar(150) NOT NULL,
  `tipo_documento` varchar(20) NOT NULL,
  `num_documento` varchar(15) NOT NULL,
  `direccion` varchar(100) NOT NULL,
  `telefono` varchar(10) NOT NULL,
  `email` varchar(70) NOT NULL,
  `representante` varchar(150) NOT NULL,
  `logo` varchar(50) NOT NULL,
  `estado` char(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`idcategoria`);

--
-- Indices de la tabla `empleado`
--
ALTER TABLE `empleado`
  ADD PRIMARY KEY (`idempleado`),
  ADD KEY `fk_tipo_documento` (`tipo_documento`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`idproducto`),
  ADD KEY `idcategoria` (`idcategoria`);

--
-- Indices de la tabla `sucursal`
--
ALTER TABLE `sucursal`
  ADD PRIMARY KEY (`idsucursal`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `idcategoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `empleado`
--
ALTER TABLE `empleado`
  MODIFY `idempleado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `idproducto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `sucursal`
--
ALTER TABLE `sucursal`
  MODIFY `idsucursal` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `producto`
--
ALTER TABLE `producto`
  ADD CONSTRAINT `producto_ibfk_1` FOREIGN KEY (`idcategoria`) REFERENCES `categoria` (`idcategoria`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
