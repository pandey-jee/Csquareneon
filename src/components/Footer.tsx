import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  MapPin, 
  Phone, 
  Globe,
  ArrowUp,
  Code,
  Users,
  Calendar,
  Trophy
} from 'lucide-react';
import './Footer.css';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);
  const socialRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!footerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    // Logo animation
    if (logoRef.current) {
      tl.fromTo(logoRef.current,
        {
          opacity: 0,
          y: 50,
          scale: 0.8
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "back.out(1.7)"
        }
      );
    }

    // Sections stagger animation
    tl.fromTo(sectionsRef.current.filter(Boolean),
      {
        opacity: 0,
        y: 30,
        x: -20
      },
      {
        opacity: 1,
        y: 0,
        x: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out"
      },
      "-=0.5"
    );

    // Social icons animation
    if (socialRef.current) {
      tl.fromTo(socialRef.current.children,
        {
          opacity: 0,
          scale: 0,
          rotation: 180
        },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "elastic.out(1, 0.5)"
        },
        "-=0.3"
      );
    }

    // Bottom section animation
    if (bottomRef.current) {
      tl.fromTo(bottomRef.current,
        {
          opacity: 0,
          y: 20
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out"
        },
        "-=0.2"
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const addToSectionsRefs = (el: HTMLDivElement | null, index: number) => {
    if (el) sectionsRef.current[index] = el;
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer ref={footerRef} className="cyberpunk-footer">
      <div className="footer-background">
        <div className="footer-grid-overlay"></div>
        <div className="footer-glow"></div>
      </div>
      
      <div className="footer-container">
        <div className="footer-content">
          {/* Logo Section */}
          <div ref={logoRef} className="footer-logo-section">
            <div className="logo-container">
              <div className="logo-icon">
                <span className="logo-text">C²</span>
              </div>
              <div className="logo-info">
                <h3 className="club-name">C Square</h3>
                <p className="club-tagline">Competitive Programming Club</p>
              </div>
            </div>
            <p className="club-description">
              Empowering students through competitive programming, algorithm mastery, 
              and innovative technology solutions. Join our community of passionate coders.
            </p>
          </div>

          {/* Quick Links */}
          <div ref={(el) => addToSectionsRefs(el, 0)} className="footer-section">
            <h4 className="section-title">Quick Links</h4>
            <ul className="footer-links">
              <li><a href="#home">Home</a></li>
              <li><a href="#team">Our Team</a></li>
              <li><a href="#events">Events</a></li>
              <li><a href="#collaborators">Collaborations</a></li>
              <li><a href="#about">About Us</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div ref={(el) => addToSectionsRefs(el, 1)} className="footer-section">
            <h4 className="section-title">Resources</h4>
            <ul className="footer-links">
              <li><a href="#"><Code size={16} /> Practice Problems</a></li>
              <li><a href="#"><Users size={16} /> Study Groups</a></li>
              <li><a href="#"><Calendar size={16} /> Event Calendar</a></li>
              <li><a href="#"><Trophy size={16} /> Leaderboard</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div ref={(el) => addToSectionsRefs(el, 2)} className="footer-section">
            <h4 className="section-title">Contact Us</h4>
            <div className="contact-info">
              <div className="contact-item">
                <MapPin size={16} />
                <span>Computer Science Department<br />University Campus</span>
              </div>
              <div className="contact-item">
                <Mail size={16} />
                <span>csquare@university.edu</span>
              </div>
              <div className="contact-item">
                <Phone size={16} />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="contact-item">
                <Globe size={16} />
                <span>www.csquare.club</span>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div ref={(el) => addToSectionsRefs(el, 3)} className="footer-section">
            <h4 className="section-title">Connect With Us</h4>
            <div ref={socialRef} className="social-links">
              <a href="#" className="social-link github">
                <Github size={20} />
                <span className="social-tooltip">GitHub</span>
              </a>
              <a href="#" className="social-link linkedin">
                <Linkedin size={20} />
                <span className="social-tooltip">LinkedIn</span>
              </a>
              <a href="#" className="social-link twitter">
                <Twitter size={20} />
                <span className="social-tooltip">Twitter</span>
              </a>
              <a href="#" className="social-link email">
                <Mail size={20} />
                <span className="social-tooltip">Email</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div ref={bottomRef} className="footer-bottom">
          <div className="footer-bottom-content">
            <div className="copyright">
              <p>&copy; 2025 C Square. All rights reserved.</p>
              <p>Designed with <span className="heart">💙</span> by the C Square Team</p>
            </div>
            <button className="scroll-to-top" onClick={scrollToTop}>
              <ArrowUp size={20} />
              <span>Back to Top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
