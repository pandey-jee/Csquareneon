import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PixelCard from './PixelCard';
import './CollaboratorsSection.css';

gsap.registerPlugin(ScrollTrigger);

export default function CollaboratorsSection() {
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
    <section ref={sectionRef} id="collaborators" className="collaborators-section" data-testid="collaborators-section">
      <div className="collaborators-container">
        <h2 ref={titleRef} className="collaborators-title">
          <span className="title-line"></span>
          <span className="title-text">Our Collaborations</span>
          <span className="title-line"></span>
        </h2>
        
        <div className="collaborators-grid">
          <div ref={(el) => addToRefs(el, 0)} className="collaborator-card-wrapper">
            <PixelCard variant="cyan">
              <div className="collaborator-content">
                <div className="collaborator-logo">T</div>
                <div className="collaborator-name">TechCorp</div>
                <div className="collaborator-type">Technology Partner</div>
                <div className="collaborator-icon">🤝</div>
              </div>
            </PixelCard>
          </div>

          <div ref={(el) => addToRefs(el, 1)} className="collaborator-card-wrapper">
            <PixelCard variant="magenta">
              <div className="collaborator-content">
                <div className="collaborator-logo">CN</div>
                <div className="collaborator-name">Coding Ninjas</div>
                <div className="collaborator-type">Educational Platform</div>
                <div className="collaborator-icon">📚</div>
              </div>
            </PixelCard>
          </div>

          <div ref={(el) => addToRefs(el, 2)} className="collaborator-card-wrapper">
            <PixelCard variant="neon">
              <div className="collaborator-content">
                <div className="collaborator-logo">PX</div>
                <div className="collaborator-name">PandoraX</div>
                <div className="collaborator-type">Innovation & Revolution</div>
                <div className="collaborator-icon">🚀</div>
              </div>
            </PixelCard>
          </div>
        </div>
      </div>
    </section>
  );
}
