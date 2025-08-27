import { useState, useEffect } from 'react';
import { X, Calendar, Clock, MapPin } from 'lucide-react';
import { gsap } from 'gsap';

export default function EventNotificationPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [showPopup, setShowPopup] = useState(true);

  useEffect(() => {
    // Show popup immediately on page load
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000); // Show after 1 second

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isVisible) {
      const popup = document.querySelector('.event-popup');
      if (popup) {
        gsap.fromTo(popup, 
          { 
            opacity: 0, 
            scale: 0.8, 
            y: 50 
          },
          { 
            opacity: 1, 
            scale: 1, 
            y: 0, 
            duration: 0.6, 
            ease: "back.out(1.7)" 
          }
        );
      }
    }
  }, [isVisible]);

  const handleClose = () => {
    const popup = document.querySelector('.event-popup');
    if (popup) {
      gsap.to(popup, {
        opacity: 0,
        scale: 0.8,
        y: 50,
        duration: 0.4,
        ease: "power2.in",
        onComplete: () => {
          setShowPopup(false);
        }
      });
    }
  };

  if (!showPopup || !isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="event-popup bg-gradient-to-br from-gray-900 to-black border border-cyan-400/30 rounded-2xl p-8 max-w-md mx-4 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5"></div>
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-cyan-400/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-400/10 rounded-full blur-3xl"></div>
        
        {/* Close Button */}
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-cyan-400 transition-colors z-10"
        >
          <X size={24} />
        </button>

        {/* Content */}
        <div className="relative z-10">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full mb-4">
              <Calendar className="text-white" size={32} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">
              🎉 Upcoming Event Alert!
            </h3>
            <div className="h-1 w-20 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded-full"></div>
          </div>

          <div className="space-y-4 text-center">
            <div>
              <h4 className="text-xl font-semibold text-cyan-400 mb-2">
                Weekly Coding Challenge #47
              </h4>
              <p className="text-gray-300 text-sm">
                Join us for an exciting problem-solving session featuring dynamic programming challenges!
              </p>
            </div>

            <div className="flex items-center justify-center space-x-6 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <Clock size={16} className="text-cyan-400" />
                <span>7:00 PM</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar size={16} className="text-purple-400" />
                <span>Today</span>
              </div>
            </div>

            <div className="flex items-center justify-center space-x-2 text-sm text-gray-400">
              <MapPin size={16} className="text-green-400" />
              <span>Computer Lab 201 & Online</span>
            </div>

            <div className="pt-4">
              <button className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold py-3 px-6 rounded-lg hover:from-cyan-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105">
                Join Event
              </button>
              <button 
                onClick={handleClose}
                className="w-full mt-2 text-gray-400 hover:text-white transition-colors py-2"
              >
                Remind me later
              </button>
            </div>
          </div>
        </div>

        {/* Glowing border effect */}
        <div className="absolute inset-0 rounded-2xl border border-cyan-400/30 pointer-events-none">
          <div className="absolute inset-0 rounded-2xl border border-cyan-400/20 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
