import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Calendar, 
  Clock, 
  Trophy,
  Code,
  Laptop,
  BookOpen
} from 'lucide-react';
import './EventsSection.css';

gsap.registerPlugin(ScrollTrigger);

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  venue: string;
  type: 'workshop' | 'contest' | 'hackathon' | 'seminar';
  maxParticipants: number;
  status: 'past' | 'ongoing' | 'upcoming';
  image: string;
  price?: string;
  organizer: string;
  daysLeft?: number;
}

export default function EventsSection() {
  const [activeTab, setActiveTab] = useState<'past' | 'ongoing' | 'upcoming'>('upcoming');
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Sample events data
  const eventsData: Event[] = [
    // Upcoming Events
    {
      id: '1',
      title: 'Algorithm Mastery Workshop',
      description: 'Deep dive into advanced algorithms and data structures with hands-on coding sessions.',
      date: '2025-08-30T10:00:00Z',
      venue: 'Computer Lab 101',
      type: 'workshop',
      maxParticipants: 30,
      status: 'upcoming',
      image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=300&fit=crop',
      price: '0.025 ETH',
      organizer: 'Alex Rodriguez',
      daysLeft: 3
    },
    {
      id: '2',
      title: 'Cyberpunk Coding Contest',
      description: 'Monthly programming contest with exciting prizes and challenging problems.',
      date: '2025-09-05T14:00:00Z',
      venue: 'Main Auditorium',
      type: 'contest',
      maxParticipants: 100,
      status: 'upcoming',
      image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400&h=300&fit=crop',
      price: '0.041 ETH',
      organizer: 'Sarah Chen',
      daysLeft: 9
    },
    {
      id: '3',
      title: 'AI/ML Hackathon 2025',
      description: 'Build innovative AI solutions in 48 hours with industry mentors.',
      date: '2025-09-15T09:00:00Z',
      venue: 'Innovation Hub',
      type: 'hackathon',
      maxParticipants: 80,
      status: 'upcoming',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop',
      price: '0.035 ETH',
      organizer: 'Marcus Johnson',
      daysLeft: 19
    },
    // Ongoing Events
    {
      id: '4',
      title: 'Web Development Bootcamp',
      description: 'Comprehensive web development course covering React, Node.js, and modern frameworks.',
      date: '2025-08-20T09:00:00Z',
      venue: 'Virtual + Lab 102',
      type: 'workshop',
      maxParticipants: 50,
      status: 'ongoing',
      image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=300&fit=crop',
      price: '0.030 ETH',
      organizer: 'Emily Davis'
    },
    {
      id: '5',
      title: 'Live Coding Sessions',
      description: 'Daily problem-solving sessions with real-time guidance and peer collaboration.',
      date: '2025-08-25T16:00:00Z',
      venue: 'Discord + Twitch',
      type: 'seminar',
      maxParticipants: 200,
      status: 'ongoing',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop',
      price: 'Free',
      organizer: 'David Kim'
    },
    // Past Events
    {
      id: '6',
      title: 'Summer Code Championship',
      description: 'Epic coding competition with record-breaking participation.',
      date: '2025-08-15T14:00:00Z',
      venue: 'University Stadium',
      type: 'contest',
      maxParticipants: 150,
      status: 'past',
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop',
      price: '0.050 ETH',
      organizer: 'Lisa Wang'
    },
    {
      id: '7',
      title: 'Open Source Contribution Workshop',
      description: 'Learn how to contribute to major open source projects and build your portfolio.',
      date: '2025-08-10T10:00:00Z',
      venue: 'Library Auditorium',
      type: 'workshop',
      maxParticipants: 40,
      status: 'past',
      image: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=400&h=300&fit=crop',
      price: '0.020 ETH',
      organizer: 'John Smith'
    }
  ];

  const filteredEvents = eventsData.filter(event => event.status === activeTab);

  useEffect(() => {
    if (!sectionRef.current || !titleRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        end: "bottom 30%",
        toggleActions: "play none none reverse"
      }
    });

    // Title animation
    tl.fromTo(titleRef.current, 
      { 
        opacity: 0,
        y: 50,
        textShadow: "0 0 0 transparent"
      },
      { 
        opacity: 1,
        y: 0,
        duration: 1,
        textShadow: "0 0 20px var(--cyberpunk-cyan)",
        ease: "power3.out"
      }
    );

    // Cards stagger animation
    tl.fromTo(cardsRef.current.filter(Boolean),
      {
        opacity: 0,
        y: 100,
        scale: 0.8
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.7)"
      },
      "-=0.5"
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [activeTab]);

  const addToRefs = (el: HTMLDivElement | null, index: number) => {
    if (el) cardsRef.current[index] = el;
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'workshop': return BookOpen;
      case 'contest': return Trophy;
      case 'hackathon': return Code;
      case 'seminar': return Laptop;
      default: return Calendar;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }),
      time: date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      })
    };
  };

  return (
    <>
      <section ref={sectionRef} id="events" className="events-section" data-testid="events-section">
        <div className="events-container">
          <h2 ref={titleRef} className="events-title">
            <span className="title-line"></span>
            <span className="title-text">Our Events</span>
            <span className="title-line"></span>
          </h2>

          <div className="events-tabs">
            {(['past', 'ongoing', 'upcoming'] as const).map((tab) => (
              <button
                key={tab}
                className={`tab-button ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)} Events
              </button>
            ))}
          </div>

          <div className="events-grid">
            {filteredEvents.map((event, index) => {
              const Icon = getEventIcon(event.type);
              const { time } = formatDate(event.date);

              return (
                <div key={event.id} ref={(el) => addToRefs(el, index)} className="event-card-wrapper">
                  <div className="event-card">
                    <a href="/" className="hero-image-container">
                      <img className="hero-image" src={event.image} alt={event.title}/>
                    </a>
                    <main className="main-content">
                      <h1><a href="#">{event.title}</a></h1>
                      <p>{event.description}</p>
                      <div className="flex-row">
                        <div className="coin-base">
                          <Icon className="small-image"/>
                          <h2>{event.price || 'Free'}</h2>
                        </div>
                        <div className="time-left">
                          <Clock className="small-image"/>
                          <p>{event.daysLeft ? `${event.daysLeft} days left` : time}</p>
                        </div>
                      </div>
                    </main>
                    <div className="card-attribute">
                      <img src={`https://i.pravatar.cc/150?u=${event.organizer}`} alt="organizer" className="small-avatar"/>
                      <p>Organized by <span><a href="#">{event.organizer}</a></span></p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}