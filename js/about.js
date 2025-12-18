// BYFORCEUK About Page JavaScript - Enhanced Creative Version

document.addEventListener('DOMContentLoaded', function() {
    initHelpButton();
    initNavigation();
    initAudioPlayer();
    initMusicVisualizer();
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
            <h3>🎵 Audio Help</h3>
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

// Audio Player with enhanced effects
function initAudioPlayer() {
    const playBtn = document.getElementById('playAudioBtn');
    const audio = document.getElementById('backgroundAudio');
    
    if (!playBtn || !audio) return;
    
    const audioText = playBtn.querySelector('.audio-text');
    const audioIcon = playBtn.querySelector('.audio-icon');
    
    let isPlaying = false;
    let visualizerInterval;
    
    playBtn.addEventListener('click', function() {
        if (isPlaying) {
            // Stop
            audio.pause();
            audioText.textContent = 'Play Audio';
            playBtn.classList.remove('playing');
            isPlaying = false;
            stopVisualizer();
        } else {
            // Play
            audio.play().then(() => {
                audioText.textContent = '⏸ Pause';
                playBtn.classList.add('playing');
                isPlaying = true;
                startVisualizer();
            }).catch(error => {
                // Demo mode - no audio file
                audioText.textContent = '🎵 Playing...';
                playBtn.classList.add('playing');
                isPlaying = true;
                startVisualizer();
                showAudioNotification('🎧 Audio player active! Add your music to assets/audio/');
            });
        }
        
        // Button click effect
        createClickWave(this);
    });
    
    audio.addEventListener('ended', function() {
        audioText.textContent = 'Play Audio';
        playBtn.classList.remove('playing');
        isPlaying = false;
        stopVisualizer();
    });
    
    function startVisualizer() {
        const bars = document.querySelectorAll('.visualizer-bar');
        bars.forEach(bar => bar.style.animationPlayState = 'running');
    }
    
    function stopVisualizer() {
        const bars = document.querySelectorAll('.visualizer-bar');
        bars.forEach(bar => bar.style.animationPlayState = 'paused');
    }
}

// Create click wave effect
function createClickWave(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            const wave = document.createElement('div');
            wave.style.cssText = `
                position: fixed;
                left: ${centerX}px;
                top: ${centerY}px;
                width: 10px;
                height: 10px;
                border: 3px solid rgba(91, 200, 200, 0.8);
                border-radius: 50%;
                transform: translate(-50%, -50%);
                pointer-events: none;
                z-index: 9999;
                animation: waveExpand 1s ease-out forwards;
            `;
            document.body.appendChild(wave);
            setTimeout(() => wave.remove(), 1000);
        }, i * 150);
    }
}

// Music Visualizer
function initMusicVisualizer() {
    const audioSection = document.querySelector('.audio-section');
    if (!audioSection) return;
    
    // Create visualizer container
    const visualizer = document.createElement('div');
    visualizer.className = 'music-visualizer';
    visualizer.style.cssText = `
        display: flex;
        justify-content: center;
        align-items: flex-end;
        gap: 6px;
        height: 60px;
        margin-top: 25px;
    `;
    
    // Create bars
    for (let i = 0; i < 12; i++) {
        const bar = document.createElement('div');
        bar.className = 'visualizer-bar';
        bar.style.cssText = `
            width: 12px;
            height: ${Math.random() * 40 + 10}px;
            background: linear-gradient(180deg, #fff, rgba(255,255,255,0.5));
            border-radius: 6px;
            animation: barBounce ${0.3 + Math.random() * 0.4}s ease-in-out infinite alternate;
            animation-play-state: paused;
            animation-delay: ${i * 0.05}s;
            box-shadow: 0 0 10px rgba(255,255,255,0.3);
        `;
        visualizer.appendChild(bar);
    }
    
    audioSection.appendChild(visualizer);
    
    // Add floating music notes
    createFloatingNotes();
}

// Floating music notes
function createFloatingNotes() {
    const notes = ['🎵', '🎶', '🎧', '🔊', '♪', '♫'];
    
    setInterval(() => {
        if (document.querySelector('.audio-btn.playing')) {
            const note = document.createElement('div');
            note.textContent = notes[Math.floor(Math.random() * notes.length)];
            note.style.cssText = `
                position: fixed;
                left: ${Math.random() * 80 + 10}vw;
                bottom: 100px;
                font-size: ${Math.random() * 20 + 20}px;
                pointer-events: none;
                z-index: 100;
                animation: noteFloat ${Math.random() * 3 + 3}s ease-out forwards;
                opacity: 0.7;
            `;
            document.body.appendChild(note);
            setTimeout(() => note.remove(), 6000);
        }
    }, 800);
}

// Show notification
function showAudioNotification(message) {
    const notification = document.createElement('div');
    notification.innerHTML = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(180deg, #5BC8C8, #4aB8B8);
        color: #fff;
        padding: 18px 30px;
        border-radius: 15px;
        font-family: 'Press Start 2P', cursive;
        font-size: 9px;
        z-index: 1500;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        animation: notifSlide 0.5s ease;
        text-align: center;
        max-width: 90%;
        line-height: 1.8;
        border: 3px solid rgba(255, 255, 255, 0.3);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'notifSlideOut 0.5s ease forwards';
        setTimeout(() => notification.remove(), 500);
    }, 3500);
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
    
    @keyframes waveExpand {
        0% { width: 10px; height: 10px; opacity: 1; }
        100% { width: 200px; height: 200px; opacity: 0; }
    }
    
    @keyframes barBounce {
        0% { height: 10px; }
        100% { height: 50px; }
    }
    
    @keyframes noteFloat {
        0% { 
            transform: translateY(0) rotate(0deg) scale(1); 
            opacity: 0.7; 
        }
        50% {
            transform: translateY(-200px) rotate(180deg) scale(1.2);
        }
        100% { 
            transform: translateY(-400px) rotate(360deg) scale(0.5); 
            opacity: 0; 
        }
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
