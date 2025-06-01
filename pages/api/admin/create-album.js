import fs from 'fs';
import path from 'path';

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
    const { title, description, slug, photos, isEdit } = req.body;

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
    if (fs.existsSync(filePath) && !isEdit) {
      return res.status(409).json({ message: 'An album with this slug already exists' });
    }

    // Create the album data
    const albumData = {
      title,
      description: description || '',
      coverImage: photos && photos.length > 0 ? photos[0].src : '',
      photos: photos || [],
    };

    // Write the album JSON file
    fs.writeFileSync(filePath, JSON.stringify(albumData, null, 2));

    // Create the photos directory for this album if it doesn't exist
    const albumPhotosDir = path.join(process.cwd(), 'public/images/photos', slug);
    if (!fs.existsSync(albumPhotosDir)) {
      fs.mkdirSync(albumPhotosDir, { recursive: true });
    }

    // Try to regenerate search content
    try {
      const { default: generateSearchContent } = require('../../../lib/generate-search-content');
      generateSearchContent();
    } catch (error) {
      console.error('Error generating search content:', error);
    }

    return res.status(200).json({ 
      message: `Album ${isEdit ? 'updated' : 'created'} successfully!`,
      preview: JSON.stringify(albumData, null, 2)
    });
  } catch (error) {
    console.error('Error with album:', error);
    return res.status(500).json({ message: `Error ${req.body.isEdit ? 'updating' : 'creating'} album: ${error.message}` });
  }
}
