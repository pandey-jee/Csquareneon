import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  ChevronLeft, 
  ChevronRight, 
  Github, 
  Linkedin, 
  Mail, 
  MapPin,
  Quote
} from 'lucide-react';
import { gsapUtils, useGSAP } from '@/hooks/useGSAP';
import { TeamMember } from '@/types';

export default function CoreTeamSection() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { isLoaded } = useGSAP();

  const { data: teamMembers = [], isLoading } = useQuery<TeamMember[]>({
    queryKey: ['/api/core-team'],
  });

  // Fallback data if API is not working
  const fallbackTeam = [
    {
      id: '1',
      name: 'Alex Chen',
      position: 'President',
      bio: 'Passionate about algorithms and competitive programming. Leading the club with 3+ years of contest experience.',
      image: '/api/placeholder/300/300',
      github: 'https://github.com/alexchen',
      linkedin: 'https://linkedin.com/in/alexchen',
      email: 'alex@cSquare.club',
      skills: ['C++', 'Python', 'Data Structures', 'Graph Algorithms']
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      position: 'Vice President',
      bio: 'Expert in dynamic programming and problem-solving strategies. Mentoring students for ICPC competitions.',
      image: '/api/placeholder/300/300',
      github: 'https://github.com/sarahjohnson',
      linkedin: 'https://linkedin.com/in/sarahjohnson',
      email: 'sarah@cSquare.club',
      skills: ['Dynamic Programming', 'Graph Theory', 'Mathematics', 'Optimization']
    },
    {
      id: '3',
      name: 'Mike Rodriguez',
      position: 'Technical Lead',
      bio: 'Full-stack developer and algorithm enthusiast. Building tools and platforms for better learning experiences.',
      image: '/api/placeholder/300/300',
      github: 'https://github.com/mikerodriguez',
      linkedin: 'https://linkedin.com/in/mikerodriguez',
      email: 'mike@cSquare.club',
      skills: ['System Design', 'Full Stack', 'Database Optimization', 'API Development']
    },
    {
      id: '4',
      name: 'Emily Davis',
      position: 'Events Coordinator',
      bio: 'Organizing workshops, hackathons, and coding competitions. Creating engaging learning opportunities.',
      image: '/api/placeholder/300/300',
      github: 'https://github.com/emilydavis',
      linkedin: 'https://linkedin.com/in/emilydavis',
      email: 'emily@cSquare.club',
      skills: ['Project Management', 'Event Planning', 'Community Building', 'Mentoring']
    }
  ];

  const displayTeam = teamMembers.length > 0 ? teamMembers : fallbackTeam;

  useEffect(() => {
    if (displayTeam.length > 0) {
      setSelectedMember(displayTeam[0]);
    }
  }, [displayTeam]);

  useEffect(() => {
    if (isLoaded && window.ScrollTrigger) {
      gsapUtils.fadeIn('.team-title', 0.5);
      gsapUtils.slideUp('.team-cards', 0.7);
      gsapUtils.slideInLeft('.team-spotlight', 1);
    }
  }, [isLoaded]);

  const nextMember = () => {
    const nextIndex = (currentSlide + 1) % displayTeam.length;
    setCurrentSlide(nextIndex);
    setSelectedMember(displayTeam[nextIndex]);
  };

  const prevMember = () => {
    const prevIndex = currentSlide === 0 ? displayTeam.length - 1 : currentSlide - 1;
    setCurrentSlide(prevIndex);
    setSelectedMember(displayTeam[prevIndex]);
  };

  if (isLoading) {
    return (
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <Card key={index} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="w-full h-48 bg-muted rounded-lg mb-4"></div>
                  <div className="h-6 bg-muted rounded mb-2"></div>
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="team" className="py-20 bg-muted/30" data-testid="core-team-section">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="team-title text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Meet Our Team
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Dedicated 
            <span className="text-primary"> Leaders</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Our passionate core team members who drive the vision and mission of CSquare, 
            ensuring every member gets the best learning experience.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Team Member Cards */}
          <div className="team-cards">
            <div className="grid md:grid-cols-2 gap-6">
              {displayTeam.map((member, index) => (
                <Card 
                  key={member.id || index}
                  className={`cursor-pointer transition-all duration-300 hover:shadow-lg border border-border ${
                    selectedMember?.id === member.id ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setSelectedMember(member)}
                >
                  <CardContent className="p-6">
                    <div className="relative mb-4">
                      <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-blue-600/20 rounded-lg flex items-center justify-center border border-border">
                        <div className="text-6xl font-bold text-primary/30">
                          {(member.name || 'Unknown').charAt(0)}
                        </div>
                      </div>
                      <Badge 
                        variant="secondary" 
                        className="absolute -bottom-2 left-1/2 transform -translate-x-1/2"
                      >
                        {member.position || 'Member'}
                      </Badge>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground text-center mb-2">
                      {member.name || 'Unknown Name'}
                    </h3>
                    <p className="text-sm text-muted-foreground text-center line-clamp-2">
                      {member.bio || 'Passionate member of the CSquare community.'}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Member Spotlight */}
          {selectedMember && (
            <div className="team-spotlight">
              <Card className="border border-border">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-3xl font-bold text-foreground mb-2">
                        {selectedMember.name || 'Unknown Name'}
                      </h3>
                      <Badge variant="default" className="text-lg px-4 py-1">
                        {selectedMember.position || 'Member'}
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" onClick={prevMember}>
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={nextMember}>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="relative">
                      <Quote className="absolute -top-2 -left-2 h-8 w-8 text-primary/30" />
                      <p className="text-lg text-muted-foreground leading-relaxed pl-6">
                        {selectedMember.bio || 'Passionate member of the CSquare community dedicated to excellence in competitive programming.'}
                      </p>
                    </div>

                    {/* Skills */}
                    {(selectedMember as any)?.skills && (
                      <div>
                        <h4 className="text-lg font-semibold text-foreground mb-3">Expertise</h4>
                        <div className="flex flex-wrap gap-2">
                          {(selectedMember as any).skills.map((skill: string, index: number) => (
                            <Badge key={index} variant="outline">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Contact Links */}
                    <div className="flex gap-4 pt-4 border-t border-border">
                      {selectedMember.github && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => window.open(selectedMember.github, '_blank')}
                        >
                          <Github className="h-4 w-4 mr-2" />
                          GitHub
                        </Button>
                      )}
                      {selectedMember.linkedin && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => window.open(selectedMember.linkedin, '_blank')}
                        >
                          <Linkedin className="h-4 w-4 mr-2" />
                          LinkedIn
                        </Button>
                      )}
                      {selectedMember.email && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => window.open(`mailto:${selectedMember.email}`, '_blank')}
                        >
                          <Mail className="h-4 w-4 mr-2" />
                          Email
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {/* Join Team CTA */}
        <div className="text-center mt-16">
          <Card className="bg-gradient-to-r from-primary to-blue-600 border-0">
            <CardContent className="p-8 text-primary-foreground">
              <h3 className="text-2xl font-bold mb-4">Want to Join Our Core Team?</h3>
              <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
                We're always looking for passionate individuals who want to make a difference 
                in the competitive programming community. Apply to become a core team member!
              </p>
              <Button 
                variant="secondary"
                size="lg"
                className="font-semibold"
                onClick={() => window.open('mailto:core@cSquare.club?subject=Core Team Application', '_blank')}
              >
                Apply to Join
                <Mail className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
