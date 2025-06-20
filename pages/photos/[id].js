import { useState } from 'react';
import { getAlbumById, getAlbumIds } from '../../lib/photos';
import PhotoViewer from '../../components/PhotoViewer';
import Link from 'next/link';

export default function Album({ album }) {
  const [viewerOpen, setViewerOpen] = useState(false);
  const [initialPhotoIndex, setInitialPhotoIndex] = useState(0);
  
  const openPhotoViewer = (index) => {
    setInitialPhotoIndex(index);
    setViewerOpen(true);
  };
  
  const closePhotoViewer = () => {
    setViewerOpen(false);
  };
  
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-3xl font-bold text-primary-light">{album.title}</h1>
        <Link href="/photos">
          <span className="inline-block px-4 py-2 bg-dark-card text-text-secondary rounded hover:bg-dark-lighter transition-colors cursor-pointer">
            ← Back to Albums
          </span>
        </Link>
      </div>
      <p className="text-text-secondary mb-6">{album.description}</p>
      
      {album.photos?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {album.photos.map((photo, index) => (
            <div 
              key={index} 
              className="bg-dark-card rounded shadow-md overflow-hidden border border-dark-border cursor-pointer transition-transform hover:scale-[1.02]"
              onClick={() => openPhotoViewer(index)}
            >
              <div className="relative h-64 w-full">
                <img
                  src={photo.src}
                  alt={photo.caption || `Photo ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              {photo.caption && (
                <div className="p-4">
                  <p className="text-text-secondary">{photo.caption}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No photos in this album.</p>
      )}
      
      {/* Photo Viewer Modal */}
      {viewerOpen && album.photos && (
        <PhotoViewer 
          photos={album.photos} 
          initialIndex={initialPhotoIndex} 
          onClose={closePhotoViewer} 
        />
      )}
    </div>
  );
}

export async function getStaticPaths() {
  const paths = getAlbumIds();
  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const album = getAlbumById(params.id);
  return {
    props: {
      album
    }
  };
}
