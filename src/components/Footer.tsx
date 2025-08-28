import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Mail
} from 'lucide-react';
import './Footer.css';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!footerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 90%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

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
          duration: 0.8,
          stagger: 0.15,
          ease: "elastic.out(1, 0.5)"
        }
      );
    }

    // Bottom section animation
    if (bottomRef.current) {
      tl.fromTo(bottomRef.current,
        {
          opacity: 0,
          y: 30
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out"
        },
        "-=0.5"
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <footer ref={footerRef} className="cyberpunk-footer">
      <div className="footer-background">
        <div className="footer-grid-overlay"></div>
        <div className="footer-glow"></div>
      </div>
      
      <div className="container-responsive footer-container">
        {/* Bottom Section */}
        <div ref={bottomRef} className="footer-bottom py-lg">
          <div className="footer-bottom-content flex-responsive justify-between items-center gap-lg">
            <div className="copyright text-center md:text-left">
              <p className="text-fluid-base">&copy; 2025 C Square. All rights reserved.</p>
              <p className="text-fluid-sm">Designed with <span className="heart">💙</span> by the C Square Team</p>
            </div>
            
            {/* Social Media Icons */}
            <div ref={socialRef} className="social-links flex-responsive gap-md">
              <a href="#" className="social-link github" title="GitHub">
                <Github size={20} />
              </a>
              <a href="#" className="social-link linkedin" title="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href="#" className="social-link twitter" title="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="social-link email" title="Email">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
