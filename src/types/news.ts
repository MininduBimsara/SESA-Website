export interface News {
  id: string;
  title: string;
  content: string; // HTML content
  excerpt?: string;
  slug: string;
  author: string;
  featured: boolean;
  published: boolean;
  image?: string;
  category?: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export type NewsFormData = Omit<News, "id" | "createdAt" | "updatedAt">;
