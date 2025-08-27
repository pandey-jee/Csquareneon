import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { isUnauthorizedError } from '@/lib/authUtils';
import { gsapUtils, useGSAP } from '@/hooks/useGSAP';
import { ClubStatistics, Member, Event, CoreTeamMember, Collaborator } from '@/types';
import { Users, Calendar, Star, Trophy, Plus, Edit, Trash2, ExternalLink } from 'lucide-react';

// Form schemas
const eventSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  eventDate: z.string().min(1, 'Event date is required'),
  eventType: z.enum(['competition', 'workshop', 'hackathon']),
  imageUrl: z.string().url().optional().or(z.literal('')),
  registrationUrl: z.string().url().optional().or(z.literal('')),
  maxParticipants: z.number().optional(),
});

const coreTeamSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  position: z.string().min(1, 'Position is required'),
  academicYear: z.string().min(1, 'Academic year is required'),
  tenure: z.string().min(1, 'Tenure is required'),
  achievements: z.string().optional(),
  specialization: z.string().optional(),
  linkedinUrl: z.string().url().optional().or(z.literal('')),
  githubUrl: z.string().url().optional().or(z.literal('')),
  imageUrl: z.string().url().optional().or(z.literal('')),
  displayOrder: z.number().default(0),
});

const collaboratorSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  websiteUrl: z.string().url().optional().or(z.literal('')),
  logoUrl: z.string().url().optional().or(z.literal('')),
  partnershipType: z.string().optional(),
  displayOrder: z.number().default(0),
});

type EventForm = z.infer<typeof eventSchema>;
type CoreTeamForm = z.infer<typeof coreTeamSchema>;
type CollaboratorForm = z.infer<typeof collaboratorSchema>;

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [isAddTeamMemberOpen, setIsAddTeamMemberOpen] = useState(false);
  const [isAddCollaboratorOpen, setIsAddCollaboratorOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [editingTeamMember, setEditingTeamMember] = useState<CoreTeamMember | null>(null);
  const [editingCollaborator, setEditingCollaborator] = useState<Collaborator | null>(null);
  
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { isLoaded } = useGSAP();

  // Queries
  const { data: statistics } = useQuery<ClubStatistics>({
    queryKey: ['/api/statistics'],
  });

  const { data: members = [] } = useQuery<Member[]>({
    queryKey: ['/api/admin/members'],
    retry: (failureCount, error) => {
      if (isUnauthorizedError(error as Error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return false;
      }
      return failureCount < 3;
    },
  });

  const { data: events = [] } = useQuery<Event[]>({
    queryKey: ['/api/events'],
  });

  const { data: coreTeam = [] } = useQuery<CoreTeamMember[]>({
    queryKey: ['/api/core-team'],
  });

  const { data: collaborators = [] } = useQuery<Collaborator[]>({
    queryKey: ['/api/collaborators'],
  });

  // Mutations
  const deleteMemberMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest('DELETE', `/api/admin/members/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/members'] });
      queryClient.invalidateQueries({ queryKey: ['/api/statistics'] });
      toast({ title: 'Member deleted successfully' });
    },
    onError: (error: Error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({ title: 'Failed to delete member', variant: 'destructive' });
    },
  });

  const createEventMutation = useMutation({
    mutationFn: async (data: EventForm) => {
      const payload = {
        ...data,
        eventDate: new Date(data.eventDate).toISOString(),
        maxParticipants: data.maxParticipants || null,
      };
      return apiRequest('POST', '/api/admin/events', payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/events'] });
      queryClient.invalidateQueries({ queryKey: ['/api/statistics'] });
      toast({ title: 'Event created successfully' });
      setIsAddEventOpen(false);
    },
    onError: (error: Error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({ title: 'Failed to create event', variant: 'destructive' });
    },
  });

  const updateEventMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<EventForm> }) => {
      const payload = {
        ...data,
        eventDate: data.eventDate ? new Date(data.eventDate).toISOString() : undefined,
      };
      return apiRequest('PUT', `/api/admin/events/${id}`, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/events'] });
      toast({ title: 'Event updated successfully' });
      setEditingEvent(null);
    },
    onError: (error: Error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({ title: 'Failed to update event', variant: 'destructive' });
    },
  });

  const deleteEventMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest('DELETE', `/api/admin/events/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/events'] });
      queryClient.invalidateQueries({ queryKey: ['/api/statistics'] });
      toast({ title: 'Event deleted successfully' });
    },
    onError: (error: Error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({ title: 'Failed to delete event', variant: 'destructive' });
    },
  });

  const createTeamMemberMutation = useMutation({
    mutationFn: async (data: CoreTeamForm) => {
      return apiRequest('POST', '/api/admin/core-team', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/core-team'] });
      queryClient.invalidateQueries({ queryKey: ['/api/statistics'] });
      toast({ title: 'Core team member added successfully' });
      setIsAddTeamMemberOpen(false);
    },
    onError: (error: Error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({ title: 'Failed to add team member', variant: 'destructive' });
    },
  });

  const updateTeamMemberMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<CoreTeamForm> }) => {
      return apiRequest('PUT', `/api/admin/core-team/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/core-team'] });
      toast({ title: 'Team member updated successfully' });
      setEditingTeamMember(null);
    },
    onError: (error: Error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({ title: 'Failed to update team member', variant: 'destructive' });
    },
  });

  const deleteTeamMemberMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest('DELETE', `/api/admin/core-team/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/core-team'] });
      queryClient.invalidateQueries({ queryKey: ['/api/statistics'] });
      toast({ title: 'Team member deleted successfully' });
    },
    onError: (error: Error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({ title: 'Failed to delete team member', variant: 'destructive' });
    },
  });

  const createCollaboratorMutation = useMutation({
    mutationFn: async (data: CollaboratorForm) => {
      return apiRequest('POST', '/api/admin/collaborators', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/collaborators'] });
      toast({ title: 'Collaborator added successfully' });
      setIsAddCollaboratorOpen(false);
    },
    onError: (error: Error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({ title: 'Failed to add collaborator', variant: 'destructive' });
    },
  });

  const updateCollaboratorMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<CollaboratorForm> }) => {
      return apiRequest('PUT', `/api/admin/collaborators/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/collaborators'] });
      toast({ title: 'Collaborator updated successfully' });
      setEditingCollaborator(null);
    },
    onError: (error: Error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({ title: 'Failed to update collaborator', variant: 'destructive' });
    },
  });

  const deleteCollaboratorMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest('DELETE', `/api/admin/collaborators/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/collaborators'] });
      toast({ title: 'Collaborator deleted successfully' });
    },
    onError: (error: Error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({ title: 'Failed to delete collaborator', variant: 'destructive' });
    },
  });

  // Form hooks
  const eventForm = useForm<EventForm>({
    resolver: zodResolver(eventSchema),
  });

  const teamMemberForm = useForm<CoreTeamForm>({
    resolver: zodResolver(coreTeamSchema),
  });

  const collaboratorForm = useForm<CollaboratorForm>({
    resolver: zodResolver(collaboratorSchema),
  });

  useEffect(() => {
    if (isLoaded) {
      gsapUtils.fadeIn('.admin-header', 0.2);
      gsapUtils.staggerCards('.admin-card', 0.1);
    }
  }, [isLoaded]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const upcomingEvents = events.filter(e => e.status === 'upcoming');
  const pastEvents = events.filter(e => e.status === 'past');

  return (
    <div data-testid="admin-dashboard">
      {/* Admin Header */}
      <div>
        <div>
          <div>
            <div>
              <h1 data-testid="text-dashboard-title">
                CSquare Admin Dashboard
              </h1>
              <p>Manage your competitive programming club</p>
            </div>
            <div>
              <Button
                onClick={() => window.location.href = '/'}
                variant="outline"
                data-testid="button-back-home"
              >
                Back to Website
              </Button>
              <Button
                onClick={() => window.location.href = '/api/logout'}
                variant="outline"
                data-testid="button-logout"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="overview" data-testid="tab-overview">Overview</TabsTrigger>
            <TabsTrigger value="members" data-testid="tab-members">Members</TabsTrigger>
            <TabsTrigger value="events" data-testid="tab-events">Events</TabsTrigger>
            <TabsTrigger value="team" data-testid="tab-team">Core Team</TabsTrigger>
            <TabsTrigger value="collaborators" data-testid="tab-collaborators">Partners</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            {statistics && (
              <div>
                <Card>
                  <CardContent>
                    <div>
                      <Users />
                      <div>
                        <p>Total Members</p>
                        <p data-testid="text-total-members">
                          {statistics.totalMembers}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent>
                    <div>
                      <Calendar />
                      <div>
                        <p>Total Events</p>
                        <p data-testid="text-total-events">
                          {statistics.totalEvents}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent>
                    <div>
                      <Star />
                      <div>
                        <p>Core Team</p>
                        <p data-testid="text-total-core-members">
                          {statistics.totalCoreMembers}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent>
                    <div>
                      <Trophy />
                      <div>
                        <p>Achievements</p>
                        <p data-testid="text-total-achievements">
                          {statistics.totalAchievements}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  {members.slice(0, 5).map((member) => (
                    <div key={member.id}>
                      <div></div>
                      <div>
                        <p>New member registered</p>
                        <p>{member.name} joined CSquare</p>
                      </div>
                      <span>{formatDate(member.joinedAt)}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Members Tab */}
          <TabsContent value="members">
            <Card>
              <CardHeader>
                <div>
                  <CardTitle>Member Management</CardTitle>
                  <Badge variant="secondary" data-testid="badge-member-count">
                    {members.length} Members
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Roll Number</TableHead>
                      <TableHead>Year</TableHead>
                      <TableHead>Experience</TableHead>
                      <TableHead>Participation</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {members.map((member) => (
                      <TableRow key={member.id} data-testid={`row-member-${member.id}`}>
                        <TableCell>{member.name}</TableCell>
                        <TableCell>{member.rollNumber}</TableCell>
                        <TableCell>{member.academicYear}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{member.programmingExperience}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">{member.participationCount} events</Badge>
                        </TableCell>
                        <TableCell>{formatDate(member.joinedAt)}</TableCell>
                        <TableCell>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => deleteMemberMutation.mutate(member.id)}
                            disabled={deleteMemberMutation.isPending}
                            data-testid={`button-delete-member-${member.id}`}
                          >
                            <Trash2 />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events">
            <div>
              <h2>Event Management</h2>
              <Dialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen}>
                <DialogTrigger asChild>
                  <Button data-testid="button-add-event">
                    <Plus />
                    Add Event
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Event</DialogTitle>
                  </DialogHeader>
                  <form
                    onSubmit={eventForm.handleSubmit((data) => createEventMutation.mutate(data))}
                  >
                    <div>
                      <div>
                        <Label htmlFor="title">Title</Label>
                        <Input {...eventForm.register('title')} data-testid="input-event-title" />
                        {eventForm.formState.errors.title && (
                          <p>{eventForm.formState.errors.title.message}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="eventType">Type</Label>
                        <Select onValueChange={(value) => eventForm.setValue('eventType', value as any)}>
                          <SelectTrigger data-testid="select-event-type">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="competition">Competition</SelectItem>
                            <SelectItem value="workshop">Workshop</SelectItem>
                            <SelectItem value="hackathon">Hackathon</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea {...eventForm.register('description')} data-testid="textarea-event-description" />
                    </div>
                    
                    <div>
                      <div>
                        <Label htmlFor="eventDate">Event Date</Label>
                        <Input type="datetime-local" {...eventForm.register('eventDate')} data-testid="input-event-date" />
                      </div>
                      <div>
                        <Label htmlFor="maxParticipants">Max Participants</Label>
                        <Input
                          type="number"
                          {...eventForm.register('maxParticipants', { valueAsNumber: true })}
                          data-testid="input-max-participants"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <div>
                        <Label htmlFor="imageUrl">Image URL</Label>
                        <Input {...eventForm.register('imageUrl')} data-testid="input-event-image" />
                      </div>
                      <div>
                        <Label htmlFor="registrationUrl">Registration URL</Label>
                        <Input {...eventForm.register('registrationUrl')} data-testid="input-registration-url" />
                      </div>
                    </div>
                    
                    <div>
                      <Button type="button" variant="outline" onClick={() => setIsAddEventOpen(false)}>
                        Cancel
                      </Button>
                      <Button type="submit" disabled={createEventMutation.isPending} data-testid="button-save-event">
                        {createEventMutation.isPending ? 'Creating...' : 'Create Event'}
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Events ({upcomingEvents.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div>
                    {upcomingEvents.map((event) => (
                      <div key={event.id} data-testid={`card-upcoming-event-${event.id}`}>
                        <div>
                          <h5>{event.title}</h5>
                          <div>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setEditingEvent(event)}
                              data-testid={`button-edit-event-${event.id}`}
                            >
                              <Edit />
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => deleteEventMutation.mutate(event.id)}
                              data-testid={`button-delete-event-${event.id}`}
                            >
                              <Trash2 />
                            </Button>
                          </div>
                        </div>
                        <p>{event.description}</p>
                        <div>
                          <span>{formatDate(event.eventDate)}</span>
                          <Badge>{event.eventType}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Past Events ({pastEvents.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div>
                    {pastEvents.slice(0, 5).map((event) => (
                      <div key={event.id} data-testid={`card-past-event-${event.id}`}>
                        <h5>{event.title}</h5>
                        <p>{formatDate(event.eventDate)}</p>
                        <div>
                          <span>{event.currentParticipants} participants</span>
                          <Badge variant="outline">Completed</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Core Team Tab */}
          <TabsContent value="team">
            <div>
              <h2>Core Team Management</h2>
              <Dialog open={isAddTeamMemberOpen} onOpenChange={setIsAddTeamMemberOpen}>
                <DialogTrigger asChild>
                  <Button data-testid="button-add-team-member">
                    <Plus />
                    Add Team Member
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Core Team Member</DialogTitle>
                  </DialogHeader>
                  <form
                    onSubmit={teamMemberForm.handleSubmit((data) => createTeamMemberMutation.mutate(data))}
                  >
                    <div>
                      <div>
                        <Label htmlFor="name">Name</Label>
                        <Input {...teamMemberForm.register('name')} data-testid="input-team-member-name" />
                      </div>
                      <div>
                        <Label htmlFor="position">Position</Label>
                        <Input {...teamMemberForm.register('position')} data-testid="input-team-member-position" />
                      </div>
                    </div>
                    
                    <div>
                      <div>
                        <Label htmlFor="academicYear">Academic Year</Label>
                        <Input {...teamMemberForm.register('academicYear')} data-testid="input-team-member-year" />
                      </div>
                      <div>
                        <Label htmlFor="tenure">Tenure</Label>
                        <Input {...teamMemberForm.register('tenure')} data-testid="input-team-member-tenure" />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="achievements">Achievements</Label>
                      <Textarea {...teamMemberForm.register('achievements')} data-testid="textarea-team-member-achievements" />
                    </div>
                    
                    <div>
                      <Label htmlFor="specialization">Specialization</Label>
                      <Input {...teamMemberForm.register('specialization')} data-testid="input-team-member-specialization" />
                    </div>
                    
                    <div>
                      <div>
                        <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
                        <Input {...teamMemberForm.register('linkedinUrl')} data-testid="input-team-member-linkedin" />
                      </div>
                      <div>
                        <Label htmlFor="githubUrl">GitHub URL</Label>
                        <Input {...teamMemberForm.register('githubUrl')} data-testid="input-team-member-github" />
                      </div>
                      <div>
                        <Label htmlFor="imageUrl">Image URL</Label>
                        <Input {...teamMemberForm.register('imageUrl')} data-testid="input-team-member-image" />
                      </div>
                    </div>
                    
                    <div>
                      <Button type="button" variant="outline" onClick={() => setIsAddTeamMemberOpen(false)}>
                        Cancel
                      </Button>
                      <Button type="submit" disabled={createTeamMemberMutation.isPending} data-testid="button-save-team-member">
                        {createTeamMemberMutation.isPending ? 'Adding...' : 'Add Member'}
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <Card>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Position</TableHead>
                      <TableHead>Year</TableHead>
                      <TableHead>Tenure</TableHead>
                      <TableHead>Order</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {coreTeam.map((member) => (
                      <TableRow key={member.id} data-testid={`row-team-member-${member.id}`}>
                        <TableCell>{member.name}</TableCell>
                        <TableCell>{member.position}</TableCell>
                        <TableCell>{member.academicYear}</TableCell>
                        <TableCell>{member.tenure}</TableCell>
                        <TableCell>{member.displayOrder}</TableCell>
                        <TableCell>
                          <div>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setEditingTeamMember(member)}
                              data-testid={`button-edit-team-member-${member.id}`}
                            >
                              <Edit />
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => deleteTeamMemberMutation.mutate(member.id)}
                              data-testid={`button-delete-team-member-${member.id}`}
                            >
                              <Trash2 />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Collaborators Tab */}
          <TabsContent value="collaborators">
            <div>
              <h2>Partner Management</h2>
              <Dialog open={isAddCollaboratorOpen} onOpenChange={setIsAddCollaboratorOpen}>
                <DialogTrigger asChild>
                  <Button data-testid="button-add-collaborator">
                    <Plus />
                    Add Partner
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Collaborator</DialogTitle>
                  </DialogHeader>
                  <form
                    onSubmit={collaboratorForm.handleSubmit((data) => createCollaboratorMutation.mutate(data))}
                  >
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input {...collaboratorForm.register('name')} data-testid="input-collaborator-name" />
                    </div>
                    
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Input {...collaboratorForm.register('description')} data-testid="input-collaborator-description" />
                    </div>
                    
                    <div>
                      <Label htmlFor="partnershipType">Partnership Type</Label>
                      <Input {...collaboratorForm.register('partnershipType')} data-testid="input-partnership-type" />
                    </div>
                    
                    <div>
                      <div>
                        <Label htmlFor="websiteUrl">Website URL</Label>
                        <Input {...collaboratorForm.register('websiteUrl')} data-testid="input-collaborator-website" />
                      </div>
                      <div>
                        <Label htmlFor="logoUrl">Logo URL</Label>
                        <Input {...collaboratorForm.register('logoUrl')} data-testid="input-collaborator-logo" />
                      </div>
                    </div>
                    
                    <div>
                      <Button type="button" variant="outline" onClick={() => setIsAddCollaboratorOpen(false)}>
                        Cancel
                      </Button>
                      <Button type="submit" disabled={createCollaboratorMutation.isPending} data-testid="button-save-collaborator">
                        {createCollaboratorMutation.isPending ? 'Adding...' : 'Add Partner'}
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <div>
              {collaborators.map((collaborator) => (
                <Card key={collaborator.id} data-testid={`card-collaborator-${collaborator.id}`}>
                  <CardContent>
                    <div>
                      <h3>{collaborator.name}</h3>
                      <div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditingCollaborator(collaborator)}
                          data-testid={`button-edit-collaborator-${collaborator.id}`}
                        >
                          <Edit />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => deleteCollaboratorMutation.mutate(collaborator.id)}
                          data-testid={`button-delete-collaborator-${collaborator.id}`}
                        >
                          <Trash2 />
                        </Button>
                      </div>
                    </div>
                    <p>{collaborator.description}</p>
                    {collaborator.partnershipType && (
                      <Badge variant="outline">{collaborator.partnershipType}</Badge>
                    )}
                    {collaborator.websiteUrl && (
                      <Button size="sm" variant="ghost" asChild>
                        <a href={collaborator.websiteUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink />
                          Visit
                        </a>
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
