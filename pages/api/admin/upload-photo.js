import fs from 'fs';
import path from 'path';
import formidable from 'formidable';

export const config = {
  api: {
    bodyParser: false,
  },
};

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
    const { albumSlug } = req.query;
    
    if (!albumSlug) {
      return res.status(400).json({ success: false, message: 'Album slug is required' });
    }

    // Create the photos directory for this album if it doesn't exist
    const albumPhotosDir = path.join(process.cwd(), 'public/images/photos', albumSlug);
    if (!fs.existsSync(albumPhotosDir)) {
      fs.mkdirSync(albumPhotosDir, { recursive: true });
    }

    const form = new formidable.IncomingForm();
    
    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(500).json({ success: false, message: `Error parsing form: ${err.message}` });
      }
      
      const file = files.file;
      
      if (!file) {
        return res.status(400).json({ success: false, message: 'No file uploaded' });
      }
      
      // Generate a unique filename
      const fileExt = path.extname(file.originalFilename || 'image.jpg');
      const fileName = `photo-${Date.now()}${fileExt}`;
      const destPath = path.join(albumPhotosDir, fileName);
      
      // Copy the file to the destination
      const data = fs.readFileSync(file.filepath);
      fs.writeFileSync(destPath, data);
      
      // Clean up the temp file
      fs.unlinkSync(file.filepath);
      
      // Return the relative path for use in the photo album
      const relativePath = `/images/photos/${albumSlug}/${fileName}`;
      
      return res.status(200).json({ 
        success: true, 
        message: 'Photo uploaded successfully',
        photoPath: relativePath
      });
    });
  } catch (error) {
    console.error('Error uploading photo:', error);
    return res.status(500).json({ success: false, message: `Error uploading photo: ${error.message}` });
  }
}
