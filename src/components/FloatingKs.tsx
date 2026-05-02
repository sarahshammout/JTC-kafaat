import { useMemo } from "react";

interface FloatingK {
  id: number;
  size: string;
  x: string;
  y: string;
  opacity: number;
  rotation: number;
  duration: number;
  delay: number;
  driftX: number;
  driftY: number;
  blur: number;
  scale: number;
  char: string;
}

export default function FloatingKs() {
  const particles = useMemo<FloatingK[]>(() => {
  const chars = ['K', 'K', 'K','K','K', 'K', 'K', 'K', 'K', 'K', 'K', 'K'];
    return Array.from({ length: 18 }, (_, i) => ({
      id: i,
      char: chars[i % chars.length],
      size: `${2 + Math.random() * 9}rem`,
      x: `${Math.random() * 100}%`,
      y: `${Math.random() * 100}%`,
      opacity: 0.015 + Math.random() * 0.055,
      rotation: Math.random() * 360 - 180,
      duration: 25 + Math.random() * 45,
      delay: -(Math.random() * 40),
      driftX: (Math.random() - 0.5) * 140,
      driftY: (Math.random() - 0.5) * 100,
      blur: Math.random() > 0.7 ? 1 : 0,
      scale: 0.85 + Math.random() * 0.3,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none select-none z-0 overflow-hidden">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute font-bold text-white block"
          style={{
            fontSize: p.size,
            left: p.x,
            top: p.y,
            opacity: p.opacity,
            transform: `rotate(${p.rotation}deg) scale(${p.scale})`,
            filter: p.blur ? `blur(${p.blur}px)` : undefined,
            animation: `floatK ${p.duration}s ease-in-out ${p.delay}s infinite`,
            ["--drift-x" as string]: `${p.driftX}px`,
            ["--drift-y" as string]: `${p.driftY}px`,
            ["--start-rot" as string]: `${p.rotation}deg`,
            willChange: 'transform',
          }}
        >
          {p.char}
        </span>
      ))}
    </div>
  );
}
