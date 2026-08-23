'use strict';
/* ============================================================
   E-SHOPIA — features.js
   Live search · WhatsApp auto · Avis · Fidélité · Tracking
   Flash sales · SEO · Comparateur
   ============================================================ */

/* ══════════════════════════════════════
   1. RECHERCHE INTELLIGENTE LIVE
══════════════════════════════════════ */
const SearchLive = {
  init() {
    const input = document.getElementById('navSearch') || document.getElementById('hdrSearch');
    if (!input) return;
    const wrap = input.closest('.search-wrap');
    if (!wrap) return;

    // Create dropdown
    const drop = document.createElement('div');
    drop.id = 'search-live-drop';
    drop.style.cssText = `position:absolute;top:100%;left:0;right:0;background:#fff;border:1.5px solid #1565c0;border-top:none;border-radius:0 0 14px 14px;box-shadow:0 8px 24px rgba(0,0,0,.1);z-index:1000;display:none;max-height:400px;overflow-y:auto`;
    wrap.style.position = 'relative';
    wrap.appendChild(drop);

    let timer;
    input.addEventListener('input', () => {
      clearTimeout(timer);
      const q = input.value.trim();
      if (q.length < 2) { drop.style.display = 'none'; return; }
      timer = setTimeout(() => SearchLive.search(q, drop, input), 180);
    });

    input.addEventListener('keydown', e => {
      if (e.key === 'Escape') { drop.style.display = 'none'; input.blur(); }
    });

    document.addEventListener('click', e => {
      if (!wrap.contains(e.target)) drop.style.display = 'none';
    });
  },

  search(q, drop, input) {
    const ql = q.toLowerCase();
    const results = (window.PRODUCTS || []).filter(p =>
      p.name.toLowerCase().includes(ql) ||
      p.cat.toLowerCase().includes(ql) ||
      p.desc?.toLowerCase().includes(ql)
    ).slice(0, 7);

    // Save to history
    const hist = JSON.parse(localStorage.getItem('eshopia_searches') || '[]');
    if (q.length > 3 && !hist.includes(q)) {
      hist.unshift(q);
      localStorage.setItem('eshopia_searches', JSON.stringify(hist.slice(0, 6)));
    }

    const root = window.location.pathname.includes('/pages/') ? '../' : '';
    if (!results.length) {
      drop.style.display = 'block';
      drop.innerHTML = `<div style="padding:16px;text-align:center;color:#94a3b8;font-size:.85rem">Aucun résultat pour "${q}"</div>`;
      return;
    }

    drop.style.display = 'block';
    drop.innerHTML = `
      <div style="padding:8px 14px 4px;font-size:.7rem;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:.06em">Résultats (${results.length})</div>
      ${results.map(p => {
        const d = p.old ? Math.round((1 - p.price/p.old)*100) : 0;
        return `<div onclick="window.location='${root}pages/product.html?id=${p.id}'" style="display:flex;align-items:center;gap:12px;padding:10px 14px;cursor:pointer;border-top:1px solid #f1f5f9;transition:.15s" onmouseover="this.style.background='#f8fafc'" onmouseout="this.style.background=''">
          <span style="font-size:1.6rem;flex-shrink:0;width:36px;text-align:center">${p.img}</span>
          <div style="flex:1;min-width:0">
            <div style="font-size:.85rem;font-weight:600;color:#0f172a;overflow:hidden;white-space:nowrap;text-overflow:ellipsis">${p.name}</div>
            <div style="font-size:.75rem;color:#64748b">${p.cat}</div>
          </div>
          <div style="text-align:right;flex-shrink:0">
            <div style="font-size:.88rem;font-weight:800;color:#1565c0">${p.price} DH</div>
            ${d > 0 ? `<div style="font-size:.7rem;color:#e8193c;font-weight:700">-${d}%</div>` : ''}
          </div>
        </div>`;
      }).join('')}
      <div onclick="window.location='${root}pages/category.html?search=${encodeURIComponent(q)}'" style="padding:10px 14px;text-align:center;font-size:.8rem;color:#1565c0;font-weight:700;cursor:pointer;border-top:1px solid #e2e8f0" onmouseover="this.style.background='#eff6ff'" onmouseout="this.style.background=''">
        Voir tous les résultats pour "${q}" →
      </div>`;
  }
};

/* ══════════════════════════════════════
   2. WHATSAPP NOTIFICATIONS AUTO
══════════════════════════════════════ */
const WhatsAppAuto = {
  PHONE: '212702010303',

  // Called after order placed
  orderConfirmed(order) {
    const msg = encodeURIComponent(
      `🛒 *Nouvelle commande E-Shopia !*\n\n` +
      `📦 Commande: ${order.orderNumber || 'ESH-' + Date.now()}\n` +
      `👤 Client: ${order.client?.name || order.name}\n` +
      `📞 Tél: ${order.client?.phone || order.phone}\n` +
      `📍 Ville: ${order.client?.city || order.city}\n` +
      `📍 Adresse: ${order.client?.address || order.address}\n` +
      `💰 Total: ${order.total} DH\n` +
      `💵 Paiement: Cash à la livraison\n\n` +
      `✅ Merci pour votre commande ! Notre équipe vous contactera sous peu.`
    );
    // Client confirmation message
    const clientMsg = encodeURIComponent(
      `✅ *Commande confirmée — E-Shopia Maroc*\n\n` +
      `Bonjour ${order.client?.name || order.name} !\n\n` +
      `Votre commande a bien été reçue.\n` +
      `💰 Total: ${order.total} DH (paiement à la livraison)\n` +
      `🚚 Livraison: 24-48h\n\n` +
      `Notre équipe vous appellera pour confirmer. Merci !`
    );
    // Store for later use
    localStorage.setItem('eshopia_last_order_wa', JSON.stringify({ msg, clientMsg, order }));
    return { msg, clientMsg };
  },

  // Abandon cart reminder — called after 2h without purchase
  checkAbandon() {
    const cart = JSON.parse(localStorage.getItem('esm4_cart') || '[]');
    if (!cart.length) return;
    const ts = localStorage.getItem('eshopia_cart_ts');
    if (!ts) { localStorage.setItem('eshopia_cart_ts', Date.now()); return; }
    const diff = Date.now() - parseInt(ts);
    const TWO_HOURS = 2 * 60 * 60 * 1000;
    if (diff > TWO_HOURS && !localStorage.getItem('eshopia_abandon_sent')) {
      localStorage.setItem('eshopia_abandon_sent', '1');
      // Show reminder banner
      WhatsAppAuto.showAbandonBanner();
    }
  },

  showAbandonBanner() {
    const cart = JSON.parse(localStorage.getItem('esm4_cart') || '[]');
    if (!cart.length) return;
    const total = cart.reduce((s, i) => {
      const p = (window.PRODUCTS || []).find(x => x.id === i.id);
      return s + (p ? p.price * i.qty : 0);
    }, 0);
    const root = window.location.pathname.includes('/pages/') ? '../' : '';
    const banner = document.createElement('div');
    banner.innerHTML = `
      <div id="abandon-banner" style="position:fixed;bottom:72px;right:16px;background:#fff;border:2px solid #1565c0;border-radius:16px;padding:16px;max-width:280px;box-shadow:0 8px 32px rgba(21,101,192,.2);z-index:9998;animation:slideUp .3s ease">
        <button onclick="this.closest('#abandon-banner').remove()" style="position:absolute;top:8px;right:10px;background:none;border:none;color:#94a3b8;font-size:1.1rem;cursor:pointer">×</button>
        <div style="font-size:1.4rem;margin-bottom:8px">🛒</div>
        <div style="font-weight:700;font-size:.88rem;margin-bottom:4px">Vous avez oublié quelque chose !</div>
        <div style="font-size:.78rem;color:#64748b;margin-bottom:12px">Votre panier de <strong style="color:#1565c0">${total} DH</strong> vous attend.</div>
        <a href="${root}pages/cart.html" style="display:block;background:#1565c0;color:#fff;text-align:center;padding:8px;border-radius:10px;font-size:.82rem;font-weight:700;text-decoration:none">Finaliser ma commande →</a>
      </div>`;
    document.body.appendChild(banner);
  }
};

// Check abandon on load
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => WhatsAppAuto.checkAbandon(), 5000);
});

/* ══════════════════════════════════════
   3. AVIS CLIENTS — post-livraison
══════════════════════════════════════ */
const Reviews = {
  // Show review request after simulated delivery
  checkPendingReview() {
    const orders = JSON.parse(localStorage.getItem('eshopia_delivered') || '[]');
    if (!orders.length) return;
    const pending = orders.find(o => !o.reviewed);
    if (!pending) return;
    setTimeout(() => Reviews.showPrompt(pending), 3000);
  },

  showPrompt(order) {
    const modal = document.createElement('div');
    modal.innerHTML = `
      <div id="review-modal" style="position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:9999;display:flex;align-items:center;justify-content:center;padding:16px">
        <div style="background:#fff;border-radius:20px;padding:28px;max-width:400px;width:100%;text-align:center">
          <div style="font-size:2.5rem;margin-bottom:12px">⭐</div>
          <h3 style="font-family:'Poppins',sans-serif;font-weight:800;font-size:1.1rem;margin-bottom:8px">Votre avis nous intéresse !</h3>
          <p style="font-size:.85rem;color:#64748b;margin-bottom:20px">Comment s'est passée votre commande ${order.id || ''} ?</p>
          <div id="star-rating" style="display:flex;justify-content:center;gap:8px;margin-bottom:20px;font-size:2rem;cursor:pointer">
            ${[1,2,3,4,5].map(i => `<span data-r="${i}" onclick="Reviews.setRating(${i})" style="transition:.15s" onmouseover="Reviews.hoverRating(${i})" onmouseout="Reviews.resetHover()">☆</span>`).join('')}
          </div>
          <textarea id="review-text" placeholder="Partagez votre expérience…" style="width:100%;padding:10px;border:1.5px solid #e2e8f0;border-radius:12px;font-size:.85rem;resize:none;height:80px;margin-bottom:16px;font-family:inherit"></textarea>
          <div style="display:flex;gap:10px">
            <button onclick="document.getElementById('review-modal').remove()" style="flex:1;padding:10px;border:1.5px solid #e2e8f0;border-radius:12px;font-size:.85rem;cursor:pointer;background:transparent">Plus tard</button>
            <button onclick="Reviews.submit('${order.id}')" style="flex:2;padding:10px;background:#1565c0;color:#fff;border:none;border-radius:12px;font-size:.85rem;font-weight:700;cursor:pointer">Publier mon avis</button>
          </div>
        </div>
      </div>`;
    document.body.appendChild(modal);
    Reviews._selected = 0;
  },

  _selected: 0,
  setRating(r) {
    Reviews._selected = r;
    document.querySelectorAll('#star-rating span').forEach((s, i) => {
      s.textContent = i < r ? '★' : '☆';
      s.style.color = i < r ? '#f59e0b' : '#94a3b8';
    });
  },
  hoverRating(r) {
    document.querySelectorAll('#star-rating span').forEach((s, i) => {
      s.textContent = i < r ? '★' : '☆';
      s.style.color = i < r ? '#f59e0b' : '#94a3b8';
    });
  },
  resetHover() { Reviews.setRating(Reviews._selected); },
  submit(orderId) {
    if (!Reviews._selected) { if(window.toast) toast('Sélectionnez une note', 'error'); return; }
    document.getElementById('review-modal')?.remove();
    if(window.toast) toast('Merci pour votre avis ! ⭐', 'success');
    const orders = JSON.parse(localStorage.getItem('eshopia_delivered') || '[]');
    const o = orders.find(x => x.id === orderId);
    if (o) { o.reviewed = true; localStorage.setItem('eshopia_delivered', JSON.stringify(orders)); }
  }
};

/* ══════════════════════════════════════
   4. PROGRAMME FIDÉLITÉ POINTS
══════════════════════════════════════ */
const Loyalty = {
  RATE: 1,        // 1 point per DH
  VALUE: 0.1,     // 1 point = 0.10 DH

  getPoints() { return parseInt(localStorage.getItem('eshopia_points') || '0'); },
  addPoints(amount) {
    const pts = this.getPoints() + Math.floor(amount * this.RATE);
    localStorage.setItem('eshopia_points', pts);
    return pts;
  },
  getDiscount() { return Math.floor(this.getPoints() * this.VALUE); },
  usePoints(pts) {
    const cur = this.getPoints();
    if (pts > cur) return false;
    localStorage.setItem('eshopia_points', cur - pts);
    return true;
  },

  buildWidget(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;
    const pts = this.getPoints();
    const disc = this.getDiscount();
    el.innerHTML = `
      <div style="background:linear-gradient(135deg,#1565c0,#7c3aed);border-radius:16px;padding:18px;color:#fff;text-align:center">
        <div style="font-size:.75rem;font-weight:700;opacity:.8;text-transform:uppercase;letter-spacing:.07em;margin-bottom:6px">Mes Points Fidélité</div>
        <div style="font-size:2.5rem;font-weight:900;font-family:'Poppins',sans-serif;line-height:1">${pts.toLocaleString('fr-FR')}</div>
        <div style="font-size:.78rem;opacity:.8;margin-top:4px">= ${disc} DH de réduction disponible</div>
        ${pts >= 100 ? `<button onclick="Loyalty.showRedeem()" style="margin-top:14px;background:rgba(255,255,255,.2);border:1px solid rgba(255,255,255,.35);color:#fff;padding:8px 18px;border-radius:20px;font-size:.8rem;font-weight:700;cursor:pointer">Utiliser mes points</button>` : `<div style="margin-top:12px;font-size:.75rem;opacity:.7">Encore ${100 - pts} points pour votre première réduction</div>`}
      </div>`;
  },

  showRedeem() {
    const pts = this.getPoints();
    const disc = this.getDiscount();
    if (window.toast) toast(`${pts} points = ${disc} DH de réduction appliqués !`, 'success');
  },

  // Add points after order
  onOrderComplete(total) {
    const earned = Math.floor(total * this.RATE);
    this.addPoints(total);
    if (window.toast) toast(`+${earned} points fidélité gagnés !`, 'info');
  }
};

/* ══════════════════════════════════════
   5. TRACKING COMMANDE PUBLIC
══════════════════════════════════════ */
const TrackOrder = {

  /* ── Public: build the tracking page ──────────────────── */
  buildPage(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;
    const params  = new URLSearchParams(window.location.search);
    const trackId = params.get('track') || params.get('order');

    el.innerHTML = `<div style="max-width:580px;margin:0 auto">
      ${!trackId
        ? TrackOrder._renderSearchForm()
        : '<div id="track-result" style="min-height:220px;display:flex;align-items:center;justify-content:center"><div class="track-spinner">⏳</div></div>'
      }
    </div>`;

    if (trackId) TrackOrder._fetchAndRender(trackId);
  },

  /* ── Search form ───────────────────────────────────────── */
  _renderSearchForm() {
    return `
      <div style="background:#fff;border-radius:18px;padding:28px;border:1px solid #e2e8f0;box-shadow:0 2px 12px rgba(0,0,0,.05)">
        <div style="text-align:center;margin-bottom:22px">
          <div style="font-size:2.4rem;margin-bottom:8px">📦</div>
          <h2 style="font-family:'Poppins',sans-serif;font-size:1.15rem;font-weight:800;margin-bottom:4px" data-i18n="track_title">Suivre ma commande</h2>
          <p style="font-size:.8rem;color:#64748b" data-i18n="track_hint">Entrez votre numéro de commande (ESH-XXXXXXXX) ou votre téléphone</p>
        </div>
        <div style="margin-bottom:14px">
          <input id="track-input"
            placeholder="ESH-12345678 ou 06XXXXXXXX" data-i18n-ph="track_ph"
            style="width:100%;padding:13px 16px;border:1.5px solid #e2e8f0;border-radius:12px;font-size:.95rem;outline:none;box-sizing:border-box"
            onkeydown="if(event.key==='Enter')TrackOrder.search()">
        </div>
        <button onclick="TrackOrder.search()"
          style="width:100%;background:#1565c0;color:#fff;border:none;padding:13px;border-radius:12px;font-size:.92rem;font-weight:700;cursor:pointer">
          🔍 Rechercher ma commande
        </button>
        <div style="margin-top:18px;background:#f0fdf4;border-radius:12px;padding:12px 16px;font-size:.78rem;color:#166534;display:flex;align-items:center;gap:8px">
          <span>💡</span><span>Le numéro de commande vous a été envoyé par WhatsApp après votre commande.</span>
        </div>
      </div>`;
  },

  search() {
    const v = document.getElementById('track-input')?.value?.trim();
    if (!v) return;
    window.location.href = `?track=${encodeURIComponent(v)}`;
  },

  /* ── Fetch real data from backend ──────────────────────── */
  async _fetchAndRender(id) {
    const el = document.getElementById('track-result');
    if (!el) return;

    const API = window.ESHOPIA_API_URL || 'https://eshopia-backend.onrender.com/api';

    try {
      const res  = await fetch(`${API}/tracking/${encodeURIComponent(id.toUpperCase())}`);
      const data = await res.json();

      if (!res.ok || !data.tracking) {
        el.innerHTML = TrackOrder._renderNotFound(id);
        return;
      }

      el.innerHTML = TrackOrder._renderStatus(data.tracking);

    } catch (err) {
      // Network offline — try localStorage fallback
      const localOrder = TrackOrder._localFallback(id);
      el.innerHTML = localOrder
        ? TrackOrder._renderOfflineStatus(localOrder)
        : TrackOrder._renderError(id);
    }
  },

  /* ── LocalStorage fallback (when order was placed on this device) ─ */
  _localFallback(id) {
    try {
      const last = JSON.parse(localStorage.getItem('eshopia_last_order') || 'null');
      if (last && (last.orderNumber === id.toUpperCase() || last.phone === id)) return last;
    } catch {}
    return null;
  },

  /* ── Render full status timeline ───────────────────────── */
  _renderStatus(t) {
    const statusColor = {
      pending:   { bg: '#fef3c7', text: '#92400e', label: '⏳ En attente de confirmation' },
      confirmed: { bg: '#dbeafe', text: '#1e40af', label: '✅ Confirmée' },
      shipped:   { bg: '#ede9fe', text: '#5b21b6', label: '🚚 En livraison' },
      delivered: { bg: '#d1fae5', text: '#065f46', label: '🎉 Livrée' },
      refused:   { bg: '#fee2e2', text: '#991b1b', label: '❌ Refusée' },
      cancelled: { bg: '#f3f4f6', text: '#374151', label: '🚫 Annulée' },
    };
    const sc = statusColor[t.status] || statusColor.pending;

    const allSteps = [
      { key: 'pending',   icon: '📋', label: (window.i18n ? i18n.t('track_step1') : 'Commande reçue') },
      { key: 'confirmed', icon: '📞', label: (window.i18n ? i18n.t('track_step2') : 'Commande confirmée') },
      { key: 'shipped',   icon: '📦', label: (window.i18n ? i18n.t('track_step3') : 'Expédiée') },
      { key: 'delivered', icon: '🎉', label: (window.i18n ? i18n.t('track_step4') : 'Livrée') },
    ];
    const ORDER = ['pending','confirmed','shipped','delivered'];
    const currentIdx = ORDER.indexOf(t.status);

    const timelineHtml = !t.isCancelled
      ? allSteps.map((s, i) => {
          const done   = i <= currentIdx;
          const active = i === currentIdx;
          const ts     = (t.timeline || []).find(e => e.status === s.key);
          const dateStr = ts ? new Date(ts.timestamp).toLocaleDateString('fr-MA', { day:'numeric', month:'short', hour:'2-digit', minute:'2-digit' }) : '—';
          return `
            <div style="display:flex;gap:14px;align-items:flex-start">
              <div style="display:flex;flex-direction:column;align-items:center">
                <div style="width:38px;height:38px;border-radius:50%;
                  background:${done ? '#1565c0' : '#f1f5f9'};
                  border:2px solid ${active ? '#1565c0' : done ? '#1565c0' : '#e2e8f0'};
                  display:flex;align-items:center;justify-content:center;
                  font-size:${done ? '1.1' : '1'}rem;flex-shrink:0;
                  ${active ? 'box-shadow:0 0 0 4px rgba(21,101,192,.15)' : ''}">
                  ${s.icon}
                </div>
                ${i < allSteps.length - 1 ? `<div style="width:2px;height:28px;background:${done && i < currentIdx ? '#1565c0' : '#e2e8f0'};margin:4px 0"></div>` : ''}
              </div>
              <div style="padding-top:7px">
                <div style="font-size:.88rem;font-weight:${done ? '700' : '400'};color:${done ? '#0f172a' : '#94a3b8'}">${s.label}</div>
                <div style="font-size:.73rem;color:${done ? '#64748b' : '#cbd5e1'};margin-top:2px">${dateStr}</div>
              </div>
            </div>`;
        }).join('')
      : `<div style="text-align:center;padding:20px 0">
           <div style="font-size:2.5rem;margin-bottom:10px">❌</div>
           <div style="font-weight:700;color:#991b1b;margin-bottom:4px">Cette commande a été ${t.status === 'refused' ? 'refusée' : 'annulée'}</div>
           <div style="font-size:.8rem;color:#64748b">Pour toute question, contactez-nous sur WhatsApp.</div>
         </div>`;

    return `
      <div style="background:#fff;border-radius:18px;padding:24px;border:1px solid #e2e8f0;box-shadow:0 2px 12px rgba(0,0,0,.05)">

        <!-- Header -->
        <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:20px;flex-wrap:wrap;gap:8px">
          <div>
            <div style="font-family:'Poppins',sans-serif;font-weight:800;font-size:1.05rem">${t.orderNumber}</div>
            <div style="font-size:.78rem;color:#64748b;margin-top:3px">${t.itemCount || '—'} article(s) · ${t.city || ''} · ${t.total || '—'} DH COD</div>
          </div>
          <span style="background:${sc.bg};color:${sc.text};font-size:.72rem;font-weight:700;padding:5px 13px;border-radius:20px;white-space:nowrap">${sc.label}</span>
        </div>

        <!-- Timeline -->
        <div style="margin-bottom:20px">${timelineHtml}</div>

        ${t.trackingCode ? `
        <div style="background:#f0fdf4;border-radius:12px;padding:12px 14px;margin-bottom:14px;font-size:.8rem;color:#166534">
          📬 Code de suivi livraison: <strong>${t.trackingCode}</strong>
        </div>` : ''}

        <!-- Info box -->
        <div style="background:#eff6ff;border-radius:12px;padding:12px 14px;font-size:.8rem;color:#1e40af;margin-bottom:16px">
          💬 Pour toute question: <a href="https://wa.me/212702010303" style="color:#1d4ed8;font-weight:700">Contactez-nous sur WhatsApp →</a>
        </div>

        <div style="display:flex;gap:10px;flex-wrap:wrap">
          <button onclick="window.location.href='?'" style="flex:1;background:transparent;border:1px solid #e2e8f0;color:#64748b;padding:9px;border-radius:10px;font-size:.8rem;cursor:pointer;min-width:120px">← Autre commande</button>
          <a href="../index.html" style="flex:1;background:#1565c0;color:#fff;border:none;padding:9px;border-radius:10px;font-size:.8rem;font-weight:700;cursor:pointer;text-align:center;text-decoration:none;display:block;min-width:120px">Continuer mes achats →</a>
        </div>
      </div>`;
  },

  /* ── Offline fallback using localStorage ───────────────── */
  _renderOfflineStatus(order) {
    return `
      <div style="background:#fff;border-radius:18px;padding:24px;border:1px solid #e2e8f0">
        <div style="text-align:center;margin-bottom:16px">
          <div style="font-size:2rem;margin-bottom:8px">📵</div>
          <div style="font-weight:700;font-size:.95rem;margin-bottom:4px">Mode hors ligne</div>
          <div style="font-size:.8rem;color:#64748b">Informations depuis votre appareil</div>
        </div>
        <div style="background:#f8fafc;border-radius:12px;padding:14px;font-size:.85rem">
          <div><strong>Commande:</strong> ${order.orderNumber || '—'}</div>
          <div style="margin-top:4px"><strong>Total:</strong> ${order.total || '—'} DH</div>
          <div style="margin-top:4px"><strong>Statut:</strong> En traitement</div>
        </div>
        <a href="https://wa.me/212702010303" style="display:block;margin-top:14px;background:#25d366;color:#fff;text-align:center;padding:10px;border-radius:10px;font-size:.85rem;font-weight:700;text-decoration:none">💬 Vérifier sur WhatsApp</a>
      </div>`;
  },

  _renderNotFound(id) {
    return `
      <div style="background:#fff;border-radius:18px;padding:28px;border:1px solid #e2e8f0;text-align:center">
        <div style="font-size:2.5rem;margin-bottom:12px">🔍</div>
        <div style="font-weight:800;font-size:1rem;margin-bottom:8px">Commande introuvable</div>
        <p style="font-size:.83rem;color:#64748b;margin-bottom:20px">
          Numéro <strong>${id}</strong> non trouvé.<br>Vérifiez le numéro reçu par WhatsApp.
        </p>
        <button onclick="window.location.href='?'" style="background:#1565c0;color:#fff;border:none;padding:10px 24px;border-radius:10px;font-size:.85rem;font-weight:700;cursor:pointer">Réessayer</button>
      </div>`;
  },

  _renderError(id) {
    return `
      <div style="background:#fff;border-radius:18px;padding:28px;border:1px solid #e2e8f0;text-align:center">
        <div style="font-size:2.5rem;margin-bottom:12px">⚠️</div>
        <div style="font-weight:700;margin-bottom:8px">Erreur de connexion</div>
        <p style="font-size:.82rem;color:#64748b;margin-bottom:20px">Vérifiez votre connexion et réessayez.</p>
        <button onclick="TrackOrder._fetchAndRender('${id}')" style="background:#1565c0;color:#fff;border:none;padding:10px 24px;border-radius:10px;font-size:.85rem;font-weight:700;cursor:pointer;margin-right:8px">🔄 Réessayer</button>
        <a href="https://wa.me/212702010303" style="display:inline-block;background:#25d366;color:#fff;padding:10px 24px;border-radius:10px;font-size:.85rem;font-weight:700;text-decoration:none">WhatsApp</a>
      </div>`;
  },
};
/* ══════════════════════════════════════
   6. FLASH SALES PLANIFIÉES
══════════════════════════════════════ */
const FlashSales = {
  // Admin sets flash sales via dashboard
  // Here we manage the live display

  buildTimer(containerId, endTime) {
    const el = document.getElementById(containerId);
    if (!el) return;
    function update() {
      const diff = Math.max(0, endTime - Date.now());
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      el.innerHTML = `
        <div style="display:flex;gap:6px">
          ${[[h,'H'],[m,'M'],[s,'S']].map(([n,l]) => `
            <div style="background:rgba(255,255,255,.15);border-radius:8px;padding:4px 8px;text-align:center;min-width:42px">
              <div style="font-size:1.3rem;font-weight:900;font-family:'Poppins',sans-serif;line-height:1">${String(n).padStart(2,'0')}</div>
              <div style="font-size:.65rem;opacity:.7">${l}</div>
            </div>`).join('')}
        </div>`;
      if (diff > 0) setTimeout(update, 1000);
    }
    update();
  },

  // Add "expire dans X" badge to product cards
  addBadgeToCards() {
    const end = new Date(); end.setHours(23, 59, 59, 0);
    document.querySelectorAll('.pcard').forEach(card => {
      if (card.querySelector('.flash-badge')) return;
      const badge = document.createElement('div');
      badge.className = 'flash-badge';
      const diff = end - Date.now();
      const h = Math.floor(diff / 3600000);
      badge.style.cssText = `position:absolute;bottom:8px;left:8px;background:#e8193c;color:#fff;font-size:.65rem;font-weight:700;padding:2px 7px;border-radius:10px;z-index:2`;
      badge.textContent = `⚡ Expire dans ${h}h`;
      const img = card.querySelector('.pcard-img');
      if (img) { img.style.position = 'relative'; img.appendChild(badge); }
    });
  }
};

/* ══════════════════════════════════════
   7. SEO — Schema.org + Meta dynamiques
══════════════════════════════════════ */
const SEO = {
  // Inject product schema on product page
  injectProductSchema(product) {
    if (!product) return;
    const schema = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": product.name,
      "description": product.desc,
      "image": `https://eshopia.ma/images/products/${product.id}.jpg`,
      "brand": { "@type": "Brand", "name": "E-Shopia Maroc" },
      "offers": {
        "@type": "Offer",
        "price": product.price,
        "priceCurrency": "MAD",
        "availability": product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
        "seller": { "@type": "Organization", "name": "E-Shopia Maroc" }
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": product.rating,
        "reviewCount": product.rev
      }
    };
    const s = document.createElement('script');
    s.type = 'application/ld+json';
    s.textContent = JSON.stringify(schema);
    document.head.appendChild(s);
  },

  // Update meta tags dynamically
  updateMeta(title, desc, image) {
    document.title = title + ' — E-Shopia Maroc';
    const setMeta = (name, val, prop = 'name') => {
      let el = document.querySelector(`meta[${prop}="${name}"]`);
      if (!el) { el = document.createElement('meta'); el.setAttribute(prop, name); document.head.appendChild(el); }
      el.setAttribute('content', val);
    };
    setMeta('description', desc);
    setMeta('og:title', title, 'property');
    setMeta('og:description', desc, 'property');
    if (image) setMeta('og:image', image, 'property');
  },

  // Generate sitemap entries (for backend)
  getSitemapEntries() {
    const base = 'https://eshopia.ma';
    const pages = ['/', '/pages/category.html', '/pages/affiliate.html', '/pages/vendor.html'];
    const products = (window.PRODUCTS || []).map(p => `/pages/product.html?id=${p.id}`);
    return [...pages, ...products].map(url => `<url><loc>${base}${url}</loc><changefreq>weekly</changefreq></url>`).join('\n');
  }
};

/* ══════════════════════════════════════
   8. COMPARATEUR DE PRODUITS
══════════════════════════════════════ */
const Comparator = {
  _list: [],
  MAX: 3,

  add(productId) {
    if (this._list.includes(productId)) {
      if (window.toast) toast('Produit déjà dans la comparaison', 'info');
      return;
    }
    if (this._list.length >= this.MAX) {
      if (window.toast) toast(`Maximum ${this.MAX} produits à comparer`, 'error');
      return;
    }
    this._list.push(productId);
    this._save();
    this._updateBar();
    if (window.toast) toast('Ajouté à la comparaison', 'success');
  },

  remove(productId) {
    this._list = this._list.filter(id => id !== productId);
    this._save();
    this._updateBar();
  },

  _save() { localStorage.setItem('eshopia_compare', JSON.stringify(this._list)); },
  _load() { this._list = JSON.parse(localStorage.getItem('eshopia_compare') || '[]'); },

  _updateBar() {
    let bar = document.getElementById('compare-bar');
    if (!this._list.length) { bar?.remove(); return; }
    const products = (window.PRODUCTS || []).filter(p => this._list.includes(p.id));
    const root = window.location.pathname.includes('/pages/') ? '../' : '';
    if (!bar) {
      bar = document.createElement('div');
      bar.id = 'compare-bar';
      bar.style.cssText = 'position:fixed;bottom:0;left:0;right:0;background:#0f172a;color:#fff;z-index:9997;padding:10px 16px;display:flex;align-items:center;gap:12px;box-shadow:0 -4px 20px rgba(0,0,0,.3)';
      document.body.appendChild(bar);
    }
    bar.innerHTML = `
      <span style="font-size:.8rem;font-weight:700;opacity:.7;flex-shrink:0">Comparer (${products.length}/${this.MAX})</span>
      <div style="display:flex;gap:8px;flex:1;overflow-x:auto">
        ${products.map(p => `
          <div style="display:flex;align-items:center;gap:6px;background:rgba(255,255,255,.08);border-radius:8px;padding:5px 10px;white-space:nowrap;font-size:.78rem">
            <span>${p.img}</span><span>${p.name.split('—')[0].trim()}</span>
            <button onclick="Comparator.remove(${p.id})" style="background:none;border:none;color:rgba(255,255,255,.5);font-size:.9rem;cursor:pointer;padding:0 2px">×</button>
          </div>`).join('')}
      </div>
      ${products.length > 1 ? `<button onclick="Comparator.showModal()" style="background:#1565c0;border:none;color:#fff;padding:8px 16px;border-radius:10px;font-size:.8rem;font-weight:700;cursor:pointer;flex-shrink:0">Comparer →</button>` : ''}
      <button onclick="Comparator._list=[];Comparator._save();Comparator._updateBar()" style="background:rgba(255,255,255,.08);border:none;color:rgba(255,255,255,.6);padding:8px 12px;border-radius:10px;font-size:.75rem;cursor:pointer;flex-shrink:0">Vider</button>`;
  },

  showModal() {
    const products = (window.PRODUCTS || []).filter(p => this._list.includes(p.id));
    const root = window.location.pathname.includes('/pages/') ? '../' : '';
    const fields = ['cat', 'price', 'old', 'rating', 'rev', 'stock'];
    const labels = { cat: 'Catégorie', price: 'Prix', old: 'Prix original', rating: 'Note', rev: 'Avis', stock: 'Stock' };
    const fmt = (p, f) => f === 'price' || f === 'old' ? (p[f] ? p[f] + ' DH' : '—') : (p[f] || '—');

    const modal = document.createElement('div');
    modal.innerHTML = `
      <div id="compare-modal" style="position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:10000;display:flex;align-items:center;justify-content:center;padding:16px">
        <div style="background:#fff;border-radius:20px;padding:24px;max-width:700px;width:100%;max-height:90vh;overflow-y:auto">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px">
            <h3 style="font-family:'Poppins',sans-serif;font-weight:800;font-size:1rem">Comparaison de produits</h3>
            <button onclick="document.getElementById('compare-modal').remove()" style="background:none;border:none;font-size:1.4rem;color:#94a3b8;cursor:pointer">×</button>
          </div>
          <div style="overflow-x:auto">
            <table style="width:100%;border-collapse:collapse;font-size:.85rem">
              <thead>
                <tr>
                  <th style="text-align:left;padding:8px;color:#64748b;font-size:.75rem;text-transform:uppercase;letter-spacing:.05em;border-bottom:2px solid #e2e8f0;min-width:100px">Caractéristique</th>
                  ${products.map(p => `<th style="text-align:center;padding:8px;border-bottom:2px solid #e2e8f0">
                    <div style="font-size:2rem;margin-bottom:4px">${p.img}</div>
                    <div style="font-size:.78rem;font-weight:700;line-height:1.2;max-width:120px">${p.name.split('—')[0].trim()}</div>
                  </th>`).join('')}
                </tr>
              </thead>
              <tbody>
                ${fields.map(f => `
                  <tr style="border-bottom:1px solid #f1f5f9">
                    <td style="padding:10px 8px;color:#64748b;font-weight:600;font-size:.8rem">${labels[f]}</td>
                    ${products.map(p => `<td style="padding:10px 8px;text-align:center;font-weight:${f==='price'?'800':'400'};color:${f==='price'?'#1565c0':'#0f172a'}">${fmt(p, f)}</td>`).join('')}
                  </tr>`).join('')}
              </tbody>
            </table>
          </div>
          <div style="display:flex;gap:10px;margin-top:20px;justify-content:flex-end">
            ${products.map(p => `<a href="${root}pages/product.html?id=${p.id}" style="background:#1565c0;color:#fff;padding:8px 16px;border-radius:10px;font-size:.82rem;font-weight:700;text-decoration:none">Voir ${p.name.split(' ')[0]}</a>`).join('')}
          </div>
        </div>
      </div>`;
    document.body.appendChild(modal);
  }
};

// Load comparator state on init
Comparator._load();
document.addEventListener('DOMContentLoaded', () => Comparator._updateBar());

// Add "Comparer" button to product cards (called after cards are rendered)
function addCompareButtons() {
  document.querySelectorAll('.pcard').forEach(card => {
    if (card.querySelector('.compare-btn')) return;
    const body = card.querySelector('.pcard-body');
    if (!body) return;
    const pid = card.querySelector('[onclick*="product.html"]')?.getAttribute('onclick')?.match(/id=(\d+)/)?.[1];
    if (!pid) return;
    const btn = document.createElement('button');
    btn.className = 'compare-btn';
    btn.style.cssText = 'width:100%;background:transparent;border:1px solid #e2e8f0;color:#64748b;padding:5px;border-radius:8px;font-size:.75rem;cursor:pointer;margin-top:4px;transition:.15s';
    btn.textContent = '⚖ Comparer';
    btn.onclick = e => { e.stopPropagation(); Comparator.add(parseInt(pid)); };
    body.appendChild(btn);
  });
}

// Run after DOM is ready and products are rendered
document.addEventListener('DOMContentLoaded', () => {
  SearchLive.init();
  setTimeout(addCompareButtons, 800);
  setTimeout(FlashSales.addBadgeToCards, 800);
  Reviews.checkPendingReview();
});
