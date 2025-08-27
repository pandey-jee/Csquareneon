import { useQuery } from '@tanstack/react-query';
import { TrendingUp, Users, Trophy, Calendar } from 'lucide-react';

type ClubStatistics = {
  totalMembers: number;
  activeContests: number;
  problemsSolved: number;
  achievements: number;
};

export default function StatisticsSection() {
  const { data: statistics, isLoading } = useQuery<ClubStatistics>({
    queryKey: ['/api/statistics'],
  });

  // Fallback data for display
  const fallbackStats: ClubStatistics = {
    totalMembers: 150,
    activeContests: 12,
    problemsSolved: 2500,
    achievements: 45
  };

  const displayStats = statistics || fallbackStats;

  if (isLoading) {
    return (
      <section className="statistics-loading">
        <div className="container-responsive statistics-container">
          <div className="grid-responsive-auto-fit statistics-skeleton-grid">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="statistics-skeleton-card p-lg">
                <div className="skeleton-header mb-md"></div>
                <div className="skeleton-content mb-sm"></div>
                <div className="skeleton-description"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="statistics" className="cyberpunk-statistics" data-testid="statistics-section">
      <div className="container-responsive statistics-container">
        <div className="statistics-header text-center mb-2xl">
          <h2 className="statistics-title text-fluid-2xl mb-md">
            Our Achievements
          </h2>
          <p className="statistics-subtitle text-fluid-lg">
            Numbers that reflect our community's dedication and growth
          </p>
        </div>

        <div className="grid-responsive-auto-fit statistics-grid gap-lg">
          <div className="statistics-card">
            <div className="statistics-card-header flex-responsive justify-between items-center mb-md">
              <h3 className="statistics-card-title text-fluid-base">
                Total Members
              </h3>
              <Users className="statistics-card-icon size-responsive" />
            </div>
            <div className="statistics-card-content">
              <div>
                <span className="statistics-number text-fluid-2xl" data-stat="members">{displayStats.totalMembers}</span>+
              </div>
              <p className="statistics-description text-fluid-sm mt-sm">
                Active programmers in our community
              </p>
            </div>
          </div>

          <div className="statistics-card">
            <div className="statistics-card-header flex-responsive justify-between items-center mb-md">
              <h3 className="statistics-card-title text-fluid-base">
                Active Contests
              </h3>
              <Calendar className="statistics-card-icon size-responsive" />
            </div>
            <div className="statistics-card-content">
              <div>
                <span className="statistics-number text-fluid-2xl" data-stat="contests">{displayStats.activeContests}</span>
              </div>
              <p className="statistics-description text-fluid-sm mt-sm">
                Monthly programming challenges
              </p>
            </div>
          </div>

          <div className="statistics-card">
            <div className="statistics-card-header flex-responsive justify-between items-center mb-md">
              <h3 className="statistics-card-title text-fluid-base">
                Problems Solved
              </h3>
              <TrendingUp className="statistics-card-icon size-responsive" />
            </div>
            <div className="statistics-card-content">
              <div>
                <span className="statistics-number text-fluid-2xl" data-stat="problems">{displayStats.problemsSolved}</span>+
              </div>
              <p className="statistics-description text-fluid-sm mt-sm">
                Collective problem-solving achievements
              </p>
            </div>
          </div>

          <div className="statistics-card">
            <div className="statistics-card-header flex-responsive justify-between items-center mb-md">
              <h3 className="statistics-card-title text-fluid-base">
                Achievements
              </h3>
              <Trophy className="statistics-card-icon size-responsive" />
            </div>
            <div className="statistics-card-content">
              <div>
                <span className="statistics-number text-fluid-2xl" data-stat="achievements">{displayStats.achievements}</span>+
              </div>
              <p className="statistics-description text-fluid-sm mt-sm">
                Awards and recognitions earned
              </p>
            </div>
          </div>
        </div>

        <div className="statistics-features mt-2xl">
          <div className="grid-responsive-auto-fit features-grid gap-lg">
            <div className="feature-item text-center p-lg">
              <h3 className="feature-title text-fluid-lg mb-sm">Weekly</h3>
              <p className="feature-description text-fluid-base">Regular coding sessions and workshops</p>
            </div>
            <div className="feature-item text-center p-lg">
              <h3 className="feature-title text-fluid-lg mb-sm">Open Source</h3>
              <p className="feature-description text-fluid-base">Contributing to community projects</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
