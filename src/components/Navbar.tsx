import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import GooeyNav from './GooeyNav';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user } = useAuth();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMenuOpen(false);
  };

  const handleAdminDashboard = () => {
    window.location.href = '/admin';
  };

  const handleLogin = () => {
    window.location.href = '/api/login';
  };

  const handleLogout = () => {
    window.location.href = '/api/logout';
  };

  // Navigation items for GooeyNav
  const navItems = [
    {
      label: "Home",
      href: "#home",
      onClick: () => scrollToSection('home')
    },
    {
      label: "Team",
      href: "#team",
      onClick: () => scrollToSection('team')
    },
    {
      label: "Events",
      href: "#events",
      onClick: () => scrollToSection('events')
    },
    {
      label: "Partners",
      href: "#collaborators",
      onClick: () => scrollToSection('collaborators')
    }
  ];

  return (
    <nav className="cyberpunk-navbar" data-testid="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          {/* Logo */}
          <div className="navbar-brand">
            <img 
              src="/CWhite.png" 
              alt="CSquare Logo" 
              className="navbar-logo"
            />
            <h1 className="navbar-title">CSquare</h1>
          </div>
          
          {/* Desktop Menu with GooeyNav */}
          <div className="navbar-menu">
            <div className="navbar-gooey-wrapper">
              <GooeyNav
                items={navItems}
                particleCount={10}
                particleDistances={[50, 6]}
                particleR={60}
                initialActiveIndex={0}
                animationTime={400}
                timeVariance={150}
                colors={[1, 2, 3, 4]}
              />
            </div>
            
            {/* Auth Buttons */}
            <div className="navbar-auth">
              {isAuthenticated ? (
                <>
                  {(user as any)?.isAdmin && (
                    <button
                      onClick={handleAdminDashboard}
                      className="btn btn-primary"
                      data-testid="button-admin-dashboard"
                    >
                      Admin Dashboard
                    </button>
                  )}
                  <button
                    onClick={handleLogout}
                    className="btn btn-outline"
                    data-testid="button-logout"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={handleLogin}
                  className="btn btn-primary"
                  data-testid="button-login"
                >
                  Admin Login
                </button>
              )}
            </div>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="navbar-mobile-toggle">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="mobile-menu-button"
              data-testid="button-mobile-menu"
            >
              {isMenuOpen ? (
                <X size={24} />
              ) : (
                <Menu size={24} />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={`navbar-mobile-menu ${isMenuOpen ? 'navbar-mobile-menu-open' : ''}`}>
        <div className="navbar-mobile-content">
          <button 
            onClick={() => scrollToSection('home')}
            className="navbar-mobile-link"
            data-testid="nav-home-mobile"
          >
            Home
          </button>
          <button 
            onClick={() => scrollToSection('team')}
            className="navbar-mobile-link"
            data-testid="nav-team-mobile"
          >
            Team
          </button>
          <button 
            onClick={() => scrollToSection('events')}
            className="navbar-mobile-link"
            data-testid="nav-events-mobile"
          >
            Events
          </button>
          <button 
            onClick={() => scrollToSection('collaborators')}
            className="navbar-mobile-link"
            data-testid="nav-collaborators-mobile"
          >
            Partners
          </button>
          
          {/* Mobile Auth Buttons */}
          <div className="navbar-mobile-auth">
            {isAuthenticated ? (
              <>
                {(user as any)?.isAdmin && (
                  <button
                    onClick={handleAdminDashboard}
                    className="btn btn-primary btn-mobile"
                    data-testid="button-admin-dashboard-mobile"
                  >
                    Admin Dashboard
                  </button>
                )}
                <button
                  onClick={handleLogout}
                  className="btn btn-outline btn-mobile"
                  data-testid="button-logout-mobile"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={handleLogin}
                className="btn btn-primary btn-mobile"
                data-testid="button-login-mobile"
              >
                Admin Login
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
