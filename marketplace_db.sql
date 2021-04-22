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
  `f_name` varchar(250) NOT NULL,
  `l_name` varchar(250) NOT NULL,
  `username` varchar(250) NOT NULL,
  `password` varchar(250) not null,
  `email` varchar(250),
  `phone_number` int(10),
  `usertype` enum('owner_marketplace','seller', 'buyer') not null,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `owner_marketplace`;
CREATE TABLE `owner_marketplace` (
  `id` int(10),
  PRIMARY KEY (`id`),
  FOREIGN KEY (`id`) REFERENCES `user`(`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `seller`;
CREATE TABLE `seller` (
  `id` int(10),
  PRIMARY KEY (`id`),
  FOREIGN KEY (`id`) 
  REFERENCES `user`(`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `buyer`;
CREATE TABLE `buyer` (
  `id` int(10),
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
  `owner_marketplace_id` int(10),
  PRIMARY KEY (`id`),
  FOREIGN KEY (`owner_marketplace_id`) 
  REFERENCES `owner_marketplace`(`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `payment`;
CREATE TABLE `payment` (
  `card_number` int(10) AUTO_INCREMENT,
  `expiration_date` char(5),
  `security_code` int(3),
  `seller_id` int(10),
  PRIMARY KEY (`card_number`),
  FOREIGN KEY (`seller_id`) 
  REFERENCES `seller`(`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `store`;
CREATE TABLE `store` (
  `subscription_type` enum('free', 'normal', 'epic') not null,
  `store_name` varchar(255) not null,
  `description` varchar(255),
  `id` int(10) AUTO_INCREMENT,
  `seller_id` int(10) not null,
  `owner_marketplace_id` int(10) not null,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`seller_id`) 
  REFERENCES `seller`(`id`),
  FOREIGN KEY (`owner_marketplace_id`) 
  REFERENCES `owner_marketplace`(`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `product`;
CREATE TABLE `product` (
  `p_name` varchar(255) not null,
  `price` float(8,2) not null,
  `id` int(10) AUTO_INCREMENT,
  `description` text not null,
  `promotion_price` float(8,2),
  `store_id` int(10) not null,
  `category_id` int(10) not null,
  `quantity` int(10) not null,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`store_id`) 
  REFERENCES `store`(`id`),
  FOREIGN KEY (`category_id`) 
  REFERENCES `category`(`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
  `id` int(10) AUTO_INCREMENT,
  `category_name` varchar(255) not null,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `product_picture`;
CREATE TABLE `product_picture` (
  `product_id` int(10) not null,
  `picture_no` int(10) AUTO_INCREMENT,
  `picture` varchar(255) not null,
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


INSERT INTO `user` (`id`, `f_name`, `l_name`, `username`, `password`, `email`, `phone_number`, `usertype`) VALUES
('1', 'admin', 'test', 'admin', 'password', 'admin@email.com', '0123456789', 'owner_marketplace'),
('2', 'seller', 'test', 'seller', 'password', 'seller@email.com', '0254687910', 'seller');

INSERT INTO `owner_marketplace` (`id`) VALUES
('1');

INSERT INTO `seller` (`id`) VALUES
('2');


