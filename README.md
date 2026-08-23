# 🛒 E-Shopia Maroc — Dossier Final Complet

## 📁 Structure

```
ESHOPIA-MAROC-FINAL/
├── frontend/          ← Tout le site (Netlify)
│   ├── index.html
│   ├── sw.js          ← Service Worker (cache dynamique)
│   ├── netlify.toml   ← Config Netlify + proxy API
│   ├── css/
│   │   ├── style.css  ← Styles + RTL arabe
│   │   └── megamenu.css
│   ├── js/
│   │   ├── i18n.js    ← FR/AR/EN (193 clés)
│   │   ├── script.js  ← Logique principale
│   │   ├── api.js     ← Appels backend
│   │   ├── features.js← Tracking, Flash, Comparateur
│   │   ├── pwa.js     ← PWA + Update banner
│   │   └── megamenu.js
│   ├── pages/
│   │   ├── checkout.html      ← Commande COD réelle
│   │   ├── tracking.html      ← Suivi commande réel
│   │   ├── product.html       ← Page produit
│   │   ├── category.html      ← Catalogue
│   │   ├── cart.html          ← Panier
│   │   ├── compte.html        ← Mon compte
│   │   ├── dashboard.html     ← Admin dashboard
│   │   ├── affiliate-dashboard.html
│   │   └── vendor-dashboard.html
│   └── scripts/
│       └── inject-build-hash.js ← Fix cache SW
│
└── backend/           ← API Node.js (Render)
    ├── package.json
    ├── .env.example
    ├── scripts/seed.js
    └── src/
        ├── server.js
        ├── models/    ← User, Order, Product, Affiliate, Vendor
        ├── routes/    ← auth, orders, products, affiliate, marketplace...
        ├── services/  ← fraud, notify (WhatsApp), scheduler
        └── utils/     ← logger
```

## 🚀 Déploiement (4 étapes)

### 1. MongoDB Atlas (gratuit)
- cloud.mongodb.com → Cluster M0 → copier la connection string

### 2. Backend sur Render
```bash
# Connecter GitHub → New Web Service
# Build: npm install | Start: npm start
# Health: /api/health
```
Variables d'environnement à ajouter dans Render:
```
NODE_ENV=production
MONGODB_URI=mongodb+srv://...
JWT_SECRET=votre_secret_64_chars
JWT_EXPIRES_IN=15m
JWT_REFRESH_SECRET=autre_secret_different
JWT_REFRESH_EXPIRES_IN=7d
FRONTEND_URL=https://votre-site.netlify.app
```

### 3. Initialiser la DB
```bash
cd backend
npm install
node scripts/seed.js
```
Crée: 16 produits + admin@eshopia.ma / Admin@2024!

### 4. Frontend sur Netlify
Remplacer dans TOUS les fichiers HTML:
```
window.ESHOPIA_API_URL = "https://VOTRE-APP.onrender.com/api"
```
Puis deploy sur Netlify.

## 🌍 Langues (i18n)
- FR 🇫🇷 / AR 🇲🇦 / EN 🇬🇧
- RTL automatique pour l'arabe
- 193 clés traduites

## 🔐 Sécurité
- 3 commandes max/IP/heure
- Score fraude 0-100 sur chaque commande
- Commission affilié UNIQUEMENT après livraison
- Tokens JWT 15min + refresh 7j

## 📞 Comptes test (après seed)
- admin@eshopia.ma / Admin@2024!
- sara@eshopia.ma / Agent@2024!
- client@eshopia.ma / Client@2024!
