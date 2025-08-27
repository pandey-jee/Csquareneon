import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const handleLogout = () => {
    window.location.href = '/api/logout';
  };

  return (
    <nav className="navbar" data-testid="navbar">
      <div className="container">
        <div className="navbar-content">
          {/* Logo/Brand */}
          <div className="navbar-brand">
            <a href="/" className="brand-link">
              <span className="brand-text neon-flicker">CSquare</span>
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="navbar-menu">
            <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }} className="nav-link">
              Home
            </a>
            <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }} className="nav-link">
              About
            </a>
            <a href="#team" onClick={(e) => { e.preventDefault(); scrollToSection('team'); }} className="nav-link">
              Team
            </a>
            <a href="#events" onClick={(e) => { e.preventDefault(); scrollToSection('events'); }} className="nav-link">
              Events
            </a>
            <a href="#collaborators" onClick={(e) => { e.preventDefault(); scrollToSection('collaborators'); }} className="nav-link">
              Partners
            </a>
          </div>

          {/* Auth Section */}
          <div className="navbar-auth">
            {user ? (
              <div className="user-menu">
                <span className="user-name">Welcome, {(user as any)?.name || 'User'}</span>
                <button onClick={handleLogout} className="btn btn-outline btn-sm">
                  Logout
                </button>
              </div>
            ) : (
              <a href="/api/login" className="btn btn-primary btn-sm">
                Login
              </a>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className={`mobile-menu-toggle ${isMenuOpen ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
          <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }} className="mobile-nav-link">
            Home
          </a>
          <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }} className="mobile-nav-link">
            About
          </a>
          <a href="#team" onClick={(e) => { e.preventDefault(); scrollToSection('team'); }} className="mobile-nav-link">
            Team
          </a>
          <a href="#events" onClick={(e) => { e.preventDefault(); scrollToSection('events'); }} className="mobile-nav-link">
            Events
          </a>
          <a href="#collaborators" onClick={(e) => { e.preventDefault(); scrollToSection('collaborators'); }} className="mobile-nav-link">
            Partners
          </a>
          
          <div className="mobile-auth">
            {user ? (
              <>
                <span className="mobile-user-name">Welcome, {(user as any)?.name || 'User'}</span>
                <button onClick={handleLogout} className="btn btn-outline">
                  Logout
                </button>
              </>
            ) : (
              <a href="/api/login" className="btn btn-primary">
                Login
              </a>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
