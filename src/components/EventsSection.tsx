import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  ArrowRight,
  Trophy,
  Code,
  Laptop,
  BookOpen
} from 'lucide-react';

export default function EventsSection() {

  // Fallback events data
  const fallbackEvents = [
    {
      id: '1',
      title: 'Algorithm Workshop',
      description: 'Learn dynamic programming and practice problem solving.',
      date: '2024-09-15T10:00:00Z',
      venue: 'Computer Lab 101',
      type: 'workshop' as const,
      maxParticipants: 30,
      isPublished: true
    },
    {
      id: '2',
      title: 'Code Championship',
      description: 'Monthly programming contest with exciting prizes.',
      date: '2024-09-22T14:00:00Z',
      venue: 'Main Auditorium',
      type: 'contest' as const,
      maxParticipants: 100,
      isPublished: true
    }
  ];

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'workshop': return BookOpen;
      case 'contest': return Trophy;
      case 'hackathon': return Code;
      case 'seminar': return Laptop;
      default: return Calendar;
    }
  };

  return (
    <section id="events" data-testid="events-section">
      <div>
        <div>
          <h2>
            Upcoming Events
          </h2>
          <p>
            Join our exciting events and boost your programming skills
          </p>
        </div>

        <div>
          <div>
            {(['all', 'upcoming', 'past'] as const).map((filterOption) => (
              <button
                key={filterOption}
              >
                {filterOption}
              </button>
            ))}
          </div>
        </div>

        <div>
          {fallbackEvents.map((event) => {
            const Icon = getEventIcon(event.type);
            const eventDate = new Date(event.date);
            const formattedDate = eventDate.toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            });
            const formattedTime = eventDate.toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit'
            });

            return (
              <div key={event.id}>
                <div>
                  <div>
                    <div>
                      <div>
                        <Icon />
                      </div>
                      <span>
                        {event.type}
                      </span>
                    </div>
                  </div>
                  <h3>
                    {event.title}
                  </h3>
                </div>
                <div>
                  <p>
                    {event.description}
                  </p>
                  
                  <div>
                    <div>
                      <Calendar />
                      <span>{formattedDate}</span>
                    </div>
                    <div>
                      <Clock />
                      <span>{formattedTime}</span>
                    </div>
                    <div>
                      <MapPin />
                      <span>{event.venue}</span>
                    </div>
                    {event.maxParticipants && (
                      <div>
                        <Users />
                        <span>Max {event.maxParticipants} participants</span>
                      </div>
                    )}
                  </div>

                  <button>
                    Register Now
                    <ArrowRight />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div>
          <button>
            View All Events
            <ArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
}