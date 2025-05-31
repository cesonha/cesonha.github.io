import Head from 'next/head';
import { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ children, title = 'My Personal Website' }) {
  const [searchContent, setSearchContent] = useState([]);
  
  useEffect(() => {
    async function loadSearchContent() {
      try {
        // Fetch the search content data
        const response = await fetch('/search-content.json');
        if (response.ok) {
          const data = await response.json();
          setSearchContent(data);
        } else {
          console.warn('Search content not available, search functionality will be limited');
          setSearchContent([]);
        }
      } catch (error) {
        console.error('Failed to load search content:', error);
        setSearchContent([]);
      }
    }
    
    loadSearchContent();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>{title}</title>
        <meta name="description" content="My personal website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Navbar allContent={searchContent} />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      
      <Footer />
    </div>
  );
}
