import CircularGallery from './CircularGallery';
import './TeamSection.css';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  position: string;
  description: string;
  image: string;
  social: {
    github?: string;
    linkedin?: string;
    instagram?: string;
  };
  skills: string[];
  achievements: string[];
}

const TeamSection = () => {
  // Core team members with high-quality professional images (optimized to 8 members)
  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: "Alex Rodriguez",
      role: "President",
      position: "Full Stack Developer",
      description: "Leading the club towards excellence in competitive programming.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop&auto=format",
      social: { github: "#", linkedin: "#", instagram: "#" },
      skills: ["React", "Node.js", "Python", "Algorithm Design"],
      achievements: ["ICPC Regional Winner", "Google Summer of Code", "Lead Developer at TechCorp"]
    },
    {
      id: 2,
      name: "Sarah Chen",
      role: "Vice President",
      position: "AI/ML Engineer",
      description: "Passionate about machine learning and competitive coding.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b1e0?w=600&h=600&fit=crop&auto=format",
      social: { github: "#", linkedin: "#", instagram: "#" },
      skills: ["Python", "TensorFlow", "PyTorch", "Data Structures"],
      achievements: ["Kaggle Expert", "Published Research", "Microsoft Intern"]
    },
    {
      id: 3,
      name: "Marcus Johnson",
      role: "Technical Lead",
      position: "Backend Developer",
      description: "Expert in system design and scalable architecture.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&h=600&fit=crop&auto=format",
      social: { github: "#", linkedin: "#" },
      skills: ["Java", "Spring Boot", "Docker", "Microservices"],
      achievements: ["AWS Certified", "Tech Lead at StartupXYZ", "Open Source Contributor"]
    },
    {
      id: 4,
      name: "Emily Davis",
      role: "Events Coordinator",
      position: "Frontend Developer",
      description: "Creating amazing user experiences and organizing events.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&h=600&fit=crop&auto=format",
      social: { github: "#", instagram: "#", linkedin: "#" },
      skills: ["React", "TypeScript", "Design Systems", "UI/UX"],
      achievements: ["Design Award Winner", "Frontend Lead", "Community Speaker"]
    },
    {
      id: 5,
      name: "David Kim",
      role: "Treasurer",
      position: "Data Scientist",
      description: "Managing finances and analyzing competitive programming trends.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&h=600&fit=crop&auto=format",
      social: { github: "#", linkedin: "#" },
      skills: ["Python", "R", "SQL", "Machine Learning"],
      achievements: ["Data Science Certification", "Research Publication", "Analytics Expert"]
    },
    {
      id: 6,
      name: "Lisa Wang",
      role: "Secretary",
      position: "Mobile Developer",
      description: "Keeping records and developing mobile applications.",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&h=600&fit=crop&auto=format",
      social: { github: "#", linkedin: "#", instagram: "#" },
      skills: ["Flutter", "React Native", "Swift", "Kotlin"],
      achievements: ["App Store Featured", "Mobile Expert", "Tech Blogger"]
    },
    {
      id: 7,
      name: "John Smith",
      role: "Senior Member",
      position: "Software Engineer",
      description: "Passionate about algorithms and problem solving.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&h=600&fit=crop&auto=format",
      social: { github: "#", linkedin: "#" },
      skills: ["JavaScript", "Node.js", "MongoDB"],
      achievements: ["Contest Winner", "Open Source Contributor"]
    },
    {
      id: 8,
      name: "Anna Brown",
      role: "Active Member",
      position: "Backend Developer",
      description: "Expert in competitive programming and system design.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=600&fit=crop&auto=format",
      social: { github: "#", linkedin: "#", instagram: "#" },
      skills: ["Python", "Django", "PostgreSQL"],
      achievements: ["Hackathon Winner", "Tech Speaker"]
    }
  ];

  // Transform team data for CircularGallery
  const galleryItems = teamMembers.map(member => ({
    image: member.image,
    text: `${member.name}\n${member.role}`,
    name: member.name,
    position: member.position,
    social: member.social
  }));

  return (
    <section id="team" className="team-section-fullwidth">
      <div className="team-container-fullwidth">
        <div className="team-header-center">
          <span className="team-subtitle-glow">Our Team</span>
          <h2 className="team-title-large">Meet Our Core Team</h2>
          <p className="team-description-center">
            Passionate members driving innovation in competitive programming
          </p>
        </div>

        <div className="team-gallery-fullwidth">
          <CircularGallery 
            items={galleryItems}
            bend={3}
            textColor="#00FFFF"
            borderRadius={0.12}
            font="bold 28px 'JetBrains Mono', monospace"
            scrollSpeed={1.5}
            scrollEase={0.06}
          />
        </div>

        <div className="team-controls-center">
          <div className="team-instructions-enhanced">
            <span className="control-hint-glow">
              <span className="neon-text-bright">Scroll</span> or <span className="neon-text-bright">drag</span> to explore our amazing team
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
