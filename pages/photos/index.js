import Link from 'next/link';
import { getAllAlbums } from '../../lib/photos';

export default function Photos({ albums }) {
  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold mb-6 text-primary-light">Photo Albums</h1>
      
      {albums.length === 0 ? (
        <p>No photo albums found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {albums.map(album => (
            <Link 
              href={`/photos/${album.id}`} 
              key={album.id}
              className="block group"
            >
              <div className="bg-dark-card rounded shadow-md overflow-hidden border border-dark-border hover:border-primary-light transition-colors">
                <div className="relative h-48 w-full">
                  {album.coverImage ? (
                    <img
                      src={album.coverImage}
                      alt={album.title}
                      className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
                    />
                  ) : (
                    <div className="w-full h-full bg-dark-lighter flex items-center justify-center">
                      <span className="text-text-muted">No cover image</span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-1 text-primary-light group-hover:text-primary-hover transition-colors">{album.title}</h2>
                  <p className="text-text-secondary">{album.description}</p>
                  <p className="text-sm text-text-muted mt-2">{album.photos?.length || 0} photos</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export async function getStaticProps() {
  const albums = getAllAlbums();
  return {
    props: {
      albums
    }
  };
}
