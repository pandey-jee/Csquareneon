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
      
      <div className="container-responsive footer-container">
        <div className="grid-responsive-auto-fit footer-content gap-xl">
          {/* Logo Section */}
          <div ref={logoRef} className="footer-logo-section col-span-full lg:col-span-2">
            <div className="logo-container flex-responsive items-center gap-md mb-md">
              <div className="logo-icon">
                <span className="logo-text text-fluid-xl">C²</span>
              </div>
              <div className="logo-info">
                <h3 className="club-name text-fluid-lg">C Square</h3>
                <p className="club-tagline text-fluid-sm">Competitive Programming Club</p>
              </div>
            </div>
            <p className="club-description text-fluid-base max-w-content">
              Empowering students through competitive programming, algorithm mastery, 
              and innovative technology solutions. Join our community of passionate coders.
            </p>
          </div>

          {/* Quick Links */}
          <div ref={(el) => addToSectionsRefs(el, 0)} className="footer-section">
            <h4 className="section-title text-fluid-base mb-md">Quick Links</h4>
            <ul className="footer-links space-y-sm">
              <li><a href="#home" className="text-fluid-sm">Home</a></li>
              <li><a href="#team" className="text-fluid-sm">Our Team</a></li>
              <li><a href="#events" className="text-fluid-sm">Events</a></li>
              <li><a href="#collaborators" className="text-fluid-sm">Collaborations</a></li>
              <li><a href="#about" className="text-fluid-sm">About Us</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div ref={(el) => addToSectionsRefs(el, 1)} className="footer-section">
            <h4 className="section-title text-fluid-base mb-md">Resources</h4>
            <ul className="footer-links space-y-sm">
              <li><a href="#" className="flex-responsive items-center gap-sm text-fluid-sm"><Code size={16} /> Practice Problems</a></li>
              <li><a href="#" className="flex-responsive items-center gap-sm text-fluid-sm"><Users size={16} /> Study Groups</a></li>
              <li><a href="#" className="flex-responsive items-center gap-sm text-fluid-sm"><Calendar size={16} /> Event Calendar</a></li>
              <li><a href="#" className="flex-responsive items-center gap-sm text-fluid-sm"><Trophy size={16} /> Leaderboard</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div ref={(el) => addToSectionsRefs(el, 2)} className="footer-section">
            <h4 className="section-title text-fluid-base mb-md">Contact Us</h4>
            <div className="contact-info space-y-sm">
              <div className="contact-item flex-responsive items-start gap-sm">
                <MapPin size={16} className="mt-1 flex-shrink-0" />
                <span className="text-fluid-sm">Computer Science Department<br />University Campus</span>
              </div>
              <div className="contact-item flex-responsive items-center gap-sm">
                <Mail size={16} className="flex-shrink-0" />
                <span className="text-fluid-sm">csquare@university.edu</span>
              </div>
              <div className="contact-item flex-responsive items-center gap-sm">
                <Phone size={16} className="flex-shrink-0" />
                <span className="text-fluid-sm">+1 (555) 123-4567</span>
              </div>
              <div className="contact-item flex-responsive items-center gap-sm">
                <Globe size={16} className="flex-shrink-0" />
                <span className="text-fluid-sm">www.csquare.club</span>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div ref={(el) => addToSectionsRefs(el, 3)} className="footer-section">
            <h4 className="section-title text-fluid-base mb-md">Connect With Us</h4>
            <div ref={socialRef} className="social-links flex-responsive gap-md">
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
        <div ref={bottomRef} className="footer-bottom mt-xl pt-lg border-t border-cyberpunk-cyan/20">
          <div className="footer-bottom-content flex-responsive justify-between items-center gap-md">
            <div className="copyright text-center md:text-left">
              <p className="text-fluid-sm">&copy; 2025 C Square. All rights reserved.</p>
              <p className="text-fluid-xs">Designed with <span className="heart">💙</span> by the C Square Team</p>
            </div>
            <button className="scroll-to-top flex-responsive items-center gap-sm p-sm" onClick={scrollToTop}>
              <ArrowUp size={20} />
              <span className="text-fluid-sm">Back to Top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
