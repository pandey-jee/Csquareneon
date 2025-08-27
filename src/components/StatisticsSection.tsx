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
        <div className="statistics-container">
          <div className="statistics-skeleton-grid">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="statistics-skeleton-card">
                <div className="skeleton-header"></div>
                <div className="skeleton-content"></div>
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
      <div className="statistics-container">
        <div className="statistics-header">
          <h2 className="statistics-title">
            Our Achievements
          </h2>
          <p className="statistics-subtitle">
            Numbers that reflect our community's dedication and growth
          </p>
        </div>

        <div className="statistics-grid">
          <div className="statistics-card">
            <div className="statistics-card-header">
              <h3 className="statistics-card-title">
                Total Members
              </h3>
              <Users className="statistics-card-icon" />
            </div>
            <div className="statistics-card-content">
              <div>
                <span className="statistics-number" data-stat="members">{displayStats.totalMembers}</span>+
              </div>
              <p className="statistics-description">
                Active programmers in our community
              </p>
            </div>
          </div>

          <div className="statistics-card">
            <div className="statistics-card-header">
              <h3 className="statistics-card-title">
                Active Contests
              </h3>
              <Calendar className="statistics-card-icon" />
            </div>
            <div className="statistics-card-content">
              <div>
                <span className="statistics-number" data-stat="contests">{displayStats.activeContests}</span>
              </div>
              <p className="statistics-description">
                Monthly programming challenges
              </p>
            </div>
          </div>

          <div className="statistics-card">
            <div className="statistics-card-header">
              <h3 className="statistics-card-title">
                Problems Solved
              </h3>
              <TrendingUp className="statistics-card-icon" />
            </div>
            <div className="statistics-card-content">
              <div>
                <span className="statistics-number" data-stat="problems">{displayStats.problemsSolved}</span>+
              </div>
              <p className="statistics-description">
                Collective problem-solving achievements
              </p>
            </div>
          </div>

          <div className="statistics-card">
            <div className="statistics-card-header">
              <h3 className="statistics-card-title">
                Achievements
              </h3>
              <Trophy className="statistics-card-icon" />
            </div>
            <div className="statistics-card-content">
              <div>
                <span className="statistics-number" data-stat="achievements">{displayStats.achievements}</span>+
              </div>
              <p className="statistics-description">
                Awards and recognitions earned
              </p>
            </div>
          </div>
        </div>

        <div className="statistics-features">
          <div className="features-grid">
            <div className="feature-item">
              <h3 className="feature-title">Weekly</h3>
              <p className="feature-description">Regular coding sessions and workshops</p>
            </div>
            <div className="feature-item">
              <h3 className="feature-title">Open Source</h3>
              <p className="feature-description">Contributing to community projects</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
