import { useState, useEffect } from 'react';
import { db } from '../firebase/firebaseClient';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import { Board, setShowForm } from '../components/Board';

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
    <>

    <form onSubmit={handleSubmit} className="addCard">
      <h2>Add A Product</h2>

      <div className="addCol1">
        <div className='pairText'>
        <h2 className='addText'>URL for tile Image</h2>
        <input
          type="text"
          placeholder="URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="inputBox"
        />
        </div>

      <div className='pairText'>
      <h2 className='addText'>Price</h2>
      <input
        placeholder="$"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="inputBox"
      />
      </div>
      </div>

    <div className="addCol2">
      <div className='pairText'>
      <h2 className='addText'>Link to Item</h2>
      <input
        placeholder="Link to Item"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        className="inputBox"
      />
      </div>

      <div className='pairText'>
        <h2 className='addText'>Row</h2>
      <input
        placeholder="Row (1, 2, or 3)"
        value={section}
        onChange={(e) => setSection(e.target.value)}
        className="inputBox"
      />
      </div>
      </div>

      <div className="addButtonContainer">
      <button
        type="submit"
        disabled={loading}
        className="submitButton"
      >
        {loading ? 'Saving...' : existing?.id ? 'Update Card' : 'Create Card'}
      </button>
      </div>
    </form>



    </>
  );
 
}
