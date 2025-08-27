import { useEffect, useRef } from 'react';

interface AnimatedTextOptions {
  text: string;
  type?: 'typewriter' | 'stagger' | 'wave' | 'char-reveal' | 'slide-words' | 'morphing';
  duration?: number;
  delay?: number;
  once?: boolean;
  trigger?: string;
  start?: string;
  end?: string;
}

export const useTextAnimations = () => {
  const createAnimatedText = (element: HTMLElement, options: AnimatedTextOptions) => {
    const { text, type = 'stagger', delay = 0 } = options;

    // Simple CSS-based animations instead of complex GSAP
    const animations = {
      typewriter: () => {
        element.style.overflow = 'hidden';
        element.style.borderRight = '2px solid hsl(var(--primary))';
        element.style.whiteSpace = 'nowrap';
        element.style.animation = `typewriter 3s steps(${text.length}, end) ${delay}s forwards, blinkCursor 0.5s step-end infinite`;
      },

      stagger: () => {
        const chars = text.split('').map((char, index) => {
          const span = document.createElement('span');
          span.textContent = char === ' ' ? '\u00A0' : char;
          span.style.display = 'inline-block';
          span.style.opacity = '0';
          span.style.transform = 'translateY(20px)';
          span.style.animation = `fadeInUp 0.6s ease-out ${delay + index * 0.1}s forwards`;
          return span;
        });
        
        element.innerHTML = '';
        chars.forEach(span => element.appendChild(span));
      },

      'char-reveal': () => {
        const chars = text.split('').map((char, index) => {
          const span = document.createElement('span');
          span.textContent = char === ' ' ? '\u00A0' : char;
          span.style.display = 'inline-block';
          span.className = 'char-reveal';
          span.style.animationDelay = `${delay + index * 0.1}s`;
          return span;
        });
        
        element.innerHTML = '';
        chars.forEach(span => element.appendChild(span));
      },

      'slide-words': () => {
        const words = text.split(' ').map((word, index) => {
          const span = document.createElement('span');
          span.textContent = word;
          span.style.display = 'inline-block';
          span.style.marginRight = '0.25em';
          span.className = 'slide-in-left';
          span.style.animationDelay = `${delay + index * 0.2}s`;
          return span;
        });
        
        element.innerHTML = '';
        words.forEach(span => element.appendChild(span));
      },

      wave: () => {
        element.className += ' glow-text';
        element.style.animationDelay = `${delay}s`;
      },

      morphing: () => {
        element.style.opacity = '0';
        element.style.animation = `fadeInUp 1s ease-out ${delay}s forwards`;
      }
    };

    // Execute the animation
    if (animations[type]) {
      setTimeout(() => {
        animations[type]();
      }, delay * 1000);
    }
  };

  // Hook for automatic text animation on mount
  const useAnimatedText = (options: AnimatedTextOptions) => {
    const elementRef = useRef<HTMLElement>(null);

    useEffect(() => {
      if (elementRef.current && options.text) {
        createAnimatedText(elementRef.current, options);
      }
    }, [options.text, options.type]);

    return elementRef;
  };

  // Utility to add glow effect
  const addGlowEffect = (element: HTMLElement) => {
    element.className += ' glow-text';
  };

  // Utility for scroll-triggered text reveal
  const createScrollTextReveal = (selector: string, animationType: AnimatedTextOptions['type'] = 'stagger') => {
    const elements = document.querySelectorAll(selector);
    
    elements.forEach((element) => {
      const text = element.textContent || '';
      if (text) {
        createAnimatedText(element as HTMLElement, {
          text,
          type: animationType,
          trigger: selector,
          once: true
        });
      }
    });
  };

  return {
    createAnimatedText,
    useAnimatedText,
    addGlowEffect,
    createScrollTextReveal
  };
};
