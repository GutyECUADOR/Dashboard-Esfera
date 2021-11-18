-- --------------------------------------------------------
-- Host:                         localhost
-- Versión del servidor:         5.7.24 - MySQL Community Server (GPL)
-- SO del servidor:              Win64
-- HeidiSQL Versión:             10.2.0.5599
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Volcando estructura para tabla destapatusuerte.aleatorio
CREATE TABLE IF NOT EXISTS `aleatorio` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `premio_id` int(11) DEFAULT NULL,
  `cant_premios` int(11) NOT NULL,
  `premio` varchar(250) COLLATE utf8mb4_spanish2_ci DEFAULT NULL,
  `domingo` int(11) DEFAULT NULL,
  `lunes` int(11) DEFAULT NULL,
  `martes` int(11) DEFAULT NULL,
  `miercoles` int(11) DEFAULT NULL,
  `jueves` int(11) DEFAULT NULL,
  `viernes` int(11) DEFAULT NULL,
  `sabado` int(11) DEFAULT NULL,
  `enabled` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `FK_aleatorio_premios` (`premio_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

-- Volcando datos para la tabla destapatusuerte.aleatorio: ~7 rows (aproximadamente)
/*!40000 ALTER TABLE `aleatorio` DISABLE KEYS */;
INSERT INTO `aleatorio` (`id`, `premio_id`, `cant_premios`, `premio`, `domingo`, `lunes`, `martes`, `miercoles`, `jueves`, `viernes`, `sabado`, `enabled`) VALUES
	(1, 1, 4, 'Moto AKT Ref NKD 125 CC', 25, 50, 50, 0, 0, 0, 25, 1),
	(2, 2, 4, 'Televisor Challenger de 42"', 25, 75, 75, 0, 0, 0, 25, 1),
	(3, 3, 4, 'Telefono Celular Inteligente Xiaomi', 25, 100, 100, 0, 0, 0, 25, 1),
	(4, 4, 4, 'Bicicleta todo terreno 18 velocidades', 25, 25, 25, 0, 0, 0, 25, 1),
	(5, 5, 4, 'Bonos o giros SURED en dinero por cien mil pesos', 0, 0, 0, 0, 0, 0, 0, 1),
	(6, 6, 4, 'Cuenta Amazon Prime (por 1 mes)', 0, 0, 0, 0, 0, 0, 0, 1),
	(7, 7, 4, 'Recargas a celular (Minutos y Plan de datos) por valor de Cinco mil pesos ($5.000) cada una a cualquier operador', 0, 0, 0, 0, 100, 0, 0, 1),
	(8, 8, 10, 'Recargas para apuestas BETPLAY por valor de Cinco mil pesos ($5.000) ', 0, 0, 0, 100, 0, 100, 0, 1);
/*!40000 ALTER TABLE `aleatorio` ENABLE KEYS */;

-- Volcando estructura para tabla destapatusuerte.betplaycodes
CREATE TABLE IF NOT EXISTS `betplaycodes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `codigo` varchar(50) COLLATE utf8mb4_spanish2_ci DEFAULT NULL,
  `isCanjeado` varchar(20) COLLATE utf8mb4_spanish2_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `codigo` (`codigo`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

-- Volcando datos para la tabla destapatusuerte.betplaycodes: ~10 rows (aproximadamente)
/*!40000 ALTER TABLE `betplaycodes` DISABLE KEYS */;
INSERT INTO `betplaycodes` (`id`, `codigo`, `isCanjeado`) VALUES
	(2, 'SDADS-232D-3232', '1600505506'),
	(3, 'SDADS-232D-3111', '1600505506'),
	(4, 'SDADS-232D-3222', '1600505505'),
	(5, 'SDADS-232D-3333', '1600505505'),
	(6, 'SDADS-232D-4444', '1600505505'),
	(7, 'SDADS-232D-5555', '1600505505'),
	(8, 'SDADS-232D-6666', '1600505505'),
	(9, 'SDADS-232D-7777', NULL),
	(10, 'SDADS-232D-8888', NULL),
	(11, 'SDADS-232D-9999', NULL);
/*!40000 ALTER TABLE `betplaycodes` ENABLE KEYS */;

-- Volcando estructura para tabla destapatusuerte.ganadores
CREATE TABLE IF NOT EXISTS `ganadores` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) COLLATE utf8mb4_spanish_ci DEFAULT '',
  `correo` varchar(50) COLLATE utf8mb4_spanish_ci DEFAULT '',
  `dni` varchar(20) COLLATE utf8mb4_spanish_ci DEFAULT '',
  `telefono` varchar(15) COLLATE utf8mb4_spanish_ci DEFAULT '',
  `codigo` char(20) COLLATE utf8mb4_spanish_ci NOT NULL DEFAULT '',
  `fecha` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `premio_id` int(11) NOT NULL DEFAULT '0',
  `telefono_recarga` varchar(20) COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `operadora_recarga` varchar(25) COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `codigo` (`codigo`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- Volcando datos para la tabla destapatusuerte.ganadores: ~20 rows (aproximadamente)
/*!40000 ALTER TABLE `ganadores` DISABLE KEYS */;
INSERT INTO `ganadores` (`id`, `nombre`, `correo`, `dni`, `telefono`, `codigo`, `fecha`, `premio_id`, `telefono_recarga`, `operadora_recarga`) VALUES
	(3, 'JOSE GUTIERREZ', 'test@test.com', '1600505505', '0999887479', '3', '2021-11-11 21:54:02', 7, NULL, NULL),
	(6, '', '', '', '', '4', '2021-11-10 16:43:58', 0, NULL, NULL),
	(9, 'MANUEL PEREZ NUNEZ', 'test@test.com', '1600505506', '0999887479', '1', '2021-11-11 21:41:28', 7, '099887479', 'CLARO'),
	(10, '', '', '', '', '2', '2021-11-10 16:44:37', 0, NULL, NULL),
	(11, 'JOSE GUTIERREZ', 'test@test.com', '1600505505', '0999887479', '5', '2021-11-12 16:26:59', 8, NULL, NULL),
	(12, 'JOSE GUTIERREZ', 'test@test.com', '1600505505', '0999887479', '6', '2021-11-12 16:27:10', 8, NULL, NULL),
	(13, 'JOSE GUTIERREZ', 'test@test.com', '1600505505', '0999887479', '7', '2021-11-12 16:28:23', 8, NULL, NULL),
	(14, 'JOSE GUTIERREZ', 'test@test.com', '1600505505', '0999887479', '8', '2021-11-12 16:28:36', 8, NULL, NULL),
	(15, 'JOSE GUTIERREZ', 'test@test.com', '1600505505', '0999887479', '9', '2021-11-12 16:30:15', 8, NULL, NULL),
	(16, 'JOSE GUTIERREZ', 'test@test.com', '1600505505', '0999887479', '10', '2021-11-12 16:30:22', 6, NULL, NULL),
	(17, '', '', '', '', '11', '2021-11-10 17:25:15', 0, NULL, NULL),
	(18, '', '', '', '', '12', '2021-11-10 15:53:53', 0, NULL, NULL),
	(19, '', '', '', '', '13', '2021-11-10 16:59:45', 0, NULL, NULL),
	(20, '', '', '', '', '14', '2021-11-10 17:00:07', 0, NULL, NULL),
	(21, '', '', '', '', '15', '2021-11-10 17:02:18', 0, NULL, NULL),
	(22, '', '', '', '', '16', '2021-11-10 15:49:55', 0, NULL, NULL),
	(23, '', '', '', '', '17', '2021-11-10 15:55:24', 0, NULL, NULL),
	(24, '', '', '', '', '18', '2021-11-05 09:52:11', 0, NULL, NULL),
	(25, '', '', '', '', '19', '2021-11-05 09:53:33', 0, NULL, NULL),
	(26, '', '', '', '', '20A', '2021-11-04 19:21:24', 0, NULL, NULL);
/*!40000 ALTER TABLE `ganadores` ENABLE KEYS */;

-- Volcando estructura para tabla destapatusuerte.premios
CREATE TABLE IF NOT EXISTS `premios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_premio` varchar(250) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `nombre_corto` varchar(25) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `instrucciones` longtext COLLATE utf8mb4_spanish2_ci NOT NULL,
  `url_link` varchar(50) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `url_imagen` text COLLATE utf8mb4_spanish2_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

-- Volcando datos para la tabla destapatusuerte.premios: ~8 rows (aproximadamente)
/*!40000 ALTER TABLE `premios` DISABLE KEYS */;
INSERT INTO `premios` (`id`, `nombre_premio`, `nombre_corto`, `instrucciones`, `url_link`, `url_imagen`) VALUES
	(1, 'Moto AKT Ref NKD 125 CC', 'MOTOS', '<p style="text-align: left; margin-top: 10px;">Felicitaciones ganaste este fabuloso premio.</p>\r\n<p style="text-align: left;">Sigue las siguientes indicaciones para reclamar tu premio:</p>\r\n<p style="text-align: left;">1 Comun&iacute;cate con nuestro centro de contacto haciendo clic <a href="https://api.whatsapp.com/send?phone=+573154771684&amp;text=Hola!%20Quisiera%20m%C3%A1s%20informaci%C3%B3n%20sobre%20la%20promoci%C3%B3n"><i style="font-size: 30px;color: green;" class="fa fa-whatsapp"></i></a>.</p>\r\n<p style="text-align: left;">2 Podr&aacute;s tambi&eacute;n comunicarte con nuestro WhatsApp Numero +573154771684.</p>\r\n<p style="text-align: left;">3 Coordinaremos contigo la forma y tiempo de entrega.</p>\r\n<p style="text-align: left;">4 Recibir&aacute;s tu premio en un plazo m&aacute;ximo 30 d&iacute;as h&aacute;biles despu&eacute;s de coordinar la entrega con el centro de contacto.</p>', 'http://www.google.com', 'http://capvam.com/destapatusuerte.com/assets/img/1moto.png'),
	(2, 'Televisor Challenger de 42"', 'TVs', '<p style="text-align: center;">Sigue las siguientes indicaciones para reclamar tu premio:</p>\r\n<ol>\r\n<li style="text-align: left;">Comunicate con nuestro centro de contacto (link)</li>\r\n<li style="text-align: left;">Podra tambien comunicarte con nuestro ws No. (telefono de contacto)</li>\r\n<li style="text-align: left;">Cordinaremos contigo la forma y tiempo de entrega</li>\r\n<li style="text-align: left;">Recibiras tu premio en un plazo maximo 30 dias habiles despues de coordinar la entrea con el centro de contacto</li>\r\n</ol>', 'http://www.google.com', 'http://capvam.com/destapatusuerte.com/assets/img/2tv.png'),
	(3, 'Telefono Celular Inteligente Xiaomi', 'Telefonos', '<p style="text-align: center;">Sigue las siguientes indicaciones para reclamar tu premio:</p>\r\n<ol>\r\n<li style="text-align: left;">Comunicate con nuestro centro de contacto (link)</li>\r\n<li style="text-align: left;">Podra tambien comunicarte con nuestro ws No. (telefono de contacto)</li>\r\n<li style="text-align: left;">Cordinaremos contigo la forma y tiempo de entrega</li>\r\n<li style="text-align: left;">Recibiras tu premio en un plazo maximo 30 dias habiles despues de coordinar la entrea con el centro de contacto</li>\r\n</ol>', 'http://www.google.com', 'http://capvam.com/destapatusuerte.com/assets/img/3celular.png'),
	(4, 'Bicicleta todo terreno 18 velocidades', 'Bicicletas', '<p style="text-align: center;">Sigue las siguientes indicaciones para reclamar tu premio:</p>\r\n<ol>\r\n<li style="text-align: left;">Comunicate con nuestro centro de contacto (link)</li>\r\n<li style="text-align: left;">Podra tambien comunicarte con nuestro ws No. (telefono de contacto)</li>\r\n<li style="text-align: left;">Cordinaremos contigo la forma y tiempo de entrega</li>\r\n<li style="text-align: left;">Recibiras tu premio en un plazo maximo 30 dias habiles despues de coordinar la entrea con el centro de contacto</li>\r\n</ol>', 'http://www.google.com', 'http://capvam.com/destapatusuerte.com/assets/img/4bicicleta.png'),
	(5, 'Bonos o giros SURED en dinero por cien mil pesos', 'SURED', '<p style="text-align: center;">Sigue las siguientes indicaciones para reclamar tu premio:</p>\r\n<ol>\r\n<li style="text-align: left;">Comunicate con nuestro centro de contacto (link)</li>\r\n<li style="text-align: left;">Podra tambien comunicarte con nuestro ws No. (telefono de contacto)</li>\r\n<li style="text-align: left;">Cordinaremos contigo la forma y tiempo de entrega</li>\r\n<li style="text-align: left;">Recibiras tu premio en un plazo maximo 30 dias habiles despues de coordinar la entrea con el centro de contacto</li>\r\n</ol>', 'http://www.google.com', 'http://capvam.com/destapatusuerte.com/assets/img/5sured.png'),
	(6, 'Cuenta Amazon Prime (por 1 mes)', 'Amazon', '<p style="text-align: left; margin-top: 10px;">Felicitaciones ganaste este fabuloso premio. <br />Te enviaremos un link a tu celular para que puedas recargar tu cuenta de Amazon</p>\r\n<p style="text-align: left;">Comun&iacute;cate con nuestro centro de contacto haciendo clic <a href="https://api.whatsapp.com/send?phone=+573154771684&amp;text=Hola!%20Quisiera%20m%C3%A1s%20informaci%C3%B3n%20sobre%20la%20promoci%C3%B3n"><i style="font-size: 30px;color: green;" class="fa fa-whatsapp"></i></a> para cualquier inquietud.</p>', 'http://www.google.com', 'http://capvam.com/destapatusuerte.com/assets/img/6amazon.png'),
	(7, 'Recargas a celular (Minutos y Plan de datos) por valor de Cinco mil pesos ($5.000) cada una a cualquier operador', 'Recarga', '<p style="text-align: center;">Sigue las siguientes indicaciones para reclamar tu premio:</p>\r\n<ol>\r\n<li style="text-align: left;">Comunicate con nuestro centro de contacto (link)</li>\r\n<li style="text-align: left;">Podra tambien comunicarte con nuestro ws No. (telefono de contacto)</li>\r\n<li style="text-align: left;">Cordinaremos contigo la forma y tiempo de entrega</li>\r\n<li style="text-align: left;">Recibiras tu premio en un plazo maximo 30 dias habiles despues de coordinar la entrea con el centro de contacto</li>\r\n</ol>', 'http://www.google.com', 'http://capvam.com/destapatusuerte.com/assets/img/7recargarcelular.png'),
	(8, 'Recargas para apuestas BETPLAY por valor de Cinco mil pesos ($5.000) ', 'Betplay', '<p style="text-align: left; margin-top: 10px;">Felicitaciones ganaste un bono de $5000 para apuestas deportivas en linea en la plataforma Betplay<br />Sigue las siguientes indicaciones para hacer efectivo tu bono<br />1 Con este codigo podras recargar tu perfil para apostar en la plataforma Betplay<br />2 Copia el codigo (codigo)<br />3 Ingresa a la plataforma Betplay dando click en este link <a href="https://betplay.com.co/">https://betplay.com.co/</a></p>\r\n<p style="text-align: left;">4 Si tienes alguna duda o inconveniente en la plataforma de Betplay comunicate con (l&iacute;nea 018000112188 o correo ayuda.corredor@cempresarial.co.</p>', 'http://www.google.com', 'http://capvam.com/destapatusuerte.com/assets/img/8betplay.png');
/*!40000 ALTER TABLE `premios` ENABLE KEYS */;

-- Volcando estructura para tabla destapatusuerte.usuarios
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fullname` varchar(50) COLLATE utf8mb4_spanish2_ci NOT NULL DEFAULT '',
  `username` varchar(25) COLLATE utf8mb4_spanish2_ci NOT NULL DEFAULT '',
  `email` varchar(50) COLLATE utf8mb4_spanish2_ci NOT NULL DEFAULT '',
  `password` char(32) COLLATE utf8mb4_spanish2_ci NOT NULL DEFAULT '',
  `rol` varchar(25) COLLATE utf8mb4_spanish2_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

-- Volcando datos para la tabla destapatusuerte.usuarios: ~1 rows (aproximadamente)
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` (`id`, `fullname`, `username`, `email`, `password`, `rol`) VALUES
	(1, 'José Gutiérrez', 'guti', 'test@test.com', '123', 'ADMIN_ROL');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
