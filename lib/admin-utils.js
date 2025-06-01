// Admin utilities for development mode
// Uses API routes in development mode

export async function createBlogPost(postData) {
  try {
    const { title, content, excerpt, tags, slug } = postData;

    // Validate required fields
    if (!title || !content || !slug) {
      throw new Error('Title, content, and slug are required');
    }

    // Send to API route
    const response = await fetch('/api/admin/create-post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        content,
        excerpt,
        tags,
        slug,
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to create post');
    }

    return { 
      success: true, 
      message: data.message || 'Post created successfully!',
      preview: data.preview
    };
  } catch (error) {
    console.error('Error creating post:', error);
    return { success: false, message: `Error creating post: ${error.message}` };
  }
}

export async function createPhotoAlbum(albumData) {
  try {
    const { title, description, slug, photos, isEdit = false } = albumData;

    // Validate required fields
    if (!title || !slug) {
      throw new Error('Title and slug are required');
    }

    // Send to API route
    const response = await fetch('/api/admin/create-album', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description,
        slug,
        photos,
        isEdit,
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to create album');
    }

    return { 
      success: true, 
      message: data.message || `Album ${isEdit ? 'updated' : 'created'} successfully!`,
      preview: data.preview
    };
  } catch (error) {
    console.error('Error with photo album:', error);
    return { 
      success: false, 
      message: `Error ${albumData.isEdit ? 'updating' : 'creating'} album: ${error.message}` 
    };
  }
}
