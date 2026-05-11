import matter from 'gray-matter';
import { BLOG_POSTS } from '../data/blogPosts';

export interface BlogPostFrontmatter {
  title: string;
  slug: string;
  date: string;
  author: string;
  excerpt: string;
  category: string;
  readTime: number;
  featured?: boolean;
  image?: string;
}

export interface BlogPost extends BlogPostFrontmatter {
  content: string;
}

/**
 * Parse markdown with frontmatter into a BlogPost object
 */
export function parseBlogPost(markdown: string): BlogPost {
  const { data, content } = matter(markdown);

  return {
    title: data.title || 'Untitled',
    slug: data.slug || '',
    date: data.date || new Date().toISOString(),
    author: data.author || 'Alabama Onas',
    excerpt: data.excerpt || '',
    category: data.category || 'General',
    readTime: data.readTime || estimateReadTime(content),
    featured: data.featured || false,
    image: data.image || '/images/blog-default.jpg',
    content,
  };
}
/**
 * Get all posts sorted by date
 */
export function getAllPosts(): BlogPost[] {
  return BLOG_POSTS.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}/**
 * Find a single post by its slug
 */
export function getPostBySlug(slug: string): BlogPost | undefined {
  return getAllPosts().find((post) => post.slug === slug);
}/**
 * Get posts filtered by category
 */
export function getPostsByCategory(category: string): BlogPost[] {
  return getAllPosts().filter((post) => post.category === category);
}
/**
 * Estimate read time based on content length (words per minute: 200)
 */
export function estimateReadTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

/**
 * Format date to readable string
 */
export function formatBlogDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return dateString;
  }
}

/**
 * Extract excerpt from content if not provided
 */
export function extractExcerpt(content: string, length: number = 160): string {
  const text = content
    .replace(/^#+\s+/gm, '') // Remove markdown headers
    .replace(/\*\*/g, '') // Remove bold markers
    .replace(/\*/g, '') // Remove italic markers
    .replace(/`/g, '') // Remove code markers
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // Replace markdown links with text
    .trim();

  if (text.length <= length) return text;
  return text.substring(0, length).trim() + '...';
}
