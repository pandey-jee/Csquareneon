import { useEffect, useRef } from 'react';

export default function GeometricBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Geometric shapes data
    const shapes: Array<{
      x: number;
      y: number;
      size: number;
      rotation: number;
      speed: number;
      type: 'triangle' | 'square' | 'hexagon';
      opacity: number;
    }> = [];

    // Create shapes
    for (let i = 0; i < 15; i++) {
      shapes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 60 + 20,
        rotation: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.02 + 0.005,
        type: ['triangle', 'square', 'hexagon'][Math.floor(Math.random() * 3)] as 'triangle' | 'square' | 'hexagon',
        opacity: Math.random() * 0.1 + 0.02
      });
    }

    // Draw functions
    const drawTriangle = (x: number, y: number, size: number, rotation: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.beginPath();
      ctx.moveTo(0, -size / 2);
      ctx.lineTo(-size / 2, size / 2);
      ctx.lineTo(size / 2, size / 2);
      ctx.closePath();
      ctx.stroke();
      ctx.restore();
    };

    const drawSquare = (x: number, y: number, size: number, rotation: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.strokeRect(-size / 2, -size / 2, size, size);
      ctx.restore();
    };

    const drawHexagon = (x: number, y: number, size: number, rotation: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI) / 3;
        const pointX = Math.cos(angle) * size / 2;
        const pointY = Math.sin(angle) * size / 2;
        if (i === 0) {
          ctx.moveTo(pointX, pointY);
        } else {
          ctx.lineTo(pointX, pointY);
        }
      }
      ctx.closePath();
      ctx.stroke();
      ctx.restore();
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      shapes.forEach(shape => {
        // Set cyberpunk colors
        const colors = ['#00FFFF', '#FF0080', '#FFFF00', '#00FF80'];
        ctx.strokeStyle = colors[Math.floor(shape.x / 200) % colors.length];
        ctx.globalAlpha = shape.opacity;
        ctx.lineWidth = 1;

        // Draw shape
        switch (shape.type) {
          case 'triangle':
            drawTriangle(shape.x, shape.y, shape.size, shape.rotation);
            break;
          case 'square':
            drawSquare(shape.x, shape.y, shape.size, shape.rotation);
            break;
          case 'hexagon':
            drawHexagon(shape.x, shape.y, shape.size, shape.rotation);
            break;
        }

        // Update rotation
        shape.rotation += shape.speed;

        // Slowly move shapes
        shape.x += Math.sin(shape.rotation) * 0.2;
        shape.y += Math.cos(shape.rotation) * 0.1;

        // Wrap around screen
        if (shape.x > canvas.width + 50) shape.x = -50;
        if (shape.x < -50) shape.x = canvas.width + 50;
        if (shape.y > canvas.height + 50) shape.y = -50;
        if (shape.y < -50) shape.y = canvas.height + 50;
      });

      ctx.globalAlpha = 1;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        opacity: 0.3,
        mixBlendMode: 'screen'
      }}
    />
  );
}
