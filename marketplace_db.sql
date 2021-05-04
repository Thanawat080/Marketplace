-- -------------------------------------------------------------
-- TablePlus 3.12.4(360)
--
-- https://tableplus.com/
--
-- Database: webpro
-- Generation Time: 2564-03-24 16:41:03.5400
-- -------------------------------------------------------------


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(10) AUTO_INCREMENT,
  `f_name` varchar(250),
  `l_name` varchar(250),
  `username` varchar(250),
  `password` varchar(250),
  `email` varchar(250),
  `phone_number` char(10),
  `usertype` enum('owner_marketplace','seller', 'buyer'),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `owner_marketplace`;
CREATE TABLE `owner_marketplace` (
  `id` int(10) not null,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`id`) REFERENCES `user`(`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `seller`;
CREATE TABLE `seller` (
  `id` int(10) not null,
  `cardId` char(13),
  `cardId_pic` varchar(255),
  `status` boolean,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`id`) 
  REFERENCES `user`(`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `buyer`;
CREATE TABLE `buyer` (
  `id` int(10) not null,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`id`) 
  REFERENCES `user`(`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `event`;
CREATE TABLE `event` (
  `id` int(10) AUTO_INCREMENT,
  `event_name` varchar(255),
  `start_date` date,
  `end_date` date,
  `owner_marketplace_id` int(10) not null,
  `discount` int(10),
  PRIMARY KEY (`id`),
  FOREIGN KEY (`owner_marketplace_id`) 
  REFERENCES `owner_marketplace`(`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `store`;
CREATE TABLE `store` (
  `subscription_type` enum('free', 'normal', 'epic'),
  `store_name` varchar(255),
  `description` varchar(255),
  `id` int(10) AUTO_INCREMENT,
  `reportnumber` int(10),
  `seller_id` int(10) not null,
  `owner_marketplace_id` int(10) not null,
  `store_picture` varchar(255),
  PRIMARY KEY (`id`),
  FOREIGN KEY (`seller_id`) 
  REFERENCES `seller`(`id`),
  FOREIGN KEY (`owner_marketplace_id`) 
  REFERENCES `owner_marketplace`(`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `product`;
CREATE TABLE `product` (
  `p_name` varchar(255),
  `price` float(8,2),
  `id` int(10) AUTO_INCREMENT,
  `description` text,
  `store_id` int(10) not null,
  `category_id` int(10) not null,
  `quantity` int(10),
  PRIMARY KEY (`id`),
  FOREIGN KEY (`store_id`) 
  REFERENCES `store`(`id`),
  FOREIGN KEY (`category_id`) 
  REFERENCES `category`(`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
  `id` int(10) AUTO_INCREMENT,
  `category_name` varchar(255),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `product_picture`;
CREATE TABLE `product_picture` (
  `product_id` int(10) not null,
  `picture_no` int(10) AUTO_INCREMENT,
  `picture` varchar(255),
  PRIMARY KEY (`picture_no`),
  FOREIGN KEY (`product_id`) 
  REFERENCES `product`(`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `order`;
CREATE TABLE `order` (
  `buyer_id` int(10) not null,
  `order_id` int(10) AUTO_INCREMENT,
  `order_price` float(8,2),
  `date` date,
  `address` text,
  PRIMARY KEY (`order_id`),
  FOREIGN KEY (`buyer_id`) 
  REFERENCES `buyer`(`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `order_detail`;
CREATE TABLE `order_detail` (
  `product_id` int(10),
  `order_id` int(10),
  `id` int(10) AUTO_INCREMENT,
  `total_price` float(8,2),
  `quantity` int(10),
  `price` float(8,2),
  PRIMARY KEY (`id`),
  FOREIGN KEY (`product_id`) 
  REFERENCES `product`(`id`),
  FOREIGN KEY (`order_id`) 
  REFERENCES `order`(`order_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

-- admin password == Password123
INSERT INTO `user` (`id`, `f_name`, `l_name`, `username`, `password`, `email`, `phone_number`, `usertype`) VALUES
('1', 'admin', 'test', 'admin', `$2b$05$uJRB4.I7QucwCHcSEdNUt.9GhJnHbyc3lV9lJCpJKINZZx9xpDRsu`, 'admin@email.com', '0123456789', 'owner_marketplace')

INSERT INTO `owner_marketplace` (`id`) VALUES
('1');


INSERT INTO `category` (`category_name`) VALUES
('อาหารสด, แช่แข็ง & เบเกอรี่'),
('อาหารแห้ง & อาหารกระป๋อง'),
('เครื่องดื่ม, ขนมขบเคี้ยว & ของหวาน'),
('ผลิตภัณฑ์เพื่อสุขภาพ & ความงาม'),
('ผลิตภัณฑ์สำหรับเด็ก'),
('ผลิตภัณฑ์สำหรับสัตว์เลี้ยง'),
('ผลิตภัณฑ์ทำความสะอาดในครัวเรือน'),
('เครื่องใช้ไฟฟ้า & อุปกรณ์ภายในบ้าน'),
('เสื้อผ้าเครื่องแต่งกาย'),
('สินค้าอื่นๆ');
