import fs from 'fs';
import path from 'path';

const albumsDirectory = path.join(process.cwd(), 'content/albums');

export function getAllAlbums() {
  // Ensure the directory exists
  if (!fs.existsSync(albumsDirectory)) {
    return [];
  }
  
  const fileNames = fs.readdirSync(albumsDirectory);
  const allAlbums = fileNames
    .filter(fileName => fileName.endsWith('.json'))
    .map(fileName => {
      // Remove ".json" from file name to get id
      const id = fileName.replace(/\.json$/, '');
      
      // Read JSON file
      const fullPath = path.join(albumsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const albumData = JSON.parse(fileContents);
      
      return {
        id,
        ...albumData
      };
    });
  
  return allAlbums;
}

export function getAlbumById(id) {
  const fullPath = path.join(albumsDirectory, `${id}.json`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  
  return {
    id,
    ...JSON.parse(fileContents)
  };
}

export function getAlbumIds() {
  if (!fs.existsSync(albumsDirectory)) {
    return [];
  }
  
  const fileNames = fs.readdirSync(albumsDirectory);
  
  return fileNames
    .filter(fileName => fileName.endsWith('.json'))
    .map(fileName => {
      return {
        params: {
          id: fileName.replace(/\.json$/, '')
        }
      };
    });
}
