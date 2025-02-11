-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: laundry_user
-- ------------------------------------------------------
-- Server version	8.0.39

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
-- Table structure for table `session_token`
--

DROP TABLE IF EXISTS `session_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `session_token` (
  `id` int NOT NULL AUTO_INCREMENT,
  `expiry_data` datetime(6) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK11pmljlexd29lehad8evbkmiq` (`user_id`),
  CONSTRAINT `FKaop51xhbhthlbhkphrg5adspt` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `session_token`
--

LOCK TABLES `session_token` WRITE;
/*!40000 ALTER TABLE `session_token` DISABLE KEYS */;
INSERT INTO `session_token` VALUES (2,'2025-02-10 10:55:56.916332','3870caaa-3f9d-40d5-9ba1-93602ab613a9','058d598f-c3a0-4179-a753-ac16185f9e45'),(3,'2025-02-10 11:04:53.124392','cac453a2-7c22-4e97-944c-ee354e9f24c8','4e775019-059e-46f4-b350-e26d34f4af9e'),(5,'2025-02-10 11:28:50.669947','f188455f-13bc-4925-8758-9533dd7140de','admin4');
/*!40000 ALTER TABLE `session_token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `hostel` varchar(255) DEFAULT NULL,
  `is_admin` bit(1) DEFAULT NULL,
  `laundry_id` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('058d598f-c3a0-4179-a753-ac16185f9e45','a@a.a','Y-4',_binary '\0','0751325d-c7d1-4248-b8b3-0d14b6936eb4','$2a$10$xcDfPnca9okT79HgaC0pJuZJFIiLAd6ppHAdSO.aggWS5cKznqaRK','Aniket'),('4e775019-059e-46f4-b350-e26d34f4af9e','aa@a.a','Y-4',_binary '\0','395eda5e-2cfe-4f52-afd9-109cc77ba28e','$2a$10$Fk14EZY8d.p8Wyj1RReauOPlolKxpTUMPeZGpcep.IDVkAEwZtW2u','asdd'),('admin','admin@admin.admin',NULL,_binary '',NULL,'a',NULL),('admin2','admin@admin.admin',NULL,_binary '',NULL,'$2a$10$xcDfPnca9okT79HgaC0pJuZJFIiLAd6ppHAdSO.aggWS5cKznqaRK',NULL),('admin3','admin@admin.admin',NULL,_binary '',NULL,'$2a$10$ay.oFDWr7vitWu1WL4xFxujaspLnYFpmHappyzeStgtKNOsnYnH4i',NULL),('admin4','admin2@admin.admin',NULL,_binary '',NULL,'$2a$10$ay.oFDWr7vitWu1WL4xFxujaspLnYFpmHappyzeStgtKNOsnYnH4i',NULL),('efbd1944-7c4b-4a9b-9d77-62c126bb3c12','b@b.b','b',_binary '\0','1c3f5e17-177c-4f5a-8558-de93ff231ebb','$2a$10$ay.oFDWr7vitWu1WL4xFxujaspLnYFpmHappyzeStgtKNOsnYnH4i','a');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-12  0:21:45
