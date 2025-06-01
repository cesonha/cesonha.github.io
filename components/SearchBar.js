import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { fuzzyMatch } from '../lib/search';

export default function SearchBar({ allContent }) {
  const [query, setQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState([]);
  const router = useRouter();
  const searchRef = useRef(null);

  // Handle click outside to close results
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Search as user types
  useEffect(() => {
    if (!query.trim() || !allContent || !Array.isArray(allContent) || allContent.length === 0) {
      setResults([]);
      return;
    }

    const searchResults = [];
    
    // Search through all content
    allContent.forEach(item => {
      const titleMatch = fuzzyMatch(item.title, query);
      const contentMatch = (item.content && fuzzyMatch(item.content, query)) || 
                          (item.excerpt && fuzzyMatch(item.excerpt, query)) ||
                          (item.description && fuzzyMatch(item.description, query));
      const tagsMatch = item.tags && item.tags.some(tag => fuzzyMatch(tag, query));
      
      if (titleMatch || contentMatch || tagsMatch) {
        searchResults.push({
          ...item,
          matchType: titleMatch ? 'title' : contentMatch ? 'content' : 'tag'
        });
      }
    });
    
    // Limit to first 3 results for preview
    setResults(searchResults.slice(0, 3));
  }, [query, allContent]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      setShowResults(false);
    }
  };

  return (
    <div className="relative w-full md:w-auto" ref={searchRef}>
      <form onSubmit={handleSearch} className="flex items-center">
        <div className="relative flex items-center w-full">
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowResults(e.target.value.trim() !== '');
            }}
            onFocus={() => query.trim() !== '' && setShowResults(true)}
            placeholder="Search..."
            className="bg-dark-card border border-dark-border rounded-full pl-10 pr-4 py-1.5 text-sm focus:outline-none focus:border-primary-light text-text-primary w-full md:w-56 transition-all"
          />
          <div className="absolute left-3 text-text-muted">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <button
            type="submit"
            className="absolute right-2 text-text-muted hover:text-primary-light transition-colors"
            aria-label="Search"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </form>
      
      {/* Floating results preview */}
      {showResults && results.length > 0 && (
        <div className="absolute right-0 left-0 md:left-auto mt-2 w-full md:w-72 bg-dark-card rounded-md shadow-lg border border-dark-border overflow-hidden z-50">
          <div className="p-2">
            {results.map((result, index) => (
              <Link 
                href={result.url} 
                key={result.id}
                onClick={() => setShowResults(false)}
                className="block px-3 py-2 hover:bg-dark-lighter rounded transition-colors"
              >
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-medium text-text-primary truncate max-w-[180px]">{result.title}</h4>
                  <span className="text-xs px-2 py-1 rounded-full bg-dark-lighter text-primary-light">
                    {result.type === 'blog' ? 'Blog' : 
                     result.type === 'album' ? 'Album' : 
                     result.type === 'photo' ? 'Photo' : 'Art'}
                  </span>
                </div>
              </Link>
            ))}
            
            {/* View all results link */}
            <div className="border-t border-dark-border mt-1 pt-1">
              <button 
                onClick={handleSearch}
                className="w-full text-center text-xs text-primary-light hover:text-primary-hover py-2"
              >
                View all results →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
