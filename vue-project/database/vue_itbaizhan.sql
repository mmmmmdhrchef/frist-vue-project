/*
 Navicat Premium Dump SQL

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 90300 (9.3.0)
 Source Host           : localhost:3306
 Source Schema         : itbaizhan

 Target Server Type    : MySQL
 Target Server Version : 90300 (9.3.0)
 File Encoding         : 65001

 Date: 26/11/2025 21:26:14
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for project
-- ----------------------------
DROP TABLE IF EXISTS `project`;
CREATE TABLE `project`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `number` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `money` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `address` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `duration` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `startTime` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `endTime` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `quantity` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `status` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `remark` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 105 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of project
-- ----------------------------
INSERT INTO `project` VALUES (1, '晋阳(晋冀界)至榆次', 'gbc', '3200000', '榆次', '12', '1643644800000', '1706716800000', '1', '1', '正在进行中的隧道挖掘');
INSERT INTO `project` VALUES (2, '大广高速(北京)路段', 'cfbj', '900000', '北京', '9', '1654012800000', '1685548800000', '5', '0', '可挖掘隧道');
INSERT INTO `project` VALUES (3, '京哈高速(北京)路段', 'bjh', '5600000', '北京', '15', '1664899200000', '1699977600000', '5', '1', '京哈高速路段隧道维修较为困难');
INSERT INTO `project` VALUES (4, 'G2京沪高速', 'G2', '1000000', '上海', '45', '1666195200000', '1729094400000', '30', '0', '北京－唐山－秦皇岛－锦州－沈阳－四平－长春－哈尔滨，1280公里');
INSERT INTO `project` VALUES (5, 'G3京台高速', 'G3', '300000', '台湾', '45', '1665676800000', '1729094400000', '30', '1', '北京－天津－沧州－德州－济南－泰安－曲阜－徐州－蚌埠－合肥－铜陵－黄山－衢州－南平－福州－台北，2030公里');
INSERT INTO `project` VALUES (6, 'G4京港澳高速', 'G4', '6000000', '香港', '43', '1665331200000', '1760630400000', '50', '1', '北京－保定－石家庄－邯郸－新乡－郑州－漯河－信阳－武汉－咸宁－岳阳－长沙－株洲－阳－郴州－韶关－广州－深圳－香港（口岸），2285公里');
INSERT INTO `project` VALUES (7, 'G4W广澳高速', 'G4W', '6000000', '香港', '43', '1665331200000', '1760630400000', '50', '1', '广州—澳门广州－中山－珠海－澳门（口岸）');
INSERT INTO `project` VALUES (8, 'G5京昆高速', 'G5', '6000000', '北京', '43', '1665331200000', '1760630400000', '50', '1', '北京－保定－石家庄－太原－临汾－西安－汉中－广元－绵阳－成都－雅安－西昌－攀枝花－昆明，2865公里');
INSERT INTO `project` VALUES (9, 'G6京藏高速', 'G6', '6000000', '西藏', '43', '1665331200000', '1760630400000', '50', '1', '北京－张家口－集宁－呼和浩特－包头－临河－乌海－银川－中宁－白银－兰州－西宁－格尔木－拉萨，3710公里');
INSERT INTO `project` VALUES (11, 'G11鹤大高速', 'G11', '6000000', '鹤岗', '43', '1665331200000', '1760630400000', '50', '1', '鹤岗－佳木斯－鸡西－牡丹江－敦化－通化－丹东－大连，1390公里');
INSERT INTO `project` VALUES (12, 'G1111鹤哈高速', 'G1111', '6000000', '鹤岗', '43', '1665331200000', '1760630400000', '50', '1', '鹤岗－伊春－绥化－哈尔滨');
INSERT INTO `project` VALUES (13, 'G111集双高速', 'G111', '6000000', '集安（口岸）', '43', '1665331200000', '1760630400000', '50', '1', '集安（口岸）－通化－梅河口－辽源－四平－双辽');
INSERT INTO `project` VALUES (14, 'G1113丹阜高速', 'G1113', '6000000', '丹东', '43', '1665331200000', '1760630400000', '50', '1', '丹东（口岸）－本溪－沈阳－新民－阜新');
INSERT INTO `project` VALUES (15, 'G15沈海高速', 'G15', '6000000', '沈阳', '43', '1665331200000', '1760630400000', '50', '1', '沈阳－辽阳－鞍山－海城－大连－烟台－青岛－日照－连云港－盐城－南通－常熟－太仓－上海－宁波－台州－温州－宁德－福州－泉州－厦门－汕头－汕尾－深圳－广州－佛山－开平－阳江－茂名－湛江－海口，3710公里');
INSERT INTO `project` VALUES (16, 'G15W常台高速', 'G15W', '6000000', '台州', '43', '1665331200000', '1760630400000', '50', '1', '常熟－苏州－嘉兴－绍兴－台州');
INSERT INTO `project` VALUES (17, 'G1511日兰高速', 'G1511', '6000000', '兰考', '43', '1665331200000', '1760630400000', '50', '1', '日照－曲阜－济宁－菏泽－兰考');
INSERT INTO `project` VALUES (18, 'G1512甬金高速', 'G1512', '6000000', '宁波', '43', '1665331200000', '1760630400000', '50', '0', '宁波－嵊州－金华');
INSERT INTO `project` VALUES (19, 'G1513温丽高速', 'G1513', '6000000', '温州', '43', '1665331200000', '1760630400000', '50', '1', '温州－丽水');
INSERT INTO `project` VALUES (20, 'G25长深高速', 'G25', '6000000', '长春', '43', '1665331200000', '1760630400000', '50', '1', '长春－双辽－阜新－朝阳－承德－唐山－天津－黄骅－滨州－青州－临沂－连云港－淮安－南京－溧阳－宜兴－湖州－杭州－金华－丽水－南平－三明－龙岩－梅州－河源－惠州－深圳，3580公里');
INSERT INTO `project` VALUES (21, 'G2511新鲁高速', 'G2511', '6000000', '新民', '43', '1665331200000', '1760630400000', '50', '0', '新民－彰武－通辽－鲁北');
INSERT INTO `project` VALUES (22, 'G35济广高速', 'G35', '6000000', '济南', '43', '1665331200000', '1760630400000', '50', '0', '济南－菏泽－商丘－阜阳－六安－安庆－景德镇－鹰潭－南城－瑞金－河源－广州，2110公里');
INSERT INTO `project` VALUES (23, 'G45大广高速', 'G45', '6000000', '大庆', '43', '1665331200000', '1760630400000', '50', '1', '大庆－松原－双辽－通辽－赤峰－承德－北京－霸州－衡水－濮阳－开封－周口－麻城－黄石－吉安－赣州－龙南－连平－广州，3550公里');
INSERT INTO `project` VALUES (24, 'G55二广高速', 'G55', '6000000', '二连浩特', '43', '1665331200000', '1760630400000', '50', '1', '<p>二连浩特－集宁－大同－太原－长治－晋城－洛阳－平顶山－南阳－襄樊－荆州－常德－娄底－邵阳－永州－连州－广州，2685公里</p>');
INSERT INTO `project` VALUES (81, '兰海高速(重庆)路段', '62', '7100000', '重庆', '44', '1693526400000', '1756608000000', '1', '1', '正在进行交通工程');
INSERT INTO `project` VALUES (82, 'G112高速', '33', '8600000', '成都（口岸）', '30', '1696118400000', '1759190400000', '0', '1', '可进行路面铺设');
INSERT INTO `project` VALUES (83, '重庆至成都高速', '49', '5800000', '重庆', '26', '1698710400000', '1761782400000', '1', '0', '成渝高速路段拓宽工程待启动');
INSERT INTO `project` VALUES (84, 'G113高速', '21', '7900000', '成都', '34', '1701302400000', '1764374400000', '0', '1', '正在进行桥梁建设');
INSERT INTO `project` VALUES (85, '测试高速85', '75', '820000', '测试地区85', '43', '1703980800000', '1767052800000', '1', '0', '测试备注85');
INSERT INTO `project` VALUES (86, '沪蓉高速(南京)路段', '58', '6700000', '南京', '42', '1706572800000', '1769644800000', '1', '1', '正在进行隧道挖掘');
INSERT INTO `project` VALUES (87, 'G114高速', '29', '8100000', '杭州（口岸）', '28', '1709164800000', '1772236800000', '0', '1', '可进行边坡防护');
INSERT INTO `project` VALUES (88, '南京至杭州高速', '44', '6300000', '南京', '37', '1711756800000', '1774828800000', '1', '0', '宁杭高速路段地质条件复杂');
INSERT INTO `project` VALUES (89, 'G115高速', '60', '9500000', '杭州', '19', '1714348800000', '1777920800000', '0', '1', '可启动绿化工程');
INSERT INTO `project` VALUES (90, '测试高速90', '47', '760000', '测试地区90', '41', '1716940800000', '1781002800000', '1', '0', '测试备注90');
INSERT INTO `project` VALUES (91, '京藏高速(西安)路段', '71', '7400000', '西安', '46', '1719532800000', '1782604800000', '1', '1', '正在进行交通工程');
INSERT INTO `project` VALUES (92, 'G116高速', '38', '8800000', '兰州（口岸）', '32', '1722124800000', '1785196800000', '0', '1', '可进行路面铺设');
INSERT INTO `project` VALUES (93, '西安至兰州高速', '53', '6000000', '西安', '30', '1724716800000', '1787288800000', '1', '0', '陕甘高速路段拓宽工程待启动');
INSERT INTO `project` VALUES (94, 'G117高速', '27', '8000000', '兰州', '35', '1727308800000', '1790280800000', '0', '1', '正在进行桥梁建设');
INSERT INTO `project` VALUES (95, '测试高速95', '59', '840000', '测试地区95', '44', '1729891200000', '1793352800000', '1', '0', '测试备注95');
INSERT INTO `project` VALUES (96, '青银高速(济南)路段', '66', '6900000', '济南', '43', '1732483200000', '1795425200000', '1', '1', '正在进行隧道挖掘');
INSERT INTO `project` VALUES (97, 'G118高速', '31', '8200000', '郑州（口岸）', '29', '1735075200000', '1798500000000', '0', '1', '可进行边坡防护');
INSERT INTO `project` VALUES (98, '济南至郑州高速', '46', '5700000', '济南', '36', '1737667200000', '1801572000000', '1', '0', '济郑高速路段地质条件复杂');
INSERT INTO `project` VALUES (99, 'G119高速', '54', '9300000', '郑州', '18', '1740259200000', '1804644000000', '0', '1', '可启动绿化工程');

-- ----------------------------
-- Table structure for tunnel
-- ----------------------------
DROP TABLE IF EXISTS `tunnel`;
CREATE TABLE `tunnel`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `cid` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tunnel
-- ----------------------------
INSERT INTO `tunnel` VALUES (1, '晋阳(津冀界)至榆次高速公路', 'c01');
INSERT INTO `tunnel` VALUES (2, '晋京(津冀界)至北京高速公路', 'c02');
INSERT INTO `tunnel` VALUES (3, '京哈(京哈界)至承德高速公路', 'c03');

-- ----------------------------
-- Table structure for tunnelchild
-- ----------------------------
DROP TABLE IF EXISTS `tunnelchild`;
CREATE TABLE `tunnelchild`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `cid` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `name` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tunnelchild
-- ----------------------------
INSERT INTO `tunnelchild` VALUES (1, 'c01', '赵壁1号隧道出口', 'zb');
INSERT INTO `tunnelchild` VALUES (2, 'c01', '赵壁2号隧道出口', 'zb');
INSERT INTO `tunnelchild` VALUES (3, 'c01', '赵壁3号隧道出口', 'zb');
INSERT INTO `tunnelchild` VALUES (4, 'c01', '赵壁4号隧道出口', 'zb');
INSERT INTO `tunnelchild` VALUES (5, 'c02', '赤承01号隧道出口', 'cc');
INSERT INTO `tunnelchild` VALUES (6, 'c02', '赤承02号隧道出口', 'cc');
INSERT INTO `tunnelchild` VALUES (7, 'c02', '赤承03号隧道出口', 'cc');

-- ----------------------------
-- Table structure for tunnelcontent
-- ----------------------------
DROP TABLE IF EXISTS `tunnelcontent`;
CREATE TABLE `tunnelcontent`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `tunnelname` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `imagename` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `num` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `url` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 21 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tunnelcontent
-- ----------------------------
INSERT INTO `tunnelcontent` VALUES (1, '赵壁1号隧道出口', '赵壁1号纵断', 'zb0001', '1763976800322-format2025.doc', 'zb');
INSERT INTO `tunnelcontent` VALUES (2, '赵壁1号隧道出口', '赵壁2号纵断', 'zb0002', '', 'zb');
INSERT INTO `tunnelcontent` VALUES (3, '赵壁1号隧道出口', '赵壁3号纵断', 'zb0003', '', 'zb');
INSERT INTO `tunnelcontent` VALUES (4, '赵壁1号隧道出口', '赵壁4号纵断', 'zb0004', '', 'zb');
INSERT INTO `tunnelcontent` VALUES (5, '赵壁1号隧道出口', '赵壁5号纵断', 'zb0005', '', 'zb');
INSERT INTO `tunnelcontent` VALUES (6, '赵壁1号隧道出口', '赵壁6号纵断', 'zb0006', '', 'zb');
INSERT INTO `tunnelcontent` VALUES (7, '赵壁1号隧道出口', '赵壁7号纵断', 'zb0007', '', 'zb');
INSERT INTO `tunnelcontent` VALUES (8, '赵壁1号隧道出口', '赵壁8号纵断', 'zb0008', '', 'zb');
INSERT INTO `tunnelcontent` VALUES (9, '赵壁1号隧道出口', '赵壁9号纵断', 'zb0009', '', 'zb');
INSERT INTO `tunnelcontent` VALUES (10, '赵壁1号隧道出口', '赵壁10号纵断', 'zb0010', '', 'zb');
INSERT INTO `tunnelcontent` VALUES (11, '赤承01号隧道出口', '赤承1号纵断', 'cc0001', '', 'cc');
INSERT INTO `tunnelcontent` VALUES (12, '赤承01号隧道出口', '赤承1号纵断', 'cc0002', '1763824201672-006496_1.pdf', 'cc');
INSERT INTO `tunnelcontent` VALUES (13, '赤承01号隧道出口', '赤承1号纵断', 'cc0003', '', 'cc');
INSERT INTO `tunnelcontent` VALUES (14, '赤承01号隧道出口', '赤承1号纵断', 'cc0004', '', 'cc');
INSERT INTO `tunnelcontent` VALUES (15, '赤承01号隧道出口', '赤承1号纵断', 'cc0005', '', 'cc');
INSERT INTO `tunnelcontent` VALUES (16, '赤承01号隧道出口', '赤承1号纵断', 'cc0006', '', 'cc');
INSERT INTO `tunnelcontent` VALUES (17, '赤承01号隧道出口', '赤承1号纵断', 'cc0007', '', 'cc');
INSERT INTO `tunnelcontent` VALUES (18, '赤承01号隧道出口', '赤承1号纵断', 'cc0008', '', 'cc');
INSERT INTO `tunnelcontent` VALUES (19, '赤承01号隧道出口', '赤承1号纵断', 'cc0009', '', 'cc');
INSERT INTO `tunnelcontent` VALUES (20, '赤承01号隧道出口', '赤承1号纵断', 'cc0010', '', 'cc');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  `password` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  `permission` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `phone` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 38 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, 'admin', '123456', 'admin', '18888888888');
INSERT INTO `user` VALUES (2, 'hello', '!ASDF12345', 'vip', '15555555555');
INSERT INTO `user` VALUES (3, 'demo', '123456', 'vip', '13337155551');
INSERT INTO `user` VALUES (4, 'test', '111111', 'vip', '17777777777');
INSERT INTO `user` VALUES (36, 'zhou jianb', '!!!asdasd123123', 'admin', '13666666666');
INSERT INTO `user` VALUES (37, 'asdasd', '!!asdasd123', 'vip', '13666666666');

SET FOREIGN_KEY_CHECKS = 1;
