// src/components/ImageGallery.jsx
import React, { useEffect, useState } from 'react';

const ImageGallery = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('/api/images/list');
        const imageList = await response.json();
        setImages(imageList);
      } catch (error) {
        console.error('Failed to fetch images:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchImages();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-semibold mb-4">Uploaded Images</h2>
      {isLoading ? (
        <p>Loading images...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.length > 0 ? (
            images.map((image) => (
              <div key={image.id} className="border border-gray-300 rounded-lg p-2">
                <img
                  src={`/api/images/${image.filename}`}
                  alt="Uploaded"
                  className="w-full h-40 object-cover rounded-md"
                />
                <p className="text-sm text-gray-500 mt-2">{image.filename}</p>
              </div>
            ))
          ) : (
            <p>No images uploaded yet.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
