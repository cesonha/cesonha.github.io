import { useState } from 'react';
import { useRouter } from 'next/router';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="relative">
      {isExpanded ? (
        <form onSubmit={handleSearch} className="flex items-center">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
            className="bg-dark-lighter border border-gray-700 rounded-l px-3 py-1 text-sm focus:outline-none focus:border-red-400 text-white w-48"
            autoFocus
          />
          <button
            type="submit"
            className="bg-red-500 hover:bg-red-600 text-white rounded-r px-3 py-1 text-sm"
          >
            Search
          </button>
          <button
            type="button"
            onClick={() => setIsExpanded(false)}
            className="ml-2 text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </form>
      ) : (
        <button
          onClick={() => setIsExpanded(true)}
          className="text-gray-300 hover:text-white"
          aria-label="Search"
        >
          🔍
        </button>
      )}
    </div>
  );
}
