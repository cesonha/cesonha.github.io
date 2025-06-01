import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { fuzzyMatch } from '../lib/search';
import { getAllPosts } from '../lib/posts';
import { getAllAlbums } from '../lib/photos';

export default function SearchResults({ allContent }) {
  const router = useRouter();
  const { q } = router.query;
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    function performSearch() {
      if (!q || !allContent || !Array.isArray(allContent)) {
        setResults([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      
      const searchResults = [];
      
      // Search through all content
      allContent.forEach(item => {
        const titleMatch = fuzzyMatch(item.title, q);
        const contentMatch = item.content && fuzzyMatch(item.content, q) || 
                            item.excerpt && fuzzyMatch(item.excerpt, q) ||
                            item.description && fuzzyMatch(item.description, q);
        const tagsMatch = item.tags && item.tags.some(tag => fuzzyMatch(tag, q));
        
        if (titleMatch || contentMatch || tagsMatch) {
          searchResults.push({
            ...item,
            matchType: titleMatch ? 'title' : 
                      contentMatch ? 'content' : 'tag'
          });
        }
      });
      
      setResults(searchResults);
      setLoading(false);
    }

    performSearch();
  }, [q, allContent]);

  // Group results by type
  const groupedResults = results.reduce((acc, result) => {
    const type = result.type;
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(result);
    return acc;
  }, {});

  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold mb-2 text-red-400">Search Results</h1>
      <p className="text-gray-300 mb-6">
        {q ? `Showing results for "${q}"` : 'Enter a search term to find content'}
      </p>

      {loading ? (
        <p className="text-gray-300">Loading results...</p>
      ) : results.length === 0 ? (
        <div className="bg-dark-card rounded p-6 border border-gray-800">
          <p className="text-gray-300">No results found for "{q}".</p>
          <p className="text-gray-400 mt-2">Try a different search term or browse the site using the navigation menu.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {Object.entries(groupedResults).map(([type, typeResults]) => (
            <div key={type} className="bg-dark-card rounded p-6 border border-gray-800">
              <h2 className="text-xl font-semibold mb-4 text-orange-300 capitalize">
                {type === 'blog' ? 'Blog Posts' : 
                 type === 'album' ? 'Photo Albums' : 
                 type === 'photo' ? 'Photos' : 
                 type === 'links' ? 'Links' : 'Items'}
                <span className="text-gray-400 text-sm ml-2">({typeResults.length})</span>
              </h2>
              
              <div className="space-y-4">
                {typeResults.map(result => (
                  <div key={result.id} className="border-t border-gray-700 pt-4">
                    <h3 className="text-lg font-medium">
                      <Link href={result.url} className="text-red-300 hover:text-red-200 transition-colors">
                        {result.title}
                      </Link>
                    </h3>
                    {result.excerpt && (
                      <p className="text-gray-300 mt-1">{result.excerpt.length > 150 
                        ? `${result.excerpt.substring(0, 150)}...` 
                        : result.excerpt}
                      </p>
                    )}
                    <p className="text-gray-400 text-sm mt-2">
                      Match found in: <span className="text-red-400 capitalize">{result.matchType}</span>
                      {result.category && <span> | Category: {result.category}</span>}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Pre-fetch all content at build time
export async function getStaticProps() {
  // Get blog posts
  const posts = getAllPosts().map(post => ({
    id: post.id,
    title: post.title,
    excerpt: post.excerpt || '',
    content: post.content,
    tags: post.tags,
    type: 'blog',
    url: `/blog/${post.id}`
  }));

  // Get photo albums
  const albums = getAllAlbums();
  
  const photoContent = [];
  
  // Add albums
  albums.forEach(album => {
    photoContent.push({
      id: album.id,
      title: album.title,
      description: album.description || '',
      type: 'album',
      url: `/photos/${album.id}`
    });
    
    // Add photos from albums
    if (album.photos) {
      album.photos.forEach((photo, index) => {
        if (photo.caption) {
          photoContent.push({
            id: `${album.id}-photo-${index}`,
            title: `Photo in ${album.title}`,
            excerpt: photo.caption,
            type: 'photo',
            url: `/photos/${album.id}`
          });
        }
      });
    }
  });

  // Get art content
  const artContent = [];
  
  // Music items
  try {
    const musicItems = require('../content/art/music/items.json');
    musicItems.forEach((item, index) => {
      artContent.push({
        id: `music-item-${index}`,
        title: item.title,
        description: item.description,
        type: 'art',
        category: 'music',
        url: '/art/music'
      });
    });
  } catch (e) {
    // Music items not available
  }
      
  // Illustration items
  try {
    const illustrationItems = require('../content/art/illustration/items.json');
    illustrationItems.forEach((item, index) => {
      artContent.push({
        id: `illustration-item-${index}`,
        title: item.title,
        description: item.description,
        type: 'art',
        category: 'illustration',
        url: '/art/illustration'
      });
    });
  } catch (e) {
    // Illustration items not available
  }
      
  // Objects items
  try {
    const objectItems = require('../content/art/objects/items.json');
    objectItems.forEach((item, index) => {
      artContent.push({
        id: `objects-item-${index}`,
        title: item.title,
        description: item.description,
        type: 'art',
        category: 'objects',
        url: '/art/objects'
      });
    });
  } catch (e) {
    // Object items not available
  }

  // Combine all content
  const allContent = [...posts, ...photoContent, ...artContent];

  return {
    props: {
      allContent
    }
  };
}
