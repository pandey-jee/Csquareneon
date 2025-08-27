import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import StatisticsSection from '@/components/StatisticsSection';
import AchievementsSection from '@/components/AchievementsSection';
import TeamSection from '@/components/TeamSection';
import CollaboratorsSection from '@/components/CollaboratorsSection';
import EventsSection from '@/components/EventsSection';
import Footer from '@/components/Footer';
import AnimatedWatermark from '@/components/AnimatedWatermark';
import GeometricBackground from '@/components/GeometricBackground';
import CyberpunkTerminal from '@/components/CyberpunkTerminal';

export default function Home() {
  return (
    <div data-testid="home-page" className="relative">
      <div className="parallax-bg">
        <GeometricBackground />
      </div>
      <AnimatedWatermark />
      <CyberpunkTerminal />
      <Navbar />
      <main className="relative z-10">
        <HeroSection />
        <div>
          <StatisticsSection />
        </div>
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
