import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getAllPosts } from '../lib/posts';
import { getAllAlbums } from '../lib/photos';
import { getAllArtCategories, getArtItems } from '../lib/art';

export default function Home({ latestPost, featuredAlbums, randomArtItem }) {
  return (
    <div className="w-full">
      <h1 className="text-4xl font-bold mb-8 text-red-400">Welcome</h1>
      
      {/* Latest Blog Post Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-red-300">Latest from the Blog</h2>
        {latestPost ? (
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-red-400 transition-colors">
            <Link href={`/blog/${latestPost.id}`}>
              <div className="cursor-pointer">
                <h3 className="text-xl font-semibold mb-2 text-red-200">{latestPost.title}</h3>
                <p className="text-gray-400 mb-2">{new Date(latestPost.date).toLocaleDateString()}</p>
                <p className="text-gray-300">{latestPost.excerpt}</p>
                <p className="mt-4 text-red-300 hover:text-red-200">Read more →</p>
              </div>
            </Link>
          </div>
        ) : (
          <p className="text-gray-400">No blog posts yet.</p>
        )}
      </section>
      
      {/* Photo Albums Carousel */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-red-300">Photo Collections</h2>
        <div className="relative">
          <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
            {featuredAlbums.length > 0 ? (
              featuredAlbums.map(album => (
                <div key={album.id} className="flex-none w-64">
                  <Link href={`/photos/${album.id}`}>
                    <div className="cursor-pointer bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-red-400 transition-colors h-full">
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
                        <h3 className="text-lg font-semibold text-red-200">{album.title}</h3>
                        <p className="text-gray-400 text-sm mt-1 line-clamp-2">{album.description}</p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No photo albums yet.</p>
            )}
          </div>
        </div>
        <div className="mt-4">
          <Link href="/photos">
            <span className="text-red-300 hover:text-red-200 cursor-pointer">View all albums →</span>
          </Link>
        </div>
      </section>
      
      {/* Random Art Recommendation */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-red-300">Check This Out</h2>
        {randomArtItem ? (
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-red-400 transition-colors">
            <div className="flex flex-col md:flex-row gap-6">
              {randomArtItem.image && (
                <div className="md:w-1/3">
                  <img 
                    src={randomArtItem.image} 
                    alt={randomArtItem.title}
                    className="w-full h-48 object-cover rounded"
                  />
                </div>
              )}
              <div className="md:w-2/3">
                <h3 className="text-xl font-semibold mb-2 text-red-200">{randomArtItem.title}</h3>
                <p className="text-gray-400 mb-2">From {randomArtItem.category} collection</p>
                <p className="text-gray-300">{randomArtItem.description}</p>
                <Link href={`/art/${randomArtItem.categorySlug}`}>
                  <p className="mt-4 text-red-300 hover:text-red-200 cursor-pointer">See more like this →</p>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-gray-400">No art items available.</p>
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
  
  // Get random art item
  const artCategories = getAllArtCategories();
  let randomArtItem = null;
  
  if (artCategories.length > 0) {
    // Pick a random category
    const randomCategory = artCategories[Math.floor(Math.random() * artCategories.length)];
    const categoryItems = getArtItems(randomCategory);
    
    if (categoryItems.length > 0) {
      // Pick a random item from the category
      const randomItem = categoryItems[Math.floor(Math.random() * categoryItems.length)];
      randomArtItem = {
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
      randomArtItem
    },
    // Revalidate every hour to get new random art and latest content
    revalidate: 3600
  };
}
