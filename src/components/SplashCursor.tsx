import { useEffect, useRef } from 'react';

interface CursorTrail {
  x: number;
  y: number;
  opacity: number;
  size: number;
  color: string;
  life: number;
}

export default function SplashCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const trailsRef = useRef<CursorTrail[]>([]);
  const animationFrameRef = useRef<number>();
  const lastMouseRef = useRef({ x: 0, y: 0 });

  // Cyberpunk neon colors
  const neonColors = [
    '#00FFFF', // Cyan
    '#FF0080', // Magenta
    '#FFFF00', // Yellow
    '#8000FF', // Purple
    '#00FF80', // Green
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

    // Create trail particle
    const createTrail = (x: number, y: number, isClick = false) => {
      const color = neonColors[Math.floor(Math.random() * neonColors.length)];
      const size = isClick ? Math.random() * 8 + 4 : Math.random() * 4 + 2;
      const life = isClick ? 60 : 30;
      
      trailsRef.current.push({
        x: x + (Math.random() - 0.5) * 20,
        y: y + (Math.random() - 0.5) * 20,
        opacity: 1,
        size,
        color,
        life
      });
    };

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      
      // Calculate movement distance
      const dx = x - lastMouseRef.current.x;
      const dy = y - lastMouseRef.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // Create trails based on movement speed
      if (distance > 2) {
        for (let i = 0; i < Math.min(Math.floor(distance / 10), 3); i++) {
          createTrail(x, y);
        }
      }
      
      lastMouseRef.current = { x, y };
    };

    // Click effect
    const handleClick = (e: MouseEvent) => {
      for (let i = 0; i < 12; i++) {
        setTimeout(() => {
          createTrail(e.clientX, e.clientY, true);
        }, i * 30);
      }
    };

    // Ripple effect on click
    const createRipple = (x: number, y: number) => {
      const ripples = 3;
      for (let i = 0; i < ripples; i++) {
        setTimeout(() => {
          const ripple = {
            x,
            y,
            radius: 0,
            maxRadius: 100 + i * 50,
            opacity: 0.8,
            color: neonColors[Math.floor(Math.random() * neonColors.length)],
            life: 60
          };
          
          const animateRipple = () => {
            if (ripple.life <= 0) return;
            
            ctx.save();
            ctx.globalAlpha = ripple.opacity * (ripple.life / 60);
            ctx.strokeStyle = ripple.color;
            ctx.shadowBlur = 20;
            ctx.shadowColor = ripple.color;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
            ctx.stroke();
            ctx.restore();
            
            ripple.radius += 3;
            ripple.life--;
            ripple.opacity *= 0.98;
            
            if (ripple.life > 0) {
              requestAnimationFrame(animateRipple);
            }
          };
          
          animateRipple();
        }, i * 100);
      }
    };

    const handleClickWithRipple = (e: MouseEvent) => {
      handleClick(e);
      createRipple(e.clientX, e.clientY);
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw trails
      trailsRef.current.forEach((trail, index) => {
        // Update trail
        trail.life--;
        trail.opacity = trail.life / 30;
        trail.size *= 0.98;

        // Draw trail with glow effect
        ctx.save();
        ctx.globalAlpha = trail.opacity;
        
        // Outer glow
        ctx.shadowBlur = 15;
        ctx.shadowColor = trail.color;
        ctx.fillStyle = trail.color;
        ctx.beginPath();
        ctx.arc(trail.x, trail.y, trail.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Inner bright core
        ctx.shadowBlur = 5;
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(trail.x, trail.y, trail.size * 0.4, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();

        // Remove dead trails
        if (trail.life <= 0) {
          trailsRef.current.splice(index, 1);
        }
      });

      // Limit trail count for performance
      if (trailsRef.current.length > 100) {
        trailsRef.current.splice(0, trailsRef.current.length - 100);
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClickWithRipple);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClickWithRipple);
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
        zIndex: 1000,
        pointerEvents: 'none',
      }}
    />
  );
}
