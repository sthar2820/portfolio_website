
export interface ProjectMedia {
  type: 'image' | 'video';
  url: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  role: string;
  impact: string;
  imageUrl: string;
  isPrimary?: boolean;
  githubUrl?: string;
  websiteUrl?: string;
  details?: string[];
  media?: ProjectMedia[];
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  duration: string;
  description: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  content: string;
  mediaType?: 'image' | 'video';
  mediaUrl?: string;
}
