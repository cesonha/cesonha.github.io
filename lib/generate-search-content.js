const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Paths
const postsDirectory = path.join(process.cwd(), 'content/posts');
const albumsDirectory = path.join(process.cwd(), 'content/albums');
const linksDirectory = path.join(process.cwd(), 'content/links');
const outputPath = path.join(process.cwd(), 'public/search-content.json');

// Get blog posts
function getAllPosts() {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
      const id = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const matterResult = matter(fileContents);
      
      return {
        id,
        title: matterResult.data.title,
        excerpt: matterResult.data.excerpt || '',
        tags: matterResult.data.tags || [],
        type: 'blog',
        url: `/blog/${id}`
      };
    });
}

// Get photo albums
function getAllAlbums() {
  if (!fs.existsSync(albumsDirectory)) {
    return [];
  }
  
  const fileNames = fs.readdirSync(albumsDirectory);
  const albums = fileNames
    .filter(fileName => fileName.endsWith('.json'))
    .map(fileName => {
      const id = fileName.replace(/\.json$/, '');
      const fullPath = path.join(albumsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const albumData = JSON.parse(fileContents);
      
      return {
        id,
        title: albumData.title,
        description: albumData.description || '',
        type: 'album',
        url: `/photos/${id}`
      };
    });
    
  // Add photos from albums
  const photos = [];
  albums.forEach(album => {
    const fullPath = path.join(albumsDirectory, `${album.id}.json`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const albumData = JSON.parse(fileContents);
    
    if (albumData.photos) {
      albumData.photos.forEach((photo, index) => {
        if (photo.caption) {
          photos.push({
            id: `${album.id}-photo-${index}`,
            title: `Photo in ${albumData.title}`,
            excerpt: photo.caption,
            type: 'photo',
            url: `/photos/${album.id}`
          });
        }
      });
    }
  });
  
  return [...albums, ...photos];
}

// Get links content
function getLinksContent() {
  if (!fs.existsSync(linksDirectory)) {
    return [];
  }
  
  const linksContent = [];
  const categories = fs.readdirSync(linksDirectory, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
  
  categories.forEach(category => {
    const filePath = path.join(linksDirectory, category, 'items.json');
    if (fs.existsSync(filePath)) {
      try {
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const items = JSON.parse(fileContents);
        
        items.forEach((item, index) => {
          linksContent.push({
            id: `${category}-item-${index}`,
            title: item.title,
            description: item.description || '',
            type: 'links',
            category: category,
            url: `/links/${category}`
          });
        });
      } catch (e) {
        console.error(`Error processing ${category} items:`, e);
      }
    }
  });
  
  return linksContent;
}

// Generate the search content file
function generateSearchContent() {
  const posts = getAllPosts();
  const photoContent = getAllAlbums();
  const linksContent = getLinksContent();
  
  const allContent = [...posts, ...photoContent, ...linksContent];
  
  // Ensure the public directory exists
  const publicDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  
  // Write to public directory
  fs.writeFileSync(
    outputPath,
    JSON.stringify(allContent),
    'utf8'
  );
  
  console.log(`Search content generated with ${allContent.length} items`);
}

// Run the generator
generateSearchContent();
