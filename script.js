/*
 * ============================================================
 * CONFIGURAZIONE
 * ============================================================
 *
 * revealDate: data/ora del reveal.
 * Usa il formato ISO locale: "AAAA-MM-GGTHH:MM:SS"
 *
 * gender:
 *   "male"   -> maschietto / tema azzurro
 *   "female" -> femminuccia / tema rosa
 *
 * Esempio:
 *   revealDate: "2026-12-25T20:00:00",
 *   gender: "female"
 */

const CONFIG = {
  revealDate: "2026-09-08T18:20:00",
  gender: "male",

  texts: {
    title: "Il grande momento sta arrivando…",
    subtitle: "Manca sempre meno per scoprire chi sta arrivando!",
    maleResult: "È un maschietto! 💙",
    femaleResult: "È una femminuccia! 💗",
    maleMessage: "Una nuova piccola avventura sta per cominciare.",
    femaleMessage: "Una nuova piccola avventura sta per cominciare."
  }
};

// ============================================================
// Elementi DOM
// ============================================================

const elements = {
  body: document.body,
  intro: document.getElementById("intro"),
  result: document.getElementById("result"),
  revealCard: document.getElementById("revealCard"),
  title: document.getElementById("title"),
  subtitle: document.getElementById("subtitle"),
  resultText: document.getElementById("resultText"),
  resultMessage: document.getElementById("resultMessage"),
  dateHint: document.getElementById("dateHint"),
  days: document.getElementById("days"),
  hours: document.getElementById("hours"),
  minutes: document.getElementById("minutes"),
  seconds: document.getElementById("seconds"),
  canvas: document.getElementById("confettiCanvas")
};

const revealTime = new Date(CONFIG.revealDate).getTime();
let revealed = false;
let countdownTimer = null;

// ============================================================
// Inizializzazione
// ============================================================

function init() {
  const gender = CONFIG.gender.toLowerCase();

  if (!["male", "female"].includes(gender)) {
    console.error('CONFIG.gender deve essere "male" oppure "female".');
    return;
  }

  elements.title.textContent = CONFIG.texts.title;
  elements.subtitle.textContent = CONFIG.texts.subtitle;

  const formattedDate = new Intl.DateTimeFormat("it-IT", {
    dateStyle: "full",
    timeStyle: "short"
  }).format(new Date(revealTime));

  elements.dateHint.textContent = `Reveal: ${formattedDate}`;

  updateCountdown();
  countdownTimer = setInterval(updateCountdown, 1000);
}

// ============================================================
// Countdown
// ============================================================

function updateCountdown() {
  const now = Date.now();
  const difference = revealTime - now;

  if (difference <= 0) {
    showReveal();
    return;
  }

  const totalSeconds = Math.floor(difference / 1000);

  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  elements.days.textContent = pad(days);
  elements.hours.textContent = pad(hours);
  elements.minutes.textContent = pad(minutes);
  elements.seconds.textContent = pad(seconds);
}

function pad(value) {
  return String(value).padStart(2, "0");
}

// ============================================================
// Reveal
// ============================================================

function showReveal() {
  if (revealed) return;
  revealed = true;

  clearInterval(countdownTimer);

  const gender = CONFIG.gender.toLowerCase();
  const isMale = gender === "male";

  elements.body.classList.add(isMale ? "male" : "female");

  elements.resultText.textContent = isMale
    ? CONFIG.texts.maleResult
    : CONFIG.texts.femaleResult;

  elements.resultMessage.textContent = isMale
    ? CONFIG.texts.maleMessage
    : CONFIG.texts.femaleMessage;

  // Piccolo "momento di suspense" prima di mostrare il risultato.
  elements.revealCard.classList.add("celebrating");

  setTimeout(() => {
    elements.intro.hidden = true;
    elements.result.hidden = false;
    launchConfetti(isMale ? "male" : "female");
  }, 550);
}

// ============================================================
// Coriandoli - Canvas, nessuna libreria esterna
// ============================================================

const ctx = elements.canvas.getContext("2d");
let confetti = [];
let animationFrame = null;
let confettiRunning = false;

const PALETTES = {
  male: [
    "#8fcdf1",
    "#b9e1f8",
    "#68b7e8",
    "#d9f1ff",
    "#ffffff"
  ],
  female: [
    "#f2a9c0",
    "#f8c7d7",
    "#e98fae",
    "#ffe0ea",
    "#ffffff"
  ]
};

function resizeCanvas() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  elements.canvas.width = window.innerWidth * dpr;
  elements.canvas.height = window.innerHeight * dpr;
  elements.canvas.style.width = `${window.innerWidth}px`;
  elements.canvas.style.height = `${window.innerHeight}px`;

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function launchConfetti(gender) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  confettiRunning = true;
  confetti = [];

  const palette = PALETTES[gender];
  const amount = Math.min(260, Math.floor(window.innerWidth / 4));

  for (let i = 0; i < amount; i++) {
    confetti.push(createConfetto(palette, true));
  }

  if (animationFrame) {
    cancelAnimationFrame(animationFrame);
  }

  animateConfetti();
}

function createConfetto(palette, fromBottom = false) {
  return {
    x: Math.random() * window.innerWidth,
    y: fromBottom
      ? window.innerHeight * (0.25 + Math.random() * 0.75)
      : -20,
    width: 6 + Math.random() * 8,
    height: 8 + Math.random() * 14,
    color: palette[Math.floor(Math.random() * palette.length)],
    speedY: 1.5 + Math.random() * 3.5,
    speedX: (Math.random() - 0.5) * 2.2,
    rotation: Math.random() * Math.PI * 2,
    rotationSpeed: (Math.random() - 0.5) * 0.18,
    wobble: Math.random() * Math.PI * 2,
    wobbleSpeed: 0.025 + Math.random() * 0.04,
    opacity: 0.75 + Math.random() * 0.25
  };
}

function animateConfetti() {
  if (!confettiRunning) return;

  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  let visible = 0;

  for (const piece of confetti) {
    piece.y += piece.speedY;
    piece.x += piece.speedX + Math.sin(piece.wobble) * 0.5;
    piece.rotation += piece.rotationSpeed;
    piece.wobble += piece.wobbleSpeed;

    if (piece.y < window.innerHeight + 40) {
      visible++;
    }

    ctx.save();
    ctx.globalAlpha = piece.opacity;
    ctx.translate(piece.x, piece.y);
    ctx.rotate(piece.rotation);

    ctx.fillStyle = piece.color;
    ctx.fillRect(
      -piece.width / 2,
      -piece.height / 2,
      piece.width,
      piece.height
    );

    ctx.restore();
  }

  if (visible > 0) {
    animationFrame = requestAnimationFrame(animateConfetti);
  } else {
    confettiRunning = false;
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  }
}

// ============================================================
// Avvio
// ============================================================

init();
