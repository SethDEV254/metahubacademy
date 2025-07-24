// MOGUL TECH - Advanced Technology Solutions

// Cursor Glow Effect
document.addEventListener('mousemove', (e) => {
    const cursor = document.querySelector('.cursor-glow');
    if (cursor) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    }
});

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    if (hamburger && navMenu) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
}));

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        }
    }
});

// Animated Counter for Stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start).toLocaleString();
        }
    }, 16);
}

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            
            // Animate counters when stats section is visible
            if (entry.target.classList.contains('stats')) {
                const counters = entry.target.querySelectorAll('.stat-number');
                counters.forEach(counter => {
                    const target = parseFloat(counter.getAttribute('data-target'));
                    animateCounter(counter, target);
                });
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.feature-card, .course-card, .stats').forEach(el => {
    observer.observe(el);
});

// Neural Interface System
class NeuralInterface {
    constructor() {
        this.isActive = false;
        this.init();
    }
    
    init() {
        const neuralBtn = document.getElementById('neural-interface');
        if (neuralBtn) {
            neuralBtn.addEventListener('click', () => this.activate());
        }
    }
    
    activate() {
        this.isActive = !this.isActive;
        if (this.isActive) {
            this.showNeuralInterface();
        } else {
            this.hideNeuralInterface();
        }
    }
    
    showNeuralInterface() {
        const overlay = document.createElement('div');
        overlay.className = 'neural-overlay';
        overlay.innerHTML = `
            <div class="neural-interface-panel">
                <div class="panel-header">
                    <h3>MOGUL TECH NEURAL INTERFACE</h3>
                    <button class="close-btn" onclick="this.parentElement.parentElement.remove()">×</button>
                </div>
                <div class="neural-display">
                    <div class="neural-status">
                        <span class="status-dot active"></span>
                        NEURAL LINK ESTABLISHED
                    </div>
                    <div class="brain-activity">
                        <canvas id="brain-wave" width="400" height="100"></canvas>
                    </div>
                    <div class="neural-data">
                        <div class="data-row">
                            <span>Cognitive Load:</span>
                            <span class="data-value">78%</span>
                        </div>
                        <div class="data-row">
                            <span>Neural Efficiency:</span>
                            <span class="data-value">94%</span>
                        </div>
                        <div class="data-row">
                            <span>Sync Status:</span>
                            <span class="data-value">OPTIMAL</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(overlay);
        this.animateBrainWave();
        
        // Auto-close after 5 seconds
        setTimeout(() => {
            if (overlay.parentNode) {
                overlay.remove();
                this.isActive = false;
            }
        }, 5000);
    }
    
    animateBrainWave() {
        const canvas = document.getElementById('brain-wave');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        let time = 0;
        
        const animate = () => {
            if (!this.isActive) return;
            
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.strokeStyle = '#00d4ff';
            ctx.lineWidth = 2;
            
            ctx.beginPath();
            for (let x = 0; x < canvas.width; x++) {
                const y = canvas.height / 2 + 
                         Math.sin((x * 0.02 + time) * 2) * 20 +
                         Math.sin((x * 0.01 + time) * 3) * 10 +
                         Math.sin((x * 0.03 + time) * 1.5) * 5;
                
                if (x === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.stroke();
            
            time += 0.1;
            requestAnimationFrame(animate);
        };
        
        animate();
    }
    
    hideNeuralInterface() {
        const overlay = document.querySelector('.neural-overlay');
        if (overlay) {
            overlay.remove();
        }
        this.isActive = false;
    }
}

// Quantum Access System
class QuantumAccess {
    constructor() {
        this.init();
    }
    
    init() {
        const quantumBtn = document.getElementById('quantum-access');
        if (quantumBtn) {
            quantumBtn.addEventListener('click', () => this.initiateQuantumAccess());
        }
    }
    
    initiateQuantumAccess() {
        this.createQuantumPortal();
        this.simulateQuantumProcessing();
    }
    
    createQuantumPortal() {
        const portal = document.createElement('div');
        portal.className = 'quantum-portal';
        portal.innerHTML = `
            <div class="portal-rings">
                <div class="portal-ring ring-1"></div>
                <div class="portal-ring ring-2"></div>
                <div class="portal-ring ring-3"></div>
            </div>
            <div class="portal-core"></div>
        `;
        
        document.body.appendChild(portal);
        
        setTimeout(() => {
            if (portal.parentNode) {
                portal.remove();
            }
        }, 4000);
    }
    
    simulateQuantumProcessing() {
        const messages = [
            'Initializing quantum processors...',
            'Establishing quantum entanglement...',
            'Accessing quantum dimensions...',
            'Quantum tunneling active...',
            'Quantum access granted!'
        ];
        
        messages.forEach((message, index) => {
            setTimeout(() => {
                this.showQuantumMessage(message);
            }, index * 800);
        });
    }
    
    showQuantumMessage(message) {
        const msgElement = document.createElement('div');
        msgElement.className = 'quantum-message';
        msgElement.textContent = message;
        
        document.body.appendChild(msgElement);
        
        setTimeout(() => {
            if (msgElement.parentNode) {
                msgElement.remove();
            }
        }, 800);
    }
}

// Solar Control System
class SolarControlSystem {
    constructor() {
        this.isActive = false;
        this.planetData = {
            mercury: { name: 'Mercury', temp: '427°C', distance: '57.9M km', status: 'Monitored' },
            venus: { name: 'Venus', temp: '462°C', distance: '108.2M km', status: 'Monitored' },
            earth: { name: 'Earth', temp: '15°C', distance: '149.6M km', status: 'Protected' },
            mars: { name: 'Mars', temp: '-65°C', distance: '227.9M km', status: 'Colonizing' },
            jupiter: { name: 'Jupiter', temp: '-110°C', distance: '778.5M km', status: 'Research' },
            saturn: { name: 'Saturn', temp: '-140°C', distance: '1.43B km', status: 'Monitored' }
        };
        this.init();
    }
    
    init() {
        const solarBtn = document.getElementById('solar-control');
        if (solarBtn) {
            solarBtn.addEventListener('click', () => this.activateSolarControl());
        }
        
        this.addPlanetInteractions();
    }
    
    activateSolarControl() {
        this.isActive = !this.isActive;
        
        if (this.isActive) {
            this.showSolarControlPanel();
        } else {
            this.hideSolarControlPanel();
        }
    }
    
    showSolarControlPanel() {
        const panel = document.createElement('div');
        panel.className = 'solar-control-panel';
        panel.innerHTML = `
            <div class="control-header">
                <h3>SOLAR SYSTEM CONTROL</h3>
                <button class="close-control" onclick="this.parentElement.parentElement.remove()">×</button>
            </div>
            <div class="control-content">
                <div class="system-status">
                    <div class="status-row">
                        <span>Solar Activity:</span>
                        <span class="status-value" id="solar-activity">MODERATE</span>
                    </div>
                    <div class="status-row">
                        <span>System Health:</span>
                        <span class="status-value" id="system-health">OPTIMAL</span>
                    </div>
                    <div class="status-row">
                        <span>Planets Online:</span>
                        <span class="status-value">6/8</span>
                    </div>
                </div>
                <div class="planet-info" id="planet-info">
                    <p>Click on any planet to view information</p>
                </div>
                <div class="control-actions">
                    <button class="action-btn" onclick="solarControlSystem.scanSystem()">Deep Scan</button>
                    <button class="action-btn" onclick="solarControlSystem.adjustFlares()">Adjust Flares</button>
                    <button class="action-btn" onclick="solarControlSystem.launchProbe()">Launch Probe</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(panel);
        this.startSystemMonitoring();
    }
    
    hideSolarControlPanel() {
        const panel = document.querySelector('.solar-control-panel');
        if (panel) {
            panel.remove();
        }
        this.isActive = false;
    }
    
    addPlanetInteractions() {
        const planets = document.querySelectorAll('.planet');
        planets.forEach((planet, index) => {
            planet.addEventListener('click', (e) => {
                e.stopPropagation();
                this.selectPlanet(index);
            });
        });
    }
    
    selectPlanet(index) {
        if (!this.isActive) return;
        
        const planetNames = ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn'];
        const planetName = planetNames[index];
        const data = this.planetData[planetName];
        
        if (data) {
            const infoPanel = document.getElementById('planet-info');
            if (infoPanel) {
                infoPanel.innerHTML = `
                    <h4>${data.name}</h4>
                    <p><strong>Temperature:</strong> ${data.temp}</p>
                    <p><strong>Distance:</strong> ${data.distance}</p>
                    <p><strong>Status:</strong> ${data.status}</p>
                `;
            }
        }
    }
    
    startSystemMonitoring() {
        const activities = ['LOW', 'MODERATE', 'HIGH'];
        const healths = ['OPTIMAL', 'GOOD', 'WARNING'];
        
        setInterval(() => {
            const activityEl = document.getElementById('solar-activity');
            const healthEl = document.getElementById('system-health');
            
            if (activityEl) {
                activityEl.textContent = activities[Math.floor(Math.random() * activities.length)];
            }
            
            if (healthEl) {
                healthEl.textContent = healths[Math.floor(Math.random() * healths.length)];
            }
        }, 3000);
    }
    
    scanSystem() {
        this.showSystemMessage('Deep space scan initiated...', '#00d4ff');
        setTimeout(() => {
            this.showSystemMessage('Scan complete: 847 objects detected', '#00ff41');
        }, 2000);
    }
    
    adjustFlares() {
        this.showSystemMessage('Adjusting solar flare intensity...', '#ffaa00');
        setTimeout(() => {
            this.showSystemMessage('Solar flares optimized', '#00ff41');
        }, 2000);
    }
    
    launchProbe() {
        this.showSystemMessage('Launching quantum probe...', '#7c3aed');
        setTimeout(() => {
            this.showSystemMessage('Probe launched successfully', '#00ff41');
        }, 2000);
    }
    
    showSystemMessage(message, color = '#00d4ff') {
        const msgEl = document.createElement('div');
        msgEl.className = 'system-message';
        msgEl.textContent = message;
        msgEl.style.color = color;
        
        document.body.appendChild(msgEl);
        
        setTimeout(() => {
            if (msgEl.parentNode) {
                msgEl.remove();
            }
        }, 2000);
    }
}

// Tech Meter Animation System
class TechMeterSystem {
    constructor() {
        this.init();
    }
    
    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateMeter(entry.target);
                }
            });
        });
        
        document.querySelectorAll('.tech-meter').forEach(meter => {
            observer.observe(meter);
        });
    }
    
    animateMeter(meter) {
        const fill = meter.querySelector('.meter-fill');
        const level = fill.getAttribute('data-level');
        
        setTimeout(() => {
            fill.style.width = level + '%';
        }, 500);
    }
}

// Initialize all systems
let neuralInterface, quantumAccess, solarControlSystem, techMeterSystem;

document.addEventListener('DOMContentLoaded', () => {
    neuralInterface = new NeuralInterface();
    quantumAccess = new QuantumAccess();
    solarControlSystem = new SolarControlSystem();
    techMeterSystem = new TechMeterSystem();
    
    console.log('🚀 MOGUL TECH Systems Online');
    console.log('🧠 Neural Interface: READY');
    console.log('⚛️ Quantum Access: READY');
    console.log('☀️ Solar Control: READY');
    console.log('📊 Tech Meters: READY');
});

// Add dynamic styles
const dynamicStyles = document.createElement('style');
dynamicStyles.textContent = `
    .neural-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fade-in 0.3s ease;
    }
    
    .neural-interface-panel {
        background: rgba(0, 212, 255, 0.1);
        border: 2px solid #00d4ff;
        border-radius: 15px;
        padding: 2rem;
        max-width: 500px;
        width: 90%;
        backdrop-filter: blur(10px);
    }
    
    .panel-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid #00d4ff;
    }
    
    .panel-header h3 {
        color: #00d4ff;
        font-family: 'Orbitron', monospace;
        font-size: 1.1rem;
        margin: 0;
    }
    
    .close-btn {
        background: none;
        border: none;
        color: #00d4ff;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        width: 30px;
        height: 30px;
    }
    
    .neural-status {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 1rem;
        color: #00ff41;
        font-weight: 600;
    }
    
    .status-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #00ff41;
        animation: pulse 1s infinite;
    }
    
    .brain-activity {
        background: rgba(0, 0, 0, 0.5);
        border: 1px solid #00d4ff;
        border-radius: 8px;
        padding: 1rem;
        margin-bottom: 1rem;
    }
    
    .neural-data {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }
    
    .data-row {
        display: flex;
        justify-content: space-between;
        color: #ffffff;
        font-size: 0.9rem;
    }
    
    .data-value {
        color: #00d4ff;
        font-weight: 600;
    }
    
    .quantum-portal {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 200px;
        height: 200px;
        z-index: 9999;
        animation: portal-appear 0.5s ease;
    }
    
    .portal-rings {
        position: relative;
        width: 100%;
        height: 100%;
    }
    
    .portal-ring {
        position: absolute;
        border: 2px solid #00d4ff;
        border-radius: 50%;
        animation: ring-rotate 3s linear infinite;
    }
    
    .ring-1 {
        width: 200px;
        height: 200px;
        top: 0;
        left: 0;
    }
    
    .ring-2 {
        width: 150px;
        height: 150px;
        top: 25px;
        left: 25px;
        animation-direction: reverse;
        animation-duration: 2s;
    }
    
    .ring-3 {
        width: 100px;
        height: 100px;
        top: 50px;
        left: 50px;
        animation-duration: 4s;
    }
    
    .portal-core {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 50px;
        height: 50px;
        background: radial-gradient(circle, #00d4ff, transparent);
        border-radius: 50%;
        animation: core-pulse 1s infinite;
    }
    
    .quantum-message {
        position: fixed;
        top: 60%;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0, 0, 0, 0.9);
        color: #00d4ff;
        padding: 1rem 2rem;
        border-radius: 25px;
        font-family: 'Orbitron', monospace;
        z-index: 10000;
        border: 1px solid #00d4ff;
        animation: message-fade 0.8s ease;
    }
    
    .solar-control-panel {
        position: fixed;
        top: 50%;
        right: 20px;
        transform: translateY(-50%);
        width: 320px;
        background: rgba(0, 0, 0, 0.9);
        border: 2px solid #00d4ff;
        border-radius: 15px;
        padding: 1.5rem;
        z-index: 10000;
        backdrop-filter: blur(10px);
        animation: slide-in-right 0.5s ease;
    }
    
    .control-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
        padding-bottom: 0.5rem;
        border-bottom: 1px solid #00d4ff;
    }
    
    .control-header h3 {
        color: #00d4ff;
        font-family: 'Orbitron', monospace;
        font-size: 1rem;
        margin: 0;
    }
    
    .close-control {
        background: none;
        border: none;
        color: #00d4ff;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        width: 30px;
        height: 30px;
    }
    
    .system-status {
        margin-bottom: 1rem;
    }
    
    .status-row {
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.5rem;
        font-size: 0.9rem;
        color: #ffffff;
    }
    
    .status-value {
        color: #00d4ff;
        font-weight: 600;
    }
    
    .planet-info {
        background: rgba(0, 212, 255, 0.1);
        border: 1px solid #00d4ff;
        border-radius: 8px;
        padding: 1rem;
        margin-bottom: 1rem;
        min-height: 80px;
        color: #ffffff;
        font-size: 0.9rem;
    }
    
    .control-actions {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }
    
    .action-btn {
        padding: 0.8rem;
        background: linear-gradient(45deg, #00d4ff, #0099cc);
        border: none;
        border-radius: 8px;
        color: white;
        font-family: 'Orbitron', monospace;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        font-size: 0.8rem;
    }
    
    .action-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(0, 212, 255, 0.4);
    }
    
    .system-message {
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0, 0, 0, 0.9);
        padding: 1rem 2rem;
        border-radius: 25px;
        font-family: 'Orbitron', monospace;
        font-weight: 600;
        z-index: 10001;
        border: 1px solid currentColor;
        animation: message-fade 2s ease;
    }
    
    @keyframes fade-in {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes pulse {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.5; transform: scale(1.2); }
    }
    
    @keyframes portal-appear {
        from { opacity: 0; transform: translate(-50%, -50%) scale(0); }
        to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
    }
    
    @keyframes ring-rotate {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    
    @keyframes core-pulse {
        0%, 100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        50% { opacity: 0.5; transform: translate(-50%, -50%) scale(1.2); }
    }
    
    @keyframes message-fade {
        0% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
        20% { opacity: 1; transform: translateX(-50%) translateY(0); }
        80% { opacity: 1; transform: translateX(-50%) translateY(0); }
        100% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
    }
    
    @keyframes slide-in-right {
        from { transform: translateY(-50%) translateX(100%); opacity: 0; }
        to { transform: translateY(-50%) translateX(0); opacity: 1; }
    }
    
    @media (max-width: 768px) {
        .solar-control-panel {
            right: 10px;
            width: 280px;
        }
        
        .neural-interface-panel {
            width: 95%;
            padding: 1.5rem;
        }
    }
`;
document.head.appendChild(dynamicStyles);