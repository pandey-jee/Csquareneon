import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const FloatingBackToTop = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    // Set initial state
    gsap.set(button, {
      opacity: 0,
      scale: 0.8,
      y: 20
    });

    // Show/hide button based on scroll position
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const shouldShow = scrollY > 800; // Show after scrolling 800px

      if (shouldShow !== isVisible) {
        setIsVisible(shouldShow);
        
        if (shouldShow) {
          gsap.to(button, {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.3,
            ease: "back.out(1.7)"
          });
        } else {
          gsap.to(button, {
            opacity: 0,
            scale: 0.8,
            y: 20,
            duration: 0.2,
            ease: "power2.out"
          });
        }
      }
    };

    // Add scroll listener
    window.addEventListener('scroll', handleScroll);
    
    // Check initial scroll position
    handleScroll();

    // Hover animations
    const handleMouseEnter = () => {
      gsap.to(button, {
        scale: 1.1,
        duration: 0.2,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        scale: 1,
        duration: 0.2,
        ease: "power2.out"
      });
    };

    button.addEventListener('mouseenter', handleMouseEnter);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      button.removeEventListener('mouseenter', handleMouseEnter);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  return (
    <button
      ref={buttonRef}
      onClick={scrollToTop}
      className="floating-back-to-top"
      aria-label="Back to top"
      title="Back to top"
    >
      <ArrowUp size={20} />
      <span className="pulse-ring"></span>
    </button>
  );
};

export default FloatingBackToTop;
