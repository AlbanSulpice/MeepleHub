-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: bddproject
-- ------------------------------------------------------
-- Server version	8.0.36

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
-- Table structure for table `categorie`
--

DROP TABLE IF EXISTS `categorie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categorie` (
  `id_categorie` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) NOT NULL,
  PRIMARY KEY (`id_categorie`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorie`
--

LOCK TABLES `categorie` WRITE;
/*!40000 ALTER TABLE `categorie` DISABLE KEYS */;
INSERT INTO `categorie` VALUES (1,'Stratégie'),(2,'Familial'),(3,'Ambiance'),(4,'Cartes'),(5,'Gestion'),(6,'Conquête');
/*!40000 ALTER TABLE `categorie` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jeu`
--

DROP TABLE IF EXISTS `jeu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jeu` (
  `id_jeu` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) NOT NULL,
  `description` text,
  `duree` int DEFAULT NULL,
  `nb_joueurs_min` int DEFAULT NULL,
  `nb_joueurs_max` int DEFAULT NULL,
  `quantite_total` int NOT NULL,
  `quantite_disponible` int NOT NULL,
  PRIMARY KEY (`id_jeu`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jeu`
--

LOCK TABLES `jeu` WRITE;
/*!40000 ALTER TABLE `jeu` DISABLE KEYS */;
INSERT INTO `jeu` VALUES (1,'Catan','Jeu de gestion et de stratégie sur une île en expansion.',90,3,4,5,3),(2,'Dixit','Jeu de cartes et d\'imagination avec de magnifiques illustrations.',30,3,6,4,2),(3,'7 Wonders','Jeu de civilisation où vous développez votre cité.',45,2,7,6,5),(4,'Azul','Jeu de stratégie et de placement de tuiles.',40,2,4,3,2),(5,'Time’s Up!','Jeu d’ambiance où l’on doit faire deviner des personnages.',30,4,12,6,6),(6,'Risk','Jeu de conquête et de stratégie militaire.',180,2,6,4,3),(7,'Les Aventuriers du Rail','Jeu de gestion et de placement de trains.',45,2,5,5,4),(8,'Splendor','Jeu de cartes et de gestion de ressources.',30,2,4,3,2),(9,'Terraforming Mars','Jeu de stratégie sur la colonisation de Mars.',120,1,5,4,3);
/*!40000 ALTER TABLE `jeu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jeu_categorie`
--

DROP TABLE IF EXISTS `jeu_categorie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jeu_categorie` (
  `id_jeu` int NOT NULL,
  `id_categorie` int NOT NULL,
  PRIMARY KEY (`id_jeu`,`id_categorie`),
  KEY `id_categorie` (`id_categorie`),
  CONSTRAINT `jeu_categorie_ibfk_1` FOREIGN KEY (`id_jeu`) REFERENCES `jeu` (`id_jeu`) ON DELETE CASCADE,
  CONSTRAINT `jeu_categorie_ibfk_2` FOREIGN KEY (`id_categorie`) REFERENCES `categorie` (`id_categorie`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jeu_categorie`
--

LOCK TABLES `jeu_categorie` WRITE;
/*!40000 ALTER TABLE `jeu_categorie` DISABLE KEYS */;
INSERT INTO `jeu_categorie` VALUES (1,1),(3,1),(4,1),(9,1),(2,2),(7,2),(5,3),(8,5),(6,6);
/*!40000 ALTER TABLE `jeu_categorie` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jeu_favori`
--

DROP TABLE IF EXISTS `jeu_favori`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jeu_favori` (
  `id_utilisateur` int NOT NULL,
  `id_jeu` int NOT NULL,
  `date_ajout` date DEFAULT NULL,
  PRIMARY KEY (`id_utilisateur`,`id_jeu`),
  KEY `id_jeu` (`id_jeu`),
  CONSTRAINT `jeu_favori_ibfk_1` FOREIGN KEY (`id_utilisateur`) REFERENCES `utilisateur` (`id_utilisateur`) ON DELETE CASCADE,
  CONSTRAINT `jeu_favori_ibfk_2` FOREIGN KEY (`id_jeu`) REFERENCES `jeu` (`id_jeu`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jeu_favori`
--

LOCK TABLES `jeu_favori` WRITE;
/*!40000 ALTER TABLE `jeu_favori` DISABLE KEYS */;
INSERT INTO `jeu_favori` VALUES (1,1,'2025-03-01'),(2,3,'2025-03-02'),(3,2,'2025-03-03'),(4,6,'2025-03-04'),(5,7,'2025-03-05'),(6,8,'2025-03-06');
/*!40000 ALTER TABLE `jeu_favori` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jeu_mecanique`
--

DROP TABLE IF EXISTS `jeu_mecanique`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jeu_mecanique` (
  `id_jeu` int NOT NULL,
  `id_mecanique` int NOT NULL,
  PRIMARY KEY (`id_jeu`,`id_mecanique`),
  KEY `id_mecanique` (`id_mecanique`),
  CONSTRAINT `jeu_mecanique_ibfk_1` FOREIGN KEY (`id_jeu`) REFERENCES `jeu` (`id_jeu`) ON DELETE CASCADE,
  CONSTRAINT `jeu_mecanique_ibfk_2` FOREIGN KEY (`id_mecanique`) REFERENCES `mecanique` (`id_mecanique`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jeu_mecanique`
--

LOCK TABLES `jeu_mecanique` WRITE;
/*!40000 ALTER TABLE `jeu_mecanique` DISABLE KEYS */;
INSERT INTO `jeu_mecanique` VALUES (1,1),(8,1),(9,1),(5,2),(3,3),(2,4),(4,5),(7,6),(6,7);
/*!40000 ALTER TABLE `jeu_mecanique` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `location`
--

DROP TABLE IF EXISTS `location`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `location` (
  `id_location` int NOT NULL AUTO_INCREMENT,
  `id_utilisateur` int DEFAULT NULL,
  `id_jeu` int DEFAULT NULL,
  `date_debut` date NOT NULL,
  `date_fin` date DEFAULT NULL,
  PRIMARY KEY (`id_location`),
  KEY `id_utilisateur` (`id_utilisateur`),
  KEY `idx_location_id_jeu` (`id_jeu`),
  CONSTRAINT `location_ibfk_1` FOREIGN KEY (`id_utilisateur`) REFERENCES `utilisateur` (`id_utilisateur`) ON DELETE CASCADE,
  CONSTRAINT `location_ibfk_2` FOREIGN KEY (`id_jeu`) REFERENCES `jeu` (`id_jeu`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `location`
--

LOCK TABLES `location` WRITE;
/*!40000 ALTER TABLE `location` DISABLE KEYS */;
INSERT INTO `location` VALUES (1,1,1,'2025-03-01','2025-03-07'),(2,2,2,'2025-03-02',NULL),(3,3,3,'2025-03-03','2025-03-08'),(4,4,6,'2025-03-04',NULL),(5,5,7,'2025-03-05','2025-03-10'),(6,6,8,'2025-03-06',NULL),(7,7,9,'2025-03-07','2025-03-14'),(8,1,3,'2025-04-01','2025-04-07'),(9,1,3,'2025-04-01','2025-04-07'),(10,1,3,'2025-04-01','2025-04-07'),(11,1,3,'2025-04-01','2025-04-07'),(12,1,3,'2025-04-01','2025-04-07'),(13,1,3,'2025-04-01','2025-04-07'),(14,1,3,'2025-04-01','2025-04-07'),(15,1,3,'2025-04-01','2025-04-07'),(16,1,3,'2025-04-01','2025-04-07'),(17,1,3,'2025-04-01','2025-04-07'),(18,1,3,'2025-04-01','2025-04-07'),(19,1,3,'2025-04-01','2025-04-07');
/*!40000 ALTER TABLE `location` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mecanique`
--

DROP TABLE IF EXISTS `mecanique`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mecanique` (
  `id_mecanique` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) NOT NULL,
  PRIMARY KEY (`id_mecanique`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mecanique`
--

LOCK TABLES `mecanique` WRITE;
/*!40000 ALTER TABLE `mecanique` DISABLE KEYS */;
INSERT INTO `mecanique` VALUES (1,'Gestion de ressources'),(2,'Bluff'),(3,'Draft'),(4,'Déduction'),(5,'Placement de tuiles'),(6,'Majorité'),(7,'Conquête de territoire');
/*!40000 ALTER TABLE `mecanique` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `note`
--

DROP TABLE IF EXISTS `note`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `note` (
  `id_note` int NOT NULL AUTO_INCREMENT,
  `id_utilisateur` int DEFAULT NULL,
  `id_jeu` int DEFAULT NULL,
  `valeur` int DEFAULT NULL,
  `commentaire` text,
  PRIMARY KEY (`id_note`),
  KEY `id_utilisateur` (`id_utilisateur`),
  KEY `idx_note_id_jeu_valeur` (`id_jeu`,`valeur`),
  CONSTRAINT `note_ibfk_1` FOREIGN KEY (`id_utilisateur`) REFERENCES `utilisateur` (`id_utilisateur`) ON DELETE CASCADE,
  CONSTRAINT `note_ibfk_2` FOREIGN KEY (`id_jeu`) REFERENCES `jeu` (`id_jeu`) ON DELETE CASCADE,
  CONSTRAINT `note_chk_1` CHECK ((`valeur` between 1 and 5))
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `note`
--

LOCK TABLES `note` WRITE;
/*!40000 ALTER TABLE `note` DISABLE KEYS */;
INSERT INTO `note` VALUES (1,1,1,5,'Un excellent jeu de stratégie !'),(2,2,2,4,'Très beau jeu, mais il faut être inspiré.'),(3,3,3,5,'Rapide et intense, j\'adore.'),(4,4,6,3,'Un peu long mais stratégique.'),(5,5,7,5,'Super jeu familial !'),(6,6,9,4,'Bonne immersion, mais un peu complexe.');
/*!40000 ALTER TABLE `note` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `utilisateur`
--

DROP TABLE IF EXISTS `utilisateur`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `utilisateur` (
  `id_utilisateur` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `mot_de_passe` varchar(255) NOT NULL,
  PRIMARY KEY (`id_utilisateur`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `idx_utilisateur_email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `utilisateur`
--

LOCK TABLES `utilisateur` WRITE;
/*!40000 ALTER TABLE `utilisateur` DISABLE KEYS */;
INSERT INTO `utilisateur` VALUES (1,'Alice Dupont','alice.dupont@email.com','motdepasse123'),(2,'Bob Martin','bob.martin@email.com','securepass'),(3,'Charlie Durand','charlie.durand@email.com','charlie123'),(4,'David Lefevre','david.lefevre@email.com','davidpass'),(5,'Emma Rolland','emma.rolland@email.com','emma2025'),(6,'Florian Morel','florian.morel@email.com','florianM'),(7,'Gabrielle Simon','gabrielle.simon@email.com','gabysimon');
/*!40000 ALTER TABLE `utilisateur` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `vue_historique_locations`
--

DROP TABLE IF EXISTS `vue_historique_locations`;
/*!50001 DROP VIEW IF EXISTS `vue_historique_locations`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `vue_historique_locations` AS SELECT 
 1 AS `id_location`,
 1 AS `utilisateur`,
 1 AS `jeu`,
 1 AS `date_debut`,
 1 AS `date_fin`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `vue_jeux_disponibles`
--

DROP TABLE IF EXISTS `vue_jeux_disponibles`;
/*!50001 DROP VIEW IF EXISTS `vue_jeux_disponibles`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `vue_jeux_disponibles` AS SELECT 
 1 AS `id_jeu`,
 1 AS `nom`,
 1 AS `description`,
 1 AS `duree`,
 1 AS `nb_joueurs_min`,
 1 AS `nb_joueurs_max`,
 1 AS `quantite_disponible`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `vue_jeux_mieux_notes`
--

DROP TABLE IF EXISTS `vue_jeux_mieux_notes`;
/*!50001 DROP VIEW IF EXISTS `vue_jeux_mieux_notes`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `vue_jeux_mieux_notes` AS SELECT 
 1 AS `id_jeu`,
 1 AS `nom`,
 1 AS `nombre_de_notes`,
 1 AS `moyenne_notes`*/;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `vue_historique_locations`
--

/*!50001 DROP VIEW IF EXISTS `vue_historique_locations`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vue_historique_locations` AS select `l`.`id_location` AS `id_location`,`u`.`nom` AS `utilisateur`,`j`.`nom` AS `jeu`,`l`.`date_debut` AS `date_debut`,`l`.`date_fin` AS `date_fin` from ((`location` `l` join `utilisateur` `u` on((`l`.`id_utilisateur` = `u`.`id_utilisateur`))) join `jeu` `j` on((`l`.`id_jeu` = `j`.`id_jeu`))) where (`l`.`date_fin` is not null) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `vue_jeux_disponibles`
--

/*!50001 DROP VIEW IF EXISTS `vue_jeux_disponibles`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vue_jeux_disponibles` AS select `jeu`.`id_jeu` AS `id_jeu`,`jeu`.`nom` AS `nom`,`jeu`.`description` AS `description`,`jeu`.`duree` AS `duree`,`jeu`.`nb_joueurs_min` AS `nb_joueurs_min`,`jeu`.`nb_joueurs_max` AS `nb_joueurs_max`,`jeu`.`quantite_disponible` AS `quantite_disponible` from `jeu` where (`jeu`.`quantite_disponible` > 0) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `vue_jeux_mieux_notes`
--

/*!50001 DROP VIEW IF EXISTS `vue_jeux_mieux_notes`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vue_jeux_mieux_notes` AS select `j`.`id_jeu` AS `id_jeu`,`j`.`nom` AS `nom`,count(`n`.`id_note`) AS `nombre_de_notes`,avg(`n`.`valeur`) AS `moyenne_notes` from (`jeu` `j` left join `note` `n` on((`j`.`id_jeu` = `n`.`id_jeu`))) group by `j`.`id_jeu`,`j`.`nom` having (count(`n`.`id_note`) > 0) order by `moyenne_notes` desc */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-29 14:04:38
