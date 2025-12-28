
export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  role: string;
  impact: string;
  imageUrl: string;
  isPrimary?: boolean;
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
  mediaType: 'image' | 'video';
  mediaUrl: string;
}
