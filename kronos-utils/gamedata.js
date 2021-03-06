///\\\                                                                  ///\\\
///\\\   ######   Alert to all would-be bug-fixers out there   ######   ///\\\
///\\\                                                                  ///\\\
///\\\   Never *ever* post edited excerpts of this file on the board;   ///\\\
///\\\   you will just ruin the reading experience for everyone, as I   ///\\\
///\\\   do not take patches to this file anyway; your error probably   ///\\\
///\\\   is elsewhere, most likely the code which tries to figure out   ///\\\
///\\\   which technologies you have researched, anyway.                ///\\\
///\\\                                                                  ///\\\

revision("$Revision$");
var base = "http://ecmanaut.googlecode.com/svn/trunk/sites/ikariam.org/kronos-utils/";

// resources:
var resourceIDs = {
  gold: "g", wood: "w", wine: "W", marble: "M", crystal: "C", sulfur: "S",
  time: "t", inhabitants: "p", maxActionPoints: "a", glass: "C",
};


// buildings:
var buildingIDs = {
  townHall: 0, townhall: 0, port: 3, academy: 4, shipyard: 5, barracks: 6,
  warehouse: 7, wall: 8, tavern: 9, museum: 10, palace: 11, embassy: 12,
  branchOffice: 13, workshop: 15, "workshop-army": 15, "workshop-fleet": 15,
  safehouse: 16, palaceColony: 17, resource: 1, tradegood: 2
};

var softCap = [24,21 /* sawmill */,,,,,24,,24,,8,4,,,,24,20,4]; // 16 for others

var buildingCapacities = {
  townHall:
    [   0,   60,   96,  143,  200,  263,  333,  410,  492,  580,  672,  769,
      871,  977, 1087, 1201, 1320, 1441, 1567, 1696, 1828, 1964, 2103, 2246,
     2391, 2691, 2845, 3003, 3163, 3326, 3492, 3360],

  academy:
    [   0,    8,   12,   16,   22,   28,   35,   43,   51,   60,   69,   79,
       89,  100,  111,  122,  134,  146,  159,  172,  185,  198,  212,  227,
      241],

  tavern:
    [   0,    3,    5,    8,   11,   14,   17,   21,   25,   29,   33,   38,
       42,   47,   52,   57,   63,   68,   73,   79,   85,   91,   97,  103,
      109],

  port:
    [   3,   10,   30,   58,   92,  131,  176,  225,  279,  336,  398,  464,
      533,  606,  682,  762,  844,  931, 1020, 1112, 1207, 1305, 1406, 1509,
     1616],

  warehouse: { // now both capacities (w/r) listed here and the loot-safe level
    w: [1000, 2160, 3200, 4576, 6336, 8424, 10975, 13799, 17152, 20944, 25200,
        29791, 35040, 44520, 55439, 67528, 81024, 321096, 641192, 1281384,
        2561768, 5122536, 10244072, 20487144, 40973288, 81945576, 163890152,
        327779304, 655557608, 1311114216, 2622227432, 5244453864, 10488906728],
    r: [300, 720, 800, 1452, 2352, 2548, 3807, 4008, 5632, 7479, 9647, 12084,
        14799, 20328, 23848, 27784, 35232, 140028, 279756, 559212, 1118124,
        2235948, 4471596, 8942892, 17885484, 35770668, 71541036, 143081772,
        286163244, 572326188, 1144652076, 2289303852, 4579607404],
    wood: [ 100,  140,  190,  240,  310,  380,  470,  560,  670,  790,  930,
           1090, 1260, 1450, 1670, 1910, 2180, 2480, 2810, 3180, 3590],
    rest: [  50,   70,   90,  120,  150,  190,  230,  280,  330,  390,  460,
            540,  630,  720,  830,  950, 1090, 1240, 1400, 1590, 1790]
  }
};

function getSword(level) {
  if (!level) return "http://img185.imageshack.us/img185/2054/22786730ag3.gif";
  return "/skin/layout/sword-icon"+ (4-level) +".gif";
}
function getShield(level) {
  if (!level) return "http://img262.imageshack.us/img262/800/72814733ej8.gif";
  return "/skin/layout/shield-icon"+ (4-level) +".gif";
}
function getCity(level, col) {
  var levels = [1, 2, 4, 7, 10, 13, 16, 18], lvl;
  do {
    lvl = levels.indexOf(level--) + 1;
  } while (!lvl);
  return "/skin/img/island/city_"+ lvl +"_"+ (col || "red") +".gif";
}

var gfx = {
        wood: "/skin/resources/icon_wood.gif",
        wine: "/skin/resources/icon_wine.gif",
      marble: "/skin/resources/icon_marble.gif",
     crystal: "/skin/resources/icon_glass.gif",
      sulfur: "/skin/resources/icon_sulfur.gif",

         pop: "/skin/resources/icon_population.gif",
     citizen: "/skin/resources/icon_citizen.gif",
    milScore: "/skin/unitdesc/unit_helmet.gif",
      upkeep: "/skin/resources/icon_upkeep.gif",
        gold: "/skin/resources/icon_gold.gif",
        time: "/skin/resources/icon_time.gif",
 journeytime: "/skin/img/icon_target2.gif", // icon_journeytime.gif: bad bg :-(
        bulb: "/skin/layout/bulb-on.gif",
        city: "/skin/layout/icon-city2.gif",
     bigcity: "/skin/layout/city.gif",
    citywall: "/skin/layout/icon-wall.gif",
        palm: "/skin/layout/icon-palm.gif",
        isle: "/skin/layout/icon-island.gif",
        plus: "/skin/buttons/premiumadvisors_plus.gif",
       build: "/skin/icons/city_30x30.gif",

       sword: getSword,
      shield: getShield,
    islecity: getCity,

      swords: "/skin/layout/icon-crossedswords.gif", // 33x27
   bigshield: "/skin/unitdesc/unit_defend.gif", // 26x26
      attack: "/skin/layout/sword-icon-report.gif",
      defend: "/skin/layout/shield-icon-report.gif",
     stamina: "/skin/layout/icon-endurance2.gif",
   alliances: base + "gfx/icons/alliances-colour.png",

     pillage: "/skin/actions/plunder.gif",
         spy: "/skin/layout/icon-mission.gif",

       world: "/skin/layout/icon-world.gif",
      spacer: "data:image/gif;base64,R0lGODlhAQABAID/A" +
              "MDAwAAAACH5BAEAAAAALAAAAAABAAEAAAEBMgA7",

    townHall: "/skin/img/city/building_townhall.gif",
        port: "/skin/img/city/building_port.gif",
     academy: "/skin/img/city/building_academy.gif",
    shipyard: "/skin/img/city/building_shipyard.gif",
    barracks: "/skin/img/city/building_barracks.gif",
   warehouse: "/skin/img/city/building_warehouse.gif",
        wall: "/skin/img/city/building_wall.gif",
      tavern: "/skin/img/city/building_tavern.gif",
      museum: "/skin/img/city/building_museum.gif",
      palace: "/skin/img/city/building_palace.gif",
     embassy: "/skin/img/city/building_embassy.gif",
branchOffice: "/skin/img/city/building_branchOffice.gif",
    workshop: "/skin/img/city/building_workshop.gif",
   safehouse: "/skin/img/city/building_safehouse.gif",
};


///\     ######   Alert to all would-be bug-fixers out there   ######     /\\\
////\                                                                    /\\\\
/////\   If you don't get correct building costs, it is because Kronos  /\\\\\
//////   has failed to read your library, NOT because this table isn't  \\\\\\
//////   correct. Build cost discounts depend on your research level -  \\\\\\
//////   which of Pulley, Geometry and Spirit Level you have; and will  \\\\\\
//////   be compensated for automatically, if Kronos learns your level  \\\\\\
/////    of tech. For a constructive way of getting help, follow this:   \\\\\
////                                                                      \\\\
///  http://ids.forum2go.nl/kronos-utils-greasemonkey-script-t77-180.html  \\\
//\\                                                                      //\\
///\\    bug report example instead. And do read the top of this file.   //\\\

var costs = [
  [{}, {w:70, t:"34m 48s"}, {w:98, t:"56m 24s"}, {w:65, M:17, t:"1h 24m"}, {w:129, M:28, t:"1h 58m"}, {w:236, M:66, t:"2h 40m"}, {w:402, M:95, t:"3h 29m"}, {w:594, M:156, t:"4h 25m"}, {w:849, M:243, t:"5h 30m"}, {w:1176, M:406, t:"6h 43m"}, {w:1586, M:579, t:"8h 5m"}, {w:2101, M:799, t:"9h 35m"}, {w:3280, M:1348, t:"11h 15m"}, {w:4937, M:2124, t:"13h 3m"}, {w:7171, M:2951, t:"15h 1m"}, {w:10139, M:4409, t:"17h 9m"}, {w:14537, M:6461, t:"20h 11m"}, {w:18420, M:8187, t:"22h 44m"}, {w:22896, M:10176, t:"1D 1h"}, {w:28047, M:12466, t:"1D 4h"}, {w:33934, M:15082, t:"1D 7h"}, {w:40623, M:18055, t:"1D 10h"}, {w:48107, M:21381, t:"1D 14h"}, {w:56511, M:25116, t:"1D 17h"}, {w:226044, M:100464, t:"6D 23h"}, {w:452088, M:200928, t:"13D 22h"}, {w:904176, M:401856, t:"27D 21h"}, {w:1808352, M:803712, t:"55D 19h"}, {w:3616704, M:1607424, t:"111D 15h"}, {w:7233408, M:3214848, t:"223D 6h"}, {w:14466816, M:6429696, t:"446D 12h"}, {w:28933632, M:12859392, t:"893D 19m"}],,,
  [{w:18, t:"10m 48s"}, {w:31, t:"24m 29s"}, {w:44, t:"50m 24s"}, {w:87, M:33, t:"1h 26m"}, {w:156, M:48, t:"2h 18m"}, {w:266, M:93, t:"2h 58m"}, {w:425, M:126, t:"3h 41m"}, {w:653, M:215, t:"4h 52m"}, {w:963, M:344, t:"5h 37m"}, {w:1381, M:529, t:"7h 6m"}, {w:1915, M:777, t:"7h 48m"}, {w:2604, M:1100, t:"9h 30m"}, {w:3790, M:1731, t:"10h 36s"}, {w:5349, M:2301, t:"11h 53m"}, {w:7333, M:3017, t:"11h 59m"}, {w:9808, M:4265, t:"13h 56m"}, {w:39232, M:17060, t:"2D 7h"}, {w:78464, M:34120, t:"4D 15h"}, {w:156928, M:68240, t:"9D 7h"}, {w:313856, M:136480, t:"18D 14h"}, {w:627712, M:272960, t:"37D 4h"}, {w:1255424, M:545920, t:"74D 8h"}, {w:2510848, M:1091840, t:"148D 17h"}, {w:5021696, M:2183680, t:"297D 11h"}],
  [{w:36, t:"14m 24s"}, {w:58, t:"28m 48s"}, {w:84, t:"48m"}, {w:79, C:30, t:"1h 19m"}, {w:159, C:73, t:"1h 57m"}, {w:302, C:210, t:"2h 48m"}, {w:535, C:285, t:"3h 52m"}, {w:889, C:467, t:"5h 6m"}, {w:1423, C:712, t:"6h 36m"}, {w:2174, C:999, t:"8h 16m"}, {w:3221, C:1307, t:"10h 16m"}, {w:4639, C:1960, t:"12h 27m"}, {w:7155, C:3267, t:"15h"}, {w:10630, C:4573, t:"17h 45m"}, {w:15224, C:6264, t:"20h 44m"}, {w:20358, C:8853, t:"1D 7m"}, {w:81432, C:35412, t:"4D 28m"}, {w:162864, C:70824, t:"8D 57m"}, {w:325728, C:141648, t:"16D 1h"}, {w:651456, C:283296, t:"32D 3h"}, {w:1302912, C:566592, t:"64D 7h"}, {w:2605824, C:1133184, t:"128D 15h"}, {w:5211648, C:2266368, t:"257D 6h"}, {w:10423296, C:4532736, t:"514D 13h"}],
  [{w:38, t:"22m 41s"}, {w:67, t:"52m 49s"}, {w:96, t:"1h 50m"}, {w:152, M:57, t:"2h 31m"}, {w:272, M:83, t:"4h 1m"}, {w:388, M:135, t:"4h 20m"}, {w:609, M:180, t:"5h 17m"}, {w:810, M:266, t:"6h 2m"}, {w:1091, M:390, t:"6h 22m"}, {w:1551, M:594, t:"7h 58m"}, {w:1921, M:780, t:"7h 50m"}, {w:2600, M:1098, t:"9h 29m"}, {w:3530, M:1612, t:"9h 19m"}, {w:4555, M:1960, t:"10h 7m"}, {w:6228, M:2563, t:"10h 10m"}, {w:7702, M:3349, t:"10h 57m"}, {w:30808, M:13396, t:"1D 19h"}, {w:61616, M:26792, t:"3D 15h"}, {w:123232, M:53584, t:"7D 7h"}, {w:246464, M:107168, t:"14D 14h"}, {w:492928, M:214336, t:"29D 4h"}, {w:985856, M:428672, t:"58D 9h"}, {w:1971712, M:857344, t:"116D 19h"}, {w:3943424, M:1714688, t:"233D 14h"}, {w:7886848, M:3429376, t:"467D 4h"}, {w:15773696, M:6858752, t:"934D 9h"}, {w:31547392, M:13717504, t:"1868D 19h"}, {w:63094784, M:27435008, t:"3737D 14h"}, {w:126189568, M:54870016, t:"7475D 4h"}, {w:252379136, M:109740032, t:"14950D 9h"}, {w:504758272, M:219480064, t:"29900D 19h"}, {w:1009516544, M:438960128, t:"59801D 14h"}],
  [{w:35, t:"6m 58s"}, {w:45, t:"16m 12s"}, {w:68, t:"31m 12s"}, {w:76, t:"56m 24s"}, {w:67, M:22, t:"1h 39m"}, {w:76, M:24, t:"1h 44m"}, {w:124, M:46, t:"2h 3m"}, {w:183, M:56, t:"2h 15m"}, {w:235, M:82, t:"2h 23m"}, {w:336, M:100, t:"2h 55m"}, {w:455, M:150, t:"3h 23m"}, {w:616, M:220, t:"4h"}, {w:755, M:289, t:"4h 18m"}, {w:980, M:398, t:"5h"}, {w:1170, M:494, t:"4h 48m"}, {w:1477, M:650, t:"5h 29m"}, {w:1797, M:821, t:"5h 25m"}, {w:2120, M:991, t:"5h 50m"}, {w:2435, M:1048, t:"5h 24m"}, {w:2831, M:1254, t:"5h 48m"}, {w:3208, M:1320, t:"5h 14m"}, {w:3763, M:1595, t:"5h 43m"}, {w:4296, M:1869, t:"5h 5m"}, {w:4874, M:2166, t:"5h 24m"}, {w:19496, M:8664, t:"21h 39m"}, {w:38992, M:17328, t:"1D 19h"}, {w:77984, M:34656, t:"3D 14h"}, {w:155968, M:69312, t:"7D 5h"}, {w:311936, M:138624, t:"14D 10h"}, {w:623872, M:277248, t:"28D 21h"}, {w:1247744, M:554496, t:"57D 18h"}, {w:2495488, M:1108992, t:"115D 12h"}, {w:4990976, M:2217984, t:"231D 57m"}, {w:9981952, M:4435968, t:"462D 1h"}, {w:19963904, M:8871936, t:"924D 3h"}, {w:39927808, M:17743872, t:"1848D 7h"}, {w:79855616, M:35487744, t:"3696D 15h"}, {w:159711232, M:70975488, t:"7393D 6h"}, {w:319422464, M:141950976, t:"14786D 13h"}, {w:638844928, M:283901952, t:"29573D 2h"}, {w:1277689856, M:567803904, t:"59146D 5h"}, {w:2555379712, M:1135607808, t:"118292D 11h"}, {w:5110759424, M:2271215616, t:"236584D 23h"}, {w:10221518848, M:4542431232, t:"473169D 22h"}, {w:20443037696, M:9084862464, t:"946339D 20h"}, {w:40886075392, M:18169724928, t:"1892679D 16h"}, {w:81772150784, M:36339449856, t:"3785359D 8h"}, {w:163544301568, M:72678899712, t:"7570718D 17h"}, {w:327088603136, M:145357799424, t:"15141437D 10h"}, {w:654177206272, M:290715598848, t:"30282874D 21h"}, {w:1308354412544, M:581431197696, t:"60565749D 18h"}, {w:2616708825088, M:1162862395392, t:"121131499D 12h"}, {w:5233417650176, M:2325724790784, t:"242262999D 57m"}, {w:10466835300352, M:4651449581568, t:"484525998D 1h"}, {w:20933670600704, M:9302899163136, t:"969051996D 3h"}, {w:41867341201408, M:18605798326272, t:"1938103992D 7h"}],
  [{w:42, t:"27m 36s"}, {w:91, t:"1h 7m"}, {w:79, M:13, t:"1h 40m"}, {w:145, M:43, t:"2h 25m"}, {w:255, M:62, t:"3h 8m"}, {w:396, M:110, t:"4h 2m"}, {w:565, M:134, t:"4h 54m"}, {w:799, M:237, t:"5h 57m"}, {w:1203, M:387, t:"7h 6m"}, {w:1619, M:558, t:"8h 24m"}, {w:2135, M:780, t:"9h 54m"}, {w:2761, M:1167, t:"11h 27m"}, {w:4198, M:1917, t:"13h 12m"}, {w:5746, M:2472, t:"15h 12m"}, {w:7655, M:3150, t:"17h 22m"}, {w:10032, M:5235, t:"19h 48m"}, {w:40128, M:20940, t:"3D 7h"}, {w:80256, M:41880, t:"6D 14h"}, {w:160512, M:83760, t:"13D 4h"}, {w:321024, M:167520, t:"26D 9h"}, {w:642048, M:335040, t:"52D 19h"}, {w:1284096, M:670080, t:"105D 15h"}, {w:2568192, M:1340160, t:"211D 7h"}, {w:5136384, M:2680320, t:"422D 14h"}, {w:10272768, M:5360640, t:"845D 5h"}, {w:20545536, M:10721280, t:"1690D 10h"}, {w:41091072, M:21442560, t:"3380D 21h"}, {w:82182144, M:42885120, t:"6761D 19h"}, {w:164364288, M:85770240, t:"13523D 15h"}, {w:328728576, M:171540480, t:"27047D 6h"}, {w:657457152, M:343080960, t:"54094D 12h"}, {w:1314914304, M:686161920, t:"108189D 19m"}],
  [{w:72, t:"1h 12m"}, {w:74, M:13, t:"1h 50m"}, {w:100, M:32, t:"2h 29m"}, {w:155, M:58, t:"3h 16m"}, {w:227, M:69, t:"4h 12m"}, {w:324, M:113, t:"4h 37m"}, {w:442, M:131, t:"4h 59m"}, {w:593, M:195, t:"5h 18m"}, {w:777, M:278, t:"5h 32m"}, {w:998, M:382, t:"5h 42m"}, {w:1255, M:509, t:"6h 24m"}, {w:1564, M:661, t:"7h 8m"}, {w:2159, M:950, t:"8h 55m"}, {w:2317, M:1058, t:"8h 44m"}, {w:2784, M:1301, t:"9h 7m"}, {w:3308, M:1423, t:"9h 27m"}, {w:3902, M:1728, t:"9h 43m"}, {w:4559, M:1876, t:"9h 56m"}, {w:5296, M:2245, t:"10h 4m"}, {w:6119, M:2661, t:"10h 9m"}, {w:7020, M:3120, t:"10h 8m"}, {w:7533, M:3348, t:"10h 2m"}, {w:8065, M:3584, t:"9h 51m"}, {w:8613, M:3828, t:"9h 34m"}, {w:34452, M:15312, t:"1D 14h"}, {w:68904, M:30624, t:"3D 4h"}, {w:137808, M:61248, t:"6D 9h"}, {w:275616, M:122496, t:"12D 18h"}, {w:551232, M:244992, t:"25D 12h"}, {w:1102464, M:489984, t:"51D 57m"}, {w:2204928, M:979968, t:"102D 1h"}, {w:4409856, M:1959936, t:"204D 3h"}, {w:8819712, M:3919872, t:"408D 7h"}, {w:17639424, M:7839744, t:"816D 15h"}, {w:35278848, M:15679488, t:"1633D 6h"}, {w:70557696, M:31358976, t:"3266D 13h"}, {w:141115392, M:62717952, t:"6533D 2h"}, {w:282230784, M:125435904, t:"13066D 5h"}, {w:564461568, M:250871808, t:"26132D 11h"}, {w:1128923136, M:501743616, t:"52264D 23h"}, {w:2257846272, M:1003487232, t:"104529D 22h"}, {w:4515692544, M:2006974464, t:"209059D 20h"}, {w:9031385088, M:4013948928, t:"418119D 16h"}, {w:18062770176, M:8027897856, t:"836239D 8h"}, {w:36125540352, M:16055795712, t:"1672478D 17h"}, {w:72251080704, M:32111591424, t:"3344957D 10h"}, {w:144502161408, M:64223182848, t:"6689914D 21h"}, {w:289004322816, M:128446365696, t:"13379829D 18h"}, {w:578008645632, M:256892731392, t:"26759659D 12h"}, {w:1156017291264, M:513785462784, t:"53519319D 57m"}, {w:2312034582528, M:1027570925568, t:"107038638D 1h"}, {w:4624069165056, M:2055141851136, t:"214077276D 3h"}, {w:9248138330112, M:4110283702272, t:"428154552D 7h"}, {w:18496276660224, M:8220567404544, t:"856309104D 15h"}, {w:36992553320448, M:16441134809088, t:"1712618209D 6h"}, {w:73985106640896, M:32882269618176, t:"3425236418D 13h"}],
  [{w:25, t:"13m 20s"}, {w:112, M:12, t:"55m 12s"}, {w:196, M:46, t:"1h 49m"}, {w:297, M:88, t:"3h 5m"}, {w:494, M:162, t:"4h 2m"}, {w:766, M:274, t:"4h 58m"}, {w:1127, M:432, t:"5h 47m"}, {w:1588, M:644, t:"7h 17m"}, {w:2177, M:920, t:"7h 57m"}, {w:2895, M:1274, t:"9h 34m"}, {w:3756, M:1715, t:"9h 55m"}, {w:4803, M:2244, t:"11h 35m"}, {w:6030, M:2594, t:"11h 29m"}, {w:7468, M:3307, t:"13h 8m"}, {w:9117, M:3751, t:"12h 25m"}, {w:11804, M:5133, t:"13h 59m"}, {w:47216, M:20532, t:"2D 7h"}, {w:94432, M:41064, t:"4D 15h"}, {w:188864, M:82128, t:"9D 7h"}, {w:377728, M:164256, t:"18D 15h"}, {w:755456, M:328512, t:"37D 7h"}, {w:1510912, M:657024, t:"74D 14h"}, {w:3021824, M:1314048, t:"149D 4h"}, {w:6043648, M:2628096, t:"298D 8h"}],
  [{w:282, M:84, t:"1h 28m"}, {w:760, M:272, t:"2h 57m"}, {w:1616, M:656, t:"4h 56m"}, {w:2996, M:1319, t:"7h 25m"}, {w:5035, M:2353, t:"8h 40m"}, {w:7901, M:3499, t:"11h 35m"}, {w:11746, M:4979, t:"14h 54m"}, {w:16776, M:7456, t:"18h 38m"}, {w:67104, M:29824, t:"3D 2h"}, {w:134208, M:59648, t:"6D 5h"}, {w:268416, M:119296, t:"12D 10h"}, {w:536832, M:238592, t:"24D 20h"}, {w:1073664, M:477184, t:"49D 16h"}, {w:2147328, M:954368, t:"99D 9h"}, {w:4294656, M:1908736, t:"198D 19h"}, {w:8589312, M:3817472, t:"397D 15h"}, {w:17178624, M:7634944, t:"795D 7h"}, {w:34357248, M:15269888, t:"1590D 14h"}, {w:68714496, M:30539776, t:"3181D 5h"}, {w:137428992, M:61079552, t:"6362D 10h"}, {w:274857984, M:122159104, t:"12724D 21h"}, {w:549715968, M:244318208, t:"25449D 19h"}, {w:1099431936, M:488636416, t:"50899D 15h"}, {w:2198863872, M:977272832, t:"101799D 6h"}],
  #1=[{w:648, t:"4h"}, {w:5600, M:536, t:"8h"}, {w:20880, M:7317, C:4878, t:"9h"}, {w:57600, W:12800, M:32000, C:25600, t:"8h"}, {w:230400, W:102400, M:153600, C:102400, t:"8h"}, {w:460800, W:204800, M:307200, C:204800, t:"8h"}, {w:921600, W:409600, M:614400, C:409600, t:"8h"}, {w:1843200, W:819200, M:1228800, C:819200, t:"8h"}, {w:3686400, W:1638400, M:2457600, C:1638400, t:"8h"}, {w:7372800, W:3276800, M:4915200, C:3276800, t:"8h"}, {w:14745600, W:6553600, M:9830400, C:6553600, t:"8h"}, {w:29491200, W:13107200, M:19660800, C:13107200, t:"8h"}],
  [{w:46, M:14, t:"50m 25s"}, {w:120, M:42, t:"1h 42m"}, {w:212, M:63, t:"2h 23m"}, {w:334, M:110, t:"2h 59m"}, {w:489, M:175, t:"3h 29m"}, {w:681, M:261, t:"3h 53m"}, {w:1001, M:406, t:"4h 38m"}, {w:1428, M:603, t:"5h 25m"}, {w:1967, M:866, t:"6h 15m"}, {w:2635, M:1203, t:"7h 6m"}, {w:3472, M:1622, t:"7h 58m"}, {w:4481, M:1928, t:"8h 53m"}, {w:5693, M:2521, t:"9h 49m"}, {w:7122, M:2931, t:"10h 46m"}, {w:8804, M:3732, t:"11h 45m"}, {w:10770, M:4683, t:"12h 45m"}, {w:43080, M:18732, t:"2D 3h"}, {w:86160, M:37464, t:"4D 6h"}, {w:172320, M:74928, t:"8D 12h"}, {w:344640, M:149856, t:"17D 19m"}, {w:689280, M:299712, t:"34D 38m"}, {w:1378560, M:599424, t:"68D 1h"}, {w:2757120, M:1198848, t:"136D 2h"}, {w:5514240, M:2397696, t:"272D 5h"}, {w:11028480, M:4795392, t:"544D 10h"}, {w:22056960, M:9590784, t:"1088D 20h"}, {w:44113920, M:19181568, t:"2177D 16h"}, {w:88227840, M:38363136, t:"4355D 9h"}, {w:176455680, M:76726272, t:"8710D 19h"}, {w:352911360, M:153452544, t:"17421D 15h"}, {w:705822720, M:306905088, t:"34843D 7h"}, {w:1411645440, M:613810176, t:"69686D 14h"}],
  [{w:15, t:"17m 17s"}, {w:38, t:"43m 12s"}, {w:104, M:32, t:"1h 32m"}, {w:222, M:66, t:"2h 7m"}, {w:426, M:152, t:"2h 45m"}, {w:643, M:246, t:"3h 40m"}, {w:933, M:417, t:"4h 45m"}, {w:1301, M:660, t:"5h 56m"}, {w:1765, M:1010, t:"7h 17m"}, {w:2317, M:1481, t:"8h 44m"}, {w:3002, M:2104, t:"10h 21m"}, {w:3799, M:2615, t:"12h 3m"}, {w:4754, M:3579, t:"13h 56m"}, {w:5839, M:4325, t:"15h 54m"}, {w:7618, M:6294, t:"18h 3m"}, {w:9131, M:8116, t:"20h 17m"}, {w:36524, M:32464, t:"3D 9h"}, {w:73048, M:64928, t:"6D 18h"}, {w:146096, M:129856, t:"13D 12h"}, {w:292192, M:259712, t:"27D 1h"}, {w:584384, M:519424, t:"54D 2h"}, {w:1168768, M:1038848, t:"108D 5h"}, {w:2337536, M:2077696, t:"216D 10h"}, {w:4675072, M:4155392, t:"432D 20h"}, {w:9350144, M:8310784, t:"865D 16h"}, {w:18700288, M:16621568, t:"1731D 9h"}, {w:37400576, M:33243136, t:"3462D 19h"}, {w:74801152, M:66486272, t:"6925D 15h"}, {w:149602304, M:132972544, t:"13851D 7h"}, {w:299204608, M:265945088, t:"27702D 14h"}, {w:598409216, M:531890176, t:"55405D 5h"}, {w:1196818432, M:1063780352, t:"110810D 10h"}],,
  [{w:26, M:8, t:"18m 36s"}, {w:55, M:20, t:"33m 37s"}, {w:102, M:30, t:"52m 48s"}, {w:163, M:54, t:"1h 12m"}, {w:236, M:85, t:"1h 31m"}, {w:277, M:106, t:"1h 34m"}, {w:371, M:151, t:"1h 53m"}, {w:465, M:197, t:"2h 7m"}, {w:545, M:240, t:"2h 15m"}, {w:682, M:311, t:"2h 34m"}, {w:810, M:379, t:"2h 47m"}, {w:980, M:422, t:"3h 6m"}, {w:1037, M:460, t:"3h 2m"}, {w:1197, M:493, t:"3h 15m"}, {w:1509, M:640, t:"3h 28m"}, {w:1925, M:837, t:"3h 48m"}, {w:2352, M:1046, t:"4h 1m"}, {w:2672, M:1188, t:"4h 14m"}, {w:2883, M:1281, t:"4h 16m"}, {w:3089, M:1373, t:"4h 17m"}, {w:3305, M:1469, t:"4h 19m"}, {w:3913, M:1739, t:"4h 49m"}, {w:4233, M:1881, t:"4h 57m"}, {w:4563, M:2028, t:"5h 4m"}, {w:18252, M:8112, t:"20h 16m"}, {w:36504, M:16224, t:"1D 16h"}, {w:73008, M:32448, t:"3D 9h"}, {w:146016, M:64896, t:"6D 18h"}, {w:292032, M:129792, t:"13D 12h"}, {w:584064, M:259584, t:"27D 57m"}, {w:1168128, M:519168, t:"54D 1h"}, {w:2336256, M:1038336, t:"108D 3h"}],
  [{w:20, t:"15m 8s"}, {w:49, M:10, t:"42m"}, {w:95, M:27, t:"1h 8m"}, {w:163, M:48, t:"1h 41m"}, {w:266, M:88, t:"2h 10m"}, {w:407, M:146, t:"2h 38m"}, {w:594, M:228, t:"3h 23m"}, {w:867, M:352, t:"4h 25m"}, {w:1179, M:498, t:"5h 22m"}, {w:1559, M:686, t:"6h 26m"}, {w:2012, M:919, t:"7h 12m"}, {w:2674, M:1250, t:"8h 17m"}, {w:3343, M:1438, t:"9h 1m"}, {w:4127, M:1828, t:"9h 40m"}, {w:5021, M:2066, t:"10h 15m"}, {w:6304, M:2672, t:"11h 12m"}, {w:7533, M:3276, t:"11h 36m"}, {w:8910, M:3960, t:"11h 52m"}, {w:9833, M:4370, t:"12h 1m"}, {w:11232, M:4992, t:"12h 28m"}, {w:44928, M:19968, t:"2D 1h"}, {w:89856, M:39936, t:"4D 3h"}, {w:179712, M:79872, t:"8D 7h"}, {w:359424, M:159744, t:"16D 15h"}, {w:718848, M:319488, t:"33D 6h"}, {w:1437696, M:638976, t:"66D 13h"}, {w:2875392, M:1277952, t:"133D 2h"}, {w:5750784, M:2555904, t:"266D 5h"}, {w:11501568, M:5111808, t:"532D 11h"}, {w:23003136, M:10223616, t:"1064D 23h"}, {w:46006272, M:20447232, t:"2129D 22h"}, {w:92012544, M:40894464, t:"4259D 20h"}, {w:184025088, M:81788928, t:"8519D 16h"}, {w:368050176, M:163577856, t:"17039D 8h"}, {w:736100352, M:327155712, t:"34078D 17h"}, {w:1472200704, M:654311424, t:"68157D 10h"}, {w:2944401408, M:1308622848, t:"136314D 21h"}, {w:5888802816, M:2617245696, t:"272629D 18h"}, {w:11777605632, M:5234491392, t:"545259D 12h"}, {w:23555211264, M:10468982784, t:"1090519D 57m"}],
  #1#
];

/*
// military score contribution: 8 slingers => 1,264 == 8 * 3.95 * slinger.w
var key = { n: "name", i: "image",
  // build costs:
  p: "people", w: "wood", W: "wine", C: "crystal", S: "sulfur", b: "buildtime",
  u: "upkeep", m: "minlevel", o: "optlevel",
  // unit stats:
  a: "attack", d: "defend", s: "stamina", c: "class", v: "speed", x: "special"
};

s: 10 Slingers die against no wall or a level 3+ wall
s: 12 Swordsmen only die against level 5+ wall
s: 14 Phalanx dies against level 14+ wall
s: 12 Archer
s: 16 Rams

*/

// land units:
var troops = {
  301: {n:"Slinger",p:1,w:40,b:"12m",u:8,m:1,o:4,a:7,d:7,A:2,D:2,s:10,c:"Human",v:20},
  302: {n:"Swordsman",p:2,w:47,S:16,b:"17m",u:16,m:3,o:5,a:18,d:14,A:4,D:3,s:12,c:"Human",v:20,x:"Assault"},
  303: {n:"Phalanx",p:4,w:104,S:64,b:"40m",u:24,m:4,o:7,a:24,d:40,A:6,D:10,s:14,c:"Human",v:20,x:"Resistance"},
  307: {n:"Ram",p:8,w:198,S:128,b:"42m",u:52,m:5,o:8,a:14,d:18,A:3,D:4,s:16,c:"Machina",v:20,x:"Ram"},
  313: {n:"Archer",p:4,w:172,S:86,b:"49m",u:32,m:7,o:10,a:40,d:40,A:10,D:10,s:12,c:"Human",v:20},
  306: {n:"Catapult",p:10,w:342,S:232,b:"49m",u:72,m:10,o:14,a:36,d:28,A:9,D:7,s:16,c:"Machina",v:20,x:"Ram"},
  304: {n:"Gunsman",i:"marksman",p:7,w:355,S:154,b:"1h 23m",u:58,m:14,o:18,a:80,d:64,A:18,D:14,s:10,c:"Human",v:20},
  305: {n:"Mortar",p:12,w:1325,S:938,b:"1h 53m",u:128,m:19,o:21,a:64,d:64,A:15,D:15,s:16,c:"Machina",v:20,x:"Ram"},
  308: {n:"Steam Giant",i:"steamgiant",p:6,w:1150,S:716,b:"1h 45m",u:68,m:16,o:20,a:100,d:140,A:20,D:30,s:14,c:"Machina",v:20,x:"Resistance"},
  312: {n:"Gyrocopter",p:8,w:1250,S:670,b:"1h 2m",u:97,m:12,o:16,a:112,d:112,A:25,D:25,s:12,c:"Machina",v:20},
  309: {n:"Bombardier",p:24,w:2270,S:878,b:"2h 10m",u:228,m:22,o:24,a:200,d:165,A:45,D:35,s:14,c:"Machina",v:20,x:"Assault"},
  311: {n:"Doctor",i:"medic",p:6,w:640,C:361,b:"1h 2m",u:244,m:11,o:12,a:4,d:28,A:0,D:0,s:14,c:"Human",v:20,x:"Healer"},
  310: {n:"Cook",p:4,w:520,W:103,b:"38m",u:138,m:8,o:8,a:6,d:26,A:0,D:0,s:16,c:"Human",v:20,x:"Regeneration"}
};
for (var id in troops) troops[id].id = id;


// sea units:
var ships = {
  201: {n:"Cargo Ship",a:0,d:0,s:4,c:"Steamship",v:20,A:0,D:0},
  210: {n:"Ram-Ship",p:6,w:56,S:21,b:"34m",u:20,m:1,o:3,a:16,d:16,A:4,D:4,s:10,c:"Sailer",v:10},
  213: {n:"Ballista Ship",p:5,w:72,S:29,b:"47m",u:24,m:3,o:5,a:20,d:28,A:5,D:7,s:11,c:"Sailer",v:8,x:"Resistance"},
  211: {n:"Flamethrower",p:5,w:105,S:77,b:"1h 55m",u:45,m:5,o:7,a:40,d:40,A:10,D:10,s:12,c:"Steamship",v:8,x:"Assault"},
  214: {n:"Catapult Ship",p:10,w:173,S:76,b:"3h 11m",u:57,m:7,o:10,a:60,d:60,A:12,D:12,s:16,c:"Sailer",v:6},
  215: {n:"Mortar Ship",p:22,w:456,S:282,b:"3h 38m",u:130,m:12,o:15,a:160,d:160,A:35,D:35,s:14,c:"Steamship",v:4},
  216: {n:"Paddle Wheel Ram",i:"steamboat",p:12,w:513,S:167,b:"4h 8m",u:114,m:10,o:13,a:100,d:90,A:20,D:18,s:13,c:"Steamship",v:8,x:"Assault"},
  212: {n:"Diving Boat",i:"submarine",p:16,w:493,C:378,b:"5h 5m",u:126,m:15,o:16,a:110,d:155,A:20,D:30,s:10,c:"Steamship",v:2,x:"Resistance"}
};
for (var id in ships) ships[id].id = id;

function imageFromUnit(id, size) {
  var url = "/skin/characters/military/x40_y40/y40_", suffix = "_faceright.gif";
  if (id < 300) { // ships?
    var data = ships[id];
    url = "/skin/characters/fleet/40x40/ship_";
    suffix = "_r_40x40.gif";
  } else {
    data = troops[id];
  }
  if (!data) alert("missing unit data for id "+ id.toSource());
  var name = data.i || normalizeUnitName(data.n);
  //if (size == 40) // 40x40
  return url + name + suffix;
}

// islands (or the lack of them, to be precise):
var nonIslands = { 3:1,    8:1,   10:1,   12:1,   14:1,   21:3,  138:1,  191:12,
 236:7,  245:1,  251:1,  255:7,  284:1,  317:1,  402:10, 541:3,  599:1,  611:3,
 644:3,  651:1,  662:1,  689:2,  707:1,  709:1,  748:4,  797:2,  805:2,  914:5,
 923:8,  988:2, 1053:1, 1244:2, 1267:1, 1299:1, 1339:60,1519:2, 1756:1, 1830:2,
1848:1, 1850:1, 2011:1, 2024:4, 2062:6, 2268:1, 2357:1, 2449:9, 2459:1, 2463:1,
2471:10,2513:2, 2700:5, 2735:2, 2806:6, 2834:4, 2970:1, 3014:20,3040:1, 3104:6,
3163:4, 3187:1, 3240:6, 3331:1, 3408:2, 3472:1, 3529:7, 3778:2, 3781:2, 3791:2,
3808:2, 3870:1, 3994:1, 4102:4, 4146:1, 4188:2, 4205:19,4234:1, 4242:2, 4268:20,
4307:1, 4388:1, 4424:1, 4426:1, 4428:1, 4430:1, 4432:1, 4434:1, 4436:1, 4462:1,
4464:1, 4474:1, 4537:2, 4543:2, 4546:1, 4557:2, 4564:1, 4566:1, 4568:1, 4570:1,
4572:3, 4605:1, 4677:1, 4697:2, 4718:1, 4720:3, 4734:2, 4737:1, 4747:4, 4753:2,
4801:2, 4956:2, 4959:1, 4961:2, 4965:2, 5012:4, 5018:4, 5061:1, 5066:2, 5069:1,
5071:1, 5185:2, 5189:1, 5255:2, 5296:2, 5322:1, 5530:1, 5548:1, 5550:1, 5552:1,
5554:1, 5578:1, 5580:2, 5654:8, 5669:4, 5697:2, 5701:2, 5709:2, 5722:-5721 };

// Given only slingers, swordsmen, phalanxes, archers, rams, ram ships, ballista
// ships, flamethrowers, catapult ships, and a generals score of less than 2,000
// it should not be possible to have a navy with any of these generals scores:
var noShips = [0,   80,  158,  160,  238,  240,  316,  318,  320,  396,  398,
 400,  464,  474,  476,  478,  480,  544,  554,  556,  558,  560,  608,  622,
 624,  634,  636,  638,  640,  688,  702,  704,  718,  720,  766,  768,  782,
 798,  800,  862,  878,  880,  924,  958,  960];

/*

hideout ?view=safehouse&id=51713&position=3
spy orders url for city :
http://s9.ikariam.org/index.php?
view=safehouseMissions&id=51713&position=3&spy=20190

*/
