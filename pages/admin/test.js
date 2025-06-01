import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminTest() {
  const [isDevMode, setIsDevMode] = useState(false);
  
  useEffect(() => {
    // Check if we're in development mode
    setIsDevMode(process.env.NODE_ENV === 'development');
    console.log('Current NODE_ENV:', process.env.NODE_ENV);
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-primary-light">Admin Test Page</h1>
      <p className="text-text-secondary mb-8">
        This is a simple test page to verify admin pages are being compiled correctly.
      </p>
      <p className="text-text-secondary mb-8">
        Current environment: <strong>{isDevMode ? 'Development' : 'Production'}</strong>
      </p>
      <Link href="/admin" legacyBehavior>
        <a className="text-primary-light hover:text-primary-hover cursor-pointer">Back to Admin Dashboard</a>
      </Link>
    </div>
  );
}
