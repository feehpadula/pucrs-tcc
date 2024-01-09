CREATE DATABASE  IF NOT EXISTS `pucrs` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `pucrs`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: pucrs
-- ------------------------------------------------------
-- Server version	8.0.35-0ubuntu0.22.04.1

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
-- Table structure for table `data`
--

DROP TABLE IF EXISTS `data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `data` (
  `id` int NOT NULL AUTO_INCREMENT,
  `itemsId` int NOT NULL,
  `field01data` int NOT NULL,
  `field02data` int DEFAULT NULL,
  `date` date NOT NULL DEFAULT (curdate()),
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `itemsId_idx` (`itemsId`),
  CONSTRAINT `itemsId` FOREIGN KEY (`itemsId`) REFERENCES `items` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=126 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `items`
--

DROP TABLE IF EXISTS `items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `topicId` int NOT NULL,
  `name` varchar(90) NOT NULL,
  `field01name` varchar(45) NOT NULL,
  `field02name` varchar(45) DEFAULT NULL,
  `dataRelation` tinyint NOT NULL DEFAULT '0',
  `dataPresentation` tinyint NOT NULL DEFAULT '0',
  `dataOutliers` tinyint NOT NULL DEFAULT '0',
  `creationDate` date NOT NULL DEFAULT (curdate()),
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`),
  KEY `topic_idx` (`topicId`),
  CONSTRAINT `topic` FOREIGN KEY (`topicId`) REFERENCES `topics` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `reports`
--

DROP TABLE IF EXISTS `reports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reports` (
  `id` int NOT NULL AUTO_INCREMENT,
  `itemsId` int NOT NULL,
  `reportType` tinyint NOT NULL,
  `status` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `topics`
--

DROP TABLE IF EXISTS `topics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `topics` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password` varchar(72) NOT NULL,
  `recoveryCode` varchar(72) NOT NULL,
  `rights` tinyint NOT NULL DEFAULT '0',
  `creationDate` date NOT NULL DEFAULT (curdate()),
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping events for database 'pucrs'
--

--
-- Dumping routines for database 'pucrs'
--
/*!50003 DROP PROCEDURE IF EXISTS `getData` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getData`(itemId INT)
BEGIN

	DECLARE multiplier FLOAT;
	DECLARE presentation INT;
	DECLARE dataCount INT;
	DECLARE yearCount INT;
	DECLARE monthCount INT;
	DECLARE dateFormat VARCHAR(10) DEFAULT '%Y';
    
    SELECT
		CASE dataOutliers
			WHEN 0 THEN 0
			WHEN 1 THEN 1.4
			WHEN 2 THEN 1.5
			WHEN 3 THEN 1.6
		END,
        dataPresentation
	INTO multiplier, presentation
	FROM items
	WHERE id = itemId;

	SELECT COUNT(*) INTO dataCount
	FROM data
	WHERE itemsId = itemId;
    
    SELECT COUNT(DISTINCT YEAR(date)) INTO yearCount
	FROM data
	WHERE itemsId = itemId;
    
	IF yearCount = 1 THEN
		SELECT COUNT(DISTINCT MONTH(date)) INTO monthCount
		FROM data
		WHERE itemsId = itemId;
        
		IF monthCount > 1 THEN
			SET dateFormat = '%m/%Y';
		ELSE
			SET dateFormat = '%d/%m/%Y';
        END IF;
	END IF;
    
    IF (dataCount < 4 OR multiplier = 0) THEN
		CALL getDataUnfiltered(itemId, dateFormat);
	ELSEIF (presentation = 2) THEN
		CALL getDataFilteredCombined(itemId, multiplier, dateFormat);
	ELSE
		CALL getDataFilteredSingle(itemId, multiplier, dateFormat);
    END IF;
    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getDataFilteredCombined` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getDataFilteredCombined`(id INT, multiplier FLOAT, dateFormat VARCHAR(10))
BEGIN

WITH orderedList AS (
    SELECT
        date,
        (field02data * 100) / field01data AS combined,
        ROW_NUMBER() OVER (ORDER BY (field02data * 100) / field01data) AS rowNumber,
        COUNT(*) OVER () AS rowCount
    FROM data 
    WHERE itemsId = id
),

quartiles AS (
    SELECT
        MAX(CASE WHEN rowNumber = FLOOR(rowCount * 0.25) THEN combined END) AS qOneLower,
        MAX(CASE WHEN rowNumber = FLOOR(rowCount * 0.25) + 1 THEN combined END) AS qOneUpper,
        MAX(CASE WHEN rowNumber = FLOOR(rowCount * 0.75) THEN combined END) AS qThreeLower,
        MAX(CASE WHEN rowNumber = FLOOR(rowCount * 0.75) + 1 THEN combined END) AS qThreeUpper
    FROM orderedList
),

iqr AS (
    SELECT
        (
            (SELECT MAX(qThreeLower) FROM quartiles) +
            (SELECT MAX(qThreeUpper) FROM quartiles)
        ) / 2 AS qThree,
        (
            (SELECT MAX(qOneLower) FROM quartiles) +
            (SELECT MAX(qOneUpper) FROM quartiles)
        ) / 2 AS qOne,
        multiplier * (
            (
                (SELECT MAX(qThreeLower) FROM quartiles) +
                (SELECT MAX(qThreeUpper) FROM quartiles)
            ) / 2 -
            (
                (SELECT MAX(qOneLower) FROM quartiles) +
                (SELECT MAX(qOneUpper) FROM quartiles)
            ) / 2
        ) AS outlierRange
    FROM quartiles
),

filteredList AS (
	SELECT
		date,
		combined
	FROM orderedList
	WHERE combined < (SELECT MAX(qThree) FROM iqr) + (SELECT MAX(outlierRange) FROM iqr)
		AND combined > (SELECT MAX(qOne) FROM iqr) - (SELECT MAX(outlierRange) FROM iqr)
)

SELECT 
	DATE_FORMAT(date, dateFormat) AS date, 
    CAST(ROUND(AVG(combined)) AS UNSIGNED) AS combined,
	COUNT(*) as contributions
FROM filteredList
GROUP BY DATE_FORMAT(date, dateFormat)
ORDER BY DATE_FORMAT(date, dateFormat) ASC;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getDataFilteredSingle` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getDataFilteredSingle`(id INT, multiplier FLOAT, dateFormat VARCHAR(10))
BEGIN

WITH orderedList AS (
    SELECT
        date,
        field01data,
        ROW_NUMBER() OVER (ORDER BY field01data) AS rowNumber,
        COUNT(*) OVER () AS rowCount
    FROM data 
    WHERE itemsId = id
),

quartiles AS (
    SELECT
        MAX(CASE WHEN rowNumber = FLOOR(rowCount * 0.25) THEN field01data END) AS qOneLower,
        MAX(CASE WHEN rowNumber = FLOOR(rowCount * 0.25) + 1 THEN field01data END) AS qOneUpper,
        MAX(CASE WHEN rowNumber = FLOOR(rowCount * 0.75) THEN field01data END) AS qThreeLower,
        MAX(CASE WHEN rowNumber = FLOOR(rowCount * 0.75) + 1 THEN field01data END) AS qThreeUpper
    FROM orderedList
),

iqr AS (
    SELECT
        (
            (SELECT MAX(qThreeLower) FROM quartiles) +
            (SELECT MAX(qThreeUpper) FROM quartiles)
        ) / 2 AS qThree,
        (
            (SELECT MAX(qOneLower) FROM quartiles) +
            (SELECT MAX(qOneUpper) FROM quartiles)
        ) / 2 AS qOne,
        multiplier * (
            (
                (SELECT MAX(qThreeLower) FROM quartiles) +
                (SELECT MAX(qThreeUpper) FROM quartiles)
            ) / 2 -
            (
                (SELECT MAX(qOneLower) FROM quartiles) +
                (SELECT MAX(qOneUpper) FROM quartiles)
            ) / 2
        ) AS outlierRange
    FROM quartiles
),

filteredList AS (
	SELECT
		date,
		field01data
	FROM orderedList
	WHERE field01data < (SELECT MAX(qThree) FROM iqr) + (SELECT MAX(outlierRange) FROM iqr)
		AND field01data > (SELECT MAX(qOne) FROM iqr) - (SELECT MAX(outlierRange) FROM iqr)
)

SELECT 
	DATE_FORMAT(date, dateFormat) AS date, 
    CAST(ROUND(AVG(field01data)) AS UNSIGNED) AS field01data,
	COUNT(*) as contributions
FROM filteredList
GROUP BY DATE_FORMAT(date, dateFormat)
ORDER BY DATE_FORMAT(date, dateFormat) ASC;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getDataUnfiltered` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getDataUnfiltered`(id INT, dateFormat VARCHAR(10))
BEGIN
	SELECT 
		DATE_FORMAT(date, dateFormat) AS date, 
		CAST(ROUND(AVG(field01data)) AS UNSIGNED) AS field01data,
		CAST(ROUND(AVG(field02data)) AS UNSIGNED) AS field02data, 
		CAST(ROUND((ROUND(AVG(field02data)) * 100) / ROUND(AVG(field01data))) AS UNSIGNED) AS combined,
		COUNT(*) as contributions
    FROM data
    WHERE itemsId = id
	GROUP BY DATE_FORMAT(date, dateFormat)
    ORDER BY DATE_FORMAT(date, dateFormat) ASC;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getFences` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getFences`(itemId INT)
BEGIN

	DECLARE multiplier FLOAT;
	DECLARE presentation INT;
	DECLARE dataCount INT;
    
    SELECT
		CASE dataOutliers
			WHEN 0 THEN 0
			WHEN 1 THEN 1.4
			WHEN 2 THEN 1.5
			WHEN 3 THEN 1.6
		END,
        dataPresentation
	INTO multiplier, presentation
	FROM items
	WHERE id = itemId;

	SELECT COUNT(*) INTO dataCount
	FROM data
	WHERE itemsId = itemId;
    
	IF (dataCount < 4 OR multiplier = 0) THEN
		SELECT
			null AS q1,
            null AS q3
		;
	ELSEIF (presentation = 2) THEN
		CALL getFencesCombined(itemId, multiplier);
	ELSE
		CALL getFencesSingle(itemId, multiplier);
    END IF;
    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getFencesCombined` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getFencesCombined`(id INT, multiplier FLOAT)
BEGIN

WITH orderedList AS (
    SELECT
        date,
        (field02data * 100) / field01data AS combined,
        ROW_NUMBER() OVER (ORDER BY (field02data * 100) / field01data) AS rowNumber,
        COUNT(*) OVER () AS rowCount
    FROM data 
    WHERE itemsId = id
),

quartiles AS (
    SELECT
        MAX(CASE WHEN rowNumber = FLOOR(rowCount * 0.25) THEN combined END) AS qOneLower,
        MAX(CASE WHEN rowNumber = FLOOR(rowCount * 0.25) + 1 THEN combined END) AS qOneUpper,
        MAX(CASE WHEN rowNumber = FLOOR(rowCount * 0.75) THEN combined END) AS qThreeLower,
        MAX(CASE WHEN rowNumber = FLOOR(rowCount * 0.75) + 1 THEN combined END) AS qThreeUpper
    FROM orderedList
),

iqr AS (
    SELECT
        (
            (SELECT MAX(qThreeLower) FROM quartiles) +
            (SELECT MAX(qThreeUpper) FROM quartiles)
        ) / 2 AS qThree,
        (
            (SELECT MAX(qOneLower) FROM quartiles) +
            (SELECT MAX(qOneUpper) FROM quartiles)
        ) / 2 AS qOne,
        multiplier * (
            (
                (SELECT MAX(qThreeLower) FROM quartiles) +
                (SELECT MAX(qThreeUpper) FROM quartiles)
            ) / 2 -
            (
                (SELECT MAX(qOneLower) FROM quartiles) +
                (SELECT MAX(qOneUpper) FROM quartiles)
            ) / 2
        ) AS outlierRange
    FROM quartiles
)

SELECT 
	ROUND((SELECT MAX(qOne)) - (SELECT MAX(outlierRange)), 1) AS q1,
	ROUND((SELECT MAX(qThree)) + (SELECT MAX(outlierRange)), 1) AS q3
FROM iqr;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getFencesSingle` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getFencesSingle`(id INT, multiplier FLOAT)
BEGIN

WITH orderedList AS (
    SELECT
        date,
        field01data,
        ROW_NUMBER() OVER (ORDER BY field01data) AS rowNumber,
        COUNT(*) OVER () AS rowCount
    FROM data 
    WHERE itemsId = id
),

quartiles AS (
    SELECT
        MAX(CASE WHEN rowNumber = FLOOR(rowCount * 0.25) THEN field01data END) AS qOneLower,
        MAX(CASE WHEN rowNumber = FLOOR(rowCount * 0.25) + 1 THEN field01data END) AS qOneUpper,
        MAX(CASE WHEN rowNumber = FLOOR(rowCount * 0.75) THEN field01data END) AS qThreeLower,
        MAX(CASE WHEN rowNumber = FLOOR(rowCount * 0.75) + 1 THEN field01data END) AS qThreeUpper
    FROM orderedList
),

iqr AS (
    SELECT
        (
            (SELECT MAX(qThreeLower) FROM quartiles) +
            (SELECT MAX(qThreeUpper) FROM quartiles)
        ) / 2 AS qThree,
        (
            (SELECT MAX(qOneLower) FROM quartiles) +
            (SELECT MAX(qOneUpper) FROM quartiles)
        ) / 2 AS qOne,
        multiplier * (
            (
                (SELECT MAX(qThreeLower) FROM quartiles) +
                (SELECT MAX(qThreeUpper) FROM quartiles)
            ) / 2 -
            (
                (SELECT MAX(qOneLower) FROM quartiles) +
                (SELECT MAX(qOneUpper) FROM quartiles)
            ) / 2
        ) AS outlierRange
    FROM quartiles
)

SELECT 
	ROUND((SELECT MAX(qOne)) - (SELECT MAX(outlierRange)), 1) AS q1,
	ROUND((SELECT MAX(qThree)) + (SELECT MAX(outlierRange)), 1) AS q3
FROM iqr;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
