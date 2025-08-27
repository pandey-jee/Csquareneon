export interface ClubStatistics {
  totalMembers: number;
  totalEvents: number;
  coreTeamMembers?: number;
  totalCoreMembers?: number;
  totalAchievements?: number;
  totalProblems?: number;
  averageRating?: number;
}

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  bio?: string;
  academicYear?: string;
  tenure?: string;
  achievements?: string;
  specialization?: string;
  linkedin?: string;
  linkedinUrl?: string;
  github?: string;
  githubUrl?: string;
  email?: string;
  image?: string;
  imageUrl?: string;
  skills?: string[];
  displayOrder?: number;
  isActive?: boolean;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  eventDate: string;
  eventType: string;
  status: "upcoming" | "ongoing" | "past";
  imageUrl?: string;
  registrationUrl?: string;
  maxParticipants?: number;
  currentParticipants: number;
}

export interface Collaborator {
  id: string;
  name: string;
  description?: string;
  websiteUrl?: string;
  logoUrl?: string;
  partnershipType?: string;
  isActive: boolean;
  displayOrder: number;
}

export interface Member {
  id: string;
  name: string;
  email: string;
  rollNumber: string;
  academicYear: string;
  programmingExperience: string;
  participationCount: number;
  joinedAt: string;
}

export interface MemberRegistration {
  name: string;
  email: string;
  rollNumber: string;
  academicYear: string;
  programmingExperience: string;
}
