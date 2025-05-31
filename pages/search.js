import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { searchAllContent } from '../lib/search';

export default function SearchResults() {
  const router = useRouter();
  const { q } = router.query;
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchResults() {
      if (q) {
        setLoading(true);
        const searchResults = await searchAllContent(q);
        setResults(searchResults);
        setLoading(false);
      }
    }

    fetchResults();
  }, [q]);

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
    <div>
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
                 type === 'photo' ? 'Photos' : 'Art Items'}
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
