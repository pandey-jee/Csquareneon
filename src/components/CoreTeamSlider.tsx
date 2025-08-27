import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Github, Linkedin, Instagram } from 'lucide-react';

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

const CoreTeamSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Generate 30 team members with variety
  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: "Alex Rodriguez",
      role: "President",
      position: "Full Stack Developer",
      description: "Leading the club towards excellence in competitive programming.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
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
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b1e0?w=400&h=500&fit=crop",
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
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop",
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
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop",
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
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop",
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
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=500&fit=crop",
      social: { github: "#", linkedin: "#", instagram: "#" },
      skills: ["Flutter", "React Native", "Swift", "Kotlin"],
      achievements: ["App Store Featured", "Mobile Expert", "Tech Blogger"]
    }
  ];

  // Generate additional 24 members
  const additionalMembers: TeamMember[] = Array.from({ length: 24 }, (_, index) => ({
    id: index + 7,
    name: [
      "John Smith", "Anna Brown", "Mike Wilson", "Sofia Garcia", "Ryan Taylor",
      "Maya Patel", "Chris Anderson", "Zoe Martinez", "Jake Thompson", "Nina Rodriguez",
      "Sam Lee", "Ava Johnson", "Max Chen", "Ella Davis", "Ben Miller", "Grace Kim",
      "Luke Wilson", "Chloe Zhang", "Noah Garcia", "Mia Anderson", "Owen Martinez",
      "Lily Thompson", "Ethan Brown", "Sophia Lee"
    ][index],
    role: [
      "Senior Member", "Active Member", "Core Member", "Contributing Member", 
      "Research Member", "Algorithm Specialist", "Contest Participant"
    ][index % 7],
    position: [
      "Software Engineer", "Backend Developer", "Frontend Developer", "DevOps Engineer",
      "Data Scientist", "Mobile Developer", "Full Stack Developer", "Game Developer",
      "Security Engineer", "Cloud Architect"
    ][index % 10],
    description: [
      "Passionate about algorithms and problem solving.",
      "Expert in competitive programming and system design.",
      "Dedicated to learning and sharing knowledge.",
      "Enthusiastic about open source contributions.",
      "Focused on building scalable applications."
    ][index % 5],
    image: `https://images.unsplash.com/photo-${1500000000000 + index * 100000}?w=400&h=500&fit=crop&auto=format`,
    social: { 
      github: "#", 
      linkedin: "#", 
      instagram: "#"
    },
    skills: [
      ["JavaScript", "Node.js", "MongoDB"],
      ["Python", "Django", "PostgreSQL"],
      ["Java", "Spring", "MySQL"],
      ["React", "TypeScript", "GraphQL"],
      ["Go", "Docker", "Kubernetes"]
    ][index % 5],
    achievements: [
      ["Contest Winner", "Open Source Contributor"],
      ["Hackathon Winner", "Tech Speaker"],
      ["Research Publication", "Industry Expert"],
      ["Community Leader", "Mentor"]
    ][index % 4]
  }));

  const allMembers = [...teamMembers, ...additionalMembers];
  const totalSlides = allMembers.length;

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const getSlideIndex = (offset: number) => {
    return (currentSlide + offset + totalSlides) % totalSlides;
  };

  if (!isLoaded) {
    return (
      <div>
        <div>
          <span>Loading Team...</span>
        </div>
      </div>
    );
  }

  return (
    <section id="team">
      <div>
        <div>
          <span>Our Team</span>
          <h2>Meet Our Core Team</h2>
          <p>
            Passionate members driving innovation in competitive programming
          </p>
        </div>

        <div>
          <button 
            onClick={prevSlide}
          >
            <ChevronLeft size={24} />
          </button>

          <div>
            <div>
              <div>
                <img 
                  src={allMembers[getSlideIndex(-1)]?.image} 
                  alt={allMembers[getSlideIndex(-1)]?.name}
                />
              </div>
            </div>

            <div>
              <div>
                <img 
                  src={allMembers[currentSlide]?.image} 
                  alt={allMembers[currentSlide]?.name}
                />
                
                <div>
                  <h3>
                    {allMembers[currentSlide]?.name}
                  </h3>
                  <p>
                    {allMembers[currentSlide]?.role}
                  </p>
                  <p>
                    {allMembers[currentSlide]?.position}
                  </p>
                </div>

                <div>
                  {allMembers[currentSlide]?.social.github && (
                    <a 
                      href={allMembers[currentSlide].social.github} 
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github size={16} />
                    </a>
                  )}
                  {allMembers[currentSlide]?.social.linkedin && (
                    <a 
                      href={allMembers[currentSlide].social.linkedin} 
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin size={16} />
                    </a>
                  )}
                  {allMembers[currentSlide]?.social.instagram && (
                    <a 
                      href={allMembers[currentSlide].social.instagram} 
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Instagram size={16} />
                    </a>
                  )}
                </div>
              </div>
            </div>

            <div>
              <div>
                <img 
                  src={allMembers[getSlideIndex(1)]?.image} 
                  alt={allMembers[getSlideIndex(1)]?.name}
                />
              </div>
            </div>
          </div>

          <button 
            onClick={nextSlide}
          >
            <ChevronRight size={24} />
          </button>
        </div>

        <div>
          <div>
            {Array.from({ length: Math.min(totalSlides, 10) }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
          <span>
            {currentSlide + 1} / {totalSlides}
          </span>
        </div>
      </div>
    </section>
  );
};

export default CoreTeamSection;
