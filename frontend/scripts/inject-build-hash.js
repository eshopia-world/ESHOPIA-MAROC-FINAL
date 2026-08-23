#!/usr/bin/env node
/* ============================================================
   Build script: inject unique hash into sw.js
   Runs automatically on every Netlify deploy via netlify.toml
   ============================================================ */
const fs   = require('fs');
const path = require('path');

const hash = process.env.COMMIT_REF?.slice(0, 8)   // Netlify git commit hash
          || process.env.BUILD_HASH                  // manual override
          || Date.now().toString(36);                // timestamp fallback

const swPath = path.join(__dirname, '..', 'sw.js');
let   swContent = fs.readFileSync(swPath, 'utf8');

swContent = swContent.replace(/__BUILD_HASH_PLACEHOLDER__/g, hash);
fs.writeFileSync(swPath, swContent);

console.log(`✅ SW cache key injected: eshopia-${hash}`);
