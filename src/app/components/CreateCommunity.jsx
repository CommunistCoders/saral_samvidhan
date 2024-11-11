import { useState } from 'react';

export default function CreateCommunity({ userId }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState("https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.shutterstock.com%2Fsearch%2Fcommunity-law&psig=AOvVaw2SK46WNZmgtM2WG8DAGPVb&ust=1731399667070000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCJj9qsPs04kDFQAAAAAdAAAAABAJ");
  const [tags, setTags] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/community/create/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          description,
          imageUrl,
          userId,
          tags: tags.split(',').map(tag => tag.trim()), // Split tags by comma
        }),
      });

      if (response.ok) {
        setMessage('Community created successfully!');
        setName('');
        setDescription('');
        setImageUrl('');
        setTags('');
      } else {
        setMessage('Failed to create community');
      }
    } catch (error) {
      setMessage('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Create a New Community</h2>

      <div className="mb-4">
        <label className="block text-gray-700">Community Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Community Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Image URL</label>
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Tags (comma-separated)</label>
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
        />
      </div>

      <button
        type="submit"
        className="w-full py-2 mt-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        disabled={loading}
      >
        {loading ? 'Creating...' : 'Create Community'}
      </button>

      {message && <p className="mt-4 text-center text-green-500">{message}</p>}
    </form>
  );
}
