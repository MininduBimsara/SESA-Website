// Shared types for Events
export interface Event {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  date: string;
  time?: string;
  location?: string;
  image?: string;
  status: "upcoming" | "ongoing" | "past";
  category: "hackathon" | "workshop" | "social" | "csr" | "competition";
  participants?: number;
  registrationLink?: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface EventFormData {
  id?: string;
  title: string;
  description: string;
  longDescription?: string;
  date: string;
  time?: string;
  location?: string;
  image?: string;
  status: "upcoming" | "ongoing" | "past";
  category: "hackathon" | "workshop" | "social" | "csr" | "competition";
  participants?: number;
  registrationLink?: string;
  featured: boolean;
}
