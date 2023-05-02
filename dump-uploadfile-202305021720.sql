-- MySQL dump 10.13  Distrib 8.0.32, for Linux (x86_64)
--
-- Host: localhost    Database: uploadfile
-- ------------------------------------------------------
-- Server version	8.0.32-0ubuntu0.22.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `board`
--

DROP TABLE IF EXISTS `board`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `board` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '게시물 ID',
  `title` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '게시물 제목',
  `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci COMMENT '게시물 내용',
  `writer` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '게시물 작성자',
  `passwd` varchar(100) DEFAULT NULL,
  `regdate` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '제시물 작성일자',
  `img` json DEFAULT NULL COMMENT '제시물 이미지',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `board`
--

LOCK TABLES `board` WRITE;
/*!40000 ALTER TABLE `board` DISABLE KEYS */;
INSERT INTO `board` VALUES (1,'2222','2222','1111','1111','2023-05-02 10:46:40',NULL),(3,'2222','2222','1111','1111','2023-05-02 08:10:43',NULL),(4,'2222','2222','1111','1111','2023-05-02 08:10:44',NULL),(5,'2222','2222','1111','1111','2023-05-02 08:10:45',NULL),(6,'2222','2222','1111','1111','2023-05-02 08:10:46',NULL),(7,'2222','2222','1111','1111','2023-05-02 08:10:47',NULL),(8,'2222','2222','1111','','2023-05-02 08:17:29',NULL),(9,'2222','2222','1111','','2023-05-02 08:17:30',NULL),(10,'2222','2222','1111','','2023-05-02 08:17:30',NULL),(11,'2222','2222','1111','','2023-05-02 08:17:30',NULL),(12,'2222','2222','1111','','2023-05-02 08:17:30',NULL),(13,'2222','2222','1111','','2023-05-02 08:17:31',NULL);
/*!40000 ALTER TABLE `board` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `uploadfiles`
--

DROP TABLE IF EXISTS `uploadfiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `uploadfiles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(100) DEFAULT NULL,
  `content` text,
  `files` json DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `uploadfiles`
--

LOCK TABLES `uploadfiles` WRITE;
/*!40000 ALTER TABLE `uploadfiles` DISABLE KEYS */;
INSERT INTO `uploadfiles` VALUES (16,'vvvv','vvvv','[{\"url\": \"/img/스크린샷 2023-03-17 15-15-58_1682557047036.png\", \"filename\": \"스크린샷 2023-03-17 15-15-58_1682557047036.png\"}, {\"url\": \"/img/스크린샷 2023-03-17 15-35-18_1682557047038.png\", \"filename\": \"스크린샷 2023-03-17 15-35-18_1682557047038.png\"}, {\"url\": \"/img/스크린샷 2023-03-17 15-36-27_1682557047039.png\", \"filename\": \"스크린샷 2023-03-17 15-36-27_1682557047039.png\"}]');
/*!40000 ALTER TABLE `uploadfiles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'uploadfile'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-02 17:20:58
