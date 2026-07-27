import React, { useEffect, useRef } from 'react';

export const EmbersCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    interface Ember {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      opacity: number;
      fadeSpeed: number;
      color: string;
    }

    const embers: Ember[] = [];
    const maxEmbers = 45;

    const colors = [
      '#38BDF8', // Electric Cyan
      '#F59E0B', // Glowing Amber Gold
      '#60A5FA', // Ice Blue
      '#00F0FF', // Vivid Cyan
      '#FBBF24'  // Gold Accent
    ];

    function createEmber(): Ember {
      return {
        x: Math.random() * width,
        y: height + Math.random() * 20,
        size: Math.random() * 2.5 + 0.8,
        speedY: Math.random() * 0.8 + 0.3,
        speedX: (Math.random() - 0.5) * 0.4,
        opacity: Math.random() * 0.6 + 0.2,
        fadeSpeed: Math.random() * 0.003 + 0.001,
        color: colors[Math.floor(Math.random() * colors.length)]
      };
    }

    for (let i = 0; i < maxEmbers; i++) {
      const ember = createEmber();
      ember.y = Math.random() * height; // Spread initially
      embers.push(ember);
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      embers.forEach((ember, index) => {
        ember.y -= ember.speedY;
        ember.x += ember.speedX;
        ember.opacity -= ember.fadeSpeed;

        if (ember.opacity <= 0 || ember.y <= -10) {
          embers[index] = createEmber();
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, ember.opacity);
        ctx.fillStyle = ember.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = ember.color;
        ctx.beginPath();
        ctx.arc(ember.x, ember.y, ember.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-70"
    />
  );
};
