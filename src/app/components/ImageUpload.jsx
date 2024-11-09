// src/components/ImageUpload.jsx
import React, { useState } from 'react';

const ImageUpload = () => {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      if (!response.ok) {
        alert(`Upload failed: ${result.message}`);
        return;
      }
      alert(result.message || 'Upload successful!');
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image. Please try again.');
    } finally {
      setIsUploading(false);
      setFile(null);
    }
  };

  return (
    <form onSubmit={handleUpload} className="flex flex-col items-center space-y-4">
      <input type="file" onChange={handleFileChange} className="p-2" />
      <button type="submit" className="bg-amber-600 p-2 text-white rounded-md" disabled={!file || isUploading}>
        {isUploading ? 'Uploading...' : 'Upload Image'}
      </button>
    </form>
  );
};

export default ImageUpload;
