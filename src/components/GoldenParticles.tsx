import React, { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  color: string;
  rotation: number;
  shape: 'circle' | 'sparkle' | 'rune';
}

export const GoldenParticles: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const colors = ['#FFD700', '#B99668', '#F5D061', '#E6C280', '#FFFFFF'];
    const shapes: ('circle' | 'sparkle' | 'rune')[] = ['circle', 'sparkle', 'rune'];
    const newParticles: Particle[] = [];

    // Generate 30 golden particles radiating outward
    for (let i = 0; i < 30; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 5;
      newParticles.push({
        id: i,
        x: 50 + (Math.random() * 20 - 10), // percentage relative to container
        y: 50 + (Math.random() * 20 - 10),
        size: 4 + Math.random() * 8,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1, // slight upward float
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        shape: shapes[Math.floor(Math.random() * shapes.length)]
      });
    }

    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 animate-gold-particle"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            ['--vx' as any]: `${p.vx * 15}px`,
            ['--vy' as any]: `${p.vy * 15}px`,
            ['--rot' as any]: `${p.rotation}deg`
          }}
        >
          {p.shape === 'sparkle' ? (
            <svg viewBox="0 0 24 24" fill={p.color} className="w-full h-full opacity-90 drop-shadow-[0_0_6px_rgba(255,215,0,0.8)]">
              <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
            </svg>
          ) : p.shape === 'rune' ? (
            <div className="text-[10px] font-bold text-[#FFD700] drop-shadow-[0_0_8px_rgba(255,215,0,0.9)]">
              ᚠ
            </div>
          ) : (
            <div
              className="w-full h-full rounded-full shadow-[0_0_8px_rgba(255,215,0,0.8)]"
              style={{ backgroundColor: p.color }}
            />
          )}
        </div>
      ))}
    </div>
  );
};
