import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { createBlogPost } from '../../lib/admin-utils';

export default function BlogAdmin() {
  const [isDevMode, setIsDevMode] = useState(false);
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [tags, setTags] = useState('');
  const [slug, setSlug] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if we're in development mode
    setIsDevMode(process.env.NODE_ENV === 'development');
    
    // Redirect to home if not in development mode
    if (process.env.NODE_ENV !== 'development') {
      router.push('/');
    }
  }, [router]);

  // Generate slug from title
  useEffect(() => {
    if (title) {
      setSlug(title.toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-'));
    }
  }, [title]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const result = await createBlogPost({
        title,
        content,
        excerpt,
        tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        slug,
      });
      
      if (result.success) {
        setMessage(result.message);
        // Don't clear the form in development mode so users can see what they created
        
        // Display preview in console
        console.log('Preview of created content:', result.preview);
      } else {
        setMessage(`Error: ${result.message}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isDevMode) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-primary-light">Create Blog Post</h1>
        <Link href="/admin" legacyBehavior>
          <a className="text-primary-light hover:text-primary-hover cursor-pointer">Back to Dashboard</a>
        </Link>
      </div>

      {message && (
        <div className={`p-4 mb-6 rounded ${message.includes('Error') ? 'bg-red-900/50 text-red-200' : 'bg-green-900/50 text-green-200'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-text-secondary mb-2">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 bg-dark-card border border-dark-border rounded text-text-primary"
            required
          />
        </div>

        <div>
          <label htmlFor="slug" className="block text-text-secondary mb-2">Slug (file name)</label>
          <input
            type="text"
            id="slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="w-full p-2 bg-dark-card border border-dark-border rounded text-text-primary"
            required
          />
        </div>

        <div>
          <label htmlFor="excerpt" className="block text-text-secondary mb-2">Excerpt</label>
          <textarea
            id="excerpt"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            className="w-full p-2 bg-dark-card border border-dark-border rounded text-text-primary h-20"
          />
        </div>

        <div>
          <label htmlFor="tags" className="block text-text-secondary mb-2">Tags (comma separated)</label>
          <input
            type="text"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full p-2 bg-dark-card border border-dark-border rounded text-text-primary"
            placeholder="tag1, tag2, tag3"
          />
        </div>

        <div>
          <label htmlFor="content" className="block text-text-secondary mb-2">Content (Markdown)</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 bg-dark-card border border-dark-border rounded text-text-primary h-64 font-mono"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 bg-primary text-text-primary rounded hover:bg-primary-hover disabled:opacity-50"
        >
          {isLoading ? 'Creating...' : 'Create Post'}
        </button>
      </form>
    </div>
  );
}
