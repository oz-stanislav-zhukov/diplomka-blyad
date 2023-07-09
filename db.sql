-- --------------------------------------------------------
-- Хост:                         141.8.192.54
-- Версия сервера:               5.7.37-40 - Percona Server (GPL), Release 40, Revision 3a1347ec0d4
-- Операционная система:         Linux
-- HeidiSQL Версия:              10.1.0.5464
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Дамп структуры базы данных f0220387_ustore
CREATE DATABASE IF NOT EXISTS `f0220387_ustore` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci */;
USE `f0220387_ustore`;

-- Дамп структуры для таблица f0220387_ustore.accounts
CREATE TABLE IF NOT EXISTS `accounts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `login` char(50) COLLATE utf8_unicode_ci NOT NULL COMMENT 'User login',
  `pass` char(255) COLLATE utf8_unicode_ci NOT NULL COMMENT 'Password hash',
  `birthday` int(2) NOT NULL COMMENT 'Birthday in unixtime',
  `sex` int(2) NOT NULL DEFAULT '2' COMMENT '1 - Female, 2 - Male',
  `avatar` char(255) COLLATE utf8_unicode_ci NOT NULL COMMENT 'Url',
  `overlay` char(255) COLLATE utf8_unicode_ci NOT NULL COMMENT 'Url',
  `first_name` char(50) COLLATE utf8_unicode_ci NOT NULL,
  `middle_name` char(50) COLLATE utf8_unicode_ci NOT NULL,
  `last_name` char(50) COLLATE utf8_unicode_ci NOT NULL,
  `email` char(255) COLLATE utf8_unicode_ci NOT NULL,
  `phone` char(50) COLLATE utf8_unicode_ci NOT NULL,
  `iin` char(50) COLLATE utf8_unicode_ci NOT NULL,
  `blocked` int(11) NOT NULL DEFAULT '0' COMMENT '1 - blocked',
  `vk_id` int(11) NOT NULL DEFAULT '0',
  `ozaccount_id` int(11) NOT NULL DEFAULT '0',
  `admin_lvl` int(11) NOT NULL DEFAULT '0',
  `last_active_time` int(11) NOT NULL DEFAULT '0' COMMENT 'Last active time in unixtime',
  `last_token_id` int(11) NOT NULL DEFAULT '0' COMMENT 'Last used token id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Дамп данных таблицы f0220387_ustore.accounts: ~1 rows (приблизительно)
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;
INSERT INTO `accounts` (`id`, `login`, `pass`, `birthday`, `sex`, `avatar`, `overlay`, `first_name`, `middle_name`, `last_name`, `email`, `phone`, `iin`, `blocked`, `vk_id`, `ozaccount_id`, `admin_lvl`, `last_active_time`, `last_token_id`) VALUES
	(4, 'ozliginus', 'fdb7c737964ef01ddda676b7b20764acca46702b7b676addd10fe469737c7bdf', 0, 2, 'https://userapi.ozliginus.ru/u10000001/p/rvwjRO84Q5UeRN6R.5w3vwdm20n9T_crop.jpg', '', 'Станислав', 'Витальевич', 'Жуков', 'oz_stanislav_zhukov@ozliginus.ru', '+77475825263', '', 0, 0, 0, 5, 1688808093, 81),
	(5, '12345', 'e10adc3949ba59abbe56e057f20f883ee388f02f750e65ebba95ab9493cda01e', 0, 2, '', '', ',,,', ',,,', ',,,', '', '', '', 0, 0, 0, 0, 1686388069, 51),
	(6, 'test', 'c714ce5095c61e7f57df9bab0924ad3ff3da4290bab9fd75f7e16c5905ec417c', 0, 2, 'https://i.pinimg.com/originals/f5/27/41/f52741fb62bf1d821948a49204406bdc.jpg', '', 'Test', 'Test', 'Test', '', '+7777777777777', '', 0, 0, 0, 0, 1686106696, 69),
	(7, 'dssggg', '1a1753320417e20e866c3d11bf30701ee10703fb11d3c668e02e7140233571a1', 0, 2, '', '', 'Иванов', 'Иванович', 'Иван', '', '8707426943', '', 0, 0, 0, 0, 1686888789, 73),
	(8, 'test12', '478551d1b4c54c50742b35a85f399330033993f58a53b24705c45c4b1d155874', 0, 2, '', '', 'Stanislav', '11', 'Zhukov', '', '87475825263', '', 0, 0, 0, 0, 1686804501, 79);
/*!40000 ALTER TABLE `accounts` ENABLE KEYS */;

-- Дамп структуры для таблица f0220387_ustore.basket
CREATE TABLE IF NOT EXISTS `basket` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL DEFAULT '0',
  `products` varchar(50) COLLATE utf8_unicode_ci NOT NULL COMMENT 'Products ids',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Дамп данных таблицы f0220387_ustore.basket: ~0 rows (приблизительно)
/*!40000 ALTER TABLE `basket` DISABLE KEYS */;
/*!40000 ALTER TABLE `basket` ENABLE KEYS */;

-- Дамп структуры для таблица f0220387_ustore.categories
CREATE TABLE IF NOT EXISTS `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name_ru` char(50) COLLATE utf8_unicode_ci NOT NULL,
  `name_en` char(50) COLLATE utf8_unicode_ci NOT NULL,
  `icon` char(50) COLLATE utf8_unicode_ci NOT NULL,
  `deleted` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Дамп данных таблицы f0220387_ustore.categories: ~14 rows (приблизительно)
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` (`id`, `name_ru`, `name_en`, `icon`, `deleted`) VALUES
	(1, 'Тест', 'Test', '', 1),
	(2, 'Товар', 'Product', 'bi bi-bag', 1),
	(3, 'Компьютеры', 'Computers', 'bi bi-pc-display', 0),
	(4, 'Комплектующие', 'Accessories', 'bi bi-cpu', 0),
	(5, 'Офисная техника', 'Office equipment', 'bi bi-printer', 0),
	(6, 'Носители информации', 'Information carriers', 'bi bi-sd-card', 0),
	(7, 'Периферия', 'Periphery', 'bi bi-mouse', 0),
	(8, 'Сетевое оборудование', 'Network hardware', 'bi bi-hdd-network', 0),
	(9, 'Программное обеспечение', 'Software', 'bi bi-window-stack', 0),
	(10, 'Защита питания', 'Power protection', 'bi bi-battery-charging', 0),
	(11, 'Бытовая техника', 'Appliances', 'bi bi-tv', 0),
	(12, 'Смартфоны', 'Smartphones', 'bi bi-phone', 0),
	(13, 'Смарт-часы', 'Smartwatch', 'bi bi-smartwatch', 0),
	(14, 'Системы видеонаблюдения', 'Video surveillance systems', 'bi bi-camera-video', 0);
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;

-- Дамп структуры для таблица f0220387_ustore.orders
CREATE TABLE IF NOT EXISTS `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL DEFAULT '0',
  `products_id` char(255) COLLATE utf8_unicode_ci NOT NULL,
  `price` int(11) NOT NULL DEFAULT '0',
  `full_price` int(11) NOT NULL DEFAULT '0',
  `payment_type` int(11) NOT NULL DEFAULT '0',
  `shipping_type` int(11) NOT NULL DEFAULT '0',
  `delivery_address` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `delivery_time` int(11) NOT NULL DEFAULT '0',
  `is_hidden` int(11) NOT NULL DEFAULT '0',
  `created_time` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Дамп данных таблицы f0220387_ustore.orders: ~9 rows (приблизительно)
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` (`id`, `user_id`, `products_id`, `price`, `full_price`, `payment_type`, `shipping_type`, `delivery_address`, `delivery_time`, `is_hidden`, `created_time`) VALUES
	(1, 4, '23|1', 23, 44, 1, 2, '', 0, 1, 2),
	(2, 4, '23|6', 23, 44, 2, 1, '', 0, 1, 2),
	(3, 4, '6|6', 0, 0, 1, 2, '1233232', 1, 1, 1685633476),
	(4, 4, '6|5', 0, 0, 1, 1, 'Павлодарская область, Лермонтова, 45/2', 1, 1, 1685634279),
	(5, 4, '6|1', 0, 0, 1, 1, 'Павлодарская область, Лермонтова, 45/2', 1, 1, 1685637219),
	(6, 4, '1|2,4|1,6|4', 0, 0, 1, 2, '213123123', 1, 1, 1685813615),
	(7, 4, '1|1,4|1,6|1', 0, 0, 1, 1, 'Павлодарская область, Лермонтова, 45/2', 1, 1, 1685814163),
	(8, 4, '1|2,4|25,6|2', 0, 0, 1, 1, 'Павлодарская область, Лермонтова, 45/2', 1, 1, 1685814495),
	(9, 4, '1|2,4|25,6|2', 1009266, 1009543, 1, 1, 'Павлодарская область, Лермонтова, 45/2', 1, 0, 1685814642),
	(10, 4, '6|5,1|1,7|2,9|2,8|1', 1134590, 1246168, 1, 2, 'Ак. Чокина 36, кв 124', 1, 0, 1685817017),
	(11, 5, '9|1', 25696, 25696, 1, 1, 'Павлодарская область, Лермонтова, 45/2', 1, 1, 1685874634),
	(12, 4, '9|1', 25696, 25696, 1, 1, 'Павлодарская область, Лермонтова, 45/2', 1, 1, 1685906017),
	(13, 4, '9|1', 25696, 25696, 1, 1, 'Павлодарская область, Лермонтова, 45/2', 1, 1, 1686061381),
	(14, 8, '18|1', 25696, 25696, 2, 1, 'Павлодарская область, Лермонтова, 45/2', 1, 0, 1686804468),
	(15, 4, '9|1', 66998, 334990, 2, 2, 'ломова 30', 1, 0, 1686934365);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;

-- Дамп структуры для таблица f0220387_ustore.products
CREATE TABLE IF NOT EXISTS `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category_id` int(11) NOT NULL DEFAULT '0',
  `image` varchar(512) COLLATE utf8_unicode_ci NOT NULL,
  `name_ru` char(255) COLLATE utf8_unicode_ci NOT NULL,
  `name_en` char(255) COLLATE utf8_unicode_ci NOT NULL,
  `desc_ru` varchar(1024) COLLATE utf8_unicode_ci NOT NULL,
  `desc_en` varchar(1024) COLLATE utf8_unicode_ci NOT NULL,
  `images` json NOT NULL COMMENT 'Images Array',
  `type` int(11) NOT NULL DEFAULT '0',
  `price` int(11) NOT NULL DEFAULT '0',
  `discount` int(11) NOT NULL DEFAULT '0' COMMENT 'Discount in %',
  `guarantee` int(11) NOT NULL DEFAULT '0',
  `count` int(11) NOT NULL DEFAULT '0',
  `bonus_percentage` int(11) NOT NULL DEFAULT '5' COMMENT 'Bonus percentage',
  `is_sale` int(11) NOT NULL DEFAULT '0',
  `is_disabled` int(11) NOT NULL DEFAULT '0',
  `is_deleted` int(11) NOT NULL DEFAULT '0',
  `custom_fields` json NOT NULL,
  `edited_time` int(11) NOT NULL,
  `created_time` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Дамп данных таблицы f0220387_ustore.products: ~12 rows (приблизительно)
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` (`id`, `category_id`, `image`, `name_ru`, `name_en`, `desc_ru`, `desc_en`, `images`, `type`, `price`, `discount`, `guarantee`, `count`, `bonus_percentage`, `is_sale`, `is_disabled`, `is_deleted`, `custom_fields`, `edited_time`, `created_time`) VALUES
	(1, 2, 'https://sun11-2.userapi.com/impf/c845522/v845522717/183db4/rxePT1S7jl4.jpg?size=807x504&quality=96&sign=b37780dfc5d6923947815f4b447e7c44&c_uniq_tag=-zn74WhDqiKO-WOGEC9RAfkdiZ9PVsMISfgNzaY19TU&type=album', 'ТЕСТ', 'TEST', 'ОПИСАНИЕ', 'DESCSFVJSAOFVMOSAMFGOASJMFD', 'null', 0, 144, 4, 2, 2, 15, 0, 1, 0, 'null', 1686064061, 1685019317),
	(6, 3, '/static/computers/1.jpg', 'ПК Aerocool Core i3-10100 3,6GHz/8хDDR4/SSD240Gb/GTX1650/RGB', 'PC Aerocool Core i3-10100 3,6GHz/8хDDR4/SSD240Gb/GTX1650/RGB', 'ПК Aerocool Core i3-10100 3,6GHz/8хDDR4/SSD240Gb/GTX1650/RGB', 'PC Aerocool Core i3-10100 3,6GHz/8хDDR4/SSD240Gb/GTX1650/RGB', 'null', 0, 215590, 0, 12, 5, 5, 1, 0, 0, 'null', 0, 1685436897),
	(7, 3, '/static/computers/2.jpg', 'ПК GIGABYTE BRIX GB-BACE-3000 INTEL CELERON N3000', 'PC GIGABYTE BRIX GB-BACE-3000 INTEL CELERON N3000', 'ПК GIGABYTE BRIX GB-BACE-3000 INTEL CELERON N3000', 'PC GIGABYTE BRIX GB-BACE-3000 INTEL CELERON N3000', 'null', 0, 48491, 5, 12, 5, 5, 0, 0, 0, 'null', 0, 1685815569),
	(9, 4, '/static/accessories/1.jpg', 'Процессор Intel Core i9 13900K, LGA1700, OEM', 'Processor Intel Core i9 13900K, LGA1700, OEM', 'Производитель: Intel, Тип процессора: Core i9, Сокет: LGA1700, Модель: 13900K', 'Manufacturer: Intel, Processor type: Core i9, Socket: LGA1700, Model: 13900K', 'null', 0, 334990, 20, 12, 2, 5, 0, 0, 0, 'null', 1686792049, 1686792009),
	(10, 9, '/static/programs/1.jpg', 'Операционная система Windows 10 Home', 'OS Windows 10 Home', 'Операционная система', 'Operating system', 'null', 0, 54990, 70, 12, 15, 5, 1, 0, 0, 'null', 1686791356, 1686791183),
	(11, 9, '/static/programs/2.webp', 'Операционная система Windows 11 Home', 'OS Windows 11 Home', 'Microsoft Windows HOME 11 64-bit All Lng PK Lic Online DwnLd NR (ESD)', 'Microsoft Windows HOME 11 64-bit All Lng PK Lic Online DwnLd NR (ESD)', 'null', 0, 84990, 0, 12, 50, 5, 0, 0, 0, 'null', 1686791348, 1686791313),
	(12, 14, '/static/video/1.jpg', 'Камера видеонаблюдения Xiaomi Mi Camera 2K MJSXJ03HL, White', 'Security camera Xiaomi Mi Camera 2K MJSXJ03HL, White', 'Тип устройства: Система видеонаблюдения, Производитель: Xiaomi, Модель: Mi Camera 2K MJSXJ03HL', 'Device type: Surveillance system, Manufacturer: Xiaomi, Model: Mi Camera 2K MJSXJ03HL', 'null', 0, 16990, 30, 18, 0, 5, 0, 0, 0, 'null', 1686803661, 1686792376),
	(13, 5, '/static/office/1.jpeg', 'Принтер струйный Epson Stylus L805', 'Inkjet printer Epson Stylus L805', 'Производитель: EPSON, Модель: Stylus L805, Максимальный формат печати:  A4', 'Manufacturer: EPSON, Model: Stylus L805, Maximum print size: A4', 'null', 0, 205990, 50, 24, 5, 5, 1, 0, 0, 'null', 0, 1686792219),
	(15, 12, '/static/mobile/2.webp', 'Смартфон HUAWEI Nova 10 128GB Starry Silver', 'Smartphone HUAWEI Nova 10 128GB Starry Silver', 'Смартфон HUAWEI Nova 10 128GB Starry Silver, Модельный год - 2022, Диагональ дисплея, дюйм - 6.67, Разрешение дисплея - 1080x2400, Тип матрицы - OLED', 'Smartphone HUAWEI Nova 10 128GB Starry Silver, Model year - 2022, Display diagonal, inch - 6.67, Display resolution - 1080x2400, Matrix type - OLED', 'null', 0, 259990, 10, 12, 5, 5, 0, 0, 0, 'null', 0, 1686791783),
	(16, 12, '/static/mobile/1.webp', 'Смартфон HUAWEI Nova 10 Pro 256GB Starry Black', 'Smartphone HUAWEI Nova 10 Pro 256GB Starry Black', 'Смартфон HUAWEI Nova 10 Pro 256GB Starry Black, Модельный год - 2022, Диагональ дисплея, дюйм - 6.78, Разрешение дисплея - 2652x1200, Тип матрицы - OLED', 'Smartphone HUAWEI Nova 10 Pro 256GB Starry Black, Model year - 2022, Display diagonal, inch - 6.78, Display resolution - 2652x1200, Matrix type - OLED', 'null', 0, 329990, 0, 12, 7, 5, 0, 0, 0, 'null', 1686791833, 1686791589),
	(17, 6, '/static/info_carriers/1.jpg', 'ВНЕШНИЙ HDD APACER AC236 512GB USB 3.1 ЖЕЛТЫЙ', 'EXTERNAL HDD APACER AC236 512GB USB 3.1 YELLOW', 'ВНЕШНИЙ HDD 512GB USB 3.1 ЖЕЛТЫЙ', 'EXTERNAL HDD 512GB USB 3.1 YELLOW', 'null', 0, 19700, 2, 12, 5, 5, 0, 0, 0, 'null', 0, 1685815874),
	(18, 6, '/static/info_carriers/2.jpg', 'ВНЕШНИЙ HDD APACER AC236 1TB USB 3.1 СИНИЙ', 'EXTERNAL HDD APACER AC236 1TB USB 3.1 BLUE', 'ВНЕШНИЙ HDD 1TB USB 3.1 СИНИЙ', 'EXTERNAL HDD 1TB USB 3.1 BLUE', 'null', 0, 25696, 0, 12, 55, 5, 0, 0, 0, 'null', 1686064828, 1685815932);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;

-- Дамп структуры для таблица f0220387_ustore.reviews
CREATE TABLE IF NOT EXISTS `reviews` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL COMMENT 'Account id',
  `product_id` int(11) NOT NULL DEFAULT '-1',
  `name` char(255) COLLATE utf8_unicode_ci NOT NULL,
  `text` varchar(2048) COLLATE utf8_unicode_ci NOT NULL,
  `status` int(11) NOT NULL COMMENT '0 - moderation, 1 - active, 2 - banned',
  `time` int(11) NOT NULL COMMENT 'Unixtime',
  `likes` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Дамп данных таблицы f0220387_ustore.reviews: ~9 rows (приблизительно)
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` (`id`, `user_id`, `product_id`, `name`, `text`, `status`, `time`, `likes`) VALUES
	(11, 4, -1, 'Станислав Жуков', 'Test review', 1, 1684742474, 0),
	(12, 4, -1, 'Станислав Жуков', 'test', 0, 1685087386, 0),
	(13, 4, 6, 'Станислав Жуков', 'Test', 1, 1685646359, 0),
	(14, 4, 6, 'Станислав Жуков', 'sfdsdf', 1, 1685646846, 0),
	(15, 4, 6, 'Станислав Жуков', '123123', 1, 1685647066, 0),
	(16, 4, 6, 'Станислав Жуков', '123', 0, 1685783445, 0),
	(17, 4, -1, 'Станислав Жуков', 'test', 0, 1685783538, 0),
	(18, 4, -1, 'Станислав Жуков', 'test', 0, 1685810189, 0),
	(19, 4, 6, 'Станислав Жуков', 'Это отзыв к продукту 6', 0, 1685810263, 0),
	(20, 4, 5, 'Станислав Жуков', 'A bla', 1, 1685811782, 0),
	(21, 4, 8, 'Станислав Жуков', 'Test review', 1, 1685817189, 0);
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;

-- Дамп структуры для таблица f0220387_ustore.sub_categories
CREATE TABLE IF NOT EXISTS `sub_categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category_id` int(11) NOT NULL,
  `name_ru` char(50) COLLATE utf8_unicode_ci NOT NULL,
  `name_en` char(50) COLLATE utf8_unicode_ci NOT NULL,
  `icon` char(50) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Дамп данных таблицы f0220387_ustore.sub_categories: ~0 rows (приблизительно)
/*!40000 ALTER TABLE `sub_categories` DISABLE KEYS */;
/*!40000 ALTER TABLE `sub_categories` ENABLE KEYS */;

-- Дамп структуры для таблица f0220387_ustore.tables
CREATE TABLE IF NOT EXISTS `tables` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `name` char(50) COLLATE utf8_unicode_ci NOT NULL,
  `table` char(50) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=97 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=DYNAMIC;

-- Дамп данных таблицы f0220387_ustore.tables: ~7 rows (приблизительно)
/*!40000 ALTER TABLE `tables` DISABLE KEYS */;
INSERT INTO `tables` (`id`, `name`, `table`) VALUES
	(89, 'accounts', 'accounts'),
	(90, 'tokens', 'tokens'),
	(91, 'reviews', 'reviews'),
	(92, 'categories', 'categories'),
	(93, 'products', 'products'),
	(94, 'sub_categories', 'sub_categories'),
	(95, 'basket', 'basket'),
	(96, 'orders', 'orders');
/*!40000 ALTER TABLE `tables` ENABLE KEYS */;

-- Дамп структуры для таблица f0220387_ustore.tokens
CREATE TABLE IF NOT EXISTS `tokens` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `app_id` int(11) NOT NULL,
  `access_token` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_time` int(11) NOT NULL,
  `expired_time` int(11) NOT NULL,
  `last_active_time` int(11) NOT NULL,
  `last_active_country` char(5) COLLATE utf8_unicode_ci NOT NULL,
  `last_active_ip` char(50) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `access_token` (`access_token`)
) ENGINE=InnoDB AUTO_INCREMENT=82 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Дамп данных таблицы f0220387_ustore.tokens: ~5 rows (приблизительно)
/*!40000 ALTER TABLE `tokens` DISABLE KEYS */;
INSERT INTO `tokens` (`id`, `user_id`, `app_id`, `access_token`, `created_time`, `expired_time`, `last_active_time`, `last_active_country`, `last_active_ip`) VALUES
	(73, 7, 0, '9qIw33ELnZuH56lmIp96x71zWqdE9omn9w9LJk8AfKF82fWYRcGCBy18z15ERNq8ZOv382pzHjxzbY4S', 1686282768, 1688874768, 1686888789, 'KZ', '92.46.16.63'),
	(74, 4, 0, 'ei6XaFn9LiP0XvgX4TsS4HeQ2c8XHCO5xItid8fh44w4GeaeaYq5HR0e9lcVx1yV7xZR7p4kre3tx46R', 1686599925, 1689191925, 1686600218, 'KZ', '46.42.244.24'),
	(75, 4, 0, 'K01Z0yUS6HJD42CG47HtR1909Ek2SA2vGlSADv57Ri8qSgrYZf8tiwXvOEq4ARVjZDFxMnLf2101s01B', 1686652822, 1689244822, 1687774275, 'KZ', '188.246.255.228'),
	(78, 4, 0, 'YAmO56y5KYcqwUQOk15223A7qoy25nlva0XjajOtcag71ejfmPF6uAmjPEX7M923DQ4g47xaVt7RLCRs', 1686796639, 1689388639, 1687556728, 'KZ', '46.42.240.7'),
	(81, 4, 0, 'CPskeSH33Gt81VdlmBX7I5lM7jF1N8nilKL0nuF739Dl2Z8Pu75kmGlMZo1yNO8eL9m1TtY92885iOl6', 1686814830, 1689406830, 1688808093, 'KZ', '46.42.238.102');
/*!40000 ALTER TABLE `tokens` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
