// pages/board.js
import { useEffect, useState } from 'react';
import { db } from '../firebase/firebaseClient';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import PostForm from '../components/PostForm';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default function Board() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const auth = getAuth();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setIsAdmin(!!user);
    });
    return () => unsub();
  }, [auth]);

  const fetchPosts = async () => {
    const snapshot = await getDocs(collection(db, 'posts'));
    setPosts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (postId) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    await deleteDoc(doc(db, 'posts', postId));
    fetchPosts();
  };

  return (
    <div style={{ margin: 'auto', width: '100%' }}>


      <div className="section">
        {posts
          .filter((post) => post.section === 1)
          .map((post) => (
            <div key={post.id} className='card'>

              <img src={post.imageUrl} alt="" className='cardImg' />
              <p className='cardDisc'>{post.description}</p>

              {isAdmin && (
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => setSelectedPost(post)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}

        {isAdmin && (
          <PostForm existing={selectedPost}
            onSave={() => {
              setSelectedPost(null);
              fetchPosts();
            }} />
        )}
      </div>

      <div className="section">
        {posts
          .filter((post) => post.section === 2)
          .map((post) => (
            <div key={post.id} className='card'>

              <img src={post.imageUrl} alt="" className='cardImg' />
              <p className='cardDisc'>{post.description}</p>

              {isAdmin && (
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => setSelectedPost(post)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}

        {isAdmin && (
          <PostForm
            existing={selectedPost}
            onSave={() => {
              setSelectedPost(null);
              fetchPosts();
            }}
          />
        )}
      </div>


      <div className="section">
        {posts
          .filter((post) => post.section === 3)
          .map((post) => (
            <div key={post.id} className='card'>

              <img src={post.imageUrl} alt="" className='cardImg' />
              <p className='cardDisc'>{post.description}</p>

              {isAdmin && (
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => setSelectedPost(post)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}

        {isAdmin && (
          <PostForm existing={selectedPost}
            onSave={() => {
              setSelectedPost(null);
              fetchPosts();
            }} />
        )}
      </div>


    </div>
  );
}
