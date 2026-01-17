import { useEffect, useRef } from 'react';

interface WaveBackgroundProps {
  className?: string;
}

export const WaveBackground = ({ className = '' }: WaveBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    // Particle system
    const particleCount = 15000;
    const particles: { x: number; y: number; baseX: number; baseY: number; size: number; opacity: number }[] = [];
    
    // Create grid of particles
    const cols = Math.ceil(Math.sqrt(particleCount * (window.innerWidth / window.innerHeight)));
    const rows = Math.ceil(particleCount / cols);
    const spacingX = window.innerWidth / cols;
    const spacingY = window.innerHeight / rows;

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        particles.push({
          x: j * spacingX + spacingX / 2,
          y: i * spacingY + spacingY / 2,
          baseX: j * spacingX + spacingX / 2,
          baseY: i * spacingY + spacingY / 2,
          size: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.3 + 0.1,
        });
      }
    }

    // Noise function (simplified periodic noise)
    const noise = (x: number, y: number, t: number) => {
      const scale = 0.003;
      return (
        Math.sin(x * scale + t * 0.5) * Math.cos(y * scale * 0.7 + t * 0.3) * 30 +
        Math.sin(x * scale * 1.5 + t * 0.7) * Math.cos(y * scale * 1.2 + t * 0.4) * 20 +
        Math.sin((x + y) * scale * 0.5 + t * 0.6) * 15
      );
    };

    const animate = () => {
      time += 0.008;
      
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

      // Draw particles
      for (const particle of particles) {
        const offsetX = noise(particle.baseX, particle.baseY, time);
        const offsetY = noise(particle.baseY, particle.baseX, time + 100);
        
        particle.x = particle.baseX + offsetX;
        particle.y = particle.baseY + offsetY;

        // Distance from center for vignette effect
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const distFromCenter = Math.sqrt(
          Math.pow(particle.x - centerX, 2) + Math.pow(particle.y - centerY, 2)
        );
        const maxDist = Math.sqrt(centerX * centerX + centerY * centerY);
        const vignette = 1 - Math.pow(distFromCenter / maxDist, 2) * 0.5;

        // Sparkle effect
        const sparkle = 0.7 + Math.sin(time * 2 + particle.baseX * 0.1 + particle.baseY * 0.1) * 0.3;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 0, 0, ${particle.opacity * vignette * sparkle})`;
        ctx.fill();
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
};

