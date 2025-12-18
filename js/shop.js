// BYFORCEUK Shop Page JavaScript - Enhanced Creative Version with Auto-Scroll

document.addEventListener('DOMContentLoaded', function() {
    initCarousels();
    initAutoScroll();
    initHelpButton();
    initNavigation();
    initAddToCart();
    initCardAnimations();
});

// Carousel functionality with click controls
function initCarousels() {
    const carouselBtns = document.querySelectorAll('.carousel-btn');
    
    carouselBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const carousel = document.getElementById(targetId);
            const scrollAmount = 320;
            
            // Pause auto-scroll temporarily when user clicks
            carousel.dataset.paused = 'true';
            
            // Add click animation
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            if (this.classList.contains('carousel-prev')) {
                carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            } else {
                carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
            
            // Resume auto-scroll after 5 seconds of inactivity
            clearTimeout(carousel.resumeTimer);
            carousel.resumeTimer = setTimeout(() => {
                carousel.dataset.paused = 'false';
            }, 5000);
        });
    });
    
    // Touch/drag scrolling
    const carousels = document.querySelectorAll('.product-carousel');
    
    carousels.forEach(carousel => {
        let isDown = false;
        let startX;
        let scrollLeft;
        
        carousel.addEventListener('mousedown', (e) => {
            isDown = true;
            carousel.style.cursor = 'grabbing';
            startX = e.pageX - carousel.offsetLeft;
            scrollLeft = carousel.scrollLeft;
            
            // Pause auto-scroll when dragging
            carousel.dataset.paused = 'true';
        });
        
        carousel.addEventListener('mouseleave', () => {
            isDown = false;
            carousel.style.cursor = 'grab';
        });
        
        carousel.addEventListener('mouseup', () => {
            isDown = false;
            carousel.style.cursor = 'grab';
            
            // Resume auto-scroll after 5 seconds
            clearTimeout(carousel.resumeTimer);
            carousel.resumeTimer = setTimeout(() => {
                carousel.dataset.paused = 'false';
            }, 5000);
        });
        
        carousel.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - carousel.offsetLeft;
            const walk = (x - startX) * 2;
            carousel.scrollLeft = scrollLeft - walk;
        });
        
        // Touch events for mobile
        carousel.addEventListener('touchstart', () => {
            carousel.dataset.paused = 'true';
        });
        
        carousel.addEventListener('touchend', () => {
            clearTimeout(carousel.resumeTimer);
            carousel.resumeTimer = setTimeout(() => {
                carousel.dataset.paused = 'false';
            }, 5000);
        });
        
        carousel.style.cursor = 'grab';
    });
}

// Auto-scroll functionality
function initAutoScroll() {
    const carousels = document.querySelectorAll('.product-carousel');
    
    carousels.forEach((carousel, index) => {
        carousel.dataset.paused = 'false';
        carousel.dataset.direction = 'left'; // Start scrolling left (right to left)
        
        // Stagger the start of each carousel
        setTimeout(() => {
            startAutoScroll(carousel);
        }, index * 500);
    });
}

function startAutoScroll(carousel) {
    const scrollSpeed = 1; // Pixels per frame
    const scrollInterval = 30; // Milliseconds between frames
    
    setInterval(() => {
        // Don't scroll if paused
        if (carousel.dataset.paused === 'true') return;
        
        const maxScroll = carousel.scrollWidth - carousel.clientWidth;
        const currentScroll = carousel.scrollLeft;
        
        // Check if we need to reverse direction
        if (carousel.dataset.direction === 'left') {
            // Scrolling right to left
            if (currentScroll >= maxScroll - 5) {
                // Reached the end, reverse direction
                carousel.dataset.direction = 'right';
            } else {
                carousel.scrollLeft += scrollSpeed;
            }
        } else {
            // Scrolling left to right
            if (currentScroll <= 5) {
                // Reached the start, reverse direction
                carousel.dataset.direction = 'left';
            } else {
                carousel.scrollLeft -= scrollSpeed;
            }
        }
    }, scrollInterval);
    
    // Pause on hover
    carousel.addEventListener('mouseenter', () => {
        carousel.dataset.paused = 'true';
    });
    
    carousel.addEventListener('mouseleave', () => {
        // Resume after a short delay
        clearTimeout(carousel.resumeTimer);
        carousel.resumeTimer = setTimeout(() => {
            carousel.dataset.paused = 'false';
        }, 1000);
    });
}

// Help button
function initHelpButton() {
    const helpBtn = document.querySelector('.help-btn');
    if (helpBtn) {
        helpBtn.addEventListener('click', function() {
            createHelpModal();
        });
    }
}

function createHelpModal() {
    const modal = document.createElement('div');
    modal.innerHTML = `
        <div class="help-modal-content">
            <h3>🛒 Need Help Shopping?</h3>
            <p>Contact us at:</p>
            <p><strong>📧</strong> info@byforce.uk</p>
            <p><strong>📞</strong> +44 7500 324 868</p>
            <button class="close-modal">CLOSE</button>
        </div>
    `;
    
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
        animation: modalFadeIn 0.4s ease;
        backdrop-filter: blur(5px);
    `;
    
    const content = modal.querySelector('.help-modal-content');
    content.style.cssText = `
        background: linear-gradient(180deg, #5BC8C8, #80DDB8);
        padding: 40px 50px;
        border-radius: 25px;
        text-align: center;
        font-family: 'Press Start 2P', cursive;
        color: #fff;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
        border: 5px solid rgba(255, 255, 255, 0.4);
        animation: modalPop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    `;
    
    content.querySelector('h3').style.cssText = `font-size: 16px; margin-bottom: 25px;`;
    content.querySelectorAll('p').forEach(p => {
        p.style.cssText = `font-size: 10px; margin-bottom: 12px; line-height: 2;`;
    });
    
    const closeBtn = content.querySelector('.close-modal');
    closeBtn.style.cssText = `
        font-family: 'Press Start 2P', cursive;
        font-size: 11px;
        padding: 15px 40px;
        background: #fff;
        color: #333;
        border: 3px solid #ddd;
        border-radius: 10px;
        cursor: pointer;
        margin-top: 20px;
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(modal);
    
    closeBtn.addEventListener('click', () => {
        modal.style.animation = 'modalFadeOut 0.3s ease forwards';
        setTimeout(() => modal.remove(), 300);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.animation = 'modalFadeOut 0.3s ease forwards';
            setTimeout(() => modal.remove(), 300);
        }
    });
}

// Navigation
function initNavigation() {
    const navBtns = document.querySelectorAll('.nav-btn');
    navBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
            }
        });
    });
}

// Add to Cart functionality
function initAddToCart() {
    const cartBtns = document.querySelectorAll('.add-to-cart');
    
    cartBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            const card = this.closest('.product-card');
            const amount = card.querySelector('.price-amount').textContent;
            const label = card.querySelector('.price-label').textContent;
            
            // Visual feedback
            this.textContent = '✓ ADDED!';
            this.style.background = 'linear-gradient(180deg, #5BC8C8, #4aB8B8)';
            this.style.color = '#fff';
            this.style.borderColor = '#3aa8a8';
            
            // Create flying cart animation
            createFlyingItem(e.clientX, e.clientY);
            
            // Create confetti
            for (let i = 0; i < 15; i++) {
                createConfetti(e.clientX, e.clientY);
            }
            
            // Show notification
            showNotification(`${amount} ${label} added to cart! 🛒`);
            
            // Reset button
            setTimeout(() => {
                this.textContent = 'ADD TO CART';
                this.style.background = '';
                this.style.color = '';
                this.style.borderColor = '';
            }, 2000);
        });
    });
}

function createFlyingItem(x, y) {
    const item = document.createElement('div');
    item.textContent = '👟';
    item.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        font-size: 30px;
        pointer-events: none;
        z-index: 9999;
        animation: flyToCart 0.8s ease-in forwards;
    `;
    document.body.appendChild(item);
    setTimeout(() => item.remove(), 800);
}

function createConfetti(x, y) {
    const confetti = document.createElement('div');
    const colors = ['#5BC8C8', '#f1c40f', '#e74c3c', '#9b59b6', '#2ecc71'];
    const angle = Math.random() * Math.PI * 2;
    const velocity = Math.random() * 150 + 50;
    
    confetti.style.cssText = `
        position: fixed;
        width: 10px;
        height: 10px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        left: ${x}px;
        top: ${y}px;
        pointer-events: none;
        z-index: 9999;
        animation: confetti 1s ease-out forwards;
        --tx: ${Math.cos(angle) * velocity}px;
        --ty: ${Math.sin(angle) * velocity - 100}px;
        --r: ${Math.random() * 720}deg;
    `;
    
    document.body.appendChild(confetti);
    setTimeout(() => confetti.remove(), 1000);
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(180deg, #5BC8C8, #4aB8B8);
        color: #fff;
        padding: 18px 35px;
        border-radius: 15px;
        font-family: 'Press Start 2P', cursive;
        font-size: 11px;
        z-index: 1500;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        animation: notifSlide 0.5s ease;
        border: 3px solid rgba(255, 255, 255, 0.3);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'notifSlideOut 0.5s ease forwards';
        setTimeout(() => notification.remove(), 500);
    }, 2500);
}

// Card animations
function initCardAnimations() {
    const cards = document.querySelectorAll('.product-card');
    
    cards.forEach((card, index) => {
        // Add tilt effect on hover
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px) scale(1.03)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

// Add animations
const style = document.createElement('style');
style.textContent = `
    @keyframes modalFadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes modalFadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    
    @keyframes modalPop {
        0% { transform: scale(0.5); opacity: 0; }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); opacity: 1; }
    }
    
    @keyframes flyToCart {
        0% { transform: scale(1) translate(0, 0); opacity: 1; }
        100% { transform: scale(0.3) translate(calc(50vw - 100%), -100px); opacity: 0; }
    }
    
    @keyframes confetti {
        0% { transform: translate(0, 0) rotate(0deg) scale(1); opacity: 1; }
        100% { transform: translate(var(--tx), var(--ty)) rotate(var(--r)) scale(0); opacity: 0; }
    }
    
    @keyframes notifSlide {
        from { transform: translateX(-50%) translateY(-30px); opacity: 0; }
        to { transform: translateX(-50%) translateY(0); opacity: 1; }
    }
    
    @keyframes notifSlideOut {
        from { transform: translateX(-50%) translateY(0); opacity: 1; }
        to { transform: translateX(-50%) translateY(-30px); opacity: 0; }
    }
`;
document.head.appendChild(style);
