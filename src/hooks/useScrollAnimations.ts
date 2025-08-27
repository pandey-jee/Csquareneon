import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export const useScrollAnimations = () => {
  useEffect(() => {
    // Kill existing ScrollTriggers to prevent conflicts
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    // Create a master timeline for all scroll animations
    const tl = gsap.timeline();

    // Select all elements with scroll animation classes
    const animateElements = gsap.utils.toArray('.animate-on-scroll');

    // Base animation settings
    const animationConfig = {
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.1,
    };

    animateElements.forEach((element: any, index) => {
      // Get the stagger delay from the element's class
      const classList = Array.from(element.classList) as string[];
      const staggerClass = classList.find((cls: string) => 
        cls.startsWith('stagger-delay-')
      );
      
      const delay = staggerClass ? 
        parseFloat((staggerClass as string).replace('stagger-delay-', '')) * 0.1 : 
        index * 0.1;

      // Set initial state
      gsap.set(element, {
        opacity: 0,
        y: 50,
        scale: 0.9,
      });

      // Create the scroll trigger animation
      const animation = gsap.to(element, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: animationConfig.duration,
        ease: animationConfig.ease,
        delay: delay,
        scrollTrigger: {
          trigger: element,
          start: "top bottom-=100",
          end: "bottom center",
          toggleActions: "play none none reverse",
          // Uncomment for debugging
          // markers: true,
          onEnter: () => {
            // Custom enter animation for specific elements
            if (element.classList.contains('navbar')) {
              gsap.to(element, { 
                y: 0, 
                opacity: 1, 
                duration: 0.6,
                ease: "back.out(1.7)" 
              });
            }
          },
          onLeave: () => {
            // Reverse animation when leaving viewport (scroll up)
            gsap.to(element, { 
              opacity: 0.7, 
              y: -20, 
              scale: 0.95,
              duration: 0.4,
              ease: "power2.out" 
            });
          },
          onEnterBack: () => {
            // Re-enter animation when scrolling back down
            gsap.to(element, { 
              opacity: 1, 
              y: 0, 
              scale: 1,
              duration: 0.6,
              ease: "back.out(1.7)" 
            });
          },
          onLeaveBack: () => {
            // Leave back animation when scrolling up past trigger
            gsap.to(element, { 
              opacity: 0, 
              y: 50, 
              scale: 0.9,
              duration: 0.4,
              ease: "power2.in" 
            });
          }
        }
      });

      // Add to timeline
      tl.add(animation, delay);
    });

    // Special animations for specific sections
    
    // Hero section enhanced animation
    const heroElements = gsap.utils.toArray('.hero-text, .hero-visual, .hero-badges');
    heroElements.forEach((element: any, index) => {
      gsap.fromTo(element, 
        { 
          opacity: 0, 
          y: 100, 
          rotationX: -15 
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 1.2,
          ease: "power3.out",
          delay: index * 0.2,
          scrollTrigger: {
            trigger: element,
            start: "top bottom-=50",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // Statistics cards counting animation
    const statNumbers = gsap.utils.toArray('[data-stat]');
    statNumbers.forEach((element: any) => {
      const finalValue = parseInt(element.textContent);
      const obj = { value: 0 };
      
      gsap.to(obj, {
        value: finalValue,
        duration: 2,
        ease: "power2.out",
        onUpdate: () => {
          element.textContent = Math.round(obj.value);
        },
        scrollTrigger: {
          trigger: element,
          start: "top bottom-=100",
          toggleActions: "play none none reverse"
        }
      });
    });

    // Team cards 3D flip animation
    const teamCards = gsap.utils.toArray('.team-cards .card');
    teamCards.forEach((card: any, index) => {
      gsap.fromTo(card,
        { 
          opacity: 0, 
          rotationY: -90, 
          transformOrigin: "left center" 
        },
        {
          opacity: 1,
          rotationY: 0,
          duration: 0.8,
          ease: "power2.out",
          delay: index * 0.1,
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=50",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // Events section staggered slide-in
    const eventCards = gsap.utils.toArray('.events-grid .event-card');
    eventCards.forEach((card: any, index) => {
      const direction = index % 2 === 0 ? -100 : 100;
      
      gsap.fromTo(card,
        { 
          opacity: 0, 
          x: direction,
          scale: 0.8
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.7,
          ease: "back.out(1.7)",
          delay: index * 0.15,
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=100",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // Navbar scroll behavior
    const navbar = document.querySelector('.cyberpunk-navbar');
    if (navbar) {
      ScrollTrigger.create({
        start: "top -80",
        end: 99999,
        toggleClass: { targets: navbar, className: "scrolled" },
        onUpdate: (self) => {
          if (self.direction === -1) {
            // Scrolling up - show navbar
            gsap.to(navbar, { y: 0, duration: 0.3 });
          } else if (self.direction === 1) {
            // Scrolling down - hide navbar
            gsap.to(navbar, { y: -100, duration: 0.3 });
          }
        }
      });
    }

    // Parallax effect for background elements
    const parallaxElements = gsap.utils.toArray('.parallax-bg');
    parallaxElements.forEach((element: any) => {
      gsap.to(element, {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    });

    // Refresh ScrollTrigger after all animations are set up
    ScrollTrigger.refresh();

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return {
    // Utility functions for manual control
    refreshScrollTrigger: () => ScrollTrigger.refresh(),
    killAllScrollTriggers: () => ScrollTrigger.getAll().forEach(trigger => trigger.kill()),
    
    // Method to add custom scroll animations
    addCustomScrollAnimation: (selector: string, animation: gsap.TweenVars) => {
      const elements = gsap.utils.toArray(selector);
      elements.forEach((element: any) => {
        gsap.to(element, {
          ...animation,
          scrollTrigger: {
            trigger: element,
            start: "top bottom-=100",
            toggleActions: "play none none reverse",
            ...(animation.scrollTrigger || {})
          }
        });
      });
    }
  };
};

export default useScrollAnimations;
