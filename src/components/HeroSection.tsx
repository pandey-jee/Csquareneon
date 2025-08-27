import { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import JoinClubModal from './JoinClubModal';
import TextType from './TextType';
import GradientText from './GradientText';
import Button3D from './Button3D';
import RotatingLogo from './RotatingLogo';

export default function HeroSection() {
  const [showJoinModal, setShowJoinModal] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  const typewriterTexts = [
    "Competitive Programming Club",
    "Code. Compete. Conquer.",
    "Master Data Structures & Algorithms",
    "Join Elite Programmers",
    "Unlock Your Coding Potential"
  ];

  useEffect(() => {
    if (!heroRef.current || !textRef.current || !logoRef.current) return;

    // Initial setup - hide elements
    gsap.set([textRef.current, logoRef.current], {
      opacity: 0,
      y: 50,
    });

    // Entrance animation timeline
    const tl = gsap.timeline();
    
    tl.to(textRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
    })
    .to(logoRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
    }, "-=0.5");

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <>
      <section ref={heroRef} id="home" className="cyberpunk-hero">
        <div className="hero-container">
          <div className="hero-content">
            <div ref={textRef} className="hero-text">
              <div>
                <h1 className="hero-title">
                  <span className="hero-title-welcome">Welcome to</span>
                  <GradientText 
                    className="hero-title-csquare"
                    animationSpeed={3}
                  >
                    C Square
                  </GradientText>
                </h1>
                
                <div className="hero-subtitle-container">
                  <TextType
                    text={typewriterTexts}
                    typingSpeed={100}
                    deletingSpeed={50}
                    pauseDuration={2000}
                    className="hero-subtitle-animated"
                  />
                </div>
                
                <p className="hero-description">
                  <GradientText
                    animationSpeed={5}
                  >
                    Join our community of passionate coders. Learn, compete, and excel together in the ultimate programming experience.
                  </GradientText>
                </p>
              </div>

              <div className="hero-cta">
                <Button3D
                  onClick={() => setShowJoinModal(true)}
                  variant="primary"
                  size="lg"
                  glowEffect={true}
                  pulseEffect={true}
                  rippleEffect={true}
                  className="hero-cta-button"
                >
                  Become a Member
                  <ArrowRight size={20} />
                </Button3D>
              </div>

              <div className="hero-badges">
                <div className="hero-badge">
                  <GradientText className="badge-number">100+</GradientText>
                  <span className="badge-label">Members</span>
                </div>
                <div className="hero-badge">
                  <GradientText className="badge-number">50+</GradientText>
                  <span className="badge-label">Contests</span>
                </div>
                <div className="hero-badge">
                  <GradientText className="badge-number">Top</GradientText>
                  <span className="badge-label">Rankings</span>
                </div>
              </div>
            </div>

            <div ref={logoRef} className="hero-visual">
              <div className="hero-logo-container">
                <RotatingLogo
                  src="/CWhite.png"
                  alt="C Square Logo"
                  size={300}
                  rotationSpeed={12}
                  hoverScale={1.3}
                  glowEffect={true}
                  pulseEffect={true}
                  particleEffect={true}
                  className="hero-rotating-logo"
                />
              </div>
            </div>
          </div>
        </div>

        <JoinClubModal 
          isOpen={showJoinModal} 
          onClose={() => setShowJoinModal(false)} 
        />
      </section>
    </>
  );
}
