import { useState, useEffect } from 'react';
import { db } from '../firebase/firebaseClient';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';

export default function PostForm({ existing, onSave }) {
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [section, setSection] = useState('');
  const [loading, setLoading] = useState(false);
  const [link, setLink] = useState('');

  useEffect(() => {
    if (existing) {
      setDescription(existing.description || '');
      setImageUrl(existing.imageUrl || '');
      setSection(existing.section || '');
      setLink(existing.link || '');
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
          section: parseInt(section),
          link,
        });
      } else {
        // Creating a new post
        await addDoc(collection(db, 'posts'), {
          description,
          imageUrl,
          section: parseInt(section),
          createdAt: new Date(),
          link,
        });
      }

      setDescription('');
      setImageUrl('');
      setSection('');
      setLink('')
      onSave?.();
    } catch (err) {
      console.error('Error saving post:', err);
      alert('Error saving post. Check console for details.');
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="addCard">
      <input
        type="text"
        placeholder="Image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        className="inputBox"
      />
      <input
        placeholder="Price ($)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="inputBox"
      />
      <input
        placeholder="Link to Item"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        className="inputBox"
      />
      <input
        placeholder="Row (1, 2, or 3)"
        value={section}
        onChange={(e) => setSection(e.target.value)}
        className="inputBox"
      />
      <button
        type="submit"
        disabled={loading}
        className="submitButton"
      >
        {loading ? 'Saving...' : existing?.id ? 'Update Card' : 'Create Card'}
      </button>
    </form>
  );
}
