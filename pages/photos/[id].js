import { getAlbumById, getAlbumIds } from '../../lib/photos';

export default function Album({ album }) {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2 text-purple-300">{album.title}</h1>
      <p className="text-gray-300 mb-6">{album.description}</p>
      
      {album.photos?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {album.photos.map((photo, index) => (
            <div key={index} className="bg-dark-card rounded shadow-md overflow-hidden border border-gray-800">
              <div className="relative h-64 w-full">
                <img
                  src={photo.src}
                  alt={photo.caption || `Photo ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              {photo.caption && (
                <div className="p-4">
                  <p className="text-gray-300">{photo.caption}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No photos in this album.</p>
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
