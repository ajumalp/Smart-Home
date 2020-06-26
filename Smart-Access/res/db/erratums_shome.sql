--
-- phpMyAdmin SQL Dump
-- Contact me @ ajumalp@gmail.com
-- Developed by Ajmal Muhammad P
-- https://owner.erratums.com
--
-- Host: localhost
-- Generation Time: May 30, 2020 at 04:06 PM
-- Server version: 10.3.21-MariaDB
-- PHP Version: 7.2.30
--
-- --------------------------------------------------------

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database User: es_shome
--

CREATE USER IF NOT EXISTS 'es_shome'@'localhost' IDENTIFIED BY 'C@RoAJ26MV6asQ6W7';

GRANT ALL PRIVILEGES ON * . * TO 'es_shome'@'localhost';

-- --------------------------------------------------------

--
-- Database: `erratums_shome`
--
CREATE DATABASE IF NOT EXISTS `erratums_shome` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `erratums_shome`;

-- --------------------------------------------------------

--
-- Table structure for table `boardtype`
--

CREATE TABLE `boardtype` (
  `BOARDID` int(11) NOT NULL,
  `BOARDNAME` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `boardtype`
--

INSERT INTO `boardtype` (`BOARDID`, `BOARDNAME`) VALUES
(1001, '1 CH Relay [esp01]'),
(1004, '1 CH Relay [ESP8266]'),
(1002, '2 CH Relay [esp01]'),
(1003, '4 CH Relay [esp01]');

-- --------------------------------------------------------

--
-- Table structure for table `devices`
--

CREATE TABLE `devices` (
  `DEVICEID` int(11) NOT NULL,
  `DEVICENAME` varchar(30) NOT NULL,
  `USERID` int(11) NOT NULL,
  `LAYOUTINDEX` smallint(6) NOT NULL,
  `BOARDID` int(11) NOT NULL,
  `UNIQUEID` varchar(100) NOT NULL
) ;

-- --------------------------------------------------------

--
-- Table structure for table `gadgets`
--

CREATE TABLE `gadgets` (
  `GADGETID` bigint(20) NOT NULL,
  `GADGETNAME` varchar(50) NOT NULL,
  `DEVICEID` int(11) NOT NULL,
  `PINTYPE` varchar(10) NOT NULL,
  `LAYOUTINDEX` smallint(6) NOT NULL,
  `HIDEPAIR` char(1) NOT NULL DEFAULT 'F',
  `INVERTED` char(1) NOT NULL DEFAULT 'F',
  `VALUE` varchar(50) NOT NULL,
  `IMAGECODE` varchar(50) NOT NULL DEFAULT '1.png'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `options`
--

CREATE TABLE `options` (
  `OID` int(11) NOT NULL,
  `OPT_NAME` varchar(50) NOT NULL,
  `OPT_VALUE` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `options` (`OPT_NAME`, `OPT_VALUE`) VALUES('MQTT_HOST', '127.0.0.1');
INSERT INTO `options` (`OPT_NAME`, `OPT_VALUE`) VALUES('MQTT_PORT', '1883');
INSERT INTO `options` (`OPT_NAME`, `OPT_VALUE`) VALUES('MQTT_PATH', '');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `USERID` int(11) NOT NULL,
  `USERNAME` varchar(50) NOT NULL,
  `PASSWORD` varchar(500) NOT NULL,
  `CREATED_AT` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`USERID`, `USERNAME`, `PASSWORD`, `CREATED_AT`) VALUES
(1, 'admin', '$2y$10$EeeWvTaa4i/8AJ2EA83gO.MWI5GM3kX8iijoqAQ.08BygLivGWX56', '2020-04-20 22:23:18');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `boardtype`
--
ALTER TABLE `boardtype`
  ADD PRIMARY KEY (`BOARDID`),
  ADD UNIQUE KEY `BOARDNAME` (`BOARDNAME`);

--
-- Indexes for table `devices`
--
ALTER TABLE `devices`
  ADD PRIMARY KEY (`DEVICEID`),
  ADD UNIQUE KEY `UK_DEVICE_NAME` (`DEVICENAME`, `USERID`),
  ADD UNIQUE KEY `UK_DEVICE_UNIQUE_ID` (`UNIQUEID`),
  ADD KEY `FK_DEVICE_BOARD` (`BOARDID`),
  ADD KEY `FK_DEVICE_USER` (`USERID`);

--
-- Indexes for table `gadgets`
--
ALTER TABLE `gadgets`
  ADD PRIMARY KEY (`GADGETID`),
  ADD UNIQUE KEY `UK_GADGET_NAME` (`GADGETNAME`,`DEVICEID`,`LAYOUTINDEX`),
  ADD UNIQUE KEY `UK_GADGET_DEVICE_PIN` (`PINTYPE`,`DEVICEID`),
  ADD KEY `FK_GADGET_DEVICE` (`DEVICEID`);

--
-- Indexes for table `options`
--
ALTER TABLE `options`
  ADD PRIMARY KEY (`OID`),
  ADD UNIQUE KEY `UK_OPTION_NAME` (`OPT_NAME`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`USERID`),
  ADD UNIQUE KEY `USERNAME` (`USERNAME`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `devices`
--
ALTER TABLE `devices`
  MODIFY `DEVICEID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `gadgets`
--
ALTER TABLE `gadgets`
  MODIFY `GADGETID` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `options`
--
ALTER TABLE `options`
  MODIFY `OID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `USERID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `devices`
--
ALTER TABLE `devices`
  ADD CONSTRAINT `FK_DEVICE_BOARD` FOREIGN KEY (`BOARDID`) REFERENCES `boardtype` (`BOARDID`),
  ADD CONSTRAINT `FK_DEVICE_USER` FOREIGN KEY (`USERID`) REFERENCES `users` (`USERID`);

--
-- Constraints for table `gadgets`
--
ALTER TABLE `gadgets`
  ADD CONSTRAINT `FK_GADGET_DEVICE` FOREIGN KEY (`DEVICEID`) REFERENCES `devices` (`DEVICEID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
