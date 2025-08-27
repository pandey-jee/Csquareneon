// Auth-related types
export interface User {
  id: number;
  username: string;
  isAdmin: boolean;
  joinedAt: Date;
  bio?: string;
}

// Event-related types
export interface Event {
  id: number;
  title: string;
  description: string;
  date: Date;
  location: string;
  imageUrl?: string;
  maxParticipants?: number;
  currentParticipants: number;
  createdAt: Date;
  updatedAt: Date;
}

// Team member types
export interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  imageUrl?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  order: number;
  isCore: boolean;
  createdAt: Date;
}

// Statistics types
export interface Statistics {
  totalMembers: number;
  totalEvents: number;
  totalProblems: number;
  averageRating: number;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Form input types (for client-side validation)
export interface LoginInput {
  username: string;
  password: string;
}

export interface EventInput {
  title: string;
  description: string;
  date: string;
  location: string;
  imageUrl?: string;
  maxParticipants?: number;
}

export interface TeamMemberInput {
  name: string;
  role: string;
  bio: string;
  imageUrl?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  order: number;
  isCore: boolean;
}
