import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function AdminDashboard() {
  const [isDevMode, setIsDevMode] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if we're in development mode
    setIsDevMode(process.env.NODE_ENV === 'development');
    
    // Redirect to home if not in development mode
    if (process.env.NODE_ENV !== 'development') {
      router.push('/');
    }
  }, [router]);

  if (!isDevMode) {
    return <div>Loading...</div>; // This will show briefly before redirect
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-red-400">Admin Dashboard</h1>
      <p className="text-gray-300 mb-8">This dashboard is only available in development mode.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/admin/blog" legacyBehavior>
          <a className="p-6 bg-gray-800 border border-gray-700 rounded-lg hover:border-red-400 transition-colors cursor-pointer block">
            <h2 className="text-xl font-bold mb-2 text-red-400">Blog Posts</h2>
            <p className="text-gray-400">Create and manage blog posts</p>
          </a>
        </Link>
        
        <Link href="/admin/photos" legacyBehavior>
          <a className="p-6 bg-gray-800 border border-gray-700 rounded-lg hover:border-red-400 transition-colors cursor-pointer block">
            <h2 className="text-xl font-bold mb-2 text-red-400">Photo Albums</h2>
            <p className="text-gray-400">Create and manage photo albums</p>
          </a>
        </Link>
      </div>
    </div>
  );
}
