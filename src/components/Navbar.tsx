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
      <div className="container-responsive navbar-container">
        <div className="navbar-content flex-responsive justify-between items-center">
          {/* Logo */}
          <div className="navbar-brand flex-responsive items-center gap-sm">
            <img 
              src="/CWhite.png" 
              alt="CSquare Logo" 
              className="navbar-logo size-responsive"
            />
            <h1 className="navbar-title text-fluid-lg">CSquare</h1>
          </div>
          
          {/* Desktop Menu with GooeyNav */}
          <div className="navbar-menu hidden md:block">
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
          </div>
          
          {/* Mobile Menu Button */}
          <div className="navbar-mobile-toggle md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="mobile-menu-button p-sm"
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
      <div className={`navbar-mobile-menu ${isMenuOpen ? 'navbar-mobile-menu-open' : ''} mobile-only`}>
        <div className="navbar-mobile-content p-md">
          <button 
            onClick={() => scrollToSection('home')}
            className="navbar-mobile-link w-full text-left p-sm text-fluid-base"
            data-testid="nav-home-mobile"
          >
            Home
          </button>
          <button 
            onClick={() => scrollToSection('team')}
            className="navbar-mobile-link w-full text-left p-sm text-fluid-base"
            data-testid="nav-team-mobile"
          >
            Team
          </button>
          <button 
            onClick={() => scrollToSection('events')}
            className="navbar-mobile-link w-full text-left p-sm text-fluid-base"
            data-testid="nav-events-mobile"
          >
            Events
          </button>
          <button 
            onClick={() => scrollToSection('collaborators')}
            className="navbar-mobile-link w-full text-left p-sm text-fluid-base"
            data-testid="nav-collaborators-mobile"
          >
            Partners
          </button>
          
          {/* Mobile Auth Buttons */}
          <div className="navbar-mobile-auth mt-lg gap-md flex-responsive flex-col">
            {isAuthenticated ? (
              <>
                {(user as any)?.isAdmin && (
                  <button
                    onClick={handleAdminDashboard}
                    className="btn btn-primary btn-mobile w-full"
                    data-testid="button-admin-dashboard-mobile"
                  >
                    Admin Dashboard
                  </button>
                )}
                <button
                  onClick={handleLogout}
                  className="btn btn-outline btn-mobile w-full"
                  data-testid="button-logout-mobile"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={handleLogin}
                className="btn btn-primary btn-mobile w-full"
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
