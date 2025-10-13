// Shared types for Team
export interface Member {
  id: string;
  name: string;
  position: string;
  image?: string | null;
  linkedin?: string | null;
  github?: string | null;
  email?: string | null;
  order?: number;
  teamId: string;
}

export interface Team {
  id: string;
  year: number;
  name: string;
  position: string;
  image?: string | null;
  members: Member[];
  createdAt: string;
}

export interface TeamFormData {
  id?: string;
  year: number;
  name: string;
  position?: string;
  image?: string | null;
}

export interface MemberFormData {
  id?: string;
  name: string;
  position: string;
  image?: string | null;
  linkedin?: string | null;
  github?: string | null;
  email?: string | null;
  order?: number;
  teamId?: string;
}

