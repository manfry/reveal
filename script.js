/* ==========================================
   CONFIGURAZIONE (Modifica qui i parametri)
   ========================================== */
// Data e ora di scadenza del countdown (Formato: "AAAA-MM-DDTHH:MM:SS")
const TARGET_DATE = "2026-12-31T18:00:00"; 

// Genere: "male" per Maschietto, "female" per Femminuccia
const GENDER = "male"; 
/* ========================================== */

// Elementi DOM
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const countdownContainer = document.getElementById('countdown-container');
const revealContainer = document.getElementById('reveal-container');
const revealBtn = document.getElementById('reveal-btn');
const resultContainer = document.getElementById('result-container');
const resultText = document.getElementById('result-text');
const mainTitle = document.getElementById('main-title');
const subtitle = document.getElementById('subtitle');
const mainCard = document.getElementById('main-card');

// Sfondo Animato con Particelle Rosa/Azzurre
const bgCanvas = document.getElementById('bg-canvas');
const bgCtx = bgCanvas.getContext('2d');
let particles = [];

function resizeBgCanvas() {
    bgCanvas.width = window.innerWidth;
    bgCanvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeBgCanvas);
resizeBgCanvas();

class Particle {
    constructor(isRevealTheme = false, colorOverride = null) {
        this.reset(isRevealTheme, colorOverride);
    }
    reset(isRevealTheme = false, colorOverride = null) {
        this.x = Math.random() * bgCanvas.width;
        this.y = Math.random() * bgCanvas.height;
        this.size = Math.random() * 4 + 2;
        this.speedY = (Math.random() * 0.8 + 0.2) * -1; // Salgono verso l'alto delicatamente
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.alpha = Math.random() * 0.5 + 0.2;
        
        if (colorOverride) {
            this.color = colorOverride;
        } else if (isRevealTheme) {
            this.color = GENDER === 'male' ? '#38bdf8' : '#f472b6';
        } else {
            this.color = Math.random() > 0.5 ? '#38bdf8' : '#f472b6';
        }
    }
    update(isRevealTheme = false, colorOverride = null) {
        this.y += this.speedY;
        this.x += this.speedX;
        if (this.y < 0) {
            this.reset(isRevealTheme, colorOverride);
            this.y = bgCanvas.height + 10;
        }
    }
    draw() {
        bgCtx.save();
        bgCtx.globalAlpha = this.alpha;
        bgCtx.fillStyle = this.color;
        bgCtx.beginPath();
        bgCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        bgCtx.fill();
        bgCtx.restore();
    }
}

// Inizializza 50 particelle
for (let i = 0; i < 50; i++) {
    particles.push(new Particle());
}

function animateBg() {
    bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animateBg);
}
animateBg();


// Gestione Countdown
let countdownFinished = false;

function updateCountdown() {
    if (countdownFinished) return;

    const now = new Date().getTime();
    const targetTime = new Date(TARGET_DATE).getTime();
    const distance = targetTime - now;

    if (distance <= 0) {
        countdownFinished = true;
        countdownContainer.classList.add('hidden');
        revealContainer.classList.remove('hidden');
        mainTitle.innerText = "Il momento è arrivato!";
        subtitle.innerText = "Clicca per scoprire chi c'è nel pancione!";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.innerText = String(days).padStart(2, '0');
    hoursEl.innerText = String(hours).padStart(2, '0');
    minutesEl.innerText = String(minutes).padStart(2, '0');
    secondsEl.innerText = String(seconds).padStart(2, '0');
}

setInterval(updateCountdown, 1000);
updateCountdown();


// Gestione Click su SCOPRI e Rivelazione
revealBtn.addEventListener('click', () => {
    revealContainer.classList.add('hidden');
    subtitle.classList.add('hidden');
    
    // Cambia gradiente dello sfondo del body in base al sesso
    if (GENDER === 'male') {
        document.body.style.background = "linear-gradient(135deg, #bae6fd, #7dd3fc)";
        resultText.innerText = "Maschietto!";
        resultText.style.color = "#0284c7";
    } else {
        document.body.style.background = "linear-gradient(135deg, #fbcfe8, #f472b6)";
        resultText.innerText = "Femminuccia!";
        resultText.style.color = "#db2777";
    }

    mainTitle.innerText = "È una gioia immensa annunciare che...";
    resultContainer.classList.remove('hidden');

    // Aggiorna le particelle di sfondo con il colore definitivo
    particles.forEach(p => p.reset(true));

    // Lancia i coriandoli
    startConfetti();
});


// Sistema di Coriandoli nativo via Canvas
const confettiCanvas = document.getElementById('confetti-canvas');
const ctx = confettiCanvas.getContext('2d');
let confettiParticles = [];

function resizeConfettiCanvas() {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeConfettiCanvas);
resizeConfettiCanvas();

class Confetti {
    constructor() {
        this.reset();
    }
    reset() {
        this.x = window.innerWidth / 2; // Esplosione dal centro
        this.y = window.innerHeight / 2;
        this.size = Math.random() * 8 + 4;
        this.speedX = (Math.random() - 0.5) * 20;
        this.speedY = (Math.random() - 0.5) * 20 - 5;
        this.gravity = 0.4;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = (Math.random() - 0.5) * 10;
        
        // Colori in base al tema
        if (GENDER === 'male') {
            this.color = ['#0284c7', '#38bdf8', '#7dd3fc', '#ffffff', '#e0f2fe'][Math.floor(Math.random() * 5)];
        } else {
            this.color = ['#db2777', '#f472b6', '#fbcfe8', '#ffffff', '#ffe4e6'][Math.floor(Math.random() * 5)];
        }
        this.alpha = 1;
        this.decay = Math.random() * 0.01 + 0.005;
    }
    update() {
        this.speedY += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY;
        this.rotation += this.rotationSpeed;
        
        // Aggiunge attrito orizzontale
        this.speedX *= 0.96;

        if (this.y > window.innerHeight) {
            // Se toccano il fondo, rallentano/spariscono
            this.alpha -= 0.02;
        }
    }
    draw() {
        ctx.save();
        ctx.globalAlpha = Math.max(0, this.alpha);
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size * 0.6);
        ctx.restore();
    }
}

function startConfetti() {
    // Genera un'esplosione iniziale massiccia
    for (let i = 0; i < 150; i++) {
        confettiParticles.push(new Confetti());
    }

    function animateConfetti() {
        ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
        
        confettiParticles.forEach((p, index) => {
            p.update();
            p.draw();
            if (p.alpha <= 0) {
                confettiParticles.splice(index, 1);
            }
        });

        if (confettiParticles.length > 0) {
            requestAnimationFrame(animateConfetti);
        }
    }
    animateConfetti();
}
