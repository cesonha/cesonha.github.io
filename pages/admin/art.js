import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function ArtAdmin() {
  const [isDevMode, setIsDevMode] = useState(false);
  const router = useRouter();
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Check if we're in development mode
    setIsDevMode(process.env.NODE_ENV === 'development');
    
    // Redirect to home if not in development mode
    if (process.env.NODE_ENV !== 'development') {
      router.push('/');
    }
  }, [router]);

  if (!isDevMode) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-primary-light">Art Admin</h1>
        <Link href="/admin" legacyBehavior>
          <a className="text-primary-light hover:text-primary-hover cursor-pointer">Back to Dashboard</a>
        </Link>
      </div>

      {message && (
        <div className={`p-4 mb-6 rounded ${message.includes('Error') ? 'bg-red-900/50 text-red-200' : 'bg-green-900/50 text-green-200'}`}>
          {message}
        </div>
      )}

      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-bold mb-4 text-primary-light">Art Categories</h2>
        <p className="text-text-secondary mb-4">
          The art section is organized into categories. Each category has its own page and items.
        </p>
        <p className="text-text-secondary mb-4">
          Currently, the following categories are available:
        </p>
        <ul className="list-disc pl-5 text-text-secondary mb-4">
          <li>Music (/art/music)</li>
          <li>Illustration (/art/illustration)</li>
          <li>Objects (/art/objects)</li>
        </ul>
        <p className="text-text-secondary">
          To add or edit items, modify the corresponding JSON files in the content/art/[category]/items.json files.
        </p>
      </div>

      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-primary-light">Coming Soon</h2>
        <p className="text-text-secondary">
          A visual editor for art items will be added in a future update.
        </p>
      </div>
    </div>
  );
}
