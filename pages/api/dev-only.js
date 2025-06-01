import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export default async function handler(req, res) {
  // Only allow in development mode
  if (process.env.NODE_ENV !== 'development') {
    return res.status(403).json({ message: 'This API is only available in development mode' });
  }

  const { action } = req.body;

  switch (action) {
    case 'createPost':
      return handleCreatePost(req, res);
    case 'createAlbum':
      return handleCreateAlbum(req, res);
    default:
      return res.status(400).json({ message: 'Invalid action' });
  }
}

async function handleCreatePost(req, res) {
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

    // Regenerate search content
    const generateSearchContentPath = path.join(process.cwd(), 'lib/generate-search-content.js');
    require(generateSearchContentPath);

    return res.status(200).json({ message: 'Post created successfully' });
  } catch (error) {
    console.error('Error creating post:', error);
    return res.status(500).json({ message: `Error creating post: ${error.message}` });
  }
}

async function handleCreateAlbum(req, res) {
  try {
    const { title, description, slug, photos } = req.body;

    // Validate required fields
    if (!title || !slug) {
      return res.status(400).json({ message: 'Title and slug are required' });
    }

    // Create the albums directory if it doesn't exist
    const albumsDirectory = path.join(process.cwd(), 'content/albums');
    if (!fs.existsSync(albumsDirectory)) {
      fs.mkdirSync(albumsDirectory, { recursive: true });
    }

    // Check if file already exists
    const filePath = path.join(albumsDirectory, `${slug}.json`);
    if (fs.existsSync(filePath)) {
      return res.status(409).json({ message: 'An album with this slug already exists' });
    }

    // Create the album data
    const albumData = {
      title,
      description: description || '',
      photos: photos || [],
    };

    // Write the album JSON file
    fs.writeFileSync(filePath, JSON.stringify(albumData, null, 2));

    // Create the photos directory for this album if it doesn't exist
    const albumPhotosDir = path.join(process.cwd(), 'public/images/photos', slug);
    if (!fs.existsSync(albumPhotosDir)) {
      fs.mkdirSync(albumPhotosDir, { recursive: true });
    }

    // Regenerate search content
    const generateSearchContentPath = path.join(process.cwd(), 'lib/generate-search-content.js');
    require(generateSearchContentPath);

    return res.status(200).json({ message: 'Album created successfully' });
  } catch (error) {
    console.error('Error creating album:', error);
    return res.status(500).json({ message: `Error creating album: ${error.message}` });
  }
}
