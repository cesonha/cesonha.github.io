import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getAllPosts } from '../lib/posts';
import { getAllAlbums } from '../lib/photos';
import { getAllLinkCategories, getLinkItems } from '../lib/links';

export default function Home({ latestPost, featuredAlbums, randomLinkItem }) {
  return (
    <div className="w-full">
      <h1 className="text-4xl font-bold mb-8 text-primary-light">Welcome</h1>
      
      {/* Latest Blog Post Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-primary-light">Latest from the Blog</h2>
        {latestPost ? (
          <div className="bg-dark-card p-6 rounded-lg border border-dark-border hover:border-primary-light transition-colors">
            <Link href={`/blog/${latestPost.id}`}>
              <div className="cursor-pointer">
                <h3 className="text-xl font-semibold mb-2 text-primary-lighter">{latestPost.title}</h3>
                <p className="text-text-muted mb-2">{new Date(latestPost.date).toLocaleDateString()}</p>
                <p className="text-text-secondary">{latestPost.excerpt}</p>
                <p className="mt-4 text-primary-light hover:text-primary-hover">Read more →</p>
              </div>
            </Link>
          </div>
        ) : (
          <p className="text-text-muted">No blog posts yet.</p>
        )}
      </section>
      
      {/* Photo Albums Carousel */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-primary-light">Photo Collections</h2>
        <div className="relative">
          <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
            {featuredAlbums.length > 0 ? (
              featuredAlbums.map(album => (
                <div key={album.id} className="flex-none w-64">
                  <Link href={`/photos/${album.id}`}>
                    <div className="cursor-pointer bg-dark-card rounded-lg overflow-hidden border border-dark-border hover:border-primary-light transition-colors h-full">
                      {album.photos && album.photos[0] && (
                        <div className="h-40 overflow-hidden">
                          <img 
                            src={album.photos[0].src} 
                            alt={album.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-primary-lighter">{album.title}</h3>
                        <p className="text-text-muted text-sm mt-1 line-clamp-2">{album.description}</p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <p className="text-text-muted">No photo albums yet.</p>
            )}
          </div>
        </div>
        <div className="mt-4">
          <Link href="/photos">
            <span className="text-primary-light hover:text-primary-hover cursor-pointer">View all albums →</span>
          </Link>
        </div>
      </section>
      
      {/* Random Link Recommendation */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-primary-light">Check This Out</h2>
        {randomLinkItem ? (
          <div className="bg-dark-card p-6 rounded-lg border border-dark-border hover:border-primary-light transition-colors">
            <div className="flex flex-col md:flex-row gap-6">
              {randomLinkItem.image && (
                <div className="md:w-1/3">
                  <img 
                    src={randomLinkItem.image} 
                    alt={randomLinkItem.title}
                    className="w-full h-48 object-cover rounded"
                  />
                </div>
              )}
              <div className="md:w-2/3">
                <h3 className="text-xl font-semibold mb-2 text-primary-lighter">
                  <a href={randomLinkItem.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    {randomLinkItem.title}
                  </a>
                </h3>
                <p className="text-text-muted mb-2">From {randomLinkItem.category} collection</p>
                <p className="text-text-secondary">{randomLinkItem.description}</p>
                <Link href={`/links/${randomLinkItem.categorySlug}`}>
                  <p className="mt-4 text-primary-light hover:text-primary-hover cursor-pointer">See more like this →</p>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-text-muted">No link items available.</p>
        )}
      </section>
    </div>
  );
}

export async function getStaticProps() {
  // Get latest blog post
  const allPosts = getAllPosts();
  const latestPost = allPosts.length > 0 ? allPosts[0] : null;
  
  // Get featured albums (up to 5)
  const allAlbums = getAllAlbums();
  const featuredAlbums = allAlbums.slice(0, 5);
  
  // Get random link item
  const linkCategories = getAllLinkCategories();
  let randomLinkItem = null;
  
  if (linkCategories.length > 0) {
    // Pick a random category
    const randomCategory = linkCategories[Math.floor(Math.random() * linkCategories.length)];
    const categoryItems = getLinkItems(randomCategory);
    
    if (categoryItems.length > 0) {
      // Pick a random item from the category
      const randomItem = categoryItems[Math.floor(Math.random() * categoryItems.length)];
      randomLinkItem = {
        ...randomItem,
        category: randomCategory.charAt(0).toUpperCase() + randomCategory.slice(1),
        categorySlug: randomCategory
      };
    }
  }
  
  return {
    props: {
      latestPost,
      featuredAlbums,
      randomLinkItem
    }
  };
}
