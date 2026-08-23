'use strict';
/* ============================================================
   E-SHOPIA — api.js v2
   Backend: https://eshopia-backend.onrender.com/api
   Usage: set window.ESHOPIA_API_URL before loading this file
   ============================================================ */

const API_URL = window.ESHOPIA_API_URL || 'https://eshopia-backend.onrender.com/api';

/* ── Core fetch wrapper ── */
const _api = {
  async req(method, path, body, auth=false){
    const headers = {'Content-Type':'application/json'};
    if(auth){
      const token = localStorage.getItem('eshopia_token');
      if(token) headers['Authorization'] = `Bearer ${token}`;
    }
    try {
      const res = await fetch(`${API_URL}${path}`, {
        method, headers,
        body: body ? JSON.stringify(body) : undefined
      });
      const data = await res.json();
      if(!res.ok) throw new Error(data.message || 'Request failed');
      return data;
    } catch(err) {
      console.warn(`[API] ${method} ${path}:`, err.message);
      throw err;
    }
  },
  get:    (path, auth)       => _api.req('GET',    path, null, auth),
  post:   (path, body, auth) => _api.req('POST',   path, body, auth),
  put:    (path, body, auth) => _api.req('PUT',    path, body, auth),
  delete: (path, auth)       => _api.req('DELETE', path, null, auth),
};

/* ── Auth ── */
const AuthAPI = {
  async login(email, password){
    const data = await _api.post('/auth/login', {email, password});
    localStorage.setItem('eshopia_token', data.token);
    localStorage.setItem('eshopia_user',  JSON.stringify(data.user));
    return data;
  },
  async register(name, email, password, phone){
    const data = await _api.post('/auth/register', {name, email, password, phone});
    localStorage.setItem('eshopia_token', data.token);
    localStorage.setItem('eshopia_user',  JSON.stringify(data.user));
    return data;
  },
  logout(){
    localStorage.removeItem('eshopia_token');
    localStorage.removeItem('eshopia_user');
    window.location.reload();
  },
  getUser(){
    try{ return JSON.parse(localStorage.getItem('eshopia_user')); }catch{ return null; }
  },
  isLoggedIn(){ return !!localStorage.getItem('eshopia_token'); }
};

/* ── Orders ── */
const OrdersAPI = {
  async place(orderData){
    const ref = localStorage.getItem('eshopia_ref');
    if(ref) orderData.affiliateCode = ref;
    try {
      const result = await _api.post('/orders', orderData);
      localStorage.removeItem('eshopia_cart');
      localStorage.removeItem('eshopia_ref');
      return result;
    } catch(err) {
      // Save offline
      const pending = JSON.parse(localStorage.getItem('eshopia_pending')||'[]');
      pending.push({...orderData, ts: Date.now()});
      localStorage.setItem('eshopia_pending', JSON.stringify(pending));
      throw err;
    }
  },
  async syncPending(){
    const pending = JSON.parse(localStorage.getItem('eshopia_pending')||'[]');
    if(!pending.length) return;
    for(const o of pending){ try{ await _api.post('/orders', o); }catch{} }
    localStorage.removeItem('eshopia_pending');
  }
};

/* ── Affiliate tracking ── */
const AffiliateTrack = {
  init(){
    const ref = new URLSearchParams(window.location.search).get('ref');
    if(ref){
      localStorage.setItem('eshopia_ref', ref);
      _api.post('/affiliate/click', {code: ref}).catch(()=>{});
    }
  },
  getCode(){ return localStorage.getItem('eshopia_ref'); }
};

/* ── Patch login modal to use real API ── */
function patchLoginModal(){
  const loginBtn = document.querySelector('#p-login .btn-grad');
  const regBtn   = document.querySelector('#p-register .btn-grad');
  if(loginBtn && !loginBtn.dataset.patched){
    loginBtn.dataset.patched = '1';
    loginBtn.onclick = async function(e){
      e.preventDefault();
      const email = document.querySelector('#p-login input[type="text"]')?.value ||
                    document.querySelector('#p-login input:first-child')?.value;
      const pass  = document.querySelector('#p-login input[type="password"]')?.value;
      if(!email||!pass){ toast('Veuillez remplir tous les champs','error'); return; }
      try {
        const data = await AuthAPI.login(email, pass);
        toast(`Bienvenue ${data.user.name} !`, 'success');
        closeModal('loginModal');
        // Update nav avatar if present
        document.querySelectorAll('.h-btn-name').forEach(el => el.textContent = data.user.name.split(' ')[0]);
      } catch(err){ toast(err.message, 'error'); }
    };
  }
  if(regBtn && !regBtn.dataset.patched){
    regBtn.dataset.patched = '1';
    regBtn.onclick = async function(e){
      e.preventDefault();
      const inputs = document.querySelectorAll('#p-register input');
      const name   = (inputs[0]?.value||'') + ' ' + (inputs[1]?.value||'');
      const email  = inputs[2]?.value;
      const phone  = inputs[3]?.value;
      const pass   = document.querySelector('#p-register input[type="password"]')?.value;
      if(!name.trim()||!email||!pass){ toast('Veuillez remplir tous les champs','error'); return; }
      try {
        const data = await AuthAPI.register(name.trim(), email, pass, phone);
        toast(`Compte créé ! Bienvenue ${data.user.name} 🎉`, 'success');
        closeModal('loginModal');
      } catch(err){ toast(err.message, 'error'); }
    };
  }
}

/* ── Affiliate API ── */
const AffiliateAPI = {
  async getStats(){
    return await _api.get('/affiliate/stats', true);
  },
  async register(code){
    return await _api.post('/affiliate/register', {code}, true);
  },
  async requestPayout(amount, method, iban, note){
    return await _api.post('/affiliate/payout', {amount, method, iban, note}, true);
  },
  async toggle(id, active){
    return await _api.put(`/affiliate/${id}/toggle`, {isActive: active}, true);
  },
  async getAll(){
    return await _api.get('/affiliate/all', true);
  }
};

/* ── Vendor API ── */
const VendorAPI = {
  async getStats(){
    return await _api.get('/marketplace/stats', true);
  },
  async register(data){
    return await _api.post('/marketplace/register', data, true);
  },
  async getProducts(){
    return await _api.get('/marketplace/products', true);
  },
  async addProduct(data){
    return await _api.post('/marketplace/products', data, true);
  },
  async updateProduct(id, data){
    return await _api.put(`/marketplace/products/${id}`, data, true);
  },
  async deleteProduct(id){
    return await _api.delete(`/marketplace/products/${id}`, true);
  },
  async getOrders(){
    return await _api.get('/marketplace/orders', true);
  },
  async saveSettings(data){
    return await _api.put('/marketplace/settings', data, true);
  },
  async approve(id){
    return await _api.put(`/marketplace/${id}/approve`, {}, true);
  },
  async reject(id){
    return await _api.put(`/marketplace/${id}/reject`, {}, true);
  },
  async getAll(){
    return await _api.get('/marketplace/all', true);
  }
};

/* ── Admin API ── */
const AdminAPI = {
  async getOrderStats(){
    return await _api.get('/orders/stats/summary', true);
  },
  async getOrders(params=''){
    return await _api.get(`/orders?limit=200${params}`, true);
  },
  async confirmOrder(id, data){
    return await _api.put(`/orders/${id}/confirm`, data, true);
  },
  async getQueue(){
    return await _api.get('/orders/queue', true);
  },
  async assignNext(){
    return await _api.post('/orders/queue/assign-next', {}, true);
  },
  async getAgents(){
    return await _api.get('/agents', true);
  },
  async addAgent(data){
    return await _api.post('/agents', data, true);
  }
};

/* ── Connection checker ── */
const BackendStatus = {
  async check(){
    try {
      const res = await fetch(`${API_URL}/auth/me`, {
        method:'GET',
        signal: AbortSignal.timeout(4000)
      });
      // 401 = backend online (just not authenticated) — that's fine
      return res.status !== 0;
    } catch {
      return false;
    }
  },
  async showBanner(){
    const ok = await this.check();
    if(!ok){
      const b = document.createElement('div');
      b.style.cssText = 'position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:#fef3c7;border:1px solid #f59e0b;color:#92400e;padding:8px 16px;border-radius:8px;font-size:.75rem;font-weight:600;z-index:9999;max-width:90vw;text-align:center';
      b.textContent = '⚠ Mode démo — backend offline. Les données sont simulées.';
      document.body.appendChild(b);
      setTimeout(()=>b.remove(), 5000);
    }
    return ok;
  }
};

/* ── Auto-init ── */
document.addEventListener('DOMContentLoaded', ()=>{
  AffiliateTrack.init();
  OrdersAPI.syncPending();
  patchLoginModal();
});
