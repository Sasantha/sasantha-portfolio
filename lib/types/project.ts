export type ProjectView = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  stack: string[];
  tags: string[];
  highlights: string[];
  liveUrl: string | null;
  repoUrl: string | null;
  featured?: boolean;
  coverImageUrl?: string | null;
  imageAlt?: string | null;
  category?: string | null;
};

export type ProjectRecord = ProjectView & {
  id: string;
  createdAt: string;
  updatedAt: string;
};
