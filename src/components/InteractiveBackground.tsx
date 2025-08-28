import { useEffect, useRef, useState } from 'react';
import './InteractiveBackground.css';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  life: number;
}

export default function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number>();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Cyberpunk color palette
  const colors = [
    '#00FFFF', // Cyan
    '#FF0080', // Magenta
    '#FFFF00', // Yellow
    '#8000FF', // Purple
    '#00FF80', // Green
  ];

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    // Update CSS custom properties for cursor position
    const updateCursorPosition = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      document.documentElement.style.setProperty('--mouse-x', `${x}%`);
      document.documentElement.style.setProperty('--mouse-y', `${y}%`);
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    window.addEventListener('mousemove', updateCursorPosition);

    return () => {
      window.removeEventListener('resize', updateDimensions);
      window.removeEventListener('mousemove', updateCursorPosition);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = [];
      const particleCount = Math.min(50, Math.floor((dimensions.width * dimensions.height) / 15000));
      
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * dimensions.width,
          y: Math.random() * dimensions.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.2,
          color: colors[Math.floor(Math.random() * colors.length)],
          life: Math.random() * 100 + 50
        });
      }
    };

    // Mouse movement handler
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    // Create particle at mouse position
    const createMouseParticle = (x: number, y: number) => {
      if (particlesRef.current.length < 100) {
        particlesRef.current.push({
          x: x + (Math.random() - 0.5) * 20,
          y: y + (Math.random() - 0.5) * 20,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          size: Math.random() * 3 + 1,
          opacity: 0.8,
          color: colors[Math.floor(Math.random() * colors.length)],
          life: 30
        });
      }
    };

    // Animation loop
    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, dimensions.width, dimensions.height);

      // Update and draw particles
      particlesRef.current.forEach((particle, index) => {
        // Mouse interaction
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          const force = (100 - distance) / 100;
          particle.vx += (dx / distance) * force * 0.01;
          particle.vy += (dy / distance) * force * 0.01;
        }

        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Add slight gravity and friction
        particle.vy += 0.001;
        particle.vx *= 0.99;
        particle.vy *= 0.99;

        // Boundary check with wrapping
        if (particle.x < 0) particle.x = dimensions.width;
        if (particle.x > dimensions.width) particle.x = 0;
        if (particle.y < 0) particle.y = dimensions.height;
        if (particle.y > dimensions.height) particle.y = 0;

        // Update life
        particle.life--;
        particle.opacity = Math.max(0, particle.opacity * 0.998);

        // Draw particle
        ctx.save();
        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = particle.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Remove dead particles
        if (particle.life <= 0 || particle.opacity <= 0.01) {
          particlesRef.current.splice(index, 1);
        }
      });

      // Draw connections between nearby particles
      ctx.strokeStyle = 'rgba(0, 255, 255, 0.1)';
      ctx.lineWidth = 1;
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const dx = particlesRef.current[i].x - particlesRef.current[j].x;
          const dy = particlesRef.current[i].y - particlesRef.current[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 80) {
            ctx.globalAlpha = (80 - distance) / 80 * 0.3;
            ctx.beginPath();
            ctx.moveTo(particlesRef.current[i].x, particlesRef.current[i].y);
            ctx.lineTo(particlesRef.current[j].x, particlesRef.current[j].y);
            ctx.stroke();
          }
        }
      }

      // Add new particles occasionally
      if (Math.random() < 0.03 && particlesRef.current.length < 30) {
        particlesRef.current.push({
          x: Math.random() * dimensions.width,
          y: Math.random() * dimensions.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.2,
          color: colors[Math.floor(Math.random() * colors.length)],
          life: Math.random() * 100 + 50
        });
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Mouse click handler for burst effect
    const handleClick = (e: MouseEvent) => {
      for (let i = 0; i < 5; i++) {
        setTimeout(() => {
          createMouseParticle(e.clientX, e.clientY);
        }, i * 50);
      }
    };

    // Mouse move handler with throttling
    let mouseMoveTimeout: number;
    const throttledMouseMove = (e: MouseEvent) => {
      handleMouseMove(e);
      
      if (!mouseMoveTimeout) {
        mouseMoveTimeout = window.setTimeout(() => {
          if (Math.random() < 0.3) {
            createMouseParticle(e.clientX, e.clientY);
          }
          mouseMoveTimeout = 0;
        }, 100);
      }
    };

    initParticles();
    animate();

    window.addEventListener('mousemove', throttledMouseMove);
    window.addEventListener('click', handleClick);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener('mousemove', throttledMouseMove);
      window.removeEventListener('click', handleClick);
      if (mouseMoveTimeout) {
        clearTimeout(mouseMoveTimeout);
      }
    };
  }, [dimensions, colors]);

  return (
    <div className="interactive-background">
      <canvas
        ref={canvasRef}
        className="background-canvas"
        style={{
          width: dimensions.width,
          height: dimensions.height,
        }}
      />
      <div className="background-overlay" />
    </div>
  );
}
