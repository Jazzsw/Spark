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
    <div style={{margin: 'auto', width: '100%'}}>


      <div style={{border: '1px solid green', borderRadius: 8, display: 'flex', padding: '1vw', overflowX: 'scroll', width: '100%', height: '30vh', margin: 'auto'}}>
        {posts.map((post) => (

          <div key={post.id} style={{border: '1px solid #eee', padding: 16, borderRadius: 8, margin: '1vh'}}>
            <img src={post.imageUrl} alt="" style={{ height: '20vh', objectFit: 'cover', borderRadius: '8px'}} />
            <p>{post.description}</p>
            {isAdmin && (
              <div className="flex gap-2 mt-2">
                <button onClick={() => setSelectedPost(post)} className="bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
                <button onClick={() => handleDelete(post.id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
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




    </div>
  );
}
