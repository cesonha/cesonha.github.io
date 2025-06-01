import fs from 'fs';
import path from 'path';

const linksDirectory = path.join(process.cwd(), 'content/links');

export function getLinkItems(category) {
  // Ensure the directory exists
  const categoryPath = path.join(linksDirectory, category);
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

export function getAllLinkCategories() {
  // Ensure the directory exists
  if (!fs.existsSync(linksDirectory)) {
    return [];
  }
  
  const directories = fs.readdirSync(linksDirectory, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
  
  return directories;
}
