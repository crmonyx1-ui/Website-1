// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Animate elements on scroll
document.querySelectorAll('.product-card, .feature-card, .category-card, .stat-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Stats Animation
function animateStats() {
    document.querySelectorAll('.stat-number').forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        let count = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            count += increment;
            if (count >= target) {
                stat.textContent = target.toLocaleString();
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(count).toLocaleString();
            }
        }, 30);
    });
}

// Load Featured Products
async function loadFeaturedProducts() {
    const products = [
        {
            id: '1',
            name: 'Luxe Velvet Sofa',
            price: 45999,
            image: 'images/sofa1.jpg',
            rating: 4.8,
            badge: 'Bestseller'
        },
        {
            id: '2',
            name: 'Modern Dining Set',
            price: 89999,
            image: 'images/dining1.jpg',
            rating: 4.9,
            badge: 'New'
        },
        // Add more products...
    ];
    
    const grid = document.getElementById('featuredProducts');
    grid.innerHTML = products.map(product => `
        <div class="product-card" data-product-id="${product.id}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                <div class="product-badge">${product.badge}</div>
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="product-rating">
                    ${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5-Math.floor(product.rating))}
                    <span>(${product.rating})</span>
                </div>
                <div class="product-price">₹${product.price.toLocaleString()}</div>
                <button class="add-to-cart" onclick="addToCart('${product.id}', '${product.name}', ${product.price}, '${product.image}')">
                    Add to Cart
                </button>
            </div>
        </div>
    `).join('');
}

// Initialize
loadFeaturedProducts();
animateStats();