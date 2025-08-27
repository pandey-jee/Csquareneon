import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AchievementsSection from '@/components/AchievementsSection';
import StatisticsSection from '@/components/StatisticsSection';
import TeamSection from '@/components/TeamSection';
import CollaboratorsSection from '@/components/CollaboratorsSection';
import EventsSection from '@/components/EventsSection';
import Footer from '@/components/Footer';
import AnimatedWatermark from '@/components/AnimatedWatermark';
import EventNotificationPopup from '@/components/EventNotificationPopup';
import GeometricBackground from '@/components/GeometricBackground';

export default function Home() {
  return (
    <div data-testid="home-page">
      <GeometricBackground />
      <AnimatedWatermark />
      <EventNotificationPopup />
      <Navbar />
      <main>
        <HeroSection />
        <div>
          <AchievementsSection />
        </div>
        <div>
          <StatisticsSection />
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
