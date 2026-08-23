'use strict';
/* ============================================================
   E-SHOPIA MAROC — PWA & Service Worker Manager
   - Dynamic cache versioning (no more stale deploys)
   - Update banner when new version available
   ============================================================ */

const PWA = {
  _registration: null,

  init() {
    if (!('serviceWorker' in navigator)) return;

    navigator.serviceWorker.register('/sw.js', { scope: '/' })
      .then(reg => {
        PWA._registration = reg;

        // Check for updates on every page load
        reg.update();

        // New SW waiting = update available
        reg.addEventListener('updatefound', () => {
          const newWorker = reg.installing;
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              PWA._showUpdateBanner(newWorker);
            }
          });
        });
      })
      .catch(err => console.warn('[PWA] SW registration failed:', err));

    // When SW takes control (after update), reload to use new cache
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (PWA._reloading) return;
      PWA._reloading = true;
      window.location.reload();
    });
  },

  _showUpdateBanner(worker) {
    // Remove existing banner if any
    document.getElementById('sw-update-banner')?.remove();

    const banner = document.createElement('div');
    banner.id = 'sw-update-banner';
    banner.className = 'sw-update-banner';
    banner.innerHTML = `
      <span>🆕 Nouvelle version disponible !</span>
      <button class="sw-update-btn" id="sw-update-apply">Mettre à jour</button>
      <button onclick="document.getElementById('sw-update-banner').remove()"
        style="background:transparent;border:none;color:rgba(255,255,255,.6);font-size:1rem;cursor:pointer;padding:0 4px">×</button>
    `;
    document.body.appendChild(banner);

    document.getElementById('sw-update-apply').addEventListener('click', () => {
      worker.postMessage({ type: 'SKIP_WAITING' });
      banner.remove();
    });

    // Auto-dismiss after 15 seconds
    setTimeout(() => banner?.remove(), 15000);
  },

  // Force update check (callable from console)
  checkUpdate() {
    this._registration?.update();
  },
};

// ── Init on load ─────────────────────────────────────────────
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => PWA.init());
} else {
  PWA.init();
}

// ── A2HS (Add to Home Screen) prompt ─────────────────────────
let _deferredPrompt = null;

window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault();
  _deferredPrompt = e;

  // Show install button if it exists on the page
  const installBtn = document.getElementById('a2hs-btn');
  if (installBtn) {
    installBtn.style.display = 'flex';
    installBtn.addEventListener('click', () => {
      _deferredPrompt.prompt();
      _deferredPrompt.userChoice.then(() => {
        _deferredPrompt = null;
        installBtn.style.display = 'none';
      });
    });
  }
});
