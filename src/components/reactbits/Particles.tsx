import React, { useEffect, useRef } from 'react';

interface ParticlesProps {
  particleColors?: string[];
  particleCount?: number;
  speed?: number;
  particleBaseSize?: number;
  className?: string;
}

export const Particles: React.FC<ParticlesProps> = ({
  particleColors = ['#10b981', '#06b6d4', '#64748b'],
  particleCount = 45,
  speed = 0.4,
  particleBaseSize = 1.5,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let isRunning = true;
    let width = window.innerWidth;
    let height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resizeCanvas = () => {
      if (!canvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.resetTransform?.();
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * speed,
      vy: (Math.random() - 0.5) * speed,
      size: Math.random() * particleBaseSize + 0.8,
      color: particleColors[Math.floor(Math.random() * particleColors.length)],
      alpha: Math.random() * 0.4 + 0.2,
    }));

    const maxDist = 110;
    const maxDistSq = maxDist * maxDist;

    const render = () => {
      if (!isRunning) return;

      ctx.clearRect(0, 0, width, height);

      // 1. Draw and update particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        else if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        else if (p.y > height) p.y = 0;

        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. Connect nearby particles in batched paths
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 0.5;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distSq = dx * dx + dy * dy;

          if (distSq < maxDistSq) {
            const dist = Math.sqrt(distSq);
            ctx.globalAlpha = (1 - dist / maxDist) * 0.12;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    // Pause animation when tab is inactive or not visible
    const handleVisibilityChange = () => {
      if (document.hidden) {
        isRunning = false;
        cancelAnimationFrame(animationFrameId);
      } else {
        if (!isRunning) {
          isRunning = true;
          animationFrameId = requestAnimationFrame(render);
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Auto-pause when canvas is out of viewport using IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          if (!isRunning && !document.hidden) {
            isRunning = true;
            animationFrameId = requestAnimationFrame(render);
          }
        } else {
          isRunning = false;
          cancelAnimationFrame(animationFrameId);
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(canvas);
    animationFrameId = requestAnimationFrame(render);

    return () => {
      isRunning = false;
      window.removeEventListener('resize', resizeCanvas);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, [particleColors, particleCount, speed, particleBaseSize]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 transform-gpu ${className}`}
    />
  );
};

