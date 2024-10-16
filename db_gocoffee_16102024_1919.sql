-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 16, 2024 at 02:19 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_gocoffee`
--

-- --------------------------------------------------------

--
-- Table structure for table `Coffees`
--

DROP TABLE IF EXISTS `Coffees`;
CREATE TABLE `Coffees` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `image_link` varchar(255) NOT NULL,
  `type` enum('starling','modern') DEFAULT NULL,
  `desc` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4;


--
-- Dumping data for table `Coffees`
--

LOCK TABLES `Coffees` WRITE;

INSERT INTO `Coffees` (`id`, `name`, `image_link`, `type`, `desc`, `createdAt`, `updatedAt`) VALUES
(2, 'Latte', 'https://images.unsplash.com/photo-1543256840-0709ad5d3726?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y29mZmVlJTIwcGhvdG9ncmFwaHl8ZW58MHx8MHx8fDA%3D', 'modern', 'Minuman kopi yang dibuat dengan espresso dan susu yang dikukus.', '2024-07-29 05:19:50', '2024-07-29 05:19:50'),
(3, 'Cappuccino', 'https://somedayilllearn.com/wp-content/uploads/2020/05/cup-of-black-coffee-scaled-720x540.jpeg', 'modern', 'Minuman kopi berbasis espresso dengan busa susu di atasnya.', '2024-07-29 05:22:02', '2024-07-29 05:22:02'),
(4, 'Americano', 'https://www.allrecipes.com/thmb/Hqro0FNdnDEwDjrEoxhMfKdWfOY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/21667-easy-iced-coffee-ddmfs-4x3-0093-7becf3932bd64ed7b594d46c02d0889f.jpg', 'modern', 'Espresso yang dicampur dengan air panas untuk menghasilkan rasa kopi yang lebih ringan.', '2024-07-29 05:22:59', '2024-07-29 05:22:59'),
(5, 'Mocha', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXwck4mtr1y1MulgaJWP79_3t4yO57dS0dGw&s', 'modern', 'Kombinasi antara kopi, cokelat, dan susu yang dikukus.', '2024-07-29 05:23:11', '2024-07-29 05:23:11'),
(6, 'Macchiato', 'https://static.scientificamerican.com/sciam/cache/file/4A9B64B5-4625-4635-848AF1CD534EBC1A_source.jpg?w=1200', 'modern', 'Espresso dengan sedikit busa susu di atasnya.', '2024-07-29 05:23:22', '2024-07-29 05:23:22'),
(7, 'Kopi Susu', 'https://yt3.ggpht.com/a/AGF-l7_GFzf2d2HlmH3lA3GoQ3OBrC3r8eMkFgAvYw=s900-c-k-c0xffffffff-no-rj-mo', 'starling', 'Kopi campur susu', '2024-07-29 05:24:54', '2024-07-29 05:24:54'),
(8, 'Kopi Hitam', 'https://awsimages.detik.net.id/community/media/visual/2020/10/31/kopi-hitam-4.jpeg?w=724', 'starling', 'Kopi seduh hitam', '2024-07-29 05:25:33', '2024-07-29 05:25:33'),
(9, 'Kopi Jahe', 'https://knowyourgrinder.com/wp-content/uploads/2017/05/Kopi_Jahe.jpg', 'starling', 'Kopi seduh campur jahe', '2024-07-29 05:26:29', '2024-07-29 05:26:29');
UNLOCK TABLES;
-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
CREATE TABLE `Users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `salt` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone_number` varchar(255) NOT NULL,
  `token` varchar(255) DEFAULT NULL,
  `type` enum('user','merchant') NOT NULL DEFAULT 'user',
  `verified` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;


--
-- Dumping data for table `Users`
--
LOCK TABLES `Users` WRITE;

INSERT INTO `Users` (`id`, `name`, `password`, `salt`, `email`, `phone_number`, `token`, `type`, `verified`, `createdAt`, `updatedAt`) VALUES
(1, 'toko kopi', '893fdf15ce:196c3c573511078e60e5c0dc802296649aa285b3', '893fdf15ce', 'jaymerch@mail.com', '085', 'cmcoGbnPRjWVwhjh4yhD9q:APA91bFVbeHyrCKPIugYZO4dzu4Qesir8RmLUM34oWgwtmS4-kOMhAcmXx5_IznLLxc49d-PKCdSb5z7ORFfavixktL3f5wihQ1vSei8BANjyeLVvfyE_koA7tjUKNi7WRgNNaS-968m', 'merchant', 1, '2024-07-12 06:04:52', '2024-10-16 01:45:21'),
(2, 'humam', '34392e700e:a8c9b374f69f49a67127c756b1d4004235226a1a', '34392e700e', 'humam@mail.com', '085', 'dO1fFCYLRIaY2Zskl6GRCl:APA91bH8dOMzkYTOOJZHKq8l0ZmDBm5uGWbw5f34YY0Fv4tAZFu-O0-4vP4S5_BcmITWX4ZQbL7p3auOLKNL0s6yVy9k0W5DgDsfIfAQG43oJak3i1lyT19-wD6SXKI0wOqlSdZwW2xL', 'user', 1, '2024-07-12 06:05:20', '2024-09-14 08:04:54'),
(3, 'afif', 'e69d9189de:dce9fabeb6969e025df18f8cf6e190bbd8b7cec0', 'e69d9189de', 'afif@mail.com', '0812345678', 'ftob7WyQRou-aKG5rG-wkl:APA91bGglmqcvM_vLFIRp1d7p7GeGaUGd2dBM87tv8auuaF5Rr1M2sHuk5XR7K18616aGZolTBFJSWsvwnoT1fdZGUHoRMCs9XUAeE1j5WVVATKkSkw_615kTot2kU8fDt_4F1bS99di', 'merchant', 1, '2024-07-12 08:58:06', '2024-09-24 16:29:14'),
(4, 'wahyu', '02f1c4fea1:a6d1c122ed89c973a1ad76e6b2155586218181f4', '02f1c4fea1', 'wahyu@mail.com', '0856431297', 'ftob7WyQRou-aKG5rG-wkl:APA91bGglmqcvM_vLFIRp1d7p7GeGaUGd2dBM87tv8auuaF5Rr1M2sHuk5XR7K18616aGZolTBFJSWsvwnoT1fdZGUHoRMCs9XUAeE1j5WVVATKkSkw_615kTot2kU8fDt_4F1bS99di', 'user', 1, '2024-07-12 09:22:42', '2024-08-06 08:59:50'),
(5, 'adi', '6a134faca1:ace71b37abe65db32b92a7033378508185fe7afd', '6a134faca1', 'adi@mail.com', '085', 'cBB1fxNBRSeq7HDNtezpMc:APA91bHWOE56zi3tgph8yJj7wrhmgEPoLbRbheI4QCl36fW0mfqeZg1ANUDyWFmlxI71c4_9VmAH14rzuRDiB8rN3HQ4q3Ju8EhAeAVt5Q0HdlKt96IZHRzJZou2VEBi2irWbLqpPLmg', 'user', 1, '2024-07-12 11:52:42', '2024-07-16 14:07:53'),
(6, 'mas adi', '8b742ecb88:2028034fc4b9ef3cccf71f9f9a9c2d406ecc5463', '8b742ecb88', 'masadi@mail.com', '08971231', 'cL5zgUocTTqcW0o0WB75FR:APA91bHsHVxh-uB6QmQ-_OGEx0ReBn7lxBW4txgRePOTka2ZaxcOvQcDzFuqQKhTLvjfUgsRxYnNMWriZDWN9Wd7XipfKeIG97wmOPcUydvJy5roY3Vuxj_0RhERHBsGwzEAQ4esmOdf', 'user', 0, '2024-07-16 13:47:32', '2024-10-16 10:29:37'),
(7, 'byan', '4d95f0c14e:1aa39a317bf7ae77a04fe114f8b13b2d1e3717b7', '4d95f0c14e', 'byan@mail.com', '08123456321', 'eYD1FnSVSlWdfX1PpJtcHp:APA91bFNGpn-0NzezVFQOtzCU6qT__KxQueIaMbqZmBY3GqKQyUT5L7LWvCuthCtkkP7cME8n8VSKQIxvox-oCLrcmAkQsx35brCuXLBo_4fP_bYgZhoHqr-rhirkoKC0MJdadoF5-3-', 'user', 0, '2024-07-20 03:58:57', '2024-10-16 10:29:36'),
(8, 'admin', '1e68031b60:b59f2efec6fff4b2d2874e3bbc1d87e8934ab1d5', '1e68031b60', 'admin@mail.com', '085075625', 'cmcoGbnPRjWVwhjh4yhD9q:APA91bFVbeHyrCKPIugYZO4dzu4Qesir8RmLUM34oWgwtmS4-kOMhAcmXx5_IznLLxc49d-PKCdSb5z7ORFfavixktL3f5wihQ1vSei8BANjyeLVvfyE_koA7tjUKNi7WRgNNaS-968m', 'admin', 1, '2024-10-11 03:05:26', '2024-10-15 10:35:52');
UNLOCK TABLES;

--
-- Table structure for table `Merchants`
--

DROP TABLE IF EXISTS `Merchants`;
CREATE TABLE `Merchants` (
  `id` int NOT NULL AUTO_INCREMENT,
  `stock` int DEFAULT '0',
  `price` int DEFAULT '0',
  `status` enum('active','inactive','ongoing') NOT NULL DEFAULT 'active',
  `latitude` varchar(255) DEFAULT NULL,
  `longitude` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `userID` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userID` (`userID`),
  CONSTRAINT `merchants_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `Users` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;


--
-- Dumping data for table `Merchants`
--
LOCK TABLES `Merchants` WRITE;

INSERT INTO `Merchants` (`id`, `stock`, `price`, `status`, `latitude`, `longitude`, `avatar`, `userID`, `createdAt`, `updatedAt`) VALUES
(1, 5, 10000, 'active', '-6.2412908', '106.7993934', NULL, 1, '2024-07-12 06:04:52', '2024-10-16 10:00:25'),
(2, 5, 10000, 'active', '-6.225265', '106.8019933', NULL, 3, '2024-07-12 08:58:06', '2024-08-19 05:51:03');
UNLOCK TABLES;

-- --------------------------------------------------------


--
-- Table structure for table `Orders`
--

DROP TABLE IF EXISTS `Orders`;
CREATE TABLE `Orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `amount` int NOT NULL,
  `totalPrice` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `address_detail` varchar(255) NOT NULL,
  `latitude_buyer` varchar(255) NOT NULL,
  `longitude_buyer` varchar(255) NOT NULL,
  `coffee_requested` varchar(255) DEFAULT NULL,
  `done_at` datetime DEFAULT NULL,
  `status` enum('searching','cancelled','completed','ongoing') NOT NULL DEFAULT 'searching',
  `userID` int NOT NULL,
  `merchantID` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userID` (`userID`),
  KEY `merchantID` (`merchantID`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `Users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`merchantID`) REFERENCES `Merchants` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=87 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Orders`
--
LOCK TABLES `Orders` WRITE;

INSERT INTO `Orders` (`id`, `amount`, `totalPrice`, `address`, `address_detail`, `latitude_buyer`, `longitude_buyer`, `coffee_requested`, `done_at`, `status`, `userID`, `merchantID`, `createdAt`, `updatedAt`) VALUES
(1, 10, '10000', 'Jalan Prof. Soedarto', 'sebelah', '-7.0702302', '110.416262', NULL, '2024-07-12 06:59:51', 'completed', 2, 1, '2024-07-12 06:07:21', '2024-07-12 06:59:51'),
(2, 10, '10000', 'Jalan Prof. Soedarto', 'sebelah', '-7.0702302', '110.416262', NULL, NULL, 'searching', 2, NULL, '2024-07-12 06:07:57', '2024-07-12 06:07:57'),
(3, 10, '10000', 'Jalan Prof. Soedarto', 'sebelah', '-7.0702302', '110.416262', NULL, NULL, 'searching', 2, NULL, '2024-07-12 06:08:54', '2024-07-12 06:08:54'),
(4, 10, '10000', 'Jalan Prof. Soedarto', 'sebelah', '-7.0702302', '110.416262', NULL, NULL, 'searching', 2, NULL, '2024-07-12 06:09:12', '2024-07-12 06:09:12'),
(5, 10, '10000', 'Jalan Prof. Soedarto', 'sebelah', '-7.0702302', '110.416262', NULL, NULL, 'searching', 2, NULL, '2024-07-12 06:09:37', '2024-07-12 06:09:37'),
(6, 10, '10000', 'Jalan Prof. Soedarto', 'sebelah', '-7.0702302', '110.416262', NULL, NULL, 'searching', 2, NULL, '2024-07-12 06:09:58', '2024-07-12 06:09:58'),
(7, 10, '10000', 'Jalan Prof. Soedarto', 'sebelah', '-7.0702302', '110.416262', NULL, NULL, 'searching', 2, NULL, '2024-07-12 06:10:10', '2024-07-12 06:10:10'),
(8, 10, '10000', 'Jalan Prof. Soedarto', 'sebelah', '-7.0702302', '110.416262', NULL, NULL, 'searching', 2, NULL, '2024-07-12 06:11:16', '2024-07-12 06:11:16'),
(9, 10, '10000', 'Jalan Prof. Soedarto', 'sebelah', '-7.0702302', '110.416262', NULL, '2024-07-12 06:46:36', 'completed', 2, 1, '2024-07-12 06:11:31', '2024-07-12 06:46:36'),
(10, 10, '4000', 'kalingga utara', 'dekat masjid', '-7.0708788', '110.416567', NULL, '2024-07-12 06:54:20', 'completed', 2, 1, '2024-07-12 06:47:18', '2024-07-12 06:54:20'),
(11, 1, '1', 'jalan maling no 1', 'sebelah sd', '-7.0708771', '110.4165606', NULL, NULL, 'searching', 2, NULL, '2024-07-12 06:55:54', '2024-07-12 06:55:54'),
(12, 50, '50', 'prof soedarto', 'yg manis', '-7.0708795', '110.416546', NULL, '2024-07-12 07:02:07', 'completed', 2, 1, '2024-07-12 07:00:23', '2024-07-12 07:02:07'),
(13, 10, '10', 'haji amin', 'yg pait', '-7.0708853', '110.4165498', NULL, '2024-07-12 07:03:02', 'completed', 2, 1, '2024-07-12 07:02:27', '2024-07-12 07:03:02'),
(14, 10, '10000', 'haji naim', 'apa adanya aja mas', '-7.0708808', '110.4165265', NULL, '2024-07-12 07:07:15', 'completed', 2, 1, '2024-07-12 07:04:37', '2024-07-12 07:07:15'),
(15, 3, '20000', 'haji ahmad', 'yang penting barokah', '-7.0708849', '110.4165395', NULL, '2024-07-12 07:07:53', 'completed', 2, 1, '2024-07-12 07:07:37', '2024-07-12 07:07:53'),
(16, 10, '10000', 'Jalan Prof. Soedarto', 'sebelah', '-7.0702302', '110.416262', NULL, '2024-07-12 07:08:45', 'completed', 2, 1, '2024-07-12 07:08:19', '2024-07-12 07:08:45'),
(17, 10, '10000', 'Jalan Kalingga', 'mantap mas', '-7.0702302', '110.416262', NULL, '2024-07-12 07:09:20', 'completed', 2, 1, '2024-07-12 07:09:10', '2024-07-12 07:09:20'),
(18, 10, '10000', 'Jalan Kalingga', 'mantap mas', '-7.0702302', '110.416262', NULL, '2024-07-12 07:10:20', 'completed', 2, 1, '2024-07-12 07:09:56', '2024-07-12 07:10:20'),
(19, 10, '10000', 'Jalan Kalingga', 'mantap mas', '-7.0702302', '110.416262', NULL, NULL, 'searching', 2, NULL, '2024-07-12 07:10:25', '2024-07-12 07:10:25'),
(20, 10, '10000', 'Jalan Kalingga', 'mantap mas', '-7.0702302', '110.416262', NULL, NULL, 'searching', 2, NULL, '2024-07-12 07:10:35', '2024-07-12 07:10:35'),
(21, 10, '10000', 'Jalan Kalingga', 'mantap mas', '-7.0702302', '110.416262', NULL, '2024-07-12 07:12:34', 'completed', 2, 1, '2024-07-12 07:11:04', '2024-07-12 07:12:34'),
(22, 1, '5000', 'jkt', 'qervbjjk', '-6.2247555', '106.8030069', NULL, '2024-07-12 08:59:49', 'completed', 2, 2, '2024-07-12 08:59:24', '2024-07-12 08:59:49'),
(23, 1, '5000', 'jkt', 'ghxgvn', '-6.2247555', '106.8030069', NULL, '2024-07-12 09:02:52', 'completed', 2, 2, '2024-07-12 09:00:28', '2024-07-12 09:02:52'),
(24, 10, '10000', 'jalan patinura', 'jangan lama lama', '-7.070873', '110.416553', NULL, NULL, 'searching', 2, NULL, '2024-07-12 09:04:59', '2024-07-12 09:04:59'),
(25, 1, '5000', 'hkt', 'fessssd', '-6.2255696', '106.8034133', NULL, NULL, 'searching', 2, NULL, '2024-07-12 09:05:44', '2024-07-12 09:05:44'),
(26, 10, '10000', 'jalan patinura', 'jangan lama lama', '-7.070873', '110.416553', NULL, '2024-07-12 09:09:49', 'completed', 2, 1, '2024-07-12 09:06:00', '2024-07-12 09:09:49'),
(27, 1, '5000', 'hkt', 'fessssd', '-6.2255696', '106.8034133', NULL, NULL, 'searching', 2, NULL, '2024-07-12 09:06:28', '2024-07-12 09:06:28'),
(28, 1, '5000', 'hkt', 'fessssd', '-6.2255696', '106.8034133', NULL, '2024-07-12 09:07:21', 'completed', 2, 2, '2024-07-12 09:06:53', '2024-07-12 09:07:21'),
(29, 1, '5000', 'jkt', 'gjncghk', '-6.2247543', '106.8030188', NULL, '2024-07-12 09:14:19', 'completed', 2, 2, '2024-07-12 09:13:19', '2024-07-12 09:14:19'),
(30, 1, '5000', 'jkt', 'vgdrfsf', '-6.2247527', '106.8030118', NULL, '2024-07-12 09:27:14', 'completed', 4, 2, '2024-07-12 09:26:30', '2024-07-12 09:27:14'),
(31, 12, '5000', 'simpang 5', 'hahahihi', '-7.0708817', '110.4165684', NULL, NULL, 'searching', 5, NULL, '2024-07-12 11:53:24', '2024-07-12 11:53:24'),
(32, 12, '5000', 'simpang 5', 'hahahihi', '-7.0708817', '110.4165684', NULL, NULL, 'searching', 5, NULL, '2024-07-12 11:53:40', '2024-07-12 11:53:40'),
(33, 12, '5000', 'simpang 5', 'hahahihi', '-7.0708958', '110.4165501', NULL, NULL, 'searching', 5, NULL, '2024-07-12 11:54:03', '2024-07-12 11:54:03'),
(34, 12, '5000', 'simpang 5', 'hahahihi', '-7.0708958', '110.4165501', NULL, NULL, 'searching', 5, NULL, '2024-07-12 11:54:40', '2024-07-12 11:54:40'),
(35, 12, '5000', 'simpang 5', 'hahahihi', '-7.0708958', '110.4165501', NULL, '2024-07-12 11:55:40', 'completed', 5, 1, '2024-07-12 11:55:13', '2024-07-12 11:55:40'),
(36, 10, '10000', 'Jalan Kalingga', 'mantap mas', '-7.0702302', '110.416262', NULL, '2024-07-12 12:00:44', 'completed', 2, 1, '2024-07-12 12:00:27', '2024-07-12 12:00:44'),
(37, 5, '8000', 'halim', 'hahahaha', '-7.0708804', '110.4166512', NULL, '2024-07-12 12:01:46', 'completed', 5, 1, '2024-07-12 12:01:24', '2024-07-12 12:01:46'),
(38, 12, '50000', 'pjgujj', 'huuijhjuj', '-7.0708715', '110.4165519', NULL, '2024-07-12 12:03:43', 'completed', 5, 1, '2024-07-12 12:02:58', '2024-07-12 12:03:43'),
(39, 12, '5000', 'ghhvhh', 'haha\n', '-7.0708835', '110.4165132', NULL, '2024-07-12 12:09:01', 'completed', 5, 1, '2024-07-12 12:08:17', '2024-07-12 12:09:01'),
(40, 1, '5000', 'bks', 'q\n', '-6.2218121', '107.00258', NULL, NULL, 'searching', 4, NULL, '2024-07-13 07:44:03', '2024-07-13 07:44:03'),
(41, 1, '5000', 'bks', 'q', '-6.2218187', '107.0025475', NULL, '2024-07-13 07:46:41', 'completed', 4, 2, '2024-07-13 07:45:38', '2024-07-13 07:46:41'),
(42, 1, '2', '3', 'q', '-6.2218187', '107.0025475', NULL, NULL, 'searching', 4, NULL, '2024-07-13 07:47:25', '2024-07-13 07:47:25'),
(43, 1, '2', '3', 'q', '-6.2218187', '107.0025475', NULL, '2024-07-13 07:48:32', 'completed', 4, 2, '2024-07-13 07:47:52', '2024-07-13 07:48:32'),
(44, 10, '1000', 'Bks', 'Banyakin kopinya', '-6.210516', '106.9966505', NULL, '2024-07-14 12:49:47', 'completed', 4, 2, '2024-07-14 12:49:17', '2024-07-14 12:49:47'),
(45, 1, '5000', 'qwer', 'qwer', '-7.0614683', '110.42502', NULL, NULL, 'searching', 2, NULL, '2024-07-16 13:59:39', '2024-07-16 13:59:39'),
(46, 1, '2000', 'qwer', 'qwer', '-7.0614683', '110.42502', NULL, '2024-07-16 14:04:13', 'completed', 6, 1, '2024-07-16 14:03:10', '2024-07-16 14:04:13'),
(47, 10, '50000', 'rama home', 'homeless', '-7.0708909', '110.4165478', NULL, '2024-07-16 14:09:23', 'completed', 5, 1, '2024-07-16 14:08:59', '2024-07-16 14:09:23'),
(48, 1, '5000', 'bks', 'bks', '-6.2105647', '106.9966969', NULL, '2024-07-17 11:54:01', 'completed', 4, 2, '2024-07-17 11:53:28', '2024-07-17 11:54:01'),
(49, 1, '5000', 'bks', 'Sofjan', '-6.2083076', '107.0035618', NULL, NULL, 'searching', 4, NULL, '2024-07-18 12:14:10', '2024-07-18 12:14:10'),
(50, 1, '5000', 'bks', 'sush ', '-6.1959479', '107.0102828', NULL, '2024-07-20 04:01:06', 'completed', 7, 2, '2024-07-20 04:00:35', '2024-07-20 04:01:06'),
(51, 1, '5000', 'bks', 'skrng', '-6.1998454', '107.0108107', NULL, NULL, 'searching', 4, NULL, '2024-07-24 15:39:55', '2024-07-24 15:39:55'),
(52, 1, '10000', 'hahaha', 'wawawa', '-7.0708788', '110.4165471', NULL, '2024-07-27 05:41:55', 'completed', 4, 1, '2024-07-27 05:41:08', '2024-07-27 05:41:55'),
(53, 10, '10000', 'Jalan Kalingga', 'mantap mas', '-7.0702302', '110.416262', NULL, NULL, 'searching', 2, NULL, '2024-07-27 08:13:22', '2024-07-27 08:13:22'),
(54, 10, '10000', 'Jalan Kalingga', 'mantap mas', '-7.0702302', '110.416262', NULL, NULL, 'searching', 2, NULL, '2024-07-29 04:20:40', '2024-07-29 04:20:40'),
(55, 1, '1000', 'vabaha', 'bababa', '-7.0709405', '110.4165421', 'Mocha', NULL, 'searching', 4, NULL, '2024-07-29 07:20:03', '2024-07-29 07:20:03'),
(56, 1, '1000', 'vabaha', 'bababa', '-7.0709405', '110.4165421', 'Mocha', NULL, 'searching', 4, NULL, '2024-07-29 07:21:26', '2024-07-29 07:21:26'),
(57, 10, '10000', 'gagaga', 'gagaga', '-7.0709405', '110.4165421', 'Mocha', NULL, 'searching', 4, NULL, '2024-07-29 07:22:31', '2024-07-29 07:22:31'),
(58, 10, '10000', 'gagaga', 'gagaga', '-7.0709405', '110.4165421', 'Mocha', NULL, 'searching', 4, NULL, '2024-07-29 07:24:32', '2024-07-29 07:24:32'),
(59, 10, '10000', 'Jalan Kalingga', 'mantap mas', '-7.0700289', '110.4045476', 'Kopi Hitam, Kopi Jahe', NULL, 'searching', 2, NULL, '2024-07-29 08:44:09', '2024-07-29 08:44:09'),
(60, 10, '10000', 'Jalan Kalingga', 'mantap mas', '-7.0708846', '110.4165259', 'Kopi Hitam, Kopi Jahe', NULL, 'searching', 2, NULL, '2024-07-29 08:45:27', '2024-07-29 08:45:27'),
(61, 10, '10000', 'Jalan Kalingga', 'mantap mas', '-7.0708846', '110.4165259', 'Kopi Hitam, Kopi Jahe', NULL, 'searching', 2, NULL, '2024-07-29 08:45:49', '2024-07-29 08:45:49'),
(62, 10, '10000', 'Jalan Kalingga', 'mantap mas', '-7.0708846', '110.4165259', 'Kopi Hitam, Kopi Jahe', NULL, 'searching', 2, NULL, '2024-07-29 08:46:06', '2024-07-29 08:46:06'),
(63, 10, '10000', 'Jalan Kalingga', 'mantap mas', '-7.0708846', '110.4165259', 'Kopi Hitam, Kopi Jahe', NULL, 'searching', 2, NULL, '2024-07-29 08:47:39', '2024-07-29 08:47:39'),
(64, 10, '10000', 'Jalan Kalingga', 'mantap mas', '-7.0708846', '110.4165259', 'Kopi Hitam, Kopi Jahe', NULL, 'searching', 2, NULL, '2024-07-29 08:47:50', '2024-07-29 08:47:50'),
(65, 10, '10000', 'Jalan Kalingga', 'mantap mas', '-7.0708846', '110.4165259', 'Kopi Hitam, Kopi Jahe', NULL, 'searching', 2, NULL, '2024-07-29 08:48:10', '2024-07-29 08:48:10'),
(66, 10, '10000', 'Jalan Kalingga', 'mantap mas', '-7.0708846', '110.4165259', 'Kopi Hitam, Kopi Jahe', NULL, 'searching', 2, NULL, '2024-07-29 08:48:21', '2024-07-29 08:48:21'),
(67, 10, '10000', 'Jalan Kalingga', 'mantap mas', '-7.0708846', '110.4165259', 'Kopi Hitam, Kopi Jahe', NULL, 'searching', 2, NULL, '2024-07-29 08:49:08', '2024-07-29 08:49:08'),
(68, 10, '10000', 'Jalan Kalingga', 'mantap mas', '-7.0708846', '110.4165259', 'Kopi Hitam, Kopi Jahe', NULL, 'searching', 2, NULL, '2024-07-29 08:49:19', '2024-07-29 08:49:19'),
(69, 10, '10000', 'Jalan Kalingga', 'mantap mas', '-7.0708846', '110.4165259', 'Kopi Hitam, Kopi Jahe', NULL, 'searching', 2, NULL, '2024-07-29 08:49:50', '2024-07-29 08:49:50'),
(70, 10, '10000', 'Jalan Kalingga', 'mantap mas', '-7.0708846', '110.4165259', 'Kopi Hitam, Kopi Jahe', NULL, 'searching', 2, NULL, '2024-07-29 08:50:03', '2024-07-29 08:50:03'),
(71, 10, '10000', 'Jalan Kalingga', 'mantap mas', '-7.0708846', '110.4165259', 'Kopi Hitam, Kopi Jahe', '2024-07-29 09:13:47', 'completed', 2, 1, '2024-07-29 09:12:48', '2024-07-29 09:13:47'),
(72, 1, '15000', 'Rumah Humam', 'Bonus 1 gratis', '-6.2126626', '106.995568', 'Kopi Jahe', NULL, 'searching', 4, NULL, '2024-07-29 15:07:21', '2024-07-29 15:07:21'),
(73, 1, '15000', 'Rumah Humam', 'Bonus 1 gratis', '-6.2126626', '106.995568', 'Kopi Jahe', '2024-07-29 15:10:29', 'completed', 4, 2, '2024-07-29 15:08:17', '2024-07-29 15:10:29'),
(74, 1, '15000', 'jkt', 'tanpa gula', '-6.197221', '106.8495728', 'Latte', '2024-07-30 07:54:34', 'completed', 4, 2, '2024-07-30 07:54:02', '2024-07-30 07:54:34'),
(75, 2, '15000', 'jkt', 'kmkminkm', '-6.1944483', '106.8229183', 'Mocha, Macchiato', NULL, 'searching', 2, NULL, '2024-08-01 11:33:49', '2024-08-01 11:33:49'),
(76, 2, '15000', 'jkt', 'kmkminkm', '-6.1944483', '106.8229183', 'Mocha, Macchiato', '2024-08-01 11:35:30', 'completed', 2, 2, '2024-08-01 11:34:55', '2024-08-01 11:35:30'),
(77, 1, '20000', 'jakarta', 'tanpa gula', '-6.1944483', '106.8229183', 'Latte', NULL, 'searching', 2, NULL, '2024-08-02 08:17:55', '2024-08-02 08:17:55'),
(78, 1, '20000', 'jakarta', 'tanpa gula', '-6.1944483', '106.8229183', 'Latte', NULL, 'searching', 2, NULL, '2024-08-02 08:19:02', '2024-08-02 08:19:02'),
(79, 1, '20000', 'jakarta', 'tanpa gula', '-6.1944483', '106.8229183', 'Latte', '2024-08-02 08:48:12', 'completed', 2, 2, '2024-08-02 08:44:14', '2024-08-02 08:48:12'),
(80, 1, '20000', 'cipanas', 'tanpa gula', '-6.7336083', '107.0410983', 'Latte', NULL, 'searching', 2, NULL, '2024-08-03 04:33:23', '2024-08-03 04:33:23'),
(81, 1, '20000', 'cipanas', 'tanpa gula', '-6.7336083', '107.0410983', 'Latte', '2024-08-03 04:34:31', 'completed', 2, 2, '2024-08-03 04:33:23', '2024-08-03 04:34:31'),
(82, 1, '10000', 'bks', '1', '-6.2004267', '107.0080833', 'Latte', '2024-08-12 13:21:18', 'completed', 2, 2, '2024-08-12 13:18:52', '2024-08-12 13:21:18'),
(83, 1, '10000', 'bekasi', 'tanpa gula', '-6.1994017', '107.0096217', 'Mocha', NULL, 'searching', 2, NULL, '2024-08-12 13:24:24', '2024-08-12 13:24:24'),
(84, 1, '10000', 'bekasi', 'tanpa gula', '-6.1994017', '107.0096217', 'Mocha', NULL, 'searching', 2, NULL, '2024-08-12 13:25:08', '2024-08-12 13:25:08'),
(85, 1, '5000', 'jkt', 'no sugar', '-6.2247254', '106.8030241', 'Latte', '2024-08-13 03:04:17', 'completed', 2, 2, '2024-08-13 03:03:26', '2024-08-13 03:04:17'),
(86, 5, '10000', 'Jakarta', 'tanpa gula ', '-6.2247135', '106.803081', 'Latte, Cappuccino, Mocha, Macchiato, Kopi Susu', '2024-08-19 05:51:03', 'completed', 2, 2, '2024-08-19 05:47:33', '2024-08-19 05:51:03'),
(87, 1, '10000', 'kalingga', 'sebelah', '-6.2412908', '106.7993934', 'Latte', '2024-10-16 03:08:44', 'completed', 4, 1, '2024-10-16 03:06:50', '2024-10-16 03:08:44'),
(88, 1, '10000', 'kalingga', 'sebelah', '-6.2412908', '106.7993934', 'Latte', '2024-10-16 03:10:29', 'completed', 4, 1, '2024-10-16 03:08:53', '2024-10-16 03:10:29'),
(89, 1, '10000', 'kalingga', 'sebelah', '-6.2412708', '106.7993934', 'Latte', NULL, 'searching', 4, NULL, '2024-10-16 03:10:37', '2024-10-16 03:10:37'),
(90, 1, '10000', 'kalingga', 'sebelah', '-6.2402708', '106.7993934', 'Latte', NULL, 'searching', 4, NULL, '2024-10-16 03:10:51', '2024-10-16 03:10:51'),
(91, 1, '10000', 'kalingga', 'sebelah', '-6.2102708', '106.7993934', 'Latte', NULL, 'searching', 4, NULL, '2024-10-16 03:11:11', '2024-10-16 03:11:11'),
(92, 1, '10000', 'kalingga', 'sebelah', '-6.2102708', '106.7993934', 'Latte', NULL, 'searching', 4, NULL, '2024-10-16 03:11:17', '2024-10-16 03:11:17'),
(93, 1, '10000', 'kalingga', 'sebelah', '-6.2102708', '106.7993934', 'Latte', NULL, 'searching', 4, NULL, '2024-10-16 03:15:01', '2024-10-16 03:15:01'),
(94, 1, '10000', 'kalingga', 'sebelah', '-6.2102708', '106.7993934', 'Latte', '2024-10-16 03:31:36', 'completed', 4, 1, '2024-10-16 03:19:53', '2024-10-16 03:31:36'),
(95, 1, '10000', 'kalingga', 'sebelah', '-6.2102708', '106.7993934', 'Latte', '2024-10-16 03:32:51', 'completed', 4, 1, '2024-10-16 03:31:54', '2024-10-16 03:32:51'),
(96, 1, '10000', 'kalingga', 'sebelah', '-6.2102708', '106.7993934', 'Latte', '2024-10-16 10:00:25', 'completed', 4, 1, '2024-10-16 03:32:57', '2024-10-16 10:00:25');
UNLOCK TABLES;

-- --------------------------------------------------------


--
-- Table structure for table `merchantCoffees`
--

DROP TABLE IF EXISTS `merchantCoffees`;
CREATE TABLE `merchantCoffees` (
  `id` int NOT NULL AUTO_INCREMENT,
  `merchantID` int NOT NULL,
  `coffeeID` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `merchantID` (`merchantID`),
  KEY `coffeeID` (`coffeeID`),
  CONSTRAINT `merchantCoffees_ibfk_1` FOREIGN KEY (`merchantID`) REFERENCES `Merchants` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `merchantCoffees_ibfk_2` FOREIGN KEY (`coffeeID`) REFERENCES `Coffees` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=102 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `merchantCoffees`
--
LOCK TABLES `merchantCoffees` WRITE;
INSERT INTO `merchantCoffees` (`id`, `merchantID`, `coffeeID`, `createdAt`, `updatedAt`) VALUES
(17, 1, 2, '2024-07-29 08:45:44', '2024-07-29 08:45:44'),
(18, 1, 3, '2024-07-29 08:45:44', '2024-07-29 08:45:44'),
(19, 1, 4, '2024-07-29 08:45:44', '2024-07-29 08:45:44'),
(20, 1, 6, '2024-07-29 08:45:44', '2024-07-29 08:45:44'),
(21, 1, 7, '2024-07-29 08:45:44', '2024-07-29 08:45:44'),
(22, 1, 5, '2024-07-29 08:45:44', '2024-07-29 08:45:44'),
(23, 1, 8, '2024-07-29 08:45:44', '2024-07-29 08:45:44'),
(24, 1, 9, '2024-07-29 08:45:44', '2024-07-29 08:45:44'),
(94, 2, 2, '2024-08-19 05:44:43', '2024-08-19 05:44:43'),
(95, 2, 3, '2024-08-19 05:44:43', '2024-08-19 05:44:43'),
(96, 2, 4, '2024-08-19 05:44:43', '2024-08-19 05:44:43'),
(97, 2, 5, '2024-08-19 05:44:43', '2024-08-19 05:44:43'),
(98, 2, 6, '2024-08-19 05:44:43', '2024-08-19 05:44:43'),
(99, 2, 7, '2024-08-19 05:44:43', '2024-08-19 05:44:43'),
(100, 2, 8, '2024-08-19 05:44:43', '2024-08-19 05:44:43'),
(101, 2, 9, '2024-08-19 05:44:43', '2024-08-19 05:44:43');
UNLOCK TABLES;

-- --------------------------------------------------------

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
