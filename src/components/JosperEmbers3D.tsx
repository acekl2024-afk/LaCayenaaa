import React, { useEffect, useRef } from 'react';

export const JosperEmbers3D: React.FC<{ className?: string; intensity?: 'subtle' | 'vibrant' }> = ({
  className = '',
  intensity = 'subtle',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 300);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 200);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    const particleCount = intensity === 'vibrant' ? 35 : 18;
    const particles: Array<{
      x: number;
      y: number;
      z: number;
      radius: number;
      vx: number;
      vy: number;
      vz: number;
      color: string;
      alpha: number;
      decay: number;
    }> = [];

    const emberColors = [
      '#FF4500', // OrangeRed
      '#FF8C00', // DarkOrange
      '#FFA500', // Orange
      '#FFD700', // Gold
      '#B52A2A', // Cayenne Red
      '#E67E22', // Amber
    ];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 200 + 50,
        radius: Math.random() * 2.5 + 1,
        vx: (Math.random() - 0.5) * 0.6,
        vy: -(Math.random() * 1.2 + 0.4),
        vz: (Math.random() - 0.5) * 0.4,
        color: emberColors[Math.floor(Math.random() * emberColors.length)],
        alpha: Math.random() * 0.7 + 0.3,
        decay: Math.random() * 0.006 + 0.003,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;
        p.alpha -= p.decay;

        if (p.y < -10 || p.alpha <= 0 || p.x < -10 || p.x > width + 10) {
          p.x = Math.random() * width;
          p.y = height + 10;
          p.z = Math.random() * 200 + 50;
          p.alpha = Math.random() * 0.8 + 0.2;
        }

        // 3D perspective projection
        const scale = 200 / p.z;
        const radius = Math.max(0.6, p.radius * scale);

        ctx.save();
        ctx.globalAlpha = Math.max(0, Math.min(1, p.alpha));
        ctx.shadowColor = p.color;
        ctx.shadowBlur = radius * 4;

        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [intensity]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 w-full h-full ${className}`}
    />
  );
};
