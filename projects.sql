-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Feb 18, 2026 at 03:10 AM
-- Server version: 8.4.3
-- PHP Version: 8.3.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cpc_qatar`
--

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE `projects` (
  `id` int NOT NULL,
  `slug` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `category` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `location` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `client` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `main_contractor` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `consultant` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `area` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `value` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `year` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('active','completed','in_progress','archived') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'completed',
  `featured` tinyint(1) DEFAULT '0',
  `is_legacy` tinyint(1) DEFAULT '0',
  `display_order` int DEFAULT '0',
  `images` json DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_by` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`id`, `slug`, `title`, `description`, `category`, `location`, `client`, `main_contractor`, `consultant`, `area`, `value`, `year`, `status`, `featured`, `is_legacy`, `display_order`, `images`, `created_at`, `updated_at`, `created_by`) VALUES
(1, 'al-aqsa-preparatory-school-for-girls-school-ain-khaled-doha', 'Al Aqsa Preparatory School for Girls', NULL, 'School', 'Ain Khaled, Doha', 'The Ministry of Education', 'Mesopotamia For General Contracting', 'The Ministry of Education', NULL, NULL, NULL, 'completed', 0, 0, 0, NULL, '2026-01-29 00:26:35', '2026-01-29 00:26:35', NULL),
(2, 'audio-education-complex-for-girls-school-old-airport-area-doha', 'Audio Education Complex for Girls', NULL, 'School', 'Old Airport Area, Doha', 'The Ministry of Education', 'Mesopotamia For General Contracting', 'The Ministry of Education', NULL, NULL, NULL, 'completed', 0, 0, 0, NULL, '2026-01-29 00:26:35', '2026-01-29 00:26:35', NULL),
(3, 'fatima-al-zahra-preparatory-school-for-girls-school-al-mansoura-doha', 'Fatima Al Zahra Preparatory School for Girls', NULL, 'School', 'Al Mansoura, Doha', 'The Ministry of Education', 'Mesopotamia For General Contracting', 'The Ministry of Education', NULL, NULL, NULL, 'completed', 0, 0, 0, NULL, '2026-01-29 00:26:35', '2026-01-29 00:26:35', NULL),
(4, 'qatar-primary-school-for-boys-school-bin-mahmoud-doha', 'Qatar Primary School for Boys', NULL, 'School', 'Bin Mahmoud, Doha', 'The Ministry of Education', 'Mesopotamia For General Contracting', 'The Ministry of Education', NULL, NULL, NULL, 'completed', 0, 0, 0, NULL, '2026-01-29 00:26:35', '2026-01-29 00:26:35', NULL),
(5, 'al-shurooq-model-school-for-boys-school-al-gharafa-doha', 'Al Shurooq Model School for Boys', NULL, 'School', 'Al Gharafa, Doha', 'The Ministry of Education', 'Mesopotamia For General Contracting', 'The Ministry of Education', NULL, NULL, NULL, 'completed', 0, 0, 0, NULL, '2026-01-29 00:26:35', '2026-01-29 00:26:35', NULL),
(6, 'al-wakra-primary-school-for-girls-school-al-wakra-qatar', 'Al Wakra Primary School for Girls', NULL, 'School', 'Al Wakra, Qatar', 'The Ministry of Education', 'Mesopotamia For General Contracting', 'The Ministry of Education', NULL, NULL, NULL, 'completed', 0, 0, 0, NULL, '2026-01-29 00:26:35', '2026-01-29 00:26:35', NULL),
(7, 'abdul-rahman-bin-auf-school-for-boys-school-al-sadd-doha', 'Abdul Rahman Bin Auf School for Boys', NULL, 'School', 'Al Sadd, Doha', 'The Ministry of Education', 'Mesopotamia For General Contracting', 'The Ministry of Education', NULL, NULL, NULL, 'completed', 0, 0, 0, NULL, '2026-01-29 00:26:35', '2026-01-29 00:26:35', NULL),
(8, 'jassim-bin-hamad-secondary-school-for-boys-school-al-sadd-doha', 'Jassim Bin Hamad Secondary School for Boys', NULL, 'School', 'Al Sadd, Doha', 'The Ministry of Education', 'Mesopotamia For General Contracting', 'The Ministry of Education', NULL, NULL, NULL, 'completed', 0, 0, 0, NULL, '2026-01-29 00:26:35', '2026-01-29 00:26:35', NULL),
(9, 'arwa-bint-abdul-muttalib-secondary-school-for-girls-school-al-wakra-qatar', 'Arwa Bint Abdul Muttalib Secondary School for Girls', NULL, 'School', 'Al Wakra, Qatar', 'The Ministry of Education', 'Mesopotamia For General Contracting', 'The Ministry of Education', NULL, NULL, NULL, 'completed', 0, 0, 0, NULL, '2026-01-29 00:26:35', '2026-01-29 00:26:35', NULL),
(10, 'omar-bin-abdulaziz-secondary-school-for-boys-school-al-hilal-doha', 'Omar Bin Abdulaziz Secondary School for Boys', NULL, 'School', 'Al Hilal, Doha', 'The Ministry of Education', 'Mesopotamia For General Contracting', 'The Ministry of Education', NULL, NULL, NULL, 'completed', 0, 0, 0, NULL, '2026-01-29 00:26:35', '2026-01-29 00:26:35', NULL),
(11, 'musab-bin-umair-secondary-school-for-boys-school-al-thumama-doha', 'Musab Bin Umair Secondary School for Boys', NULL, 'School', 'Al Thumama, Doha', 'The Ministry of Education', 'Mesopotamia For General Contracting', 'The Ministry of Education', NULL, NULL, NULL, 'completed', 0, 0, 0, NULL, '2026-01-29 00:26:35', '2026-01-29 00:26:35', NULL),
(12, 'rawdat-rashed-primary-school-for-boys-school-rawdat-rashed-doha', 'Rawdat Rashed Primary School for Boys', NULL, 'School', 'Rawdat Rashed, Doha', 'The Ministry of Education', 'Mesopotamia For General Contracting', 'The Ministry of Education', NULL, NULL, NULL, 'completed', 0, 0, 0, NULL, '2026-01-29 00:26:35', '2026-01-29 00:26:35', NULL),
(13, 'rawdat-rashed-secondary-school-for-boys-school-rawdat-rashed-doha', 'Rawdat Rashed Secondary School for Boys', NULL, 'School', 'Rawdat Rashed, Doha', 'The Ministry of Education', 'Mesopotamia For General Contracting', 'The Ministry of Education', NULL, NULL, NULL, 'completed', 0, 0, 0, NULL, '2026-01-29 00:26:35', '2026-01-29 00:26:35', NULL),
(14, 'al-bayan-school-school-al-waab-doha', 'Al Bayan School', NULL, 'School', 'Al Waab, Doha', 'The Ministry of Education', 'Mesopotamia For General Contracting', 'The Ministry of Education', NULL, NULL, NULL, 'completed', 0, 0, 0, NULL, '2026-01-29 00:26:35', '2026-01-29 00:26:35', NULL),
(15, 'al-wukair-school-school-al-wukair-qatar', 'Al Wukair School', NULL, 'School', 'Al Wukair, Qatar', 'The Ministry of Education', 'Mesopotamia For General Contracting', 'The Ministry of Education', NULL, NULL, NULL, 'completed', 0, 0, 0, NULL, '2026-01-29 00:26:35', '2026-01-29 00:26:35', NULL),
(16, 'musab-bin-umair-school-for-boys-school-al-thumama-doha', 'Musab Bin Umair School for Boys', NULL, 'School', 'Al Thumama, Doha', 'The Ministry of Education', 'Mesopotamia For General Contracting', 'The Ministry of Education', NULL, NULL, NULL, 'completed', 0, 0, 0, NULL, '2026-01-29 00:26:35', '2026-01-29 00:26:35', NULL),
(17, 'umm-qarn-school-school-umm-qarn-qatar', 'Umm Qarn School', NULL, 'School', 'Umm Qarn, Qatar', 'The Ministry of Education', 'Mesopotamia For General Contracting', 'The Ministry of Education', NULL, NULL, NULL, 'completed', 0, 0, 0, NULL, '2026-01-29 00:26:35', '2026-01-29 00:26:35', NULL),
(18, 'al-sailiya-secondary-school-for-boys-school-al-sailiya-doha', 'Al Sailiya Secondary School for Boys', NULL, 'School', 'Al Sailiya, Doha', 'The Ministry of Education', 'Mesopotamia For General Contracting', 'The Ministry of Education', NULL, NULL, NULL, 'completed', 0, 0, 0, NULL, '2026-01-29 00:26:35', '2026-01-29 00:26:35', NULL),
(19, 'ibn-taymiyyah-school-school-al-rayyan-doha', 'Ibn Taymiyyah School', NULL, 'School', 'Al Rayyan, Doha', 'The Ministry of Education', 'Mesopotamia For General Contracting', 'The Ministry of Education', NULL, NULL, NULL, 'completed', 0, 0, 0, NULL, '2026-01-29 00:26:35', '2026-01-29 00:26:35', NULL),
(20, 'al-shahaniya-independent-school-school-al-shahaniya-qatar', 'Al Shahaniya Independent School', NULL, 'School', 'Al Shahaniya, Qatar', 'The Ministry of Education', 'Mesopotamia For General Contracting', 'The Ministry of Education', NULL, NULL, NULL, 'completed', 0, 0, 0, NULL, '2026-01-29 00:26:35', '2026-01-29 00:26:35', NULL),
(21, 'al-shahaniya-secondary-school-school-al-shahaniya-qatar', 'Al Shahaniya Secondary School', NULL, 'School', 'Al Shahaniya, Qatar', 'The Ministry of Education', 'Mesopotamia For General Contracting', 'The Ministry of Education', NULL, NULL, NULL, 'completed', 0, 0, 0, NULL, '2026-01-29 00:26:35', '2026-01-29 00:26:35', NULL),
(22, 'arwa-bint-abdul-muttalib-school-school-al-wakra-qatar', 'Arwa Bint Abdul Muttalib School', NULL, 'School', 'Al Wakra, Qatar', 'The Ministry of Education', 'Mesopotamia For General Contracting', 'The Ministry of Education', NULL, NULL, NULL, 'completed', 0, 0, 0, NULL, '2026-01-29 00:26:35', '2026-01-29 00:26:35', NULL),
(23, 'al-brouq-primary-school-for-girls-school-al-rayyan-doha', 'Al Brouq Primary School for Girls', NULL, 'School', 'Al Rayyan, Doha', 'The Ministry of Education', 'Mesopotamia For General Contracting', 'The Ministry of Education', NULL, NULL, NULL, 'completed', 0, 0, 0, NULL, '2026-01-29 00:26:35', '2026-01-29 00:26:35', NULL),
(24, 'muaither-primary-school-for-boys-school-muaither-doha', 'Muaither Primary School for Boys', NULL, 'School', 'Muaither, Doha', 'The Ministry of Education', 'Mesopotamia For General Contracting', 'The Ministry of Education', NULL, NULL, NULL, 'completed', 0, 0, 0, NULL, '2026-01-29 00:26:35', '2026-01-29 00:26:35', NULL),
(25, 'omar-bin-abdulaziz-school-school-al-hilal-doha', 'Omar Bin Abdulaziz School', NULL, 'School', 'Al Hilal, Doha', 'The Ministry of Education', 'Mesopotamia For General Contracting', 'The Ministry of Education', NULL, NULL, NULL, 'completed', 0, 0, 0, NULL, '2026-01-29 00:26:35', '2026-01-29 00:26:35', NULL),
(26, 'rafidah-bint-kaab-school-for-girls-school-al-wakra-qatar', 'Rafidah Bint Kaab School for Girls', NULL, 'School', 'Al Wakra, Qatar', 'The Ministry of Education', 'Mesopotamia For General Contracting', 'The Ministry of Education', NULL, NULL, NULL, 'completed', 0, 0, 0, NULL, '2026-01-29 00:26:35', '2026-01-29 00:26:35', NULL),
(27, 'mosque-nuaija-2023-nuaija', 'Mosque – Nuaija', NULL, NULL, 'Nuaija', NULL, 'Mesopotamia for General Contracting', NULL, NULL, NULL, '2023', 'completed', 0, 1, 0, NULL, '2026-01-29 00:26:35', '2026-01-29 14:41:03', NULL),
(28, 'proposed-mosque-mdm5-with-imam-house-type-5a-2023-rawdat-egdam', 'Proposed Mosque M-DM5 with Imam House Type 5A', NULL, NULL, 'Rawdat Egdam', NULL, 'Rawdet El Hamam for General Construction Co.', NULL, NULL, NULL, '2023', 'completed', 0, 1, 0, NULL, '2026-01-29 00:26:35', '2026-01-29 14:41:03', NULL),
(29, 'mosque-qatar-mall-rawdat-al-hamamam-2023-qatar-mall', 'Mosque – Qatar Mall (Rawdat Al Hamamam)', NULL, NULL, 'Qatar Mall', NULL, 'Rawdet El Hamam for General Construction Co.', NULL, NULL, NULL, '2023', 'completed', 0, 1, 0, NULL, '2026-01-29 00:26:35', '2026-01-29 14:41:03', NULL),
(30, 'proposed-mosque-m126a-with-imam-house-type-5a-2023-rawdat-el-gehena', 'Proposed Mosque M-126A with Imam House Type 5A', NULL, NULL, 'Rawdat El Gehena', NULL, 'Rivera Trading & Contracting Co.', NULL, NULL, NULL, '2023', 'completed', 0, 1, 0, NULL, '2026-01-29 00:26:35', '2026-01-29 14:41:03', NULL),
(31, 'mosque-al-sakhama-2023-al-sakhama', 'Mosque – Al Sakhama', NULL, NULL, 'Al Sakhama', NULL, 'Royal Abjar', NULL, NULL, NULL, '2023', 'completed', 0, 1, 0, NULL, '2026-01-29 00:26:35', '2026-01-29 14:41:03', NULL),
(32, 'mosque-116a-2023-al-wukair', 'Mosque 116-A', NULL, NULL, 'Al Wukair', NULL, 'Amad Construction', NULL, NULL, NULL, '2023', 'completed', 0, 1, 0, NULL, '2026-01-29 00:26:35', '2026-01-29 14:41:03', NULL),
(33, 'compound-villa-al-aziziya-2023-al-aziziya', 'Compound Villa – Al Aziziya', NULL, NULL, 'Al Aziziya', NULL, 'Al Msaken', NULL, NULL, NULL, '2023', 'completed', 0, 1, 0, NULL, '2026-01-29 00:26:35', '2026-01-29 14:41:03', NULL),
(34, 'proposed-asphalt-works-for-book-store-gym-el-ebb-k125-2023-el-ebb-k125', 'Proposed Asphalt Works for Book Store & Gym (EL EBB K125)', NULL, NULL, 'El EBB (K125)', NULL, 'K.B.R. Qatar Trading & Contracting', NULL, NULL, NULL, '2023', 'completed', 0, 1, 0, NULL, '2026-01-29 00:26:35', '2026-01-29 14:41:03', NULL),
(35, 'proposed-prime-power-logistic-facility-2023-gharry-el-samer', 'Proposed Prime Power Logistic Facility', NULL, NULL, 'Gharry El Samer', NULL, 'Gulf Falcon Contracting Co.', NULL, NULL, NULL, '2023', 'completed', 0, 1, 0, NULL, '2026-01-29 00:26:35', '2026-01-29 14:41:03', NULL),
(36, 'commercial-complex-2023-al-wakra', 'Commercial Complex', NULL, NULL, 'Al Wakra', NULL, 'Al Jazira Building & Construction', NULL, NULL, NULL, '2023', 'completed', 0, 1, 0, NULL, '2026-01-29 00:26:35', '2026-01-29 14:41:03', NULL),
(37, 'proposed-food-storage-offices-showroom-labour-camp-2023-al-wakra', 'Proposed Food Storage, Offices, Showroom & Labour Camp', NULL, NULL, 'Al Wakra', NULL, 'Shard Projects Company', NULL, NULL, NULL, '2023', 'completed', 0, 1, 0, NULL, '2026-01-29 00:26:35', '2026-01-29 14:41:03', NULL),
(38, 'al-hadarma-parking-2023-rayyan', 'Al Hadarma Parking', NULL, NULL, 'Rayyan', NULL, 'Daar Al Rayyan Investment', NULL, NULL, NULL, '2023', 'completed', 0, 1, 0, NULL, '2026-01-29 00:26:35', '2026-01-29 14:41:03', NULL),
(39, 'farm-183-internal-road-works-p2206-2023-al-wakra', 'Farm 183 – Internal Road Works (P-2206)', NULL, NULL, 'Al Wakra', NULL, 'Westfield Engineering Construction W.L.L', NULL, NULL, NULL, '2023', 'completed', 0, 1, 0, NULL, '2026-01-29 00:26:35', '2026-01-29 14:41:03', NULL),
(40, 'villa-sheikha-aisha-bin-khalifa-2023-doha', 'Villa Sheikha Aisha Bin Khalifa', NULL, NULL, 'Doha', NULL, 'Westfield Engineering Construction W.L.L', NULL, NULL, NULL, '2023', 'completed', 0, 1, 0, NULL, '2026-01-29 00:26:35', '2026-01-29 14:41:03', NULL),
(41, 'compound-villa-24-2023-umm-salal', 'Compound Villa 24', NULL, NULL, 'Umm Salal', NULL, 'Golden Beach Trading', NULL, NULL, NULL, '2023', 'completed', 0, 1, 0, NULL, '2026-01-29 00:26:35', '2026-01-29 14:41:03', NULL),
(42, 'al-wakra-logistic-2023-al-wakra', 'Al Wakra Logistic', NULL, NULL, 'Al Wakra', NULL, 'FBA Engineering & Contracting', NULL, NULL, NULL, '2023', 'completed', 0, 1, 0, NULL, '2026-01-29 00:26:35', '2026-01-29 14:41:03', NULL),
(43, 'proposed-residential-complex-2024-al-kheesa', 'Proposed Residential Complex', NULL, 'Commercial Building', 'Al Kheesa', NULL, 'Qasr El Shamoukh Contracting', NULL, NULL, NULL, '2024', 'completed', 0, 0, 0, NULL, '2026-01-29 00:26:35', '2026-01-29 00:26:35', NULL),
(44, 'building-material-store-showroom-administrative-office-labor-accommodation-services-1-2-2024-birkat-al-awamer', 'Building Material Store, Showroom, Administrative Office & Labor Accommodation (Services 1 & 2)', NULL, 'Stores and Factory', 'Birkat Al Awamer', NULL, 'Al Kamal International Group', NULL, NULL, NULL, '2024', 'completed', 0, 0, 0, NULL, '2026-01-29 00:26:35', '2026-01-29 00:26:35', NULL),
(45, 'galvanizing-plant-project-site-2024-new-industrial-area', 'Galvanizing Plant Project Site', NULL, 'Stores and Factory', 'New Industrial Area', NULL, 'Rational Trading & Contracting W.L.L', NULL, NULL, NULL, '2024', 'completed', 0, 0, 0, NULL, '2026-01-29 00:26:35', '2026-01-29 00:26:35', NULL),
(46, 'proposed-mosque-m126a-with-imam-house-5a-2024-bani-hajer', 'Proposed Mosque (M126A) with Imam House (5A)', NULL, 'Mosque', 'Bani Hajer', NULL, 'Kemet for Trading & Contracting', NULL, NULL, NULL, '2024', 'completed', 0, 0, 0, NULL, '2026-01-29 00:26:35', '2026-01-29 00:26:35', NULL),
(47, 'proposed-mosque-with-two-imam-houses-type-a5-2024-al-sheehaniya', 'Proposed Mosque with Two Imam Houses (Type A/5)', NULL, 'Mosque', 'Al Sheehaniya', NULL, 'Rawdat Al Hamama', NULL, NULL, NULL, '2024', 'completed', 0, 0, 0, NULL, '2026-01-29 00:26:35', '2026-01-29 00:26:35', NULL),
(48, 'thea-live-work-play-2024-lusail-laqtaifa', 'Thea Live Work Play', NULL, 'Commercial Building', 'Lusail / Laqtaifa', NULL, 'Homeco General Construction Trading Co.', NULL, NULL, NULL, '2024', 'completed', 0, 0, 0, NULL, '2026-01-29 00:26:35', '2026-01-29 00:26:35', NULL),
(49, 'car-storage-guard-room-2024-birkat-al-awamer', 'Car Storage & Guard Room', NULL, 'Stores and Factory', 'Birkat Al Awamer', NULL, 'Al Mana Group', NULL, NULL, NULL, '2024', 'completed', 0, 0, 0, NULL, '2026-01-29 00:26:35', '2026-01-29 00:26:35', NULL),
(50, 'proposed-mosque-parking-2024-rawdat-al-hamama', 'Proposed Mosque Parking', NULL, 'Mosque', 'Rawdat Al Hamama', NULL, 'Royal Abjar Trading & Contracting', NULL, NULL, NULL, '2024', 'completed', 0, 0, 0, NULL, '2026-01-29 00:26:35', '2026-01-29 00:26:35', NULL),
(51, 'maintenance-works-at-al-noor-petrol-station-2024-bu-sidra', 'Maintenance Works at Al Noor Petrol Station', NULL, 'Commercial Building', 'Bu Sidra', NULL, 'Qatar Star Enterprises & Services Co.', NULL, NULL, NULL, '2024', 'completed', 0, 0, 0, NULL, '2026-01-29 00:26:35', '2026-01-29 00:26:35', NULL),
(52, 'cement-factory-2024-industrial-area', 'Cement Factory', NULL, 'Stores and Factory', 'Industrial Area', NULL, 'Greater Doha Trading & Contracting', NULL, NULL, NULL, '2024', 'completed', 0, 0, 0, NULL, '2026-01-29 00:26:35', '2026-01-29 00:26:35', NULL),
(53, 'proposed-play-area-2024-al-gharrafa', 'Proposed Play Area', NULL, 'Public Project', 'Al Gharrafa', NULL, 'Artline Trading & Contracting', NULL, NULL, NULL, '2024', 'completed', 0, 0, 0, NULL, '2026-01-29 00:26:35', '2026-01-29 00:26:35', NULL),
(54, 'proposed-mosque-parking-2024-al-wukair', 'Proposed Mosque Parking', NULL, 'Mosque', 'Al Wukair', NULL, 'Maha Al Khaleej for Contracting', NULL, NULL, NULL, '2024', 'completed', 0, 0, 0, NULL, '2026-01-29 00:26:35', '2026-01-29 00:26:35', NULL),
(55, 'proposed-villa-2024-al-wukair', 'Proposed Villa', NULL, 'Commercial Building', 'Al Wukair', NULL, 'Greater Doha Trading & Contracting', NULL, NULL, NULL, '2024', 'completed', 0, 0, 0, NULL, '2026-01-29 00:26:35', '2026-01-29 00:26:35', NULL),
(56, 'proposed-villa-2024-al-kheesa', 'Proposed Villa', NULL, 'Commercial Building', 'Al Kheesa', NULL, 'Contraco W.L.L', NULL, NULL, NULL, '2024', 'completed', 0, 0, 0, NULL, '2026-01-29 00:26:35', '2026-01-29 00:26:35', NULL),
(57, 'proposed-mosque-1404-2024-al-sakhama', 'Proposed Mosque 1404', NULL, 'Mosque', 'Al Sakhama', NULL, 'Techno Fab Trading & Contracting', NULL, NULL, NULL, '2024', 'completed', 0, 0, 0, NULL, '2026-01-29 00:26:35', '2026-01-29 00:26:35', NULL),
(58, 'proposed-compound-2024-ain-khalid', 'Proposed Compound', NULL, 'Public Project', 'Ain Khalid', NULL, 'Qatar Red Crescent', NULL, NULL, NULL, '2024', 'completed', 0, 0, 0, NULL, '2026-01-29 00:26:35', '2026-01-29 00:26:35', NULL),
(59, 'logistic-park-2024-birkat-al-awamer', 'Logistic Park', NULL, 'Stores and Factory', 'Birkat Al Awamer', NULL, 'FBA Engineering & Contracting', NULL, NULL, NULL, '2024', 'completed', 0, 0, 0, NULL, '2026-01-29 00:26:35', '2026-01-29 00:26:35', NULL),
(60, 'external-works-2024-birkat-al-awamer', 'External Works', NULL, 'Public Project', 'Birkat Al Awamer', NULL, 'Future Company', NULL, NULL, NULL, '2024', 'completed', 0, 0, 0, NULL, '2026-01-29 00:26:35', '2026-01-29 00:26:35', NULL),
(61, 'compound-villa-g1ph-guard-room-2024-doha', 'Compound Villa (G+1+P.H) + Guard Room', NULL, 'Commercial Building', 'Doha', NULL, 'Mezab Trading & Contracting', NULL, NULL, NULL, '2024', 'completed', 0, 0, 0, NULL, '2026-01-29 00:26:35', '2026-01-29 00:26:35', NULL),
(62, 'asphalt-works-villaggio-mall-part-1-2024-villaggio-mall-al-aziziyah', 'Asphalt Works – Villaggio Mall (Part 1)', NULL, 'Public Project', 'Villaggio Mall, Al Aziziyah', NULL, 'International Decoration & Contracting', NULL, NULL, NULL, '2024', 'completed', 0, 0, 0, NULL, '2026-01-29 00:26:35', '2026-01-29 00:26:35', NULL),
(63, 'asphalt-works-villaggio-mall-part-2-2024-villaggio-mall-al-aziziyah', 'Asphalt Works – Villaggio Mall (Part 2)', NULL, 'Public Project', 'Villaggio Mall, Al Aziziyah', NULL, 'International Decoration & Contracting', NULL, NULL, NULL, '2024', 'completed', 0, 0, 0, NULL, '2026-01-29 00:26:35', '2026-01-29 00:26:35', NULL),
(64, 'asphalt-works-villaggio-mall-part-3-2024-villaggio-mall-al-aziziyah', 'Asphalt Works – Villaggio Mall (Part 3)', NULL, 'Public Project', 'Villaggio Mall, Al Aziziyah', NULL, 'International Decoration & Contracting', NULL, NULL, NULL, '2024', 'completed', 0, 0, 0, NULL, '2026-01-29 00:26:36', '2026-01-29 00:26:36', NULL),
(65, 'asphalt-works-villaggio-mall-part-4-2024-villaggio-mall-al-aziziyah', 'Asphalt Works – Villaggio Mall (Part 4)', NULL, 'Public Project', 'Villaggio Mall, Al Aziziyah', NULL, 'International Decoration & Contracting', NULL, NULL, NULL, '2024', 'completed', 0, 0, 0, NULL, '2026-01-29 00:26:36', '2026-01-29 00:26:36', NULL),
(66, 'proposed-modification-mosque-mdm5-with-two-imam-houses-type-5a-2024-al-kharaitiyat', 'Proposed Modification Mosque M-DM5 with Two Imam Houses Type 5A', NULL, 'Mosque', 'Al Kharaitiyat', NULL, 'Royal Stone Trading & Contracting', NULL, NULL, NULL, '2024', 'completed', 0, 0, 0, NULL, '2026-01-29 00:26:36', '2026-01-29 00:26:36', NULL),
(67, 'proposed-commercial-buildings-mosque-2024-birkat-al-awamer', 'Proposed Commercial Buildings & Mosque', NULL, 'Public Project', 'Birkat Al Awamer', NULL, 'Raptor One Contracting & Services', NULL, NULL, NULL, '2024', 'completed', 0, 0, 0, NULL, '2026-01-29 00:26:36', '2026-01-29 00:26:36', NULL),
(68, 'proposed-villa-2024-al-ghashamiya', 'Proposed Villa', NULL, 'Commercial Building', 'Al Ghashamiya', NULL, 'Daran Construction & Contracting', NULL, NULL, NULL, '2024', 'completed', 0, 0, 0, NULL, '2026-01-29 00:26:36', '2026-01-29 00:26:36', NULL),
(69, 'proposed-mosque-imam-house-eid-prayer-room-pin-70151256', 'Proposed Mosque, Imam House & Eid Prayer Room (PIN: 70151256)', '', '', 'Doha', '', 'Millennium Trading & Contracting Co.', '', '', '', '2024', 'completed', 0, 0, 1, '[]', '2026-01-29 00:26:36', '2026-02-17 22:10:02', NULL),
(70, 'proposed-mosque-m117a-eid-prayer-yard-imam-house-type-5a-2024-al-kheesa', 'Proposed Mosque M117A + Eid Prayer Yard & Imam House Type 5A', NULL, 'Mosque', 'Al Kheesa', NULL, 'Jamatco for Trading & Contracting', NULL, NULL, NULL, '2024', 'completed', 0, 0, 0, NULL, '2026-01-29 00:26:36', '2026-01-29 00:26:36', NULL),
(71, 'proposed-car-parking-for-masjid-no-060-2024-doha', 'Proposed Car Parking for Masjid No. 060', NULL, 'Mosque', 'Doha', NULL, 'Al Majlis Contracting & Building Co.', NULL, NULL, NULL, '2024', 'completed', 0, 0, 0, NULL, '2026-01-29 00:26:36', '2026-01-29 00:26:36', NULL),
(72, 'proposed-office-gf-workshop-gm-2024-doha', 'Proposed Office (G+F) & Workshop (G+M)', NULL, 'Stores and Factory', 'Doha', NULL, 'Tabadol Trading & Contracting Est.', NULL, NULL, NULL, '2024', 'completed', 0, 0, 0, NULL, '2026-01-29 00:26:36', '2026-01-29 00:26:36', NULL),
(73, 'decoration-workshop-decoration-supplies-store-labor-accommodation-building-2024-birkat-al-awamer', 'Decoration Workshop, Decoration Supplies Store & Labor Accommodation Building', NULL, 'Commercial Building', 'Birkat Al Awamer', NULL, 'Yazwah Projects', NULL, NULL, NULL, '2024', 'completed', 0, 0, 0, NULL, '2026-01-29 00:26:36', '2026-01-29 00:26:36', NULL),
(74, 'proposed-mosque-mdm5-with-imam-house-type-5a-2024-umm-salal', 'Proposed Mosque MDM-5 with Imam House Type 5A', NULL, 'Mosque', 'Umm Salal', NULL, 'Shard Project Company', NULL, NULL, NULL, '2024', 'completed', 0, 0, 0, NULL, '2026-01-29 00:26:36', '2026-01-29 00:26:36', NULL),
(75, 'proposed-residential-complex-2025-al-kheesa', 'Proposed Residential Complex', NULL, 'Commercial Building', 'AL KHEESA', NULL, 'Qasr El Shamoukh Contracting', NULL, NULL, NULL, '2025', 'completed', 0, 0, 0, NULL, '2026-01-29 00:26:36', '2026-01-29 00:26:36', NULL),
(76, 'building-material-store-showroom-administrative-office-labor-accommodation-services-1-2-2025-birkat-al-awamer', 'Building Material Store, Showroom, Administrative Office & Labor Accommodation (Services 1 & 2)', NULL, 'Stores and Factory', 'Birkat Al Awamer', NULL, 'Al Kamal International Group', NULL, NULL, NULL, '2025', 'completed', 0, 0, 0, NULL, '2026-01-29 00:26:36', '2026-01-29 00:26:36', NULL),
(77, 'galvanizing-plant-project-site-2025-new-industrial-area', 'Galvanizing Plant Project Site', NULL, 'Stores and Factory', 'New Industrial Area', NULL, 'Rational Trading & Contracting W.L.L', NULL, NULL, NULL, '2025', 'completed', 0, 0, 0, NULL, '2026-01-29 00:26:36', '2026-01-29 00:26:36', NULL),
(78, 'proposed-mosque-m126a-with-imam-house-5a-2025-bani-hajer', 'Proposed Mosque (M126A) with Imam House (5A)', NULL, 'Mosque', 'Bani Hajer', NULL, 'Kemet for Trading & Contracting', NULL, NULL, NULL, '2025', 'completed', 0, 0, 0, NULL, '2026-01-29 00:26:36', '2026-01-29 00:26:36', NULL),
(79, 'proposed-mosque-with-two-imam-houses-type-a5-2025-al-sheehaniya', 'Proposed Mosque with Two Imam Houses (Type A/5)', NULL, 'Mosque', 'Al Sheehaniya', NULL, 'Rawdat Al Hamama', NULL, NULL, NULL, '2025', 'completed', 0, 0, 0, NULL, '2026-01-29 00:26:36', '2026-01-29 00:26:36', NULL),
(80, 'thea-live-work-play-2025-laqtefa', 'Thea Live Work Play', NULL, 'Commercial Building', 'Laqtefa', NULL, 'Homeco General Construction Trading Co.', NULL, NULL, NULL, '2025', 'completed', 0, 0, 0, NULL, '2026-01-29 00:26:36', '2026-01-29 00:26:36', NULL),
(81, 'car-storage-guard-room-2025-birkat-al-awamer', 'Car Storage & Guard Room', NULL, 'Stores and Factory', 'Birkat Al Awamer', NULL, 'Al Mana Group', NULL, NULL, NULL, '2025', 'completed', 0, 0, 0, NULL, '2026-01-29 00:26:36', '2026-01-29 00:26:36', NULL),
(82, 'proposed-mosque-parking-2025-rawdat-al-hamama', 'Proposed Mosque Parking', NULL, 'Mosque', 'Rawdat Al Hamama', NULL, 'Royal Abjar Trading & Contracting', NULL, NULL, NULL, '2025', 'completed', 0, 0, 0, NULL, '2026-01-29 00:26:36', '2026-01-29 00:26:36', NULL),
(83, 'maintenance-works-at-al-noor-petrol-station-2025-bu-sidra', 'Maintenance Works at Al Noor Petrol Station', NULL, 'Commercial Building', 'Bu Sidra', NULL, 'Qatar Star Enterprises & Service Co.', NULL, NULL, NULL, '2025', 'completed', 0, 0, 0, NULL, '2026-01-29 00:26:36', '2026-01-29 00:26:36', NULL),
(84, 'cement-factory-2025-industrial-area', 'Cement Factory', NULL, 'Stores and Factory', 'Industrial Area', NULL, 'Greater Doha Trading & Contracting', NULL, NULL, NULL, '2025', 'completed', 0, 0, 0, NULL, '2026-01-29 00:26:36', '2026-01-29 00:26:36', NULL),
(85, 'proposed-play-area-2025-al-gharrafa', 'Proposed Play Area', NULL, 'Public Project', 'Al Gharrafa', NULL, 'Artline Trading & Contracting', NULL, NULL, NULL, '2025', 'completed', 0, 0, 0, NULL, '2026-01-29 00:26:36', '2026-01-29 00:26:36', NULL),
(86, 'proposed-mosque-parking-2025-al-wukair', 'Proposed Mosque Parking', NULL, 'Mosque', 'Al Wukair', NULL, 'Maha Al Khaleej for Contracting', NULL, NULL, NULL, '2025', 'completed', 0, 0, 0, NULL, '2026-01-29 00:26:36', '2026-01-29 00:26:36', NULL),
(87, 'proposed-villa-2025-al-wukair', 'Proposed Villa', NULL, 'Commercial Building', 'Al Wukair', NULL, 'Greater Doha Trading & Contracting', NULL, NULL, NULL, '2025', 'completed', 0, 0, 0, NULL, '2026-01-29 00:26:36', '2026-01-29 00:26:36', NULL),
(88, 'proposed-villa-2025-al-kheesa', 'Proposed Villa', NULL, 'Commercial Building', 'AL KHEESA', NULL, 'Contraco W.L.L', NULL, NULL, NULL, '2025', 'completed', 0, 0, 0, NULL, '2026-01-29 00:26:36', '2026-01-29 00:26:36', NULL),
(89, 'proposed-mosque-1404-2025-al-sakhama', 'Proposed Mosque 1404', NULL, 'Mosque', 'Al Sakhama', NULL, 'Techno Fab Trading & Contracting', NULL, NULL, NULL, '2025', 'completed', 0, 0, 0, NULL, '2026-01-29 00:26:36', '2026-01-29 00:26:36', NULL),
(90, 'proposed-compound-2025-ain-khalid', 'Proposed Compound', NULL, 'Public Project', 'Ain Khalid', NULL, 'Qatar Red Crescent', NULL, NULL, NULL, '2025', 'completed', 0, 0, 0, NULL, '2026-01-29 00:26:36', '2026-01-29 00:26:36', NULL),
(91, 'khjv', 'KHJV', 'HVUCLYUC', NULL, 'cairo', 'IOUGIU', 'IUFYIUF', 'UYFCVUYCUYTC', 'UYCVYUC', 'UYCVYUTC', '2023', 'completed', 0, 1, 0, '[]', '2026-01-29 14:39:12', '2026-01-29 14:39:12', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`),
  ADD KEY `idx_category` (`category`),
  ADD KEY `idx_status` (`status`),
  ADD KEY `idx_slug` (`slug`),
  ADD KEY `idx_featured` (`featured`),
  ADD KEY `created_by` (`created_by`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=92;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `projects`
--
ALTER TABLE `projects`
  ADD CONSTRAINT `projects_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `admins` (`id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
