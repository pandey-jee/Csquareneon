import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PixelCard from './PixelCard';
import './AchievementsSection.css';

gsap.registerPlugin(ScrollTrigger);

export default function AchievementsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current || !titleRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        end: "bottom 30%",
        toggleActions: "play none none reverse"
      }
    });

    // Title animation - glitch effect
    tl.fromTo(titleRef.current, 
      { 
        opacity: 0,
        y: 50,
        textShadow: "0 0 0 transparent"
      },
      { 
        opacity: 1,
        y: 0,
        duration: 1,
        textShadow: "0 0 20px var(--cyberpunk-cyan)",
        ease: "power3.out"
      }
    );

    // Cards stagger animation
    tl.fromTo(cardsRef.current.filter(Boolean),
      {
        opacity: 0,
        y: 100,
        scale: 0.8,
        rotateX: 45
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.7)"
      },
      "-=0.5"
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const addToRefs = (el: HTMLDivElement | null, index: number) => {
    if (el) cardsRef.current[index] = el;
  };

  return (
    <section ref={sectionRef} className="achievements-section">
      <div className="achievements-container">
        <h2 ref={titleRef} className="achievements-title">
          <span className="title-line"></span>
          <span className="title-text">Our Achievements</span>
          <span className="title-line"></span>
        </h2>
        
        <div className="achievements-grid">
          <div ref={(el) => addToRefs(el, 0)} className="achievement-card-wrapper">
            <PixelCard variant="cyan">
              <div className="achievement-content">
                <div className="achievement-number">1000+</div>
                <div className="achievement-label">Active Members</div>
                <div className="achievement-icon">👥</div>
              </div>
            </PixelCard>
          </div>

          <div ref={(el) => addToRefs(el, 1)} className="achievement-card-wrapper">
            <PixelCard variant="magenta">
              <div className="achievement-content">
                <div className="achievement-number">50+</div>
                <div className="achievement-label">Successful Events</div>
                <div className="achievement-icon">🎯</div>
              </div>
            </PixelCard>
          </div>

          <div ref={(el) => addToRefs(el, 2)} className="achievement-card-wrapper">
            <PixelCard variant="neon">
              <div className="achievement-content">
                <div className="achievement-number">#1</div>
                <div className="achievement-label">Best Club in University</div>
                <div className="achievement-icon">🏆</div>
              </div>
            </PixelCard>
          </div>
        </div>
      </div>
    </section>
  );
}
