:root {
    --bg-color-1: #e0f2fe; /* Azzurro tenue */
    --bg-color-2: #fce7f3; /* Rosa tenue */
    --card-bg: rgba(255, 255, 255, 0.75);
    --text-color: #334155;
    --accent-blue: #38bdf8;
    --accent-pink: #f472b6;
}

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    font-family: 'Montserrat', sans-serif;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(135deg, var(--bg-color-1), var(--bg-color-2));
    overflow: hidden;
    color: var(--text-color);
    transition: background 1.5s ease;
}

/* Canvas sfondi */
#bg-canvas, #confetti-canvas {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
}

#confetti-canvas {
    z-index: 10;
}

/* Container & Card */
.container {
    position: relative;
    z-index: 5;
    width: 90%;
    max-width: 650px;
    padding: 20px;
}

.glass-card {
    background: var(--card-bg);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.6);
    border-radius: 24px;
    padding: 40px 30px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
    text-align: center;
    transition: all 1s ease;
}

h1 {
    font-size: clamp(1.5rem, 3vw, 2.2rem);
    font-weight: 700;
    margin-bottom: 10px;
    color: #1e293b;
}

.subtitle {
    font-size: clamp(0.9rem, 1.5vw, 1.1rem);
    color: #64748b;
    margin-bottom: 35px;
    font-weight: 300;
}

/* Countdown Grid */
.countdown-grid {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;
    margin-bottom: 20px;
}

.time-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: rgba(255, 255, 255, 0.6);
    padding: 15px 10px;
    border-radius: 14px;
    min-width: 75px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.03);
}

.time-value {
    font-size: clamp(1.8rem, 4vw, 2.8rem);
    font-weight: 700;
    color: #1e293b;
    line-height: 1.1;
}

.time-label {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #64748b;
    margin-top: 5px;
}

.separator {
    font-size: 2rem;
    font-weight: 700;
    color: #94a3b8;
    margin-top: -15px;
}

/* Pulsante SCOPRI con effetto Glow */
.hidden {
    display: none !important;
}

#reveal-container {
    margin-top: 25px;
    animation: fadeIn 1s ease;
}

.glow-button {
    background: linear-gradient(135deg, #a855f7, #ec4899);
    border: none;
    color: white;
    font-family: 'Montserrat', sans-serif;
    font-size: 1.5rem;
    font-weight: 700;
    padding: 15px 50px;
    border-radius: 50px;
    cursor: pointer;
    box-shadow: 0 0 20px rgba(236, 72, 153, 0.6);
    animation: pulseGlow 2s infinite;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.glow-button:hover {
    transform: scale(1.05);
    box-shadow: 0 0 35px rgba(236, 72, 153, 0.9);
}

.glow-button:active {
    transform: scale(0.98);
}

@keyframes pulseGlow {
    0% {
        box-shadow: 0 0 15px rgba(236, 72, 153, 0.5);
    }
    50% {
        box-shadow: 0 0 30px rgba(236, 72, 153, 0.9), 0 0 50px rgba(168, 85, 247, 0.5);
    }
    100% {
        box-shadow: 0 0 15px rgba(236, 72, 153, 0.5);
    }
}

/* Risultato Finale */
.result-title {
    font-family: 'Great Vibes', cursive;
    font-size: clamp(4rem, 10vw, 7rem);
    animation: scaleUp 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
    margin-top: 10px;
}

@keyframes scaleUp {
    0% {
        transform: scale(0);
        opacity: 0;
    }
    100% {
        transform: scale(1);
        opacity: 1;
    }
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}

/* Responsive per smartphone */
@media (max-width: 480px) {
    .glass-card {
        padding: 25px 15px;
    }
    .countdown-grid {
        gap: 8px;
    }
    .time-box {
        min-width: 60px;
        padding: 10px 5px;
    }
    .separator {
        font-size: 1.5rem;
    }
}
