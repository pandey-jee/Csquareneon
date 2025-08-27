import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Advanced GSAP Animation Utilities
export const advancedGSAPUtils = {
  // 3D Transformations with perspective
  init3DTransforms: (selector: string) => {
    const elements = document.querySelectorAll(selector);
    if (elements.length > 0) {
      gsap.set(selector, {
        transformPerspective: 1000,
        transformStyle: "preserve-3d"
      });
    }
  },

  // Magnetic cursor effect for interactive elements
  magneticEffect: (selector: string) => {
    const elements = document.querySelectorAll(selector);
    
    elements.forEach((element) => {
      element.addEventListener('mouseenter', () => {
        gsap.to(element, {
          scale: 1.1,
          duration: 0.3,
          ease: "power2.out"
        });
      });

      element.addEventListener('mouseleave', () => {
        gsap.to(element, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      });

      element.addEventListener('mousemove', (e: Event) => {
        const mouseEvent = e as MouseEvent;
        const rect = (element as HTMLElement).getBoundingClientRect();
        const x = mouseEvent.clientX - rect.left - rect.width / 2;
        const y = mouseEvent.clientY - rect.top - rect.height / 2;
        
        gsap.to(element, {
          x: x * 0.1,
          y: y * 0.1,
          duration: 0.3,
          ease: "power2.out"
        });
      });
    });
  },

  // Elastic hover effect with 3D rotation
  elasticHover: (selector: string) => {
    const elements = document.querySelectorAll(selector);
    
    elements.forEach((element) => {
      element.addEventListener('mouseenter', () => {
        gsap.to(element, {
          scale: 1.05,
          rotationY: 5,
          rotationX: 5,
          duration: 0.4,
          ease: "elastic.out(1, 0.3)"
        });
      });

      element.addEventListener('mouseleave', () => {
        gsap.to(element, {
          scale: 1,
          rotationY: 0,
          rotationX: 0,
          duration: 0.4,
          ease: "elastic.out(1, 0.3)"
        });
      });
    });
  },

  // Parallax scrolling effect
  parallaxScroll: (selector: string, speed = 0.5) => {
    const elements = document.querySelectorAll(selector);
    if (elements.length > 0) {
      gsap.to(selector, {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: selector,
          start: "top bottom",
          end: "bottom top",
          scrub: speed
        }
      });
    }
  },

  // Liquid cursor effect
  liquidCursor: () => {
    // Simple cursor enhancement - can be expanded
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    cursor.style.cssText = `
      position: fixed;
      width: 20px;
      height: 20px;
      background: rgba(59, 130, 246, 0.3);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      mix-blend-mode: difference;
      transition: transform 0.1s ease;
    `;
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
      gsap.to(cursor, {
        x: e.clientX - 10,
        y: e.clientY - 10,
        duration: 0.1
      });
    });
  },

  // Text reveal animation
  textReveal: (selector: string) => {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element) => {
      gsap.fromTo(element, {
        y: 100,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });
    });
  },

  // Staggered 3D entrance animation
  staggeredEntrance3D: (selector: string, stagger = 0.2) => {
    const elements = document.querySelectorAll(selector);
    if (elements.length > 0) {
      gsap.fromTo(selector, {
        opacity: 0,
        y: 100,
        rotationX: -15
      }, {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 1,
        stagger: stagger,
        ease: "power3.out",
        scrollTrigger: {
          trigger: selector,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });
    }
  }
};

// Hook for managing GSAP animations
export const useAdvancedGSAP = () => {
  const ctx = useRef<any>(null);

  useEffect(() => {
    // Create GSAP context for cleanup
    ctx.current = gsap.context(() => {});
    
    return () => {
      if (ctx.current) {
        ctx.current.revert();
      }
    };
  }, []);

  return {
    ctx: ctx.current,
    utils: advancedGSAPUtils
  };
};
