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
  const [activeCard, setActiveCard] = useState(null);


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

  const handleCardClick = (postId) => {
  setActiveCard((prev) => (prev === postId ? null : postId));
  };

  const handleLinkClick = (link) => {
    window.open(link, '_blank');
  };

  return (
    <div style={{ margin: 'auto', width: '100%' }}>


      <div className="section">
        {posts
          .filter((post) => post.section === 1)
          .map((post) => (
            <div key={post.id} className={`card ${activeCard === post.id ? 'active' : ''}`} 
              onClick={() => handleCardClick(post.id)}>

              <img src={post.imageUrl} alt="" className='cardImg' />
              
              <div className='cardInfoWrapper'>
              <p className='cardDisc'>{post.description}</p>
              <button className='linkButton' onClick={() => handleLinkClick(post.link)}>Link</button>
              </div>

              {isAdmin && (
                <div className="buttonContainer">
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="cardDelete"
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
            <div key={post.id} className={`card ${activeCard === post.id ? 'active' : ''}`} onClick={() => handleCardClick(post.id)}>

              <img src={post.imageUrl} alt="" className='cardImg' />
              <div className='cardInfoWrapper'>
              <p className='cardDisc'>{post.description}</p>
              <button className='linkButton' onClick={() => handleLinkClick(post.link)}>Link</button>
              </div>

              {isAdmin && (
                <div className="buttonContainer">
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="cardDelete"
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
            <div key={post.id} className={`card ${activeCard === post.id ? 'active' : ''}`} onClick={() => handleCardClick(post.id)}>

              <img src={post.imageUrl} alt="" className='cardImg' />
              <div className='cardInfoWrapper'>
              <p className='cardDisc'>{post.description}</p>
              <button className='linkButton' onClick={() => handleLinkClick(post.link)}>Link</button>
              </div>

              {isAdmin && (
                <div className="buttonContainer">
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="cardDelete"
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
