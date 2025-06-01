import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Only allow in development mode
  if (process.env.NODE_ENV !== 'development') {
    return res.status(403).json({ message: 'This API is only available in development mode' });
  }

  try {
    const { title, content, excerpt, tags, slug } = req.body;

    // Validate required fields
    if (!title || !content || !slug) {
      return res.status(400).json({ message: 'Title, content, and slug are required' });
    }

    // Create the posts directory if it doesn't exist
    const postsDirectory = path.join(process.cwd(), 'content/posts');
    if (!fs.existsSync(postsDirectory)) {
      fs.mkdirSync(postsDirectory, { recursive: true });
    }

    // Check if file already exists
    const filePath = path.join(postsDirectory, `${slug}.md`);
    if (fs.existsSync(filePath)) {
      return res.status(409).json({ message: 'A post with this slug already exists' });
    }

    // Create frontmatter
    const frontmatter = {
      title,
      date: new Date().toISOString(),
      excerpt: excerpt || '',
      tags: tags || [],
    };

    // Create the markdown file with frontmatter
    const fileContent = matter.stringify(content, frontmatter);
    fs.writeFileSync(filePath, fileContent);

    // Generate preview
    const preview = `---\n${Object.entries(frontmatter)
      .map(([key, value]) => {
        if (Array.isArray(value)) {
          return `${key}: ${JSON.stringify(value)}`;
        }
        return `${key}: "${value}"`;
      })
      .join('\n')}
---

${content}`;

    // Try to regenerate search content
    try {
      const { default: generateSearchContent } = require('../../../lib/generate-search-content');
      generateSearchContent();
    } catch (error) {
      console.error('Error generating search content:', error);
    }

    return res.status(200).json({ 
      message: 'Post created successfully!',
      preview
    });
  } catch (error) {
    console.error('Error creating post:', error);
    return res.status(500).json({ message: `Error creating post: ${error.message}` });
  }
}
