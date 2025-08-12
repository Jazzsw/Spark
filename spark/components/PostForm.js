import { useState, useEffect } from 'react';
import { db } from '../firebase/firebaseClient';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';

export default function PostForm({ existing, onSave }) {
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (existing) {
      setDescription(existing.description || '');
      setImageUrl(existing.imageUrl || '');
    }
  }, [existing]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!imageUrl.trim()) {
        alert('Please enter an image URL.');
        setLoading(false);
        return;
      }

      if (existing?.id) {
        // Editing an existing post
        await updateDoc(doc(db, 'posts', existing.id), {
          description,
          imageUrl,
        });
      } else {
        // Creating a new post
        await addDoc(collection(db, 'posts'), {
          description,
          imageUrl,
          createdAt: new Date(),
        });
      }

      setDescription('');
      setImageUrl('');
      onSave?.();
    } catch (err) {
      console.error('Error saving post:', err);
      alert('Error saving post. Check console for details.');
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 border p-4 rounded-md bg-white shadow">
      <input
        type="text"
        placeholder="Image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        className="w-full border p-2 rounded"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border p-2 rounded"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? 'Saving...' : existing?.id ? 'Update Post' : 'Create Post'}
      </button>
    </form>
  );
}
