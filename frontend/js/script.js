window.ESHOPIA_API_URL = window.ESHOPIA_API_URL || "https://eshopia-backend.onrender.com/api";
'use strict';
/* ============================================================
   E-SHOPIA MAROC — script.js v6
   Architecture: clean store-only (no admin/agent/affiliate dashboards)
   ============================================================ */

/* ══════════════════════════════════════
   DATA
══════════════════════════════════════ */
const PRODUCTS = [
  {id:1,  name:"AirBuds Pro 3 — Réduction Bruit Active",    cat:"Électronique",          price:349, old:549,  rating:4.8, rev:214, stock:45,  img:"🎧", badge:"top", desc:"Réduction de bruit active 40dB, 30h autonomie, son Hi-Fi premium, connexion instantanée iOS & Android. Livré avec étui de charge USB-C."},
  {id:2,  name:"SmartWatch Fitness Elite GPS",               cat:"Électronique",          price:799, old:1199, rating:4.7, rev:187, stock:28,  img:"⌚", badge:"top", desc:"GPS intégré, suivi cardiaque continu, résistant 50m, 7 jours autonomie, 20 modes sport, notifications intelligentes."},
  {id:3,  name:"PowerBank Ultra Slim 20000mAh 65W",          cat:"Accessoires Téléphone", price:189, old:299,  rating:4.6, rev:432, stock:120, img:"🔋", badge:"",    desc:"Charge rapide 65W Power Delivery, design ultra-slim, indicateur LED, compatible tous appareils modernes."},
  {id:4,  name:"Robot Aspirateur Laser 4000Pa Auto-Vide",    cat:"Maison & Cuisine",      price:1299,old:1899, rating:4.9, rev:98,  stock:15,  img:"🤖", badge:"top", desc:"Navigation LiDAR précise, aspiration 4000Pa, vidage automatique, contrôle par app, cartographie multi-étages."},
  {id:5,  name:"Dashcam 4K HDR GPS WiFi Vision Nocturne",    cat:"Auto & Moto",           price:599, old:899,  rating:4.6, rev:156, stock:33,  img:"📹", badge:"",    desc:"Enregistrement 4K HDR, vision nocturne excellente, GPS intégré, WiFi, détection collision, capacité 256GB."},
  {id:6,  name:"Clavier Mécanique RGB 87T Cherry MX Blue",   cat:"Électronique",          price:289, old:429,  rating:4.6, rev:176, stock:52,  img:"⌨️",badge:"",    desc:"Switches Cherry MX Blue authentiques, RGB 16 millions couleurs, 87 touches TKL, compatible Mac & Windows."},
  {id:7,  name:"Montre Connectée AMOLED Style Fashion",      cat:"Électronique",          price:449, old:699,  rating:4.5, rev:289, stock:67,  img:"⌚", badge:"new",  desc:"Écran AMOLED 1.4 pouces always-on, 100+ cadrans, paiement NFC, 14 jours autonomie, IPX8 waterproof."},
  {id:8,  name:"Chargeur MagSafe 3-en-1 15W Rapide",         cat:"Accessoires Téléphone", price:249, old:399,  rating:4.7, rev:321, stock:89,  img:"🔌", badge:"",    desc:"Charge simultanée iPhone + Watch + AirPods, 15W maximum, certifié MagSafe, design minimaliste élégant."},
  {id:9,  name:"Aspirateur Cyclone 350W Sans Fil 70min",     cat:"Maison & Cuisine",      price:449, old:699,  rating:4.5, rev:134, stock:41,  img:"🌀", badge:"",    desc:"350W haute puissance, 70min autonomie, filtre HEPA H13, 2 vitesses, tube télescopique, léger 2.1kg."},
  {id:10, name:"GPS Voiture 7 Pouces HD Cartes Maroc",       cat:"Auto & Moto",           price:329, old:499,  rating:4.4, rev:267, stock:88,  img:"🗺️",badge:"",    desc:"Écran 7 pouces HD tactile, cartes Maroc préinstallées, mises à jour gratuites, trafic live, voix navigation."},
  {id:11, name:"Écran Portable 15.6\" IPS Full HD USB-C",    cat:"Informatique & Bureau", price:899, old:1299, rating:4.8, rev:43,  stock:22,  img:"🖥️",badge:"new",  desc:"IPS Full HD 1080p, 300 nits, USB-C & HDMI, haut-parleurs stéréo intégrés, housse de protection incluse."},
  {id:12, name:"Bracelet Fitness SpO2 14 Jours AMOLED",      cat:"Sport & Fitness",       price:199, old:299,  rating:4.4, rev:412, stock:110, img:"💪", badge:"",    desc:"Mesure SpO2, stress, sommeil, 120 modes sport, 5ATM waterproof, 14 jours autonomie, écran AMOLED couleur."},
  {id:13, name:"Support Téléphone Magnétique 360° Voiture",  cat:"Auto & Moto",           price:89,  old:149,  rating:4.5, rev:634, stock:200, img:"📱", badge:"",    desc:"Fixation magnétique ultra-puissante, rotation 360° fluide, compatible tous smartphones, installation sans outil."},
  {id:14, name:"Casque Gaming 7.1 Surround RGB Pro",         cat:"Gaming",                price:379, old:599,  rating:4.7, rev:98,  stock:37,  img:"🎮", badge:"top", desc:"Son surround 7.1 virtuel, microphone antibruit amovible, coussinets mémoire de forme, RGB personnalisable."},
  {id:15, name:"Enceinte Bluetooth 360° IPX7 18h",           cat:"Accessoires Téléphone", price:199, old:299,  rating:4.5, rev:543, stock:95,  img:"🔊", badge:"",    desc:"Son 360 degrés immersif, IPX7 étanche, 18h autonomie, microphone intégré, couplage stéréo TWS."},
  {id:16, name:"Lampe LED Bureau Anti-fatigue 5 Modes",      cat:"Maison & Cuisine",      price:159, old:239,  rating:4.4, rev:267, stock:78,  img:"💡", badge:"new",  desc:"5 modes lumière, graduation infinie, port USB-C charge, mémoire position, certifiée CE, col flexible."},
];

const COMBOS = [
  { id:"C1", p1:1, p2:8,  p3:15, title:"Pack Audio Premium",
    desc:"L'essentiel audio : AirBuds Pro 3 + Chargeur MagSafe 3-en-1 + Enceinte BT 360°.",
    save:"Économisez 297 DH" },
  { id:"C2", p1:2, p2:12, p3:3,  title:"Pack Sport & Santé",
    desc:"Suivi complet : SmartWatch Elite GPS + Bracelet SpO2 + PowerBank 65W.",
    save:"Économisez 358 DH" },
  { id:"C3", p1:5, p2:13, p3:10, title:"Pack Auto Intelligent",
    desc:"Voiture connectée : Dashcam 4K + Support magnétique + GPS Maroc offline.",
    save:"Économisez 256 DH" },
];

const SLIDES = [
  {
    tag:"🌙 Offre Ramadan 2026", cta:"Commander",
    bgColor:"#06112e", flash:false,
    prods:[
      {id:1,  img:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=260&q=80"},
      {id:8,  img:"https://images.unsplash.com/photo-1586495777744-4e6232bf4651?w=260&q=80"},
      {id:15, img:"https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=260&q=80"},
      {id:3,  img:"https://images.unsplash.com/photo-1609592806596-b9b98f8cdba5?w=260&q=80"},
      {id:12, img:"https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=260&q=80"},
      {id:7,  img:"https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=260&q=80"},
      {id:2,  img:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=260&q=80"},
      {id:16, img:"https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=260&q=80"},
      {id:9,  img:"https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=260&q=80"},
      {id:14, img:"https://images.unsplash.com/photo-1599669454699-248893623440?w=260&q=80"},
      {id:6,  img:"https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=260&q=80"},
      {id:13, img:"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=260&q=80"},
    ]
  },
  {
    tag:"⚡ Flash Deal — 24h seulement", cta:"Acheter vite",
    bgColor:"#3a0505", flash:true,
    prods:[
      {id:2,  img:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=260&q=80"},
      {id:4,  img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=260&q=80"},
      {id:1,  img:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=260&q=80"},
      {id:14, img:"https://images.unsplash.com/photo-1599669454699-248893623440?w=260&q=80"},
      {id:5,  img:"https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=260&q=80"},
      {id:6,  img:"https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=260&q=80"},
      {id:11, img:"https://images.unsplash.com/photo-1527443224154-c4a573d5e326?w=260&q=80"},
      {id:3,  img:"https://images.unsplash.com/photo-1609592806596-b9b98f8cdba5?w=260&q=80"},
      {id:7,  img:"https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=260&q=80"},
      {id:15, img:"https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=260&q=80"},
      {id:10, img:"https://images.unsplash.com/photo-1551808525-51a94da548ce?w=260&q=80"},
      {id:16, img:"https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=260&q=80"},
    ]
  },
  {
    tag:"🎁 Aïd Al Fitr Moubarak", cta:"Offrir",
    bgColor:"#011e0a", flash:false,
    prods:[
      {id:4,  img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=260&q=80"},
      {id:7,  img:"https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=260&q=80"},
      {id:1,  img:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=260&q=80"},
      {id:16, img:"https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=260&q=80"},
      {id:2,  img:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=260&q=80"},
      {id:15, img:"https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=260&q=80"},
      {id:8,  img:"https://images.unsplash.com/photo-1586495777744-4e6232bf4651?w=260&q=80"},
      {id:9,  img:"https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=260&q=80"},
      {id:12, img:"https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=260&q=80"},
      {id:5,  img:"https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=260&q=80"},
      {id:6,  img:"https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=260&q=80"},
      {id:14, img:"https://images.unsplash.com/photo-1599669454699-248893623440?w=260&q=80"},
    ]
  },
  {
    tag:"🐑 Aïd Al Adha 2026", cta:"Commander",
    bgColor:"#1a0d00", flash:false,
    prods:[
      {id:9,  img:"https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=260&q=80"},
      {id:4,  img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=260&q=80"},
      {id:16, img:"https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=260&q=80"},
      {id:8,  img:"https://images.unsplash.com/photo-1586495777744-4e6232bf4651?w=260&q=80"},
      {id:15, img:"https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=260&q=80"},
      {id:3,  img:"https://images.unsplash.com/photo-1609592806596-b9b98f8cdba5?w=260&q=80"},
      {id:7,  img:"https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=260&q=80"},
      {id:12, img:"https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=260&q=80"},
      {id:1,  img:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=260&q=80"},
      {id:6,  img:"https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=260&q=80"},
      {id:13, img:"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=260&q=80"},
      {id:11, img:"https://images.unsplash.com/photo-1527443224154-c4a573d5e326?w=260&q=80"},
    ]
  },
  {
    tag:"☀️ Collection Été 2026", cta:"Profiter",
    bgColor:"#001628", flash:false,
    prods:[
      {id:5,  img:"https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=260&q=80"},
      {id:13, img:"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=260&q=80"},
      {id:12, img:"https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=260&q=80"},
      {id:3,  img:"https://images.unsplash.com/photo-1609592806596-b9b98f8cdba5?w=260&q=80"},
      {id:15, img:"https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=260&q=80"},
      {id:10, img:"https://images.unsplash.com/photo-1551808525-51a94da548ce?w=260&q=80"},
      {id:6,  img:"https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=260&q=80"},
      {id:1,  img:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=260&q=80"},
      {id:2,  img:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=260&q=80"},
      {id:7,  img:"https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=260&q=80"},
      {id:8,  img:"https://images.unsplash.com/photo-1586495777744-4e6232bf4651?w=260&q=80"},
      {id:14, img:"https://images.unsplash.com/photo-1599669454699-248893623440?w=260&q=80"},
    ]
  },
  {
    tag:"🎒 Rentrée Scolaire 2026", cta:"S'équiper",
    bgColor:"#0d0428", flash:false,
    prods:[
      {id:11, img:"https://images.unsplash.com/photo-1527443224154-c4a573d5e326?w=260&q=80"},
      {id:6,  img:"https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=260&q=80"},
      {id:14, img:"https://images.unsplash.com/photo-1599669454699-248893623440?w=260&q=80"},
      {id:16, img:"https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=260&q=80"},
      {id:3,  img:"https://images.unsplash.com/photo-1609592806596-b9b98f8cdba5?w=260&q=80"},
      {id:8,  img:"https://images.unsplash.com/photo-1586495777744-4e6232bf4651?w=260&q=80"},
      {id:2,  img:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=260&q=80"},
      {id:12, img:"https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=260&q=80"},
      {id:1,  img:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=260&q=80"},
      {id:5,  img:"https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=260&q=80"},
      {id:9,  img:"https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=260&q=80"},
      {id:7,  img:"https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=260&q=80"},
    ]
  },
  {
    tag:"🔥 Takhfidat Jomo3a", cta:"J'en profite",
    bgColor:"#280700", flash:true,
    prods:[
      {id:2,  img:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=260&q=80"},
      {id:4,  img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=260&q=80"},
      {id:1,  img:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=260&q=80"},
      {id:11, img:"https://images.unsplash.com/photo-1527443224154-c4a573d5e326?w=260&q=80"},
      {id:14, img:"https://images.unsplash.com/photo-1599669454699-248893623440?w=260&q=80"},
      {id:5,  img:"https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=260&q=80"},
      {id:7,  img:"https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=260&q=80"},
      {id:9,  img:"https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=260&q=80"},
      {id:3,  img:"https://images.unsplash.com/photo-1609592806596-b9b98f8cdba5?w=260&q=80"},
      {id:16, img:"https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=260&q=80"},
      {id:8,  img:"https://images.unsplash.com/photo-1586495777744-4e6232bf4651?w=260&q=80"},
      {id:12, img:"https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=260&q=80"},
    ]
  },
];

const CATS = ["Tout","Électronique","Informatique & Bureau","Accessoires Téléphone","Maison & Cuisine","Mode","Beauté & Soins","Sport & Fitness","Auto & Moto","Gaming","Offres Spéciales"];

const CAT_ICO = {
  "Électronique":          `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
  "Informatique & Bureau": `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><polyline points="8 21 12 17 16 21"/></svg>`,
  "Accessoires Téléphone": `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>`,
  "Maison & Cuisine":      `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
  "Mode":                  `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.57a1 1 0 00.99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.57a2 2 0 00-1.34-2.23z"/></svg>`,
  "Beauté & Soins":        `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>`,
  "Sport & Fitness":       `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M4.93 4.93l4.24 4.24M14.83 14.83l4.24 4.24M4.93 19.07l4.24-4.24M14.83 9.17l4.24-4.24"/></svg>`,
  "Auto & Moto":           `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M5 17H3v-6l2-5h14l2 5v6h-2M5 17h14M5 17a2 2 0 104 0M15 17a2 2 0 104 0"/></svg>`,
  "Gaming":                `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="6" y1="12" x2="10" y2="12"/><line x1="8" y1="10" x2="8" y2="14"/><line x1="15" y1="13" x2="15.01" y2="13"/><line x1="18" y1="11" x2="18.01" y2="11"/><rect x="2" y="6" width="20" height="12" rx="2"/></svg>`,
  "Offres Spéciales":      `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
};
const CAT_CLS = {
  "Électronique":"i1","Informatique & Bureau":"i2","Accessoires Téléphone":"i3",
  "Maison & Cuisine":"i4","Mode":"i5","Beauté & Soins":"i1","Sport & Fitness":"i2",
  "Auto & Moto":"i3","Gaming":"i4","Offres Spéciales":"i5"
};

const REVIEWS = [
  {name:"Karim B.",   city:"Casablanca", r:5, text:"Livraison en 24h, produit conforme. Service client très réactif. Je recommande vivement E-Shopia !",         col:"#1565c0", date:"Mars 2025"},
  {name:"Fatima Z.",  city:"Rabat",      r:5, text:"Emballage soigné, produit de très bonne qualité. Le paiement à la livraison est très pratique. Bravo !",    col:"#e8193c", date:"Fév 2025"},
  {name:"Mohamed I.", city:"Marrakech",  r:4, text:"Bonne expérience globale. Produit fonctionnel et conforme à la description. Livraison dans les délais.",    col:"#f59e0b", date:"Mars 2025"},
  {name:"Sara A.",    city:"Fès",        r:5, text:"Impressionnée par la qualité ! Produit arrivé en parfait état, bien emballé. Merci E-Shopia Maroc !",       col:"#059669", date:"Janv 2025"},
  {name:"Youssef T.", city:"Tanger",     r:5, text:"Service client professionnel et très réactif. Le produit dépasse mes attentes. Je recommande à 100% !",    col:"#7c3aed", date:"Mars 2025"},
  {name:"Nadia C.",   city:"Agadir",     r:4, text:"Très bon rapport qualité-prix. Livraison rapide, produit en parfait état. Achat simple et sécurisé.",       col:"#0891b2", date:"Fév 2025"},
];

/* ══════════════════════════════════════
   PRODUCT IMAGES (real photos)
══════════════════════════════════════ */
const PRODUCT_IMAGES = {
  1:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=85",
  2:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=85",
  3:"https://images.unsplash.com/photo-1609592806596-b9b98f8cdba5?w=400&q=85",
  4:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=85",
  5:"https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=400&q=85",
  6:"https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&q=85",
  7:"https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&q=85",
  8:"https://images.unsplash.com/photo-1586495777744-4e6232bf4651?w=400&q=85",
  9:"https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&q=85",
  10:"https://images.unsplash.com/photo-1551808525-51a94da548ce?w=400&q=85",
  11:"https://images.unsplash.com/photo-1527443224154-c4a573d5e326?w=400&q=85",
  12:"https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&q=85",
  13:"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=85",
  14:"https://images.unsplash.com/photo-1599669454699-248893623440?w=400&q=85",
  15:"https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&q=85",
  16:"https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&q=85",
};

/* ══════════════════════════════════════
   HELPERS
══════════════════════════════════════ */
function genId(pfx='') { return pfx + Date.now().toString(36) + Math.random().toString(36).slice(2, 8); }

const fmt   = n => Number(n).toLocaleString("fr-MA") + " DH";
const disc  = (o,c) => o ? Math.round((1-c/o)*100) : 0;
const stars = r => "★".repeat(Math.floor(r)) + "☆".repeat(5-Math.floor(r));

/* ══════════════════════════════════════
   CART
══════════════════════════════════════ */
const Cart = {
  _k:"esm4_cart",
  get(){try{return JSON.parse(localStorage.getItem(this._k)||"[]")}catch{return[]}},
  save(i){localStorage.setItem(this._k,JSON.stringify(i))},
  add(pid,qty=1){
    const items=this.get(), ex=items.find(i=>i.id===pid);
    ex ? ex.qty+=qty : items.push({id:pid,qty});
    this.save(items); this.badge();
    toast(i18n.t("toast_added"),"success");
  },
  addCombo(c){
    [c.p1,c.p2,c.p3].filter(Boolean).forEach(id=>{
      const items=this.get(), ex=items.find(i=>i.id===id);
      ex?ex.qty++:items.push({id,qty:1});
      this.save(items);
    });
    this.badge();
    toast(`Bundle "${c.title}" ajouté au panier !`,"success");
  },
  remove(pid){this.save(this.get().filter(i=>i.id!==pid)); this.badge()},
  qty(pid,q){const items=this.get(),i=items.find(x=>x.id===pid); if(i){i.qty=Math.max(1,q); this.save(items);}},
  clear(){this.save([]); this.badge()},
  count(){return this.get().reduce((s,i)=>s+i.qty,0)},
  total(){return this.get().reduce((s,i)=>{const p=PRODUCTS.find(x=>x.id===i.id); return s+(p?p.price*i.qty:0)},0)},
  badge(){
    const c=this.count();
    document.querySelectorAll(".cart-n,.hdr-cart-badge").forEach(el=>{el.textContent=c; el.style.display=c?"flex":"none"});
  }
};

const Wishlist={
  _k:"esm4_wish",
  get(){try{return JSON.parse(localStorage.getItem(this._k)||"[]")}catch{return[]}},
  toggle(id){let w=this.get();const has=w.includes(id);w=has?w.filter(x=>x!==id):[...w,id];localStorage.setItem(this._k,JSON.stringify(w));return!has;},
  has(id){return this.get().includes(id)}
};

/* ══════════════════════════════════════
   TOAST
══════════════════════════════════════ */
function toast(msg,type="info"){
  let w=document.querySelector(".toasts");
  if(!w){w=document.createElement("div");w.className="toasts";document.body.appendChild(w);}
  const t=document.createElement("div");
  const ic={success:`<svg fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>`,
             error:`<svg fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
             info:`<svg fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`};
  t.className=`toast ${type}`;
  t.innerHTML=`<div class="t-ico">${ic[type]||ic.info}</div><span>${msg}</span>`;
  w.appendChild(t);
  requestAnimationFrame(()=>t.classList.add("show"));
  setTimeout(()=>{t.classList.remove("show"); setTimeout(()=>t.remove(),400)},3200);
}

function openModal(id){document.getElementById(id)?.classList.add("open")}
function closeModal(id){document.getElementById(id)?.classList.remove("open")}
function switchTab(btn,panelId){
  btn.closest(".m-tabs")?.querySelectorAll(".m-tab").forEach(t=>t.classList.remove("on"));
  btn.classList.add("on");
  btn.closest(".modal")?.querySelectorAll(".m-panel").forEach(p=>p.classList.remove("on"));
  document.getElementById(panelId)?.classList.add("on");
}

function doSearch(){
  const q=(document.getElementById("hdrSearch")||document.getElementById("navSearch"))?.value.trim();
  if(q){const base=window.location.pathname.includes("/pages/")?"":"pages/";window.location.href=base+"category.html?search="+encodeURIComponent(q);}
}

/* ══════════════════════════════════════
   PRODUCT CARD
══════════════════════════════════════ */
function pCard(p,root=""){
  const d=disc(p.old,p.price);
  const wished=Wishlist.has(p.id);
  const badgeHtml=p.badge==="top"?`<span class="p-badge p-badge-top">🏆 Top</span>`:p.badge==="new"?`<span class="p-badge p-badge-new">🆕 Nouveau</span>`:"";
  return `
  <article class="pcard fu" itemscope itemtype="https://schema.org/Product">
    <div class="pcard-img" onclick="window.location='${root}pages/product.html?id=${p.id}'">
      <div class="pcard-bgs">
        ${d>0?`<span class="badge bg-red">-${d}%</span>`:""}
        ${p.stock<20?`<span class="badge bg-orange">Stock limité</span>`:""}
      </div>
      ${badgeHtml}
      <span class="p-emj">${p.img}</span>
      <button class="p-wish${wished?" wished":""}" onclick="event.stopPropagation();
        const w=Wishlist.toggle(${p.id});this.classList.toggle('wished',w);
        toast(w?i18n.t('toast_wishlist_add'):i18n.t('toast_wishlist_rm'),'info')" aria-label="Favoris">
        <svg fill="${wished?"currentColor":"none"}" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
      </button>
      <div class="p-over" onclick="window.location='${root}pages/product.html?id=${p.id}'"><span>Voir le produit</span></div>
    </div>
    <div class="pcard-body">
      <div class="p-cat">${p.cat}</div>
      <div class="p-name" itemprop="name">${p.name}</div>
      <div class="p-stars"><span class="st">${stars(p.rating)}</span><span class="cnt">(${p.rev})</span></div>
      <div class="p-prices">
        <span class="p-price">${fmt(p.price)}</span>
        ${p.old?`<span class="p-old">${fmt(p.old)}</span>`:""}
        ${d>0?`<span class="p-disc">-${d}%</span>`:""}
      </div>
      <button class="btn btn-primary p-add" onclick="event.stopPropagation();Cart.add(${p.id})">
        <svg fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M6 2 3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
        <span data-i18n="add_to_cart">Ajouter au panier</span>
      </button>
    </div>
  </article>`;
}

/* ══════════════════════════════════════
   BUILD NAV (overridden by megamenu)
══════════════════════════════════════ */
function buildNav(root=""){
  const cnt=Cart.count();
  return `

  <header class="header"><div class="container">
    <a href="${root}index.html" class="logo-link">
      <img src="${root}images/logo.png" alt="E-Shopia Maroc" width="215" height="60">
    </a>
    <div class="search-wrap">
      <select class="s-cat" aria-label="Catégorie">
        <option>Tout</option>${CATS.filter(c=>c!=="Tout").map(c=>`<option>${c}</option>`).join("")}
      </select>
      <input class="s-inp" type="text" placeholder="Rechercher produits, marques, modèles…" id="navSearch" data-i18n-ph="nav_search_ph" onkeydown="if(event.key==='Enter')doSearch()">
      <button class="s-btn" onclick="doSearch()" aria-label="Rechercher">
        <svg fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
        <span data-i18n="search">Rechercher</span>
      </button>
    </div>
    <div class="header-right">
      <a href="${root}pages/compte.html" class="h-btn">
        <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        <span data-i18n="nav_account">Compte</span>
      </a>
      <div id="lang-sw-nav" style="margin-left:4px"></div>
      <a href="${root}pages/cart.html" class="h-btn" style="position:relative">
        <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M6 2 3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
        <span data-i18n="nav_cart">Panier</span><span class="cart-n" style="display:${cnt?"flex":"none"}">${cnt}</span>
      </a>
    </div>
  </div></header>
  <nav class="cat-nav"><div class="container">
    <a href="${root}pages/category.html?cat=Tout" class="cat-a">
      <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" width="14" height="14"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>Tout
    </a>
    ${CATS.filter(c=>c!=="Tout").map(c=>`<a href="${root}pages/category.html?cat=${encodeURIComponent(c)}" class="cat-a" data-cat-fr="${c}">${CAT_ICO[c]||""} ${window.i18n?i18n.cat(c):c}</a>`).join("")}
  </div></nav>`;
}

/* ══════════════════════════════════════
   FOOTER
══════════════════════════════════════ */
function buildFooter(root=""){
  return `
  <footer class="footer">
  <!-- ── Main footer columns ── -->
  <div class="container"><div class="footer-cols">

    <!-- Brand col -->
    <div>
      <div class="f-logo"><img src="${root}images/logo.png" alt="E-Shopia Maroc"></div>
      <p class="f-desc">Votre boutique en ligne de confiance au Maroc. Produits authentiques, livraison gratuite dès 129 DH, paiement à la livraison.</p>
      <!-- Contact info -->
      <div class="f-contact">
        <a href="mailto:support@eshopia.ma" class="f-contact-item">
          <div class="f-contact-ico">
            <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" width="15" height="15"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          </div>
          <span>support@eshopia.ma</span>
        </a>
        <a href="tel:+212702010303" class="f-contact-item">
          <div class="f-contact-ico">
            <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" width="15" height="15"><path d="M22 16.92v3a2 2 0 01-2.18 2A19.79 19.79 0 013.07 11a2 2 0 012-2.18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L9.91 16a16 16 0 006.29 6.29l1.32-1.32a2 2 0 012.11-.45c.907.34 1.85.573 2.81.7A2 2 0 0122 22z"/></svg>
          </div>
          <span>+212 702 010 303</span>
        </a>
      </div>
      <!-- Socials -->
      <div class="f-socials" style="margin-top:18px">
        <a href="https://facebook.com/eshopia.maroc" class="f-social f-fb" aria-label="Facebook" target="_blank" rel="noopener">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
        </a>
        <a href="https://instagram.com/eshopia_maroc" class="f-social f-ig" aria-label="Instagram" target="_blank" rel="noopener">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
        </a>
        <a href="https://tiktok.com/@eshopia_maroc" class="f-social f-tt" aria-label="TikTok" target="_blank" rel="noopener">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 106.33 6.33V8.87a8.18 8.18 0 004.78 1.52V7a4.85 4.85 0 01-1.01-.31z"/></svg>
        </a>
        <a href="https://wa.me/212702010303" class="f-social f-wa" aria-label="WhatsApp" target="_blank" rel="noopener">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.118 1.533 5.85L.054 23.198a.75.75 0 00.748.802l5.544-1.454A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75A9.75 9.75 0 1121.75 12 9.76 9.76 0 0112 21.75z"/></svg>
        </a>
      </div>
    </div>

    <!-- Categories -->
    <div class="f-col">
      <div class="f-col-title">Catégories</div>
      ${CATS.filter(c=>c!=="Tout").map(c=>`<a href="${root}pages/category.html?cat=${encodeURIComponent(c)}">${c}</a>`).join("")}
    </div>

    <!-- Help -->
    <div class="f-col">
      <div class="f-col-title">Aide & Service</div>
      <a href="#">Suivi de commande</a>
      <a href="#" data-i18n="footer_returns">Retours &amp; échanges</a>
      <a href="#" data-i18n="footer_faq">FAQ</a>
      <a href="#" data-i18n="footer_delivery">Livraison &amp; délais</a>
      <a href="https://wa.me/212702010303" target="_blank" rel="noopener">Contact WhatsApp</a>
      <a href="${root}index.html#affiliate" data-i18n="footer_affiliate">Programme Affilié</a>
      <a href="#" data-i18n="footer_about">À propos</a>
      <a href="mailto:support@eshopia.ma">support@eshopia.ma</a>
    </div>

    <!-- Newsletter + payment -->
    <div class="f-col">
      <div class="f-col-title">Newsletter</div>
      <p class="f-nl-desc">Recevez nos meilleures offres directement dans votre boîte mail.</p>
      <div class="nl-row">
        <input type="email" id="nlEmail" placeholder="votre@email.com" data-i18n-ph="footer_nl_ph">
        <button onclick="subscribeNewsletter()" data-i18n="footer_nl_btn">S'inscrire</button>
      </div>
      <div style="margin-top:20px">
        <div class="f-col-title" style="margin-bottom:10px">Paiement accepté</div>
        <div class="pay-types">
          <span class="pay-tag">
            <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" width="11" height="11"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
            COD
          </span>
          <span class="pay-tag">
            <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" width="11" height="11"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>
            Virement
          </span>
        </div>
      </div>
    </div>

  </div></div>

  <!-- ── Footer bottom ── -->
  <div class="container"><div class="footer-btm">
    <span>© 2026 E-Shopia Maroc. Tous droits réservés.</span>
    <div class="ftm-links"><a href="#">À propos</a><a href="#" data-i18n="footer_privacy">Confidentialité</a><a href="#" data-i18n="footer_terms">CGU</a><a href="#">Cookies</a><a href="#">Plan du site</a></div>
  </div></div>
  </footer>`;
}

function subscribeNewsletter(){
  const el=document.getElementById("nlEmail");
  if(!el)return;
  const v=el.value.trim();
  if(!v||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)){toast(i18n.t('newsletter_err'),"error");return;}
  toast(i18n.t('newsletter_ok'),"success");
  el.value="";
}

/* ══════════════════════════════════════
   LOGIN MODAL — 2 tabs, clean
══════════════════════════════════════ */
function buildLoginModal(){
  return `<div class="modal-bg" id="loginModal" onclick="if(event.target===this)closeModal('loginModal')">
    <div class="modal">
      <div class="modal-hd">
        <div>
          <h2>Bienvenue sur E-Shopia</h2>
          <p style="font-size:.78rem;color:var(--text4);margin-top:3px;font-weight:400">Votre boutique en ligne de confiance</p>
        </div>
        <button class="m-close" onclick="closeModal('loginModal')">
          <svg fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" width="18" height="18"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
      <div class="m-tabs">
        <button class="m-tab on" onclick="switchTab(this,'p-login')">Connexion</button>
        <button class="m-tab"   onclick="switchTab(this,'p-register')">Créer un compte</button>
      </div>
      <div id="p-login" class="m-panel on">
        <div class="fg"><label>Email ou Téléphone</label><input type="text" placeholder="votre@email.com ou 06XXXXXXXX"></div>
        <div class="fg"><label>Mot de passe</label><input type="password" placeholder="••••••••"></div>
        <button class="btn btn-grad btn-block btn-lg" style="margin-top:8px" onclick="toast(i18n.t('toast_login_ok'),'success');closeModal('loginModal')" data-i18n="auth_login_btn">Se connecter</button>
        <p style="text-align:center;margin-top:14px;font-size:.8rem;color:var(--text4)">Mot de passe oublié ? <a style="color:var(--blue);font-weight:600;cursor:pointer">Réinitialiser</a></p>
      </div>
      <div id="p-register" class="m-panel">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
          <div class="fg"><label>Prénom *</label><input placeholder="Prénom"></div>
          <div class="fg"><label>Nom *</label><input placeholder="Nom"></div>
        </div>
        <div class="fg"><label>Email *</label><input type="email" placeholder="votre@email.com"></div>
        <div class="fg"><label>Téléphone *</label><input type="tel" placeholder="06XXXXXXXX"></div>
        <div class="fg"><label>Ville *</label>
          <select><option value="">— Sélectionner —</option>
            ${["Casablanca","Rabat","Marrakech","Fès","Tanger","Agadir","Meknès","Oujda","Kénitra","Tétouan","Autre"].map(c=>`<option>${c}</option>`).join("")}
          </select>
        </div>
        <div class="fg"><label>Mot de passe *</label><input type="password" placeholder="8 caractères minimum"></div>
        <button class="btn btn-grad btn-block btn-lg" style="margin-top:10px" onclick="toast(i18n.t('toast_register_ok'),'success');closeModal('loginModal')" data-i18n="auth_register_btn">Créer mon compte</button>
      </div>
    </div>
  </div>`;
}

/* ══════════════════════════════════════
   WHATSAPP + BACK TO TOP
══════════════════════════════════════ */
function buildWhatsApp(){
  return `<a href="https://wa.me/212702010303?text=Bonjour%20E-Shopia%20Maroc%2C%20j%27ai%20besoin%20d%27aide"
     class="whatsapp-float" target="_blank" rel="noopener" aria-label="Support WhatsApp">
    <div class="wa-pulse"></div>
    <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.118 1.533 5.85L.054 23.198a.75.75 0 00.748.802l5.544-1.454A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75A9.75 9.75 0 1121.75 12 9.76 9.76 0 0112 21.75z"/>
    </svg>
    <span class="wa-tooltip" data-i18n="whatsapp_help">Besoin d'aide ?</span>
  </a>`;
}
function buildBackToTop(){
  return `<button class="back-to-top" id="backToTop" onclick="window.scrollTo({top:0,behavior:'smooth'})" aria-label="Retour en haut">
    <svg fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><polyline points="18 15 12 9 6 15"/></svg>
  </button>`;
}
window.addEventListener("scroll",()=>{
  const b=document.getElementById("backToTop");
  if(b) b.classList.toggle("visible",window.scrollY>400);
},{passive:true});

/* ── pCard override: use real Unsplash photos ── */
const _pCardBase = pCard;
function pCard(p, root=""){
  const d=disc(p.old,p.price);
  const wished=Wishlist.has(p.id);
  const badgeHtml=p.badge==="top"?`<span class="p-badge p-badge-top">🏆 Top</span>`:p.badge==="new"?`<span class="p-badge p-badge-new">🆕 Nouveau</span>`:"";
  const imgSrc = PRODUCT_IMAGES[p.id];
  return `
  <article class="pcard fu" itemscope itemtype="https://schema.org/Product">
    <div class="pcard-img" onclick="window.location='${root}pages/product.html?id=${p.id}'" style="overflow:hidden">
      <div class="pcard-bgs">
        ${d>0?`<span class="badge bg-red">-${d}%</span>`:""}
        ${p.stock<20?`<span class="badge bg-orange">Stock limité</span>`:""}
      </div>
      ${badgeHtml}
      ${imgSrc?`<img src="${imgSrc}" alt="${p.name}" loading="lazy" style="width:100%;height:100%;object-fit:cover;transition:.4s" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"><span class="p-emj" style="display:none">${p.img}</span>`:`<span class="p-emj">${p.img}</span>`}
      <button class="p-wish${wished?" wished":""}" onclick="event.stopPropagation();
        const w=Wishlist.toggle(${p.id});this.classList.toggle('wished',w);
        toast(w?i18n.t('toast_wishlist_add'):i18n.t('toast_wishlist_rm'),'info')" aria-label="Favoris">
        <svg fill="${wished?"currentColor":"none"}" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
      </button>
      <div class="p-over" onclick="window.location='${root}pages/product.html?id=${p.id}'"><span>Voir le produit</span></div>
    </div>
    <div class="pcard-body">
      <div class="p-cat">${p.cat}</div>
      <div class="p-name" itemprop="name">${p.name}</div>
      <div class="p-stars"><span class="st">${stars(p.rating)}</span><span class="cnt">(${p.rev})</span></div>
      <div class="p-prices">
        <span class="p-price">${fmt(p.price)}</span>
        ${p.old?`<span class="p-old">${fmt(p.old)}</span>`:""}
        ${d>0?`<span class="p-disc">-${d}%</span>`:""}
      </div>
      <button class="btn btn-primary p-add" onclick="event.stopPropagation();Cart.add(${p.id})">
        <svg fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M6 2 3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
        <span data-i18n="add_to_cart">Ajouter au panier</span>
      </button>
    </div>
  </article>`;
}

/* ── Delivery zones ── */
const DELIVERY_ZONES={
  express:{cities:["Casablanca","Rabat","Marrakech"],price:0,delay:"24h Express"},
  standard:{cities:["Fès","Tanger","Agadir","Meknès","Oujda","Kénitra","Tétouan"],price:0,delay:"24–48h"},
  national:{price:0,delay:"48–72h"}
};
function getDelivery(city){
  if(!city) return{price:0,delay:"24–48h"};
  for(const z of Object.values(DELIVERY_ZONES)){
    if(z.cities?.includes(city)) return{price:Cart.total()>=129?0:z.price,delay:z.delay};
  }
  return{price:0,delay:"48–72h"};
}

/* ── Init lang switcher in nav ── */
document.addEventListener("DOMContentLoaded", function(){
  const el = document.getElementById("lang-sw-nav");
  if(el && window.i18n) i18n.buildSwitcher("lang-sw-nav");
});
