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
  // Core team members with high-quality professional images
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
    },
    {
      id: 9,
      name: "Mike Wilson",
      role: "Core Member",
      position: "Frontend Developer",
      description: "Dedicated to learning and sharing knowledge.",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&h=600&fit=crop&auto=format",
      social: { github: "#", linkedin: "#" },
      skills: ["Java", "Spring", "MySQL"],
      achievements: ["Research Publication", "Industry Expert"]
    },
    {
      id: 10,
      name: "Sofia Garcia",
      role: "Contributing Member",
      position: "DevOps Engineer",
      description: "Enthusiastic about open source contributions.",
      image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=600&h=600&fit=crop&auto=format",
      social: { github: "#", linkedin: "#", instagram: "#" },
      skills: ["React", "TypeScript", "GraphQL"],
      achievements: ["Community Leader", "Mentor"]
    },
    {
      id: 11,
      name: "Ryan Taylor",
      role: "Research Member",
      position: "Data Scientist",
      description: "Focused on building scalable applications.",
      image: "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=600&h=600&fit=crop&auto=format",
      social: { github: "#", linkedin: "#" },
      skills: ["Go", "Docker", "Kubernetes"],
      achievements: ["Contest Winner", "Open Source Contributor"]
    },
    {
      id: 12,
      name: "Maya Patel",
      role: "Algorithm Specialist",
      position: "Mobile Developer",
      description: "Passionate about algorithms and problem solving.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&h=600&fit=crop&auto=format",
      social: { github: "#", linkedin: "#", instagram: "#" },
      skills: ["JavaScript", "Node.js", "MongoDB"],
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
    <section id="team" className="team-section">
      <div className="team-container">
        <div className="team-header">
          <span className="team-subtitle">Our Team</span>
          <h2 className="team-title">Meet Our Core Team</h2>
          <p className="team-description">
            Passionate members driving innovation in competitive programming
          </p>
        </div>

        <div className="team-gallery-container">
          <CircularGallery 
            items={galleryItems}
            bend={4}
            textColor="#00FFFF"
            borderRadius={0.08}
            font="bold 28px 'JetBrains Mono', monospace"
            scrollSpeed={3}
            scrollEase={0.08}
          />
        </div>

        <div className="team-controls">
          <div className="team-instructions">
            <span className="control-hint">
              <span className="neon-text">Scroll</span> or <span className="neon-text">drag</span> to explore team members
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
