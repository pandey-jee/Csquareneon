import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AchievementsSection from '@/components/AchievementsSection';
import TeamSection from '@/components/TeamSection';
import CollaboratorsSection from '@/components/CollaboratorsSection';
import EventsSection from '@/components/EventsSection';
import Footer from '@/components/Footer';
import AnimatedWatermark from '@/components/AnimatedWatermark';
import CyberpunkTerminal from '@/components/CyberpunkTerminal';
import FloatingBackToTop from '@/components/FloatingBackToTop';

export default function Home() {
  return (
    <div data-testid="home-page" className="relative">
      {/* Removed GeometricBackground to use only InteractiveBackground */}
      <AnimatedWatermark />
      <CyberpunkTerminal />
      <FloatingBackToTop />
      <Navbar />
      <main className="relative z-10">
        <HeroSection />
        <div>
          <AchievementsSection />
        </div>
        <div>
          <TeamSection />
        </div>
        <div>
          <CollaboratorsSection />
        </div>
        <div>
          <EventsSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}
