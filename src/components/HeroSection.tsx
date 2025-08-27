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
        <div className="container-responsive hero-container">
          <div className="grid-responsive-auto-fit hero-content">
            <div ref={textRef} className="hero-text">
              <div>
                <h1 className="hero-title text-fluid-xl">
                  <div className="hero-title-welcome mb-sm">
                    Welcome
                  </div>
                  <GradientText 
                    className="hero-title-csquare text-fluid-2xl"
                    animationSpeed={3}
                  >
                    C Square
                  </GradientText>
                </h1>
                
                <div className="hero-subtitle-container mt-md mb-lg">
                  <TextType
                    text={typewriterTexts}
                    typingSpeed={100}
                    deletingSpeed={50}
                    pauseDuration={2000}
                    className="hero-subtitle-animated text-fluid-base"
                  />
                </div>
                
                <p className="hero-description text-fluid-sm mb-xl">
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

              <div className="hero-badges grid-responsive-auto-fit gap-md mt-xl">
                <div className="hero-badge text-center">
                  <GradientText className="badge-number text-fluid-lg">100+</GradientText>
                  <span className="badge-label text-fluid-xs">Members</span>
                </div>
                <div className="hero-badge text-center">
                  <GradientText className="badge-number text-fluid-lg">50+</GradientText>
                  <span className="badge-label text-fluid-xs">Contests</span>
                </div>
                <div className="hero-badge text-center">
                  <GradientText className="badge-number text-fluid-lg">Top</GradientText>
                  <span className="badge-label text-fluid-xs">Rankings</span>
                </div>
              </div>
            </div>

            <div ref={logoRef} className="hero-visual flex-responsive justify-center items-center">
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
                  className="hero-rotating-logo size-responsive"
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
