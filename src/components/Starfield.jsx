import { useEffect, useRef } from 'react';

/**
 * HER UNIVERSE — CINEMATIC LUXURY ATMOSPHERE
 * Dreamy ambient lighting, soft floating champagne embers & slow volumetric glow.
 * Optimized for 60fps performance and zero visual clutter.
 */
export default function Starfield() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Luxury floating stardust embers
    const particleCount = Math.min(65, Math.floor((width * height) / 18000));
    const particles = [];

    const luxuryColors = ['#D8C19A', '#D8B5C4', '#B8A9CC', '#F4F0EA'];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.2 + 0.6,
        alpha: Math.random() * 0.6 + 0.2,
        speedY: -(Math.random() * 0.25 + 0.1), // Gentle upward drift
        speedX: (Math.random() - 0.5) * 0.15,
        pulseSpeed: Math.random() * 0.02 + 0.005,
        color: luxuryColors[Math.floor(Math.random() * luxuryColors.length)],
      });
    }

    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = width / 2;
    let targetMouseY = height / 2;

    const handleMouseMove = (e) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const render = () => {
      // Smooth camera parallax
      mouseX += (targetMouseX - mouseX) * 0.03;
      mouseY += (targetMouseY - mouseY) * 0.03;
      const offsetX = (mouseX - width / 2) * 0.015;
      const offsetY = (mouseY - height / 2) * 0.015;

      ctx.clearRect(0, 0, width, height);

      // 1. Deep Midnight Navy & Plum Base
      const bgGrad = ctx.createRadialGradient(
        width * 0.5 - offsetX * 2,
        height * 0.35 - offsetY * 2,
        80,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.85
      );
      bgGrad.addColorStop(0, '#241a33'); // Soft deep plum highlight
      bgGrad.addColorStop(0.45, '#1a1930');
      bgGrad.addColorStop(1, '#111224'); // Midnight navy shadow
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Subtle Champagne Gold Ambient Glow (Top Center)
      const goldGlow = ctx.createRadialGradient(
        width * 0.5 - offsetX * 3,
        height * 0.2 - offsetY * 3,
        10,
        width * 0.5,
        height * 0.2,
        width * 0.45
      );
      goldGlow.addColorStop(0, 'rgba(216, 193, 154, 0.09)');
      goldGlow.addColorStop(0.6, 'rgba(216, 193, 154, 0.02)');
      goldGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = goldGlow;
      ctx.fillRect(0, 0, width, height);

      // 3. Subtle Muted Rose Ambient Aura (Bottom Right)
      const roseAura = ctx.createRadialGradient(
        width * 0.8 + offsetX * 3,
        height * 0.75 + offsetY * 3,
        10,
        width * 0.8,
        height * 0.75,
        width * 0.5
      );
      roseAura.addColorStop(0, 'rgba(216, 181, 196, 0.07)');
      roseAura.addColorStop(0.5, 'rgba(48, 36, 63, 0.04)');
      roseAura.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = roseAura;
      ctx.fillRect(0, 0, width, height);

      // 4. Dusty Lavender Ambient Veil (Left)
      const lavenderVeil = ctx.createRadialGradient(
        width * 0.15 - offsetX * 2,
        height * 0.6 - offsetY * 2,
        10,
        width * 0.15,
        height * 0.6,
        width * 0.4
      );
      lavenderVeil.addColorStop(0, 'rgba(184, 169, 204, 0.07)');
      lavenderVeil.addColorStop(0.6, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = lavenderVeil;
      ctx.fillRect(0, 0, width, height);

      // 5. Render Floating Champagne Stardust Embers
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.speedX;
        p.y += p.speedY;
        p.alpha += p.pulseSpeed;

        // Wrap around smoothly
        if (p.y < -10) p.y = height + 10;
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        const currentAlpha = 0.2 + Math.abs(Math.sin(p.alpha)) * 0.55;
        const px = p.x + offsetX * 1.5;
        const py = p.y + offsetY * 1.5;

        ctx.save();
        ctx.globalAlpha = currentAlpha;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = p.radius * 4;
        ctx.beginPath();
        ctx.arc(px, py, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}
    />
  );
}
