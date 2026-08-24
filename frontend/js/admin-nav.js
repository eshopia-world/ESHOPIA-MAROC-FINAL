document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.sidebar a, .nav-item, [data-section]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const text = link.textContent.trim().toLowerCase();
            if (text.includes('orders') || link.getAttribute('href') === '#orders') {
                e.preventDefault();
                showSection('orders-section');
            } else if (text.includes('products')) {
                e.preventDefault();
                showSection('products-section');
            } else if (text.includes('dashboard')) {
                e.preventDefault();
                showSection('dashboard-overview');
            }
        });
    });

    function showSection(sectionId) {
        document.querySelectorAll('.main-content > div, section').forEach(sec => {
            if (sec.id) sec.style.display = 'none';
        });
        const target = document.getElementById(sectionId);
        if (target) {
            target.style.display = 'block';
        } else {
            // Scroll to orders if present on main view
            const ordersTable = document.querySelector('.orders-table, #orders, .recent-orders');
            if (ordersTable) ordersTable.scrollIntoView({ behavior: 'smooth' });
        }
    }
});
