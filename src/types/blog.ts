export interface Blog {
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
  readTime?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type BlogFormData = Omit<Blog, "id" | "createdAt" | "updatedAt">;
