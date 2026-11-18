/**
 * HER UNIVERSE — HIGH PERFORMANCE CANVAS CONFETTI & PARTICLES
 * Zero dependencies, optimized for 60fps desktop & mobile.
 */

export function triggerConfetti(options = {}) {
  const {
    particleCount = 100,
    origin = { x: 0.5, y: 0.5 },
    spread = 360,
    speed = 10,
    colors = ['#D8C19A', '#D8B5C4', '#B8A9CC', '#F4F0EA', '#FFFFFF', '#A899BD'],
  } = options;

  let canvas = document.getElementById('her-universe-confetti-canvas');
  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.id = 'her-universe-confetti-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '99999';
    document.body.appendChild(canvas);
  }

  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const width = window.innerWidth;
  const height = window.innerHeight;
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  ctx.scale(dpr, dpr);

  const particles = [];
  const startX = origin.x * width;
  const startY = origin.y * height;

  for (let i = 0; i < particleCount; i++) {
    const angle = (Math.random() * spread - spread / 2 + (origin.angle || 0)) * (Math.PI / 180);
    const velocity = (Math.random() * 0.7 + 0.3) * speed;
    const type = Math.random() > 0.4 ? 'rect' : Math.random() > 0.5 ? 'circle' : 'star';

    particles.push({
      x: startX,
      y: startY,
      vx: Math.cos(angle) * velocity,
      vy: Math.sin(angle) * velocity - 2, // Slight upward boost
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 8 + 4,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 12,
      opacity: 1,
      decay: Math.random() * 0.012 + 0.008,
      gravity: 0.22,
      drag: 0.96,
      type,
    });
  }

  let animationFrameId;

  function render() {
    ctx.clearRect(0, 0, width, height);

    let aliveCount = 0;

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      if (p.opacity <= 0) continue;

      aliveCount++;

      p.vx *= p.drag;
      p.vy *= p.drag;
      p.vy += p.gravity;
      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.rotationSpeed;
      p.opacity -= p.decay;

      ctx.save();
      ctx.globalAlpha = Math.max(0, p.opacity);
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;

      if (p.type === 'rect') {
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      } else if (p.type === 'circle') {
        ctx.beginPath();
        ctx.arc(0, 0, p.size / 2.5, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Draw little star / diamond
        ctx.beginPath();
        ctx.moveTo(0, -p.size);
        ctx.lineTo(p.size * 0.4, -p.size * 0.2);
        ctx.lineTo(p.size, 0);
        ctx.lineTo(p.size * 0.4, p.size * 0.2);
        ctx.lineTo(0, p.size);
        ctx.lineTo(-p.size * 0.4, p.size * 0.2);
        ctx.lineTo(-p.size, 0);
        ctx.lineTo(-p.size * 0.4, -p.size * 0.2);
        ctx.closePath();
        ctx.fill();
      }

      ctx.restore();
    }

    if (aliveCount > 0) {
      animationFrameId = requestAnimationFrame(render);
    } else {
      ctx.clearRect(0, 0, width, height);
      cancelAnimationFrame(animationFrameId);
    }
  }

  render();
}

/**
 * Supernova fireworks celebration
 */
export function triggerSupernova() {
  const points = [
    { x: 0.2, y: 0.4 },
    { x: 0.8, y: 0.35 },
    { x: 0.5, y: 0.5 },
    { x: 0.35, y: 0.65 },
    { x: 0.65, y: 0.65 },
  ];

  points.forEach((pt, index) => {
    setTimeout(() => {
      triggerConfetti({
        particleCount: 80,
        origin: pt,
        speed: 14,
        spread: 360,
      });
    }, index * 260);
  });
}
