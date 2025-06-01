import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function createBlogPost(postData) {
  try {
    const { title, content, excerpt, tags, slug } = postData;

    // Validate required fields
    if (!title || !content || !slug) {
      throw new Error('Title, content, and slug are required');
    }

    // Create the posts directory if it doesn't exist
    const postsDirectory = path.join(process.cwd(), 'content/posts');
    if (!fs.existsSync(postsDirectory)) {
      fs.mkdirSync(postsDirectory, { recursive: true });
    }

    // Check if file already exists
    const filePath = path.join(postsDirectory, `${slug}.md`);
    if (fs.existsSync(filePath)) {
      throw new Error('A post with this slug already exists');
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
    const { default: generateSearchContent } = await import('../lib/generate-search-content');
    generateSearchContent();

    return { success: true, message: 'Post created successfully' };
  } catch (error) {
    console.error('Error creating post:', error);
    return { success: false, message: `Error creating post: ${error.message}` };
  }
}

export async function createPhotoAlbum(albumData) {
  try {
    const { title, description, slug, photos } = albumData;

    // Validate required fields
    if (!title || !slug) {
      throw new Error('Title and slug are required');
    }

    // Create the albums directory if it doesn't exist
    const albumsDirectory = path.join(process.cwd(), 'content/albums');
    if (!fs.existsSync(albumsDirectory)) {
      fs.mkdirSync(albumsDirectory, { recursive: true });
    }

    // Check if file already exists
    const filePath = path.join(albumsDirectory, `${slug}.json`);
    if (fs.existsSync(filePath)) {
      throw new Error('An album with this slug already exists');
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
    const { default: generateSearchContent } = await import('../lib/generate-search-content');
    generateSearchContent();

    return { success: true, message: 'Album created successfully' };
  } catch (error) {
    console.error('Error creating album:', error);
    return { success: false, message: `Error creating album: ${error.message}` };
  }
}
