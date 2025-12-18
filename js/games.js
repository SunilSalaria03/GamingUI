// BYFORCEUK Games/Rewards Page JavaScript - Enhanced Creative Version

document.addEventListener('DOMContentLoaded', function() {
    initHelpButton();
    initNavigation();
    initDashboardForm();
    initAnimations();
    initIconInteractions();
    initTypingEffect();
});

// Help button
function initHelpButton() {
    const helpBtn = document.querySelector('.help-btn');
    if (helpBtn) {
        helpBtn.addEventListener('click', createHelpModal);
    }
}

function createHelpModal() {
    const modal = document.createElement('div');
    modal.innerHTML = `
        <div class="help-modal-content">
            <h3>🎮 Gamer Help Center</h3>
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

// Dashboard Form
function initDashboardForm() {
    const form = document.getElementById('dashboardForm');
    if (!form) return;
    
    const emailInput = form.querySelector('.email-input');
    const accessBtn = form.querySelector('.access-btn');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        
        if (email) {
            // Loading animation
            accessBtn.innerHTML = '<span class="loading-dots">ACCESSING</span>';
            accessBtn.style.pointerEvents = 'none';
            
            // Create loading effect
            let dots = 0;
            const loadingInterval = setInterval(() => {
                dots = (dots + 1) % 4;
                accessBtn.innerHTML = `ACCESSING${'.'.repeat(dots)}`;
            }, 300);
            
            // Simulate dashboard access
            setTimeout(() => {
                clearInterval(loadingInterval);
                showDashboardModal(email);
                accessBtn.textContent = 'ACCESS DASHBOARD';
                accessBtn.style.pointerEvents = '';
                emailInput.value = '';
            }, 2000);
        }
    });
    
    // Input focus effects with particles
    emailInput.addEventListener('focus', function() {
        createInputSparkles(this);
    });
}

function createInputSparkles(element) {
    const rect = element.getBoundingClientRect();
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.textContent = '✨';
            sparkle.style.cssText = `
                position: fixed;
                left: ${rect.left + Math.random() * rect.width}px;
                top: ${rect.top - 10}px;
                font-size: 15px;
                pointer-events: none;
                z-index: 9999;
                animation: sparkleUp 0.8s ease-out forwards;
            `;
            document.body.appendChild(sparkle);
            setTimeout(() => sparkle.remove(), 800);
        }, i * 50);
    }
}

// Show Dashboard Modal
function showDashboardModal(email) {
    const modal = document.createElement('div');
    modal.innerHTML = `
        <div class="dashboard-modal-content">
            <div class="modal-confetti"></div>
            <div class="dashboard-header">
                <h3>🎮 GAMER DASHBOARD 🏆</h3>
            </div>
            <div class="dashboard-body">
                <p class="user-email">${email}</p>
                <div class="points-display">
                    <span class="points-label">YOUR POINTS</span>
                    <span class="points-value">0</span>
                    <div class="points-ring"></div>
                </div>
                <div class="rewards-status">
                    <p>Level up by shopping!</p>
                    <p class="reward-rate">🪙 1 POINT = £1 SPENT</p>
                </div>
                <div class="tier-info">
                    <span class="tier-badge">⭐ NEW MEMBER ⭐</span>
                </div>
                <div class="achievement-bar">
                    <div class="achievement-fill"></div>
                    <span class="achievement-text">0/100 to Bronze</span>
                </div>
            </div>
            <button class="close-dashboard">START SHOPPING</button>
        </div>
    `;
    
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.85);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
        animation: modalFadeIn 0.4s ease;
        backdrop-filter: blur(8px);
    `;
    
    const content = modal.querySelector('.dashboard-modal-content');
    content.style.cssText = `
        background: linear-gradient(180deg, #5BC8C8 0%, #4aB8B8 50%, #3aa8a8 100%);
        padding: 0;
        border-radius: 25px;
        text-align: center;
        font-family: 'Press Start 2P', cursive;
        color: #fff;
        box-shadow: 0 25px 80px rgba(0, 0, 0, 0.5), 0 0 100px rgba(91, 200, 200, 0.3);
        border: 5px solid rgba(255, 255, 255, 0.4);
        min-width: 380px;
        max-width: 95%;
        overflow: hidden;
        animation: dashboardPop 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        position: relative;
    `;
    
    const header = modal.querySelector('.dashboard-header');
    header.style.cssText = `
        background: linear-gradient(180deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.2));
        padding: 25px;
        border-bottom: 3px solid rgba(255, 255, 255, 0.2);
    `;
    
    header.querySelector('h3').style.cssText = `
        font-size: 15px;
        margin: 0;
        text-shadow: 3px 3px 0 rgba(0, 0, 0, 0.3);
        animation: headerGlow 2s ease-in-out infinite alternate;
    `;
    
    const body = modal.querySelector('.dashboard-body');
    body.style.cssText = `padding: 30px 35px;`;
    
    modal.querySelector('.user-email').style.cssText = `
        font-size: 8px;
        opacity: 0.9;
        margin-bottom: 25px;
        word-break: break-all;
    `;
    
    const pointsDisplay = modal.querySelector('.points-display');
    pointsDisplay.style.cssText = `
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.15));
        border-radius: 20px;
        padding: 25px;
        margin-bottom: 25px;
        position: relative;
        overflow: hidden;
    `;
    
    modal.querySelector('.points-label').style.cssText = `
        display: block;
        font-size: 9px;
        opacity: 0.8;
        margin-bottom: 12px;
    `;
    
    modal.querySelector('.points-value').style.cssText = `
        display: block;
        font-size: 45px;
        text-shadow: 4px 4px 0 rgba(0, 0, 0, 0.3);
        animation: pointsPulse 1s ease-in-out infinite;
    `;
    
    // Points ring animation
    const ring = modal.querySelector('.points-ring');
    ring.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 120px;
        height: 120px;
        border: 3px solid rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        animation: ringExpand 2s ease-out infinite;
    `;
    
    modal.querySelector('.reward-rate').style.cssText = `
        font-size: 10px !important;
        background: linear-gradient(90deg, rgba(241, 196, 15, 0.3), rgba(241, 196, 15, 0.1));
        padding: 12px 20px;
        border-radius: 25px;
        display: inline-block;
        border: 2px solid rgba(241, 196, 15, 0.5);
    `;
    
    modal.querySelector('.tier-badge').style.cssText = `
        display: inline-block;
        background: linear-gradient(180deg, #f1c40f, #f39c12);
        color: #333;
        font-size: 9px;
        padding: 12px 25px;
        border-radius: 25px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        animation: badgeShine 3s linear infinite;
    `;
    
    // Achievement bar
    const achieveBar = modal.querySelector('.achievement-bar');
    achieveBar.style.cssText = `
        margin-top: 20px;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 15px;
        padding: 8px;
        position: relative;
    `;
    
    const achieveFill = modal.querySelector('.achievement-fill');
    achieveFill.style.cssText = `
        height: 20px;
        background: linear-gradient(90deg, #f1c40f, #e67e22);
        border-radius: 10px;
        width: 0%;
        transition: width 1s ease;
    `;
    
    modal.querySelector('.achievement-text').style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 7px;
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
    `;
    
    const closeBtn = modal.querySelector('.close-dashboard');
    closeBtn.style.cssText = `
        font-family: 'Press Start 2P', cursive;
        font-size: 11px;
        padding: 18px 45px;
        background: linear-gradient(180deg, #fff, #f0f0f0);
        color: #333;
        border: none;
        border-radius: 0 0 20px 20px;
        cursor: pointer;
        width: 100%;
        transition: all 0.3s ease;
        box-shadow: inset 0 3px 0 rgba(255, 255, 255, 0.5);
    `;
    
    document.body.appendChild(modal);
    
    // Animate points counter
    let points = 0;
    const pointsValue = modal.querySelector('.points-value');
    const targetPoints = Math.floor(Math.random() * 200 + 50);
    
    setTimeout(() => {
        const countUp = setInterval(() => {
            if (points < targetPoints) {
                points += Math.ceil(targetPoints / 30);
                if (points > targetPoints) points = targetPoints;
                pointsValue.textContent = points;
                
                // Update achievement bar
                const progress = Math.min((points / 100) * 100, 100);
                achieveFill.style.width = progress + '%';
            } else {
                clearInterval(countUp);
                // Celebration!
                createConfetti(modal);
            }
        }, 40);
    }, 500);
    
    // Close handlers
    closeBtn.addEventListener('mouseenter', () => {
        closeBtn.style.background = 'linear-gradient(180deg, #5BC8C8, #4aB8B8)';
        closeBtn.style.color = '#fff';
    });
    
    closeBtn.addEventListener('mouseleave', () => {
        closeBtn.style.background = 'linear-gradient(180deg, #fff, #f0f0f0)';
        closeBtn.style.color = '#333';
    });
    
    closeBtn.addEventListener('click', () => {
        modal.style.animation = 'modalFadeOut 0.4s ease forwards';
        setTimeout(() => modal.remove(), 400);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.animation = 'modalFadeOut 0.4s ease forwards';
            setTimeout(() => modal.remove(), 400);
        }
    });
}

function createConfetti(container) {
    const colors = ['#f1c40f', '#e74c3c', '#9b59b6', '#3498db', '#2ecc71'];
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.textContent = ['🎉', '⭐', '🏆', '💰', '✨'][Math.floor(Math.random() * 5)];
            confetti.style.cssText = `
                position: fixed;
                left: ${Math.random() * 100}vw;
                top: -20px;
                font-size: ${Math.random() * 20 + 15}px;
                pointer-events: none;
                z-index: 9999;
                animation: confettiFall ${Math.random() * 2 + 2}s linear forwards;
            `;
            document.body.appendChild(confetti);
            setTimeout(() => confetti.remove(), 4000);
        }, i * 100);
    }
}

// Initialize animations
function initAnimations() {
    const icons = document.querySelectorAll('.icon-lock, .icon-target');
    icons.forEach((icon, index) => {
        icon.style.cursor = 'pointer';
    });
}

// Icon interactions
function initIconInteractions() {
    const lockIcon = document.querySelector('.icon-lock');
    const targetIcon = document.querySelector('.icon-target');
    
    if (lockIcon) {
        lockIcon.addEventListener('click', () => {
            lockIcon.style.animation = 'iconShake 0.5s ease';
            setTimeout(() => lockIcon.style.animation = 'iconBounce 2s ease-in-out infinite', 500);
            showTooltip(lockIcon, '🔐 Secure Login!');
        });
    }
    
    if (targetIcon) {
        targetIcon.addEventListener('click', () => {
            targetIcon.style.animation = 'iconSpin 0.5s ease';
            setTimeout(() => targetIcon.style.animation = 'iconBounce 2s ease-in-out 0.3s infinite', 500);
            showTooltip(targetIcon, '🎯 Earn Points!');
        });
    }
}

function showTooltip(element, text) {
    const tooltip = document.createElement('div');
    tooltip.textContent = text;
    const rect = element.getBoundingClientRect();
    
    tooltip.style.cssText = `
        position: fixed;
        left: ${rect.left + rect.width/2}px;
        top: ${rect.top - 10}px;
        transform: translateX(-50%);
        background: rgba(0, 0, 0, 0.8);
        color: #fff;
        padding: 8px 15px;
        border-radius: 8px;
        font-family: 'Press Start 2P', cursive;
        font-size: 8px;
        pointer-events: none;
        z-index: 9999;
        animation: tooltipPop 0.3s ease, tooltipFade 0.3s ease 1.5s forwards;
    `;
    
    document.body.appendChild(tooltip);
    setTimeout(() => tooltip.remove(), 2000);
}

// Typing effect for welcome text
function initTypingEffect() {
    const welcomeText = document.querySelector('.welcome-text');
    if (!welcomeText) return;
    
    const originalText = welcomeText.textContent;
    welcomeText.textContent = '';
    welcomeText.style.opacity = '1';
    
    let i = 0;
    const typeInterval = setInterval(() => {
        if (i < originalText.length) {
            welcomeText.textContent += originalText[i];
            i++;
        } else {
            clearInterval(typeInterval);
        }
    }, 80);
}

// Add all animations
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
    
    @keyframes dashboardPop {
        0% { transform: scale(0.3) rotateY(90deg); opacity: 0; }
        50% { transform: scale(1.05) rotateY(0deg); }
        100% { transform: scale(1) rotateY(0deg); opacity: 1; }
    }
    
    @keyframes sparkleUp {
        0% { transform: translateY(0) scale(1); opacity: 1; }
        100% { transform: translateY(-40px) scale(0); opacity: 0; }
    }
    
    @keyframes pointsPulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
    
    @keyframes ringExpand {
        0% { transform: translate(-50%, -50%) scale(0.5); opacity: 1; }
        100% { transform: translate(-50%, -50%) scale(2); opacity: 0; }
    }
    
    @keyframes headerGlow {
        0% { text-shadow: 3px 3px 0 rgba(0, 0, 0, 0.3); }
        100% { text-shadow: 3px 3px 0 rgba(0, 0, 0, 0.3), 0 0 20px rgba(255, 255, 255, 0.5); }
    }
    
    @keyframes badgeShine {
        0%, 100% { filter: brightness(1); }
        50% { filter: brightness(1.3); }
    }
    
    @keyframes confettiFall {
        0% { transform: translateY(0) rotate(0deg); opacity: 1; }
        100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
    }
    
    @keyframes iconShake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px) rotate(-10deg); }
        75% { transform: translateX(10px) rotate(10deg); }
    }
    
    @keyframes iconSpin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    @keyframes tooltipPop {
        0% { transform: translateX(-50%) translateY(10px) scale(0.8); opacity: 0; }
        100% { transform: translateX(-50%) translateY(0) scale(1); opacity: 1; }
    }
    
    @keyframes tooltipFade {
        to { opacity: 0; transform: translateX(-50%) translateY(-10px); }
    }
`;
document.head.appendChild(style);
