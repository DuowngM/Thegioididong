-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: thegioididong
-- ------------------------------------------------------
-- Server version	8.0.33

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
-- Table structure for table `branch`
--

DROP TABLE IF EXISTS `branch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `branch` (
  `branch_id` int NOT NULL AUTO_INCREMENT,
  `city` varchar(45) NOT NULL,
  `address` varchar(45) NOT NULL,
  `contact` varchar(45) NOT NULL,
  PRIMARY KEY (`branch_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `branch`
--

LOCK TABLES `branch` WRITE;
/*!40000 ALTER TABLE `branch` DISABLE KEYS */;
INSERT INTO `branch` VALUES (1,'Hà Nội','Cầu Giấy','0911111111'),(2,'Hà Nội','Thái Thịnh','09222222222'),(3,'Hà Nội','Triệu Việt Vương','0933333333');
/*!40000 ALTER TABLE `branch` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `brand`
--

DROP TABLE IF EXISTS `brand`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `brand` (
  `brand_id` int NOT NULL AUTO_INCREMENT,
  `brand_name` varchar(45) NOT NULL,
  `category_id` int NOT NULL,
  PRIMARY KEY (`brand_id`),
  KEY `category_id_idx` (`category_id`),
  CONSTRAINT `category_id` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brand`
--

LOCK TABLES `brand` WRITE;
/*!40000 ALTER TABLE `brand` DISABLE KEYS */;
INSERT INTO `brand` VALUES (1,'SamSung',1),(2,'Apple',1),(3,'MSI',2),(4,'Razer',2),(5,'DELL',2),(6,'Macbook',2),(7,'Apple',4),(8,'Samsung',4),(9,'HyperX',5),(10,'Logitech',5),(11,'JBL',5),(12,'Apple',5),(13,'Apple',3);
/*!40000 ALTER TABLE `brand` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `cart_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `productId` int NOT NULL,
  `quantity` int NOT NULL,
  PRIMARY KEY (`cart_id`),
  KEY `user_id_idx` (`user_id`),
  KEY `productId_idx` (`productId`),
  CONSTRAINT `productId` FOREIGN KEY (`productId`) REFERENCES `products` (`product_id`),
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=92 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` VALUES (59,4,56,1),(60,4,40,1),(64,5,51,1);
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `category_name` varchar(45) NOT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Smart Phone'),(2,'Laptop'),(3,'Smart Watch'),(4,'Tablet'),(5,'Acessory');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `images` (
  `imageId` int NOT NULL AUTO_INCREMENT,
  `image` longtext NOT NULL,
  `idProduct` int NOT NULL,
  PRIMARY KEY (`imageId`),
  KEY `idProduct_idx` (`idProduct`),
  CONSTRAINT `product_id` FOREIGN KEY (`idProduct`) REFERENCES `products` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
/*!40000 ALTER TABLE `images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order`
--

DROP TABLE IF EXISTS `order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `customerId` int NOT NULL,
  `total` float NOT NULL,
  `note` varchar(45) DEFAULT NULL,
  `createdDate` varchar(45) NOT NULL,
  `status` varchar(45) NOT NULL,
  `method` varchar(45) NOT NULL,
  PRIMARY KEY (`order_id`),
  KEY `customerId_idx` (`customerId`),
  CONSTRAINT `customerId` FOREIGN KEY (`customerId`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order`
--

LOCK TABLES `order` WRITE;
/*!40000 ALTER TABLE `order` DISABLE KEYS */;
INSERT INTO `order` VALUES (32,4,69300000,'Giao hang tan noi','2023-07-03 13:33:36','Hoàn thành','home_delivery'),(34,4,15000000,'','2023-07-03 13:41:36','Đã hủy','store_pickup'),(36,5,81900000,'Hehehehe','2023-07-04 10:49:07','Đã hủy','store_pickup'),(37,6,307221000,'','2023-07-05 15:05:38','Đã hủy','store_pickup'),(38,6,57480000,'','2023-07-05 15:40:47','Đã hủy','store_pickup'),(39,4,24237000,'Giao lúc 4h chiều','2023-07-07 16:07:47','Chờ xác nhận','home_delivery'),(40,6,2214000,'hihiih','2023-07-10 16:37:54','Chờ xác nhận','store_pickup'),(41,6,2460000,'ấdasd','2023-07-10 16:39:01','Chờ xác nhận','store_pickup');
/*!40000 ALTER TABLE `order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_details`
--

DROP TABLE IF EXISTS `order_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_details` (
  `order_details_id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `idProduct` int NOT NULL,
  `quantity` int NOT NULL,
  `address` varchar(255) NOT NULL,
  PRIMARY KEY (`order_details_id`),
  KEY `order_id_idx` (`order_id`),
  KEY `idProduct_idx` (`idProduct`),
  CONSTRAINT `idProduct` FOREIGN KEY (`idProduct`) REFERENCES `products` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `order_id` FOREIGN KEY (`order_id`) REFERENCES `order` (`order_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_details`
--

LOCK TABLES `order_details` WRITE;
/*!40000 ALTER TABLE `order_details` DISABLE KEYS */;
INSERT INTO `order_details` VALUES (36,32,3,2,'Pham Hung'),(37,32,4,1,'Pham Hung'),(46,34,1,3,'Hà Nội, Thái Thịnh'),(53,36,9,1,'Hà Nội, Triệu Việt Vương'),(54,36,10,1,'Hà Nội, Triệu Việt Vương'),(55,37,36,1,'Hà Nội, Cầu Giấy'),(56,37,37,1,'Hà Nội, Cầu Giấy'),(57,38,27,1,'Hà Nội, Thái Thịnh'),(58,38,26,1,'Hà Nội, Thái Thịnh'),(59,39,57,1,'265 Yên Hòa, Cầu Giấy, Hà Nội'),(60,39,56,1,'265 Yên Hòa, Cầu Giấy, Hà Nội'),(61,40,51,1,'Hà Nội, Cầu Giấy'),(62,41,51,1,'Hà Nội, Thái Thịnh');
/*!40000 ALTER TABLE `order_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `product_name` varchar(255) NOT NULL,
  `product_stocks` int NOT NULL,
  `price` float NOT NULL,
  `categoryId` int NOT NULL,
  `product_image` longtext,
  `description` longtext NOT NULL,
  `brandId` int NOT NULL,
  `sold` int DEFAULT NULL,
  PRIMARY KEY (`product_id`),
  KEY `categoryId_idx` (`categoryId`),
  KEY `brandId_idx` (`brandId`),
  CONSTRAINT `brandId` FOREIGN KEY (`brandId`) REFERENCES `brand` (`brand_id`),
  CONSTRAINT `categoryId` FOREIGN KEY (`categoryId`) REFERENCES `category` (`category_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Điện thoại Samsung Galaxy A14 6GB',55,5000000,1,'https://cdn.tgdd.vn/Products/Images/42/292770/samsung-galaxy-a14-tlte-thumb-den-600x600.jpg','Samsung tiếp tục chứng tỏ sự nỗ lực của mình trong việc cải thiện dòng sản phẩm phân khúc cấp thấp trong năm 2023 bằng việc ra mắt mẫu smartphone Samsung Galaxy A14 4G. Với thiết kế độc đáo và hiện đại, sản phẩm này đáp ứng đầy đủ tiêu chí \"ngon - bổ - rẻ\" với cấu hình ổn định và giá cả cực kỳ hợp lý.',1,0),(2,'Điện thoại Samsung Galaxy A34 5G 128GB',88,6000000,1,'https://cdn.tgdd.vn/Products/Images/42/303583/samsung-galaxy-a34-thumb-den-600x600.jpg','Điện thoại Samsung Galaxy A34 5G 128GBĐiện thoại Samsung Galaxy A34 5G 128GBĐiện thoại Samsung Galaxy A34 5G 128GB',1,0),(3,'Điện thoại iPhone 14 Pro 128GB',71,21000000,1,'https://cdn.tgdd.vn/Products/Images/42/247508/iphone-14-pro-vang-thumb-600x600.jpg','Điện thoại iPhone 14 Pro 128GBĐiện thoại iPhone 14 Pro 128GBĐiện thoại iPhone 14 Pro 128GBĐiện thoại iPhone 14 Pro 128GBĐiện thoại iPhone 14 Pro 128GB',2,0),(4,'Điện thoại iPhone 14 Pro MAX 256GB',86,35000000,1,'https://cdn.tgdd.vn/Products/Images/42/251192/iphone-14-pro-max-den-thumb-600x600.jpg','Điện thoại iPhone 14 Pro MAX 256GBĐiện thoại iPhone 14 Pro MAX 256GBĐiện thoại iPhone 14 Pro MAX 256GBĐiện thoại iPhone 14 Pro MAX 256GBĐiện thoại iPhone 14 Pro MAX 256GBĐiện thoại iPhone 14 Pro MAX 256GBĐiện thoại iPhone 14 Pro MAX 256GB',2,0),(5,'Điện thoại iPhone 14',99,20000000,1,'https://cdn.tgdd.vn/Products/Images/42/240259/iPhone-14-thumb-do-600x600.jpg','Điện thoại iPhone 14Điện thoại iPhone 14Điện thoại iPhone 14Điện thoại iPhone 14Điện thoại iPhone 14Điện thoại iPhone 14Điện thoại iPhone 14',2,0),(6,'Điện thoại iPhone 13',99,17000000,1,'https://cdn.tgdd.vn/Products/Images/42/223602/iphone-13-blue-1-600x600.jpg','Điện thoại iPhone 13Điện thoại iPhone 13Điện thoại iPhone 13Điện thoại iPhone 13Điện thoại iPhone 13Điện thoại iPhone 13Điện thoại iPhone 13Điện thoại iPhone 13Điện thoại iPhone 13Điện thoại iPhone 13Điện thoại iPhone 13Điện thoại iPhone 13',2,0),(7,'Samsung Galaxy S23 Ultra 5G',84,26960000,1,'https://cdn.tgdd.vn/Products/Images/42/249948/samsung-galaxy-s23-ultra-thumb-xanh-600x600.jpg','Samsung Galaxy S23 Ultra 5GSamsung Galaxy S23 Ultra 5GSamsung Galaxy S23 Ultra 5GSamsung Galaxy S23 Ultra 5GSamsung Galaxy S23 Ultra 5GSamsung Galaxy S23 Ultra 5GSamsung Galaxy S23 Ultra 5GSamsung Galaxy S23 Ultra 5G',1,0),(8,'Samsung Galaxy S22 Ultra 5G 128 GB',84,23600000,1,'https://cdn.tgdd.vn/Products/Images/42/235838/Galaxy-S22-Ultra-Burgundy-600x600.jpg','Samsung Galaxy S22 Ultra 5G 128 GBSamsung Galaxy S22 Ultra 5G 128 GBSamsung Galaxy S22 Ultra 5G 128 GBSamsung Galaxy S22 Ultra 5G 128 GBSamsung Galaxy S22 Ultra 5G 128 GBSamsung Galaxy S22 Ultra 5G 128 GBSamsung Galaxy S22 Ultra 5G 128 GB',1,0),(9,'MacBook Pro 16 inch M1 Pro 2021 16 core-GPU',99,39900000,2,'https://cdn.tgdd.vn/Products/Images/44/253636/apple-macbook-pro-16-m1-pro-2021-10-core-cpu-600x600.jpg','MacBook Pro 16 M1 Pro 2021 không chỉ sở hữu thiết kế mới trông vuông vức hơn mà còn mang trong mình sức mạnh hiệu năng vượt trội đến từ bộ vi xử lý M1 Pro, cho mình trải nghiệm sử dụng mượt mà và ấn tượng như một dân chuyên đúng nghĩa.',6,0),(10,'MacBook Pro 13 inch M1 2020 8-core GPU',99,42000000,2,'https://cdn.tgdd.vn/Products/Images/44/231255/macbook-pro-m1-2020-gray-600x600.jpg','Macbook Pro M1 2020 được nâng cấp với bộ vi xử lý mới cực kỳ mạnh mẽ, chiếc laptop này sẽ phục vụ tốt cho công việc của bạn, đặc biệt cho lĩnh vực đồ họa, kỹ thuật.',6,0),(24,'Samsung Galaxy S23+ 5G',100,19990000,1,'https://cdn.tgdd.vn/Products/Images/42/290829/samsung-galaxy-s23-plus-600x600.jpg','Samsung Galaxy S23+ 5G 256GB là chiếc điện thoại thuộc dòng cao cấp nhất của Samsung được giới thiệu vào tháng 02/2023. Máy sở hữu một vài điểm ấn tượng như camera có khả năng quay video 8K, cùng với đó là con chip Snapdragon 8 Gen 2 mạnh mẽ hàng đầu giới điện thoại Android.',1,0),(25,'Samsung Galaxy Z Fold4 5G',100,29990000,1,'https://cdn.tgdd.vn/Products/Images/42/250625/samsung-galaxy-z-fold4-kem-256gb-600x600.jpg','Tại sự kiện Samsung Unpacked thường niên, Samsung Galaxy Z Fold4 256GB chính thức được trình làng thị trường công nghệ, mang trên mình nhiều cải tiến đáng giá giúp Galaxy Z Fold trở thành dòng điện thoại gập đã tốt nay càng tốt hơn.',1,0),(26,'MacBook Air 13 inch M2 2022 10-core GPU',99,37990000,2,'https://cdn.tgdd.vn/Products/Images/44/289441/apple-macbook-air-m2-2022-16gb-600x600.jpg','MacBook Air M2 2022 một lần nữa đã khẳng định vị thế hàng đầu của Apple trong phân khúc laptop cao cấp - sang trọng vào giữa năm 2022 khi sở hữu phong cách thiết kế thời thượng, đẳng cấp cùng sức mạnh bộc phá đến từ bộ vi xử lý Apple M2 mạnh mẽ.',6,0),(27,'MSI Gaming GF63 Thin 11UC i7 11800H (1228VN)',99,19490000,2,'https://cdn.tgdd.vn/Products/Images/44/306133/msi-gaming-gf63-thin-11uc-i7-1228vn-thumb-600x600.jpg','Laptop MSI Gaming GF63 Thin 11UC i7 11800H (1228VN) được trang bị bộ vi xử lý Intel Core i7 dòng H hiệu năng cao và card đồ họa NVIDIA mạnh mẽ, đáp ứng mọi nhu cầu của game thủ và người dùng làm trong ngành sáng tạo nội dung.',3,0),(28,'Laptop MSI Gaming GS66 Stealth 11UG i7 11800H',100,50490000,2,'https://cdn.tgdd.vn/Products/Images/44/249147/msi-gaming-gs66-stealth-11ug-i7-219vn-600x600.jpg','Xứng danh tay chơi cự phách nơi đô thị sầm uất, laptop MSI Gaming GS66 Stealth 11UG i7 11800H (219VN) với vẻ ngoài đầy mạnh mẽ cùng sức mạnh tuyệt hảo, phát huy hiệu suất tối ưu và khả năng chiến game cực đã cùng đồng đội.',3,0),(29,'MSI Gaming Cyborg 15 A12VE i7 12650H (240VN)',60,27600000,2,'https://cdn.tgdd.vn/Products/Images/44/304843/msi-cyborg-15-a12ve-i7-240vn-thumb-600x600.jpg','Laptop MSI Cyborg 15 A12VE i7 (240VN) hướng tới đối tượng người dùng là các game thủ và những người đam mê công nghệ khi được trang bị đầy đủ tính năng tiên tiến nhất để mang lại trải nghiệm tuyệt vời cho người dùng.',3,0),(30,'Dell Inspiron 16 5620 i7 1255U (N6I7110W1)',30,23490000,2,'https://cdn.tgdd.vn/Products/Images/44/292396/dell-inspiron-16-5620-i7-n6i7110w1-thumb-600x600.jpg','Khi nhắc đến dòng laptop học tập - văn phòng thì bạn không thể nào bỏ qua laptop Dell Inspiron 16 5620 i7 (N6I7110W1) với hiệu năng vượt trội, thiết kế hiện đại và gọn nhẹ phù hợp với nhu cầu sử dụng của sinh viên và nhân viên văn phòng cần phải di chuyển thường xuyên.',5,0),(31,'Razer Blade 15 Core i7 8750H',30,47500000,2,'https://bizweb.dktcdn.net/thumb/grande/100/305/872/products/razer-blade-15-2.jpg?v=1558671347383','Razer từ trước đến nay vốn được coi là cao cấp bậc nhất trong dòng Gaming Laptop cao cấp với thân hình quyến rũ cùng cấu hình mạnh mẽ, nối tiếng nhất chính là dòng Blade Pro. Tiếp nối những thành công trong năm 2017, Razer tiếp tục “tút lại nhan sắc” cũng như nâng cấp cấu hình cho dòng sản phẩm của mình trong năm 2018 với Razer Blade 15 - phiên bản được rất nhiều người mong đợi. ',4,0),(32,'Laptop Razer Blade 15',10,103000000,2,'https://product.hstatic.net/1000374492/product/6-500x500_021a25dc5f904ac890ea6ef1781316d0_master.jpg','Laptop Razer Blade 15 (i9-12900H | 32GB | 1TB | GeForce® RTX 3080Ti 16GB',4,0),(33,'Dell XPS 9510 15 inch',10,75000000,2,'https://macstores.vn/wp-content/uploads/2021/08/dell-xps-15-9510-4.jpg','Vẫn làm bằng chất liệu nhôm nguyên khối cùng những đường cắt Diamond tinh xảo đem lại sự chắc chắn và sang trọng. Khung máy được gia cố bằng hợp kim magnesium chắc chắn, với mặt trên được phủ một lớp carbon fiber đã quá quen thuộc với các dòng XPS trước đây.\n',5,0),(34,'iPad 9 WiFi 64GB',20,9400000,4,'https://cdn.tgdd.vn/Products/Images/522/247517/iPad-9-wifi-trang-600x600.jpg','iPad 9 WiFi 64GBiPad 9 WiFi 64GBiPad 9 WiFi 64GBiPad 9 WiFi 64GBiPad 9 WiFi 64GBiPad 9 WiFi 64GBiPad 9 WiFi 64GBiPad 9 WiFi 64GBiPad 9 WiFi 64GB',7,0),(35,'iPad Air 5 M1 Wifi 64GB',15,14940000,4,'https://cdn.tgdd.vn/Products/Images/522/248096/ipad-air-5-wifi-blue-thumb-600x600.jpg','iPad Air 5 M1 Wifi 64GBiPad Air 5 M1 Wifi 64GBiPad Air 5 M1 Wifi 64GBiPad Air 5 M1 Wifi 64GBiPad Air 5 M1 Wifi 64GBiPad Air 5 M1 Wifi 64GBiPad Air 5 M1 Wifi 64GB',7,0),(36,'Samsung Galaxy Tab S8 Ultra 5G',19,25990000,4,'https://cdn.tgdd.vn/Products/Images/522/247513/samsung-tab-s8-ultra-thumb-600x600.jpg','Samsung Galaxy Tab S8 Ultra 5GSamsung Galaxy Tab S8 Ultra 5GSamsung Galaxy Tab S8 Ultra 5GSamsung Galaxy Tab S8 Ultra 5GSamsung Galaxy Tab S8 Ultra 5G',8,0),(37,'iPad Pro M1 12.9 inch 5G',14,29740000,4,'https://cdn.tgdd.vn/Products/Images/522/238649/ipad-pro-2021-129-inch-silver-600x600.jpg','iPad Pro M1 12.9 inch 5GiPad Pro M1 12.9 inch 5GiPad Pro M1 12.9 inch 5GiPad Pro M1 12.9 inch 5GiPad Pro M1 12.9 inch 5G',7,0),(38,'iPad Pro M1 11 inch WiFi 2TB (2021)',5,44990000,4,'https://cdn.tgdd.vn/Products/Images/522/269328/ipad-pro-m1-11-inch-wifi-2tb-2021-bac-thumb-600x600.jpeg','iPad Pro M1 11 inch WiFi 2TB (2021)iPad Pro M1 11 inch WiFi 2TB (2021)iPad Pro M1 11 inch WiFi 2TB (2021)iPad Pro M1 11 inch WiFi 2TB (2021)',7,0),(39,'iPad 10 WiFi + Cellular 64GB',10,14390000,4,'https://cdn.tgdd.vn/Products/Images/522/295453/ipad-10-wifi-cellular-sliver-thumb-600x600.jpeg','iPad 10 WiFi + Cellular 64GBiPad 10 WiFi + Cellular 64GBiPad 10 WiFi + Cellular 64GB',7,0),(40,'Samsung Galaxy Tab A7 Lite',20,3970000,4,'https://cdn.tgdd.vn/Products/Images/522/237325/samsung-galaxy-tab-a7-lite-gray-600x600.jpg','Samsung Galaxy Tab A7 LiteSamsung Galaxy Tab A7 LiteSamsung Galaxy Tab A7 Lite',8,0),(41,'Samsung Galaxy Tab S7 FE 4G',20,10390000,4,'https://cdn.tgdd.vn/Products/Images/522/240254/samsung-galaxy-tab-s7-fe-black-600x600.jpg','Samsung Galaxy Tab S7 FE 4GSamsung Galaxy Tab S7 FE 4GSamsung Galaxy Tab S7 FE 4GSamsung Galaxy Tab S7 FE 4GSamsung Galaxy Tab S7 FE 4G',8,0),(42,'iPad Pro M1 12.9 inch WiFi',15,32690000,4,'https://cdn.tgdd.vn/Products/Images/522/259650/ipad-pro-m1-129-inch-wifi-sliver-thumb-600x600.jpg','iPad Pro M1 12.9 inch WiFiiPad Pro M1 12.9 inch WiFiiPad Pro M1 12.9 inch WiFiiPad Pro M1 12.9 inch WiFiiPad Pro M1 12.9 inch WiFi',7,0),(43,'iPad Pro M2 11 inch WiFi',16,20690000,4,'https://cdn.tgdd.vn/Products/Images/522/294104/ipad-pro-m2-11-wifi-xam-thumb-600x600.jpg','iPad Pro M2 11 inch WiFiiPad Pro M2 11 inch WiFiiPad Pro M2 11 inch WiFiiPad Pro M2 11 inch WiFi',7,0),(46,'Tai nghe Bluetooth Apple AirPods Pro 2022',20,5990000,5,'https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/g/r/group_111_5_.png','Tích hợp chip Apple H2 mang đến chất âm sống động cùng khả năng tái tạo âm thanh 3 chiều vượt trội\nCông nghệ Bluetooth 5.3 kết nối ổn định, mượt mà, tiêu thụ năng lượng thấp, giúp tiết kiệm pin đáng kể\nChống ồn chủ động loại bỏ tiếng ồn hiệu quả gấp đôi thế hệ trước, giúp nâng cao trải nghiệm nghe nhạc\nChống nước chuẩn IPX4 trên tai nghe và hộp sạc, giúp bạn thỏa sức tập luyện không cần lo thấm mồ hôi',12,0),(50,'Tai nghe Bluetooth Apple AirPods Pro 2023',20,7990000,5,'https://res.cloudinary.com/dgbl6qitv/image/upload/v1688717509/yfo6z6nhmzwkwq7dwypp.jpg','Tai nghe Bluetooth Apple AirPods Pro 2022Tai nghe Bluetooth Apple AirPods Pro 2022Tai nghe Bluetooth Apple AirPods Pro 2022Tai nghe Bluetooth Apple AirPods Pro 2022Tai nghe Bluetooth Apple AirPods Pro 2022Tai nghe Bluetooth Apple AirPods Pro 2022',12,0),(51,'Tai nghe  HyperX Cloud II - Pink',19,2460000,5,'https://res.cloudinary.com/dgbl6qitv/image/upload/v1688718184/fppxq8uaieknluo6bxzl.jpg','Tai nghe Over-ear là một trong những thiết bị ngoại vi quan trọng hỗ trợ game thủ leo rank. HyperX Cloud II Pink với phiên bản màu hồng thu hút người dùng trẻ nhất là các bạn nữ. Nếu bạn đang tìm kiếm một chiếc tai nghe máy tính dạng chụp tai có chất lượng âm thanh tốt thì sản phẩm nhà HyperX là lựa chọn không thể bỏ qua. ',9,1),(52,'Cáp chuyển đổi cổng Lightning sang 3,5mm',50,210000,5,'https://res.cloudinary.com/dgbl6qitv/image/upload/v1688718280/qmqzrydpc1ckyj5adhsg.jpg','Cáp chuyển đổi cổng Lightning sang 3,5mmCáp chuyển đổi cổng Lightning sang 3,5mmCáp chuyển đổi cổng Lightning sang 3,5mmCáp chuyển đổi cổng Lightning sang 3,5mmCáp chuyển đổi cổng Lightning sang 3,5mm',12,0),(53,'Apple Pencil (thế hệ thứ 1)',15,2560000,5,'https://res.cloudinary.com/dgbl6qitv/image/upload/v1688718350/kchtb86w3dal8clzf8gf.png','\nApple Pencil bổ sung sức mạnh cho iPad và mở ra những khả năng sáng tạo mới. Nhạy với lực ép và nghiêng để bạn có thể dễ dàng vẽ những nét với độ dày khác nhau, tạo bóng mờ tinh tế và nhiều hiệu ứng nghệ thuật, tương tự như bút chì thông thường, nhưng với độ chính xác hoàn hảo đến từng điểm ảnh.',12,0),(54,'Đồng hồ thông minh Apple Watch S8 LTE 41mm',20,12290000,3,'https://res.cloudinary.com/dgbl6qitv/image/upload/v1688718536/z4fv1fiax0lkoua3oib0.jpg','Đồng hồ thông minh Apple Watch S8 LTE 41mm viền nhôm là một trong những dòng sản phẩm cao cấp được Apple trình làng vào tháng 9/2022. Với thiết kế thời thượng đi cùng nhiều tiện ích cao cấp, đây hứa hẹn sẽ là siêu phẩm được rất nhiều người săn đón.',13,0),(55,'Đồng hồ thông minh Apple Watch SE 2022',20,6390000,3,'https://res.cloudinary.com/dgbl6qitv/image/upload/v1688718640/sowp2at159frwcfug2yf.jpg','Trong sự kiện Far Out 2022, nhà Táo Khuyết đã mang đến hàng loạt sản phẩm mới trong đó có đồng hồ thông minh Apple Watch SE 2022 GPS 40mm. Mẫu smartwatch giá rẻ mới nhất của Apple này hứa hẹn sẽ khiến cho các iFans đứng ngồi không yên khi sở hữu nhiều tính năng hấp dẫn.',13,0),(56,'Đồng hồ thông minh Apple Watch SE 2022 GPS 44mm ',19,6990000,3,'https://res.cloudinary.com/dgbl6qitv/image/upload/v1688718778/cec2aiphutdeqc58w9i1.jpg','Trong sự kiện ra mắt sản phẩm mới vào tháng 9/2022, Apple đã trình làng thế hệ tiếp theo của dòng Apple Watch SE mang tên Apple Watch SE 2022, với mục tiêu đem những trải nghiệm công nghệ cao cấp đến gần hơn với nhiều đối tượng người dùng.',13,0),(57,'Đồng hồ thông minh Apple Watch Ultra LTE 49mm dây Alpine size M',19,19940000,3,'https://res.cloudinary.com/dgbl6qitv/image/upload/v1688718821/pxfxqwhdatucru95bn7r.jpg','',13,0),(58,'Đồng hồ thông minh Apple Watch S8 LTE 41mm viền thép ',20,16990000,3,'https://res.cloudinary.com/dgbl6qitv/image/upload/v1688718883/onbafkagkw1ppahprtfd.jpg','Trong sự kiện ra mắt sản phẩm thường niên vào tháng 9/2022, bên cạnh các sản phẩm điện thoại luôn thu hút sự chú ý của giới công nghệ, Apple cũng trình làng các sản phẩm smartwatch kế nhiệm của dòng Apple Watch S7 mang tên đồng hồ thông minh Apple Watch Series 8.',13,0);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rank`
--

DROP TABLE IF EXISTS `rank`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rank` (
  `rank_id` int NOT NULL AUTO_INCREMENT,
  `rank_image` varchar(45) NOT NULL,
  `points` varchar(45) NOT NULL,
  PRIMARY KEY (`rank_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rank`
--

LOCK TABLES `rank` WRITE;
/*!40000 ALTER TABLE `rank` DISABLE KEYS */;
/*!40000 ALTER TABLE `rank` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rate`
--

DROP TABLE IF EXISTS `rate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rate` (
  `rate_id` int NOT NULL AUTO_INCREMENT,
  `pro_id` int NOT NULL,
  `idUser` int NOT NULL,
  `rate_points` int NOT NULL,
  `comment` longtext NOT NULL,
  PRIMARY KEY (`rate_id`),
  KEY `idProduct_idx` (`pro_id`),
  KEY `idUser_idx` (`idUser`),
  CONSTRAINT `idUser` FOREIGN KEY (`idUser`) REFERENCES `users` (`user_id`),
  CONSTRAINT `pro_id` FOREIGN KEY (`pro_id`) REFERENCES `products` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rate`
--

LOCK TABLES `rate` WRITE;
/*!40000 ALTER TABLE `rate` DISABLE KEYS */;
INSERT INTO `rate` VALUES (22,1,4,5,'hehehehe'),(23,1,4,1,'heheheheasdaasd'),(24,43,4,5,'Quá tuyệt vời'),(25,43,4,3,'toi`'),(29,51,5,5,'10 điểm'),(31,51,4,3,'Bình thường'),(32,52,6,3,'bình thường');
/*!40000 ALTER TABLE `rate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `phoneNumber` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `user_name` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `gender` tinyint DEFAULT NULL,
  `date_of_birth` varchar(255) DEFAULT NULL,
  `roles` tinyint NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (4,'0981965299','15032001','Nguyễn Hữu Minh Dương','265 Yên Hòa, Cầu Giấy, Hà Nội',0,'2001-03-15',0),(5,'0981965525','15032001','Nguyễn Hữu Minh','261 Yên Hòa, Cầu Giấy, Hà Nội',0,'2002-07-28',0),(6,'0123456789','15032001','Duong dep trai','Yên Hòa, Cầu Giấy',0,'2001-08-28',1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `voucher`
--

DROP TABLE IF EXISTS `voucher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `voucher` (
  `voucher_id` int NOT NULL AUTO_INCREMENT,
  `voucher_discount` float NOT NULL,
  `voucher_name` varchar(45) NOT NULL,
  PRIMARY KEY (`voucher_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `voucher`
--

LOCK TABLES `voucher` WRITE;
/*!40000 ALTER TABLE `voucher` DISABLE KEYS */;
INSERT INTO `voucher` VALUES (1,10,'DISCOUNTT7'),(2,5,'DISCOUNT5'),(4,10,'DuongDeptrai');
/*!40000 ALTER TABLE `voucher` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-07-11 10:42:05
