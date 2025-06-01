import { useState, useEffect, useCallback } from 'react';

export default function PhotoViewer({ photos, initialIndex = 0, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  
  const goToPrevious = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? photos.length - 1 : prevIndex - 1
    );
  }, [photos.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === photos.length - 1 ? 0 : prevIndex + 1
    );
  }, [photos.length]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        goToPrevious();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    // Prevent scrolling when modal is open
    document.body.style.overflow = 'hidden';
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [goToNext, goToPrevious, onClose]);

  if (!photos || photos.length === 0) {
    return null;
  }

  const currentPhoto = photos[currentIndex];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center">
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-red-400 transition-colors z-10"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        {/* Previous button */}
        <button 
          onClick={goToPrevious}
          className="absolute left-4 text-white hover:text-red-400 transition-colors z-10"
          aria-label="Previous photo"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        {/* Photo */}
        <div className="max-w-[90vw] max-h-[90vh] relative">
          <img 
            src={currentPhoto.src} 
            alt={currentPhoto.caption || `Photo ${currentIndex + 1}`}
            className="max-w-full max-h-[90vh] object-contain"
          />
          
          {/* Caption */}
          {currentPhoto.caption && (
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-4">
              <p>{currentPhoto.caption}</p>
            </div>
          )}
        </div>
        
        {/* Next button */}
        <button 
          onClick={goToNext}
          className="absolute right-4 text-white hover:text-red-400 transition-colors z-10"
          aria-label="Next photo"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
        
        {/* Photo counter */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-black bg-opacity-60 px-4 py-2 rounded-full">
          {currentIndex + 1} / {photos.length}
        </div>
      </div>
    </div>
  );
}
