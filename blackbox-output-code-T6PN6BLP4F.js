let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const cartTotal = document.getElementById('cartTotal');
    const cartBody = document.getElementById('cartBody');
    
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    if (cart.length === 0) {
        cartBody.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        cartTotal.textContent = '₹0';
        return;
    }
    
    let total = 0;
    cartBody.innerHTML = cart.map(item => {
        total += item.price * item.quantity;
        return `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <h5>${item.name}</h5>
                    <div class="price">₹${item.price}</div>
                </div>
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="changeQuantity('${item.id}', -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="changeQuantity('${item.id}', 1)">+</button>
                </div>
                <button class="remove-btn" onclick="removeFromCart('${item.id}')">×</button>
            </div>
        `;
    }).join('');
    
    cartTotal.textContent = `₹${total}`;
}

function addToCart(productId, name, price, image) {
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name,
            price: parseInt(price),
            image,
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
    
    // Show notification
    showNotification(`${name} added to cart!`);
}

function changeQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            cart = cart.filter(cartItem => cartItem.id !== productId);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartUI();
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Cart Modal Controls
document.getElementById('cartBtn').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('cartModal').classList.add('active');
});

document.getElementById('closeCart').addEventListener('click', () => {
    document.getElementById('cartModal').classList.remove('active');
});

document.querySelector('.cart-overlay').addEventListener('click', () => {
    document.getElementById('cartModal').classList.remove('active');
});

// Initialize
updateCartUI();