import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import './Button3D.css';

interface Button3DProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'accent' | 'tertiary';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
  glowEffect?: boolean;
  pulseEffect?: boolean;
  rippleEffect?: boolean;
}

const Button3D: React.FC<Button3DProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  glowEffect = true,
  pulseEffect = false,
  rippleEffect = true,
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const rippleContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!buttonRef.current) return;

    const button = buttonRef.current;
    let isPressed = false;

    // Initial 3D setup
    gsap.set(button, {
      transformStyle: "preserve-3d",
      transformOrigin: "center center",
    });

    // Mouse enter animation
    const handleMouseEnter = () => {
      if (disabled || isPressed) return;
      
      gsap.to(button, {
        rotationX: -5,
        rotationY: 5,
        z: 10,
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out",
      });

      if (glowEffect) {
        gsap.to(button, {
          boxShadow: `
            0 0 20px var(--${variant}-color),
            0 0 40px var(--${variant}-color),
            0 10px 30px rgba(0, 0, 0, 0.3),
            inset 0 0 20px rgba(255, 255, 255, 0.1)
          `,
          duration: 0.3,
        });
      }
    };

    // Mouse leave animation
    const handleMouseLeave = () => {
      if (disabled || isPressed) return;
      
      gsap.to(button, {
        rotationX: 0,
        rotationY: 0,
        z: 0,
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });

      if (glowEffect) {
        gsap.to(button, {
          boxShadow: `
            0 0 10px var(--${variant}-color),
            0 5px 15px rgba(0, 0, 0, 0.2),
            inset 0 0 10px rgba(255, 255, 255, 0.05)
          `,
          duration: 0.3,
        });
      }
    };

    // Mouse down animation
    const handleMouseDown = (e: MouseEvent) => {
      if (disabled) return;
      
      isPressed = true;
      
      gsap.to(button, {
        rotationX: 0,
        rotationY: 0,
        z: -5,
        scale: 0.95,
        duration: 0.1,
        ease: "power2.out",
      });

      // Ripple effect
      if (rippleEffect && rippleContainerRef.current) {
        createRipple(e);
      }
    };

    // Mouse up animation
    const handleMouseUp = () => {
      if (disabled) return;
      
      isPressed = false;
      
      gsap.to(button, {
        rotationX: -5,
        rotationY: 5,
        z: 10,
        scale: 1.05,
        duration: 0.2,
        ease: "power2.out",
      });
    };

    // Mouse move for dynamic 3D rotation
    const handleMouseMove = (e: MouseEvent) => {
      if (disabled || isPressed) return;
      
      const rect = button.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = (e.clientX - centerX) / (rect.width / 2);
      const deltaY = (e.clientY - centerY) / (rect.height / 2);
      
      const rotationY = deltaX * 15; // Max 15 degrees
      const rotationX = -deltaY * 10; // Max 10 degrees
      
      gsap.to(button, {
        rotationX,
        rotationY,
        duration: 0.2,
        ease: "power2.out",
      });
    };

    // Ripple effect function
    const createRipple = (e: MouseEvent) => {
      if (!rippleContainerRef.current) return;
      
      const container = rippleContainerRef.current;
      const rect = button.getBoundingClientRect();
      
      const ripple = document.createElement('div');
      ripple.className = 'button-ripple';
      
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      
      container.appendChild(ripple);
      
      gsap.fromTo(ripple, {
        scale: 0,
        opacity: 0.6,
      }, {
        scale: 2,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        onComplete: () => {
          if (container.contains(ripple)) {
            container.removeChild(ripple);
          }
        }
      });
    };

    button.addEventListener('mouseenter', handleMouseEnter);
    button.addEventListener('mouseleave', handleMouseLeave);
    button.addEventListener('mousedown', handleMouseDown);
    button.addEventListener('mouseup', handleMouseUp);
    button.addEventListener('mousemove', handleMouseMove);

    return () => {
      button.removeEventListener('mouseenter', handleMouseEnter);
      button.removeEventListener('mouseleave', handleMouseLeave);
      button.removeEventListener('mousedown', handleMouseDown);
      button.removeEventListener('mouseup', handleMouseUp);
      button.removeEventListener('mousemove', handleMouseMove);
    };
  }, [variant, disabled, glowEffect, rippleEffect]);

  // Pulse effect
  useEffect(() => {
    if (!pulseEffect || !buttonRef.current) return;

    const button = buttonRef.current;
    const pulseTimeline = gsap.timeline({ repeat: -1 });
    
    pulseTimeline.to(button, {
      scale: 1.02,
      duration: 1.5,
      ease: "power2.inOut",
    }).to(button, {
      scale: 1,
      duration: 1.5,
      ease: "power2.inOut",
    });

    return () => {
      pulseTimeline.kill();
    };
  }, [pulseEffect]);

  const buttonClasses = [
    'btn-3d',
    `btn-3d-${variant}`,
    `btn-3d-${size}`,
    disabled ? 'btn-3d-disabled' : '',
    pulseEffect ? 'btn-3d-pulse' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <button
      ref={buttonRef}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
    >
      <div className="btn-3d-inner">
        <div className="btn-3d-content">
          {children}
        </div>
        {rippleEffect && (
          <div ref={rippleContainerRef} className="btn-3d-ripple-container" />
        )}
      </div>
      <div className="btn-3d-shadow" />
    </button>
  );
};

export default Button3D;
