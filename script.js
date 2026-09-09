const CONFIG={
  // Formato: AAAA-MM-GGTHH:MM:SS (ora locale del dispositivo)
  revealDate:"2026-09-09T12:41:00",
  // "male" oppure "female"
  gender:"male",
  texts:{
    title:"Sarà lui, sarà lei…",
    subtitle:"Manca sempre meno per scoprire chi sta arrivando!",
    maleResult:"Maschietto!",
    femaleResult:"Femminuccia!",
    maleMessage:"Una nuova piccola avventura sta per cominciare.",
    femaleMessage:"Una nuova piccola avventura sta per cominciare."
  }
};

const $=id=>document.getElementById(id);
const revealTime=new Date(CONFIG.revealDate).getTime();
let revealed=false,timer;

$("title").textContent=CONFIG.texts.title;
$("subtitle").textContent=CONFIG.texts.subtitle;
$("dateHint").textContent="Reveal: "+new Intl.DateTimeFormat("it-IT",{dateStyle:"full",timeStyle:"short"}).format(new Date(revealTime));

function pad(n){return String(n).padStart(2,"0")}

function updateCountdown(){
  const diff=revealTime-Date.now();
  if(diff<=0){clearInterval(timer);showDiscover();return}
  const s=Math.floor(diff/1000);
  $("days").textContent=pad(Math.floor(s/86400));
  $("hours").textContent=pad(Math.floor(s%86400/3600));
  $("minutes").textContent=pad(Math.floor(s%3600/60));
  $("seconds").textContent=pad(s%60);
}

function showDiscover(){
  if(revealed)return;
  $("intro").hidden=true;
  $("discover").hidden=false;
}

$("discoverButton").addEventListener("click",()=>{
  if(revealed)return;
  revealed=true;
  const male=CONFIG.gender.toLowerCase()==="male";
  document.body.classList.add(male?"male":"female");
  $("resultText").textContent=male?CONFIG.texts.maleResult:CONFIG.texts.femaleResult;
  $("resultMessage").textContent=male?CONFIG.texts.maleMessage:CONFIG.texts.femaleMessage;
  $("discover").hidden=true;
  $("result").hidden=false;
  launchConfetti(male?"male":"female");
});

// Confetti: esplosione centrale + pioggia dall'alto.
const canvas=$("confettiCanvas"),ctx=canvas.getContext("2d");
let pieces=[],frame;
const palettes={
  male:["#8fcdf1","#b9e1f8","#68b7e8","#d9f1ff","#ffffff"],
  female:["#f2a9c0","#f8c7d7","#e98fae","#ffe0ea","#ffffff"]
};
function resize(){
  const dpr=Math.min(devicePixelRatio||1,2);
  canvas.width=innerWidth*dpr;canvas.height=innerHeight*dpr;
  canvas.style.width=innerWidth+"px";canvas.style.height=innerHeight+"px";
  ctx.setTransform(dpr,0,0,dpr,0,0);
}
addEventListener("resize",resize);resize();

function launchConfetti(gender){
  if(matchMedia("(prefers-reduced-motion:reduce)").matches)return;
  const palette=palettes[gender];pieces=[];
  for(let i=0;i<180;i++){
    const a=Math.random()*Math.PI*2,sp=4+Math.random()*8;
    pieces.push({x:innerWidth/2,y:innerHeight/2,w:5+Math.random()*8,h:8+Math.random()*14,
      vx:Math.cos(a)*sp,vy:Math.sin(a)*sp-2,g:.10+Math.random()*.08,r:Math.random()*6.28,rs:(Math.random()-.5)*.2,
      c:palette[Math.floor(Math.random()*palette.length)],life:0,max:170+Math.random()*130});
  }
  for(let i=0;i<100;i++){
    pieces.push({x:Math.random()*innerWidth,y:-Math.random()*innerHeight,w:5+Math.random()*8,h:8+Math.random()*14,
      vx:(Math.random()-.5)*2,vy:2+Math.random()*4,g:.02,r:Math.random()*6.28,rs:(Math.random()-.5)*.18,
      c:palette[Math.floor(Math.random()*palette.length)],life:0,max:260+Math.random()*160});
  }
  cancelAnimationFrame(frame);animate();
}
function animate(){
  ctx.clearRect(0,0,innerWidth,innerHeight);
  pieces.forEach(p=>{
    p.x+=p.vx;p.y+=p.vy;p.vy+=p.g;p.r+=p.rs;p.life++;
    ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.r);
    ctx.globalAlpha=Math.max(0,1-p.life/p.max);ctx.fillStyle=p.c;
    ctx.fillRect(-p.w/2,-p.h/2,p.w,p.h);ctx.restore();
  });
  pieces=pieces.filter(p=>p.life<p.max);
  if(pieces.length)frame=requestAnimationFrame(animate);
}
updateCountdown();timer=setInterval(updateCountdown,1000);

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
            this.color = CONFIG.gender === 'male' ? '#38bdf8' : '#f472b6';
            this.size = this.size * 4;
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
        p.update(revealed);
        p.draw();
    });
    requestAnimationFrame(animateBg);
}
animateBg();
