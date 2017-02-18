-- MySQL dump 10.13  Distrib 5.7.12, for Win64 (x86_64)
--
-- Host: localhost    Database: bamazon_db
-- ------------------------------------------------------
-- Server version	5.7.15-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `departments`
--

DROP TABLE IF EXISTS `departments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `departments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `department_name` varchar(30) NOT NULL,
  `over_head_costs` decimal(9,2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departments`
--

LOCK TABLES `departments` WRITE;
/*!40000 ALTER TABLE `departments` DISABLE KEYS */;
INSERT INTO `departments` VALUES (1,'Electronics & Computers',5000000.00),(2,'Clothing, Shoes & Jewelry',1000000.00),(3,'Home, Garden & Tools',2000000.00),(4,'Sports & Outdoors',450000.00),(5,'Office Supplies',5000.00),(6,'Baby',20000.00),(7,'Back to School',30000.00);
/*!40000 ALTER TABLE `departments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_name` varchar(30) NOT NULL,
  `department_id` int(11) DEFAULT NULL,
  `price` decimal(9,2) DEFAULT NULL,
  `stock_quantity` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `department_id` (`department_id`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Pioneer SP-FS52',1,129.00,12),(2,'Yamaha NS-SP1800BL',1,157.35,220),(3,'Onkyo TZ-3500SHD',1,375.75,351),(4,'Calvin Klein Jeans',2,79.99,319),(5,'Columbia Men’s Coat',2,235.75,1267),(6,'UGG Women\'s Boots',2,175.99,194),(7,'GE Microwave',3,250.00,80),(8,'LG Refrigerator',3,1350.00,164),(9,'Entertainment Center',3,370.00,439),(10,'TaylorMade Driver',4,306.00,300),(11,'Cobra 3 Wood',4,279.25,700),(12,'CCM Hockey Goalie Pads',4,536.00,887),(13,'Dell Laptop XPS',1,3500.00,89),(14,'Samsung Galaxy S8',1,200.00,300);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sales`
--

DROP TABLE IF EXISTS `sales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sales` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) DEFAULT NULL,
  `quantity_purchased` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `sales_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sales`
--

LOCK TABLES `sales` WRITE;
/*!40000 ALTER TABLE `sales` DISABLE KEYS */;
INSERT INTO `sales` VALUES (1,1,5,'2017-02-16 03:54:37'),(2,1,4,'2017-02-16 03:56:53'),(3,4,5,'2017-02-16 03:57:52'),(4,7,5,'2017-02-16 03:58:59'),(5,1,4,'2017-02-16 04:07:56'),(6,1,3,'2017-02-16 04:09:17'),(7,1,5,'2017-02-16 04:11:39'),(8,1,2,'2017-02-16 04:13:23'),(9,1,2,'2017-02-16 04:14:12'),(10,1,2,'2017-02-16 04:17:46'),(11,12,1,'2017-02-16 16:00:05'),(12,1,70,'2017-02-17 18:02:41'),(13,1,3,'2017-02-18 01:27:39'),(14,2,2,'2017-02-18 01:31:56'),(15,7,3,'2017-02-18 01:35:51'),(16,6,2,'2017-02-18 01:39:19'),(17,2,3,'2017-02-18 02:05:52'),(18,13,1,'2017-02-18 02:08:49'),(19,4,3,'2017-02-18 02:12:29'),(20,4,3,'2017-02-18 02:14:36'),(21,4,3,'2017-02-18 02:14:56'),(22,2,3,'2017-02-18 02:39:18'),(23,6,3,'2017-02-18 02:42:20');
/*!40000 ALTER TABLE `sales` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-02-17 21:51:15
