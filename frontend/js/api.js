const API_BASE = 'http://localhost:5000/api';

async function createOrder(orderData) {
    try {
        const response = await fetch(`${API_BASE}/orders`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData)
        });
        if (response.ok) return await response.json();
    } catch (err) {
        console.warn('Backend unavailable, saving order locally.');
    }
    
    // Save locally if backend is down (for Netlify testing)
    let orders = JSON.parse(localStorage.getItem('eshopia_orders') || '[]');
    orderData._id = 'LOCAL_' + Date.now();
    orderData.createdAt = new Date().toISOString();
    orderData.status = orderData.status || 'Pending';
    orders.unshift(orderData);
    localStorage.setItem('eshopia_orders', JSON.stringify(orders));
    return { success: true, order: orderData, isLocal: true };
}
