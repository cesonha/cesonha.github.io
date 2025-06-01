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
    const albumsDirectory = path.join(process.cwd(), 'content/albums');
    
    // Check if directory exists
    if (!fs.existsSync(albumsDirectory)) {
      return res.status(200).json({ success: true, albums: [] });
    }
    
    const fileNames = fs.readdirSync(albumsDirectory);
    const allAlbums = fileNames
      .filter(fileName => fileName.endsWith('.json'))
      .map(fileName => {
        const id = fileName.replace(/\.json$/, '');
        const fullPath = path.join(albumsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        
        try {
          const albumData = JSON.parse(fileContents);
          return {
            id,
            ...albumData
          };
        } catch (e) {
          console.error(`Error parsing album ${id}:`, e);
          return {
            id,
            title: `Error: Could not parse ${id}`,
            description: 'Invalid JSON format'
          };
        }
      });
    
    return res.status(200).json({ success: true, albums: allAlbums });
  } catch (error) {
    console.error('Error getting albums:', error);
    return res.status(500).json({ success: false, message: `Error getting albums: ${error.message}` });
  }
}
