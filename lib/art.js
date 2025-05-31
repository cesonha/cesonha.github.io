import fs from 'fs';
import path from 'path';

const artDirectory = path.join(process.cwd(), 'content/art');

export function getArtItems(category) {
  // Ensure the directory exists
  const categoryPath = path.join(artDirectory, category);
  if (!fs.existsSync(categoryPath)) {
    return [];
  }
  
  // Read the JSON file for the category
  const filePath = path.join(categoryPath, 'items.json');
  if (!fs.existsSync(filePath)) {
    return [];
  }
  
  const fileContents = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(fileContents);
}

export function getAllArtCategories() {
  // Ensure the directory exists
  if (!fs.existsSync(artDirectory)) {
    return [];
  }
  
  const directories = fs.readdirSync(artDirectory, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
  
  return directories;
}
