const viewport = document.getElementById("viewport");
const mapContainer = document.getElementById("mapContainer");

let isPanning = false;
let startX = 0, startY = 0;
let translateX = 0, translateY = 0;
let scale = 1;

/* ---------- ZOOM & PAN ---------- */
function updateTransform() {
    mapContainer.style.transform =
        `translate(${translateX}px, ${translateY}px) scale(${scale})`;}

viewport.addEventListener("mousedown", e => {
    isPanning = true;
    viewport.style.cursor = "grabbing";
    startX = e.clientX - translateX;
    startY = e.clientY - translateY;});

viewport.addEventListener("mousemove", e => {
    if (!isPanning) return;
    translateX = e.clientX - startX;
    translateY = e.clientY - startY;
    updateTransform();});

["mouseup", "mouseleave"].forEach(evt => {
    viewport.addEventListener(evt, () => {
        isPanning = false;
        viewport.style.cursor = "grab";
    });
});

viewport.addEventListener("wheel", e => {
    e.preventDefault();
    const oldScale = scale;
    scale += e.deltaY < 0 ? 0.1 : -0.1;
    scale = Math.max(0.3, scale);

    const rect = viewport.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - translateX;
    const offsetY = e.clientY - rect.top - translateY;

    translateX -= (offsetX / oldScale) * (scale - oldScale);
    translateY -= (offsetY / oldScale) * (scale - oldScale);

    updateTransform();
});

/* ---------- MARCADORES ---------- */
const benchMarkers = [
    { x: 2016, y: 629, name: "Bench - Dirtmouth" },
    { x: 2053, y: 835, name: "Bench - Encruzilhada Esquecida" },
    { x: 2163, y: 915, name: "Bench - Encruzilhada Esquecida" },
    { x: 2350, y: 906, name: "Bench - Encruzilhada Esquecida" },
    { x: 2685, y: 1015, name: "Bench - Encruzilhada Esquecida" },
    { x: 1407, y: 390, name: "Bench - Penhascos Uivantes" },
    { x: 1441, y: 741, name: "Bench - Caminho Verde" },
    { x: 582, y: 768, name: "Bench - Caminho Verde" },
    { x: 479, y: 950, name: "Bench - Caminho Verde" },
    { x: 910, y: 771, name: "Bench - Caminho Verde" },
    { x: 1441, y: 741, name: "Bench - Caminho Verde" },
    { x: 1091, y: 860, name: "Bench - Caminho Verde" },
    { x: 1556, y: 1007, name: "Bench - Caminho Verde" },
    { x: 2113, y: 1186, name: "Bench - Ermos Fúngicos" },
    { x: 2113, y: 1752, name: "Bench - Ermos Fúngicos" },
    { x: 1991, y: 1729, name: "Bench - Ermos Fúngicos" },
    { x: 1497, y: 1456, name: "Bench - Estação da Rainha" },
    { x: 1600, y: 1230, name: "Bench - Cânion da Névoa" },
    { x: 1144, y: 1320, name: "Bench - Jardins da Rainha" },
    { x: 858, y: 1367, name: "Bench - Jardins Fúngicosda Rainha" },
    { x: 715, y: 1477, name: "Bench - Jardins da Rainha" },
    { x: 1337, y: 1724, name: "Bench - Ninho Profundo" },
    { x: 1419, y: 2078, name: "Bench - Ninho Profundo" },
    { x: 326, y: 1862, name: "Bench - Ninho Profundo" },
    { x: 2857, y: 524, name: "Bench - Pico de Cristal" },
    { x: 2891, y: 855, name: "Bench - Pico de Cristal" },
    { x: 2452, y: 1266, name: "Bench - Cidade das Lágrimas" },
    { x: 2685, y: 1402, name: "Bench - Cidade das Lágrimas" },
    { x: 2888, y: 1549, name: "Bench - Cidade das Lágrimas" },
    { x: 2483, y: 1583, name: "Bench - Cidade das Lágrimas" },
    { x: 3277, y: 1369, name: "Bench - Cidade das Lágrimas" },
    { x: 3479, y: 1674, name: "Bench - Cidade das Lágrimas" },
    { x: 3520, y: 860, name: "Bench - Terra do Descanso" },
    { x: 3680, y: 949, name: "Bench - Terra do Descanso" },
    { x: 3660, y: 1280, name: "Bench - Borda do Reino" },
    { x: 4027, y: 1582, name: "Bench - Borda do Reino" },
    { x: 4306, y: 1843, name: "Bench - Borda do Reino" },
    { x: 3611, y: 2118, name: "Bench - Colmeia" },
    { x: 2584, y: 1854, name: "Bench - Hidrovia Real" },
    { x: 2120, y: 1972, name: "Bench - Hidrovia Real" },
    { x: 2629, y: 2255, name: "Bench - Bacia Antiga" },
    { x: 3201, y: 2233, name: "Bench - Bacia Antiga" }
];

const transportMarkers = [
    {x: 2030, y: 629, name: "Transport - Dirtmouth"},
    {x: 1220, y: 310, name: "Transport - Penhascos Uivantes (Ninho dos Besouros)"},
    {x: 2329, y: 906, name: "Transport - Encruzilhada Esquecida"},
    {x: 891, y: 775, name: "Transport - Caminho Verde"},
    {x: 1460, y: 1460, name: "Transport - Ermos  (Estação da Rainha) "},
    {x: 2471, y: 1263, name: "Transport - Cidade das Lágrimas (Armazéns da Cidade)"},
    {x: 3491, y: 1725, name: "Transport - Cidade das Lágrimas (Estação do Rei)"},
    {x: 465, y: 1807, name: "Transport - Ninho Profundo (Aldeia Distante)"},
    {x: 830, y: 1367, name: "Transport - Jardins da Rainha"},
    {x: 3548, y: 863, name: "Transport - Terra do Descanso"},
    {x: 3221, y: 2236, name: "Transport - Campos do Palácio (Estação Escondida)"}
];

const shopMarkers = [
    {x: 1987, y: 629, name: "Loja - Sly"},
    {x: 2030, y: 629, name: "Loja - Dirtmouth"},
    {x: 2685, y: 1015, name: "Loja - Encruzilhada Esquecida"},
    {x: 2112, y: 1186, name: "Loja - Ermos Fúngicos"},
    {x: 2740, y: 1681, name: "Loja - Cidade das Lágrimas"}
];

const SpringstMarkers = [
    {x: 2141, y: 918, name: "Springs - Dirtmouth"},
    {x: 3187, y: 1671, name: "Springs - Cidade das lagrimas"},
    {x: 1417, y: 2075, name: "Springs - Ninho Profundo"}
];

const maskMarkers = [
    {x: 1987, y: 629, name: "Mascara (4) - Dirtmouth"},
    {x: 2040, y: 629, name: "Mascara (1) - Dirtmouth"},
    {x: 1900, y: 710, name: "Mascara (1) - Encruzilhada Esquecida"},
    {x: 2030, y: 629, name: "Mascara (1) - Encruzilhada Esquecida"},
    {x: 1945, y: 876, name: "Mascara (1) - Encruzilhada Esquecida"},
    {x: 2118, y: 940, name: "Mascara (1) - Encruzilhada Esquecida"},
    {x: 2835, y: 483, name: "Mascara (1) - Pico de Cristal"},
    {x: 1667, y: 1037, name: "Mascara (1) - Caminho Verde"},
    {x: 1640, y: 1410, name: "Mascara (1) - Estação da Rainha"},
    {x: 1700, y: 1831, name: "Mascara (1) - Ermos Fúngicos"},
    {x: 2160, y: 1817, name: "Mascara (1) - Hidrovia Real"},
    {x: 3813, y: 1970, name: "Mascara (1) - Colmeia"},
    {x: 3419, y: 813, name: "Mascara (1) - Terra do Descanso"}
];

const soulMarkers = [
    {x: 2030, y: 629, name: "Alma - Dirtmouth"},
    {x: 1987, y: 629, name: "Alma - Dirtmouth"},
    {x: 2088, y: 984, name: "Alma - Encruzilhada Esquecida"},
    {x: 1010, y: 1060, name: "Alma - Dirtmouth"},
    {x: 1847, y: 1973, name: "Alma - Ninho Prufundo"},
    {x: 2794, y: 2131, name: "Alma - Bacia Antiga"},
    {x: 2683, y: 1395, name: "Alma - Cidade das Lagrimas"},
    {x: 1407, y: 390, name: "Alma - Pinhascos uivantes"},
    {x: 3419, y: 813, name: "Alma - Terra do Descanso"}
];

const paloreMarkers = [
    {x: 1900, y: 710, name: "Minerio Pálido - Dirtmouth"},
    {x: 3120, y: 95, name: "Minerio Pálido - Pico de cristal"},
    {x: 1548, y: 2131, name: "Minerio Pálidosport - Ninho Profundo"},
    {x: 2352, y: 2125, name: "Minerio Pálido - Terra do Descanso"},
    {x: 3712, y: 1269, name: "Minerio Pálido - Colizeu dos Tolos"}
];

const BossMarkers = [
    {x: 2141, y: 843, name: "Chefe - Falso cavaleiro"},
    {x: 2141, y: 810, name: "Chefe - Falso cavaleiro(Sonho)"},
    {x: 2233, y: 706, name: "Chefe - Hollow Knight"},
    {x: 2587, y: 985, name: "Chefe - Mãe Mosca"},
    {x: 1925, y: 875, name: "Chefe - Mawlek"},
    {x: 810, y: 727, name: "Chefe - Hornet"},
    {x: 4310, y: 1698, name: "Chefe - Hornet"},
    {x: 735, y: 1153, name: "Chefe - Lorde Traidor"},
    {x: 1440, y: 2128, name: "Chefe - Nosk"},
    {x: 992, y: 1859, name: "Chefe - Gailen(Espirito)"},
    {x: 1860, y: 1855, name: "Chefe - Lordes Louva-a-deus"},
    {x: 2639, y: 1219, name: "Chefe - Mestren das Almas"},
    {x: 2639, y: 1219, name: "Chefe - Mestren das Almas(Sonho)"},
    {x: 3000, y: 1390, name: "Chefe - sentinelas"},
    {x: 2938, y: 1804, name: "Chefe - Defensor do Esterco"},
    {x: 2955, y: 1847, name: "Chefe - Defensor do Branco(Sonho)"},
    {x: 2433, y: 1940, name: "Chefe - Mãe Fluk"},
    {x: 2100, y: 2249, name: "Chefe - reseptaclo quebrado"},
    {x: 2100, y: 2249, name: "Chefe - Irmão Perdido(sonho)"},
    {x: 4070, y: 1953, name: "Chefe - Gardeão da colmeia"},
    {x: 4100, y: 1778, name: "Chefe - Markoth"},
    {x: 3618, y: 1548, name: "Chefe - Colecionador"},
    {x: 4972, y: 1335, name: "Chefe - Pale lurker"},
    {x: 3191, y: 929, name: "Chefe - Xero(Espirito)"},
    {x: 2861, y: 521, name: "Chefe - Guardião de criastal"},
    {x: 2872, y: 481, name: "Chefe - Guardião de criastal(2ª fase)"},
    {x: 2064, y: 631, name: "Chefe - Zote(Sonho)"},
    {x: 1883, y: 631, name: "Chefe - Grim"},
    {x: 1883, y: 631, name: "Chefe - Grim rei dos Pesadelos (sonho)"}
];

const Warriors_Grave_Marker = [
    {x: 720, y: 1366, name: "espirito - Marmu"},
    {x: 1670, y: 1036, name: "espirito - Sem olhos"},
    {x: 3507, y: 819, name: "espirito - revek"},
    {x: 1316, y: 336, name: "espirito - Gorb"},
    {x: 2251, y: 1352, name: "espirito - Velho HU"}
];

const BlodlifeMarkers = [
  { "x": 1350, "y": 150, "name": "Lifeblood" },
  { "x": 350,  "y": 350, "name": "Lifeblood" },
  { "x": 1400, "y": 450, "name": "Lifeblood" },
  { "x": 1000, "y": 550, "name": "Lifeblood" },
  { "x": 300,  "y": 750, "name": "Lifeblood" },
  { "x": 750,  "y": 820, "name": "Lifeblood" },
  { "x": 1250, "y": 780, "name": "Lifeblood" }
];

const charmMarkers = [
    // Dirtmouth e Forgotten Crossroads
    {x: 2030, y: 629, name: "Wayward Compass - Dirtmouth (Iselda's Shop)"},
    {x: 2030, y: 629, name: "Gathering Swarm - Dirtmouth (Sly's Shop)"},
    {x: 2112, y: 1186, name: "Stalwart Shell - Salubra (Forgotten Crossroads)"},
    {x: 2112, y: 1186, name: "Shaman Stone - Salubra (Forgotten Crossroads)"},
    {x: 2350, y: 906, name: "Soul Catcher - Ancestral Mound"},
    {x: 2141, y: 940, name: "Glowing Womb - Forgotten Crossroads"},
    {x: 810, y: 727, name: "Thorns of Agony - Greenpath"},
    {x: 1091, y: 860, name: "Dashmaster - Greenpath"},
    {x: 1100, y: 1200, name: "Shape of Unn - Lake of Unn (Greenpath)"},
    {x: 2112, y: 1186, name: "Sprintmaster - Sly (After Shopkeeper's Key)"},
    {x: 2113, y: 1752, name: "Spore Shroom - Fungal Wastes"},
    {x: 2160, y: 1450, name: "Leg Eater - Fragile Greed/Heart/Strength"},
    {x: 2452, y: 1266, name: "Steady Body - City of Tears"},
    {x: 2685, y: 1402, name: "Heavy Blow - Lemm's Shop (City)"},
    {x: 2888, y: 1549, name: "Quick Slash - Kingdom's Edge"},
    {x: 2740, y: 1681, name: "Spell Twister - Soul Sanctum"},
    {x: 3277, y: 1369, name: "Defender's Crest - Waterways"},
    {x: 1144, y: 1320, name: "Mark of Pride - Queen's Gardens"},
    {x: 715, y: 1477, name: "Sprintmaster - Queen's Gardens"},
    {x: 2857, y: 524, name: "Soul Eater - Resting Grounds"},
    {x: 2891, y: 855, name: "Deep Focus - Crystal Peak"},
    {x: 2835, y: 483, name: "Grubsong - Grubfather (10 Grubs)"},
    {x: 1337, y: 1724, name: "Sharp Shadow - Deepnest"},
    {x: 1419, y: 2078, name: "Weaversong - Deepnest"},
    {x: 1407, y: 390, name: "Joni's Blessing - Howling Cliffs"},
    {x: 3660, y: 1280, name: "Sharp Shadow - Kingdom's Edge"},
    {x: 4027, y: 1582, name: "Longnail - Forgotten Crossroads Shop"},
    {x: 3611, y: 2118, name: "Hiveblood - The Hive"},
    {x: 2629, y: 2255, name: "Quick Focus - Salubra"},
    {x: 3201, y: 2233, name: "Kingsoul - White Palace"}
];

const abilityMarkers = [
    {x: 810, y: 727, name: "Mothwing Cloak (Dash) - Greenpath (Hornet Boss)"},
    {x: 1091, y: 860, name: "Mantis Claw (Wall Climb) - Mantis Village"},
    {x: 2891, y: 855, name: "Crystal Heart (Super Dash) - Crystal Peak"},
    {x: 2629, y: 2255, name: "Monarch Wings (Double Jump) - Ancient Basin"},
    {x: 1600, y: 1230, name: "Isma's Tear (Acid Protection) - Royal Waterways"},
    {x: 3660, y: 1280, name: "Shade Cloak (Shadow Dash) - The Abyss"},
    {x: 3548, y: 863, name: "Dream Nail - Resting Grounds (Seer)"},
    {x: 3548, y: 863, name: "Awoken Dream Nail - Resting Grounds (1800 Essence)"},
    {x: 3548, y: 863, name: "Dreamgate - Resting Grounds (900 Essence)"}
];

const nailArtMarkers = [
    {x: 1407, y: 390, name: "Dash Slash - Nailmaster Oro (Howling Cliffs)"},
    {x: 2857, y: 524, name: "Great Slash - Nailmaster Sheo (Greenpath)"},
    {x: 3520, y: 860, name: "Cyclone Slash - Nailmaster Mato (Resting Grounds)"}
];

const keyMarkers = [
    {x: 2163, y: 915, name: "Simple Key - Sly's Shop (950 Geo)"},
    {x: 2857, y: 524, name: "Simple Key - Crystal Peak"},
    {x: 1337, y: 1724, name: "Simple Key - Ancient Basin"},
    {x: 3611, y: 2118, name: "Simple Key - Colosseum of Fools"},
    {x: 2030, y: 629, name: "Shopkeeper's Key - Crystal Peak"},
    {x: 1144, y: 1320, name: "Love Key - Queen's Gardens"},
    {x: 2685, y: 1402, name: "Elegant Key - Sly's Shop (800 Geo)"},
    {x: 3201, y: 2233, name: "King's Brand - Kingdom's Edge (Hornet 2)"},
    {x: 326, y: 1862, name: "Tram Pass - Deepnest (Failed Tramway)"},
    {x: 2888, y: 1549, name: "City Crest - Dung Defender"}
];

const relicMarkers = [
    {x: 2891, y: 855, name: "Hallownest Seal - Crystal Peak"},
    {x: 3680, y: 949, name: "King's Idol - City of Tears"},
    {x: 1337, y: 1724, name: "Wanderer's Journal - Deepnest"},
    {x: 2350, y: 906, name: "Arcane Egg - Lifeblood Core Room"},
    {x: 2112, y: 1186, name: "Hallownest Seal - Fungal Wastes"},
    {x: 3520, y: 860, name: "King's Idol - Resting Grounds"},
    {x: 1600, y: 1230, name: "Wanderer's Journal - Royal Waterways"},
    {x: 810, y: 727, name: "Arcane Egg - Greenpath"}
];

const grubMarkers = [
    // Forgotten Crossroads (5)
    {x: 2030, y: 800, name: "Grub #1 - Forgotten Crossroads (Grubfather's Home)"},
    {x: 2330, y: 880, name: "Grub #2 - Forgotten Crossroads (Below False Knight)"},
    {x: 2141, y: 940, name: "Grub #3 - Forgotten Crossroads (Central East)"},
    {x: 2685, y: 1015, name: "Grub #4 - Forgotten Crossroads (Far East)"},
    {x: 2400, y: 850, name: "Grub #5 - Forgotten Crossroads (Myla's Area)"},
    
    // Greenpath (4)
    {x: 810, y: 750, name: "Grub #6 - Greenpath (Behind Moss Knight Gate)"},
    {x: 600, y: 780, name: "Grub #7 - Greenpath (West Area)"},
    {x: 1050, y: 880, name: "Grub #8 - Greenpath (Near Mantis Claw)"},
    {x: 1500, y: 1000, name: "Grub #9 - Greenpath (Hidden Acid Room)"},
    
    // Fungal Wastes (2)
    {x: 2100, y: 1200, name: "Grub #10 - Fungal Wastes (Northwest Spore Shroom Area)"},
    {x: 2150, y: 1750, name: "Grub #11 - Fungal Wastes (Deep South)"},
    
    // Fog Canyon (1)
    {x: 1550, y: 1250, name: "Grub #12 - Fog Canyon (Requires Isma's Tear)"},
    
    // Queen's Gardens (3)
    {x: 1144, y: 1350, name: "Grub #13 - Queen's Gardens (Main Area)"},
    {x: 850, y: 1380, name: "Grub #14 - Queen's Gardens (Fungal Wastes Connection)"},
    {x: 750, y: 1480, name: "Grub #15 - Queen's Gardens (West Side)"},
    
    // Deepnest (5)
    {x: 1350, y: 1750, name: "Grub #16 - Deepnest (Main Cavern)"},
    {x: 1450, y: 2080, name: "Grub #17 - Deepnest (Beast's Den)"},
    {x: 350, y: 1850, name: "Grub #18 - Deepnest (Distant Village)"},
    {x: 1700, y: 1850, name: "Grub #19 - Deepnest (Hidden Near Mantis Lords)"},
    {x: 1500, y: 1900, name: "Grub #20 - Deepnest (Tram Area)"},
    
    // Ancient Basin (1)
    {x: 2650, y: 2250, name: "Grub #21 - Ancient Basin (Near Monarch Wings)"},
    
    // Kingdom's Edge (7)
    {x: 3700, y: 1300, name: "Grub #22 - Kingdom's Edge (Main Path)"},
    {x: 4050, y: 1600, name: "Grub #23 - Kingdom's Edge (Pale Ore Area)"},
    {x: 4300, y: 1850, name: "Grub #24 - Kingdom's Edge (Near Colosseum)"},
    {x: 3650, y: 970, name: "Grub #25 - Kingdom's Edge (Camp)"},
    {x: 3900, y: 1450, name: "Grub #26 - Kingdom's Edge (Hidden Passage)"},
    {x: 4150, y: 1620, name: "Grub #27 - Kingdom's Edge (Upper Peak)"},
    {x: 3800, y: 1350, name: "Grub #28 - Kingdom's Edge (Middle Section)"},
    
    // City of Tears (5)
    {x: 2450, y: 1280, name: "Grub #29 - City of Tears (West Storage)"},
    {x: 2700, y: 1420, name: "Grub #30 - City of Tears (Central Plaza)"},
    {x: 2900, y: 1560, name: "Grub #31 - City of Tears (Eastern Area)"},
    {x: 3280, y: 1380, name: "Grub #32 - City of Tears (King's Station)"},
    {x: 3500, y: 1680, name: "Grub #33 - City of Tears (Pleasure House)"},
    
    // Royal Waterways (2)
    {x: 2600, y: 1860, name: "Grub #34 - Royal Waterways (Western Section)"},
    {x: 2150, y: 1980, name: "Grub #35 - Royal Waterways (Near Isma's Tear)"},
    
    // Crystal Peak (6)
    {x: 2870, y: 540, name: "Grub #36 - Crystal Peak (Main Shaft)"},
    {x: 2900, y: 870, name: "Grub #37 - Crystal Peak (Crystallized Mound)"},
    {x: 2850, y: 500, name: "Grub #38 - Crystal Peak (High Peak)"},
    {x: 3000, y: 670, name: "Grub #39 - Crystal Peak (Eastern Mines)"},
    {x: 2750, y: 720, name: "Grub #40 - Crystal Peak (Northwest Chamber)"},
    {x: 2950, y: 820, name: "Grub #41 - Crystal Peak (Hidden Cave)"},
    
    // Resting Grounds (1)
    {x: 3530, y: 880, name: "Grub #42 - Resting Grounds (Near Dreamers Memorial)"},
    
    // Howling Cliffs (2)
    {x: 1420, y: 410, name: "Grub #43 - Howling Cliffs (Oro's Hut Area)"},
    {x: 1230, y: 330, name: "Grub #44 - Howling Cliffs (Stag Nest)"},
    
    // The Hive (1)
    {x: 3650, y: 2130, name: "Grub #45 - The Hive (Main Chamber)"},
    
    // Tower of Love (1)
    {x: 3620, y: 1560, name: "Grub #46 - Tower of Love (The Collector's Room)"}
];

// Marcadores para Mapa 2 (Silksong) - Baseados no mapa oficial

const ss_redToolMarkers = [
    {x: 500, y: 300, name: "Mosca Mecânica"},
    {x: 520, y: 320, name: "Roda Mecânica"},
    {x: 540, y: 340, name: "Corta-concha"},
    {x: 560, y: 360, name: "Curvagarra ou Curvafoice"},
    {x: 580, y: 380, name: "Broca do Cavador"},
    {x: 600, y: 400, name: "Cerveja de Pulga"},
    {x: 620, y: 420, name: "Placa Ígnea"},
    {x: 640, y: 440, name: "Pinolongo"},
    {x: 660, y: 460, name: "Almofapino"},
    {x: 680, y: 480, name: "Frasco de Plásmio"},
    {x: 700, y: 500, name: "Canhão de Rosários"},
    {x: 720, y: 520, name: "Tiro de Seda"},
    {x: 740, y: 540, name: "Fragmento de Ferrão"},
    {x: 760, y: 560, name: "Pino Reto"},
    {x: 780, y: 580, name: "Tachinhas"},
    {x: 800, y: 600, name: "Pino Tríplice"},
    {x: 820, y: 620, name: "Anel de Arremesso"},
    {x: 840, y: 640, name: "Orbevolts"}
];

const ss_blueToolMarkers = [
    {x: 600, y: 400, name: "Espelho de Garra ou Espelhos de Garra"},
    {x: 620, y: 420, name: "Olho do Druida ou Olhos do Druida"},
    {x: 640, y: 440, name: "Ovo de Pulgalia"},
    {x: 660, y: 460, name: "Máscara Fraturada"},
    {x: 680, y: 480, name: "Conjunto Injetor"},
    {x: 700, y: 500, name: "Garralonga"},
    {x: 720, y: 520, name: "Sino de Magma"},
    {x: 740, y: 540, name: "Cristal da Memória"},
    {x: 760, y: 560, name: "Multivinculador"},
    {x: 780, y: 580, name: "Emblema de Pino"},
    {x: 800, y: 600, name: "Bolsa de Pólipo"},
    {x: 820, y: 620, name: "Sela Rápida"},
    {x: 840, y: 640, name: "Vínculo Reserva"},
    {x: 860, y: 660, name: "Bainha Serrilhada"},
    {x: 880, y: 680, name: "Catassaque"},
    {x: 900, y: 700, name: "Extensor de Carretel"},
    {x: 920, y: 720, name: "Filamento Voltaico"},
    {x: 940, y: 740, name: "Sino Protetor"},
    {x: 960, y: 760, name: "Teceleve"},
    {x: 980, y: 780, name: "Lanterna de Lumefogo"},
    {x: 1000, y: 800, name: "Guirlanda de Pureza"}
];

const ss_yellowToolMarkers = [
    {x: 700, y: 500, name: "Empunhadura de Subida"},
    {x: 720, y: 520, name: "Bracelete Farpado"},
    {x: 740, y: 540, name: "Bússola"},
    {x: 760, y: 560, name: "Bolsa do Inseto Morto ou Mochila de Carapaça"},
    {x: 780, y: 580, name: "Broche de Magnetita"},
    {x: 800, y: 600, name: "Dados de Magnetita"},
    {x: 820, y: 620, name: "Braçaranha"},
    {x: 840, y: 640, name: "Pingente de Fragmento"},
    {x: 860, y: 660, name: "Tornozeleiras Sedavelozes"},
    {x: 880, y: 680, name: "Cordões de Aranha"},
    {x: 900, y: 700, name: "Marca do Ladrão"},
    {x: 920, y: 720, name: "Cinto Pesado"}
];

const ss_abilityMarkers = [
    {x: 500, y: 300, name: "Ponto Cruz"},
    {x: 550, y: 350, name: "Ferrões Pálidos"},
    {x: 600, y: 400, name: "Fúria de Runas"},
    {x: 650, y: 450, name: "Dardo Afiado"},
    {x: 700, y: 500, name: "Lança de Seda"},
    {x: 750, y: 550, name: "Turbilhão de Fios"}
];

const ss_crestMarkers = [
    {x: 550, y: 350, name: "Garra de Seda"},
    {x: 600, y: 400, name: "Garra Aderente"},
    {x: 650, y: 450, name: "Agulino"},
    {x: 700, y: 500, name: "Impulso de Seda"},
    {x: 750, y: 550, name: "Passo Veloz"}
];

const ss_bellWayMarkers = [
    {x: 600, y: 400, name: "Bell Way 1"},
    {x: 700, y: 500, name: "Bell Way 2"},
    {x: 800, y: 600, name: "Bell Way 3"},
    {x: 900, y: 700, name: "Bell Way 4"}
];

const ss_memoryLocketMarkers = [
    {x: 650, y: 450, name: "Memory Locket 1"},
    {x: 750, y: 550, name: "Memory Locket 2"},
    {x: 850, y: 650, name: "Memory Locket 3"}
];

const ss_spoolFragmentMarkers = [
    {x: 500, y: 300, name: "Fragmento de Carretel 1"},
    {x: 520, y: 320, name: "Fragmento de Carretel 2"},
    {x: 540, y: 340, name: "Fragmento de Carretel 3"},
    {x: 560, y: 360, name: "Fragmento de Carretel 4"},
    {x: 580, y: 380, name: "Fragmento de Carretel 5"},
    {x: 600, y: 400, name: "Fragmento de Carretel 6"},
    {x: 620, y: 420, name: "Fragmento de Carretel 7"},
    {x: 640, y: 440, name: "Fragmento de Carretel 8"},
    {x: 660, y: 460, name: "Fragmento de Carretel 9"},
    {x: 680, y: 480, name: "Fragmento de Carretel 10"},
    {x: 700, y: 500, name: "Fragmento de Carretel 11"},
    {x: 720, y: 520, name: "Fragmento de Carretel 12"},
    {x: 740, y: 540, name: "Fragmento de Carretel 13"},
    {x: 760, y: 560, name: "Fragmento de Carretel 14"},
    {x: 780, y: 580, name: "Fragmento de Carretel 15"},
    {x: 800, y: 600, name: "Fragmento de Carretel 16"},
    {x: 820, y: 620, name: "Fragmento de Carretel 17"},
    {x: 840, y: 640, name: "Fragmento de Carretel 18"}
];

const ss_lostFleaMarkers = [
    {x: 750, y: 550, name: "Lost Flea 1"},
    {x: 800, y: 600, name: "Lost Flea 2"},
    {x: 850, y: 650, name: "Lost Flea 3"}
];

const ss_shardBundleMarkers = [
    {x: 500, y: 300, name: "Fragmento de Máscara 1"},
    {x: 520, y: 320, name: "Fragmento de Máscara 2"},
    {x: 540, y: 340, name: "Fragmento de Máscara 3"},
    {x: 560, y: 360, name: "Fragmento de Máscara 4"},
    {x: 580, y: 380, name: "Fragmento de Máscara 5"},
    {x: 600, y: 400, name: "Fragmento de Máscara 6"},
    {x: 620, y: 420, name: "Fragmento de Máscara 7"},
    {x: 640, y: 440, name: "Fragmento de Máscara 8"},
    {x: 660, y: 460, name: "Fragmento de Máscara 9"},
    {x: 680, y: 480, name: "Fragmento de Máscara 10"},
    {x: 700, y: 500, name: "Fragmento de Máscara 11"},
    {x: 720, y: 520, name: "Fragmento de Máscara 12"},
    {x: 740, y: 540, name: "Fragmento de Máscara 13"},
    {x: 760, y: 560, name: "Fragmento de Máscara 14"},
    {x: 780, y: 580, name: "Fragmento de Máscara 15"},
    {x: 800, y: 600, name: "Fragmento de Máscara 16"},
    {x: 820, y: 620, name: "Fragmento de Máscara 17"},
    {x: 840, y: 640, name: "Fragmento de Máscara 18"},
    {x: 860, y: 660, name: "Fragmento de Máscara 19"},
    {x: 880, y: 680, name: "Fragmento de Máscara 20"}
];

const ss_bossMarkers = [
    {x: 850, y: 650, name: "Boss 1"},
    {x: 900, y: 700, name: "Boss 2"},
    {x: 950, y: 750, name: "Boss 3"}
];

const ss_shopMarkers = [
    {x: 750, y: 550, name: "Loja 1"},
    {x: 850, y: 650, name: "Loja 2"},
    {x: 950, y: 750, name: "Loja 3"}
];

const ss_benchMarkers = [
    {x: 600, y: 400, name: "Banco 1"},
    {x: 700, y: 500, name: "Banco 2"},
    {x: 800, y: 600, name: "Banco 3"}
];

function criarMarcadores(lista, layerId, classe) {
    const layer = document.getElementById(layerId);
    

    lista.forEach(item => {
        const marker = document.createElement("div");
        marker.className = `marker ${classe}`;
        marker.style.left = item.x + "px";
        marker.style.top = item.y + "px";
        marker.title = item.name;

        marker.addEventListener("click", e => {
            e.stopPropagation();
            alert(item.name);});

        layer.appendChild(marker);});
}

criarMarcadores(benchMarkers, "bench_Layer", "bench");
criarMarcadores(transportMarkers, "transport_Layer", "transport");
criarMarcadores(SpringstMarkers, "Springs_Layer", "Springs");
criarMarcadores(shopMarkers, "shop_Layer", "shop");
criarMarcadores(soulMarkers, "soul_Layer", "soul");
criarMarcadores(maskMarkers, "mask_Layer", "Mask");
criarMarcadores(BossMarkers, "Boss_Layer", "Boss");
criarMarcadores(paloreMarkers, "palore_Layer", "palore");
criarMarcadores(BlodlifeMarkers, "vital_Layer", "Blodlife");
criarMarcadores(Warriors_Grave_Marker, "Warriors_Grave_Layer", "Warriors_Grave");
criarMarcadores(charmMarkers, "charm_Layer", "charm");
criarMarcadores(abilityMarkers, "ability_Layer", "ability");
criarMarcadores(nailArtMarkers, "nail_art_Layer", "nail_art");
criarMarcadores(keyMarkers, "key_Layer", "key");
criarMarcadores(relicMarkers, "relic_Layer", "relic");
criarMarcadores(grubMarkers, "grub_Layer", "grub");

// Marcadores Mapa 2 (Silksong)
criarMarcadores(ss_redToolMarkers, "ss_red_tool_Layer", "ss_tool");
criarMarcadores(ss_blueToolMarkers, "ss_blue_tool_Layer", "ss_tool");
criarMarcadores(ss_yellowToolMarkers, "ss_yellow_tool_Layer", "ss_tool");
criarMarcadores(ss_abilityMarkers, "ss_ability_Layer", "ss_ability");
criarMarcadores(ss_crestMarkers, "ss_crest_Layer", "ss_crest");
criarMarcadores(ss_bellWayMarkers, "ss_bell_way_Layer", "ss_bell");
criarMarcadores(ss_memoryLocketMarkers, "ss_memory_locket_Layer", "ss_memory");
criarMarcadores(ss_spoolFragmentMarkers, "ss_spool_fragment_Layer", "ss_spool");
criarMarcadores(ss_lostFleaMarkers, "ss_lost_flea_Layer", "ss_flea");
criarMarcadores(ss_wishMarkers, "ss_wish_Layer", "ss_wish");
criarMarcadores(ss_craftmetalMarkers, "ss_craftmetal_Layer", "ss_craft");
criarMarcadores(ss_shopMarkers, "ss_shop_Layer", "ss_shop");
criarMarcadores(ss_bossMarkers, "ss_boss_Layer", "ss_boss");
criarMarcadores(ss_benchMarkers, "ss_bench_Layer", "bench");

/* ---------- TOGGLE ---------- */
function toggleLayer(id, element) {
    const layer = document.getElementById(id);
    
    // Verificar se a camada existe
    if (!layer) {
        console.error(`Layer não encontrada: ${id}`);
        return;
    }
    
    const isVisible = layer.style.display !== "none";
    
    // Toggle layer visibility
    layer.style.display = isVisible ? "none" : "block";
    
    // Toggle active class on button
    if (element) {
        if (isVisible) {
            element.classList.remove("active");
        } else {
            element.classList.add("active");
        }
    }
    
    // Debug: mostrar no console
    console.log(`Layer ${id}: ${isVisible ? 'escondida' : 'visível'}`);
}

/* ---------- TOGGLE MENU ---------- */
let menuVisible = false; // Menu começa escondido

function toggleMenu() {
    const sidePanel = document.getElementById("sidePanel");
    
    menuVisible = !menuVisible;
    
    if (menuVisible) {
        sidePanel.classList.remove("hidden");
    } else {
        sidePanel.classList.add("hidden");
    }
}

//Troca entre mapas 
const btnChangeMap = document.getElementById("btnChangeMap");
const baseMap = document.getElementById("baseMap");
const map1Panel = document.getElementById("map1-panel");
const map2Panel = document.getElementById("map2-panel");

let mapaAtual = 1;

btnChangeMap.addEventListener("click", () => {
    if (mapaAtual === 1) {
        // Mudar para Silksong
        baseMap.src = "img/Silksong_Map.png";
        mapaAtual = 2;
        
        // Trocar painéis
        map1Panel.style.display = "none";
        map2Panel.style.display = "block";
        
        // Esconder camadas do mapa 1
        document.querySelectorAll('.map1-layer').forEach(layer => {
            layer.style.display = "none";
        });
        
        // Remover classe active de todos os botões do mapa 1
        map1Panel.querySelectorAll('.map-item').forEach(item => {
            item.classList.remove('active');
        });
        
    } else {
        // Voltar para Hollow Knight
        baseMap.src = "img/mapa.png";
        mapaAtual = 1;
        
        // Trocar painéis
        map2Panel.style.display = "none";
        map1Panel.style.display = "block";
        
        // Esconder camadas do mapa 2
        document.querySelectorAll('.map2-layer').forEach(layer => {
            layer.style.display = "none";
        });
        
        // Remover classe active de todos os botões do mapa 2
        map2Panel.querySelectorAll('.map-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Esconder camadas do mapa 1
        document.querySelectorAll('.map1-layer').forEach(layer => {
            layer.style.display = "none";
        });
        
        // Remover classe active de todos os botões do mapa 1
        map1Panel.querySelectorAll('.map-item').forEach(item => {
            item.classList.remove('active');
        });
    }
});
