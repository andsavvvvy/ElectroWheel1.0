-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: electrowheeldb
-- ------------------------------------------------------
-- Server version	8.0.35

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `idadmin` int unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(45) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idadmin`),
  UNIQUE KEY `idadmin_UNIQUE` (`idadmin`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `password_UNIQUE` (`password`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (1,'savulescu@gmail.com','DraxlMaier'),(2,'x','x');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer` (
  `idcustomer` int unsigned NOT NULL AUTO_INCREMENT,
  `first_name` varchar(45) DEFAULT 'John',
  `last_name` varchar(45) DEFAULT 'Doe',
  `email` varchar(45) DEFAULT 'yourmail@yahoo.com',
  `password` varchar(45) DEFAULT 'pass',
  `billing_address` varchar(45) NOT NULL,
  `warning_lvl` int DEFAULT NULL,
  PRIMARY KEY (`idcustomer`),
  UNIQUE KEY `idcustomer_UNIQUE` (`idcustomer`),
  UNIQUE KEY `billing_address_UNIQUE` (`billing_address`),
  UNIQUE KEY `password_UNIQUE` (`password`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES (1,'Mocanu','Bogdanu','mocanu@gmail.com','BD&RC','ccccc',1),(3,'Y','Y','Y','Y','Y',0);
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invoice`
--

DROP TABLE IF EXISTS `invoice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invoice` (
  `idinvoice` int unsigned NOT NULL AUTO_INCREMENT,
  `gross_amount` float NOT NULL,
  `vat` float NOT NULL,
  `net_amount` float NOT NULL,
  `paid` tinyint NOT NULL,
  PRIMARY KEY (`idinvoice`),
  UNIQUE KEY `idinvoice_UNIQUE` (`idinvoice`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoice`
--

LOCK TABLES `invoice` WRITE;
/*!40000 ALTER TABLE `invoice` DISABLE KEYS */;
INSERT INTO `invoice` VALUES (1,50.12,12.1,60.122,1),(2,44,44,44,1),(3,12.3,2.337,14.637,0),(4,12.3,2.337,14.637,0),(5,12.3,2.337,14.637,0),(6,12.3,2.337,14.637,0),(7,12.3,2.337,14.637,0),(8,12.3,2.337,14.637,0),(9,12.3,2.337,14.637,0),(10,12.3,2.337,14.637,0),(11,12.3,2.337,14.637,0),(12,12.3,2.337,14.637,0),(13,12.3,2.337,14.637,0),(14,12.3,2.337,14.637,0),(15,12.3,2.337,14.637,0),(16,0,0,0,1),(17,0,0,0,0),(18,0,0,0,1),(19,12.3,2.337,14.637,1);
/*!40000 ALTER TABLE `invoice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rental`
--

DROP TABLE IF EXISTS `rental`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rental` (
  `idrental` int unsigned NOT NULL AUTO_INCREMENT,
  `idvehicle` int unsigned NOT NULL,
  `idcustomer` int unsigned NOT NULL,
  `rent_date` varchar(45) NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `idinvoice` int unsigned DEFAULT NULL,
  PRIMARY KEY (`idrental`),
  UNIQUE KEY `idrental_UNIQUE` (`idrental`),
  UNIQUE KEY `idinvoice_UNIQUE` (`idinvoice`),
  KEY `fk_link_2_idx` (`idvehicle`),
  KEY `fk_link_3_idx` (`idcustomer`),
  CONSTRAINT `fk_link_2` FOREIGN KEY (`idvehicle`) REFERENCES `vehicle` (`idvehicle`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_link_3` FOREIGN KEY (`idcustomer`) REFERENCES `customer` (`idcustomer`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_link_4` FOREIGN KEY (`idinvoice`) REFERENCES `invoice` (`idinvoice`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rental`
--

LOCK TABLES `rental` WRITE;
/*!40000 ALTER TABLE `rental` DISABLE KEYS */;
INSERT INTO `rental` VALUES (1,3,3,'2001-01-01','16:01:01','16:01:01',1),(5,3,3,'2001-01-01','16:01:01','16:01:01',2),(6,1,3,'2024-04-08','18:34:54','18:34:54',NULL),(7,1,3,'2024-04-08','18:41:01','18:41:01',NULL),(8,1,3,'2024-04-08','18:45:02','18:51:47',7),(9,1,3,'2024-04-08','18:53:18','19:10:29',13),(10,1,3,'2024-04-08','19:11:13','19:16:26',15),(11,1,3,'2024-04-08','19:17:28','19:17:28',NULL),(12,1,3,'2024-04-08','19:21:40','19:21:52',16),(13,1,3,'2024-04-08','19:24:40','19:24:40',NULL),(14,1,3,'2024-04-08','19:29:15','19:29:15',NULL),(15,1,3,'2024-04-08','19:29:34','19:32:07',17),(16,1,3,'2024-04-08','19:32:53','19:32:57',18),(17,1,3,'2024-04-09','07:41:43','07:43:03',19);
/*!40000 ALTER TABLE `rental` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vehicle`
--

DROP TABLE IF EXISTS `vehicle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vehicle` (
  `idvehicle` int unsigned NOT NULL AUTO_INCREMENT,
  `idvehicle_type` int unsigned NOT NULL,
  `register_date` date NOT NULL,
  `xcoord` float DEFAULT NULL,
  `ycoord` float DEFAULT NULL,
  `available` tinyint DEFAULT NULL,
  PRIMARY KEY (`idvehicle`),
  UNIQUE KEY `idvehicle_UNIQUE` (`idvehicle`),
  KEY `fk_link_1_idx` (`idvehicle_type`),
  CONSTRAINT `fk_link_1` FOREIGN KEY (`idvehicle_type`) REFERENCES `vehicle_type` (`idvehicle_type`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vehicle`
--

LOCK TABLES `vehicle` WRITE;
/*!40000 ALTER TABLE `vehicle` DISABLE KEYS */;
INSERT INTO `vehicle` VALUES (1,1,'2023-01-04',44.3888,26.0387,1),(2,1,'2023-01-04',44.4,26.01,1),(3,1,'2023-01-04',44.41,26.21,1);
/*!40000 ALTER TABLE `vehicle` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vehicle_type`
--

DROP TABLE IF EXISTS `vehicle_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vehicle_type` (
  `idvehicle_type` int unsigned NOT NULL AUTO_INCREMENT,
  `description_vehicle` varchar(45) NOT NULL,
  `price_per_minute` float NOT NULL,
  PRIMARY KEY (`idvehicle_type`),
  UNIQUE KEY `idvehicle_type_UNIQUE` (`idvehicle_type`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vehicle_type`
--

LOCK TABLES `vehicle_type` WRITE;
/*!40000 ALTER TABLE `vehicle_type` DISABLE KEYS */;
INSERT INTO `vehicle_type` VALUES (1,'trotineta',12.3);
/*!40000 ALTER TABLE `vehicle_type` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-10 16:22:10
