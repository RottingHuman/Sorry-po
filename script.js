// ---------- starfield ----------
const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');
let stars = [];

function resizeCanvas(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
function makeStars(){
  const count = Math.floor((canvas.width * canvas.height) / 8000);
  stars = Array.from({ length: count }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.3 + 0.3,
    baseAlpha: Math.random() * 0.5 + 0.25,
    phase: Math.random() * Math.PI * 2,
    speed: Math.random() * 0.015 + 0.005
  }));
}
function drawStars(t){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for(const s of stars){
    const twinkle = Math.sin(t * s.speed + s.phase) * 0.35 + 0.65;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(242,239,234,${s.baseAlpha * twinkle})`;
    ctx.fill();
  }
  requestAnimationFrame(drawStars);
}
function initStars(){ resizeCanvas(); makeStars(); }
window.addEventListener('resize', initStars);
initStars();
requestAnimationFrame(drawStars);

// ---------- slide deck ----------
const slides = Array.from(document.querySelectorAll('.slide'));
const dotsContainer = document.getElementById('dots');
const candle = document.getElementById('candle');
let current = 0;

slides.forEach((_, i) => {
  const dot = document.createElement('div');
  dot.className = 'dot' + (i === 0 ? ' current' : '');
  dotsContainer.appendChild(dot);
});
const dots = Array.from(dotsContainer.children);

function updateCandleGlow(){
  const progress = current / (slides.length - 1);
  const brightness = 0.85 + progress * 0.5;
  const dropGlow = 4 + progress * 14;
  candle.style.filter = `brightness(${brightness}) drop-shadow(0 0 ${dropGlow}px rgba(232,185,97,${0.3 + progress * 0.4}))`;
}

function goToSlide(index){
  if(index === current || index < 0 || index >= slides.length) return;
  const currentSlide = slides[current];
  const nextSlide = slides[index];

  currentSlide.classList.add('leaving');
  currentSlide.classList.remove('active');
  setTimeout(() => currentSlide.classList.remove('leaving'), 550);

  nextSlide.classList.add('active');

  dots.forEach((d, i) => {
    d.classList.toggle('current', i === index);
    d.classList.toggle('done', i < index);
  });

  current = index;
  updateCandleGlow();
}

document.querySelectorAll('.next-btn').forEach(btn => {
  btn.addEventListener('click', () => goToSlide(current + 1));
});

updateCandleGlow();

// ---------- forgive interaction ----------
const yesBtn = document.getElementById("yes-btn");
const noBtn = document.getElementById("no-btn");
const please = document.getElementById("please-text");
const finaleContent = document.getElementById("finale-content");
const answer = document.getElementById("finale-answer");

if (yesBtn && noBtn && please && finaleContent && answer) {
  
  const msgs = [
    "🥺 Please patawarin mo ko...",
    "😭 Promise di na mauulit...",
    "💗 Bigyan mo pa ako ng chance...",
    "🥹 Baby please...",
    "❤️ Love na love kita...",
    "🥺 Pleaseee..."
  ];
  
  let count = 0;
  
  // YES BUTTON
  yesBtn.onclick = () => {
    
    finaleContent.style.transition = "opacity .5s";
    finaleContent.style.opacity = "0";
    
    setTimeout(() => {
      finaleContent.hidden = true;
      answer.hidden = false;
    }, 500);
    
    candle.style.filter =
      "brightness(1.6) drop-shadow(0 0 26px rgba(232,185,97,.85))";
    
    spawnEmbers();
    
  };
  
  // NO BUTTON
  function moveNo() {
    
    const padding = 15;
    
    const maxX = window.innerWidth - noBtn.offsetWidth - padding;
    const maxY = window.innerHeight - noBtn.offsetHeight - padding;
    
    let x = Math.random() * maxX;
    let y = Math.random() * maxY;
    
    if (x < padding) x = padding;
    if (y < padding) y = padding;
    
    noBtn.style.position = "fixed";
    noBtn.style.left = x + "px";
    noBtn.style.top = y + "px";
    noBtn.style.right = "auto";
    noBtn.style.bottom = "auto";
    noBtn.style.zIndex = "99999";
    
    please.textContent = msgs[count % msgs.length];
    
    yesBtn.style.transform = `scale(${1 + count * 0.1})`;
    
    count++;
    
    if (count >= 10) {
      noBtn.style.display = "none";
      please.textContent = "🥺 Wala ka nang choice baby... Yes nalang ❤️";
    }
    
  }
  
  // PC
  noBtn.addEventListener("mouseenter", moveNo);
  
  // Android
  noBtn.addEventListener("pointerdown", function(e) {
    e.preventDefault();
    moveNo();
  });
  
}