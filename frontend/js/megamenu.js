'use strict';
/* ============================================================
   E-SHOPIA MAROC — Mega Menu System
   ============================================================ */

/* ── Mega Menu Data ── */
const MEGA_CATS = [
  {
    id: "electronique",
    label: "Électronique",
    icon: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
    badge: null,
    cols: [
      {
        title: "Smartphones & Tablettes",
        icon: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>`,
        links: ["Smartphones","Téléphones Gaming","Tablettes","iPhone","Samsung Galaxy","Xiaomi"]
      },
      {
        title: "Ordinateurs",
        icon: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
        links: ["Ordinateurs Portables","Ordinateurs de Bureau","MacBook","Chromebook","Moniteurs","Stations de Travail"]
      },
      {
        title: "Audio & Son",
        icon: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 18v-6a9 9 0 0118 0v6"/><path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z"/></svg>`,
        links: ["Casques Audio","Écouteurs Sans Fil","Haut-parleurs Bluetooth","Barres de Son","Amplificateurs","Enceintes Portables"]
      },
      {
        title: "Photo & Vidéo",
        icon: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>`,
        links: ["Appareils Photo","Caméras de Sport","Drones","Caméras de Sécurité","Objectifs","Accessoires Photo"]
      },
      {
        feature: true,
        emoji: "📱",
        title: "Nouveautés Tech",
        desc: "Les derniers smartphones et gadgets high-tech à prix imbattables",
        link: "pages/category.html?cat=Electronics"
      }
    ]
  },
  {
    id: "informatique",
    label: "Informatique & Bureau",
    icon: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>`,
    badge: null,
    cols: [
      {
        title: "Périphériques",
        icon: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3M3 16v3a2 2 0 002 2h3m8 0h3a2 2 0 002-2v-3"/></svg>`,
        links: ["Claviers","Souris","Tapis de Souris Gaming","Webcams","Microphones","Écrans & Moniteurs"]
      },
      {
        title: "Stockage",
        icon: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>`,
        links: ["Clés USB","Disques Durs Externes","SSD","Cartes Mémoire","NAS","Stockage Cloud"]
      },
      {
        title: "Impression & Bureau",
        icon: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>`,
        links: ["Imprimantes","Cartouches d'Encre","Scanners","Fournitures Bureau","Chaises de Bureau","Lampes de Bureau"]
      },
      {
        feature: true,
        emoji: "💻",
        title: "Setup Gaming Pro",
        desc: "Créez votre espace gaming ou bureau idéal avec nos accessoires",
        link: "pages/category.html?cat=Electronics"
      }
    ]
  },
  {
    id: "accessoires-tel",
    label: "Accessoires Téléphone",
    icon: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2A19.79 19.79 0 013.07 11 2 2 0 015 8.93h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L9.91 16a16 16 0 006.29 6.29l1.32-1.32a2 2 0 012.11-.45c.907.34 1.85.573 2.81.7A2 2 0 0122 22z"/></svg>`,
    badge: null,
    cols: [
      {
        title: "Protection",
        icon: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
        links: ["Coques & Étuis","Protections d'Écran","Verres Trempés","Coques Antichoc","Coques Magnétiques","Étuis Portefeuille"]
      },
      {
        title: "Charge & Câbles",
        icon: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="13" y1="2" x2="13" y2="9"/><line x1="11" y1="14" x2="11" y2="22"/><polyline points="8 2 13 2 13 9 8 9"/><polyline points="16 22 11 22 11 14 16 14"/></svg>`,
        links: ["Chargeurs Rapides","Power Banks","Câbles USB-C","Câbles Lightning","Chargeurs Sans Fil","Chargeurs Voiture"]
      },
      {
        title: "Supports & Accessoires",
        icon: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>`,
        links: ["Supports Bureau","Supports Voiture","Gimbals","Selfie Sticks","Bagues de Téléphone","Sangles & Lanières"]
      },
      {
        feature: true,
        emoji: "🔋",
        title: "Charge Rapide",
        desc: "Power banks et chargeurs ultra-rapides jusqu'à 65W pour tous vos appareils",
        link: "pages/category.html?cat=Phone+Accessories"
      }
    ]
  },
  {
    id: "maison",
    label: "Maison & Cuisine",
    icon: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
    badge: null,
    cols: [
      {
        title: "Cuisine",
        icon: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M8.56 2.9A7 7 0 0119 9v11h-2V9a5 5 0 00-7.47-4.33M3 9v11h2V9a5 5 0 0110 0"/></svg>`,
        links: ["Ustensiles de Cuisine","Batterie de Cuisine","Gadgets de Cuisine","Appareils de Cuisson","Cafetières","Blenders & Mixeurs"]
      },
      {
        title: "Maison & Déco",
        icon: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>`,
        links: ["Décoration Maison","Éclairage LED","Bougies & Diffuseurs","Cadres Photo","Miroirs","Plantes & Pots"]
      },
      {
        title: "Organisation",
        icon: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>`,
        links: ["Rangement & Organisation","Boîtes de Rangement","Cintres & Penderies","Étagères","Produits Nettoyage","Balais & Aspirateurs"]
      },
      {
        feature: true,
        emoji: "🏠",
        title: "Maison Smart",
        desc: "Transformez votre maison avec nos gadgets connectés et décorations tendance",
        link: "pages/category.html?cat=Home+Essentials"
      }
    ]
  },
  {
    id: "mode",
    label: "Mode",
    icon: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.57a1 1 0 00.99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.57a2 2 0 00-1.34-2.23z"/></svg>`,
    badge: null,
    cols: [
      {
        title: "Vêtements",
        icon: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.57a1 1 0 00.99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.57a2 2 0 00-1.34-2.23z"/></svg>`,
        links: ["Vêtements Homme","Vêtements Femme","Vêtements Enfants","Vêtements de Sport","Pyjamas","Sous-Vêtements"]
      },
      {
        title: "Chaussures & Sacs",
        icon: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3.85 8.62a4 4 0 014.78-4.77 4 4 0 016.74 0 4 4 0 014.78 4.78 4 4 0 010 6.74 4 4 0 01-4.77 4.78 4 4 0 01-6.75 0 4 4 0 01-4.78-4.77 4 4 0 010-6.76z"/></svg>`,
        links: ["Chaussures Homme","Chaussures Femme","Chaussures Enfants","Sacs à Main","Sacs à Dos","Bagages & Valises"]
      },
      {
        title: "Accessoires Mode",
        icon: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
        links: ["Montres Homme","Montres Femme","Bijoux","Ceintures","Lunettes de Soleil","Chapeaux & Casquettes"]
      },
      {
        feature: true,
        emoji: "👗",
        title: "Tendances Mode",
        desc: "Découvrez les collections tendance pour toute la famille à prix cassés",
        link: "pages/category.html?cat=Tout"
      }
    ]
  },
  {
    id: "beaute",
    label: "Beauté & Soins",
    icon: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>`,
    badge: null,
    cols: [
      {
        title: "Maquillage & Soins",
        icon: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/></svg>`,
        links: ["Maquillage Visage","Maquillage Yeux","Rouge à Lèvres","Fond de Teint","Soins de la Peau","Crèmes Hydratantes"]
      },
      {
        title: "Cheveux & Coiffure",
        icon: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>`,
        links: ["Soins Capillaires","Shampooings","Sèche-Cheveux","Lisseurs","Fers à Boucler","Outils de Coiffure"]
      },
      {
        title: "Parfums & Hygiène",
        icon: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18"/></svg>`,
        links: ["Parfums Homme","Parfums Femme","Déodorants","Soins Corporels","Rasage","Hygiène Bucco-Dentaire"]
      },
      {
        feature: true,
        emoji: "✨",
        title: "Beauty Deals",
        desc: "Promotions exclusives sur les meilleures marques de beauté et soins",
        link: "pages/category.html?cat=Tout"
      }
    ]
  },
  {
    id: "sport",
    label: "Sport & Fitness",
    icon: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>`,
    badge: null,
    cols: [
      {
        title: "Fitness & Gym",
        icon: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 8h1a4 4 0 010 8h-1"/><path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>`,
        links: ["Haltères & Poids","Tapis de Sport","Cordes à Sauter","Bandes Élastiques","Vélos d'Appartement","Appareils Cardio"]
      },
      {
        title: "Sports & Plein Air",
        icon: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>`,
        links: ["Football","Basketball","Tennis","Natation","Randonnée","Camping"]
      },
      {
        title: "Tenues & Accessoires",
        icon: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.57a1 1 0 00.99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.57a2 2 0 00-1.34-2.23z"/></svg>`,
        links: ["Vêtements de Sport","Chaussures Running","Chaussures Trail","Sacs de Sport","Gourdes","Accessoires Yoga"]
      },
      {
        feature: true,
        emoji: "🏋️",
        title: "Home Gym",
        desc: "Équipez votre espace fitness à la maison avec notre sélection premium",
        link: "pages/category.html?cat=Tout"
      }
    ]
  },
  {
    id: "auto",
    label: "Auto & Moto",
    icon: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M7 17m-2 0a2 2 0 104 0 2 2 0 10-4 0M17 17m-2 0a2 2 0 104 0 2 2 0 10-4 0M5 17H3v-6l2-5h14l2 5v6h-2M5 17h12"/></svg>`,
    badge: null,
    cols: [
      {
        title: "Multimédia Auto",
        icon: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2A19.79 19.79 0 013.07 11 2 2 0 015 8.93h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L9.91 16a16 16 0 006.29 6.29l1.32-1.32a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 22z"/></svg>`,
        links: ["Supports Téléphone","GPS Navigation","Dashcams 4K","Chargeurs Voiture","Câbles Voiture","Autoradio & Son"]
      },
      {
        title: "Entretien & Confort",
        icon: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
        links: ["Housses de Sièges","Organisateurs Auto","Tapis de Sol","Nettoyage Voiture","Désodorisants","Protections Tableau de Bord"]
      },
      {
        title: "Sécurité & Accessoires",
        icon: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
        links: ["Antivol","Éthylotests","Trousses de Secours","Gilets Réfléchissants","Compresseurs d'Air","Éclairage LED Voiture"]
      },
      {
        feature: true,
        emoji: "🚗",
        title: "Auto Premium",
        desc: "Équipez et personnalisez votre véhicule avec nos accessoires high-tech",
        link: "pages/category.html?cat=Car+Accessories"
      }
    ]
  },
  {
    id: "gaming",
    label: "Gaming",
    icon: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="6" y1="12" x2="10" y2="12"/><line x1="8" y1="10" x2="8" y2="14"/><line x1="15" y1="13" x2="15.01" y2="13"/><line x1="18" y1="11" x2="18.01" y2="11"/><rect x="2" y="6" width="20" height="12" rx="2"/></svg>`,
    badge: "NEW",
    cols: [
      {
        title: "Consoles & Jeux",
        icon: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="2" y="6" width="20" height="12" rx="2"/><line x1="6" y1="12" x2="10" y2="12"/><line x1="8" y1="10" x2="8" y2="14"/><line x1="15" y1="13" x2="15.01" y2="13"/><line x1="18" y1="11" x2="18.01" y2="11"/></svg>`,
        links: ["PlayStation 5","Xbox Series X","Nintendo Switch","Jeux PC","Jeux Rétro","Cartes Cadeaux Gaming"]
      },
      {
        title: "Setup Gaming",
        icon: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
        links: ["Chaises Gaming","Bureaux Gaming","Moniteurs Gaming","Micro & Casques","Webcams Gaming","Éclairage RGB"]
      },
      {
        title: "Accessoires Gaming",
        icon: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3M3 16v3a2 2 0 002 2h3m8 0h3a2 2 0 002-2v-3"/></svg>`,
        links: ["Claviers Gaming RGB","Souris Gaming","Manettes","Casques Gaming","Tapis de Souris XL","Contrôleurs"]
      },
      {
        feature: true,
        emoji: "🎮",
        title: "Gaming Setup",
        desc: "Construisez votre PC gaming ou décorez votre espace avec style",
        link: "pages/category.html?cat=Electronics"
      }
    ]
  },
  {
    id: "offres",
    label: "Offres Spéciales",
    icon: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
    badge: "HOT",
    isDeals: true,
    dealsItems: [
      { emoji:"🔥", title:"Promotions Flash", desc:"Jusqu'à -70% • Durée limitée", badge:"bg-red", link:"pages/category.html?cat=Tout" },
      { emoji:"📦", title:"Offres Combo", desc:"Achetez plus, économisez plus", badge:"bg-orange", link:"pages/category.html?cat=Tout" },
      { emoji:"⭐", title:"Meilleures Ventes", desc:"Les produits les plus populaires", badge:"bg-blue", link:"pages/category.html?cat=Tout" },
      { emoji:"🆕", title:"Nouveautés", desc:"Arrivages récents", badge:"bg-green", link:"pages/category.html?cat=Tout" },
    ]
  }
];

/* ══════════════════════════════════════════════
   Build Navigation HTML
   ══════════════════════════════════════════════ */
function buildMegaNav(root = "") {

  /* ── Desktop Mega Nav Bar ── */
  let navHtml = `<nav class="mega-nav" role="navigation" aria-label="Navigation principale">
    <div class="container">
      <div class="mega-nav-inner" id="megaNavInner">
        <div class="mnav-item">
          <a href="${root}index.html" class="mnav-link home-link">
            <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" width="15" height="15"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            Accueil
          </a>
        </div>`;

  MEGA_CATS.forEach(cat => {
    const badgeHtml = cat.badge
      ? `<span style="background:${cat.badge==="HOT"?"var(--red)":"var(--blue)"};color:#fff;font-size:.55rem;font-weight:800;padding:1px 5px;border-radius:3px;letter-spacing:.04em;margin-left:3px">${cat.badge}</span>`
      : "";

    navHtml += `<div class="mnav-item has-mega" id="mnav-${cat.id}">
      <div class="mnav-link ${cat.isDeals ? "deals-link" : ""}">
        ${cat.icon}
        ${cat.label}${badgeHtml}
        <svg class="chevron" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg>
      </div>
      <div class="mega-nav-wrap">
        <div class="mega-panel" id="mpanel-${cat.id}">
          ${cat.isDeals ? buildDealsPanel(cat, root) : buildStdPanel(cat, root)}
        </div>
      </div>
    </div>`;
  });

  navHtml += `</div></div></nav>`;

  /* ── Mobile Drawer ── */
  let mobileHtml = `<div class="mobile-drawer" id="mobileDrawer">
    <div class="mobile-overlay" onclick="closeMobileMenu()"></div>
    <div class="mobile-panel">
      <div class="mob-panel-hd">
        <img src="${root}images/logo.png" alt="E-Shopia Maroc">
        <button class="mob-close" onclick="closeMobileMenu()" aria-label="Fermer">✕</button>
      </div>
      <div class="mob-search">
        <input type="text" id="mobSearch" placeholder="Rechercher…">
        <button onclick="const q=document.getElementById('mobSearch').value.trim();if(q)window.location='${root}pages/category.html?search='+encodeURIComponent(q)">🔍</button>
      </div>
      <nav class="mob-nav">
        <div class="mob-cat">
          <a href="${root}index.html" class="mob-cat-hd" style="text-decoration:none;display:flex;align-items:center;gap:10px">
            <span class="mob-ico">
              <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" width="16" height="16"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              Accueil
            </span>
          </a>
        </div>`;

  MEGA_CATS.forEach((cat, i) => {
    const isDeals = cat.isDeals;
    mobileHtml += `<div class="mob-cat">
      <div class="mob-cat-hd ${isDeals ? "special" : ""}" onclick="toggleMobCat(${i})" id="mob-hd-${i}">
        <span class="mob-ico">${cat.icon} ${cat.label}${cat.badge ? ` <span style="background:${cat.badge==="HOT"?"var(--red)":"var(--blue)"};color:#fff;font-size:.55rem;font-weight:800;padding:1px 5px;border-radius:3px">${cat.badge}</span>` : ""}</span>
        <svg class="mob-chev" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg>
      </div>
      <div class="mob-sub" id="mob-sub-${i}">`;

    if (isDeals) {
      cat.dealsItems.forEach(d => {
        mobileHtml += `<div class="mob-sub-group">
          <a href="${root}${d.link}" class="mob-sub-link">${d.emoji} ${d.title}</a>
        </div>`;
      });
    } else {
      cat.cols.filter(c => !c.feature).forEach(col => {
        mobileHtml += `<div class="mob-sub-group">
          <div class="mob-sub-title">${col.title}</div>
          ${col.links.map(l => `<a href="${root}pages/category.html?search=${encodeURIComponent(l)}" class="mob-sub-link">${l}</a>`).join("")}
        </div>`;
      });
    }
    mobileHtml += `</div></div>`;
  });

  mobileHtml += `</nav>
      <div class="mob-footer">
        <div class="mob-footer-links">
          <a href="#affiliate">Programme Affilié</a>
          <a href="#">Aide & Contact</a>
          <a href="#">Suivi de commande</a>
        </div>
      </div>
    </div>
  </div>`;

  return navHtml + mobileHtml;
}

function buildStdPanel(cat, root) {
  const hasFeat = cat.cols.some(c => c.feature);
  const dataCols = cat.cols.filter(c => !c.feature);
  const feat = cat.cols.find(c => c.feature);
  const colCount = dataCols.length + (hasFeat ? 1 : 0);
  const clsMap = { 2: "cols-2", 3: "cols-3", 4: "cols-4" };

  let html = `<div class="container"><div class="mega-inner ${clsMap[colCount] || "cols-3"}">`;

  dataCols.forEach(col => {
    html += `<div class="mega-col">
      <div class="mega-col-title">${col.icon || ""}${col.title}</div>
      ${col.links.map(l => `
        <a href="${root}pages/category.html?search=${encodeURIComponent(l)}" class="mega-link">
          <span class="dot"></span>${l}
        </a>`).join("")}
    </div>`;
  });

  if (feat) {
    html += `<div class="mega-feature">
      <span class="mega-feature-emoji">${feat.emoji}</span>
      <h4>${feat.title}</h4>
      <p>${feat.desc}</p>
      <a href="${root}${feat.link}">Voir les offres →</a>
    </div>`;
  }

  html += `</div></div>`;
  return html;
}

function buildDealsPanel(cat, root) {
  let html = `<div class="container"><div class="mega-deals-grid">`;
  cat.dealsItems.forEach(d => {
    html += `<a href="${root}${d.link}" class="deals-card">
      <span class="deals-card-emoji">${d.emoji}</span>
      <h4>${d.title}</h4>
      <p>${d.desc}</p>
      <span class="badge ${d.badge}">Voir les offres</span>
    </a>`;
  });
  html += `</div></div>`;
  return html;
}

/* ══════════════════════════════════════════════
   Build full Header (replaces old buildNav)
   ══════════════════════════════════════════════ */
function buildHeader(root = "") {
  const cnt = typeof Cart !== "undefined" ? Cart.count() : 0;

  const topbar = `<div class="topbar">
    <div class="container">
      <div class="topbar-left">
        <span>
          <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
          Livraison gratuite dès 129 DH
        </span>
        <span style="color:rgba(255,255,255,.3)">|</span>
        <span>Paiement à la livraison COD</span>
      </div>
      <div class="topbar-right">
        <a href="#affiliate">Programme Affilié</a>
        <a href="${root}pages/cart.html">Mon panier</a>
        <a href="#" onclick="typeof openModal==='function'&&openModal('loginModal');return false">Mon compte</a>
      </div>
    </div>
  </div>`;

  const header = `<header class="site-header" role="banner">
    <div class="container">
      <div class="header-inner">
        <!-- Hamburger (mobile) -->
        <button class="hamburger" id="hamburger" onclick="openMobileMenu()" aria-label="Menu" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>

        <!-- Logo -->
        <a href="${root}index.html" class="hdr-logo" aria-label="E-Shopia Maroc — Accueil">
          <img src="${root}images/logo.png" alt="E-Shopia Maroc" width="210" height="58">
        </a>

        <!-- Search -->
        <div class="hdr-search" role="search">
          <select class="hdr-search-cat" aria-label="Catégorie">
            <option>Tout</option>
            <option>Électronique</option>
            <option>Informatique</option>
            <option>Téléphone</option>
            <option>Maison</option>
            <option>Mode</option>
            <option>Sport</option>
            <option>Gaming</option>
          </select>
          <input class="hdr-search-inp" id="hdrSearch" type="text" placeholder="Rechercher produits, marques, modèles…" aria-label="Recherche">
          <button class="hdr-search-btn" onclick="doSearch()" aria-label="Lancer la recherche">
            <svg fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            <span>Rechercher</span>
          </button>
        </div>

        <!-- Actions -->
        <div class="hdr-actions">
          <button class="hdr-act" onclick="typeof openModal==='function' && openModal('loginModal')" aria-label="Mon compte">
            <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            <span>Compte</span>
          </button>
          <div class="hdr-divider"></div>
          <a href="${root}pages/cart.html" class="hdr-act" aria-label="Panier">
            <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M6 2 3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
            <span>Panier</span>
            <span class="hdr-cart-badge cart-n" style="display:${cnt ? "flex" : "none"}">${cnt}</span>
          </a>
        </div>
      </div>
    </div>
  </header>`;

  const megaNav = buildMegaNav(root);

  return topbar + header + megaNav;
}

/* ══════════════════════════════════════════════
   Mobile Menu Controls
   ══════════════════════════════════════════════ */
function openMobileMenu() {
  const drawer = document.getElementById("mobileDrawer");
  const ham = document.getElementById("hamburger");
  if (drawer) { drawer.classList.add("open"); document.body.style.overflow = "hidden"; }
  if (ham) { ham.classList.add("open"); ham.setAttribute("aria-expanded", "true"); }
}
function closeMobileMenu() {
  const drawer = document.getElementById("mobileDrawer");
  const ham = document.getElementById("hamburger");
  if (drawer) { drawer.classList.remove("open"); document.body.style.overflow = ""; }
  if (ham) { ham.classList.remove("open"); ham.setAttribute("aria-expanded", "false"); }
}
function toggleMobCat(i) {
  const hd = document.getElementById(`mob-hd-${i}`);
  const sub = document.getElementById(`mob-sub-${i}`);
  if (!hd || !sub) return;
  const isOpen = sub.classList.contains("open");
  // Close all
  document.querySelectorAll(".mob-sub.open").forEach(s => s.classList.remove("open"));
  document.querySelectorAll(".mob-cat-hd.open").forEach(h => h.classList.remove("open"));
  // Toggle current
  if (!isOpen) { sub.classList.add("open"); hd.classList.add("open"); }
}

/* Keyboard: close mega on Escape */
document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeMobileMenu();
});

/* ── Override old buildNav ── */
function buildNav(root = "") {
  return buildHeader(root);
}
