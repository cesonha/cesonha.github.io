import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Only allow in development mode
  if (process.env.NODE_ENV !== 'development') {
    return res.status(403).json({ message: 'This API is only available in development mode' });
  }

  try {
    const { id } = req.query;
    
    if (!id) {
      return res.status(400).json({ success: false, message: 'Album ID is required' });
    }
    
    const albumsDirectory = path.join(process.cwd(), 'content/albums');
    const fullPath = path.join(albumsDirectory, `${id}.json`);
    
    if (!fs.existsSync(fullPath)) {
      return res.status(404).json({ success: false, message: 'Album not found' });
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    
    try {
      const albumData = JSON.parse(fileContents);
      return res.status(200).json({ 
        success: true, 
        album: {
          id,
          ...albumData
        }
      });
    } catch (e) {
      return res.status(500).json({ success: false, message: 'Invalid album data format' });
    }
  } catch (error) {
    console.error('Error getting album:', error);
    return res.status(500).json({ success: false, message: `Error getting album: ${error.message}` });
  }
}
