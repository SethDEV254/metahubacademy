// Store Page JavaScript

// Category filtering
document.addEventListener('DOMContentLoaded', function() {
    const categoryCards = document.querySelectorAll('.category-card');
    const productCards = document.querySelectorAll('.product-card');
    const sortSelect = document.querySelector('.sort-select');
    const searchInput = document.querySelector('.search-input');

    // Category filtering
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove active class from all categories
            categoryCards.forEach(c => c.classList.remove('active'));
            // Add active class to clicked category
            this.classList.add('active');
            
            const category = this.dataset.category;
            filterProducts(category);
        });
    });

    function filterProducts(category) {
        productCards.forEach(card => {
            if (category === 'all' || card.dataset.category === category) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 50);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    }

    // Sorting functionality
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            const sortBy = this.value;
            sortProducts(sortBy);
        });
    }

    function sortProducts(sortBy) {
        const productsGrid = document.querySelector('.products-grid');
        const products = Array.from(productCards);
        
        products.sort((a, b) => {
            switch(sortBy) {
                case 'price-low':
                    return getPrice(a) - getPrice(b);
                case 'price-high':
                    return getPrice(b) - getPrice(a);
                case 'newest':
                    return b.querySelector('.product-badge.new') ? 1 : -1;
                default:
                    return 0;
            }
        });
        
        products.forEach(product => {
            productsGrid.appendChild(product);
        });
    }

    function getPrice(productCard) {
        const priceText = productCard.querySelector('.current-price').textContent;
        return parseInt(priceText.replace('$', ''));
    }

    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            searchProducts(searchTerm);
        });
    }

    function searchProducts(searchTerm) {
        productCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Add to cart functionality
    const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            
            // Add animation
            this.style.transform = 'scale(0.95)';
            this.textContent = 'Added!';
            this.style.background = '#10b981';
            
            setTimeout(() => {
                this.style.transform = 'scale(1)';
                this.textContent = 'Add to Cart';
                this.style.background = '';
            }, 1500);
            
            // Show notification
            showNotification(`${productName} added to cart!`);
        });
    });

    // Quick view functionality
    const quickViewBtns = document.querySelectorAll('.quick-view-btn');
    quickViewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            showNotification(`Quick view for ${productName} - Feature coming soon!`);
        });
    });

    // Newsletter subscription
    const newsletterBtn = document.querySelector('.newsletter-btn');
    const newsletterInput = document.querySelector('.newsletter-input');
    
    if (newsletterBtn) {
        newsletterBtn.addEventListener('click', function() {
            const email = newsletterInput.value;
            if (validateEmail(email)) {
                showNotification('Successfully subscribed to newsletter!');
                newsletterInput.value = '';
            } else {
                showNotification('Please enter a valid email address.');
            }
        });
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--gradient-primary);
            color: white;
            padding: 1rem 2rem;
            border-radius: 10px;
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Add CSS for notifications
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});