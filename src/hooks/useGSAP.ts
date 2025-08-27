import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    gsap: any;
    ScrollTrigger: any;
  }
}

export const useGSAP = () => {
  const isInitialized = useRef(false);

  useEffect(() => {
    if (isInitialized.current) return;

    const loadGSAP = async () => {
      // Load GSAP from CDN
      if (!window.gsap) {
        const gsapScript = document.createElement('script');
        gsapScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
        gsapScript.async = true;
        document.head.appendChild(gsapScript);

        await new Promise((resolve) => {
          gsapScript.onload = resolve;
        });
      }

      // Load ScrollTrigger plugin
      if (!window.ScrollTrigger) {
        const scrollTriggerScript = document.createElement('script');
        scrollTriggerScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js';
        scrollTriggerScript.async = true;
        document.head.appendChild(scrollTriggerScript);

        await new Promise((resolve) => {
          scrollTriggerScript.onload = resolve;
        });

        // Register ScrollTrigger
        if (window.gsap && window.ScrollTrigger) {
          window.gsap.registerPlugin(window.ScrollTrigger);
        }
      }

      isInitialized.current = true;
    };

    loadGSAP();
  }, []);

  return {
    gsap: typeof window !== 'undefined' ? window.gsap : null,
    ScrollTrigger: typeof window !== 'undefined' ? window.ScrollTrigger : null,
    isLoaded: isInitialized.current,
  };
};

// GSAP animation utilities
export const gsapUtils = {
  // Text reveal animation
  revealText: (selector: string, delay = 0) => {
    if (!window.gsap) return;
    
    window.gsap.fromTo(
      selector,
      {
        y: '100%',
        opacity: 0,
      },
      {
        y: '0%',
        opacity: 1,
        duration: 0.8,
        delay,
        ease: 'power3.out',
        stagger: 0.2,
      }
    );
  },

  // Fade in animation
  fadeIn: (selector: string, delay = 0) => {
    if (!window.gsap) return;
    
    window.gsap.fromTo(
      selector,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.8,
        delay,
        ease: 'power2.out',
      }
    );
  },

  // Slide up animation
  slideUp: (selector: string, delay = 0) => {
    if (!window.gsap) return;
    
    window.gsap.fromTo(
      selector,
      {
        y: 32,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay,
        ease: 'power3.out',
      }
    );
  },

  // Counter animation
  animateCounter: (selector: string, endValue: number, duration = 2) => {
    if (!window.gsap) return;
    
    const obj = { value: 0 };
    window.gsap.to(obj, {
      value: endValue,
      duration,
      ease: 'power2.out',
      onUpdate: () => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el) => {
          if (el instanceof HTMLElement) {
            el.textContent = Math.floor(obj.value).toString();
          }
        });
      },
    });
  },

  // Scale in animation
  scaleIn: (selector: string, delay = 0) => {
    if (!window.gsap) return;
    
    window.gsap.fromTo(
      selector,
      {
        scale: 0.8,
        opacity: 0,
      },
      {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        delay,
        ease: 'back.out(1.7)',
      }
    );
  },

  // Slide in from left
  slideInLeft: (selector: string, delay = 0) => {
    if (!window.gsap) return;
    
    window.gsap.fromTo(
      selector,
      {
        x: -50,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        delay,
        ease: 'power3.out',
      }
    );
  },

  // Slide in from right
  slideInRight: (selector: string, delay = 0) => {
    if (!window.gsap) return;
    
    window.gsap.fromTo(
      selector,
      {
        x: 50,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        delay,
        ease: 'power3.out',
      }
    );
  },

  // Pulse animation
  pulse: (selector: string) => {
    if (!window.gsap) return;
    
    window.gsap.to(selector, {
      scale: 1.05,
      duration: 0.8,
      yoyo: true,
      repeat: -1,
      ease: 'power2.inOut',
    });
  },

  // Staggered card animation
  staggerCards: (selector: string, delay = 0) => {
    if (!window.gsap) return;
    
    window.gsap.fromTo(
      selector,
      {
        y: 60,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay,
        ease: 'power3.out',
        stagger: 0.1,
      }
    );
  },
};
