import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './RotatingLogo.css';

interface RotatingLogoProps {
  src: string;
  alt?: string;
  size?: number;
  rotationSpeed?: number;
  hoverScale?: number;
  glowEffect?: boolean;
  pulseEffect?: boolean;
  particleEffect?: boolean;
  className?: string;
}

const RotatingLogo: React.FC<RotatingLogoProps> = ({
  src,
  alt = 'Rotating Logo',
  size = 200,
  rotationSpeed = 10,
  hoverScale = 1.2,
  glowEffect = true,
  pulseEffect = true,
  particleEffect = true,
  className = '',
}) => {
  const logoRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const outerRingRef = useRef<HTMLDivElement>(null);
  const innerRingRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const rotationTl = useRef<GSAPTimeline | null>(null);
  const pulseTl = useRef<GSAPTimeline | null>(null);
  const clickCount = useRef<number>(0);
  const accelerationTimer = useRef<number | null>(null);

  useEffect(() => {
    if (!logoRef.current || !imageRef.current || !outerRingRef.current || !innerRingRef.current) return;

    const logo = logoRef.current;
    const image = imageRef.current;
    const outerRing = outerRingRef.current;
    const innerRing = innerRingRef.current;

    // Continuous rotation animation
    rotationTl.current = gsap.timeline({ repeat: -1 })
      .to(image, {
        rotation: 360,
        duration: rotationSpeed,
        ease: "none",
      }, 0)
      .to(outerRing, {
        rotation: -360,
        duration: rotationSpeed * 1.5,
        ease: "none",
      }, 0)
      .to(innerRing, {
        rotation: 360,
        duration: rotationSpeed * 0.8,
        ease: "none",
      }, 0);

    // Pulse effect
    if (pulseEffect) {
      pulseTl.current = gsap.timeline({ repeat: -1 })
        .to(logo, {
          scale: 1.05,
          duration: 2,
          ease: "power2.inOut",
        })
        .to(logo, {
          scale: 1,
          duration: 2,
          ease: "power2.inOut",
        });
    }

    // Mouse interactions
    const handleMouseEnter = () => {
      gsap.to(logo, {
        scale: hoverScale,
        duration: 0.4,
        ease: "power2.out",
      });

      if (glowEffect) {
        gsap.to(logo, {
          filter: `
            drop-shadow(0 0 25px #00FFFF)
            drop-shadow(0 0 50px #00FFFF)
            drop-shadow(0 0 75px #00FFFF)
          `,
          duration: 0.4,
        });
      }

      // Speed up rotation on hover
      if (rotationTl.current) {
        gsap.to(rotationTl.current, {
          timeScale: 2,
          duration: 0.5,
        });
      }
    };

    const handleMouseLeave = () => {
      gsap.to(logo, {
        scale: 1,
        duration: 0.4,
        ease: "power2.out",
      });

      if (glowEffect) {
        gsap.to(logo, {
          filter: `
            drop-shadow(0 0 15px #00FFFF)
            drop-shadow(0 0 30px #00FFFF)
          `,
          duration: 0.4,
        });
      }

      // Restore normal rotation speed
      if (rotationTl.current) {
        gsap.to(rotationTl.current, {
          timeScale: 1,
          duration: 0.5,
        });
      }
    };

    // Click animation with acceleration and expansion
    const handleClick = () => {
      clickCount.current += 1;
      
      // Clear existing acceleration timer
      if (accelerationTimer.current) {
        clearTimeout(accelerationTimer.current);
      }
      
      // Immediate visual feedback
      gsap.to(logo, {
        scale: 0.9,
        duration: 0.1,
        ease: "power2.out",
        yoyo: true,
        repeat: 1,
      });

      // Calculate acceleration based on click count
      const accelerationFactor = Math.min(clickCount.current * 0.5, 5); // Max 5x speed
      const expansionFactor = 1 + (clickCount.current * 0.02); // Slight expansion
      
      // Accelerate rotation
      if (rotationTl.current) {
        gsap.to(rotationTl.current, {
          timeScale: 1 + accelerationFactor,
          duration: 0.3,
        });
      }
      
      // Expand logo
      gsap.to(logo, {
        scale: expansionFactor,
        duration: 0.5,
        ease: "power2.out",
      });
      
      // Add intense glow effect
      gsap.to(logo, {
        filter: `
          drop-shadow(0 0 ${25 + clickCount.current * 10}px #00FFFF)
          drop-shadow(0 0 ${50 + clickCount.current * 20}px #00FFFF)
          drop-shadow(0 0 ${75 + clickCount.current * 30}px #00FFFF)
        `,
        duration: 0.3,
      });

      // Add accelerated class for visual feedback
      if (clickCount.current > 2) {
        logo.classList.add('accelerated');
      }
      
      // Create explosion effect
      createExplosionEffect();
      
      // Reset acceleration after delay
      accelerationTimer.current = setTimeout(() => {
        clickCount.current = Math.max(0, clickCount.current - 1);
        
        if (clickCount.current <= 2) {
          logo.classList.remove('accelerated');
        }
        
        if (clickCount.current === 0) {
          // Return to normal state
          if (rotationTl.current) {
            gsap.to(rotationTl.current, {
              timeScale: 1,
              duration: 1,
            });
          }
          
          gsap.to(logo, {
            scale: 1,
            duration: 1,
            ease: "power2.out",
          });
          
          if (glowEffect) {
            gsap.to(logo, {
              filter: `
                drop-shadow(0 0 15px #00FFFF)
                drop-shadow(0 0 30px #00FFFF)
              `,
              duration: 1,
            });
          }
        }
      }, 2000) as unknown as number;
    };

    // Particle animation
    const animateParticles = () => {
      if (!particlesRef.current || !particleEffect) return;

      const particles = particlesRef.current.children;
      
      Array.from(particles).forEach((particle, index) => {
        const angle = (index / particles.length) * Math.PI * 2;
        const radius = size / 2 + 30;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        gsap.fromTo(particle as HTMLElement, {
          x: 0,
          y: 0,
          scale: 0,
          opacity: 0,
        }, {
          x,
          y,
          scale: Math.random() * 0.5 + 0.5,
          opacity: Math.random() * 0.7 + 0.3,
          duration: 2 + Math.random() * 2,
          ease: "power2.out",
          repeat: -1,
          yoyo: true,
          delay: index * 0.1,
        });
      });
    };

    const createExplosionEffect = () => {
      const explosionContainer = document.createElement('div');
      explosionContainer.className = 'explosion-container';
      logo.appendChild(explosionContainer);

      // Create more particles for higher click counts
      const particleCount = Math.min(12 + clickCount.current * 3, 30);
      
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'explosion-particle';
        explosionContainer.appendChild(particle);

        const angle = (i / particleCount) * Math.PI * 2;
        const distance = 100 + Math.random() * 50 + clickCount.current * 20;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        
        // Vary particle colors based on click intensity
        const colors = ['#00FFFF', '#FF0080', '#FFFF00', '#8000FF'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        particle.style.background = color;
        particle.style.boxShadow = `0 0 12px ${color}`;

        gsap.fromTo(particle, {
          x: 0,
          y: 0,
          scale: 1,
          opacity: 1,
        }, {
          x,
          y,
          scale: 0,
          opacity: 0,
          duration: 0.8 + Math.random() * 0.4,
          ease: "power2.out",
        });
      }

      // Remove explosion container after animation
      setTimeout(() => {
        if (logo.contains(explosionContainer)) {
          logo.removeChild(explosionContainer);
        }
      }, 1500);
    };

    logo.addEventListener('mouseenter', handleMouseEnter);
    logo.addEventListener('mouseleave', handleMouseLeave);
    logo.addEventListener('click', handleClick);

    // Initialize particles
    if (particleEffect) {
      setTimeout(animateParticles, 500);
    }

    return () => {
      logo.removeEventListener('mouseenter', handleMouseEnter);
      logo.removeEventListener('mouseleave', handleMouseLeave);
      logo.removeEventListener('click', handleClick);
      
      if (accelerationTimer.current) {
        clearTimeout(accelerationTimer.current);
      }
      
      rotationTl.current?.kill();
      pulseTl.current?.kill();
    };
  }, [size, rotationSpeed, hoverScale, glowEffect, pulseEffect, particleEffect]);

  const logoStyle = {
    width: `${size}px`,
    height: `${size}px`,
  };

  return (
    <div
      ref={logoRef}
      className={`rotating-logo ${className}`}
      style={logoStyle}
    >
      {/* Particle effect background */}
      {particleEffect && (
        <div ref={particlesRef} className="particles-container">
          {Array.from({ length: 8 }, (_, i) => (
            <div key={i} className="floating-particle" />
          ))}
        </div>
      )}

      {/* Outer decorative ring */}
      <div ref={outerRingRef} className="outer-ring">
        <div className="ring-segment" />
        <div className="ring-segment" />
        <div className="ring-segment" />
        <div className="ring-segment" />
      </div>

      {/* Inner decorative ring */}
      <div ref={innerRingRef} className="inner-ring">
        <div className="inner-dot" />
        <div className="inner-dot" />
        <div className="inner-dot" />
        <div className="inner-dot" />
        <div className="inner-dot" />
        <div className="inner-dot" />
      </div>

      {/* Main logo image */}
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        className="logo-image"
        draggable={false}
      />

      {/* Glow overlay */}
      {glowEffect && <div className="glow-overlay" />}

      {/* Energy rings */}
      <div className="energy-ring energy-ring-1" />
      <div className="energy-ring energy-ring-2" />
    </div>
  );
};

export default RotatingLogo;
