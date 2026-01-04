import { BlogPost } from '../types';
import { BLOG_POSTS } from '../constants';

const STORAGE_KEY = 'portfolio_blog_posts';

export const generateBlogId = (): string => {
  return `b${Date.now()}`;
};

export const getBlogPosts = (): BlogPost[] => {
  if (typeof window === 'undefined') {
    return BLOG_POSTS;
  }

  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return BLOG_POSTS;
    }
  }

  // First time: initialize with default posts
  localStorage.setItem(STORAGE_KEY, JSON.stringify(BLOG_POSTS));
  return BLOG_POSTS;
};

export const saveBlogPost = (post: BlogPost): void => {
  const posts = getBlogPosts();
  const existingIndex = posts.findIndex(p => p.id === post.id);

  if (existingIndex >= 0) {
    posts[existingIndex] = post;
  } else {
    posts.unshift(post); // Add new posts at the beginning
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
};

export const deleteBlogPost = (id: string): void => {
  const posts = getBlogPosts();
  const filtered = posts.filter(p => p.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
};

export const reorderBlogPosts = (posts: BlogPost[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
};
