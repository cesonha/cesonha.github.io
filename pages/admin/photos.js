import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { createPhotoAlbum } from '../../lib/admin-utils';

export default function PhotosAdmin() {
  const [isDevMode, setIsDevMode] = useState(false);
  const router = useRouter();
  const [mode, setMode] = useState('create'); // 'create' or 'edit'
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [slug, setSlug] = useState('');
  const [photos, setPhotos] = useState([{ src: '', caption: '' }]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [existingAlbums, setExistingAlbums] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState('');

  useEffect(() => {
    // Check if we're in development mode
    setIsDevMode(process.env.NODE_ENV === 'development');
    
    // Redirect to home if not in development mode
    if (process.env.NODE_ENV !== 'development') {
      router.push('/');
    } else {
      // Load existing albums via API
      fetch('/api/admin/get-albums')
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            setExistingAlbums(data.albums);
          }
        })
        .catch(error => {
          console.error('Error loading albums:', error);
        });
    }
  }, [router]);

  // Generate slug from title
  useEffect(() => {
    if (title && mode === 'create') {
      setSlug(title.toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-'));
    }
  }, [title, mode]);

  // Load album data when selecting an existing album
  useEffect(() => {
    if (selectedAlbum && mode === 'edit') {
      fetch(`/api/admin/get-album?id=${selectedAlbum}`)
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            const album = data.album;
            setTitle(album.title || '');
            setDescription(album.description || '');
            setSlug(selectedAlbum);
            
            // Convert album photos to the format used in the form
            const formattedPhotos = album.photos?.map(photo => ({
              src: photo.src || '',
              caption: photo.caption || ''
            })) || [{ src: '', caption: '' }];
            
            setPhotos(formattedPhotos);
          } else {
            setMessage(`Error: ${data.message}`);
          }
        })
        .catch(error => {
          console.error('Error loading album:', error);
          setMessage(`Error: Could not load album data`);
        });
    }
  }, [selectedAlbum, mode]);

  const addPhotoField = () => {
    setPhotos([...photos, { src: '', caption: '' }]);
  };

  const removePhotoField = (index) => {
    const newPhotos = [...photos];
    newPhotos.splice(index, 1);
    setPhotos(newPhotos);
  };

  const updatePhotoField = (index, field, value) => {
    const newPhotos = [...photos];
    newPhotos[index][field] = value;
    setPhotos(newPhotos);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const result = await createPhotoAlbum({
        title,
        description,
        slug,
        photos: photos.filter(photo => photo.src.trim() !== ''),
        isEdit: mode === 'edit'
      });
      
      if (result.success) {
        setMessage(result.message);
        // Don't clear the form in development mode so users can see what they created
        
        // Display preview in console
        console.log('Preview of album data:', result.preview);
      } else {
        setMessage(`Error: ${result.message}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    setMessage('');
    
    if (newMode === 'create') {
      setTitle('');
      setDescription('');
      setSlug('');
      setPhotos([{ src: '', caption: '' }]);
      setSelectedAlbum('');
    }
  };

  if (!isDevMode) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-red-400">
          {mode === 'create' ? 'Create Photo Album' : 'Edit Photo Album'}
        </h1>
        <Link href="/admin" legacyBehavior>
          <a className="text-red-400 hover:text-red-300 cursor-pointer">Back to Dashboard</a>
        </Link>
      </div>

      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => switchMode('create')}
          className={`px-4 py-2 rounded ${
            mode === 'create' 
              ? 'bg-red-500 text-white' 
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          Create New Album
        </button>
        <button
          onClick={() => switchMode('edit')}
          className={`px-4 py-2 rounded ${
            mode === 'edit' 
              ? 'bg-red-500 text-white' 
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          Edit Existing Album
        </button>
      </div>

      {message && (
        <div className={`p-4 mb-6 rounded ${message.includes('Error') ? 'bg-red-900/50 text-red-200' : 'bg-green-900/50 text-green-200'}`}>
          {message}
        </div>
      )}

      {mode === 'edit' && (
        <div className="mb-6">
          <label htmlFor="existingAlbum" className="block text-gray-300 mb-2">Select Album to Edit</label>
          <select
            id="existingAlbum"
            value={selectedAlbum}
            onChange={(e) => setSelectedAlbum(e.target.value)}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-gray-200"
            required
          >
            <option value="">-- Select an album --</option>
            {existingAlbums.map(album => (
              <option key={album.id} value={album.id}>
                {album.title}
              </option>
            ))}
          </select>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-gray-300 mb-2">Album Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-gray-200"
            required
          />
        </div>

        <div>
          <label htmlFor="slug" className="block text-gray-300 mb-2">Slug (file name)</label>
          <input
            type="text"
            id="slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-gray-200"
            required
            readOnly={mode === 'edit'}
          />
          {mode === 'edit' && (
            <p className="text-gray-400 text-sm mt-1">Slug cannot be changed when editing</p>
          )}
        </div>

        <div>
          <label htmlFor="description" className="block text-gray-300 mb-2">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-gray-200 h-20"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-gray-300">Photos</label>
            <button
              type="button"
              onClick={addPhotoField}
              className="px-2 py-1 bg-gray-700 text-white rounded hover:bg-gray-600 text-sm"
            >
              Add Photo
            </button>
          </div>

          <div className="space-y-4">
            {photos.map((photo, index) => (
              <div key={index} className="p-4 border border-gray-700 rounded">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-gray-300">Photo {index + 1}</h3>
                  {photos.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removePhotoField(index)}
                      className="text-red-400 hover:text-red-300 text-sm"
                    >
                      Remove
                    </button>
                  )}
                </div>
                
                <div className="mb-2">
                  <label className="block text-gray-400 mb-1 text-sm">Image URL (relative to public folder)</label>
                  <input
                    type="text"
                    value={photo.src}
                    onChange={(e) => updatePhotoField(index, 'src', e.target.value)}
                    placeholder="images/photos/album-name/photo1.jpg"
                    className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-gray-200"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-400 mb-1 text-sm">Caption</label>
                  <input
                    type="text"
                    value={photo.caption}
                    onChange={(e) => updatePhotoField(index, 'caption', e.target.value)}
                    className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-gray-200"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading || (mode === 'edit' && !selectedAlbum)}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
        >
          {isLoading 
            ? (mode === 'create' ? 'Creating...' : 'Updating...') 
            : (mode === 'create' ? 'Create Album' : 'Update Album')}
        </button>
      </form>
    </div>
  );
}
