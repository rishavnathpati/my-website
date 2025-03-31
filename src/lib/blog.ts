import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Define the structure of blog post metadata
export interface BlogPostMeta {
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  imageUrl: string;
  readTimeMinutes?: number;
  slug: string;
  externalUrl?: string;
}

// Define structure for full post data including content
export interface BlogPost extends BlogPostMeta {
  content: string;
}

const postsDirectory = path.join(process.cwd(), 'src/content/blogs');

// Function to get metadata for all posts, sorted by date
export function getSortedPostsData(): BlogPostMeta[] {
  try {
    const fileNames = fs.readdirSync(postsDirectory).filter(name => name.endsWith('.mdx'));

    const allPostsData = fileNames.map((fileName): BlogPostMeta => {
      const slug = fileName.replace(/\.mdx$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const matterResult = matter(fileContents);

      return {
        slug,
        title: matterResult.data.title as string,
        date: matterResult.data.date as string,
        excerpt: matterResult.data.excerpt as string,
        tags: matterResult.data.tags as string[],
        imageUrl: matterResult.data.imageUrl as string,
        readTimeMinutes: matterResult.data.readTimeMinutes as number | undefined,
        externalUrl: matterResult.data.externalUrl as string | undefined,
      };
    });

    return allPostsData.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  } catch (error) {
    console.error("Error reading blog posts:", error);
    return [];
  }
}

// Function to get all possible slugs for static generation
export function getAllPostSlugs(): { params: { slug: string } }[] {
  try {
    const fileNames = fs.readdirSync(postsDirectory).filter(name => name.endsWith('.mdx'));
    return fileNames.map(fileName => ({
      params: {
        slug: fileName.replace(/\.mdx$/, '')
      }
    }));
  } catch (error) {
    console.error("Error getting post slugs:", error);
    return [];
  }
}

// Function to get specific post data by slug
export async function getPostData(slug: string): Promise<BlogPost | null> {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);

  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    const postData: BlogPost = {
      slug,
      title: matterResult.data.title as string,
      date: matterResult.data.date as string,
      excerpt: matterResult.data.excerpt as string,
      tags: matterResult.data.tags as string[],
      imageUrl: matterResult.data.imageUrl as string,
      readTimeMinutes: matterResult.data.readTimeMinutes as number | undefined,
      externalUrl: matterResult.data.externalUrl as string | undefined,
      content: matterResult.content,
    };

    return postData;
  } catch (error) {
    console.error(`Error reading blog post ${slug}:`, error);
    return null;
  }
} 