import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  life: number;
  maxLife: number;
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number>();
  const mouseRef = useRef({ x: 0, y: 0 });

  // Cyberpunk neon colors
  const neonColors = [
    '#00FFFF', // Cyan
    '#FF0080', // Magenta
    '#FFFF00', // Yellow
    '#8000FF', // Purple
    '#00FF80', // Green
    '#FF4000', // Orange
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = [];
      const particleCount = Math.min(80, Math.floor((canvas.width * canvas.height) / 12000));
      
      for (let i = 0; i < particleCount; i++) {
        createParticle();
      }
    };

    const createParticle = (x?: number, y?: number) => {
      const maxLife = Math.random() * 300 + 200;
      particlesRef.current.push({
        x: x || Math.random() * canvas.width,
        y: y || Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.8 + 0.2,
        color: neonColors[Math.floor(Math.random() * neonColors.length)],
        life: maxLife,
        maxLife
      });
    };

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      
      // Create particles near cursor
      if (Math.random() < 0.3 && particlesRef.current.length < 120) {
        createParticle(
          e.clientX + (Math.random() - 0.5) * 50,
          e.clientY + (Math.random() - 0.5) * 50
        );
      }
    };

    // Click effect
    const handleClick = (e: MouseEvent) => {
      for (let i = 0; i < 8; i++) {
        setTimeout(() => {
          createParticle(
            e.clientX + (Math.random() - 0.5) * 60,
            e.clientY + (Math.random() - 0.5) * 60
          );
        }, i * 50);
      }
    };

    // Animation loop
    const animate = () => {
      // Clear with pure black background
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particlesRef.current.forEach((particle, index) => {
        // Mouse interaction
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          const force = (150 - distance) / 150;
          particle.vx += (dx / distance) * force * 0.02;
          particle.vy += (dy / distance) * force * 0.02;
        }

        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Add drift and friction
        particle.vy += 0.001;
        particle.vx *= 0.995;
        particle.vy *= 0.995;

        // Boundary wrapping
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Update life
        particle.life--;
        particle.opacity = Math.max(0, (particle.life / particle.maxLife) * 0.8);

        // Draw particle with neon glow
        ctx.save();
        ctx.globalAlpha = particle.opacity;
        
        // Outer glow
        ctx.shadowBlur = 20;
        ctx.shadowColor = particle.color;
        ctx.fillStyle = particle.color;
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Inner bright core
        ctx.shadowBlur = 5;
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 0.3, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();

        // Remove dead particles
        if (particle.life <= 0) {
          particlesRef.current.splice(index, 1);
        }
      });

      // Draw connections between nearby particles
      ctx.strokeStyle = 'rgba(0, 255, 255, 0.15)';
      ctx.lineWidth = 1;
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const dx = particlesRef.current[i].x - particlesRef.current[j].x;
          const dy = particlesRef.current[i].y - particlesRef.current[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.globalAlpha = (100 - distance) / 100 * 0.5;
            ctx.beginPath();
            ctx.moveTo(particlesRef.current[i].x, particlesRef.current[i].y);
            ctx.lineTo(particlesRef.current[j].x, particlesRef.current[j].y);
            ctx.stroke();
          }
        }
      }

      // Add new particles occasionally
      if (Math.random() < 0.02 && particlesRef.current.length < 60) {
        createParticle();
      }

      // Add floating geometric shapes occasionally
      if (Math.random() < 0.005) {
        drawFloatingShape(ctx);
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Draw floating neon geometric shapes
    const drawFloatingShape = (ctx: CanvasRenderingContext2D) => {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const size = Math.random() * 30 + 10;
      const color = neonColors[Math.floor(Math.random() * neonColors.length)];
      
      ctx.save();
      ctx.globalAlpha = 0.3;
      ctx.strokeStyle = color;
      ctx.shadowBlur = 15;
      ctx.shadowColor = color;
      ctx.lineWidth = 2;
      
      const shapeType = Math.floor(Math.random() * 3);
      
      if (shapeType === 0) {
        // Triangle
        ctx.beginPath();
        ctx.moveTo(x, y - size);
        ctx.lineTo(x - size, y + size);
        ctx.lineTo(x + size, y + size);
        ctx.closePath();
        ctx.stroke();
      } else if (shapeType === 1) {
        // Square
        ctx.strokeRect(x - size/2, y - size/2, size, size);
      } else {
        // Hexagon
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const angle = (i * Math.PI) / 3;
          const px = x + size * Math.cos(angle);
          const py = y + size * Math.sin(angle);
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.stroke();
      }
      
      ctx.restore();
    };

    initParticles();
    animate();

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
    };
  }, [neonColors]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -20,
        background: '#000000',
        pointerEvents: 'none',
      }}
    />
  );
}
